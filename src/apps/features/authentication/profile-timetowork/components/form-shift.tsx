import React, {useState,useEffect, useMemo} from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from './input';

import { FormInforProps } from '../type';
import {Icon, Spacer ,TouchableScale , Button , Block} from "@components";
import {FormInformationType} from "@model/user";
import {partnerValidation} from "@validate/profile";


export const FormInfor = ({ onSubmit  , profileInfo}: FormInforProps ) => {

    // state
    const formMethod = useForm<FormInformationType>({
        mode: 'all',
         resolver: yupResolver(partnerValidation),
    });

    const { register, reset, handleSubmit } = useForm({
        defaultValues: useMemo(() => {
            return profileInfo;
        }, [profileInfo])
    });

    useEffect(() => {
        reset(profileInfo);
    }, [profileInfo]);

    const [hidden, setHidden] = useState<boolean>(true);

    // function
    const onSubmitKey = () => {
        formMethod.handleSubmit(onSubmit)();
    };

    const onHiddenClick = () => {
        setHidden(!hidden)
    };


    // render
    return (
        <FormProvider {...formMethod}>
                <Block  >
                    <Input<FormInformationType> name={'fullname'} label={'Họ và tên'} icon = {'user'}  keyboardType={''} defaultValue={profileInfo?.fullname} />
                        <Spacer height={10}/>

                        <Input<FormInformationType> name={'phone_number'} label={'Điện thoại'} icon = {'phone'}  keyboardType={'number-pad'}  defaultValue={profileInfo?.phone_number}/>
                            <Spacer height={10}/>


                </Block>

            <Block  >
                <Button  text={'Lưu thay đổi'} onPress={onSubmitKey} preset={'outline'} buttonColorTheme = {'btnSign'} textColor = {'white'} />
            </Block>



        </FormProvider>
    );
};
