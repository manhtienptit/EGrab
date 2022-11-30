import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';
import { useSelector } from 'react-redux';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Home } from '@features/authentication/home';
import { Login } from '@features/un-authentication/login';
import { AppModule } from '@native-module';
import {APP_SCREEN, BottomTabNavigatorParamList, RootStackParamList} from '@navigation/screen-types';
import { createStackNavigator } from '@react-navigation/stack';
import { selectAppToken } from '@redux-selector/app';
import {Register} from "@features/un-authentication/register";
import {ForgotPwd} from "@features/un-authentication/forgot-password";
import {OTPPwd} from "@features/un-authentication/verify-otp";
import {Icon, Block, Text, Spacer} from "@components";
import {ColorDefault} from "@theme/color";
import {Profile} from "@features/authentication/profile";
import {History} from "@features/authentication/history";
import {Infor} from "@features/authentication/profile-information";
import {ChangePwdStep1} from "@features/authentication/profile-change-password/step1";
import {ChangePwdStep2} from "@features/authentication/profile-change-password/step2";
import {ChangePwdStep3} from "@features/authentication/profile-change-password/step3";
import {ChangePwdStep4} from "@features/authentication/profile-change-password/step4";
import {WorkPlace} from "@features/authentication/profile-worker-place";
import {Partner} from "@features/authentication/profile-partner";
import {TimeToWork} from "@features/authentication/profile-timetowork";
import {WorkDetail} from "@features/authentication/home-work-detail";
import {sizeScale, useSocketContext} from "@common";
import {Performance} from "@features/authentication/work";
import {ElectricianSupplies} from "@features/authentication/home-work-detail-suplies";
import {ResetPwdStep2} from "@features/un-authentication/step2";
import {ResetPwdStep4} from "@features/un-authentication/step4";
import {ResetPwdStep3} from "@features/un-authentication/step3";

const RootStack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                showLabel: false,
                headerShown: false,
        }}>
            <Tab.Screen
                name={APP_SCREEN.WORKSITE}
                component={Home}
                options={{
                    showLabel: false,
                  headerShown: false,
                  title : '' ,
                    tabBarIcon: ({ focused }) => (
                        <Block middle paddingTop={0} marginTop={10}>
                            <Icon icon={ focused ? 'work_f' :  'work'} size={25} marginTop={sizeScale(20)} />
                            <Text color={focused ? ColorDefault.link : ColorDefault.text_gray}>Việc làm</Text>
                        </Block>
                    )}}
            />
            <Tab.Screen name={APP_SCREEN.HISTORY} component={History}
                        options={{
                            headerShown: false,
                            title : '' ,
                          tabBarIcon: ({ focused }) => (
                             <Block middle paddingTop={0} marginTop={10}>
                                <Icon icon={focused ? 'clock_f' :'clock'} size={25} marginTop={sizeScale(20)} />
                                 <Text color={focused ? ColorDefault.link : ColorDefault.text_gray}>Lịch sử</Text>
                             </Block>
                            )
                        }} />
            <Tab.Screen name={APP_SCREEN.PERFORMANCE} component={Performance}
                        options={{headerShown: false, title : '',
                            tabBarIcon: ({ focused }) => (
                                <Block middle paddingTop={0} marginTop={10}>
                                    <Icon icon={focused ? 'chart_f' :'chart'} size={25} marginTop={sizeScale(20)} />
                                    <Text color={focused ? ColorDefault.link : ColorDefault.text_gray}>Hiệu quả</Text>
                                </Block>
                            )}} />
            <Tab.Screen name={APP_SCREEN.PROFILE} component={Profile}
                        options={{headerShown: false, title : ''
                            ,tabBarIcon: ({ focused }) => (
                                <Block middle paddingTop={0} marginTop={10}>
                                    <Icon icon={focused ? 'user_f' :'user'} size={25} marginTop={sizeScale(20)} />
                                    <Text color={focused ? ColorDefault.link : ColorDefault.text_gray}>Profile</Text>
                                </Block>
                            )}} />
        </Tab.Navigator>
    );
};

const TabPerform = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <TabPerform.Navigator
            initialRouteName="Feed"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { backgroundColor: 'powderblue' },
            }}
        >
            <TabPerform.Screen
                name="Feed"
                component={Performance}
                options={{ tabBarLabel: 'Home' }}
            />
            <TabPerform.Screen
                name="Notifications"
                component={Performance}
                options={{ tabBarLabel: 'Updates' }}
            />

        </TabPerform.Navigator>
    );
}

export const RootNavigation = () => {
  // state
  const token = useSelector(selectAppToken);

    const { socket, socketInit, socketOff, socketListen,socketEmit, socketDisconnect } = useSocketContext();


    // effect
  useEffect(() => {
    const id = setTimeout(() => {
      BootSplash.hide({ fade: true });
    }, 1000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!token) {
      // clean cache when logout
      socketDisconnect();

      AppModule.clearCache();
    }

  }, [token]);

  // render
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {token === undefined ? (
        <RootStack.Group
          screenOptions={{
            animationTypeForReplace: 'pop',
            gestureEnabled: false,
            headerShown: false,
          }}>
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.LOGIN} component={Login}/>
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.REGISTER} component={Register}/>
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.FORGOT_PASSWORD} component={ForgotPwd}/>
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.VERIFY_OTP} component={OTPPwd}/>
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.RESET_PASSWORD_2} component={ResetPwdStep2}/>
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.RESET_PASSWORD_3} component={ResetPwdStep3}/>
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.RESET_PASSWORD_4} component={ResetPwdStep4}/>
        </RootStack.Group>
      ) : (
        <RootStack.Group
          screenOptions={{
            gestureEnabled: false,
              headerShown: false,
          }}>
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.HOME} component={BottomTabs} />
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.INFOR} component={Infor} />
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.WORK_PLACE} component={WorkPlace} />
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.PARTNER} component={Partner} />
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.TIME_TO_WORK} component={TimeToWork} />
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.WORK_DETAIL} component={WorkDetail} />
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.WORK_DETAIL_SUPPLIES} component={ElectricianSupplies} />
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.CHANGE_PASSWORD_1} component={ChangePwdStep1}/>
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.CHANGE_PASSWORD_2} component={ChangePwdStep2}/>
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.CHANGE_PASSWORD_3} component={ChangePwdStep3}/>
          <RootStack.Screen screenOptions={{ headerShown: false }} name={APP_SCREEN.CHANGE_PASSWORD_4} component={ChangePwdStep4}/>

        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};
