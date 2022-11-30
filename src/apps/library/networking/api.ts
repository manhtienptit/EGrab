import {ENVConfig} from "@config/env";

const API_VERSION = '';// '/api/v1/';

const ApiEndPoint = {
  LOGIN: 'accountLogin/2.0.0',
  E_LOGIN: 'accountElectricianLogin/2.0.0',
  UPDATE_PROFILE: 'workerSiteProfileUpdate/1.0.0',
  E_UPDATE_PROFILE: 'workerSiteElectricianProfileUpdate/1.0.0',
  E_UPDATE_WORKING: 'workerSiteElectricianWorkingUpdate/1.0.0',
  OTP_CREATE: 'otpCreateNew/1.0.0',//'otpCreateNew4Electrician/1.0.0',
  OTP_VERIFY: 'otpVerifyForDoingNextEvent/1.0.0',
  FORGOT_PWD: '',
  RESET_PWD: 'accountPasswordReset/1.0.0',
  FORGOT_PWD: '',
  CHANGE_PWD: 'accountPasswordChange/1.0.0',
  PROFILE_DETAIL: 'workerSiteProfileElectricianGetDetail/1.0.0',
  LOGIN_FOR_PASS_CHANGE: 'accountLoginForPasswordChange/1.0.0',
  REFRESH_TOKEN: 'accountAccessTokenRefresh/2.0.0',
  UPDATE_STATUS_WORKING: 'workerSiteElectricianStatusWorkingUpdate/1.0.0',


  UPDATE_LOCATION_WORKING: 'workerSiteElectricianLocationWorkingUpdate/1.0.0',
  ELECTRICIAN_GET_REPORT: 'workerSiteElectricianGetReport/1.0.0',


  // ELECTRICIAN_SUPPLIES: 'workerElectricianSupliesGetList/1.0.0',
  ELECTRICIAN_SUPPLIES_UPDATE: 'ElectricianSuppliesOrderUpdate/1.0.0',
  ELECTRICIAN_SUPPLIES_DETAIL: 'ElectricianSuppliesGetOrderDetail/1.0.0',


  ELECTRICIAN_LOCATION_GET_LIST: 'locationDistrictGetList/1.0.0',
  ELECTRICIAN_WORKING_TIME: 'workerSiteElectricianGetWorkingTime/1.0.0',


  LIST_DISTRICTS: 'locationDistrictGetList/1.0.0',
  LIST_PROVINCES: 'locationProvinceGetList/1.0.0',


  ELECTRICIAN_ALL_SUPPLIES: '/grab-electric-v2/supplies',
  ELECTRICIAN_DETAIL_SUPPLIES: '/grab-electric-v2/supplies/{0}',
  ELECTRICIAN_UPDATE_SUPPLIES: '/grab-electric-v2/supplies/{0}',

  ELECTRICIAN_STATISTICAL: '/grab-electric-v2/orders/statistical',
  ELECTRICIAN_PERFORMANCE: '/grab-electric-v2/orders/performance',


  QUERY_LIST_ORDER: '/grab-electric-v2/orders/electrician',
  QUERY_DETAIL_ORDER: '/grab-electric-v2/orders/{0}/electrician',
  REJECT_ORDER: '/grab-electric-v2/orders/{0}/electrician-reject',
  SIGN_CONTRACT_ORDER: '/grab-electric-v2/orders/{0}/request-sign-acceptance-contract',
  REQUEST_PAYMENT_ORDER: '/grab-electric-v2/orders/{0}/request-payment',
  PAID_CONFIRMED_ORDER: '/grab-electric-v2/orders/{0}/paid-confirm',
  MATCHING_ORDER: '/grab-electric-v2/orders/{0}/electrician-accept',


  WEBSOCKET: ENVConfig.SOCKET_URL,


} as const;

const configApi = () => {
  const apiOb: Record<string, string> = {};
  Object.keys(ApiEndPoint).forEach(x => {
    const valueApi = ApiEndPoint[x as keyof typeof ApiEndPoint];
    apiOb[x] = API_VERSION + valueApi;
  });
  return apiOb;
};

type ApiConstantsType<T> = {
  [a in keyof T]: string;
};

export const ApiConstants = configApi() as ApiConstantsType<typeof ApiEndPoint>;
