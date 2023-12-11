import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, LogBox, Text, Dimensions, Animated, Platform} from 'react-native';
import OfferADrink from './Screens/Offer/OfferADrink';
import OutOfDrink from './Screens/Offer/OutOfDrink';
import ProceedToPay from './Screens/Offer/ProceedToPay';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {interpolate} from 'react-native-reanimated';
import {withFancyDrawer} from './withFancyHeader';
import DrawerContent from './CustomDrawer';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PushNotification from 'react-native-push-notification';
import {connect} from 'react-redux';

import * as actions from './Store/Actions';
import {NavigationContainer} from '@react-navigation/native';
import Connections from './Screens/Connections/Connections';
import ConnectionStack from './Screens/Connections/ConnectionStack';
import ChatStack from './Screens/Chat/ChatStack';
import MyProfileScreen from './Screens/Home/Profile/MyProfileScreen';
import BottomTab from './BottomTab';
import messaging from '@react-native-firebase/messaging';
import {io} from 'socket.io-client';
import Geolocation from '@react-native-community/geolocation';


import MyTabs from './MyTabs';

import { ScreensArray2 } from './src/screens/drawer/arrays';
import SplashScreen from 'react-native-splash-screen';

const {width, height} = Dimensions.get('window');

LogBox.ignoreLogs([
  'Warning: Cannot update a component (`MainAppScreens`) while rendering a different component (`DrawerView`). To locate the bad setState() call inside `DrawerView`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render',
]);
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export const AnimatedContext = React.createContext(0);

const Drawer = createDrawerNavigator();
const STACK = createNativeStackNavigator();

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('FCM Authorization:', authStatus);
  }
};

const MainAppScreens = ({
  userGet,
  userReducer,
  getNotifications,
  saveSocketRef,
  coords,
  showDrawerConnectionsBadge,
  showNotificationsBadge,
  appendDataToNotifications,
}) => {
 
  // const socket = useRef();
  const USER_ID = userReducer?.data?.user_id;

  useEffect(() => {
    // @ts-ignore
    // socket.current = io('https://46a9-110-93-244-255.ap.ngrok.io');
    // console.log("=================",socket.current)
    // saveSocketRef(socket.current);
    // registerAppWithFCM()
    messaging()
      .subscribeToTopic('bmad' + userReducer?.data?.user_id?.toString())
      .then(() => {
        // console.log('NOTIFICATIONS SUBSCRIBED');
      });

    try {
      messaging()
        .getToken()
        .then(token => {
          // console.log('TOKEN: : : : :  :', token);
          // setFCMToken(token);
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
        console.log(remoteMessage, 'notification');
        // const user = await JSON.parse(remoteMessage?.data?.user);
        // const post = await JSON.parse(remoteMessage?.data?.post);
        // const notiData = await JSON.parse(remoteMessage?.data?.notiData);

        //generrate random string
        const randomString = Math.random().toString(36).substring(7);

        // const data = {
        //   id: randomString,
        //   user: {
        //     user_id: user?.user_id,
        //     user_name: user?.user_name,
        //     user_email: user?.user_email,
        //     coins: user?.coins,
        //     user_coverImage: user?.user_coverImage,
        //     user_image: user?.user_image,
        //   },

        //   type: remoteMessage?.data?.type,
        //   post: {
        //     post_id: post?.post_id,
        //     user_id: post?.user_id,
        //     post_title: post?.post_title,
        //     post_url: JSON.parse(post?.post_url),
        //     post_desc: post?.post_desc,
        //     post_type: post?.post_type,
        //     post_status: 1,
        //     post_created_at: notiData?.post_created_at,
        //     post_updated_at: post?.post_updated_at,
        //   },
        //   comment: remoteMessage?.data?.comment,

        //   created_at: notiData?.created_at,
        //   send_to: notiData?.send_to,
        // };

        // Call api to get notifications data
        if (remoteMessage?.data?.type == 'likePost') {
          getNotifications(USER_ID);
          // await appendDataToNotifications(data);
          await showNotificationsBadge();
        }

        //Set badge in drawer for new invitations
        if (remoteMessage?.data?.type == 'sendRequest') {
          showDrawerConnectionsBadge(true);
        }

        if (
          remoteMessage?.data?.type == 'createComment' ||
          remoteMessage?.data?.tpe == 'createComment'
        ) {
          getNotifications(USER_ID);
          // await appendDataToNotifications(data);
          await showNotificationsBadge();
        }

        if (remoteMessage.notification) {
          PushNotification.localNotification({
            channelId: 'channel-id',
            channelName: 'My channel',
            message: remoteMessage.notification.body,
            playSound: true,
            title: remoteMessage.notification.title,
            priority: 'high',
            soundName: 'default',
          });
        }
      });
      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {

    SplashScreen.hide()

    requestUserPermission();
    getOneTimeLocation();
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        // setLocationStatus('You are Here');

        coords(position.coords.latitude, position.coords.longitude);

        console.log('getting one time location coords...');
      },
      error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  return (
    <NavigationContainer>
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: styles.drawerStyles,
        drawerType: 'slide',
        
        overlayColor: 'transparent',
        swipeEdgeWidth: Platform.OS === 'android' && 180,
        sceneContainerStyle: styles.sceneStyles,
        headerShown: false
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      {ScreensArray2.map((_, i) => (
        <Drawer.Screen key={i} name={_.route} component={_.component}
          options={{
            item: _,
          }}
        />
      ))}
    </Drawer.Navigator>
    </NavigationContainer>
  );
};
const mapStateToProps = ({userReducer}) => {
  return {userReducer};
};

export default connect(mapStateToProps, actions)(MainAppScreens);
// export default MainAppScreens;
{/* <AnimatedContext.Provider value={animatedValue}>
<View style={{backgroundColor: '#B01125', flex: 1}}>
  <NavigationContainer>
    <Drawer.Navigator
      statusBarAnimation="slide"
      minSwipeDistance={12}
      drawerStyle={{
        backgroundColor: 'transparent',
      }}
      drawerType={'slide'}
      initialRouteName="home"
      overlayColor="transparent"
      drawerContent={props => {
        setAnimatedValue(props.progress);
        return <DrawerContent {...props} />;
      }}
      >
      <Drawer.Screen name="home" component={(BottomTab)} />
      <Drawer.Screen
        name="connections"
        component={ConnectionStack}
      />
      <Drawer.Screen
        name="profile"
        component={withFancyDrawer(MyProfileScreen)}
      />
      <STACK.Screen
        name="OfferADrink"
        options={{headerShown: false}}
        component={withFancyDrawer(OfferADrink)}
      />
      <STACK.Screen
        name="OutOfDrink"
        options={{headerShown: false}}
        component={withFancyDrawer(OutOfDrink)}
      />
      <STACK.Screen
        name="ProceedToPay"
        options={{headerShown: false}}
        component={withFancyDrawer(ProceedToPay)}
      />
      <STACK.Screen
        name="chats"
        options={{headerShown: false}}
        component={withFancyDrawer(ChatStack)}
      />
    </Drawer.Navigator>
  </NavigationContainer>
</View>
</AnimatedContext.Provider> */}
var styles = StyleSheet.create({
  drawerStyles: {
    width: 260,
    backgroundColor: '#B01125',

  },
  sceneStyles:{
    backgroundColor: '#B01125'
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white'
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
