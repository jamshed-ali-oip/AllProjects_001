import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import HistoryScreen from './HistoryScreen';
import AllServices from './AllServices';
import RateUs from './RateUs';
import Profile from './Profile';
import Wallet from './Wallet';
import Map from './Map';
import CustomDrawer from '../CustomDrawer';
import Help from './Help';
import HomeScreensStack from './HomeStackScreens';
import messaging from '@react-native-firebase/messaging';
import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux';
import PushNotification from "react-native-push-notification";
import * as actions from "../store/Actions"
import BankCardDetails from './BankCardDetails';


const Drawer = createDrawerNavigator();

function MainAppScreens({ navigation, saveLocation, user }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestUserPermission()
    getLocation()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        channelId: "channel-id",
        channelName: "My channel",
        message: remoteMessage.notification.body,
        playSound: true,
        title: remoteMessage.notification.title,
        priority: 'high',
        soundName: 'default',

      })
    });
    return unsubscribe;
  }, [])

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      messaging()
        .subscribeToTopic(user?.data?.id + "p")
        .then(() => console.log('Subscribed to topic!', user?.data?.id + "p"));
      const token = await messaging().getToken()
      console.log(token, "tjoekn")
    }
  }

  async function getLocation() {

    if (Platform.OS == "ios") {
      const req = await Geolocation.requestAuthorization("whenInUse");
      if (req == "granted") {
        getPoints()
      }
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "Mechanic would like to access your location",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted == "granted") {
        getPoints()
      }
    }
  }

  function getPoints() {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        saveLocation({
          user_id: user.data?.id,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }).then(res => console.log(res.data))
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  const routes = [
    {
      id: 1,
      iconName: 'home',
      iconType: 'Entypo',
      routeName: 'home',
    },
    {
      id: 1,
      iconName: 'miscellaneous-services',
      iconType: 'MaterialIcons',
      routeName: 'my services',
    },
    {
      id: 2,
      iconName: 'history',
      iconType: 'MaterialIcons',
      routeName: 'history',
    },
    {
      id: 3,
      iconName: 'wallet',
      iconType: 'Entypo',
      routeName: 'account',
    },
    {
      id: 4,
      iconName: 'person-circle-sharp',
      iconType: 'Ionicons',
      routeName: 'profile',
    },
    // {
    //   id: 5,
    //   iconName: 'star-rate',
    //   iconType: 'MaterialIcons',
    //   routeName: 'Card',
    // },
    // {
    //   id: 6,
    //   iconName: 'credit-card',
    //   iconType: 'FontAwesome',
    //   routeName: 'card',
    // },
  ];
  // const requestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: 'Run Matter',
  //         message: 'Run Matter needs access to your camera.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // useEffect(() => {
  //   !loading && requestCameraPermission();
  // });
  if (loading) {
    return <Text>Main Screens Loading</Text>;
  } else {
    return (
      <Drawer.Navigator
        initialRouteName="home"
        screenOptions={{ headerShown: false }}
        drawerContent={props => {
          return (
            <CustomDrawer
              navigation={props.navigation}
              routes={routes}
              drawerRoutes={props.state.routeNames}
            />
          );
        }}>
        <Drawer.Screen name="home" component={HomeScreensStack} />
        <Drawer.Screen name="my services" component={AllServices} />

        <Drawer.Screen name="history" component={HistoryScreen} />

        <Drawer.Screen name="account" component={Wallet} />

        <Drawer.Screen name="rate us" component={RateUs} />

        <Drawer.Screen name="profile" component={Profile} />

        <Drawer.Screen name="help" component={Help} />

        <Drawer.Screen name="Map" component={Map} />
        <Drawer.Screen name="card" component={BankCardDetails} />
      </Drawer.Navigator>
    );
  }
}

function mapStateToProps({ user }) {
  return { user }
}
export default connect(mapStateToProps, actions)(MainAppScreens)
const styles = StyleSheet.create({});
