import {dispatch, getState, handleErrorResponse, STORAGE_KEY_CUSTOMER, STORAGE_KEY_TOKEN} from '@common';
import { takeLatestListeners } from '@listener';
import { ApiConstants, NetWorkService } from '@networking';

import {showSnack} from "@components";
import {orderActions} from "../action-slice/orders";
import {appActions} from "../action-slice/app";
import {selectAppToken} from "@redux-selector/app";
import {useSelector} from "react-redux";


takeLatestListeners(true)({
    actionCreator: orderActions.getListOrders,
    effect: async (action, listenerApi) => {


        await listenerApi.delay(100);
        const response = await NetWorkService.Get({
            url: ApiConstants.QUERY_LIST_ORDER
        });
        if (!response) {
            return;
        }

        if (handleErrorResponse(response)) {
            // TODO: do something when response success
            dispatch(appActions.setOrders(response?.data?.data ?? []))

        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});


takeLatestListeners(true)({
    actionCreator: orderActions.getDetailOrders,
    effect: async (action, listenerApi) => {


        const {body} = action.payload;


        await listenerApi.delay(100);
        const response = await NetWorkService.Get({
            url: ApiConstants.QUERY_DETAIL_ORDER.replace('{0}',body ?? '')
        });
        if (!response) {
            return;
        }


        console.log('=========================================')
        console.log('ORDER')
        console.log(ApiConstants.QUERY_DETAIL_ORDER.replace('{0}',body ?? ''))
        console.log(JSON.stringify(response))
        console.log('=========================================')


        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            dispatch(appActions.setDetailOrder(response?.data?.data));


            // dispatch(appActions.setOrders(response?.data?.data ?? []))


        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});

takeLatestListeners(true)({
    actionCreator: orderActions.getRequestDetailOrders,
    effect: async (action, listenerApi) => {


        const {orderCode , customer_worker_site_id} = action.payload.body;


        await listenerApi.delay(100);
        const response = await NetWorkService.Get({
            url: ApiConstants.QUERY_DETAIL_ORDER.replace('{0}',orderCode ?? '')
        });
        if (!response) {
            return;
        }

        // const token = useSelector(selectAppToken);


        console.log('=========================================')
        console.log('getRequestDetailOrders')
        console.log(ApiConstants.QUERY_DETAIL_ORDER.replace('{0}',orderCode ?? ''))
        console.log(JSON.stringify(response))
        // console.log(token)
        console.log('=========================================')


        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            dispatch(appActions.setDetailOrderRequest({...response?.data?.data , customer_worker_site_id}));


        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});

takeLatestListeners(true)({
    actionCreator: orderActions.putPayment,
    effect: async (action, listenerApi) => {


        const {actual_fee,electrician_note , id} = action.payload.body;

        let body = { actual_fee, electrician_note }


        await listenerApi.delay(100);
        const response = await NetWorkService.Put({
            url: ApiConstants.REQUEST_PAYMENT_ORDER.replace('{0}', id ?? '')
        });
        if (!response) {
            return;
        }


        // const token = useSelector(selectAppToken);

        console.log('=========================================')
        console.log('putPayment')
        console.log(ApiConstants.REQUEST_PAYMENT_ORDER.replace('{0}',id ?? ''))
        console.log(JSON.stringify(response))
        console.log(body)
        console.log('=========================================')

        // console.log(ApiConstants.REQUEST_PAYMENT_ORDER.replace('{0}', id ?? ''))
        // console.log(body)
        console.log(response)

        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            listenerApi.dispatch(orderActions.getDetailOrders(id))
            // dispatch(appActions.setOrders(response?.data?.data ?? []))


        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});

takeLatestListeners(true)({
    actionCreator: orderActions.putPaidConfirmOrder,
    effect: async (action, listenerApi) => {

        const {body} = action.payload;

        await listenerApi.delay(100);
        const response = await NetWorkService.Put({
            url: ApiConstants.PAID_CONFIRMED_ORDER.replace('{0}', body ?? '')
                // { actual_fee , electrician_note }
        });
        if (!response) {
            return;
        }


        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            listenerApi.dispatch(orderActions.getDetailOrders(body))
            // dispatch(appActions.setOrders(response?.data?.data ?? []))


        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});

takeLatestListeners(true)({
    actionCreator: orderActions.putMatchingOrder,
    effect: async (action, listenerApi) => {

        const {electrician_worker_site_id , electrician_working_site_id , order_code} = action.payload.body;

        let body = { electrician_worker_site_id, electrician_working_site_id }

        await listenerApi.delay(100);
        const response = await NetWorkService.Put({
            url: ApiConstants.MATCHING_ORDER.replace('{0}', order_code ?? ''),
            body
        });
        if (!response) {
            return;
        }

        console.log('=========================================')
        console.log('putMatchingOrder')
        console.log(ApiConstants.MATCHING_ORDER.replace('{0}',order_code ?? ''))
        console.log(JSON.stringify(response))
        console.log(body)
        console.log('=========================================')


        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            listenerApi.dispatch(orderActions.getDetailOrders(order_code))
            // dispatch(appActions.setOrders(response?.data?.data ?? []))


        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});

takeLatestListeners(true)({
    actionCreator: orderActions.putReject,
    effect: async (action, listenerApi) => {

        const {id , electrician_cancel_reason} = action.payload.body;
        let body = { electrician_cancel_reason }


        await listenerApi.delay(100);
        const response = await NetWorkService.Put({
            url: ApiConstants.REJECT_ORDER.replace('{0}',id ?? ''),
            body
        });
        if (!response) {
            return;
        }


        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            listenerApi.dispatch(orderActions.getDetailOrders(id))

            // dispatch(appActions.setOrders(response?.data?.data ?? []))


        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});

takeLatestListeners(true)({
    actionCreator: orderActions.putSignContract,
    effect: async (action, listenerApi) => {

        const {body} = action.payload;

        await listenerApi.delay(100);
        const response = await NetWorkService.Put({
            url: ApiConstants.SIGN_CONTRACT_ORDER.replace('{0}',body ?? '')
        });
        if (!response) {
            return;
        }


        if (handleErrorResponse(response)) {
            // TODO: do something when response success

            listenerApi.dispatch(orderActions.getDetailOrders(body))


        }
        else {
            showSnack({msg : response?.data?.error_message , type : 'error'});
        }


    },
});

