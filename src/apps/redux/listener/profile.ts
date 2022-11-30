import {dispatch, getState, handleErrorResponse, STORAGE_KEY_CUSTOMER, STORAGE_KEY_TOKEN} from '@common';
import { takeLatestListeners } from '@listener';
import { ApiConstants, NetWorkService } from '@networking';

import { authenticationActions } from '../action-slice/authentication';
import { appActions } from '../action-slice/app';
import {load, loadString, save, saveString} from "@storage";
import {showSnack} from "@components";
import {navigationRef} from "@navigation/navigation-service";
import {APP_SCREEN} from "@navigation/screen-types";
import {AppState} from "@model/app";
import {workActions} from "../action-slice/worker";


takeLatestListeners(true)({
    actionCreator: authenticationActions.updateProfile,
    effect: async (action, listenerApi) => {
        const { body } = action.payload;
        await listenerApi.delay(100);
        const response = await NetWorkService.Post({
            url: ApiConstants.E_UPDATE_PROFILE,
            body,
        });
        if (!response) {
            return;
        }

        console.log(body)


        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            listenerApi.dispatch(authenticationActions.getDetailProfile());

            showSnack({msg : 'Cập nhật thành công thông tin' , type : 'success'});

        }
        else {

            showSnack({msg : response?.data?.error_message || response.msg , type : 'error'});
        }


    },
});

takeLatestListeners(true)({
    actionCreator: authenticationActions.updateLocationWorkingProfile,
    effect: async (action, listenerApi) => {

        const { body } = action.payload;
        await listenerApi.delay(100);

        const response = await NetWorkService.Post({
            url: ApiConstants.UPDATE_LOCATION_WORKING,
            body,
        });

        if (!response) {
            return;
        }




        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            listenerApi.dispatch(authenticationActions.getDetailProfile());

            showSnack({msg : 'Cập nhật thành công thông tin' , type : 'success'});

        }
        else {

            showSnack({msg : response?.data?.error_message || response.msg , type : 'error'});
        }


    },
});

takeLatestListeners(true)({
    actionCreator: authenticationActions.updateWorkingStatusProfile,
    effect: async (action, listenerApi) => {

        const { status } = action.payload.body;

        const token = loadString(STORAGE_KEY_TOKEN);

        const body = {
            access_token : token,
            working_status : status // AVAILBLE/OFFLINE
        };

        // console.log(ApiConstants.UPDATE_STATUS_WORKING)

        await listenerApi.delay(100);
        const response = await NetWorkService.Post({
            url: ApiConstants.UPDATE_STATUS_WORKING,
            body,
        });
        if (!response) {
            return;
        }

        console.log('updateWorkingStatusProfile')
        console.log(response)

        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            listenerApi.dispatch(authenticationActions.getDetailProfile());

            showSnack({msg : 'Cập nhật thành công trạng thái' , type : 'success'});

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});


takeLatestListeners(true)({
    actionCreator: authenticationActions.updateWorkingTime,
    effect: async (action, listenerApi) => {

        const { body } = action.payload;

        console.log(body)

        await listenerApi.delay(100);

        const response = await NetWorkService.Post({
            url: ApiConstants.E_UPDATE_WORKING,
            body,
        });
        if (!response) {
            return;
        }

        console.log('updateWorkingTime')
        console.log(response)

        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            listenerApi.dispatch(authenticationActions.getDetailProfile());

            showSnack({msg : 'Cập nhật thành công trạng thái' , type : 'success'});

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});


takeLatestListeners(true)({
    actionCreator: authenticationActions.getDetailProfile,
    effect: async (action, listenerApi) => {

        await listenerApi.delay(100);

        const token = loadString(STORAGE_KEY_TOKEN);

        let body = {
            access_token: token
        }
        const response = await NetWorkService.Post({
            url: ApiConstants.PROFILE_DETAIL,
            body,
        });
        if (!response) {
            return;
        }


        console.log('getDetailProfile')
        console.log(JSON.stringify(response))


        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            const { profile }: AppState = getState('app');

            profile.worker_site = response?.data?.data?.worker_site;


            save(STORAGE_KEY_CUSTOMER, profile);
            listenerApi.dispatch(appActions.setAppProfile(profile));

            //
            // showSnack({msg : 'Cập nhật thành công thông tin' , type : 'success'});

        }
        else {

            showSnack({msg : response?.data?.error_message || response.msg , type : 'error'});
        }


    },
});