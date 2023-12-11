import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, StyleSheet, Text, View, SafeAreaView } from 'react-native';
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
import AlertModal from '../components/AlertModal';
import ChangePassword from './ChangePassword';
import CurrentBookings from './CurrentBookings';
import * as actions from "../store/Actions"
import { connect } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch } from 'react-redux';
import { GET_CURRENT_LOC } from "../store/Actions/actionType"
import BankCardDetails from './BankCardDetails';

const Drawer = createDrawerNavigator();

function MainAppScreens({ navigation, UserReducer, saveLocation }) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);


  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const data = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          user_id: UserReducer.userData?.id
        }
        saveLocation(data).then(re => {
          console.log("------------------------", re.data)
          dispatch({
            type: GET_CURRENT_LOC,
            payload: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
          })
        })
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
  }
  const routes = [
    {
      id: 1,
      iconName: 'home',
      iconType: 'Entypo',
      routeName: 'home',
    },
    {
      id: 2,
      iconName: 'history',
      iconType: 'MaterialIcons',
      routeName: 'history',
    },
    // {
    //   id: 3,
    //   iconName: 'wallet',
    //   iconType: 'Entypo',
    //   routeName: 'wallet',
    // },
    {
      id: 4,
      iconName: 'person-circle-sharp',
      iconType: 'Ionicons',
      routeName: 'profile',
    },
    // {
    //   id: 5,
    //   iconName: 'home-repair-service',
    //   iconType: 'MaterialIcons',
    //   routeName: 'current bookings',
    // },
    {
      id: 5,
      iconName: 'onepassword',
      iconType: 'MaterialCommunityIcons',
      routeName: 'change password',
    },
    {
      id: 6,
      iconName: 'help-outline',
      iconType: 'MaterialIcons',
      routeName: 'help',
    },
    // {
    //   id: 7,
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

  // useEffect(() => {
  //   console.log(isErrorModalVisible)
  //   if (UserReducer?.errorModal?.status) {
  //     setIsErrorModalVisible(true);
  //     console.log("ttttttttttttttttttttttt")
  //   }
  //   if (UserReducer?.errorModal?.status === false) {
  //     setIsErrorModalVisible(false);
  //   }
  // }, [UserReducer?.errorModal]);

  if (loading) {
    return <Text>Main Screens Loading</Text>;
  } else {
    return (
      <>
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
          <Drawer.Screen name="history" component={HistoryScreen} />
          <Drawer.Screen name="current bookings" component={CurrentBookings} />
          <Drawer.Screen name="wallet" component={Wallet} />
          <Drawer.Screen name="rate us" component={RateUs} />
          <Drawer.Screen name="help" component={Help} />
          <Drawer.Screen name="profile" component={Profile} />
          <Drawer.Screen name="change password" component={ChangePassword} />
          <Drawer.Screen name="card" component={BankCardDetails} />

        </Drawer.Navigator>
      </>
    );
  }
}

function mapStateToProps({ UserReducer }) {
  return { UserReducer }
}

export default connect(mapStateToProps, actions)(MainAppScreens)
const styles = StyleSheet.create({});
