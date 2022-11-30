import React, {useState} from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormLoginType } from '@model/authentication';
import { loginValidation } from '@validate/login';

import { Input } from './input';

import { FormLoginProps } from '../type';
import {Icon, Spacer ,TouchableScale , Button} from "@components";

export const FormLogin = ({ onSubmit }: FormLoginProps) => {
  // state
  const formMethod = useForm<FormLoginType>({
    mode: 'all',
    resolver: yupResolver(loginValidation),
  });

  const [hidden, setHidden] = useState<boolean>(true);

  // function
  const onSubmitKey = () => {
    formMethod.handleSubmit(onSubmit)();
  };

    const onHiddenClick = () => {
        setHidden(!hidden)
    };


  const rightIcon =
           <TouchableScale onPressIn = {() => onHiddenClick()}>
               <Icon icon={ hidden ? 'eyeoff' : 'eye'} />
           </TouchableScale>;


  // render
  return (
    <FormProvider {...formMethod}>
      <Input<FormLoginType> name={'username'} label={'Tài khoản'} icon = {'user'}  />
      <Spacer height={10}/>
      <Input<FormLoginType> name={'password'} label={'Mật khẩu'} isSecure = {hidden ? true : false} icon = {'lock'} rightChildren = {rightIcon} keyboardType={'number-pad'}/>
      <Spacer height={20}/>

      <Button  text={'Đăng nhập'} onPress={onSubmitKey} preset={'outline'} buttonColorTheme = {'btnSign'} textColor = {'white'} />


    </FormProvider>
  );
};
