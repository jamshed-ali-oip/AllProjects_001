import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import LogIn from './LogIn';
import SignUp from './SignUp';
import BankCardDetails from './BankCardDetails';
import Otp from './Otp';
import ForgotPassword from './ForgotPassword';
import ConfirmPassword from './ConfirmPassword';
import HistoryScreen from './HistoryScreen';
import Walkthrough from './Walkthrough';
import AllServices from './AllServices';
import Wallet from './Wallet';
import RateUs from './RateUs';
import Profile from './Profile';
import Map from './Map';
import DocumentDetails from './DocumentDetails';

const Stack = createNativeStackNavigator();

function AuthRootStackScreens() {
  return (
    <Stack.Navigator
      initialRouteName="LogIn"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Walkthrough" component={Walkthrough} />

      <Stack.Screen name="LogIn" component={LogIn} />

      <Stack.Screen name="SignUp" component={SignUp} />
      {/* 
      <Stack.Screen name="BankCardDetails" component={BankCardDetails} />

      <Stack.Screen name="DocumentDetails" component={DocumentDetails} /> */}

      <Stack.Screen name="Otp" component={Otp} />

      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
    </Stack.Navigator>
  );
}

export default AuthRootStackScreens;
