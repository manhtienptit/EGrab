import { StyleSheet } from 'react-native';

import { sizeScale } from '@common';

export const styles = StyleSheet.create({
  container: {
    minHeight: 50,
  },
  itemBar: {
    paddingHorizontal: sizeScale(15),
    paddingVertical: sizeScale(13),
    // top : 60,
    borderBottomLeftRadius : 20,
    borderBottomRightRadius : 20,
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
    // marginHorizontal : 20,
  },
  text: {
    marginTop: sizeScale(-2),
    flexWrap: 'wrap',
    flex: 1,
  },
});
