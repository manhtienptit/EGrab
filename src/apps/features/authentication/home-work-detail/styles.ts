import {sizeScale} from "@common";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    avatar: {
        position: 'relative',
        width: sizeScale(180),
        height: sizeScale(180),
    },

    image: {
        position: 'relative',
        width: sizeScale(200),
        height: sizeScale(120),
    }
});