import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Home from '../screens/Home';
import Map from '../screens/Map';
import AllServices from './AllServices';
import RideCompleted from './RideCompleted';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const HomeStack = createNativeStackNavigator();
const HomeScreensStack = props => {
  

  useEffect(() => {
    // try {
    //   messaging()
    //     .getToken()
    //     .then(token => {
    //       console.log(token);
    //       // setFCMToken(token);
    //       // console.log(token)
    //     });
    //   messaging().onNotificationOpenedApp(remoteMessage => {
    //     console.log(
    //       'Notification caused app to open from background state:',
    //       remoteMessage.notification,
    //     );
    //   });
    //   messaging()
    //     .getInitialNotification()
    //     .then(remoteMessage => {
    //       if (remoteMessage) {
    //         console.log(
    //           'Notification caused app to open from quit state:',
    //           remoteMessage.notification,
    //         );
    //       }
    //     });
      // const unsubscribe = messaging().onMessage(async remoteMessage => {
      //   console.log(remoteMessage, '');

      //   if (remoteMessage.notification) {
      //     PushNotification.localNotification({
      //       channelId: 'channel-id',
      //       channelName: 'My channel',
      //       message: remoteMessage.notification.body,
      //       playSound: true,
      //       title: remoteMessage.notification.title,
      //       priority: 'high',
      //       soundName: 'default',
      //     });
      //   }
      // });
      // return unsubscribe;
    // } catch (e) {
    //   console.log(e);
    // }
  }, []);
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <HomeStack.Screen name="Home" component={Home} {...props.navigation} />
      <HomeStack.Screen
        name="AllServices"
        component={AllServices}
        {...props.navigation}
      />

      <HomeStack.Screen name="Map" component={Map} {...props.navigation} />
      <HomeStack.Screen
        name="RideCompleted"
        component={RideCompleted}
        {...props.navigation}
      />
    </HomeStack.Navigator>
  );
};

export default HomeScreensStack;
