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


const ChangePwdStep2Component = () => {

    //state
    const [pwdValid , setpwdValid] =  useState<boolean>(false);

    // function
    const onSubmit = (data: FormLoginType) => {

    };

    const password  = useSelector(selectAppPassword);



    const onOTPValid = (newPassword) => {

        let passCrypto = genSHA256(newPassword);

        if(password === passCrypto){
            setpwdValid(true)
        }
        else {
            setpwdValid(false)
            dispatch(appActions.setPassword(newPassword));
            navigationRef?.current?.navigate(APP_SCREEN.CHANGE_PASSWORD_3)
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
                  <Text textAlign={'center'} text={'?????i m???t kh???u'} preset={'linkLarge'}/>
              </Block>

              <Block height = {220} middle marginTop={20} >
                  <Icon icon={'forgot'} size = {120} />
                  <Spacer height={20}/>
                  <Text text={'T???o m???t kh???u m???i'} preset={'linkTitle'}/>
                  <Spacer height={15}/>
                  <Block>
                  <Text text={'Vui l??ng ghi nh??? m???t kh???u ????? x??c nh???n khi t???o ho?? ????n cho kh??ch h??ng.'} preset={'textMenu'} color={ColorDefault.text} />
                  </Block>
              </Block>
              <Spacer height={10}/>

              <Block height={180} paddingLeft={15} middle>
                 <Otp length={6} onOtpValue={(pwd) => onOTPValid(pwd)} onOtpValid={() => {}} />
                  <Spacer height={15}/>

                  <HelperText
                      visible={pwdValid}
                      msg={'M???t kh???u m???i kh??ng ???????c tr??ng v???i m???t kh???u hi???n t???i.'}
                      type={'error'}
                  />
                  <Spacer height={15}/>
                  <Text text={'L??u ??: Kh??ng chia s??? m???t kh???u cho b???t k??? ai.'} color={ColorDefault.otpInfo}/>

              </Block>

              <Spacer height={10}/>


          </Screen>
      </Block>
  );
};
export const ChangePwdStep2 = memo(ChangePwdStep2Component, isEqual);
