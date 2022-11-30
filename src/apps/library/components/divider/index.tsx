import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

import { useTheme } from '@theme';

import { DividerProps } from './type';

export const Divider = ({
  height = 1,
  width = '100%',
  colorTheme,
  color = '#bbb',
}: DividerProps) => {
  // state
  const theme = useTheme();

  // style
  const divider = useMemo<ViewStyle>(
    () => ({
      backgroundColor: colorTheme ? theme.colors[colorTheme] : color,
      height,
      width: width,
    }),
    [color, colorTheme, height, theme.colors],
  );

  // render
  return <View style={[divider]} />;
};
