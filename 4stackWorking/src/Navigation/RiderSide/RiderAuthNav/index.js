import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../../../Screens/Rider/RiderAuthScreens/Login';

const RiderAuthNav = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();


 
  return (
    // stackbnavigationcodeher
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}


export default RiderAuthNav

