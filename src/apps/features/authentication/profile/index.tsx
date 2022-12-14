import React, {memo, useEffect, useState} from 'react';

import {Image , View} from 'react-native';
import isEqual from 'react-fast-compare';
import {goBack, navigationRef} from "@navigation/navigation-service";
import {
    Button,
    Block,
    Screen,
    LightBox,
    Text,
    Spacer,
    Icon,
    Divider,
    Switch,
    showSnack,
    TouchableScale
} from "@components";
import Modal from "react-native-modal";
import {dispatch, getState, logout} from "@common";
import {authenticationActions, appActions, workActions} from "@redux-slice";
import {AppState} from "@model/app";
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import {styles} from "./styles";
import {ColorDefault} from "@theme/color";
import {APP_SCREEN} from "@navigation/screen-types";
import {useSelector} from "react-redux";
import {selectAppProfile, selectAppToken, selectAppWorkerSite} from "@redux-selector/app";


const ProfileComponent = () => {

    // const { token ,  profile , inChagre }: AppState = getState('app');

    const token = useSelector(selectAppToken);
    const profile = useSelector(selectAppProfile);
    const workerSite  = useSelector(selectAppWorkerSite);

    useEffect(() => {
        const body = {}

        dispatch(authenticationActions.getDetailProfile());
        dispatch(workActions.getProvinces(body))
    }, []);

    //state
    const [value, setValue] = useState<boolean>(true);
    const [actionVisible, setActionVisible] = useState(false);

    // function

    const onInChargeSwitch = (value) => {

        let body = {status: value === true ? 'OFFLINE' : 'AVAILBLE'}
        dispatch(authenticationActions.updateWorkingStatusProfile(body))
    }




    const onLogout = () => {
        setActionVisible(false);
        logout();
    }

  // render
  return (
      <Block block paddingTop={0} paddingHorizontal={15} backgroundColor={'white'}>

          <Screen
              bottomInsetColor="transparent"
              scroll
              style={{ paddingVertical: 0, paddingHorizontal: 10 }}
              backgroundColor={'white'}>
              <Block block justifyContent={'center'}  paddingTop={30}>

                  <Block block middle height={250}>
                      <View style = {styles.outter}>
                          <FastImage
                              style = {styles.inner}
                              resizeMode = {'contain'}
                              source={{ uri : profile?.working_site?.avatar }}
                          />
                          <View style = {styles.avatar}>
                            <Icon icon={'camera'} size={50}/>
                          </View>
                      </View>
                      <Spacer height={20}/>
                      <Text  preset={'linkSubtitle'}>{workerSite?.fullname }</Text>
                  </Block>

                  <Divider color={ColorDefault.border}/>
                  <Block direction={'row'} paddingTop={15} height={100}>
                      <Block style={{flex : 4}}>
                          <Text  preset={'textMedium'} color={workerSite?.status === 'OFFLINE' ? ColorDefault.text_gray : ColorDefault.primary}>{workerSite?.status === 'OFFLINE' ? '??ang t???t nh???n vi???c' : '??ang b???t nh???n vi???c'}</Text>
                          <Text >{'B???t nh???n vi???c ????? nh???n ???????c th??ng b??o khi c?? y??u c???u d???ch v??? c???a kh??ch h??ng EVN.'}</Text>
                      </Block>

                      <Block style={{flex : 1}} middle direction={'row'} paddingLeft={20}>
                          <Switch value={workerSite?.status !== 'OFFLINE'} onToggle={onInChargeSwitch}/>
                      </Block>

                  </Block>

                  <Divider color={ColorDefault.border}/>

                  <TouchableScale onPress={() => {navigationRef?.current?.navigate(APP_SCREEN.INFOR)}}>
                      <Block direction={'row'} middle height={70} paddingTop={5} alignItems={'center'} block >
                          <Icon icon={'p_m1'} size={40}
                                onPress={() => {navigationRef?.current?.navigate(APP_SCREEN.INFOR)}}
                          />
                          <Block middle direction={'row'} paddingLeft={20}>
                              <Button   onPress={() => {navigationRef?.current?.navigate(APP_SCREEN.INFOR)}}>
                              <Text  marginLeft={30} preset={'textMenu'}>{'Th??ng tin t??i kho???n'}</Text>
                              </Button>
                          </Block>

                      </Block>
                  </TouchableScale>

                  <Divider color={ColorDefault.border}/>

                  <TouchableScale onPress={() => {navigationRef?.current?.navigate(APP_SCREEN.WORK_PLACE)}}>
                      <Block direction={'row'} middle height={70} paddingTop={5} alignItems={'center'}>
                          <Icon   onPress={() => {navigationRef?.current?.navigate(APP_SCREEN.WORK_PLACE)}} icon={'p_m2'} size={40}/>
                          <Block middle direction={'row'} paddingLeft={20}>
                              <Button   onPress={() => {navigationRef?.current?.navigate(APP_SCREEN.WORK_PLACE)}}>
                              <Text  marginLeft={30} preset={'textMenu'}>{'?????a b??n ho???t ?????ng'}</Text>
                              </Button>
                          </Block>

                      </Block>
                  </TouchableScale>

                  <Divider color={ColorDefault.border}/>

                  <TouchableScale onPress={() => {navigationRef?.current?.navigate(APP_SCREEN.TIME_TO_WORK)}}>
                  <Block direction={'row'} middle height={70} paddingTop={5} alignItems={'center'}>
                      <Icon onPress={() => {navigationRef?.current?.navigate(APP_SCREEN.TIME_TO_WORK)}} icon={'p_m3'} size={40}/>
                      <Block middle direction={'row'} paddingLeft={20}>
                          <Button   onPress={() => {navigationRef?.current?.navigate(APP_SCREEN.TIME_TO_WORK)}}>
                          <Text  marginLeft={30} preset={'textMenu'}>{'Th???i gian ho???t ?????ng'}</Text>
                          </Button>
                      </Block>

                  </Block>
                  </TouchableScale>

                  <Divider color={ColorDefault.border}/>

                  <TouchableScale onPress={() => {navigationRef?.current?.navigate(APP_SCREEN.CHANGE_PASSWORD_1)}}>
                  <Block direction={'row'} middle height={70} paddingTop={5} alignItems={'center'}>
                      <Icon icon={'p_m5'} size={40}
                            onPress={() => {navigationRef?.current?.navigate(APP_SCREEN.CHANGE_PASSWORD_1)}}
                      />
                      <Block middle direction={'row'} paddingLeft={20}>
                          <Button   onPress={() => {navigationRef?.current?.navigate(APP_SCREEN.CHANGE_PASSWORD_1)}}>
                          <Text  marginLeft={30} preset={'textMenu'}>{'?????i m???t kh???u'}</Text>
                          </Button>
                      </Block>

                  </Block>
                  </TouchableScale>

                  <Divider color={ColorDefault.border}/>

                  <TouchableScale onPress={() => setActionVisible(true)}>
                  <Block direction={'row'} middle height={70} paddingTop={5} alignItems={'center'}>
                      <Icon  onPress={() => setActionVisible(true)} icon={'logout'} size={40}/>
                      <Block middle direction={'row'} paddingLeft={20}>
                          <Button   onPress={() => setActionVisible(true)}>
                          <Text  marginLeft={30} preset={'textMenu'}>{'????ng xu???t'}</Text>
                          </Button>
                      </Block>

                  </Block>
                  </TouchableScale>



              </Block>
          </Screen>

          <Modal isVisible={actionVisible}>
              <Block direction={'column'} middle height={180}  alignItems={'center'} color={ColorDefault.white} margin={30} borderRadius={25} paddingTop={20}>
                  <Text  preset={'linkSubtitle'}>{'????ng xu???t'}</Text>
                  <Text style={{marginTop : 10}}  preset={'textMenu'}>{'B???n c?? mu???n ????ng xu???t t??i kho???n \n n??y kh??ng'}</Text>

                  <Block direction={'row'} marginTop={10} width={250} alignItems={'center'}>

                      <Button preset={'border'} buttonColorTheme = {'red_blur'} textColor = {'red'} width={100} text={'????ng xu???t'}  onPress={() => { onLogout()}}>
                      </Button>

                      <Button preset={'border'} buttonColorTheme = {'btnSign'} textColor = {'white'} text={'??? l???i'} onPress={() => { setActionVisible(false)}}>
                      </Button>
                  </Block>

              </Block>
          </Modal>
      </Block>
  );
};

export const Profile = memo(ProfileComponent, isEqual);
