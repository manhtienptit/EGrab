import { StyleSheet } from 'react-native';

import { sizeScale } from '@common';
import {ColorDefault} from "@theme/color";

export const styles = StyleSheet.create({
  container: {
    minHeight: sizeScale(50),
      marginTop : sizeScale(70),
      marginHorizontal : sizeScale(20),

  },
  itemBar: {
    paddingHorizontal: sizeScale(5),
    borderRadius : sizeScale(25),
    alignItems: 'center',
    flexDirection: 'row',
    height : sizeScale(75),
    backgroundColor: '#fff',
      shadowColor: "#000000",
      shadowOpacity: 0.5,
      shadowRadius: 2,
      shadowOffset: {
          height: 1,
          width: 1
      }
  },
  text: {
    marginBottom: sizeScale(-10),
    flexWrap: 'wrap',
    textAlign : 'left',
    textSize: sizeScale(13),
    color : ColorDefault.link,
    flex: 1,
  },

    text2: {
        marginTop: sizeScale(-2),
        flexWrap: 'wrap',
        textSize: sizeScale(16),
        fontWeight : 'bold',
        color : ColorDefault.black,
        flex: 1,
    },

    text3: {
        marginTop: sizeScale(-10),
        flexWrap: 'wrap',
        textSize: sizeScale(8),
        fontWeight : '100',
        color : ColorDefault.purple,
        flex: 1,
    },
});
