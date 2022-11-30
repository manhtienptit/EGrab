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
import {appActions} from "@redux-slice";
import {AppState} from "@model/app";
import {selectAppPassword, selectAppProfile} from "@redux-selector/app";
import {useSelector} from "react-redux";


const ResetPwdStep2Component = () => {

    //state
    const [pwdValid , setpwdValid] =  useState<boolean>(false);

    // function
    const onSubmit = (data: FormLoginType) => {

    };

    const password  = useSelector(selectAppPassword);



    const onOTPValid = (newPassword) => {

        let passCrypto = genSHA256(newPassword);

        if(password == passCrypto){
            setpwdValid(true)
        }
        else {
            setpwdValid(false)
            dispatch(appActions.setPassword(newPassword));
            navigationRef?.current?.navigate(APP_SCREEN.RESET_PASSWORD_3)
        }
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
                  <Text textAlign={'center'} text={'Đổi mật khẩu'} preset={'linkLarge'}/>
              </Block>

              <Block height = {220} middle marginTop={20} >
                  <Icon icon={'forgot'} size = {120} />
                  <Spacer height={20}/>
                  <Text text={'Tạo mật khẩu mới'} preset={'linkTitle'}/>
                  <Spacer height={15}/>
                  <Block>
                  <Text text={'Vui lòng ghi nhớ mật khẩu để xác nhận khi tạo hoá đơn cho khách hàng.'} preset={'textMenu'} color={ColorDefault.text} />
                  </Block>
              </Block>
              <Spacer height={10}/>

              <Block height={180} paddingLeft={15} middle>
                 <Otp length={6} onOtpValue={(pwd) => onOTPValid(pwd)} onOtpValid={() => {}} />
                  <Spacer height={15}/>

                  <HelperText
                      visible={pwdValid}
                      msg={'Mật khẩu mới không được trùng với mật khẩu hiện tại.'}
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
export const ResetPwdStep2 = memo(ResetPwdStep2Component, isEqual);
