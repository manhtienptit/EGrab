import { StyleSheet } from 'react-native';

import { sizeScale } from '@common';
import { ColorDefault } from '@theme/color';
import { FontDefault } from '@theme/typography';

export const stylesView = StyleSheet.create({
  primary: {
    borderRadius: 4,
    paddingVertical: 5,
    backgroundColor: ColorDefault.primary,
    alignItems: 'center',
  },

  outline: {
    borderRadius: sizeScale(10),
    paddingHorizontal: 0,
    paddingVertical: 0,
    height : 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

    stroke: {
        borderRadius: sizeScale(10),
        paddingHorizontal: 0,
        paddingVertical: 0,
        height : 45,
        borderWidth : 1,
        borderColor : ColorDefault.btnSign,
        justifyContent: 'center',
        alignItems: 'center',
    },

    stroke_time: {
        borderRadius: sizeScale(10),
        paddingHorizontal: 0,
        paddingVertical: 0,
        height : 45,
        borderWidth : 0.5,
        borderColor : ColorDefault.text_gray,
        justifyContent: 'center',
        alignItems: 'center',
    },


    border: {
        borderRadius: 15,
        paddingHorizontal: 0,
        paddingVertical: 0,
        height : 45,
        marginHorizontal : 5,
        width   : '45%',
        justifyContent: 'center',
        alignItems: 'center',
    },
  default: {},
});
export const stylesText = StyleSheet.create({
  primary: {
    fontSize: sizeScale(14),
    fontFamily: FontDefault.primary,
  },

  outline: {
    fontSize: sizeScale(14),
    fontFamily: FontDefault.primary,
  },

    stroke: {
        fontSize: sizeScale(15),
        fontFamily: FontDefault.primary,
    },

    stroke_time: {
        fontSize: sizeScale(15),
        fontFamily: FontDefault.primary,
    },

    border: {
        fontSize: sizeScale(14),
        fontFamily: FontDefault.primary,
    },
  default: {},
});

export type ButtonPresetNames = keyof typeof stylesView;
