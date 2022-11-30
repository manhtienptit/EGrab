import { SLICE_NAME } from '@config/type';
import { AppState } from '@model/app';
import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as Action from "@redux-action-type/order";

const initialOrderState: AppState = {loading: false};

const orderSlice = createSlice({
  name: SLICE_NAME.ORDER,
  initialState: initialOrderState,
  reducers: {
      reset: () => initialOrderState,
  },
});


const getListOrders = createAction(
    Action.GET_LIST,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const getDetailOrders = createAction(
    Action.GET_ORDER,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const getRequestDetailOrders = createAction(
    Action.GET_REQUEST_ORDER,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);


const putReject = createAction(
    Action.REJECT_ORDER,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);


const putSignContract = createAction(
    Action.SIGN_CONTRACT_ORDER,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);


const putPayment = createAction(
    Action.REQUEST_PAYMENT_ORDER,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);


const putPaidConfirmOrder = createAction(
    Action.PAID_CONFIRMED_ORDER,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const putMatchingOrder = createAction(
    Action.MATCHING_ORDER,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);


export const orderActions = { ...orderSlice.actions, getListOrders , getDetailOrders, putReject, putSignContract,putPayment,putPaidConfirmOrder,getRequestDetailOrders, putMatchingOrder };
export const orderReducer = orderSlice.reducer;