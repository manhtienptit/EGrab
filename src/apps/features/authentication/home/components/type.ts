/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FlatListProps, StyleProp, TextStyle } from 'react-native';

import { CustomOmit } from '@common';

export interface DataItem {
  /**
   * (Required)Text to display
   */
  actual_fee: number;
  order_code: string;
    customer_name: string;
    customer_phone: string;
    address: string;
    customer_note: string;
    expected_support_time: string;
    bill: string;
    electrician_note: string;
    status: string;
    create_time: string;
    title: string;
    body: string;
    image: string;
    customer_worker_site_id?: string;

  /**
   * Item to pass to function when click one item
   * @default undefined
   */
  itemCallback?: any;
}

export interface SelectItemProps {
  /**
   * Data item
   */
  item: DataItem;

  /**
   * Index of item
   */
  index: number;

  /**
   * On item press
   */
  onPress: (item: DataItem, index: number) => void;

  /**
   * Overwrite text item
   */
  customItem?: (item: DataItem, index: number) => React.ReactNode;

  /**
   * Overwrite item text style
   * @default undefined
   */
  textItemStyle?: StyleProp<TextStyle>;
}
