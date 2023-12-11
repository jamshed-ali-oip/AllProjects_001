import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MessageIcon from '../../Components/MessageIcon';
import MessageIcon1 from '../../Components/MessageIcon1';
import Test from './Test';
import Connections from './Connections';
import ProfileScreen from '../NearMe/ProfileScreen';
import { themeRed } from '../../Assets/Colors/Colors';

const ConnectionStack = ({navigation}) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="connections">
      <Stack.Screen
        name="connections"
        options={({route}) => ({
          headerStyle: {
            borderBottomColor: 'grey',
            borderBottomWidth: 0.7,
            backgroundColor:themeRed,
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
              Connections
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
        component={Connections}
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
          headerRight: () => <MessageIcon1 navigation={navigation} />,
        })}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default ConnectionStack;
