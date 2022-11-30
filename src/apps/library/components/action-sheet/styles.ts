import { StyleSheet } from 'react-native';

import { sizeScale } from '@common';
import {ColorDefault} from "@theme/color";

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
      height: 100
  },
  wrap: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: 20,
  },
  backDrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 998,
  },
  wrapOption: {
    backgroundColor: '#F4F5F9',
    overflow: 'hidden',
    height : sizeScale(400),
      borderTopLeftRadius : 20,
      borderTopRightRadius : 20,
    marginTop: 10,
  },
  wrapCancel: {
    overflow: 'hidden',
    paddingHorizontal : 20,
      backgroundColor: '#FFFFFF',
      height : sizeScale(60),
  },
  textCancel: {
    color: 'white',fontWeight: 'bold'
  },
  wrapTitle: {
    justifyContent: 'center',
    height : sizeScale(60),
    paddingVertical: 5,
  },
  title: {
    fontSize: sizeScale(16),
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333333',
  },
  wrapTextCancel: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  wrapTextOption: {
    paddingVertical: 10,
  },
});
