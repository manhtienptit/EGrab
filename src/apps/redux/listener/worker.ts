import {dispatch, getState, handleErrorResponse, STORAGE_KEY_CUSTOMER, STORAGE_KEY_TOKEN} from '@common';
import { takeLatestListeners } from '@listener';
import { ApiConstants, NetWorkService } from '@networking';

import { workActions } from '../action-slice/worker';
import {showSnack} from "@components";
import {AppState} from "@model/app";
import {authenticationActions} from "@redux-slice";
import {appActions} from "../action-slice/app";
import {orderActions} from "../action-slice/orders";
import {navigationRef} from "@navigation/navigation-service";
import {loadString} from "@storage";


takeLatestListeners(true)({
    actionCreator: workActions.getProvinces,
    effect: async (action, listenerApi) => {

        const token = loadString(STORAGE_KEY_TOKEN);

        const body = {
            access_token : token,
            country_code2: "VN",
            lang: "en"
        };

        await listenerApi.delay(100);
        const response = await NetWorkService.Post({
            url: ApiConstants.LIST_PROVINCES,
            body,
        });
        if (!response) {
            return;
        }

        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            dispatch(appActions.setProvinces(response?.data?.data?.list_items ?? ''))

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});

takeLatestListeners(true)({
    actionCreator: workActions.getDistrics,
    effect: async (action, listenerApi) => {

        const { province_code } = action.payload.body;

        dispatch(appActions.setDistrics(null))

        const token = loadString(STORAGE_KEY_TOKEN);

        const body = {
            access_token : token,
            province_code : province_code,
            lang: "en"
        };

        await listenerApi.delay(100);
        const response = await NetWorkService.Post({
            url: ApiConstants.LIST_DISTRICTS,
            body,
        });
        if (!response) {
            return;
        }

        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            dispatch(appActions.setDistrics(response?.data?.data?.list_items ?? ''))

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});

takeLatestListeners(true)({
    actionCreator: workActions.updateWorkingLocationProfile,
    effect: async (action, listenerApi) => {

        const { province_code } = action.payload.body;

        dispatch(appActions.setDistrics(null))

        const token = loadString(STORAGE_KEY_TOKEN);

        const body = {
            access_token : token,
            province_code : province_code,
            lang: "en"
        };

        await listenerApi.delay(100);
        const response = await NetWorkService.Post({
            url: ApiConstants.LIST_DISTRICTS,
            body,
        });
        if (!response) {
            return;
        }

        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            dispatch(appActions.setDistrics(response?.data?.data?.list_items ?? ''))

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});


takeLatestListeners(true)({
    actionCreator: workActions.getReportDetail,
    effect: async (action, listenerApi) => {


        const token = loadString(STORAGE_KEY_TOKEN);

        const body = {
            access_token : token,
        };

        await listenerApi.delay(100);
        const response = await NetWorkService.Post({
            url: ApiConstants.ELECTRICIAN_GET_REPORT,
            body,
        });
        if (!response) {
            return;
        }

        console.log(response?.data?.detail_report)

        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            dispatch(appActions.setReportDetail(response?.data?.data ?? null))

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});


takeLatestListeners(true)({
    actionCreator: workActions.getSupplies,
    effect: async (action, listenerApi) => {


        // const { token }: AppState = getState('app');
        //
        // const body = {
        //     access_token : token,
        // };

        await listenerApi.delay(100);
        const response = await NetWorkService.Get({
            url: ApiConstants.ELECTRICIAN_ALL_SUPPLIES,
            // body,
        });
        if (!response) {
            return;
        }

        // console.log(JSON.stringify(response))

        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            dispatch(appActions.setSupplies(response?.data?.data ?? null))

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});


takeLatestListeners(true)({
    actionCreator: workActions.updateSupplies,
    effect: async (action, listenerApi) => {


        const { supplies , order_code } = action.payload.body;


        const { token }: AppState = getState('app');

        const body = {
            supplies : supplies,
    };

        await listenerApi.delay(100);
        const response = await NetWorkService.Put({
            url: ApiConstants.ELECTRICIAN_UPDATE_SUPPLIES.replace('{0}',order_code ?? ''),
            body,
        });
        if (!response) {
            return;
        }

        // console.log(body)
        // console.log(response)

        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            dispatch(workActions.getDetailSupplies({order_code}))

            navigationRef?.current.goBack();


        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});
takeLatestListeners(true)({
    actionCreator: workActions.getDetailSupplies,
    effect: async (action, listenerApi) => {


        const { order_code } = action.payload.body;

    //     const { token }: AppState = getState('app');
    //
    //     const body = {
    //         access_token : token,
    //         // supplies_code : supplies_code,
    //         order_code : order_code,
    //         // quantity : supplies_code,
    //         // total_price : supplies_code,
    //
    // };

        await listenerApi.delay(100);
        const response = await NetWorkService.Get({
            url: ApiConstants.ELECTRICIAN_DETAIL_SUPPLIES.replace('{0}',order_code ?? '')
        });
        if (!response) {
            return;
        }

        // console.log('ELECTRICIAN_DETAIL_SUPPLIES')
        // console.log(response?.data?.data?.supplies)

        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            dispatch(appActions.setSuppliesDetail(response?.data?.data?.supplies ?? []))

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});


takeLatestListeners(true)({
    actionCreator: workActions.getDetailStaticals,
    effect: async (action, listenerApi) => {


        await listenerApi.delay(100);
        const response = await NetWorkService.Get({
            url: ApiConstants.ELECTRICIAN_STATISTICAL
        });
        if (!response) {
            return;
        }

        // console.log('ELECTRICIAN_STATISTICAL')
        // console.log(response?.data?.data)

        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            dispatch(appActions.setStaticals(response?.data?.data ?? []))

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});


takeLatestListeners(true)({
    actionCreator: workActions.getDetailPerformmance,
    effect: async (action, listenerApi) => {

        let {from_date , to_date} = action.payload.body;


        await listenerApi.delay(100);
        const response = await NetWorkService.Get({
            url: ApiConstants.ELECTRICIAN_PERFORMANCE+`?from_date=${from_date}&to_date=${to_date}`
        });
        if (!response) {
            return;
        }

        // console.log('ELECTRICIAN_PERFORMANCE')
        // console.log(JSON.stringify(response?.data))

        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            dispatch(appActions.setPerformance(response?.data?.data ?? nul))

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});

