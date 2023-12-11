import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from './../../Components/AppText';
import SplashScreen from 'react-native-splash-screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const OutOfDrink = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ImageBackground
      source={require('./../../Assets/Images/D/Bg.png')}
      style={styles.container}>
      <LinearGradient
        start={{x: -1, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#B01125', '#CC4E50']}
        style={styles.innerContainer}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 180,
              height: 180,
            }}
            resizeMethod="auto"
            resizeMode="contain"
            source={require('./../../Assets/Images/drinks.png')}
          />
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'column',
              width: '70%',
              padding: 20,
            }}>
            <AppText
              nol={5}
              textAlign="center"
              family="Poppins-SemiBoldItalic"
              size={hp('3.5%')}
              color="white"
              Label={'Ooops!'}
            />
            <AppText
              nol={5}
              textAlign="center"
              family="Poppins-SemiBoldItalic"
              size={hp('3.5%')}
              color="white"
              Label={"You've run out of Drinks"}
            />
            <AppText
              nol={5}
              textAlign="center"
              family="Poppins-Regular"
              size={hp('2%')}
              color="white"
              Label={'Buy drinks now...'}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <TouchableOpacity
                // onPress={() => navigation.navigate('cards')}
                // onPress={() => {navigation.navigate("nearme")}}
                style={styles.touchableOpacity}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-Regular"
                  size={hp('2.5%')}
                  color="white"
                  Label={'Proceed to Buy'}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <TouchableOpacity
                onPress={() => {navigation.navigate("nearme")}}
                style={styles.touchableOpacity}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-Regular"
                  size={hp('2.5%')}
                  color="white"
                  Label={"I've Changed My Mind"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};
export default OutOfDrink;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'white',
    width: wp('80%'),
    height: hp('70%'),
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
  },
  touchableOpacity: {
    // backgroundColor: 'transprenet',
    borderWidth: 0,
    borderColor: 'white',
    width: wp('70%'),
    height: hp('7%'),
    justifyContent: 'center',
    borderRadius: 35,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  touchableOpacityText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: hp('2'),
    textAlign: 'center',
  },
});
