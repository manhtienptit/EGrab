/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useEffect, useMemo, useState } from 'react';
import {ViewStyle, Text, TouchableOpacity} from 'react-native';

import Animated, { runOnJS } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { sharedTiming } from '@animated';
import {Block, Icon} from '@components';
import { VectorIcon, VectorIconIcon } from '@assets/vector-icon/vector-icon';
import { useMessageYupTranslation } from '@hooks';

import {
  BG_ERROR,
  BG_LINK,
  BG_SUCCESS,
  BG_WARN,
  DURATION_ANIMATED,
} from './constants';
import { styles } from './styles';
import { SnackBarItemProps, TYPE_MESSAGE, TypeMessage } from './type';

import { Spacer } from '../spacer';
// import { Text } from '../text';
import {sizeScale} from "@common";
import {navigationRef} from "@navigation/navigation-service";
import {APP_SCREEN} from "@navigation/screen-types";

const getColor = (typeMessage: TypeMessage): string => {
  switch (typeMessage) {
    case TYPE_MESSAGE.SUCCESS:
      return BG_SUCCESS;
    case TYPE_MESSAGE.LINK:
      return BG_LINK;
    case TYPE_MESSAGE.WARN:
      return BG_WARN;
    case TYPE_MESSAGE.ERROR:
      return BG_ERROR;
    default:
      return BG_SUCCESS;
  }
};

const getIcon = (typeMessage: TypeMessage): VectorIconIcon => {
  switch (typeMessage) {
    case TYPE_MESSAGE.SUCCESS:
      return 'bx_success';

    case TYPE_MESSAGE.LINK:
    case TYPE_MESSAGE.WARN:
      return 'bx_info_circle';

    case TYPE_MESSAGE.ERROR:
      return 'bx_error';

    default:
      return 'bx_info_circle';
  }
};

export const SnackItem = memo(
  ({ item, onPop }: SnackBarItemProps) => {
    // state
    const insets = useSafeAreaInsets();
    const [isShow, setIsShow] = useState<boolean>(true);

    // function
    const CustomEnteringAnimation = (values: any) => {
      'worklet';
      const animations = {
        // your animations
        transform: [
          { translateY: sharedTiming(0, { duration: DURATION_ANIMATED }) },
        ],
      };
      const initialValues = {
        // initial values for animations
        transform: [{ translateY: -values.targetHeight }],
      };
      const callback = (_: boolean) => {
        // optional callback that will fire when layout animation ends
      };
      return {
        initialValues,
        animations,
        callback,
      };
    };

    const CustomExitAnimation = (values: any) => {
      'worklet';
      const animations = {
        // your animations
        transform: [
          {
            translateY: sharedTiming(-values.currentHeight, {
              duration: DURATION_ANIMATED,
            }),
          },
        ],
      };
      const initialValues = {
        // initial values for animations
        transform: [{ translateY: 0 }],
      };
      const callback = (_: boolean) => {
        runOnJS(onPop)(item);
        // optional callback that will fire when layout animation ends
      };
      return {
        initialValues,
        animations,
        callback,
      };
    };

    // effect
    useEffect(() => {
      const id = setTimeout(() => {
        setIsShow(false);
      }, item.interval + DURATION_ANIMATED);

      return () => {
        clearTimeout(id);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // render
    return isShow ? (
      <Animated.View
        entering={CustomEnteringAnimation}
        exiting={CustomExitAnimation}>
        <Block
            // onPress={()=>{
            //     setIsShow(false);
            //     navigationRef?.current?.navigate(APP_SCREEN.WORK_DETAIL , {orderID : item?.orderCode , customer_worker_site_id : item?.customer_worker_site_id ?? '' } )
            // }}
            // activeOpacity={0.9}
            style={[styles.itemBar]}>
           <Block direction={'column'} style={{flex : 1}} middle>
              <Icon icon={'notify'} size={sizeScale(50)} />
           </Block>
           <Block direction={'column'}  style={{flex : 3}} >
               <Block middle style={{flex : 2}} direction={'row'} ><Text style={styles.text1} >Có 1 yêu cầu dịch vụ</Text></Block>
               <Block middle style={{flex : 2}} direction={'row'}><Text style={styles.text2} >Sửa chữa thay thế thiết bị điện</Text></Block>
               <Block middle style={{flex : 1}} direction={'row'}><Text style={styles.text3} >Phù hợp với bạn</Text></Block>
           </Block>
        </Block>
      </Animated.View>
    ) : null;
  },
  () => true,
);
