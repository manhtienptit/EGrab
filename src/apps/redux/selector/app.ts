import { createDeepEqualSelector } from '@common';
import { RootState } from '@store/all-reducers';
import {PerformType} from "@model/perfomance/performance";
import moment, { Moment } from 'moment';

export const selectAppConfig = createDeepEqualSelector(
  (state: RootState) => state.app,
  app => ({
    loadingApp: app.loadingApp,
    showDialog: app.showDialog,
    theme: app.theme,
  }),
);

export const selectAppToken = createDeepEqualSelector(
  (state: RootState) => state.app,
  app => app.token,
);

export const selectAppPassword = createDeepEqualSelector(
    (state: RootState) => state.app,
    app => app.password,
);

export const selectAppPhone = createDeepEqualSelector(
    (state: RootState) => state.app,
    app => app.phone,
);

export const selectAppProfile = createDeepEqualSelector(
    (state: RootState) => state.app,
    app => app.profile,
);

export const selectAppWorkerSite = createDeepEqualSelector(
    (state: RootState) => state.app,
    app => app.profile?.worker_site,
);

export const selectAppHaveNewJob = createDeepEqualSelector(
    (state: RootState) => state.app,
    app => app.haveNewJob,
);

export const selectAppProvinces = createDeepEqualSelector(
    (state: RootState) => state.app,
    app => ({
        provinces : app.provinces,

    }),
);

export const selectAppDistrics = createDeepEqualSelector(
    (state: RootState) => state.app.districs,
    value => ({districs : value})
);

export const selectAppOrders = createDeepEqualSelector(
    (state: RootState) => state.app,
    app => app.orders,
);

export const selectAppDetailOrder = createDeepEqualSelector(
    (state: RootState) => state.app,
    app => app.orderDetail,
);

export const selectAppSuppliesDetail = createDeepEqualSelector(
    (state: RootState) => state.app,
    app => app.suppliesDetail,
);

export const selectAppRequestDetailOrder = createDeepEqualSelector(
    (state: RootState) => state.app,
    app => app.orderRequestDetail,
);

export const selectAppIDOrderSeleted = createDeepEqualSelector(
    (state: RootState) => state.app,
    app => app.orderIDSelected,
);

export const selectSupplies = createDeepEqualSelector(
    (state: RootState) => state.app,
    app => app.supplies,
);

export const selectReportDetail = createDeepEqualSelector(
    (state: RootState) => state.app,
    app => app.reportDetail,
);

export const selectPerformDetail = createDeepEqualSelector(
    (state: RootState) => state.app.performanceDetail,
    (app : PerformType) => {

        let labels = [];
        let data = [] ;

        app?.by_day?.map((value) => {
            labels.push((moment(value.day)).format('DD-MM'));
            data.push(value.total);
        })

        let dataDistrict = [] ;
        let dataPeriod = [] ;

        app?.by_district?.map((value) => {

            let color = `#${Math.floor(Math.random()*16777215).toString(16)}`;

            dataDistrict.push({
                name: value?.district,
                population: value?.total,
                color: color,
                legendFontColor: color,
                legendFontSize: 15
            })
        })

        app?.by_period?.map((value) => {

            let color = `#${Math.floor(Math.random()*16777215).toString(16)}`;

            dataPeriod.push({
                name: value?.period,
                population: value?.total,
                color: color,
                legendFontColor: color,
                legendFontSize: 15
            })
        })

        return {
            date :  {labels , data} ,
            distric :  dataDistrict ,
            period : dataPeriod,
                };
    },
);