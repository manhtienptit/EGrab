import { SLICE_NAME } from '@config/type';
import { AppState } from '@model/app';
import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ThemeType } from '@theme';
import * as Action from "@redux-action-type/worker";

const initialWorkState: AppState = {
    loading: false,
};
const workSlice = createSlice({
  name: SLICE_NAME.WORKPLACE,
  initialState: initialWorkState,
  reducers: {
      reset: () => initialWorkState,
  },
});


const getDistrics = createAction(
    Action.GET_DISTRICS,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const getProvinces = createAction(
    Action.GET_PROVINCES,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const updateWorkingLocationProfile = createAction(
    Action.UPDATE_WORKING_LOCATION,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);


const updateWorkingStatusProfile = createAction(
    Action.UPDATE_WORKING_LOCATION,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const getReportDetail = createAction(
    Action.GET_REPORT_DETAIL,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const getSupplies = createAction(
    Action.GET_SUPPLIES,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const updateSupplies = createAction(
    Action.UPDATE_SUPPLIES,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const getDetailSupplies = createAction(
    Action.GET_SUPPLIES_DETAIL,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const getDetailStaticals = createAction(
    Action.GET_DETAIL_STATICALS,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const getDetailPerformmance = createAction(
    Action.GET_DETAIL_PERFORMANCE,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

export const workActions = { ...workSlice.actions, getDistrics , getProvinces , updateWorkingLocationProfile , updateWorkingStatusProfile , getReportDetail , getSupplies , updateSupplies , getDetailSupplies , getDetailStaticals , getDetailPerformmance };
export const workReducer = workSlice.reducer;