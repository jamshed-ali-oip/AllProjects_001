import React, {Component, useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BmadScreen from './BmadScreen';
import MessageIcon from '../../Components/MessageIcon';
import DetailScreen from './DetailScreen.js';
import Icon from 'react-native-vector-icons/Ionicons';

function BmadStack({navigation}) {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="bmad">
        <Stack.Screen
          name="bmad"
          options={({route}) => ({
            headerStyle: {
              borderBottomColor: 'grey',
              borderBottomWidth: 0.7,
              height: 110,
            },
            headerStatusBarHeight: 32,
            headerTitle: props => (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                {"Places"}
              </Text>
            ),
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{}}>
                <View style={{padding: 10, top: 0}}>
                  <Image
                    resizeMode="contain"
                    style={{height: 25, width: 25}}
                    source={require('./../../Assets/Images/menu.png')}
                  />
                </View>
              </TouchableOpacity>
            ),
            headerRight: () => <MessageIcon navigation={navigation} />,
          })}
          component={BmadScreen}
        />
        <Stack.Screen
          name="detail"
          options={({navigation, route}) => ({
            headerStyle: {
              borderBottomColor: 'grey',
              borderBottomWidth: 0.7,
              height: 110,
            },
            headerStatusBarHeight: 32,
            headerTitle: props => null,
            headerTransparent: true,
            headerLeft: () => (
              <View style={{left: 20}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="arrow-back" size={25} color="white" />
                </TouchableOpacity>
              </View>
            ),
            headerRight: () => null,
          })}
          component={DetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default BmadStack;
