import axios, { AxiosResponse } from 'axios';
import { Point } from '@store/ducks/lists/state.types';
import * as _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { useCleverDispatch } from '@hooks';
import saveStorage from '@helpers/saveStorage';
import type { GetListsReturnBody, GetPointsReturnBody } from '~/types/api-types';

export const useConnect = (onOk: () => void) => {
  const cleverDispatch = useCleverDispatch();
  const initLists = cleverDispatch(({ lists }) => lists.initLists);
  const initPoints = cleverDispatch(({ lists }) => lists.initPoints);
  const changeComposition = cleverDispatch(({ lists }) => lists.changeComposition);
  const history = useHistory();

  return () => {
    const config = {
      headers: {
        Bearer: saveStorage.getToken(),
      },
    };
    axios
      .post<GetListsReturnBody, AxiosResponse<GetListsReturnBody>>('/api/get-lists', saveStorage.getID(), config)
      .then(({ data  }) => {
        const ids = data.map(it => it.id);
        const lists = data.map(({ name }) => ({
          name,
          composition: [],
        }));

        const records = _.zipObject(ids, lists);
        initLists(records);

        return ids;
      })
      .then((listsIDs) => {
        console.log(listsIDs);
        axios
          .post<GetPointsReturnBody, AxiosResponse<GetPointsReturnBody>>('/api/get-points', listsIDs, config)
          .then(({ data }) => {
            const ids = data.map(it => it.id);
            const rest = data.map(({ id, ...rest }) => rest as Point);
            const compositions: Record<string, string[]> = {};

            data.forEach(({ id, owner }) => {
              compositions[owner] ||= [];
              compositions[owner].push(id);
            });
            _.forOwn(compositions, (composition, id) => changeComposition({ composition, id }));

            const records = _.zipObject(ids, rest);
            initPoints(records);
          })
          .then(onOk)
          .catch(console.log);
      })
      .catch(() => history.push('/login'));
  };
};