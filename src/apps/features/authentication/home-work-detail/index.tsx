import React, {memo, useEffect, useRef, useState} from 'react';

import isEqual from 'react-fast-compare';
import {goBack, navigationRef} from "@navigation/navigation-service";
import {
    dispatch,
    formatNumber,
    genSHA256,
    getState,
    logout,
    STATUS_ORDER,
    STATUS_ORDER_COLOR, STATUS_ORDER_COLOR_TXT,
    useSocket,
    useSocketContext
} from "@common";
import {authenticationActions, appActions, workActions} from "@redux-slice";
import {AppState, PopupType} from "@model/app";
import {
    ActionSheet,
    Block,
    Button,
    Divider,
    Screen,
    // Modal,
    Spacer,
    Text,
    Icon,
} from '@components';
import Modal from "react-native-modal";
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import {Image, KeyboardAvoidingView, View} from 'react-native';
import {Linking} from 'react-native'

import {styles} from "./styles";
import { sizeScale } from '@common';
import {useSelector} from "react-redux";
import {
    selectAppDetailOrder,
    selectAppProfile,
    selectAppSuppliesDetail,
    selectAppToken,
    selectAppWorkerSite
} from "@redux-selector/app";
import {ColorDefault} from "@theme/color";
import {orderActions} from "../../../redux/action-slice/orders";
import moment, { Moment } from 'moment';
import {FormAccpted} from "@features/authentication/home-work-detail/components/form-accpted";
import {APP_SCREEN} from "@navigation/screen-types";
import {ProgressStatus} from "@features/authentication/home-work-detail/components/progress_steps";


const WorkDetailComponent = ({ route, navigation }) => {

    const { socket, socketInit, socketOff, socketListen,socketEmit, socketDisconnect } = useSocketContext();
    const [actionVisible, setActionVisible] = useState(false);


    const profile  = useSelector(selectAppProfile);

    const workerSite  = useSelector(selectAppWorkerSite);


    const detail = useSelector(selectAppDetailOrder);
    const suppliesDetail = useSelector(selectAppSuppliesDetail);


    // màn hình Việc Làm : 2 , Lịch Sử : 1
    const { typeDetail } = route?.params ?? 1;

    const totalFee = suppliesDetail ? suppliesDetail?.reduce((total, currentSupply) => total + ( parseFloat(currentSupply?.quantity) * parseFloat(currentSupply?.price)) , 0) : 0;


    const [txt, setTxt] = useState<string>('Nhập chi phí dịch vụ dự kiến');
    const [isReject, setisReject] = useState<boolean>(false);



    const _refAction = useRef<ActionSheet>();


    const submitAccept = (data : PopupType) => {
        _onHideAction()
        // if(detail?.status === 'CREATED'){
        //
        //     socket.emit('order-matching', {
        //         order_code: route?.params?.orderID,
        //         customer_worker_site_id:  route?.params?.customer_worker_site_id,
        //         electrician_worker_site_id: workerSite?.id,
        //         electrician_working_site_id : profile?.working_site?.id ?? '',
        //         // expected_fee : data?.cost,
        //         // electrician_note:data?.note ?? ''
        //
        //      });
        //
        //     console.log({
        //         order_code: route?.params?.orderID,
        //         customer_worker_site_id:  route?.params?.customer_worker_site_id,
        //         electrician_worker_site_id: workerSite?.id,
        //         electrician_working_site_id : profile?.working_site?.id ?? '',
        //         // expected_fee : data?.cost,
        //         // electrician_note:data?.note ?? ''
        //
        //     })
        //
        //     // navigationRef?.current.goBack();
        //
        // }

        // else
        //     if( detail?.status === 'ELECTRICIAN_ACCEPTED') {
        //     let body = {
        //         actual_fee : parseInt(data?.cost ?? '0'),
        //         electrician_note : data?.note ?? '' ,
        //         id : route?.params?.orderID
        //     }
        //     dispatch(orderActions.putPayment(body))
        // }
        //
        // else  if(detail?.status === 'ACCEPTANCED'){
        //     let body = {
        //         actual_fee : parseInt(data?.cost ?? '0'),
        //         electrician_note : data?.note ?? '' ,
        //         id : route?.params?.orderID
        //     }
        //     dispatch(orderActions.putPayment(body))
        // }
    }


    const submitReject = (data : PopupType) => {
        _onHideAction()

        console.log('asdasdasd')

        let body = {
            id : route?.params?.orderID,
            electrician_cancel_reason : data?.note ?? ''}

        dispatch(orderActions.putReject(body))
    }


    const _onShowAction = async () => {
        _refAction.current?.show();
    };

    const _onHideAction = async () => {
        _refAction.current?.hide();
    };

    const renderButton = () => {

        if(detail?.status === 'CREATED' ) // chờ tiếp nhận
            return (
                <View style={{flex : 1 }} >
                    <Button text={'Tiếp nhận yêu cầu'} preset={'outline'} buttonColorTheme={'btnSign'}
                            textColor={'white'}
                            onPress={() => {
                                // setisReject(false)
                                // socket.emit('order-matching', {
                                //     order_code: route?.params?.orderID,
                                //     customer_worker_site_id:  route?.params?.customer_worker_site_id,
                                //     electrician_worker_site_id: workerSite?.id,
                                //     electrician_working_site_id : profile?.working_site?.id ?? '',
                                //     // expected_fee : data?.cost,
                                //     // electrician_note:data?.note ?? ''
                                //
                                // });

                                dispatch(orderActions.putMatchingOrder({
                                        order_code: route?.params?.orderID,
                                        electrician_worker_site_id: parseInt(workerSite?.id ?? '0'),
                                        electrician_working_site_id : parseInt(profile?.working_site?.id ?? '0'),
                                }))

                                // console.log({
                                //     order_code: route?.params?.orderID,
                                //     customer_worker_site_id:  route?.params?.customer_worker_site_id,
                                //     electrician_worker_site_id: workerSite?.id,
                                //     electrician_working_site_id : profile?.working_site?.id ?? '',
                                //     // expected_fee : data?.cost,
                                //     // electrician_note:data?.note ?? ''
                                //
                                // })
                                // _onShowAction();
                            }}
                    />
                </View>
            );

        if(detail?.status === 'ACCEPTANCED' )//|| detail?.status === 'CUSTOMER_REJECTED' ) // đã ngiệp thu
         return (
             <View style={{flex : 1 , flexDirection: 'row' }} >
                 <View style={{flex : 1 , flexDirection: 'row' , paddingHorizontal:10 }} >
                     <Button text={'Hủy tiếp nhận'} preset={'border'} buttonColorTheme = {'red_blur'} textColor = {'red'}
                             style={{flex : 1}}
                             onPress={() => {
                                 setTxt('Nhập lý do huỷ tiếp nhận')
                                 setisReject(true)
                                 _onShowAction()
                             }}
                     />
                 </View>
                 <View style={{flex : 2 , flexDirection: 'row' , paddingHorizontal:10 }} >
                        <Button text={'Đề nghị thanh toán'} preset={'outline'} buttonColorTheme={'btnSign'}  style={{flex : 1}}
                            textColor={'white'}
                                onPress={() => {

                                    // setTxt('Vui lòng nhập chi phí thực tế bạn đã xác nhận với khách hàng')
                                    // setisReject(false)
                                    setActionVisible(true)
                                    // _onShowAction();
                                }}
                            />
                    </View>
             </View>
        );


        if(detail?.status === 'MATCHING') // matching
            return (
                <View style={{flex : 1 }} >
                    <Button text={'Chọn vật tư'} preset={'outline'} buttonColorTheme={'btnSign'}
                            textColor={'white'}
                            onPress={() => {
                                navigationRef?.current?.navigate(APP_SCREEN.WORK_DETAIL_SUPPLIES , {orderID : route?.params?.orderID ,  customer_worker_site_id:  route?.params?.customer_worker_site_id} )
                            }}
                    />
                </View>
            );

        if(detail?.status === 'CONFIRMED') // đang xử lý
            return (
                <View style={{flex : 1 , flexDirection: 'row' }} >
                    <View style={{flex : 1 , flexDirection: 'row' , paddingHorizontal:10 }} >
                        <Button text={'Hủy tiếp nhận'} preset={'border'} buttonColorTheme = {'red_blur'} textColor = {'red'}
                                style={{flex : 1}}
                                onPress={() => {
                                    setTxt('Nhập lý do huỷ tiếp nhận')
                                    setisReject(true)
                                    _onShowAction()
                                }}
                        />
                    </View>
                    <View style={{flex : 2 , flexDirection: 'row' , paddingHorizontal:10 }} >
                        <Button text={'Đề nghị nghiệm thu'} preset={'outline'} buttonColorTheme={'btnSign'}
                                textColor={'white'}
                                style={{flex : 1}}
                                onPress={() => {
                                    dispatch(orderActions.putSignContract(route?.params?.orderID))
                                }}
                        />
                    </View>
                </View>
            );

        if(detail?.status === 'ELECTRICIAN_ACCEPTED' || detail?.status === 'ACCEPTANCE_REQUESTED' || detail?.status === 'PAYMENT_REQUESTED' ) //
            return (
                <View style={{flex : 1 , flexDirection: 'row' }} >
                    <View style={{flex : 1 , flexDirection: 'row' , paddingHorizontal:10 }} >
                        <Button text={'Hủy tiếp nhận'} preset={'border'} buttonColorTheme = {'red_blur'} textColor = {'red'}
                                style={{flex : 1}}
                                onPress={() => {
                                    setTxt('Nhập lý do huỷ tiếp nhận')
                                    setisReject(true)
                                    _onShowAction()
                                }}
                        />
                    </View>
                </View>
            );

            return (
                null
            );


    }

    const renderStar = () => {

        let content = [];
        for ( i = 0 ; i< detail?.rating_star ; i++) {
            content.push(
                <>
                    <Icon icon={'star'} size={sizeScale(20)}/>
                    <Spacer width={10}/>
                </>
            );
        }
        return content;

    }

    useEffect( () => {

        dispatch(workActions.getDetailSupplies({order_code : route?.params?.orderID}))

        dispatch(orderActions.getDetailOrders(route?.params?.orderID))

        dispatch(appActions.setIDOrdersSelected(route?.params?.orderID))


    }, []);

    // render
    return (
        <Block block paddingTop={sizeScale(20)}  color={'white'}>
            <Screen
                bottomInsetColor="transparent"
                style={{  paddingHorizontal: 15 , marginTop : sizeScale(15) , flex : 1}}
                backgroundColor={'white'}>
                <Block
                    direction={'row'} middle  color={'white'} height={sizeScale(50)} paddingLeft={sizeScale(0)} >
                    <Block  style={{flex : 5}} >
                        <Text textAlign={'center'} text={'Thông tin yêu cầu'} preset={'linkLarge'} color={'black'}/>
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
                            hiddenStatusBar
                            backgroundColor={'white'}>

                            <Block marginHorizontal={sizeScale(10)} justifyContent={'center'} direction={"column"}  paddingTop={0}>
                                <Block block middle >
                                    <View style = {styles.outter}>
                                        <FastImage
                                            style = {styles.avatar}
                                            resizeMode = {'contain'}
                                            source={{ uri : detail?.image  }} //profile?.working_site?.avatar }}
                                        />
                                    </View>
                                    <Text textAlign={'center'} text={detail?.customer_name} preset={'linkMedium'} color={'black'}/>

                                    <Spacer height={15}/>

                                    {
                                    <Block direction={'row'} middle color={STATUS_ORDER_COLOR[detail?.status]} borderRadius={sizeScale(5)}  height={sizeScale(25)} paddingHorizontal={sizeScale(10)}>
                                        <Text text={STATUS_ORDER[detail?.status]} preset={'textSmall'} color={ STATUS_ORDER_COLOR_TXT[detail?.status]} style={{flexWrap: 'wrap'}} numberOfLines={1}/>
                                    </Block>
                                    }

                                    {
                                        typeDetail === 3 &&
                                        <>
                                            <Block style={{justifyContent: 'flex-start', flexDirection: 'row'}} block>
                                                <View style={{alignItems: 'flex-start', flexDirection: 'row', flex: 1}}>
                                                    <Text text={'Theo dõi trạng thái yêu cầu :  '} preset={'linkMedium'}
                                                          color={'black'} style={{textDecorationLine: 'underline'}}/>
                                                </View>
                                            </Block>

                                            <ProgressStatus/>
                                        </>
                                    }

                                    <Spacer height={20}/>

                                    <Block  style={{justifyContent: 'flex-start' , flexDirection : 'row'}} block>
                                        <View  style={{alignItems: 'flex-start' , flexDirection : 'row' , flex : 1}}>
                                            <Text text={'Thông tin yêu cầu :  '} preset={'linkMedium'} color={'black'} style={{textDecorationLine: 'underline' }}/>
                                        </View>
                                    </Block>

                                    <Spacer height={15}/>


                                    <Block direction={'row'} height={40} width={'100%'}>
                                            <Icon icon={'clock'} size={sizeScale(20)}/>
                                            <Spacer width={10}/>
                                            <Text text={moment(detail?.create_time).format('HH:mm:ss DD-MM-YYYY')} preset={'textMenu'} />
                                        </Block>
                                  <Divider color={ColorDefault.border}/>

                                  <Spacer height={15}/>
                                  <Block  style={{justifyContent: 'flex-start' , flexDirection : 'row'}}>
                                          <View  style={{alignItems: 'flex-start' , flexDirection : 'row' , flex : 1}}>
                                            <Icon icon={'map_pin'} size={sizeScale(20)}/>
                                          </View>
                                          <View  style={{alignItems: 'flex-start' , flexDirection : 'row' , flex : 9}}>
                                            <Text text={`${detail?.address}` } preset={'textMenu'} style={{flexWrap: 'wrap' , textAlign: 'left'}}  numberOfLines={3}/>
                                          </View>

                                  </Block>

                                    <Spacer height={15}/>
                                  <Divider color={ColorDefault.border}/>

                                    <Spacer height={15}/>
                                    <Block direction={'row'}  height={40}  width={'100%'}>
                                        <Icon icon={'phone'} size={sizeScale(20)}/>
                                        <Spacer width={10}/>
                                        <Button onPress={() => {Linking.openURL(`tel:${detail?.customer_phone}`)}}>
                                        <Text text={`${detail?.customer_phone}` } preset={'textMenu'} />
                                            </Button>
                                    </Block>
                                  <Divider color={ColorDefault.border}/>

                                    <Spacer height={15}/>
                                    <Block style={{justifyContent: 'flex-start' , flexDirection : 'row'}}>
                                        <View  style={{alignItems: 'flex-start' , flexDirection : 'row' , flex : 1}}>
                                            <Icon icon={'edit'} size={sizeScale(20)}/>
                                        </View>
                                        <View  style={{alignItems: 'flex-start' , flexDirection : 'row' , flex : 9}}>
                                            <Text text={`${detail?.title}` } preset={'textMenu'} style={{flexWrap: 'wrap' , textAlign: 'left'}}  numberOfLines={3}/>
                                        </View>
                                    </Block>
                                    <Spacer height={15}/>

                                    <Divider color={ColorDefault.border}/>

                                    <Spacer height={15}/>
                                    <Block style={{justifyContent: 'flex-start' , flexDirection : 'row'}}>
                                        <View  style={{alignItems: 'flex-start' , flexDirection : 'row' , flex : 1}}>
                                            <Icon icon={'write'} size={sizeScale(20)}/>
                                        </View>
                                        <View  style={{alignItems: 'flex-start' , flexDirection : 'row' , flex : 9}}>
                                            <Text text={`${detail?.customer_note}` } preset={'textMenu'} style={{flexWrap: 'wrap' , textAlign: 'left'}}  numberOfLines={3}/>
                                        </View>
                                    </Block>
                                    <Spacer height={15}/>
                                    <Divider color={ColorDefault.border}/>


                                    {
                                        detail?.status !== 'CREATED' && detail?.status !== 'CUSTOMER_REJECTED' &&
                                        <>
                                            <Spacer height={25}/>
                                            <Block direction={'row'} height={40} width={'100%'}>
                                                <Text textAlign={'left'} text={'Danh sách vật tư'} preset={'linkMedium'} style={{textDecorationLine: 'underline' }}
                                                      color={'black'}/>
                                            </Block>
                                            <Spacer height={20}/>
                                            {
                                                suppliesDetail?.map((item) => {
                                                    return(<>
                                                            <Block style={{justifyContent: 'flex-start' , flexDirection : 'row'}} height={40} width={'100%'}>
                                                                <View  style={{alignItems: 'flex-start' , flexDirection : 'row' , flex : 2}}>
                                                                    <Text text={`${item?.supply_name} x ${item?.quantity}`}
                                                                          style={{flexWrap: 'wrap' , textAlign: 'left'}}
                                                                          numberOfLines={3}
                                                                          preset={'textMenu'}/>
                                                                </View>

                                                                <View style={{flex : 1}}>

                                                                <Text text={`${formatNumber(item?.total_amount)} VNĐ`}
                                                                      style={{fontWeight : 'bold', textAlign: 'right'}}
                                                                      preset={'textMenu'}/>
                                                                </View>
                                                            </Block>
                                                        </>
                                                    );
                                                })

                                            }
                                            <>
                                                <Block direction={'row'} height={40} width={'100%'}>
                                                    <Spacer width={10}/>
                                                    <Text text={`Tổng tiền`}
                                                          style={{ fontWeight : 'bold'}}
                                                          preset={'textMenu'}
                                                           />

                                                    <Spacer width={30}/>

                                                    <Text style={{position : 'absolute' , right : 1 , fontWeight : 'bold'}} text={`${formatNumber(totalFee)} VNĐ`}
                                                          preset={'textMenu'}/>
                                                </Block>
                                            </>

                                            <Divider color={ColorDefault.border}/>

                                            <Spacer height={20}/>

                                            {
                                                (detail?.status === 'ELECTRICIAN_ACCEPTED' ||
                                                detail?.status === 'ACCEPTANCE_REQUESTED' ||
                                                detail?.status === 'CONFIRMED') &&
                                                // detail?.status !== 'ELECTRICIAN_REJECTED' &&
                                                // detail?.status !== 'RATED' &&
                                                // detail?.status !== 'PAID_CONFIRMED' &&
                                                // detail?.status !== 'PAID' &&
                                                <>
                                                    <Button
                                                        style={{flex: 1}}
                                                        onPress={() => {
                                                            navigationRef?.current?.navigate(APP_SCREEN.WORK_DETAIL_SUPPLIES, {
                                                                orderID: route?.params?.orderID,
                                                                customer_worker_site_id: route?.params?.customer_worker_site_id
                                                            })
                                                        }}>
                                                        <Text text={`+ Thêm vật tư`} color={ColorDefault.primary}
                                                              style={{fontWeight: 'bold'}}
                                                              preset={'textMenu'}/>
                                                    </Button>
                                                    <Spacer height={20}/>
                                                </>
                                            }

                                        </>
                                    }

                                    {
                                        detail?.status !== 'CREATED' && detail?.status !== 'ELECTRICIAN_ACCEPTED' && detail?.status !== 'MATCHING' && detail?.status !== 'CUSTOMER_REJECTED' && detail?.expected_fee &&
                                        <>
                                            <Spacer height={25}/>
                                            <Block direction={'row'} height={40} width={'100%'}>
                                                <Text textAlign={'left'} text={'Chi phí dự kiến'} preset={'linkMedium'} style={{textDecorationLine: 'underline' }}
                                                      color={'black'}/>
                                            </Block>
                                            <Spacer height={20}/>
                                            <Block direction={'row'} height={40} width={'100%'}>
                                                <Icon icon={'coin'} size={sizeScale(20)}/>
                                                <Spacer width={10}/>
                                                <Text text={`${formatNumber(detail?.expected_fee)} VND`}
                                                      preset={'textMenu'}/>
                                            </Block>
                                            <Divider color={ColorDefault.border}/>

                                            <Spacer height={20}/>
                                            <Block style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
                                                <View style={{alignItems: 'flex-start', flexDirection: 'row', flex: 1}}>
                                                    <Icon icon={'sticky_note'} size={sizeScale(20)}/>
                                                </View>
                                                <View style={{alignItems: 'flex-start', flexDirection: 'row', flex: 9}}>
                                                    <Text text={`${detail?.electrician_note}`} preset={'textMenu'}
                                                          style={{flexWrap: 'wrap', textAlign: 'left'}}
                                                          numberOfLines={3}/>
                                                </View>
                                            </Block>
                                            <Spacer height={15}/>
                                            <Divider color={ColorDefault.border}/>
                                        </>
                                    }

                                    {
                                        detail?.status === 'RATED' &&
                                        <>
                                            <Spacer height={25}/>
                                            <Block direction={'row'} height={40} width={'100%'}>
                                                <Text textAlign={'left'} text={'Đánh giá của khách hàng'} preset={'linkMedium'} style={{textDecorationLine: 'underline' }}
                                                      color={'black'}/>
                                            </Block>
                                            <Spacer height={20}/>
                                            <Block direction={'row'} height={40} width={'100%'}>
                                                {renderStar()}

                                            </Block>
                                            <Divider color={ColorDefault.border}/>

                                            <Spacer height={20}/>
                                            <Block style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
                                                <View style={{alignItems: 'flex-start', flexDirection: 'row', flex: 1}}>
                                                    <Icon icon={'comment'} size={sizeScale(20)}/>
                                                </View>
                                                <View style={{alignItems: 'flex-start', flexDirection: 'row', flex: 9}}>
                                                    <Text text={`${detail?.rating_note}`} preset={'textMenu'}
                                                          style={{flexWrap: 'wrap', textAlign: 'left'}}
                                                          numberOfLines={3}/>
                                                </View>
                                            </Block>
                                            <Spacer height={15}/>
                                            <Divider color={ColorDefault.border}/>
                                        </>
                                    }

                                </Block>

                            </Block>

                            <Spacer height={sizeScale(40)}/>


                        </Screen>

                    </View>

                    {renderButton()}
                </View>
            </Screen>
            <ActionSheet
                ref={_refAction}
                children={<FormAccpted onSubmit={submitReject} onReject={isReject ? submitReject : undefined}/>}
                title={txt}
                textCancel={'Tiếp Nhận'}
                option={[{ text: 'Option1' }, { text: 'Option2' }]}
            />

            <Modal isVisible={actionVisible}>
                <Block direction={'column'} middle height={sizeScale(200)}  alignItems={'center'} color={ColorDefault.white} margin={30} borderRadius={25} paddingTop={20}>

                    <Text style={{marginTop : 10}}  preset={'textMenu'}>{'Đề nghị khách hàng thanh toán số tiền'}</Text>

                    <Spacer height={sizeScale(20)}/>

                    <Text  preset={'linkTitle'} text={`${formatNumber(totalFee)} VNĐ`} color={'red'}/>

                    <Spacer height={sizeScale(20)}/>


                    <Block direction={'row'} marginTop={10} width={250} alignItems={'center'}>

                        <Button preset={'border'} buttonColorTheme = {'red_blur'} textColor = {'red'} width={100} text={'QUAY LẠI'}  onPress={() => {
                            setActionVisible(false)
                        }}>
                        </Button>

                        <Button preset={'border'} buttonColorTheme = {'btnSign'} textColor = {'white'} text={'ĐỒNG Ý'} onPress={() => {

                            let body = {
                                actual_fee : parseInt( '0'),
                                electrician_note : '' ,
                                id : route?.params?.orderID
                            }

                            setActionVisible(false);
                            dispatch(orderActions.putPayment(body))
                        }}>
                        </Button>
                    </Block>

                </Block>
            </Modal>

        </Block>
    );

};

export const WorkDetail = memo(WorkDetailComponent, isEqual);
