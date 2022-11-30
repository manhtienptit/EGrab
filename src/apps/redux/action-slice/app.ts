import { SLICE_NAME } from '@config/type';
import { AppState } from '@model/app';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeType } from '@theme';
import {useSocket} from "@common";
import {PerformType} from "@model/perfomance/performance";

const initialAppState: AppState = {
  internetState: true,
  profile: {},
  token: undefined,
  phone: undefined,
  password: undefined,
  retype_password: undefined,
  /**
   * default true to load app
   */
  loadingApp: false,
  showDialog: false,
  inChagre: false,
  passnotMatch: true,
  haveNewJob: true,
  theme: 'default',

  provinces: [],
  districs: [],

    //
  orders: [],
  orderDetail: {},
  orderRequestDetail: null,
  orderIDSelected : null,
  reportDetail : null,
  supplies : null,
  suppliesDetail : [],
  performanceDetail : null,

};
const appSlice = createSlice({
  name: SLICE_NAME.APP,
  initialState: initialAppState,
  reducers: {

      setStaticals: (state, { payload }: PayloadAction<any>) => {
          state.reportDetail = payload;
      },

      setPerformance: (state, { payload }: PayloadAction<PerformType>) => {
          state.performanceDetail = payload;
      },


      setSuppliesDetail: (state, { payload }: PayloadAction<any>) => {
          state.suppliesDetail = payload;
      },

      setSupplies: (state, { payload }: PayloadAction<any>) => {
          state.supplies = payload;
      },

      setReportDetail: (state, { payload }: PayloadAction<any>) => {
          state.reportDetail = payload;
      },

    setIDOrdersSelected: (state, { payload }: PayloadAction<any>) => {
          state.orderIDSelected = payload;
    },
    setOrders: (state, { payload }: PayloadAction<boolean>) => {
          state.orders = payload;
      },
      setDetailOrder: (state, { payload }: PayloadAction<boolean>) => {
          state.orderDetail = payload;
      },
      setDetailOrderRequest: (state, { payload }: PayloadAction<boolean>) => {
          state.orderRequestDetail = payload;
      },
    setProvinces: (state, { payload }: PayloadAction<boolean>) => {
          state.provinces = payload;
      },
    setDistrics: (state, { payload }: PayloadAction<boolean>) => {
          state.districs = payload;
      },
    setPassword: (state, { payload }: PayloadAction<boolean>) => {
          state.password = payload;
      },
    setPhone: (state, { payload }: PayloadAction<boolean>) => {
          state.phone = payload;
      },
    setRetypePassword: (state, { payload }: PayloadAction<boolean>) => {
          state.retype_password = payload;
      },
    setNotMatchPasswordStatus: (state, { payload }: PayloadAction<boolean>) => {
          state.passnotMatch = payload;
      },
    setInChargeState: (state, { payload }: PayloadAction<boolean>) => {
          state.inChagre = payload;
     },
    setInternetState: (state, { payload }: PayloadAction<boolean>) => {
      state.internetState = payload;
    },
    setHaveNewJob: (state, { payload }: PayloadAction<boolean>) => {
          state.haveNewJob = payload;
      },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setAppProfile: (state, { payload }: PayloadAction<unknown>) => {
      state.profile = payload;
    },
    setAppTheme: (state, { payload }: PayloadAction<ThemeType>) => {
      state.theme = payload;
    },
    startLoadApp: state => {
      state.loadingApp = true;
    },
    endLoadApp: state => {
      state.loadingApp = false;
    },
    startProcess: state => {
      state.showDialog = true;
    },
    endProcess: state => {
      state.showDialog = false;
    },
    logout: state => {

      state.profile = {};
      state.token = undefined;

    },
  },
});
export const { reducer: appReducer, actions: appActions } = appSlice;
