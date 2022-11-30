import React, {memo, useEffect, useState} from 'react';

import isEqual from 'react-fast-compare';
import {goBack} from "@navigation/navigation-service";
import {Button, Block, Screen, Spacer, Icon, Text, Divider, Select} from "@components";
import {dispatch, getState, logout, sizeScale} from "@common";
import {ColorDefault} from "@theme/color";
import {workActions} from "../../../redux/action-slice/worker";
import {authenticationActions} from "@redux-slice";
import {useSelector} from "react-redux";
import {selectAppDistric, selectAppDistrics, selectAppProvinces, selectAppWorkerSite} from "@redux-selector/app";
import {useTranslation} from "react-i18next";
import {FormInformationType} from "@model/user";
import {AppState} from "@model/app";
import {Header} from "@components/header";



const WorkPlaceComponent = () => {


    const [t] = useTranslation();


    useEffect(() => {

        if(provinces && provinces.length > 0)
            setProvinceSelected(provinces?.find(element => wokerSite?.location_province_code.startsWith(element.city_code.trim())) ?? {})

        if( wokerSite?.location_district_code && wokerSite?.location_district_code !== '' ){

                    setDistricSelected({district_code : wokerSite?.location_district_code})

                    const body = {province_code : wokerSite?.location_province_code}
                    dispatch(workActions.getDistrics(body))
        }



    }, []);

    // useEffect(() => {
    //
    //     console.log('ádasdASDASDASD')
    //
    //
    // }, [provinces]);


    useEffect(() => {

        // setProvinceSelected();
        console.log(districs)

    }, [districs]);


    const [provinceSelected, setProvinceSelected] = useState<any>({});
    const [districSelected, setDistricSelected] = useState<any>({});


    const {provinces } = useSelector(selectAppProvinces);
    const {districs } = useSelector(selectAppDistrics);

    const wokerSite = useSelector(selectAppWorkerSite);


    // console.log(wokerSite)

    const onSubmit = () => {

        const { token , profile }: AppState = getState('app');

        let body = {
            access_token: token,
            // worker_site_id: profile?.worker_site?.id ?? '',
            // date_of_birth: profile?.worker_site?.birthday ?? '',
            // address_district_code: '',
            // address_province_code: '',
            // address_ward_code: '',
            working_location_city:  provinceSelected?.city_code,
            working_location_district: districSelected?.district_code,
            // ...profile?.worker_site,

        }

        dispatch(authenticationActions.updateLocationWorkingProfile(body));
    };


    // render
  return (
      <Block block paddingTop={sizeScale(0)} style={{overflow: 'hidden'}} color={'white'}>

          <Screen
              bottomInsetColor="transparent"
              style={{ paddingVertical: 0, paddingHorizontal: 15 }}
              backgroundColor={'white'}>

              <Header title={'Địa bàn hoạt động'} onPress={() => {goBack()}} />
              <Spacer height={sizeScale(10)}/>
              <Divider/>

              <Block marginTop={sizeScale(25)} style={{flex : 1}} >
                  <Text textAlign={'left'} text={'Lựa chọn khu vực hoạt động'} preset={'linkLarge'} color={'black'}/>
              </Block>

              <Block  style={{flex : 15}} >

                  <Select defaultSelect={provinceSelected?.city_name}
                          data={provinces}
                          prefix={provinceSelected?.city_type ?? ''}
                          customItem={(item , index) => <Text text={`${item.city_type} ${item.city_name}`}/>}
                          onPress={(item, index) => {
                              setProvinceSelected(item)
                              setDistricSelected(null)
                              const body = {province_code : item.city_code}
                              dispatch(workActions.getDistrics(body))
                          }}
                  />

                  <Spacer height={sizeScale(15)}/>

                  <Select defaultSelect={wokerSite?.location_district_name ??  t('dialog:distric')}
                          data={districs}
                           prefix={districSelected?.district_type ?? ''}
                           customItem={(item , index) => <Text text={`${item.district_type} ${item.district_name}`}/>}
                           onPress={(item, index) => {
                               setDistricSelected(item)
                               // const body = {province_code : item.city_code}
                               // dispatch(authenticationActions.getDistrics(body))
                           }}
                  />


                  <Spacer height={sizeScale(40)}/>

                  { false &&
                      <Block  >
                          <Button  text={'+  Thêm địa bàn'} preset={'stroke'} buttonColorTheme = {'white'} textColor = {ColorDefault.btnSign} />
                      </Block>
                  }

              </Block>


              <Block paddingHorizontal={20} >
                  <Button  text={'Lưu thay đổi'} preset={'outline'} buttonColorTheme = {'btnSign'} textColor = {'white'}
                           onPress={onSubmit}
                  />
              </Block>

          </Screen>
      </Block>
  );
};

export const WorkPlace = memo(WorkPlaceComponent, isEqual);
