import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import {Block, Button, Icon, Screen, showSnack, Spacer, Text, TouchableScale, Wallpaper} from '@components';
import {goBack, navigationRef} from '@navigation/navigation-service';
import {APP_SCREEN} from "@navigation/screen-types";
import {FormOtp} from "@features/un-authentication/forgot-password/components/form-otp";
import {ForgotPwdType, FormLoginType} from "@model/authentication";
import {dispatch} from "@common";
import {authenticationActions} from "@redux-slice";

const ForgotComponent = () => {

    // function
    const onSubmit = (data: ForgotPwdType) => {

        let body = {
             owner_id: data.phone,
             ttl: 60,
             resend_after_second : 60
        }

        dispatch(authenticationActions.forgotPass(body));



        // console.log('data')

        // showSnack({msg : data.phone , type : 'error'});
    };


  // render
  return (
      <Block block paddingTop={0} paddingHorizontal={15}>
          <Screen
              bottomInsetColor="transparent"
              style={{ paddingVertical: 0, paddingHorizontal: 10 }}
              backgroundColor={'transparent'}>
              <Block direction={'row'} middle paddingLeft = {5}>
                  <Button
                      onPress={() => {
                          goBack();
                      }}>
                  <Icon  icon={'backarr'} />
                  </Button>
                  <Spacer width={70}/>
                  <Text textAlign={'center'} text={'Lấy lại mật khẩu'} preset={'linkSubtitle'}/>
              </Block>

              <Block height = {220} middle marginTop={20} >
                  <Icon icon={'forgot'} size = {120} />
                  <Spacer height={20}/>
                  <Text text={'Quên mật khẩu'} preset={'linkSubtitle'}/>
                  <Spacer height={10}/>
                  <Text text={'Vui lòng nhập tài khoản bạn muốn lấy lại mật khẩu.'} color={''} />
              </Block>
              <Spacer height={10}/>
              <FormOtp  onSubmit={onSubmit}/>


          </Screen>
      </Block>
  );
};
export const ForgotPwd = memo(ForgotComponent, isEqual);
