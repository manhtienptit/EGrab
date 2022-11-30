import React, { memo } from 'react';
import { View } from 'react-native';

import equals from 'react-fast-compare';

import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import {Button, Block, Screen, Text, Icon, Spacer} from "@components";

import { styles } from './styles';
import { SelectItemProps } from './type';
import {sizeScale} from "@common";
import {ColorDefault} from "@theme/color";
import moment, { Moment } from 'moment';


const WorkItemComponent = ({ item, onItemclick , index, textItemStyle }: SelectItemProps) => {

    // render
    return (
            <Button onPress={() => onItemclick(item,index)} direction={'row'} block style={styles.container}>

                <Block direction={'row'} style={{flex : 1}} middle >
                    <FastImage
                        style = {styles.avatar}
                        resizeMode = {'contain'}
                        source={{ uri : item?.image }} //profile?.working_site?.avatar }}
                    />
                </Block>

                <Block direction={'column'} style={{flex : 2.5}}>
                    <Block direction={'row'} block middle>
                             <Text text={item?.customer_name} preset={'linkMedium'}/>
                    </Block>

                    <Block direction={'row'} block middle>
                        <Icon icon={'clock'} size={sizeScale(20)}/>
                        <Spacer width={10}/>
                        <Text text={`${moment(item?.create_time).format('HH:mm:ss DD-MM-YYYY')}` } preset={'textMenu'} color={ColorDefault.text_gray}/>
                    </Block>

                    <Block direction={'row'} block middle paddingHorizontal={5}>
                        <Icon icon={'map_pin'} color={ColorDefault.text_gray} size={sizeScale(20)} />
                        <Spacer width={10}/>
                        <Text text={item?.address} preset={'textMenu'} color={ColorDefault.text_gray} style={{flexWrap: 'wrap'}} numberOfLines={2}/>
                    </Block>
                </Block>

            </Button>
    );
};

export const WorkItem = memo(WorkItemComponent, equals);
