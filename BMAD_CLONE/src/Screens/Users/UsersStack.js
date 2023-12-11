import React, { Component, useEffect, useState } from "react";
import {Dimensions,TouchableOpacity,Text,View,Image} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MessageIcon from "../../Components/MessageIcon";
import UserMap from './UserMap.js'
import Icon from 'react-native-vector-icons/Ionicons';
function UserStack({navigation}){
    const Stack=createNativeStackNavigator();
    return(
   
            <Stack.Navigator initialRouteName="userMap">
                <Stack.Screen 
                    name="userMap" 
                    options={({  route }) => ({
                        headerStyle: { borderBottomColor: 'grey', borderBottomWidth: 0.7, height: 110 },
                        headerStatusBarHeight: 32,
                        headerTitle: props => null,
                        headerTransparent: true,
                        headerLeft: ()=>      <TouchableOpacity onPress={()=> navigation.openDrawer()} style={{}}>
                                                    <View style={{padding:10, top: 0}}>
                                                        <Image resizeMode="contain" style={{height: 25, width: 25}} source={require('./../../Assets/Images/menu.png')} />
                                                    </View>
                                              </TouchableOpacity>,
                        headerRight: ()=>   <MessageIcon navigation={navigation} /> 
                                 })}
                    component={UserMap}
                />  
                
            </Stack.Navigator>
    
    )
}

export default UserStack