import React, {useEffect} from 'react';
import Main from './Main';
import {Provider, connect, useDispatch} from 'react-redux';
import {
  Text,
  PermissionsAndroid,
  StyleSheet,
  Platform,
  BackHandler,
} from 'react-native';
import {store, persistor} from './Store/index';
import messaging from '@react-native-firebase/messaging';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
// import Geolocation from '@react-native-community/geolocation';
import SampleTesting from './Screens/testing';
const App = () => {

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const remote = await messaging().registerDeviceForRemoteMessages();
    // console.log(remote, 'await messaging().registerDeviceForRemoteMessages();');
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    requestUserPermission();
  }, []);


  useEffect(() => {
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
        } else {
          BackHandler.exitApp();
        }
      } catch (err) {
        console.warn(err);
      }
    }
    requestLocationPermission();
  }, []);
  // useEffect(() => {
  //   const requestLocationPermission = async () => {
  //     if (Platform.OS === 'ios') {
  //       getOneTimeLocation();
  //       subscribeLocationLocation();
  //     } else {
  //       try {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //           {
  //             title: 'Location Access Required',
  //             message: 'This App needs to Access your location',
  //           },
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           //To Check, If Permission is granted
  //           getOneTimeLocation();
  //         } else {
  //           console.log('Permission Denied');
  //           BackHandler.exitApp();
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   };
  //   requestLocationPermission();
  //   return () => {
  //     Geolocation.clearWatch(watchID);
  //   };
  // }, []);

  // const getOneTimeLocation = () => {
  //   console.log('Getting Location ...');
  //   Geolocation.getCurrentPosition(
  //     //Will give you the current location
  //     position => {
  //       // setLocationStatus('You are Here');
  //       // dispatch(coords(position.coords.latitude, position.coords.longitude));
  //     },
  //     error => {
  //       console.log(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       timeout: 30000,
  //       maximumAge: 1000,
  //     },
  //   );
  // };

  // const subscribeLocationLocation = () => {
  //   watchID = Geolocation.watchPosition(
  //     position => {
  //       // setLocationStatus('You are Here');
  //       console.log(position, 'APP.js watchPosition');
  //     },
  //     error => {
  //       console.log(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       maximumAge: 1000,
  //     },
  //   );
  // };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
        <FlashMessage
          position="top"
          statusBarHeight="10"
          style={styles.flashMessage}
        />
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  flashMessage: {
    position: 'absolute',
    zIndex: 9999,
    borderRadius: 12,
    top: 30,
    width: '96%',
    alignSelf: 'center',
    marginTop: 20,
  },
});
export default App;
