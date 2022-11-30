import { StyleSheet } from 'react-native';

import { sizeScale } from '@common';
import {ColorDefault} from "@theme/color";

export const MAX_HEIGHT = 250;

export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    marginHorizontal: 0,
    marginVertical: 0,
  },
  root: {
      paddingVertical: 10,
      borderWidth: StyleSheet.hairlineWidth * 2,
      borderRadius: 7,
      borderColor: 'gray',
      paddingLeft : 8,
      paddingRight : 10,
      flexDirection: 'row',
  },
  rowButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  content: {
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    maxHeight: 250,
  },
  container: {
    flexDirection: 'column',
    flex : 1,
    width : '95%',
    height : sizeScale(120),
    paddingVertical: sizeScale(2),
    marginHorizontal: sizeScale(10),
    paddingLeft: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius : 10,
    borderColor : ColorDefault.text_gray,
  },
  text: {
    fontSize: sizeScale(14),
  },
    icon: {
        marginTop : 10,
    },
    avatar: {
        position: 'relative',
        width: sizeScale(70),
        height: sizeScale(70),
    },
});
