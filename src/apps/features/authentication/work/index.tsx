import React, {memo, useEffect} from 'react';

import isEqual from 'react-fast-compare';
import {goBack} from "@navigation/navigation-service";
import {Button, Block, Screen, Divider, Text, Progress, Spacer, Icon} from "@components";
import {dispatch, formatNumber, getState, logout, sizeScale, startAndEndOfWeek} from "@common";
import {authenticationActions, appActions, workActions} from "@redux-slice";
import {AppState} from "@model/app";
import {ColorDefault} from "@theme/color";

import {Image, View, useWindowDimensions, Dimensions} from 'react-native';
import {selectAppProfile, selectPerformDetail, selectReportDetail} from "@redux-selector/app";
import {useSelector} from "react-redux";
import {orderActions} from "../../../redux/action-slice/orders";
import PagerView from 'react-native-pager-view';
import { TabView, SceneMap , TabBar } from 'react-native-tab-view';
import moment, { Moment } from 'moment';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import {PerformType} from "@model/perfomance/performance";

const HomeComponent = () => {

    const report  = useSelector(selectReportDetail);
    const performance  = useSelector(selectPerformDetail) ;

    // console.log(performance)


    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [indexWeek, setIndexWeek] = React.useState(2);

    const [week] = React.useState([
        { key: '0', title: 'Tuần trước nữa' , date : -14 },
        { key: '1', title: 'Tuần trước' , date : -7 },
        { key: '2', title: 'Tuần này' , date : 0},
        // { key: '2', title: 'Tuần sau' , date : 7},
    ]);

    const [routes] = React.useState([
        { key: 'first', title: 'Thống Kê' },
        { key: 'second', title: 'Hiệu quả' },
    ]);


    const data = {
        labels: performance?.date?.labels ?? ['1','2','3'],
        datasets: [
            {
                data: performance?.date?.data
            }
        ]
    };

    const dataDistric = performance?.distric
    const dataPeriod = performance?.period

    // console.log(report)

    useEffect( () => {

        dispatch(workActions.getDetailStaticals())

    }, []);


    useEffect( () => {

        var now = new Date();
        now.setDate(now.getDate() - 1 + week[indexWeek].date)
        let [from_date,to_date] = startAndEndOfWeek(now);

        let body = {
            from_date : moment(from_date).format('YYYY-MM-DD'),
            to_date : moment(to_date).format('YYYY-MM-DD'),
        }



        dispatch(workActions.getDetailPerformmance(body))


    }, [indexWeek]);



    const FirstRoute = () => (
        <Screen
            bottomInsetColor="transparent"
            scroll
            style={{paddingHorizontal : 20, marginTop : sizeScale(20) }}
            backgroundColor={'#DFE4E8'}>
        <View style={{marginBottom : sizeScale(20)}} >
            <Block height={sizeScale(250)} direction={'column'} color={'#F8FAFC'} borderRadius={10} >

                <Block paddingVertical={sizeScale(10)} middle >
                    <Text preset={'textMenu'} color={ColorDefault.text_gray} text={'Tất cả yêu cầu'} style={{position : 'absolute' , top : sizeScale(80) , fontSize : 10}}/>
                    <Text preset={'textMenu'} color={ColorDefault.black} text={report?.total_accepted ?? '0'} style={{position : 'absolute' , top : sizeScale(60), fontWeight : 'bold' , fontSize : sizeScale(25)}}/>
                    <Progress showTextProgress={false} textProgressStyle={{fontWeight:'bold' , fontSize : 30}} type={'circle'} progress={(report?.total_done / report?.total_accepted) * 100} radius={sizeScale(60)} strokeWidth={sizeScale(15)} bg={'red'} fg={'#3DD598'} />
                </Block>

                <Spacer height={sizeScale(10)}/>

                <Block direction={'row'} middle paddingLeft={sizeScale(30)} >
                    <Block color={'#3DD598'} width={sizeScale(10)} height={sizeScale(10)}/>
                    <Spacer width={10}/>
                    <Text preset={'textMenu'} color={ColorDefault.text_gray} text={'Đã hoàn thành'} style={{ fontSize : sizeScale(15)}}/>
                    <Spacer width={5}/>
                    <Text preset={'linkMedium'} color={ColorDefault.black} text={report?.total_done ?? '0'} style={{ marginLeft: sizeScale(10) , fontSize : sizeScale(15)}}/>

                </Block>
                <Block direction={'row'} middle paddingLeft={sizeScale(30)}>
                    <Block color={'red'} width={sizeScale(10)} height={sizeScale(10)}/>
                    <Spacer width={10}/>
                    <Text preset={'textMenu'} color={ColorDefault.text_gray} text={'Đang xử lý'} style={{ fontSize : sizeScale(15)}}/>
                    <Spacer width={5}/>
                    <Text preset={'linkMedium'} color={ColorDefault.black} text={`${report?.total_processing ?? '0'}`} style={{ marginLeft: sizeScale(10) , fontSize : sizeScale(15)}}/>
                </Block>
            </Block>

            <Spacer height={sizeScale(20)}/>

            <Block direction={'row'} middle paddingLeft={sizeScale(10)} >
                <Block  style={{flex : 1}}>
                    <Icon icon={'chart_icon'} size={sizeScale(50)}/>
                </Block>

                <Spacer width={sizeScale(40)}/>

                <Block  style={{flex : 10}}>
                    <Text preset={'linkLarge'} color={ColorDefault.black} text={'Doanh thu dịch vụ'} />
                    <Text preset={'linkSubtitle'} color={ColorDefault.primary} text={`${formatNumber(report?.total_amount)} VNĐ`} style={{fontWeight : 'bold'}} />
                </Block>

            </Block>


            {
                report?.detail?.map((item , index) => {
                    return(
                        <View  key={index}>
                            <Spacer height={sizeScale(20)}/>

                            <Block direction={'column'} middle paddingHorizontal={sizeScale(5)} height={sizeScale(120)} width={'100%'} >
                                <Block direction={'row'} paddingLeft={sizeScale(10)} middle style={{flex : 1}} color={'#D8F9FE'}  width={'100%'} borderRadius={sizeScale(5)}>
                                    <Text preset={'linkMedium'} color={'#CB7A00'} text={`${(item?.service_name)}`} />
                                </Block>

                                <Block direction={'row'} style={{flex : 2}} color={'white'} middle>
                                    <Block direction={'column'} middle style={{flex : 1.5}}>
                                        <Text preset={'textMenu'} color={'##5D708C'} text={'Doanh thu'} style={{ marginTop : sizeScale(5)}} />
                                        <Text preset={'linkSubtitle'} color={ColorDefault.black} text={`${formatNumber(item?.amount)} VNĐ`} style={{fontWeight : 'bold' , marginTop : sizeScale(5)}} />
                                    </Block>

                                    <Divider height={sizeScale(50)} width={0.5}/>

                                    <Block direction={'column'} block middle>
                                        <Text preset={'textMenu'} color={ColorDefault.black} text={'Đã hoàn thành'}  style={{ marginTop : sizeScale(5)}} />
                                        <Text preset={'linkSubtitle'} color={'#3DD598'} text={`${formatNumber(item?.total)}`} style={{fontWeight : 'bold', marginTop : sizeScale(5)}} />
                                    </Block>
                                </Block>

                            </Block>
                        </View>
                    );
                })
            }

        </View>
        </Screen>
    );

    const SecondRoute = () => (
        <Screen
            bottomInsetColor={'transparent'}
            scroll
            style={{  paddingHorizontal: 15 , marginVertical : 20}}
            backgroundColor={'#DFE4E8'}>
            <View style={{marginBottom : sizeScale(20)}} >

                <Text preset={'linkMedium'} color={ColorDefault.black} text={'Số lượt yêu cầu dịch vụ'} />

                <Spacer height={sizeScale(10)}/>

                <Block height={sizeScale(50)} borderRadius={10} >

                    <Block direction={'row'} middle block>
                        <Block direction={'row'} middle block >
                            <Button
                                onPress={()=> {
                                    setIndexWeek(prevCount => prevCount > 0 ? prevCount - 1 : prevCount)
                                }}
                                children={
                                    <Icon icon={'arrow_down'} size={sizeScale(25)} />
                                }
                                style={{transform: [{ rotate: "90deg" }], position: 'absolute' , left : 1}}
                            />
                        </Block>

                        <Block direction={'column'} middle style={{flex : 2}} >
                            <Text  text={week[indexWeek].title} preset={'linkMedium'} color={ColorDefault.text_gray}/>
                        </Block>

                        <Block direction={'row'} middle style={{flex : 1}} >
                            <Button
                                onPress={()=> {
                                    setIndexWeek(prevCount => prevCount < 2 ? prevCount + 1 : prevCount)
                                }}
                                children={
                                    <Icon icon={'arrow_down'} size={sizeScale(25)} />
                                }
                                style={{transform: [{ rotate: "-90deg" }] , position: 'absolute' , right : 1}}
                                />
                            </Block>

                    </Block>

                </Block>


                <Spacer height={sizeScale(10)}/>



                <Block height={sizeScale(250)} direction={'column'} color={'#F8FAFC'} borderRadius={10} >

                    <BarChart
                        data={data}
                        width={sizeScale(350)}
                        height={sizeScale(250)}
                        yAxisLabel=""
                        chartConfig={{
                            backgroundGradientFrom: ColorDefault.primary,
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientTo: ColorDefault.primary,
                            backgroundGradientToOpacity: 0,

                            fillShadowGradientOpacity: 1,
                            color: (opacity = 1) => ColorDefault.primary,
                            labelColor: (opacity = 1) => `#333`,
                            strokeWidth: 10,

                            barPercentage: 0.5,
                            useShadowColorFromDataset: false,
                            decimalPlaces: 0,
                        }}
                        verticalLabelRotation={0}
                    />

                </Block>

                <Spacer height={sizeScale(30)}/>

                    <Block  block color={'#F8FAFC'} borderRadius={10} >
                        <PieChart
                            data={dataDistric}
                            width={layout.width * 0.85}
                            height={sizeScale(140)}
                            chartConfig={{
                                backgroundGradientFrom: '#1E2923',
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientTo: '#08130D',
                                backgroundGradientToOpacity: 0.5,
                                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                                strokeWidth: 2,
                                barPercentage: 0.1,
                                useShadowColorFromDataset: false,
                            }}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                            center={[-20, 0]}
                            absolute
                        />
                    </Block>

                    <Spacer height={sizeScale(30)}/>


                    <Block  block color={'#F8FAFC'} borderRadius={10} >
                        <PieChart
                            data={dataPeriod}
                            width={layout.width* 0.85}
                            height={sizeScale(140)}
                            chartConfig={{
                                backgroundGradientFrom: '#1E2923',
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientTo: '#08130D',
                                backgroundGradientToOpacity: 0.5,
                                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                                strokeWidth: 2,
                                barPercentage: 0.1,
                                useShadowColorFromDataset: false,
                            }}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                            center={[0, 0]}
                            absolute
                            avoidFalseZero
                        />
                    </Block>


            </View>
        </Screen>

    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: ColorDefault.primary }}
            labelStyle={{ color: ColorDefault.primary , fontWeight : 'bold' }}
            style={{ backgroundColor: 'white' }}
            activeColor={ColorDefault.primary}
            inactiveColor={ColorDefault.text_gray}
        />
    );


    // render
  return (
      <Block block paddingTop={sizeScale(20)}  color={'white'}>

          <Block middle color={'white'} height={sizeScale(60)} paddingTop={sizeScale(20)}>
              <Block middle style={{flex : 50}} >
                  <Text textAlign={'left'} text={'Báo cáo - Thống kê'} preset={'linkLarge'} color={'black'} />
              </Block>
          </Block>

          <Divider />

          <View style={{flex : 1 }} >
              <TabView
                  navigationState={{ index, routes }}
                  renderScene={renderScene}
                  renderTabBar={renderTabBar}
                  onIndexChange={() => {}}
                  initialLayout={{ width: layout.width }}
                  pagerStyle={{backgroundColor : '#DFE4E8' }}
              />
          </View>
      </Block>
  );
};

export const Performance = memo(HomeComponent, isEqual);
