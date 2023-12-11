import React, { Component, useEffect, useState } from "react";
import {Dimensions} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './Screens/Main/MainScreen'
import LoginScreen from './Screens/Login/LoginScreen'
import SignupScreen from './Screens/Signup/SignupScreen'
import ForgotScreen from './Screens/Forgot/ForgotScreen'
function Route(){
    const Stack=createNativeStackNavigator();
    return(
        <NavigationContainer>
            <Stack.Navigator  screenOptions={{headerShown: false}} initialRouteName="main">
                <Stack.Screen 
                    name="main" 
                    options={{headerShown:false}} 
                    component={MainScreen}
                /> 
                <Stack.Screen 
                    name="login" 
                    options={{headerShown:false}} 
                    component={LoginScreen}
                /> 
                <Stack.Screen 
                    name="signup" 
                    options={{headerShown:false}} 
                    component={SignupScreen}
                /> 
                <Stack.Screen 
                    name="forgot" 
                    options={{headerShown:false}} 
                    component={ForgotScreen}
                /> 
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Route