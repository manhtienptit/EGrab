import React, {memo, useEffect, useRef, useState} from 'react';
import {ListRenderItemInfo, View} from 'react-native';

import isEqual from 'react-fast-compare';
import {dispatch, getState, logout, sizeScale} from "@common";
import {useSelector} from "react-redux";
import {
    selectAppConfig,
    selectAppHaveNewJob,
    selectAppOrders,
    selectAppProfile,
    selectAppWorkerSite
} from "@redux-selector/app";
import {ColorDefault} from "@theme/color";
import {
    Button,
    Block,
    Screen,
    Spacer,
    Icon,
    Text,
    Select,
    ListView,
    Divider,
    showSnack,
    RadioButton, ActionSheet
} from "@components";
import {styles} from "./styles";
import {default as WorkItem} from "./components/item-list";
import {navigationRef} from "@navigation/navigation-service";
import {APP_SCREEN} from "@navigation/screen-types";
import {useSocket , useSocketContext} from '@common';
import {orderActions} from "../../../redux/action-slice/orders";
import { useIsFocused } from '@react-navigation/native';

export const HistoryComponent = () => {

    const isFocused = useIsFocused();

    //socket
    const _refAction = useRef<ActionSheet>();


    useEffect( () => {

        if (isFocused)
            dispatch(orderActions.getListOrders())

    }, [isFocused]);


    // useEffect( () => {
    //
    //     dispatch(orderActions.getListOrders())
    //
    // }, []);

    const orderList  = useSelector(selectAppOrders);

    const LoadEmptyComponent = () => {
        return (
            <Block middle >
                <Icon icon={'artwork'} size={sizeScale(150)}/>
                <Spacer height={sizeScale(20)}/>
                <Text textAlign={'center'} text={'Hiện tại không có công việc nào phù hợp với bạn!'} preset={'textTitle'} color={ColorDefault.text_gray}/>
            </Block>);
    };

    const renderItem = ({ item, index }: ListRenderItemInfo<WorkItem>) => {
        return (
            <WorkItem
                item={item}
                index={index}
                onItemclick={(item,index) => onWorkItemClick(item, index)}
            />
        );
    };

    const onWorkItemClick = (item, index ) => {
        // if(item?.status === 'MATCHING')
            // navigationRef?.current?.navigate(APP_SCREEN.WORK_DETAIL_SUPPLIES , {orderID : item?.order_code} )
        // else
          navigationRef?.current?.navigate(APP_SCREEN.WORK_DETAIL , {orderID : item?.order_code , typeDetail : 1} )
    }

    // render
    return (
        <Block block paddingTop={sizeScale(20)}  color={'white'}>
            <Block middle color={'white'} height={sizeScale(60)} paddingTop={sizeScale(20)}>
                <Block middle style={{flex : 50}} >
                    <Text textAlign={'left'} text={'Lịch sử yêu cầu'} preset={'linkLarge'} color={'black'} />
                </Block>

            </Block>
            <Divider/>

            <Screen
                bottomInsetColor="transparent"
                style={{  paddingHorizontal: 15 , flex : 1 , paddingTop : sizeScale(-25)}}
                backgroundColor={'white'}>

                <Spacer height={20}/>

                {false &&
                <Block
                    direction={'row'} middle color={'white'} height={sizeScale(50)} paddingLeft={sizeScale(10)}>
                    <Block  style={{flex : 50}} >
                        <Text textAlign={'left'} text={'Sửa chữa thay thế thiết bị điện'} preset={'linkMedium'} color={'black'} />
                    </Block>

                    <Block block height={sizeScale(40)} marginHorizontal={sizeScale(40)} style={{flex : 0.3}}>
                        <Button
                            children={
                                <Block middle direction={'row'}>
                                    <Icon icon={'filter'} size={sizeScale(30)}/>
                                </Block>
                            }
                            onPress={() => {_refAction.current?.show();}}
                            style={{flex : 1}}
                            preset={'border'}
                            buttonColorTheme = {'white'}/>
                    </Block>
                </Block>
                }

                <Block middle block direction={'column'}  >
                    <ListView
                        style={{flex: 1 ,  width : '100%'}}
                        itemEmptyComponent={LoadEmptyComponent}
                        data={orderList ?? []}
                        renderItem={renderItem}
                        refreshing={false}
                        onRefresh={() => {
                            dispatch(orderActions.getListOrders())
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    >
                    </ListView>
                </Block>
            </Screen>
            <ActionSheet
                ref={_refAction}
                children={
                        <Block direction={'column'} marginTop={sizeScale(20)} block marginHorizontal={sizeScale(20)} >

                            <Block style={{flex : 3}}>
                                <Block block direction={'row'} style={{ justifyContent: 'space-between', }}  >
                                    <Text textAlign={'center'} text={'Tất cả yêu cầu của bạn'} preset={'textMenu'} color={'gray'}/>
                                    <RadioButton style={{position : 'absolute' , right : sizeScale(10)}} />
                                </Block>

                                <Block block direction={'row'}   style={{ justifyContent: 'space-between', }} >
                                    <Text textAlign={'center'} text={'Lắp mới thiết bị điện'} preset={'textMenu'} color={'gray'}/>
                                    <Spacer width={10}/>
                                    <RadioButton />
                                </Block>

                                <Block block direction={'row'}   style={{ justifyContent: 'space-between', }} >
                                    <Text textAlign={'center'} text={'Sửa chữa thay thế thiết bị điện'} preset={'textMenu'} color={'gray'}/>
                                    <Spacer width={10}/>
                                    <RadioButton />
                                </Block>

                                <Block block direction={'row'}   style={{ justifyContent: 'space-between', }} >
                                    <Text textAlign={'center'} text={'Kiểm tra dây dẫn thiết bị điện'} preset={'textMenu'} color={'gray'}/>
                                    <Spacer width={10}/>
                                    <RadioButton />
                                </Block>
                            </Block>

                            <Block style={{flex : 1}}>
                                <Button  text={'Áp Dụng'}  preset={'outline'} buttonColorTheme = {'btnSign'} textColor = {'white'} />
                            </Block>

                        </Block>
                }
                wrapOptionStyle={{height : sizeScale(330)}}
                title={'Lọc theo gói dịch vụ'}
                textCancel={'Tiếp Nhận'}
                option={[{ text: 'Option1' }, { text: 'Option2' }]}
            />
        </Block>
    );
};



export const History = memo(HistoryComponent, isEqual);
