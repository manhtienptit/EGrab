/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import {CustomOmit, sizeScale} from '@common';
import {HelperText, Button, Block, Spacer, Icon, Text, CheckBox} from '@components';
import { InputFlatProps } from '@components/text-field/components/flat/type';
import {FormInformationType, ShiftWorkType} from "@model/user";
import {TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {ColorDefault} from "@theme/color";
import {stylesText} from "@components/button/preset";
import {TimePickerComp} from "@features/authentication/profile-timetowork/components/time-picker";
import {TimePickerComponent} from "@components/time-picker";



export const ShiftComponent = <T extends Record<string, any>>({
                                                         onSubmit,
                                                         onPressIn,
                                                         label,
                                                         name,
                                                         nameTrigger,
                                                         dateOfWeek = '',
                                                         onToggle,
                                                         onPressStart,
                                                         onPressEnd,
                                                         startTime,
                                                         endtime,
                                                     }: ShiftWorkType<T>) => {

          console.log(startTime)

    // render
    return (
       <Block height={sizeScale(200)} >


           <Block middle direction={'column'} height={sizeScale(70)} marginHorizontal={10}>

               <Block block direction={'row'} >
                   <Block block>
                     <CheckBox value={dateOfWeek.includes('MON')} text={'Thứ 2'} onToggle={(newValue) => onToggle('MON' , newValue)} />
                   </Block>

                   <Block block>
                       <CheckBox value={dateOfWeek.includes('TUE')} text={'Thứ 3'} onToggle={(newValue) => onToggle('TUE',newValue)} />
                   </Block>
                   <Block block>
                       <CheckBox value={dateOfWeek.includes('WED')} text={'Thứ 4'} onToggle={(newValue) => onToggle('WED',newValue)} />
                   </Block>

                   <Block block>
                       <CheckBox value={dateOfWeek.includes('THU')} text={'Thứ 5'} onToggle={(newValue) => onToggle('THU',newValue)} />
                   </Block>

               </Block>

               <Block block direction={'row'} >
                   <Block block>
                       <CheckBox value={dateOfWeek.includes('FRI')} text={'Thứ 6'} onToggle={(newValue) => onToggle('FRI',newValue)} />
                   </Block>

                   <Block block>
                       <CheckBox value={dateOfWeek.includes('SAT')} text={'Thứ 7'} onToggle={(newValue) => onToggle('SAT',newValue)} />
                   </Block>

                   <Block block>
                       <CheckBox value={dateOfWeek.includes('SUN')} text={'Chủ nhật'} onToggle={(newValue) => onToggle('SUN',newValue)} />
                   </Block>

               </Block>

           </Block>

           <Spacer height={15}/>

           <Block middle direction={'row'} >
               <Block block marginRight={10} >
                   <TimePickerComponent textPrefix={'Bắt đầu'} defaultSelect={`Bắt đầu : ${startTime.toString()}` ?? 'Giờ bắt đầu'}  onPress={(item) => onPressStart(item.text)}/>
               </Block>
               <Block  block marginLeft={10}>
                   <TimePickerComponent textPrefix={'Kết thúc'} defaultSelect={`Kết thúc : ${endtime.toString()}` ?? 'Giờ kết thúc'} onPress={(item) => onPressEnd(item.text)}/>
               </Block>
           </Block>

           <Spacer height={20}/>

           <Block  >
               {false &&
               <Button  text={'+  Thêm ca làm việc'} preset={'stroke'} buttonColorTheme = {'white'} textColor = {ColorDefault.btnSign} />
               }
           </Block>

       </Block>
    );
};
