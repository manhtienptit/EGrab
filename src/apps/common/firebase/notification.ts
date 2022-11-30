/**
 * remove this line when use
 */
import {AsyncStorage} from "@react-native-async-storage/async-storage";

export {};
import {CustomOmit} from '@common';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {load, save, saveString} from "@storage";

export interface RemoteNotification<T>
  extends CustomOmit<FirebaseMessagingTypes.RemoteMessage, 'data'> {
    // Nested data from fcm is string. carefully when use
  data?: T;
}

export const requestNotificationPermission = async () => {

  const authStatus = await messaging().requestPermission();

    console.log('==================================================================')
    console.log('authStatus')
    console.log(authStatus)


    // Register the device with FCM
  // await messaging().registerDeviceForRemoteMessages();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log('==================================================================')
    console.log('enabled')
    console.log(enabled)



    if (enabled) {
        await getFCMToken();
    }
};

export const getDeviceToken = async () => {
  return messaging().getToken();
};

const getFCMToken = async () => {
    let fcmToken = await load('fcmToken');
    if (!fcmToken) {
        try {
            let fcmtoken = await getDeviceToken();

            if (fcmtoken) {
                await save('fcmToken', fcmtoken);
            } else {
            }
        } catch (error) {
            console.log('error: ', { error });
        }
    } else {
        await save('fcmToken', '');
    }
};

/**
 * Notification coming when app in foreground
 */
export const useInAppNotification = <T = any>(
  callback: (remoteNotification: RemoteNotification<T>) => any,
) => {
  // effect
  useEffect(() => {
    messaging().onMessage(
      callback as (message: FirebaseMessagingTypes.RemoteMessage) => any,
    );
  }, []);
};

/**
 * Notification coming when app in background or quit state
 */
export const useBackgroundNotification = <T = any>(
  callback: (remoteNotification: RemoteNotification<T>) => any,
) => {
  useEffect(() => {
    messaging().setBackgroundMessageHandler(
      callback as (message: FirebaseMessagingTypes.RemoteMessage) => any,
    );
  }, []);
};

/**
 * User click notification when app in background
 */
export const useBackgroundOpenedNotification = <T = any>(
  callback: (remoteNotification: RemoteNotification<T>) => any,
) => {
  // effect
  useEffect(() => {
    messaging().onNotificationOpenedApp(
      callback as (message: FirebaseMessagingTypes.RemoteMessage) => any,
    );
  }, []);
};

/**
 * User click notification when app in killed or quit state
 */
export const useKilledOpenedNotification = <T = any>(
  callback: (remoteNotification: RemoteNotification<T> | null) => any,
) => {
  // effect
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(
        callback as (
          message: FirebaseMessagingTypes.RemoteMessage | null,
        ) => any,
      );
  }, []);
};
