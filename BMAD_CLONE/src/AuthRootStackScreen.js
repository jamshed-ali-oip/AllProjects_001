import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './Screens/Main/MainScreen';
import LoginScreen from './Screens/Login/LoginScreen';
import FavoriteDScreen from './Screens/Signup/FavoriteDScreen';
import SignupScreen from './Screens/Signup/SignupScreen';
import InterestScreen from './Screens/Signup/InterestScreen';
import ForgotScreen from './Screens/Forgot/ForgotScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import * as actions from './Store/Actions';
import {NavigationContainer} from '@react-navigation/native';
import {themeRed} from './Assets/Colors/Colors';
import {showMessage} from 'react-native-flash-message';
import VerifyForgotPasswordCode from './Screens/Forgot/VerifyForgotPasswordCode';
import ResetPassword from './Screens/Forgot/ResetPassword';
const AuthStack = createNativeStackNavigator();
const {width, height} = Dimensions.get('window');

const SignUpFunction = (userSignup, userFavourite, userInterest, SignupAll) => {
  SignupAll(userSignup, userFavourite, userInterest);
  // console.log(userSignup,userFavourite,userInterest, "-----")
};

const AuthRootStackScreen = ({
  navigation,
  userSignup,
  userFavourite,
  userInterest,
  SignupAll,
}) => {

  return (
    <AuthStack.Navigator
      headerMode="float"
      screenOptions={{gestureEnabled: 'true', headerShown: true}}
      initialRouteName="main">
      <AuthStack.Screen
        name="main"
        options={{headerShown: false}}
        component={MainScreen}
      />
      <AuthStack.Screen
        name="login"
        options={{headerShown: false}}
        component={LoginScreen}
      />
      <AuthStack.Screen
        name="forgot"
        options={{headerShown: false}}
        component={ForgotScreen}
      />
      <AuthStack.Screen
        name="verifyForgot"
        options={{headerShown: false}}
        component={VerifyForgotPasswordCode}
      />
      <AuthStack.Screen
        name="resetPassword"
        options={{headerShown: false}}
        component={ResetPassword}
      />
      <AuthStack.Screen
        name="signup"
        options={({navigation, route}) => ({
          headerTitle: props => null,
          headerTransparent: true,
          headerLeft: () => null,
        })}
        component={SignupScreen}
      />
      <AuthStack.Screen
        name="YourInterests"
        options={({navigation, route}) => ({
          headerTitle: props => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: width * 0.05,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Your Interests
            </Text>
          ),
          headerTransparent: false,
          headerLeft: () => (
            <View
              // onPress={() => navigation.goBack()}
              style={styles.leftIconStyle}>
              {/* <Icon name="arrow-back" size={width * 0.07} color="#B01125" /> */}
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // console.log(userInterest?.length);
                if (userInterest == undefined || userInterest?.length == 0) {
                  showMessage({
                    message: 'Please select atleast one interest!',
                    type: 'danger',
                  });
                  return;
                }
                navigation.navigate('FavoriteDrinks');
              }}
              style={styles.rightIconStyle}>
              <Image
                resizeMode="contain"
                source={require('./Assets/Images/Check.png')}
                style={{
                  width: width * 0.08,
                  height: height * 0.04,
                }}
              />
            </TouchableOpacity>
          ),
        })}
        component={InterestScreen}
      />
      <AuthStack.Screen
        name="FavoriteDrinks"
        options={({navigation, route}) => ({
          headerTitle: props => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: width * 0.05,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Favorite Drinks
            </Text>
          ),
          headerTransparent: false,
          headerLeft: () => (
            <View
              // onPress={() => navigation.goBack()}
              style={styles.leftIconStyle}>
              {/* <Icon name="arrow-back" size={width * 0.07} color="#B01125" /> */}
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              // onPress={() =>
              //   SignUpFunction(userSignup, userFavourite, userInterest, SignupAll)
              // }
              style={styles.rightIconStyle}>
              {/* <Image
              resizeMode="contain"
              source={require('./Assets/Images/Check.png')}
              style={{
                width: width * 0.08,
                height: height * 0.04,
              }}
            /> */}
            </TouchableOpacity>
          ),
        })}
        component={FavoriteDScreen}
      />
    </AuthStack.Navigator>
  );
};

const mapStatetoProps = ({userSignup, userFavourite, userInterest}) => {
  return {userSignup, userFavourite, userInterest};
};
export default connect(mapStatetoProps, actions)(AuthRootStackScreen);

const styles = StyleSheet.create({
  leftIconStyle: {
    width: width * 0.1,
    height: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    marginLeft: width * 0.05,
  },
  rightIconStyle: {
    width: width * 0.1,
    height: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    marginRight: width * 0.05,
  },
});
