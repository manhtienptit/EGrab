import {
    checkKeyInObject,
    STORAGE_KEY_APP_THEME, STORAGE_KEY_CUSTOMER,
    STORAGE_KEY_TOKEN,
} from '@common';
import { takeLatestListeners } from '@listener';
import { MyAppTheme, ThemeType } from '@theme';
import {load, loadString} from '@utils/storage';

import { appActions } from '../action-slice/app';

takeLatestListeners()({
  actionCreator: appActions.startLoadApp,
  effect: async (_, listenerApi) => {
    const appTheme = loadString(STORAGE_KEY_APP_THEME);
    const token = loadString(STORAGE_KEY_TOKEN);
    const profile = load(STORAGE_KEY_CUSTOMER);

    // console.log('PROFILE : ' + JSON.stringify(profile));

    if (typeof token === 'string') {
      listenerApi.dispatch(appActions.setToken(token));
      listenerApi.dispatch(appActions.setAppProfile(profile));
    }

    if (
      typeof appTheme === 'string' &&
      checkKeyInObject(MyAppTheme, appTheme)
    ) {
      listenerApi.dispatch(appActions.setAppTheme(appTheme as ThemeType));
    }
    listenerApi.dispatch(appActions.endLoadApp());
  },
});


// takeLatestListeners()({
//     actionCreator: appActions.setPassword,
//     effect: async (action , listenerApi) => {
//
//         // await listenerApi.delay(1000);
//
//         navigationRef?.current?.navigate(APP_SCREEN.CHANGE_PASSWORD_3)
//
//
//     },
// });

// takeLatestListeners()({
//     actionCreator: appActions.setRetypePassword,
//     effect: async (action, listenerApi) => {
//         const {pass , re_pass} = action.payload;
//
//         console.log(action.payload)
//         console.log(pass === re_pass)
//
//         listenerApi.dispatch(appActions.setNotMatchPasswordStatus(!(pass === re_pass)));
//
//     },
// });
//
// takeLatestListeners()({
//     actionCreator: appActions.setNotMatchPasswordStatus,
//     effect: async (action, listenerApi) => {
//         const isNotMatch = action.payload;
//
//         console.log('setNotMatchPasswordStatus : ' + action.payload)
//
//         // if(!isNotMatch){
//         //     listenerApi.dispatch(authenticationActions.changePass);
//         // }
//
//
//     },
// });