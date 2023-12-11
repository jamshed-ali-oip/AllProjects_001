import React from "react";
import Login from "../../Screens/Login"
import {View,Text} from "react-native"
import FrontScreen from "../../Screens/FrontScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Selectscreen from "../../Screens/selectscreen";
import Signupscreen from "../../Screens/Signupscreen";
import Forget from "../../Screens/forget";
import Confirmpas from "../../Screens/confirmpas";
import CreateAcount from "../../Screens/CreateAcount";
import Resenscode from "../../Screens/Resenscode";
import Contactus from "../../Screens/Contactus";
const Stack = createNativeStackNavigator();
const AuthNav = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="FrontScreen">
            <Stack.Screen name="FrontScreen" component={FrontScreen} />
            <Stack.Screen name="selectscreen" component={Selectscreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signupscreen" component={Signupscreen} />
            <Stack.Screen name="forget" component={Forget} />
            <Stack.Screen name="confirmpas" component={Confirmpas} />
            <Stack.Screen name="CreateAcount" component={CreateAcount} />
            <Stack.Screen name="Resenscode" component={Resenscode} />
            <Stack.Screen name="Contactus" component={Contactus} />


            
           
        </Stack.Navigator>
    )}
    export default AuthNav