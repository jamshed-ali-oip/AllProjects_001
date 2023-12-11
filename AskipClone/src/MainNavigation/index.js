import React, { useEffect, useState } from 'react';
import AppNav from './AppNav';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNav from './AuthNav';
import SplashScreen from 'react-native-splash-screen';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification'
const Stack = createNativeStackNavigator();
const MainNavigation = () => {

  useEffect(() => {
    SplashScreen.hide();
  });
  const token = useSelector(state => state?.auth?.credential?.token);
  // console.log(token,"navigation")

  useEffect(() => {
    checkToken()
  }, [])
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      // console.log("fcmToken", fcmToken);
    }
  }

  useEffect(() => {
    requestUserPermission();
    try {
      messaging()
        .getToken()
        .then(token => {
          setFCMToken(token);
          console.log(token, "FCM")
        });
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
        });
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log(remoteMessage, 'remoteMessage ahsan');
        PushNotification.localNotification({
          channelId: 'channel-id',
          channelName: 'My channel',
          message: remoteMessage.notification.body,
          playSound: true,
          title: remoteMessage.notification.title,
          priority: 'high',
          soundName: 'default',
        });
        // }
      });
      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
      SplashScreen.hide();
    }
  }


  return (
    <NavigationContainer>
      <Stack.Navigator
      
        screenOptions={{
          statusBarTranslucent: true,
          statusBarHidden: Platform.OS == 'ios' ? true : false,
          headerShown: false,
        }}>
        {token ? (
          <Stack.Screen name="AppNav" component={AppNav} />
        ) : (
          <Stack.Screen name="AuthNav" component={AuthNav} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
