import React, { useMemo } from 'react';
import {StyleProp, TouchableOpacity} from 'react-native';

import FastImage, { ImageStyle } from 'react-native-fast-image';

import { icons } from '@assets/icon';
import { useTheme } from '@theme';

import { IconProps } from './type';
import {goBack} from "@navigation/navigation-service";
import {sizeScale} from "@common";

import {Icon, Block, Text, Spacer , Button} from "@components";

const SIZE = 24;

export const Header = ({
  icon,
  title,
  color,
  colorTheme,
  onPress,
  size = SIZE,
  resizeMode = 'contain',
}: IconProps) => {
  // state

  // render
  return (
      <Block  height={sizeScale(30)}>
          <Block block direction={'row'} middle paddingLeft = {5}>
              <Button
                  onPress={onPress}>
                  <Icon size={sizeScale(30)} icon={'backarr'} />
              </Button>
              <Spacer width={sizeScale(80)}/>
              <Text textAlign={'center'} text={title} preset={'linkMedium'}/>
          </Block>
      </Block>
  );
};
