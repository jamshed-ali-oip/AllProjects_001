import React, {Component, useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatStack from '../Chat/ChatStack';
import NearMeScreen from './NearMeScreen';
import MessageIcon from '../../Components/MessageIcon';
import MessageIcon1 from './../../Components/MessageIcon1';
import OfferADrink from './../Offer/OfferADrink';
import OutOfDrink from './../Offer/OutOfDrink';
import ProfileScreen from './ProfileScreen';
import { themeRed } from '../../Assets/Colors/Colors';

function NearMeStack({navigation}) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="nearme">
      <Stack.Screen
        name="nearme"
        options={({route}) => ({
          headerStyle: {
            borderBottomColor: 'grey',
            borderBottomWidth: 0.7,
            height: 110,
            backgroundColor:themeRed
          },
          headerBackVisible: false,
          headerStatusBarHeight: 32,
          headerTitle: props => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: 'white',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Nearby People
            </Text>
          ),
          headerTransparent: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{}}>
              <View style={{padding: 10, top: 0}}>
                <Image
                  resizeMode="contain"
                  style={{height: 25, width: 25}}
                  source={require('./../../Assets/Images/menu1.png')}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => <MessageIcon navigation={navigation} />,
        })}
        component={NearMeScreen}
      />

      <Stack.Screen
        name="profile"
        options={({route}) => ({
          headerBackVisible: false,
          headerStyle: {
            borderBottomColor: themeRed,
            borderBottomWidth: 2,
            backgroundColor: themeRed,
          },
          headerStatusBarHeight: 32,
          headerTitle: props => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: 'white',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Profile
            </Text>
          ),
          headerTransparent: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{}}>
              <View style={{padding: 10, top: 0}}>
                <Image
                  resizeMode="contain"
                  style={{height: 25, width: 25}}
                  source={require('./../../Assets/Images/menu1.png')}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => null
        })}
        component={ProfileScreen}
      />
      <Stack.Screen
        name="OfferADrink"
        options={{headerShown: false}}
        component={OfferADrink}
      />
      <Stack.Screen
        name="outOfDrink"
        options={{headerShown: false}}
        component={OutOfDrink}
      />
        {/* <Stack.Screen
        name="chat"
        options={{headerShown: false}}
        component={ChatStack}
      /> */}
      {/* {props => <ProfileScreen {...props} navigation={navigation} />}
                </Stack.Screen> */}
    </Stack.Navigator>
  );
}

export default NearMeStack;
