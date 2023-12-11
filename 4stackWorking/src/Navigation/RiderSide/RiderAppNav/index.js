import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../../Screens/Rider/RiderAfterLogins/HomeScreen';
const RiderAppNav = () => {
  const Stack = createNativeStackNavigator();



 
  return (
    // stackbnavigationcodeher
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  )
}


export default RiderAppNav

