import React, {Component, useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';

const AuthStack = createStackNavigator();

const AuthRootStackScreen = ({navigation}) => (
  <AuthStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="login">
    <AuthStack.Screen
      name="login"
      options={{headerShown: false}}
      component={LoginScreen}
    />
  </AuthStack.Navigator>
);

export default AuthRootStackScreen;
