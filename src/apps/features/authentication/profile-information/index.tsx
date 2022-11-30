import React, {memo, useEffect} from 'react';

import isEqual from 'react-fast-compare';
import {goBack} from "@navigation/navigation-service";
import {dispatch, genSHA256, getState, logout} from "@common";
import {authenticationActions , appActions} from "@redux-slice";
import {AppState} from "@model/app";
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
    Icon,
} from '@components';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import {BackHandler, Image, View} from 'react-native';

import {styles} from "@features/authentication/profile/styles";
import {FormInfor} from "@features/authentication/profile-information/components/form-info";
import {FormLoginType} from "@model/authentication";
import {FormInformationType} from "@model/user";
import { sizeScale } from '@common';
import {useSelector} from "react-redux";
import {selectAppProfile, selectAppToken, selectAppWorkerSite} from "@redux-selector/app";
import {Header} from "@components/header";
import moment, { Moment } from 'moment';


const InforComponent = () => {

    const token = useSelector(selectAppToken);
    const profile = useSelector(selectAppProfile);
    const workerSite  = useSelector(selectAppWorkerSite);

    // console.log(new Date(workerSite?.birthday))


    const onSubmit = (data: FormInformationType) => {

        data.sex = data?.sex?.id ?? 'M';

        // console.log(data?.birthday)
        // console.log(data?.birthday === '')
        // console.log(data?.birthday && data?.birthday?.date !== undefined)


        if(data?.birthday !== '')
            data.birthday = moment(new Date(data?.birthday?.date ?? data?.birthday)).format("YYYY-MM-DD");


        let body = {
            access_token: token,
            worker_site_id: profile?.worker_site?.id ?? '',
            fullname: data.fullname,
            nickname: data.fullname,
            date_of_birth: data?.birthday === '' ? workerSite?.birthday : data?.birthday,
            sex: data.sex,
            address_full: data.address_full,
            address_district_code: '',
            address_province_code: '',
            address_ward_code: '',
            identification_number: data.customer_id_value,
            email: data.email,
            phone: data.phone_number,
        }


        dispatch(authenticationActions.updateProfile(body));
    };

    // render
    return (
        <Block block paddingTop={sizeScale(0)}  color={'white'}>
            <Screen
                bottomInsetColor="transparent"
                style={{ paddingVertical: 0, paddingHorizontal: 10 }}
                backgroundColor={'white'}>
                <Header title={'Thông tin cá nhân'} onPress={() => {goBack()}} />
                <Spacer height={sizeScale(10)}/>
                <Divider/>
              <Block block>
                <Screen
                    bottomInsetColor="transparent"
                    scroll
                    style={{ paddingVertical: 0, paddingHorizontal: 10 }}
                    backgroundColor={'white'}>

                    <Block block justifyContent={'center'} direction={"column"}  paddingTop={0}>
                        <Block block middle height={180}>
                            <View style = {styles.outter}>
                                <FastImage
                                    style = {styles.inner}
                                    resizeMode = {'contain'}
                                    source={{ uri : profile?.working_site?.avatar }}
                                />
                                <View style = {styles.avatar}>
                                    <Icon icon={'camera'} size={50}/>
                                </View>
                            </View>
                        </Block>

                        <Block>
                              <FormInfor onSubmit={onSubmit} profileInfo={workerSite} />
                        </Block>
                    </Block>
                </Screen>
              </Block>
            </Screen>
        </Block>

);
};

export const Infor = memo(InforComponent, isEqual);
