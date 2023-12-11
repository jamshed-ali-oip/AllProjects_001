import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView} from "react-native"
import store from './src/store/index';
import MainNavigator from './src/screens/MainNavigator';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';

export default function App() {

  useEffect(()=>{
    SplashScreen.hide();
  }, [])

  return (
    <Provider store={store}>
       <SafeAreaView style={{flex:1}}>
       <MainNavigator />
        <Toast/>
       </SafeAreaView>
    </Provider>
  );
}
