import { StyleSheet } from 'react-native';

import { sizeScale } from '@common';

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
    flexDirection: 'row',
    paddingVertical: 15,
    paddingLeft: 5,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: sizeScale(14),
  },
    icon: {
        marginTop : 10,
    },
});
