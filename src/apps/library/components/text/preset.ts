import { StyleSheet } from 'react-native';

import { sizeScale } from '@common';
import { FontDefault } from '@theme/typography';
import {ColorDefault} from "@theme/color";
export const textPresets = StyleSheet.create({
  linkTitle: {
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(24),
    lineHeight: 32,
    color: '#000000',
  },
  linkSubtitle: {
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(20),
    lineHeight: 32,
    color: '#000000',
  },
  linkLarge: {
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(18),
    lineHeight: 34,
    color: '#000000',
  },
  linkMedium: {
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(16),
    lineHeight: 30,
    color: '#000000',
  },
  linkSmall: {
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(14),
    lineHeight: 20,
    color: '#000000',
  },
  linkXSmall: {
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(11),
    lineHeight: 20,
    color: '#000000',
  },
  linkXXSmall: {
    fontFamily: FontDefault.primary,
    fontSize: sizeScale(9),
    lineHeight: 20,
    color: '#000000',
  },
  textMedium: {
    fontFamily: FontDefault.secondary,
    fontSize: sizeScale(16),
    lineHeight: 30,
    color: '#000000',
  },
  textSmall: {
    fontFamily: FontDefault.secondary,
    fontSize: sizeScale(14),
    lineHeight: 20,
    color: '#000000',
  },
  textXSmall: {
    fontFamily: FontDefault.secondary,
    fontSize: sizeScale(11),
    lineHeight: 20,
    color: '#000000',
  },
  textXXSmall: {
    fontFamily: FontDefault.secondary,
    fontSize: sizeScale(9),
    lineHeight: 20,
    color: '#000000',
  },
  hyperLink: {
        fontFamily: FontDefault.secondary,
        fontSize: sizeScale(14),
        lineHeight: 20,
        color: ColorDefault.link,
    },

  textNormal: {
      fontSize: sizeScale(16),
      lineHeight: 25,
      color: ColorDefault.text,
      textAlign  : 'center'
    },

    textMenu: {
        fontSize: sizeScale(14),
        lineHeight: 25,
        color: ColorDefault.text_menu,
        textAlign  : 'center'
    },
    textMenuFilter: {
        fontSize: sizeScale(13),
        lineHeight: 25,
        color: ColorDefault.text_menu,
        textAlign  : 'left'
    },
    textTitle: {
        fontSize: sizeScale(18),
        lineHeight: 25,
        color: ColorDefault.red,
        textAlign  : 'center'
    },
  default: {},
});

export type TextPresetNames = keyof typeof textPresets;
