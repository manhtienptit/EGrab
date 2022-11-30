import {dispatch, getState, handleErrorResponse, STORAGE_KEY_CUSTOMER, STORAGE_KEY_TOKEN} from '@common';
import { takeLatestListeners } from '@listener';
import { ApiConstants, NetWorkService } from '@networking';

import { authenticationActions } from '../action-slice/authentication';
import { appActions } from '../action-slice/app';
import {load, loadString, save, saveString} from "@storage";
import {showSnack} from "@components";
import {navigationRef} from "@navigation/navigation-service";
import {APP_SCREEN} from "@navigation/screen-types";
import {getDeviceToken, requestNotificationPermission} from "../../common/firebase/notification";

takeLatestListeners(true)({
  actionCreator: authenticationActions.login,
  effect: async (action, listenerApi) => {
    const { body } = action.payload;

      console.log('==================================================================')


      await  requestNotificationPermission() ;

    // let fcmtoken = await getDeviceToken();

    body.device_param = await load('fcmToken');

    console.log(body)


    const response = await NetWorkService.Post({
      url: ApiConstants.E_LOGIN,
      body,
    });
    if (!response) {
      return;
    }

      console.log(response);


      if (handleErrorResponse(response)) {

        // console.log(response?.data?.data )
        // console.log(response?.data?.data?.access_token )

        let token = response?.data?.data?.access_token ?? '';

      // TODO: do something when login success

        if (typeof token === 'string') {

            saveString(STORAGE_KEY_TOKEN, token);
            save(STORAGE_KEY_CUSTOMER, response?.data?.data ?? '');

            listenerApi.dispatch(appActions.setAppProfile(response?.data?.data ?? ''));
            listenerApi.dispatch(appActions.setToken(token));

        }
    }
    else {
        showSnack({msg : response?.data?.error_message , type : 'error'});
    }
  },
});

takeLatestListeners(true)({
    actionCreator: authenticationActions.forgotPass,
    effect: async (action, listenerApi) => {
        const { body } = action.payload;


        await listenerApi.delay(500);
        const response = await NetWorkService.Post({
            url: ApiConstants.OTP_CREATE,
            body,
        });
        if (!response) {
            return;
        }

        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            listenerApi.dispatch(appActions.setPhone(body.owner_id));
            navigationRef?.current?.navigate(APP_SCREEN.VERIFY_OTP)

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }
    },
});

takeLatestListeners(true)({
    actionCreator: authenticationActions.checkPass,
    effect: async (action, listenerApi) => {
        const { body } = action.payload;
        await listenerApi.delay(500);
        const response = await NetWorkService.Post({
            url: ApiConstants.LOGIN_FOR_PASS_CHANGE,
            body,
        });
        if (!response) {
            return;
        }
        if (handleErrorResponse(response)) {
            // TODO: do something when response success
            dispatch(appActions.setPassword(body?.password ?? ''));
            navigationRef?.current?.navigate(APP_SCREEN.CHANGE_PASSWORD_2)

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});

takeLatestListeners(true)({
    actionCreator: authenticationActions.changePass,
    effect: async (action, listenerApi) => {
        const { body } = action.payload;
        await listenerApi.delay(500);
        const response = await NetWorkService.Post({
            url: ApiConstants.CHANGE_PWD,
            body,
        });
        if (!response) {
            return;
        }

        if (handleErrorResponse(response)) {
            // TODO: do something when response success
            navigationRef?.current?.navigate(APP_SCREEN.CHANGE_PASSWORD_4)

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});

takeLatestListeners(true)({
    actionCreator: authenticationActions.changePassNotToken,
    effect: async (action, listenerApi) => {
        const { body } = action.payload;
        await listenerApi.delay(500);
        const response = await NetWorkService.Post({
            url: ApiConstants.RESET_PWD,
            body,
        });
        if (!response) {
            return;
        }
        if (handleErrorResponse(response)) {
            // TODO: do something when response success
            navigationRef?.current?.navigate(APP_SCREEN.RESET_PASSWORD_4)

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});

takeLatestListeners(true)({
    actionCreator: authenticationActions.verifyOTP,
    effect: async (action, listenerApi) => {
        const { body } = action.payload;
        await listenerApi.delay(100);
        const response = await NetWorkService.Post({
            url: ApiConstants.OTP_VERIFY,
            body,
        });
        if (!response) {
            return;
        }
        if (handleErrorResponse(response)) {
            // TODO: do something when response success
            navigationRef?.current?.navigate(APP_SCREEN.CHANGE_PASSWORD_2)

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});

takeLatestListeners(true)({
    actionCreator: authenticationActions.verifyOTPReset,
    effect: async (action, listenerApi) => {
        const { body } = action.payload;
        await listenerApi.delay(100);
        const response = await NetWorkService.Post({
            url: ApiConstants.OTP_VERIFY,
            body,
        });
        if (!response) {
            return;
        }
        if (handleErrorResponse(response)) {
            // TODO: do something when response success
            navigationRef?.current?.navigate(APP_SCREEN.RESET_PASSWORD_2)

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});


