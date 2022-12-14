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
import {useCountdown} from "usehooks-ts";
import {useSelector} from "react-redux";
import {selectAppPhone, selectAppToken} from "@redux-selector/app";
import {dispatch} from "@common";
import {authenticationActions} from "@redux-slice";
import {APP_SCREEN} from "@navigation/screen-types";


const OTPComponent = () => {

    //state

    const _otpRef = useRef(null);

    const phone = useSelector(selectAppPhone);

    const [otpValid , setOTPValid] =  useState<boolean>(false);

    const [count, { startCountdown, stopCountdown, resetCountdown }] =
        useCountdown({
            countStart: 60,
            intervalMs: 1000,
        })

    useEffect(() => {
        startCountdown()
        return () => {
            stopCountdown()
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // function
    const onSubmit = (data: FormLoginType) => {


        resetCountdown();
        startCountdown();

        let body = {
            owner_id: phone,
            ttl: 60,
            resend_after_second : 60
        }

        dispatch(authenticationActions.forgotPass(body));

        // dispatch(authenticationActions.forgotPass(data));

        // console.log('data')

        // showSnack({msg : data.phone , type : 'error'});
    };

    const onOTPValid = (otp) => {


        let body = {
             owner_id: phone,
             otp: otp,
             ttdne: 60,
             next_event_name: "RESET_PASSWORD",
             device_key: "",
             lang: "vi"
        }


        dispatch(authenticationActions.verifyOTPReset(body));

        if (_otpRef.current) {
            _otpRef.current.clearOTP();
        }

        // setOTPValid(true);
        // startCountdown
        // // Alert.alert('DONE OTP');
    };



    // render
  return (
      <Block block paddingTop={0} paddingHorizontal={15} middle>
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
                  <Text textAlign={'center'} text={'L???y l???i m???t kh???u'} preset={'linkSubtitle'}/>
              </Block>

              <Block height = {220} middle marginTop={20} >
                  <Icon icon={'forgot'} size = {120} />
                  <Spacer height={20}/>
                  <Text text={'X??c th???c m?? OTP'} preset={'linkTitle'}/>
                  <Spacer height={15}/>
                  <Block>
                  <Text text={`M?? x??c th???c ???????c g???i v??o tin nh???n SMS \n ??i???n tho???i s??? : ${phone}`} preset={'textNormal'} color={ColorDefault.text} />
                  </Block>
              </Block>
              <Spacer height={10}/>

              <Block height={100} paddingLeft={15} middle>
                 <Otp length={6}
                      ref={_otpRef}
                      onOtpValid={() => {}}
                      onOtpValue={(otp) => onOTPValid(otp)}
                 />
                  <HelperText
                      visible={otpValid}
                      msg={'M?? x??c th???c kh??ng ????ng, vui l??ng th???c hi???n l???i'}
                      type={'error'}
                  />
              </Block>

              <Spacer height={10}/>
              <Block middle>
              {count > 0 ?
                  <Block direction={'row'} middle >
                      <Text text={'G???i l???i m?? x??c th???c sau   '} preset={'textNormal'} color={ColorDefault.text} />
                      <Text text={'00 : ' + (count < 10 ? '0'+count : count)} preset={'linkMedium'} color={ColorDefault.link} />
                  </Block>
                         :
                  <Button  onPress={onSubmit} >
                      <Block direction={'row'} middle >
                          <Icon icon={'refresh'} size = {20} />
                          <Spacer width={10}/>
                          <Text text={'G???i l???i m?? x??c th???c'} preset={'linkMedium'} color={ColorDefault.link} />
                      </Block>
                  </Button>
              }
              </Block>


          </Screen>
      </Block>
  );
};
export const OTPPwd = memo(OTPComponent, isEqual);
