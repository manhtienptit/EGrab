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
import {dispatch, genSHA256, getState, sizeScale} from "@common";
import {appActions, authenticationActions} from "@redux-slice";
import {AppState} from "@model/app";
import {selectAppConfig, selectAppPassword, selectAppProfile, selectAppToken} from "@redux-selector/app";
import {useSelector} from "react-redux";
import {AppModule} from "@native-module";


const ChangePwdStep3Component = () => {

    const { password }: AppState = getState('app');

    const profile  = useSelector(selectAppProfile);
    const token  = useSelector(selectAppToken);


    //state
    const [otpValid , setOTPValid] =  useState<boolean>(false);
    const [notPassMatch , setNotPassMatch] =  useState<boolean>(false);


    // function
    const onSubmit = (data: FormLoginType) => {};

    // console.log(passnotMatch)


    const onOTPValid = (re_password) => {

        if(password === re_password) {

            let body = {
                 access_token: token,
                 login_name: profile?.worker_site?.phone_number,
                 password: genSHA256(password),
                 lang: "en"
            }

            setNotPassMatch(false);
            dispatch(authenticationActions.changePass(body));


        } else {
            setNotPassMatch(true);
        }

        // setPassMatch(!passnotMatch)
    }


    // render
  return (
      <Block block paddingTop={0} paddingHorizontal={15} middle color={'white'}>
          <Screen
              bottomInsetColor="transparent"
              style={{ paddingVertical: 0, paddingHorizontal: 10 }}
              backgroundColor={'white'}>
              <Block direction={'row'} middle paddingLeft = {5}>
                  <Button
                      onPress={() => {
                          goBack();
                      }}>
                      <Icon size={sizeScale(30)} icon={'backarr'} />
                  </Button>
                  <Spacer width={70}/>
                  <Text textAlign={'center'} text={'Lấy lại mật khẩu'} preset={'linkLarge'}/>
              </Block>

              <Block height = {220} middle marginTop={20} >
                  <Icon icon={'forgot'} size = {120} />
                  <Spacer height={20}/>
                  <Text text={'Xác nhận mật khẩu'} preset={'linkTitle'}/>
                  <Spacer height={15}/>
                  <Block>
                  <Text text={'Nhập lại mật khẩu.'} preset={'textMenu'} color={ColorDefault.text} />
                  </Block>
              </Block>
              <Spacer height={10}/>

              <Block height={180} paddingLeft={15} middle>
                 <Otp length={6} onOtpValue={(pwd) => onOTPValid(pwd)} onOtpValid={() => {}} />
                  <Spacer height={15}/>
                  <HelperText
                      visible={notPassMatch}
                      msg={'Mật khẩu không trùng khớp'}
                      type={'error'}
                  />
                  <Spacer height={15}/>
                  <Text text={'Lưu ý: Không chia sẻ mật khẩu cho bất kỳ ai.'} color={ColorDefault.otpInfo}/>

              </Block>

              <Spacer height={10}/>


          </Screen>
      </Block>
  );
};
export const ChangePwdStep3 = memo(ChangePwdStep3Component,isEqual);
