import React, {memo, useEffect, useRef, useState} from 'react';

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
import {dispatch, genSHA256, getState, sizeScale} from "@common";
import {authenticationActions} from "@redux-slice";
import {AppState} from "@model/app";
import {selectAppToken} from "@redux-selector/app";
import {useSelector} from "react-redux";
import {Header} from "@components/header";
import {TextInput} from "react-native";



const ChangePwdStep1Component = () => {

    //state
    const [otpValid , setOTPValid] =  useState<boolean>(false);

    const token = useSelector(selectAppToken);

    const _otpRef = useRef(null);

    // function
    const onSubmit = (data: FormLoginType) => {
    };


    const onPasswordCheck = (data) => {

        let body = {
            access_token: token,
            password: genSHA256(data),
            ttdne:  "30",
            lang:  "vi"
        }

        dispatch(authenticationActions.checkPass(body));

        if (_otpRef.current) {
            _otpRef.current.clearOTP();
        }

    }


    // render
  return (
      <Block block paddingTop={0} paddingHorizontal={15} middle color={'white'}>
          <Screen
              bottomInsetColor="transparent"
              style={{ paddingVertical: 0, paddingHorizontal: 10 }}
              backgroundColor={'white'}>
              <Header title={'Đổi mật khẩu'} onPress={() => {goBack()}} />

              <Block height = {220} middle marginTop={20} >
                  <Icon icon={'forgot'} size = {120} />
                  <Spacer height={20}/>
                  <Text text={'Nhập mật khẩu hiện tại'} preset={'linkTitle'}/>
                  <Spacer height={15}/>
                  <Block>
                  <Text text={'Vui lòng nhập mật khẩu hiện tại để đổi mật khẩu.'} preset={'textMenu'} color={ColorDefault.text} />
                  </Block>
              </Block>
              <Spacer height={10}/>

              <Block height={120} paddingLeft={15} middle>
                 <Otp length={6}
                      ref={_otpRef}
                      onOtpValid={() => {}}
                      onOtpValue={(pwd) => onPasswordCheck(pwd)}
                 />
                  <Spacer height={15}/>

                  <HelperText
                      visible={otpValid}
                      msg={'Mã xác thực không đúng, vui lòng thực hiện lại'}
                      type={'error'}
                  />

              </Block>

              <Spacer height={10}/>


          </Screen>
      </Block>
  );
};
export const ChangePwdStep1 = memo(ChangePwdStep1Component, isEqual);
