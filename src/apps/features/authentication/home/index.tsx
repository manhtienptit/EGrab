import React, {memo, useEffect, useState} from 'react';
import {ListRenderItemInfo, View} from 'react-native';

import isEqual from 'react-fast-compare';
import {dispatch, getState, logout, sizeScale} from "@common";
import {useSelector} from "react-redux";
import {
    selectAppProfile, selectAppRequestDetailOrder,
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
    Skeleton,
    ListView,
    Divider,
    showSnack,
    showNotification
} from "@components";
import {styles} from "./styles";
import {WorkItem} from "./components/item-list";
import {startAndEndOfWeek} from "@common";
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import {navigationRef} from "@navigation/navigation-service";
import {APP_SCREEN} from "@navigation/screen-types";
import {useSocket , useSocketContext} from '@common';
import {orderActions} from "../../../redux/action-slice/orders";
import {AppState} from "@model/app";
import {requestNotificationPermission} from "../../../common/firebase/notification";



export const HomeComponent = () => {



    const [dataSource, setDataSource] = useState<any>([]);

    // const haveNewJob =  useSelector(selectAppHaveNewJob);

    const profile  = useSelector(selectAppProfile);
    const workerSite  = useSelector(selectAppWorkerSite);
    const orderRequest  = useSelector(selectAppRequestDetailOrder);

    //socket
    const { socket, socketInit, socketOff, socketListen,socketEmit, socketDisconnect } = useSocketContext();


    useEffect( () => {






        // dispatch(orderActions.getListOrders());

        socketInit();

        requestNotificationPermission();


        return () => socketDisconnect();



    }, []);

    useEffect( () => {

        if(orderRequest !== null)
           setDataSource([...dataSource , orderRequest]);

    }, [orderRequest]);


    useEffect( () => {

        if(socket)
        socketListen(workerSite?.id , (data) => {
            console.log('============ NEW MESSAGE ====================')
            console.log(data)
                if(data.action === 'find_electrician')
                {
                    showNotification({
                        msg : `${data?.order_code ?? ''}`,
                        interval : 3000,
                        type : 'success',
                        orderCode : data?.order_code,
                        customer_worker_site_id : data?.customer_worker_site_id

                    });

                    let body = {
                        orderCode : data?.order_code,
                        customer_worker_site_id : data?.customer_worker_site_id
                    }


                    dispatch(orderActions.getRequestDetailOrders(body))

                    // dataSource.concat()
                    // showSnack({msg : 'Bạn có một yêu cầu mới' , type : 'link'});
                }
                if(data.action === 'close_order')
                {
                    let filtered = dataSource.filter((element) => {
                        return element.orderCode !== data?.order_code;
                    });
                    setDataSource(filtered);

                }
                if(data.action === 'ELECTRICIAN_ACCEPTED') {

                    let filtered = dataSource.filter((element) => {
                        return element.orderCode !== data?.order_code;
                    });

                    setDataSource(filtered);
                    dispatch(orderActions.getListOrders())

                    const { orderIDSelected }: AppState = getState('app');
                    dispatch(orderActions.getDetailOrders(orderIDSelected))

                }

                if(data.action === 'MATCHING') {
                    let filtered = dataSource.filter((element) => {
                        return element.orderCode !== data?.order_code;
                    });

                    setDataSource(filtered);
                    dispatch(orderActions.getListOrders())

                    const { orderIDSelected }: AppState = getState('app');
                    dispatch(orderActions.getDetailOrders(orderIDSelected))


                }

                if(data.action === 'CUSTOMER_REJECTED') {
                    const { orderIDSelected }: AppState = getState('app');
                    dispatch(orderActions.getDetailOrders(orderIDSelected))
                }
                if(data.action === 'CONFIRMED') {
                    const { orderIDSelected }: AppState = getState('app');
                    dispatch(orderActions.getDetailOrders(orderIDSelected))
                }
                if(data.action === 'ACCEPTANCED') {
                    const { orderIDSelected }: AppState = getState('app');
                    dispatch(orderActions.getDetailOrders(orderIDSelected))
                }
                if(data.action === 'PAID') {
                    const { orderIDSelected }: AppState = getState('app');
                    dispatch(orderActions.getDetailOrders(orderIDSelected))

                    dispatch(orderActions.getListOrders())
                }
                if(data.action === 'RATED') {
                    const { orderIDSelected }: AppState = getState('app');
                    dispatch(orderActions.getDetailOrders(orderIDSelected))

                    dispatch(orderActions.getListOrders())
                }
        });

    }, [socket]);



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
        navigationRef?.current?.navigate(APP_SCREEN.WORK_DETAIL , {orderID : item?.order_code , customer_worker_site_id : item?.customer_worker_site_id , typeDetail : 2} )
    }

    // render
    return (
        <Block block paddingTop={sizeScale(30)}  color={'white'}>
            <Block
                direction={'row'} middle color={'white'} height={sizeScale(80)} paddingLeft={sizeScale(20)}>
                <FastImage
                    style = {styles.inner}
                    resizeMode = {'contain'}
                    source={{ uri : profile?.working_site?.avatar  }} //profile?.working_site?.avatar }}
                />
                <Spacer width={10}/>
                <Block  style={{flex : 50}} >
                    <Text textAlign={'left'} text={`Xin chào, ${workerSite?.fullname }`} preset={'linkMedium'} color={'black'}/>
                </Block>
            </Block>

            <>
                { false &&
                    <Block direction={'row'} middle color={'white'} height={sizeScale(50)}>
                        <Block block height={sizeScale(35)} marginHorizontal={sizeScale(10)}>
                            <Button
                                children={
                                    <Block middle direction={'row'}>
                                        <Text textAlign={'right'} text={'Tất cả địa bàn'} preset={'textMenuFilter'}
                                              color={ColorDefault.text_gray}/>
                                        <Spacer width={5}/>
                                        <Icon icon={'arrow_down'} color={ColorDefault.text_gray}/>
                                    </Block>
                                }
                                style={{flex: 1}}
                                preset={'stroke_time'}
                                buttonColorTheme={'white'}/>
                        </Block>
                        <Block block height={sizeScale(35)} marginHorizontal={sizeScale(10)}>
                            <Button
                                children={
                                    <Block middle direction={'row'}>
                                        <Text textAlign={'right'} text={'Tất cả khung giờ'} preset={'textMenuFilter'}
                                              color={ColorDefault.text_gray}/>
                                        <Spacer width={5}/>
                                        <Icon icon={'arrow_down'} color={ColorDefault.text_gray}/>
                                    </Block>
                                }
                                style={{flex: 1}}
                                preset={'stroke_time'}
                                buttonColorTheme={'white'}/>
                        </Block>
                        <Block block height={sizeScale(40)} marginHorizontal={sizeScale(10)} style={{flex: 0.3}}>
                            <Button
                                children={
                                    <Block middle direction={'row'}>
                                        <Icon icon={'filter'} size={sizeScale(30)}/>
                                    </Block>
                                }
                                style={{flex: 1}}
                                preset={'border'}
                                buttonColorTheme={'white'}/>
                        </Block>
                    </Block>
                }

                <Divider height={sizeScale(20)} color={ColorDefault.borderLine}/>
                <Spacer height={sizeScale(10)}/>
            </>

            <Screen
                bottomInsetColor="transparent"
                style={{  paddingHorizontal: 15 , flex : 1, paddingTop : sizeScale(-25)}}
                backgroundColor={'white'}>

                <Block middle block direction={'column'}  >
                    <ListView
                        style={{flex: 1 ,  width : '100%'}}
                        itemEmptyComponent={LoadEmptyComponent}
                        data={dataSource ?? []}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    >
                    </ListView>
                </Block>
            </Screen>

        </Block>
    );
};



export const Home = memo(HomeComponent, isEqual);
