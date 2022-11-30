import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import moment, { Moment } from 'moment';

import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './styles';
import {DateOption, SelectProps} from './type';

import {Icon} from "@components";

import DatePicker from 'react-native-date-picker'


export const DatePickerComponent = (props: SelectProps) => {
  // state
  const [t] = useTranslation();
  const inset = useSafeAreaInsets();
  const {
    textItemStyle,
    rightChildren,
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
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [visible, setVisible] = useState(false);

  // function
  const onDateSelected = (item: DateOption) => {
    setVisible(false);
    setSelectedText(item.text);
    setSelectedDate(item.date)
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
        <TouchableOpacity style={{flex : 1}} onPress={showDrop} activeOpacity={0.68}>
          <View style={[styles.rowButton]}>
            <Text children={selectedText} />
            {rightChildren}
          </View>
        </TouchableOpacity>
          <DatePicker
              modal
              open={visible}
              date={selectedDate}
              mode={'date'}
              onConfirm={(date) => {
                  onDateSelected({
                      date : date,
                      text : (moment(date)).format('DD-MM-YYYY'),
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
