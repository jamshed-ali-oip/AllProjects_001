import React, {Component, useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Ionicons';
import AddCardStepOne from './AddCard/AddCardStepOne';
import AddCardStepTwo from './AddCard/AddCardStepTwo';
import AddCardStepThree from './AddCard/AddCardStepThree';
import OfferADrink from './OfferADrink';
import OutOfDrink from './OutOfDrink';
import ProceedToPay from './ProceedToPay';
export function OfferStack({navigation}) {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="offerADrink">
        <Stack.Screen
          name="offerADrink"
          options={{headerShown: false}}
          component={OfferADrink}
        />
        <Stack.Screen name="proceedToPay" options={{headerShown: false}}>
          {props => <ProceedToPay {...props} navigation={navigation} />}
        </Stack.Screen>
        {/* <Stack.Screen 
                    name="proceedToPay" 
                    options={{headerShown:false}} 
                    component={ProceedToPay}
                />  */}
        {/* <Stack.Screen 
                    name="outOfDrink" 
                    options={{headerShown:false}} 
                    component={OutOfDrink}
                />  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function OutOfStack({navigation}) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
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
              <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Icon name="close" size={25} color="#B01125" />
              </TouchableOpacity>
            </View>
          ),
        })}
        component={AddCardStepOne}
      />
      <Stack.Screen
        name="outOfDrink"
        options={{headerShown: false}}
        component={OutOfDrink}
      />
      <Stack.Screen
        name="stepTwo"
        // options={{headerShown: true}}
        options={({route}) => ({
          headerShown: true,
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
              <TouchableOpacity onPress={() => navigation.navigate('home')}>
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
              <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Icon name="close" size={25} color="#B01125" />
              </TouchableOpacity>
            </View>
          ),
        })}
        component={AddCardStepThree}
      />
    </Stack.Navigator>
  );
}

// export default OfferStack
