import React, {Component, useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Ionicons';
import AddCardStepOne from './AddCardStepOne';
import AddCardStepTwo from './AddCardStepTwo';
import AddCardStepThree from './AddCardStepThree';

export const CreditCards = ({navigation}) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="stepOne">
      <Stack.Screen
        name="stepOne"
        options={({route}) => ({
          headerStatusBarHeight: 32,
          headerTitle: props => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Add Credit Card
            </Text>
          ),
          headerTransparent: false,
          headerLeft: () => (
            <View style={{left: 20}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={25} color="#B01125" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{right: 20}}>
              <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                <Icon name="close" size={25} color="#B01125" />
              </TouchableOpacity>
            </View>
          ),
        })}
        component={AddCardStepOne}
      />
      <Stack.Screen
        name="stepTwo"
        // options={{headerShown: true}}
        options={({route}) => ({
            headerShown:true,
          headerStatusBarHeight: 32,
          headerTitle: props => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Add Credit Card
            </Text>
          ),
          headerTransparent: false,
          headerLeft: () => (
            <View style={{left: 20}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={25} color="#B01125" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{right: 20}}>
              <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                <Icon name="close" size={25} color="#B01125" />
              </TouchableOpacity>
            </View>
          ),
        })}
        component={AddCardStepTwo}
      />
      <Stack.Screen
        name="stepThree"
        options={({route}) => ({
          headerStatusBarHeight: 32,
          headerTitle: props => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Select Card
            </Text>
          ),
          headerTransparent: false,
          headerLeft: () => (
            <View style={{left: 20}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={25} color="#B01125" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View style={{right: 20}}>
              <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                <Icon name="close" size={25} color="#B01125" />
              </TouchableOpacity>
            </View>
          ),
        })}
        component={AddCardStepThree}
      />
    </Stack.Navigator>
  );
};
