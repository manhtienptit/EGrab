import React, {useState} from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { PopupType } from '@model/app';
import { popupValidation } from '@validate/app';

import { Input } from './input';

import {Icon, Spacer ,TouchableScale , Button , Block} from "@components";
import {sizeScale} from "@common";
import {FormOrderAcceptProps} from "@features/authentication/home-work-detail/type";
import {KeyboardAvoidingView} from "react-native";
import {goBack} from "@navigation/navigation-service";

export const FormAccpted = ({ onSubmit , onReject}: FormOrderAcceptProps) => {
  // state
  const formMethod = useForm<PopupType>({
    mode: 'all',
    resolver: yupResolver(popupValidation),
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

                { !onReject && <Input<FormLoginType> name={'cost'} label={'Nhập chi phí'}  keyboardType={'number-pad'}/> }
                  <Spacer height={10}/>
                  <Input<FormLoginType> height={sizeScale(120)} name={'note'} label={onReject ? 'Ghi chú' : 'Mô tả thêm'} numberOfLines={5} multiline={true} />
                  <Spacer height={20}/>

                  <Button  text={onReject ? 'Gửi' :'Tiếp nhận'} onPress={onSubmitKey} preset={'outline'} buttonColorTheme = {'btnSign'} textColor = {'white'} />
            </Block>


    </FormProvider>
  );
};
