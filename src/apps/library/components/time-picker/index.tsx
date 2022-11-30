import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import moment, { Moment } from 'moment';

import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './styles';
import {TimeOption, SelectProps} from './type';

import {Button, Icon , Block , Spacer , Text} from "@components";

import DatePicker from 'react-native-date-picker'
import {ColorDefault} from "@theme/color";


export const TimePickerComponent = (props: SelectProps) => {
  // state
  const [t] = useTranslation();
  const inset = useSafeAreaInsets();
  const {
    textItemStyle,
    rightChildren,
    textPrefix,
    onPress,
    icon,
    customItem = undefined,
    useBottomInset = true,
    defaultSelect = t('dialog:date'),
    defaultDate = new Date(),
    data = [],
    ...rest
  } = props;
  const [selectedText, setSelectedText] = useState(defaultSelect);
  const [selectedTime, setSelectedTime] = useState(defaultDate);
  const [visible, setVisible] = useState(false);

  // function
  const onTimeSelected = (item: TimeOption) => {
    setVisible(false);
    setSelectedText(`${textPrefix} : ${item.text}`);
      setSelectedTime(item.date)

    // console.log(JSON.stringify(item))

    onPress && onPress(item);
  };

  const showDrop = () => {
    setVisible(true);
  };

  const hideDrop = () => {
    setVisible(false);
  };

  // render
  return (
    <>
      <View style={[styles.root]} collapsable={false}>
        {icon && <Icon style={[styles.icon]} icon={icon}  /> }
          <Button
              children={
                  <Block middle direction={'row'}>
                      <Icon icon={'clock'}/>
                      <Spacer width={5}/>
                      <Text textAlign={'center'} text={selectedText} preset={'textMenu'} color={ColorDefault.text_gray} />
                  </Block>
              }
              style={{flex : 1}}
              onPress={showDrop}
              buttonColorTheme = {'white'}/>
          <DatePicker
              modal
              open={visible}
              date={selectedTime}
              mode={'time'}
              title={'Chọn thời gian'}
              onConfirm={(date) => {
                  onTimeSelected({
                      date : date,
                      text : (moment(date)).format('HH:mm:ss'),
                  })
              }}
              onCancel={() => {
                  hideDrop()
              }}
          />
      </View>
    </>
  );
};
