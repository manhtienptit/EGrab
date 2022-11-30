import React, {memo, useEffect, useState} from 'react';

import isEqual from 'react-fast-compare';
import {goBack, navigationRef} from "@navigation/navigation-service";
import {Button, Block, Screen, Spacer, Icon, Text, Divider, RadioButton, showSnack} from "@components";
import {dispatch, getState, logout, sizeScale} from "@common";
import {ColorDefault} from "@theme/color";
import {workActions} from "../../../redux/action-slice/worker";
import {authenticationActions} from "@redux-slice";
import {useSelector} from "react-redux";
import {selectAppProfile, selectAppProvinces, selectAppToken, selectAppWorkerSite} from "@redux-selector/app";
import {useTranslation} from "react-i18next";
import {FormInfor} from "@features/authentication/profile-partner/components/form-info";
import {FormInformationType} from "@model/user";
import {View} from "react-native";
import {ShiftComponent} from "@features/authentication/profile-timetowork/components/shift-component";
import {orderActions} from "../../../redux/action-slice/orders";
import {AppState} from "@model/app";
import {Header} from "@components/header";



const TimeToWorkComponent = () => {


    const token = useSelector(selectAppToken);
    const wokerSite = useSelector(selectAppWorkerSite);

    const [startTime, setStartTime] = useState<string>(wokerSite?.hour_start_to_working ?? '');
    const [endTime, setEndTime] = useState<string>(wokerSite?.hour_stop_to_working ?? '');
    const [dateOfWeekArr, setDateOfWeekArr] = useState<string[]>([]);


    console.log(wokerSite);


    useEffect( () => {

        setDateOfWeekArr( wokerSite?.day_availble_to_working?.split(',') ?? []);
        setStartTime( wokerSite?.hour_start_to_working ?? '');
        setEndTime( wokerSite?.hour_stop_to_working ?? '');

    }, [wokerSite]);

    useEffect( () => {

        // console.log(startTime);

    }, [startTime]);


    const onSubmit = () => {

        const { token , profile }: AppState = getState('app');

        let body = {
            access_token: token,
            start_time: startTime ?? '',
            stop_time: endTime ?? '',
            day_to_work: dateOfWeekArr.toString()
        }

        dispatch(authenticationActions.updateWorkingTime(body))


    };

    // render
  return (
      <Block block paddingTop={sizeScale(5)} style={{overflow: 'hidden'}} color={'white'}>

          <Screen
              bottomInsetColor="transparent"
              style={{  paddingHorizontal: 15 , flex : 1}}
              backgroundColor={'white'}>
              <Header title={'Thời gian hoạt động'} onPress={() => {goBack()}} />
              <Spacer height={sizeScale(10)}/>
              <Divider/>

              <View style={{flex : 1 ,  marginTop : sizeScale(10)}} >
                  <View style={{flex : 13}} >
                      <Screen
                          bottomInsetColor="transparent"
                          scroll
                          backgroundColor={'white'}>

                          <Block marginTop={sizeScale(25)} style={{flex : 1}} >
                              <Text textAlign={'left'} text={'Lựa chọn thời gian hoạt động'} preset={'linkLarge'} color={'black'}/>
                          </Block>

                          <Spacer height={sizeScale(40)}/>

                          <Block direction={'row'} middle >
                              <Block block direction={'row'} middle >
                                  <RadioButton initialValue={true} disabled={true}/>
                                  <Spacer width={10}/>
                                  <Text textAlign={'center'} text={'Lịch cố định'} preset={'textMenu'} color={'black'}/>
                              </Block>
                              <Block block direction={'row'} middle >
                                  <RadioButton disabled={true}/>
                                  <Spacer width={10}/>
                                  <Text textAlign={'center'} text={'Lịch linh hoạt'} preset={'textMenu'} color={'black'}/>
                              </Block>
                          </Block>

                          <Spacer height={sizeScale(15)}/>

                          <Divider color={ColorDefault.border}/>

                          <Spacer height={sizeScale(20)}/>


                          <ShiftComponent  onToggle={(date , value) => {

                             let containDate = dateOfWeekArr.includes(date);

                              if(containDate)
                              {
                                  let index = dateOfWeekArr.indexOf(date);
                                  setDateOfWeekArr(
                                      [
                                          ...dateOfWeekArr.slice(0, index),
                                          ...dateOfWeekArr.slice(index + 1)
                                      ]);
                              } else
                                  setDateOfWeekArr([...dateOfWeekArr , date])
                          }}
                               dateOfWeek={dateOfWeekArr}
                                           startTime={startTime}
                               endtime={endTime}
                               onPressStart={(time) => {setStartTime(time)}}
                               onPressEnd={(time) => {setEndTime(time)}}
                          />

                      </Screen>

                  </View>


                  <View style={{flex : 1 }} >
                      <Button  text={'Lưu thay đổi'} preset={'outline'} buttonColorTheme = {'btnSign'} textColor = {'white'}
                               onPress={onSubmit}
                      />
                  </View>

              </View>
          </Screen>
      </Block>
  );
};

export const TimeToWork = memo(TimeToWorkComponent, isEqual);
