import React, {useState} from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {ForgotPwdType, FormLoginType} from '@model/authentication';
import { loginValidation } from '@validate/login';

import { Input } from './input';

import { FormLoginProps } from '../type';
import {Icon, Spacer ,TouchableScale , Button} from "@components";
import {forgotValidation} from "@common";

export const FormOtp = ({ onSubmit }: FormLoginProps) => {
  // state
  const formMethod = useForm<ForgotPwdType>({
    mode: 'all',
    resolver: yupResolver(forgotValidation),
  });

  // function
  const onSubmitKey = () => {
    formMethod.handleSubmit(onSubmit)();
  };


  // render
  return (
    <FormProvider {...formMethod}>
      <Input<FormLoginType> name={'phone'} label={'Số điện thoại'} icon = {'phone'}  keyboardType={'number-pad'} />
          <Spacer height={15}/>
      <Button  text={'Tạo mã xác thực OTP'} onPress={onSubmitKey} preset={'outline'} buttonColorTheme = {'btnSign'} textColor = {'white'} />
    </FormProvider>
  );
};
