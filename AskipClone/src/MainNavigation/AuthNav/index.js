import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import AuthScreens from '../../screens/AuthScreens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Selectscreen from '../../screens/AuthScreens/selectscreen';
import Forget from '../../screens/AuthScreens/Forget';
const Stack = createNativeStackNavigator();
const AuthNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Selectscreen">

      <Stack.Screen name="Selectscreen" component={Selectscreen} />
      <Stack.Screen name="Forget" component={Forget} />

    </Stack.Navigator>
  );
};
export default AuthNav;
