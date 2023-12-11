import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../../Screens/Auth/Login';
import LandingPage from '../../Screens/Auth/LandingPage';
import SignUp from '../../Screens/Auth/SignUp';
import ForgetPass from '../../Screens/Auth/ForgetPass';
import Ottp from '../../Screens/Auth/Ottp';
import NewPass from '../../Screens/Auth/NewPass';
import PhoneScreen from '../../Screens/Auth/PhoneScreen';
import OttpSignup from '../../Screens/Auth/OttpSignup';
import PersonalDetail from '../../Screens/Auth/PersonalDetail';
import Scanner from '../../Screens/Auth/Scanner';
import Information from '../../Screens/Auth/Information';
import Agreement from '../../Screens/Auth/Agreement';
import VehicleInfo from '../../Screens/Auth/VehicleInfo';

const AuthNav = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();



  return (
    // stackbnavigationcodeher
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    // initialRouteName="Vehicle"
    >
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgetPass" component={ForgetPass} />
      <Stack.Screen name="Ottp" component={Ottp} />
      <Stack.Screen name="NewPass" component={NewPass} />
      <Stack.Screen name="PhoneScreen" component={PhoneScreen} />
      <Stack.Screen name="PersonalDetail" component={PersonalDetail} />
      <Stack.Screen name="OttpSignup" component={OttpSignup} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="Information" component={Information} />
      <Stack.Screen name="Agreement" component={Agreement} />
      {/* <Stack.Screen name="Vehicle" component={Vehicle} /> */}
      <Stack.Screen name="VehicleInfo" component={VehicleInfo} />
    </Stack.Navigator>
  )
}


export default AuthNav

