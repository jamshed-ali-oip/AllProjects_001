import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../../../Screens/User/UserAuthScreens/Login';

const UserAuthNav = () => {
  const Stack = createNativeStackNavigator();



 
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


export default UserAuthNav

