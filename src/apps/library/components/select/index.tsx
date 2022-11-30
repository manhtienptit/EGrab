import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SelectItem } from './select-item';
import { styles } from './styles';
import { SelectOption, SelectProps } from './type';

// import { Modal } from '../modal';
import Modal from "react-native-modal";
import {Icon} from "@components";

export const Select = (props: SelectProps) => {
  // state
  const [t] = useTranslation();
  const inset = useSafeAreaInsets();
  const {
    textItemStyle,
    rightChildren,
    onPress,
    prefix = '',
    icon,
    customItem = undefined,
    useBottomInset = true,
    defaultSelect = t('dialog:select'),
    data = [],
    ...rest
  } = props;
  const [selectedText, setSelectedText] = useState(defaultSelect);
  const [visible, setVisible] = useState(false);


    useEffect(() => {

        setSelectedText(defaultSelect)

    }, [defaultSelect]);

  // function
  const onPressOption = (item: SelectOption, index: number) => {
    setVisible(false);
    setSelectedText((item.text || ( item.district_name) || (item.city_name)));
    onPress && onPress(item, index);
  };

  const showDrop = () => {
    setVisible(true);
  };

  const hideDrop = () => {
    setVisible(false);
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<SelectOption>) => {
    return (
      <SelectItem
        customItem={customItem}
        textItemStyle={textItemStyle}
        onPress={onPressOption}
        item={item}
        index={index}
      />
    );
  };

  const keyExtractor = useCallback(
    (item: SelectOption) =>
      item.text +
      new Date().getTime().toString() +
      Math.floor(Math.random() * Math.floor(new Date().getTime())).toString(),
    [],
  );

  // style
  const content = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        paddingBottom: useBottomInset ? inset.bottom : 0,
      },
    ],
    [inset.bottom, useBottomInset],
  );
  // render
  return (
    <>
      <View style={[styles.root]} collapsable={false}>
        {icon && <Icon style={[styles.icon]} icon={icon}  /> }
        <TouchableOpacity style={{flex : 1}} onPress={showDrop} activeOpacity={0.68}>
          <View style={[styles.rowButton]}>
            <Text children={`${prefix} ` + selectedText} />
            {rightChildren}
          </View>
        </TouchableOpacity>
        <Modal
          onBackdropPress={hideDrop}
          onBackButtonPress={hideDrop}
          animatedIn={'slideInUp'}
          hasGesture={false}
          animatedOut={'slideOutDown'}
          style={[styles.modal]}
          backdropOpacity={0.3}
          isVisible={visible}>
          <View>
            <View style={[styles.content, content]}>
              <FlatList
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                {...rest}
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};
