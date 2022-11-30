import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import {execFunc, sizeScale} from '@common';

import { styles } from './styles';
import { ActionSheetProps, OptionData } from './type';

import { Button } from '../button';
import { Divider } from '../divider';
// import { Modal } from '../modal';
import Modal from "react-native-modal";
import {goBack} from "@navigation/navigation-service";
import {Icon} from "@components";

export const ActionSheet = forwardRef((props: ActionSheetProps, ref) => {
  // state
  const [t] = useTranslation();
  const {
    title,
    children,
    rootStyle,
    onPressCancel,
    wrapCancelStyle,
    textOptionStyle,
    wrapOptionStyle,
    onBackDropPress: onBackDropPressOverwrite,
    textCancelStyle: textCancelStyleOverwrite,
    onPressOption,
    textCancel = t('dialog:cancel'),
    backDropColor = 'rgba(0,0,0,.7)',
    closeOnBackDropPress = true,
    option = [],
  } = props;
  const [actionVisible, setActionVisible] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setActionVisible(true);
      },
      hide: () => {
        setActionVisible(false);
      },
    }),
    [],
  );
  // function
  const onPress = useCallback(
    (item: OptionData, index: number) => {
      return () => {
        setActionVisible(false);
        onPressOption && onPressOption(item, index);
      };
    },
    [onPressOption],
  );

  const onCancel = useCallback(() => {
    onPressCancel && onPressCancel();
    setActionVisible(false);
  }, [onPressCancel]);

  const onBackDropPress = useCallback(() => {
    execFunc(onBackDropPressOverwrite);
    if (closeOnBackDropPress) {
      setActionVisible(false);
    }
  }, [closeOnBackDropPress, onBackDropPressOverwrite]);

  // render
  return (
    <Modal
      style={[styles.modal]}
      hasGesture={false}
      backdropOpacity={1}
      animatedIn={'slideInUp'}
      animatedOut={'slideOutDown'}
      onBackdropPress={onBackDropPress}
      onBackButtonPress={onCancel}
      isVisible={actionVisible}
      avoidKeyboard
      backdropColor={backDropColor}>
      <View style={[styles.wrap, rootStyle]}>

        <View style={[styles.wrapOption, wrapOptionStyle]}>
          {title &&
            (React.isValidElement(title) ? (
              title
            ) : (
              <>
                <View style={[styles.wrapTitle]}>

                  <Text style={[styles.title]} children={title + ''} />
                    <Button
                        style={{flex : 1 , position: 'absolute', right : 10 }}
                        onPress={onCancel}>
                        <Icon size={sizeScale(35)} icon={'x'} />
                    </Button>
                </View>
              </>
            ))}
            <Divider  />
            {children}
        </View>

      </View>
    </Modal>
  );
});

export interface ActionSheet {
  show(): void;
  hide(): void;
}
