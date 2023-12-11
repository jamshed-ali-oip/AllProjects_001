import React, {useState, useEffect} from 'react';
import AuthStack from './AuthStack';
import {connect} from 'react-redux';
import {PermissionsAndroid, Platform, BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';

const MainNavigator = ({UserReducer}) => {
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
    Platform.OS === 'android' && requestLocationPermission();
  }, []);
  return (
    <>
      <NavigationContainer>
        {UserReducer?.accessToken ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

const mapStatetoProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStatetoProps, null)(MainNavigator);
