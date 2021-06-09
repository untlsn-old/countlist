import { createReducer } from '@reduxjs/toolkit';
import initState from './state';
import * as actions from './actions';
import { createPoint, createID, getBigger, prepareName } from './helpers';

const reducer = createReducer(initState, builder => {
  builder
    .addCase(actions.addList, (state, { payload }) => {
      const { name } = payload;
      const preparedName = prepareName(name);

      if (preparedName != '') state[createID(preparedName)] = {};
    })
    .addCase(actions.changeLists, (state, { payload }) => payload)
    .addCase(actions.addPoint, (state, { payload }) => {
      const { listID, name } = payload;
      const list = state[listID];

      const preparedName = prepareName(name);

      if (list) list[createID(preparedName)] = createPoint.check();
    })
    .addCase(actions.togglePointCheck, (state, { payload }) => {
      const { listID, pointID, check } = payload;
      if ( !(state && state[listID] && state[listID][pointID]) ) return;

      const point = state[listID][pointID];

      if (point.type == 'check') {
        point.count = check ? 1 : 0;
      }
    })
    .addCase(actions.addCountPoint, (state, { payload }) => {
      const { name, max, listID } = payload;

      const preparedName = prepareName(name);
      state[listID][createID(preparedName)] = createPoint.count(max);
    })
    .addCase(actions.changePointCount, (state, { payload }) => {
      const { pointID, count, max, listID } = payload;
      if ( !(state && state[listID] && state[listID][pointID]) ) return;

      const point = state[listID][pointID];
      if (point.type == 'check') return;

      if (max != undefined) point.max = getBigger(max, 1);
      if (count != undefined) point.count = getBigger(count, 0);
      if (point.count > point.max) point.count = point.max;
    })
    .addCase(actions.changeType, (state, { payload }) => {
      const { listID, type, pointID } = payload;
      if ( !(state && state[listID] && state[listID][pointID]) ) return;

      if (type == 'count') state[listID][pointID].type = type;
      else state[listID][pointID] = createPoint.check();
    })
    .addCase(actions.changeName, (state, { payload }) => {
      const { listID, pointID, name } = payload;
      if ( !(state && state[listID] && state[listID][pointID]) ) return;

      const preparedName = prepareName(name);

      const pointData = state[listID][pointID];
      delete state[listID][pointID];



      const idOnly = pointID.split('@')[1];

      state[listID][`${preparedName}@${idOnly}`] = pointData;

    });
});

export default reducer;