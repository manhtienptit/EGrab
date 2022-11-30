import React, {memo, useEffect, useRef, useState} from 'react';

import isEqual from 'react-fast-compare';
import {goBack, navigationRef} from "@navigation/navigation-service";
import {
    dispatch,
    formatNumber,
    useSocketContext
} from "@common";
import {authenticationActions, appActions, workActions} from "@redux-slice";
import {
    ActionSheet,
    Block,
    Button,
    Divider,
    Screen,
    Spacer,
    Text,
    Icon,
} from '@components';
import {View} from 'react-native';

import { sizeScale } from '@common';
import {useSelector} from "react-redux";
import {
    selectAppDetailOrder,
    selectAppProfile,
    selectAppSuppliesDetail,
    selectAppWorkerSite,
    selectSupplies
} from "@redux-selector/app";
import {ColorDefault} from "@theme/color";

const ElectricianSupplyComponent = ({ route, navigation }) => {

    const { socket } = useSocketContext();

    const profile  = useSelector(selectAppProfile);
    const workerSite  = useSelector(selectAppWorkerSite);
    const detail = useSelector(selectAppDetailOrder);


    const supplies = useSelector(selectSupplies);
    const suppliesDetail = useSelector(selectAppSuppliesDetail);


    const [suppliesData, setSuppliesData] = useState<[]>([]);

    const totalFee = suppliesData?.length > 0 ? suppliesData?.reduce((total, currentSupply) => total + (
            currentSupply?.supplies?.reduce((total, current) => total + ( parseFloat(current?.amount) * parseFloat(current?.price)) , 0 ) ?? 0
    ) , 0) : 0;


    const renderButton = () => {

            return (
                <View style={{flex : 1 }} >
                    <Button text={'Cập Nhật'} preset={'outline'} buttonColorTheme={'btnSign'}
                            textColor={'white'}
                            onPress={() => {
                                // setisReject(false)

                                if(detail?.status === 'MATCHING')
                                    socket.emit('order-accept', {
                                        order_code: route?.params?.orderID,
                                        customer_worker_site_id:  route?.params?.customer_worker_site_id,
                                        electrician_worker_site_id: workerSite?.id,
                                        electrician_working_site_id : profile?.working_site?.id ?? '',
                                        expected_fee : totalFee,
                                        electrician_note: 'Đồng ý'

                                    });


                                let supplies = [];

                                suppliesData?.map((item) => {

                                    item?.supplies?.map((item_s) => {
                                        if(item_s.amount > 0) {
                                            supplies.push({
                                                supply_id : item_s.supply_id,
                                                quantity : item_s.amount,
                                            })
                                        }

                                    })

                                })


                                dispatch(workActions.updateSupplies( { supplies : supplies , order_code: route?.params?.orderID, } ) )


                            }}
                    />
                </View>
            );

    }



    useEffect( () => {
        dispatch(workActions.getSupplies())
    }, []);


    useEffect( () => {

        let cacheData = supplies?.map((item) => {

            let supplies = item?.supplies?.map((data) => {

                const result = suppliesDetail?.find((obj) => {
                    return obj?.supply_id === data?.supply_id;
                });

                return {...data , amount : parseInt(result?.quantity ?? 0) ?? 0 }
            });

            // const result = suppliesDetail?.find((obj) => {
            //        return obj.supplies_code === item.supplies_code;
            // });

            return {...item , supplies }
        });

        setSuppliesData(cacheData)

    }, [supplies]);



    const addSupply = (supply : any , itemSub : any) => {


        // let supplies = suppliesData[itemSub]?.supplies?.map((data) => {
        //
        //         if(supply?.supply_id === data?.supply_id)
        //         {
        //             let count = data.amount + 1;
        //             return {...data , amount : count}
        //         }
        //
        //         return data;
        //
        //     });
        //
        // let cacheData = suppliesData?.map((item) => {
        //
        //     return {...item,supplies}
        //
        // });
        //
        //
        // setSuppliesData(cacheData)


        let cacheData = suppliesData?.map((item) => {

            let supplies = item?.supplies?.map((data) => {

                if(supply?.supply_id === data?.supply_id)
                {
                    let count = data.amount + 1;
                    return {...data , amount : count }
                }

                return data;
            });

            return {...item,supplies}
        });

        setSuppliesData(cacheData)

    }

    const reduceSupply = (supply : any, itemSub : any) => {

        let cacheData = suppliesData?.map((item) => {

            let supplies = item?.supplies?.map((data) => {

                if(supply?.supply_id === data?.supply_id)
                {
                    let count = data.amount - 1;
                    return {...data , amount : count < 0 ? 0 : count}
                }

                return data;
            });

            return {...item,supplies}
        });

        setSuppliesData(cacheData)

    }

    // render
    return (
        <Block block paddingTop={sizeScale(20)}  color={'white'}>
            <Screen
                bottomInsetColor="transparent"
                style={{  paddingHorizontal: 15 , marginTop : sizeScale(15) , flex : 1}}
                backgroundColor={'white'}>
                <Block
                    direction={'row'} middle  color={'white'} height={sizeScale(50)} paddingLeft={sizeScale(20)} >
                    <Block  style={{flex : 5}} >
                        <Text textAlign={'center'} text={'Chọn vật tư'} preset={'linkLarge'} color={'black'}/>
                    </Block>
                    <Button
                        style={{flex : 1 , position: 'absolute', right : 10 }}
                        onPress={() => {
                            goBack();
                        }}>
                        <Icon size={sizeScale(35)} icon={'x'} />
                    </Button>
                </Block>

                <View style={{flex : 1 ,  marginTop : sizeScale(10)}} >
                    <View style={{flex : 13}} >
                        <Screen
                            bottomInsetColor="transparent"
                            scroll
                            backgroundColor={'white'}>

                            <Block marginHorizontal={sizeScale(10)} justifyContent={'center'} direction={"column"}  paddingTop={0}>
                                <Block block middle >


                                        <>
                                            <Spacer height={25}/>
                                            <Block direction={'column'}  width={'100%'}>
                                                <Text textAlign={'left'} text={'Danh sách vật tư'} preset={'linkMedium'}
                                                      color={'black'}/>

                                            {
                                                suppliesData?.map((item , index) => {
                                                    return (
                                                        <Block direction={'column'}  width={'100%'}  marginTop={sizeScale(20)} key={index} >
                                                            <Text text={`${item?.category_name}`} preset={'linkSmall'} color={ColorDefault.black} marginLeft={sizeScale(30)} />

                                                            {
                                                                item?.supplies?.map((item_supplier) => {
                                                                    return (
                                                                        <Block height={sizeScale(70)}>
                                                                            <Spacer height={sizeScale(20)}/>
                                                                            <Block direction={'row'} height={sizeScale(40)} width={'100%'}>
                                                                                <Block style={{flex: 1}}>
                                                                                    <Icon icon={'supply'}
                                                                                          size={sizeScale(40)}/>
                                                                                </Block>
                                                                                <Block style={{justifyContent: 'flex-start' , flexDirection : 'column' , flex : 5}}  direction={'column'} paddingLeft={5} >
                                                                                    <View  style={{alignItems: 'flex-start' , flexDirection : 'row' , flex : 1}}>
                                                                                        <Text
                                                                                            text={`${item_supplier?.supply_name}`}
                                                                                            tyle={{flexWrap: 'wrap' , textAlign: 'left'}}
                                                                                            numberOfLines={3}
                                                                                            preset={'textMenu'}
                                                                                            color={ColorDefault.text_gray}/>
                                                                                    </View>
                                                                                    <View  style={{alignItems: 'flex-start' , flexDirection : 'row' , flex : 1}}>
                                                                                        <Text
                                                                                            text={`${formatNumber(item_supplier?.price)} VNĐ`}
                                                                                            tyle={{flexWrap: 'wrap' , textAlign: 'left'}}
                                                                                            preset={'textMenu'}
                                                                                            style={{fontWeight: 'bold'}}/>
                                                                                    </View>
                                                                                </Block>
                                                                                <Block direction={'row'}
                                                                                       style={{flex: 2}} middle>
                                                                                    <Button
                                                                                        children={
                                                                                            <Icon icon={'minus'}/>
                                                                                        }
                                                                                        onPress={() => reduceSupply(item_supplier , index)}
                                                                                        style={{flex: 1}}/>

                                                                                    <Block direction={'column'} middle
                                                                                           style={{flex: 2}}>
                                                                                        <Text text={`${item_supplier?.amount}`}
                                                                                              preset={'textLarge'}
                                                                                              color={ColorDefault.black}/>
                                                                                    </Block>

                                                                                    <Button
                                                                                        children={
                                                                                            <Icon icon={'plus'}/>
                                                                                        }
                                                                                        onPress={() => addSupply(item_supplier , index)}
                                                                                        style={{flex: 1}}/>

                                                                                </Block>
                                                                            </Block>
                                                                        </Block>
                                                                    )
                                                                })
                                                            }

                                                        </Block>
                                                    )
                                                })
                                            }
                                            </Block>

                                        </>




                                </Block>

                            </Block>

                            <Spacer height={sizeScale(40)}/>


                        </Screen>

                        <>
                            <Block direction={'row'} height={40} width={'100%'}>
                                <Text textAlign={'left'} text={'Thành tiền'} preset={'linkMedium'}
                                      color={'black'}/>
                            </Block>
                            <Divider color={ColorDefault.border}/>

                            <Spacer height={20}/>
                            <Block middle direction={'row'} height={40} width={'100%'}>
                                <Icon icon={'coin'} size={sizeScale(20)}/>
                                <Spacer width={10}/>
                                <Text textAlign={'left'} text={`${formatNumber(totalFee)} VNĐ`} preset={'linkMedium'} style={{position : 'absolute' , right : 1}}
                                      color={'black'}/>
                            </Block>
                            <Divider color={ColorDefault.border}/>
                        </>

                    </View>

                    {renderButton()}
                </View>
            </Screen>
        </Block>
    );

};

export const ElectricianSupplies = memo(ElectricianSupplyComponent, isEqual);
