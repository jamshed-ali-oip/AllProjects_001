import React, {Component, useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NewPostScreen from './NewPostScreen';
import MessageIcon from '../../Components/MessageIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import {themeRed} from '../../Assets/Colors/Colors';

const NewPostStack = ({navigation}) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="newpost">
      <Stack.Screen
        name="newpost"
        options={({route}) => ({
          headerStyle: {height: 110, backgroundColor: themeRed},
          headerStatusBarHeight: 32,
          headerTitle: props => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: 'white',
                fontFamily: 'Poppins-SemiBold',
              }}>
              New Post
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
        component={NewPostScreen}
      />
    </Stack.Navigator>
  );
};

export default NewPostStack;
