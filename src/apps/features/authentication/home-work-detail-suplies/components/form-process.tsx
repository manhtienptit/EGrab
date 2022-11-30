import React, {useState} from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormLoginType } from '@model/authentication';
import { loginValidation } from '@validate/login';

import { Input } from './input';

import { FormLoginProps } from '../type';
import {Icon, Spacer ,TouchableScale , Button , Block} from "@components";
import {sizeScale} from "@common";

export const FormAccpted = ({ onSubmit }: FormLoginProps) => {
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
        <Block paddingHorizontal={sizeScale(20)} marginTop={sizeScale(20)} >
              <Input<FormLoginType> name={'username'} label={'Nhập chi phí'}  keyboardType={'number-pad'}/>
              <Spacer height={10}/>
              <Input<FormLoginType> height={sizeScale(120)} name={'password'} label={'Mô tả thêm'} numberOfLines={5}/>
              <Spacer height={20}/>

              <Button  text={'Đăng nhập'} onPress={onSubmitKey} preset={'outline'} buttonColorTheme = {'btnSign'} textColor = {'white'} />
        </Block>


    </FormProvider>
  );
};
