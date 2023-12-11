import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  BackHandler,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AuthRootStackScreens from './AuthRootStackScreens';
import MainAppScreens from './MainAppScreens';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import AlertModal from '../components/AlertModal';
import * as actions from '../store/Actions/index';


const MainNavigator = ({UserReducer, setErrorModal, getCurrentLocation}) => {
  const [token, setToken] = useState(UserReducer?.accessToken);
  const [loading, setLoading] = useState(false);
  const [granted, setGranted] = useState(false);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      messaging()
        .subscribeToTopic(UserReducer?.userData?.id+"c")
        .then(() => console.log('Subscribed to topic!',UserReducer?.userData?.id+"c"));
      const token = await messaging().getToken()
      console.log(token,"tjoekn")
    }
  }

  useEffect(() => {
     requestUserPermission()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        channelId: "channel-id",
        channelName: "My channel",
        message:remoteMessage.notification.body,
        playSound:true,
        title:remoteMessage.notification.title,
        priority:'high',
        soundName:'default',
        
      })
    });
    return unsubscribe;
  }, [UserReducer]);

  useEffect(() => {
    if (granted) {
      getCurrentLocation();
    }
  }, [granted]);

  useEffect(() => {
    async function requestLocationPermission() {
      try {
        const platformCheck = Platform.OS;
        if (platformCheck != 'ios') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setGranted(granted);
          } else {
            BackHandler.exitApp();
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
    requestLocationPermission();
  }, []);

  if (loading) {
    return <Text>Loading</Text>;
  } else {
    return (
      <>
        <NavigationContainer>
          {UserReducer?.isUserLogin ? (
            // token != null || token != undefined
            <MainAppScreens />
          ) : (
            <AuthRootStackScreens />
          )}
        </NavigationContainer>
        {UserReducer?.errorModal?.status && (
          <AlertModal
            onPress={() => {
              if (UserReducer?.errorModal?.onPress) {
                UserReducer?.errorModal?.onPress();
              }
              setErrorModal();
            }}
            title={UserReducer?.errorModal?.title}
            message={UserReducer?.errorModal?.msg}
            isModalVisible={UserReducer?.errorModal?.status}
          />
        )}
      </>
    );
  }
};

// export default MainNavigator;
const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(MainNavigator);
