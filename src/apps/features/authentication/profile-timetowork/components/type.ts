/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FlatListProps, StyleProp, TextStyle } from 'react-native';

import { CustomOmit } from '@common';

export interface DateItem {
  /**
   * (Required)Text to display
   */
  MON : string;
  TUE : string;
  WED : string;
  THU : string;
  FRI : string;
  SAT : string;
  SUN : string;

  /**
   * Item to pass to function when click one item
   * @default undefined
   */
  itemCallback?: any;
}

