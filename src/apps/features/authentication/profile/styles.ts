import { StyleSheet } from 'react-native';
import {ColorDefault} from "@theme/color";


export const styles = StyleSheet.create({
    inner: {
        position: 'relative',
        width: 120,
        height: 120,
        borderRadius: 150 / 2,
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
