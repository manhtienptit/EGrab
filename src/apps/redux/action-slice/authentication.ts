/* eslint-disable @typescript-eslint/no-explicit-any */
import { SLICE_NAME } from '@config/type';
import { AuthenticationState } from '@model/authentication';
import * as Action from '@redux-action-type/authentication';
import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState: AuthenticationState = {
  loading: false,
};
const authenticationSlice = createSlice({
  name: SLICE_NAME.AUTHENTICATION,
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
});

const login = createAction(
  Action.LOGIN,
  (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
    payload: {
      body,
      onSucceeded,
      onFailure,
    },
  }),
);

const forgotPass = createAction(
    Action.FORGOT_PWD,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);


const checkPass = createAction(
    Action.CHECK_PWD,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const changePass = createAction(
    Action.CHANGE_PWD,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const verifyOTP = createAction(
    Action.VERIFY_OTP,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const verifyOTPReset = createAction(
    Action.VERIFY_OTP_RESET,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const updateProfile = createAction(
    Action.UPDATE_PROFILE,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const getDetailProfile = createAction(
    Action.DETAIL_PROFILE,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const updateWorkingStatusProfile = createAction(
    Action.UPDATE_STATUS_PROFILE,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const updateWorkingTime = createAction(
    Action.UPDATE_WORKING_TIME,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);


const updateLocationWorkingProfile = createAction(
    Action.UPDATE_WORKING_LOCATION,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);

const changePassNotToken = createAction(
    Action.CHANGE_PWD_WITHOUT_TOKEN,
    (body: any, onSucceeded: () => void, onFailure: (msg: string) => void) => ({
        payload: {
            body,
            onSucceeded,
            onFailure,
        },
    }),
);





export const authenticationActions = { ...authenticationSlice.actions, login , forgotPass , checkPass , changePass , changePassNotToken , verifyOTP , verifyOTPReset , updateProfile , getDetailProfile , updateWorkingStatusProfile , updateWorkingTime , updateLocationWorkingProfile };
export const authenticationReducer = authenticationSlice.reducer;
