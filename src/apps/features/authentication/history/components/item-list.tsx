import React, { memo } from 'react';
import { View } from 'react-native';

import equals from 'react-fast-compare';

import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import {Button, Block, Screen, Text, Icon, Spacer} from "@components";

import { styles } from './styles';
import { SelectItemProps } from './type';
import {sizeScale, STATUS_ORDER, STATUS_ORDER_COLOR,STATUS_ORDER_COLOR_TXT} from "@common";
import {ColorDefault} from "@theme/color";
import moment, { Moment } from 'moment';

export default class WorkItem extends React.PureComponent {

    render() {
        return <WorkItemComponent
            item={this.props.item}
            onItemclick={this.props.onItemclick}
            index={this.props.index} />;
    }
}

const WorkItemComponent = ({ item, onItemclick , index, textItemStyle }: SelectItemProps) => {



    // render
    return (
            <Button onPress={() => onItemclick(item,index)} direction={'row'} block style={styles.container}>

                <Block direction={'column'} style={{flex : 2.5}} padding={sizeScale(5)}>
                    <Block direction={'row'} block middle left={10}>
                        <Icon icon={'contract'} size={sizeScale(30)}/>
                        <Spacer width={10}/>
                        <Text text={item?.order_code.substring(0,15)} preset={'linkSmall'}/>
                        <Text style={{position : 'absolute' , right : sizeScale(10)}} text={`${moment(item?.create_time).format('DD/MM/YYYY')}` } preset={'textMenu'} color={ColorDefault.lack}/>
                    </Block>

                    <Block direction={'row'} block middle>
                        <Spacer width={10}/>
                        <Text text={item?.customer_note} preset={'textMenu'} color={ColorDefault.text_gray} style={{flexWrap: 'wrap'}} numberOfLines={1}/>

                    </Block>

                    <Block block middle>
                    { item.status &&
                            <Block direction={'row'} style={{position : 'absolute' , left : 0}} middle color={STATUS_ORDER_COLOR[item?.status]} borderRadius={sizeScale(5)}  height={sizeScale(25)} paddingHorizontal={sizeScale(10)}>
                                <Text text={STATUS_ORDER[item?.status]} preset={'textSmall'} color={ STATUS_ORDER_COLOR_TXT[item?.status]} style={{flexWrap: 'wrap'}} />
                            </Block>
                    }
                    </Block>
                </Block>

            </Button>
    );
};

// export const WorkItem = memo(WorkItemComponent, equals);
