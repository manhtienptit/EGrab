import React, { memo, useRef, useState } from 'react';
import { Alert } from 'react-native';

import isEqual from 'react-fast-compare';

import {dispatch, genSHA256} from '@common';
import {
    ActionSheet,
    Block,
    Button,
    CheckBox,
    Divider,
    DropDown,
    HelperText,
    LightBox,
    Otp,
    Progress,
    RadioButton,
    Screen,
    Select,
    Slider,
    Spacer,
    Switch,
    Text,
    TextField,
    TouchableScale,
    Wallpaper,
    CommentLoading, Icon, showSnack
} from '@components';
import { useAnimatedState } from '@hooks';
import { FormLoginType } from '@model/authentication';
import {appActions, authenticationActions} from '@redux-slice';

import { FormLogin } from './components/form-login';
import {TypeMessage} from "@components/snack-bar/type";
import {navigationRef} from "@navigation/navigation-service";
import {APP_SCREEN} from "@navigation/screen-types";
import {getDeviceId} from "../../../common/native-module/app-module";

const LoginComponent = () => {
  // state
  const _refAction = useRef<ActionSheet>();

  // function
  const onSubmit = (data: FormLoginType) => {



      let pwd = data.password;
      console.log('==========================1========================================')
      data.device_key = getDeviceId();
      console.log('===========================2=======================================')
      data.password = genSHA256(pwd);
      console.log('============================3======================================')
      data.layout_engine = '1.0';


      // showSnack({msg : data.device_key, type : 'error'});

      dispatch(authenticationActions.login(data));

      // showSnack({msg : data.username , type : 'error'});
  };


  const _onShowAction = async () => {
    _refAction.current?.show();
  };

  // render
  return (
    <Block block paddingTop={0} paddingHorizontal={15}>
      <Screen
        bottomInsetColor="transparent"
        style={{ paddingVertical: 0, paddingHorizontal: 10 }}
        backgroundColor={'transparent'}>

        <Block height = {170} marginTop={20} >
          <Icon icon={'logo'} size = {80} />
          <Text text={'Đăng nhập 👋'} preset={'linkSubtitle'}/>
          <Spacer height={10}/>
          <Text text={'Vui lòng nhập thông tin bên dưới'} color={''} />
        </Block>

        <FormLogin onSubmit={onSubmit} />
          <Block middle>
            <Block  marginTop={20}  direction={'row'} middle>
              <Text text={'Quên mật khẩu? Lấy lại '} color={''} />
                <TouchableScale
                    onPress={() => {
                        navigationRef?.current?.navigate(APP_SCREEN.FORGOT_PASSWORD)
                        // showSnack({msg : 'ádjhasdkjhasdkjhasd ád ákjdh aksjhd ákjdh ákjdjh dsjk hádjkh ' , type : 'error'});
                    }} >
                    <Text text={'tại đây'} preset={'hyperLink'} />
                </TouchableScale>
            </Block>
          </Block>


      </Screen>
    </Block>
  );
};
export const Login = memo(LoginComponent, isEqual);
