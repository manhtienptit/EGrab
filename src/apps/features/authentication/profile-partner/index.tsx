import React, {memo, useEffect, useState} from 'react';

import isEqual from 'react-fast-compare';
import {goBack} from "@navigation/navigation-service";
import {Button, Block, Screen, Spacer, Icon, Text, Divider, Select} from "@components";
import {dispatch, getState, logout, sizeScale} from "@common";
import {ColorDefault} from "@theme/color";
import {workActions} from "../../../redux/action-slice/worker";
import {authenticationActions} from "@redux-slice";
import {useSelector} from "react-redux";
import {selectAppProfile, selectAppProvinces, selectAppToken} from "@redux-selector/app";
import {useTranslation} from "react-i18next";
import {FormInfor} from "@features/authentication/profile-partner/components/form-info";
import {FormInformationType} from "@model/user";




const PartnerComponent = () => {


    const token = useSelector(selectAppToken);
    const profile = useSelector(selectAppProfile);


    const onSubmit = (data: FormInformationType) => {


    };


    // render
  return (
      <Block block paddingTop={sizeScale(15)} style={{overflow: 'hidden'}} color={'white'}>
          <Block
              direction={'row'} middle paddingLeft = {5} color={'white'} height={sizeScale(50)} paddingLeft={sizeScale(20)} direction={'row'}>
              <Button
                  style={{flex : 1}}
                  onPress={() => {
                      goBack();
                  }}>
                  <Icon size={sizeScale(30)} icon={'backarr'} />
              </Button>
              <Block  style={{flex : 50}} >
                <Text textAlign={'center'} text={'Thợ đồng hành'} preset={'linkMedium'} color={'black'}/>
              </Block>
          </Block>
          <Divider/>
          <Screen
              bottomInsetColor="transparent"
              style={{ paddingVertical: 0, paddingHorizontal: 15 }}
              backgroundColor={'white'}>


              <Block>
                  <FormInfor onSubmit={onSubmit}  />
              </Block>

          </Screen>
      </Block>
  );
};

export const Partner = memo(PartnerComponent, isEqual);
