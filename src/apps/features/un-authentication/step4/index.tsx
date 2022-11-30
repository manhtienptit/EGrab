import React, {memo, useEffect, useState} from 'react';

import isEqual from 'react-fast-compare';

import {
    Block,
    Button,
    HelperText,
    Icon,
    Otp,
    Screen,
    showSnack,
    Spacer,
    Text,
    TouchableScale,
    Wallpaper
} from '@components';
import {goBack, navigationRef} from '@navigation/navigation-service';
import {FormLoginType} from "@model/authentication";
import {ColorDefault} from "@theme/color";
import {useCountdown} from "usehooks-ts";
import {APP_SCREEN} from "@navigation/screen-types";
import {AppState} from "@model/app";
import {getState, logout} from "@common";


const ResetPwdStep4Component = () => {


    const { password }: AppState = getState('app');

    const [count, { startCountdown, stopCountdown, resetCountdown }] =
        useCountdown({
            countStart: 5,
            intervalMs: 1000,
        })

    useEffect(() => {
        startCountdown()
        return () => {
            stopCountdown()
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        console.log(count);
        if(count === 0 ){
            navigationRef?.current?.navigate(APP_SCREEN.LOGIN)
        }
    }, [count]);


    // render
  return (
      <Block block paddingTop={0} paddingHorizontal={15} middle color={'white'}>
          <Screen
              bottomInsetColor="transparent"
              style={{ paddingVertical: 0, paddingHorizontal: 10 }}
              backgroundColor={'white'}>


              <Block height = {220} middle marginTop={20} >
                  <Icon icon={'forgot'} size = {120} />
                  <Spacer height={20}/>
                  <Text text={'Đổi mật khẩu thành công'} preset={'linkTitle'}/>
                  <Spacer height={15}/>
                  <Block>
                      <Text text={`Chuyển hướng sau 0${count} giây`} preset={'textMenu'} color={ColorDefault.text} />
                  </Block>
              </Block>
              <Spacer height={10}/>

              <Block height={120} paddingLeft={15} middle>
                 <Otp length={6} defaultOtp={password} disabled={true}/>
                  <Spacer height={15}/>
                  <Text text={'Lưu ý: Không chia sẻ mật khẩu cho bất kỳ ai.'} color={ColorDefault.otpInfo}/>



              </Block>

              <Spacer height={10}/>


          </Screen>
      </Block>
  );
};
export const ResetPwdStep4 = memo(ResetPwdStep4Component, isEqual);
