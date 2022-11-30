import React, {useState,useEffect, useMemo} from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormLoginType } from '@model/authentication';
import { loginValidation } from '@validate/login';

import { Input } from './input';
import { DatePickerComp } from './date-picker';
import { SelectGender } from './select-gender';

import { FormInforProps } from '../type';
import {Icon, Spacer ,TouchableScale , Button , Select} from "@components";
import {FormInformationType} from "@model/user";
import {profileValidation} from "@validate/profile";
import moment, { Moment } from 'moment';


export const FormInfor = ({ onSubmit  , profileInfo}: FormInforProps ) => {

    // state
    const formMethod = useForm<FormInformationType>({
        mode: 'all',
        resolver: yupResolver(profileValidation),
    });

    const { register, reset, handleSubmit } = useForm({
        defaultValues: useMemo(() => {
            return profileInfo;
        }, [profileInfo])
    });

    const sexData = [{ text: 'Nam' , id : 'M' }, { text: 'Nữ' , id : 'F' }]

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
            <Input<FormInformationType> name={'fullname'} label={'Họ và tên'} icon = {'user'}  keyboardType={''} defaultValue={profileInfo?.fullname} />
                <Spacer height={10}/>



                  <SelectGender<FormInformationType> name={'sex'} data={sexData} icon = {'gender'} defaultSelect={sexData.find(value => value.id ===  profileInfo?.sex)?.text} />
                     <Spacer height={10}/>

                        <DatePickerComp<FormInformationType> name={'birthday'} label={'Ngày sinh'} icon = {'birth'}  defaultSelect={moment(new Date(profileInfo?.birthday)).format("DD-MM-YYYY")} />
                         <Spacer height={10}/>


                            <Input<FormInformationType> name={'customer_id_value'} label={'Số CCCD/CMND'} icon = {'idcard'}  defaultValue={profileInfo?.customer_id_value}/>
                            <Spacer height={10}/>

                            <Input<FormInformationType> name={'phone_number'} label={'Điện thoại'} icon = {'phone'}  keyboardType={'number-pad'}  defaultValue={profileInfo?.phone_number}/>
                                    <Spacer height={10}/>

                                    <Input<FormInformationType> name={'email'} label={'Email'} icon = {'email'}   defaultValue={profileInfo?.email}/>
                                        <Spacer height={10}/>

                                        <Input<FormInformationType> name={'address_full'} label={'Địa chỉ'} icon = {'marker'}   defaultValue={profileInfo?.address_full}/>
                                             <Spacer height={20}/>

            <Button  text={'Lưu thay đổi'} onPress={onSubmitKey} preset={'outline'} buttonColorTheme = {'btnSign'} textColor = {'white'} />



        </FormProvider>
    );
};
