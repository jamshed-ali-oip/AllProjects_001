import React, {Component, useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, Text, View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NotificationScreen from './NotificationScreen';
import PostScreen from './PostScreen';import Icon from 'react-native-vector-icons/Ionicons';
import MessageIcon from '../../Components/MessageIcon';
import {themeRed} from '../../Assets/Colors/Colors';
function NotificationStack({navigation}) {
  const Stack = createNativeStackNavigator();
  return (
    // <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="notification">
      <Stack.Screen
        name="notification"
        options={({route}) => ({
          headerBackVisible: false,
          headerStyle: {
            borderBottomColor: 'grey',
            borderBottomWidth: 0.7,
            backgroundColor: themeRed,
            height: 110,
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
              Notifications
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
        component={NotificationScreen}
      />
      <Stack.Screen
        name="post"
        options={({route}) => ({
          headerBackVisible: false,
          headerStyle: {
            borderBottomColor: 'grey',
            borderBottomWidth: 0.7,
            height: 110,
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
                left: 30
              }}>
              Post
            </Text>
          ),
          headerTransparent: false,
          headerLeft: () => (
            <View style={{left: 0}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('notification', {
                    screen: 'notification',
                    initial: false,
                  })
                }>
                <Icon name="arrow-back" size={25} color="white" />
              </TouchableOpacity>
            </View>
          ),
          // headerLeft: () => (
          //   <TouchableOpacity
          //     onPress={() => navigation.openDrawer()}
          //     style={{}}>
          //     <View style={{padding: 10, top: 3}}>
          //       <Image
          //         resizeMode="contain"
          //         style={{height: 25, width: 25}}
          //         source={require('./../../Assets/Images/menu1.png')}
          //       />
          //     </View>
          //   </TouchableOpacity>
          // ),
          headerRight: () => <MessageIcon navigation={navigation} />,
        })}
        component={PostScreen}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default NotificationStack;
