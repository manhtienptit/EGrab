import { StyleSheet } from 'react-native';

import {dispatch, getState, STATUS_ERROR} from '@common';
import {
    ERR_AUTH_TOKEN_EXPIRED, ERR_AUTH_TOKEN_EXPIRED_CODE,
    ERR_AUTH_TOKEN_INVALID,
    ERR_AUTH_TOKEN_TIMEOUT,
    RESULT_CODE_PUSH_OUT,
    TIME_OUT
} from '@config/api';
import { ENVConfig } from '@config/env';
import { ParamsNetwork, ResponseBase } from '@config/type';
import { AppState } from '@model/app';
import { appActions } from '@redux-slice';
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiConstants } from './api';
import {
  handleErrorAxios,
  handleParameter,
  handleResponseAxios,
  onPushLogout,
} from './helper';
import {showSnack} from "@components";

const tokenKeyHeader = 'Authorization';
let refreshTokenRequest: Promise<string | null> | null = null;
const AxiosInstance = Axios.create({});

AxiosInstance.interceptors.response.use(
    async function (response) {
        const originalRequest = response.config;
        if (
            response &&
            (response?.data?.error_code === ERR_AUTH_TOKEN_TIMEOUT || response?.data?.error_code ===  ERR_AUTH_TOKEN_INVALID || response?.data?.error_code ===  ERR_AUTH_TOKEN_EXPIRED) &&
            !originalRequest._retry)
        {
            originalRequest._retry = true;

            const {profile}: AppState = getState('app');

            let body = {
                access_token: originalRequest.body.access_token,
                username: profile?.worker_site?.phone_number ?? '',
                device_key: '',
                lang: "en"
            }


            refreshTokenRequest = refreshTokenRequest ? refreshTokenRequest : refreshToken(body);


            const newToken = await refreshTokenRequest;

            refreshTokenRequest = null;
            if (newToken === null) {
                // return Promise.reject();
                return Promise.reject(response.data);
            }
            dispatch(appActions.setToken(newToken));
            originalRequest.headers[tokenKeyHeader] = 'bearer ' + newToken;
            return AxiosInstance(originalRequest);
        }

        return Promise.resolve(response);
  },
  async function (error) {
    // const originalRequest = error.config;

    //   if (
    //   error &&
    //   error.response &&
    //   (error.response?.data?.error_code === STATUS_ERROR['ERR_AUTH_TOKEN_EXPIRED'] || error.response?.data?.error_code ===  STATUS_ERROR['ERR_AUTH_TOKEN_INVALID'] || error.response?.data?.error_code ===  STATUS_ERROR['ERR_AUTH_TOKEN_TIMEOUT']) &&
    //   !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   refreshTokenRequest = refreshTokenRequest
    //     ? refreshTokenRequest
    //     : refreshToken(originalRequest);
    //   const newToken = await refreshTokenRequest;
    //   refreshTokenRequest = null;
    //   if (newToken === null) {
    //     return Promise.reject(error);
    //   }
    //   dispatch(appActions.setToken(newToken));
    //   originalRequest.headers[tokenKeyHeader] = newToken;
    //   return AxiosInstance(originalRequest);
    // }

    return Promise.reject(error);
  },
);

// refresh token
async function refreshToken(originalRequest: Record<string, unknown>) {



  return AxiosInstance.post(
      ApiConstants.REFRESH_TOKEN, originalRequest)
    .then((res: AxiosResponse) => res.data)
    .catch(() => null);
}

// base
function Request<T = Record<string, unknown>>(
  config: AxiosRequestConfig,
  isCheckOut = true,
) {
  const { token }: AppState = getState('app');
  const defaultConfig: AxiosRequestConfig = {
    baseURL: ENVConfig.API_URL,
    timeout: TIME_OUT,
    headers: {
      'Content-Type': 'application/json',
      [tokenKeyHeader]: 'bearer ' + token ?? '',
    },
  };

  // console.log(token)

    return new Promise<ResponseBase<T> | null>(rs => {
    AxiosInstance.request(StyleSheet.flatten([defaultConfig, config]))
      .then((res: AxiosResponse<T>) => {
        const result = handleResponseAxios(res);
        rs(result);
      })
      .catch((error: AxiosError<T>) => {

        const result = handleErrorAxios(error);


          //

        if (!isCheckOut) {
          rs(result as ResponseBase<T>);
        }

        if ((result.code === RESULT_CODE_PUSH_OUT || result.code === ERR_AUTH_TOKEN_EXPIRED_CODE ) && isCheckOut) {

          showSnack({msg : result?.msg , type : 'error'});
          onPushLogout();
          rs(null);
        } else {
          rs(result as ResponseBase<T>);
        }
      });
  });
}

// get
async function Get<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'GET'));
}

// post
async function Post<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'POST'));
}

type ParameterPostFormData = AxiosRequestConfig & ParamsNetwork;
// post FormData
async function PostFormData<T>(params: ParamsNetwork) {
  const { token }: AppState = getState('app');
  const headers: AxiosRequestConfig['headers'] = {
    [tokenKeyHeader]: 'bearer ' + token ?? '',
    'Content-Type': 'multipart/form-data',
  };
  return Request<T>(
    handleParameter<ParameterPostFormData>({ ...params, headers }, 'POST'),
  );
}

// put
async function Put<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'PUT'));
}

// delete
async function Delete<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'DELETE'));
}
export type NetWorkResponseType<T> = (
  params: ParamsNetwork,
) => Promise<ResponseBase<T> | null>;

export const NetWorkService = {
  Get,
  Post,
  Put,
  Delete,
  PostFormData,
  Request,
};
