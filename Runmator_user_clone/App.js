import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/index';
import {PersistGate} from 'redux-persist/lib/integration/react';
import MainNavigator from './src/screens/MainNavigator';
import SplashScreen from 'react-native-splash-screen';
import TestMap from './src/screens/TestMap';
import {SafeAreaView} from "react-native"
import Toast from 'react-native-toast-message';

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

 

  return (
    // <TestMap />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{flex:1}}>
        <MainNavigator />
        <Toast />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}
