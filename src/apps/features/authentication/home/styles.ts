import { StyleSheet } from 'react-native';
import {ColorDefault} from "@theme/color";
import {sizeScale} from "@common";


export const styles = StyleSheet.create({
    inner: {
        position: 'relative',
        width: sizeScale(50),
        height: sizeScale(50),
        borderRadius: sizeScale(30),
    },
    outter:{
        paddingTop:9,
        paddingLeft:9,
        width: 140,
        height: 140,
        borderRadius: 140 / 2,
        borderWidth : 1,
        borderColor: ColorDefault.text_gray,
    },
    avatar: {
        position: 'absolute',
        bottom : 0,
        right : 5
    },
});
