import useCleverDispatch from '@hooks/useCleverDispatch';
import { handleChange } from '@helpers';
import { useSelector } from 'react-redux';

export const useNameInput = () => {
  const usedPoint = useSelector(({ mini }) => mini.usedPoint)!;
  const name = useSelector(({ lists }) => lists.points[usedPoint].name);
  const changeName = useCleverDispatch()(({ lists }) => lists.changeName);

  return {
    value: name,
    onChange: handleChange((newName) => changeName({ id: usedPoint, name: newName })),
  };
};

const useAllPointData = (pointID: string) => {
  const type = useSelector(({ lists }) => lists.points[pointID].type);
  const max = useSelector(({ lists }) => lists.points[pointID].max);
  const count = useSelector(({ lists }) => lists.points[pointID].count);

  return { type, max, count };
};

export const usePointData = () => {
  const cleverDispatch = useCleverDispatch();
  const id = useSelector(({ mini }) => mini.usedPoint)!;

  const changeType = cleverDispatch(({ lists }) => lists.changeType);
  const changeCount = cleverDispatch(({ lists }) => lists.changeCount);
  const changeMax = cleverDispatch(({ lists }) => lists.changeMax);


  return {
    ...useAllPointData(id),
    changeType: {
      check: () => changeType({ id, type: 'check' }),
      count: () => changeType({ id, type: 'count' }),
    },
    changeCount: (count: number) => changeCount({ id, count }),
    changeMax: (max: number) => changeMax({ id, max }),
  };
};