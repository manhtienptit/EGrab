import { appReducer, authenticationReducer , workReducer , orderReducer } from '@redux-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const allReducer = combineReducers({
  app: appReducer,
  worker: workReducer,
  order: orderReducer,
  authentication: authenticationReducer,
});

export type RootState = ReturnType<typeof allReducer>;
