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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CommonActions} from '@react-navigation/native';

const ProceedToPay = ({navigation}) => {
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
          <View
            style={{
              borderWidth: 15,
              borderRadius: 100,
              borderColor: '#CC4E50',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('OutOfDrink')}>
              <Image
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 100,
                  borderWidth: 15,
                  borderColor: '#D96566',
                }}
                resizeMethod="auto"
                source={require('./../../Assets/Images/near1.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'column',
              width: '90%',
              padding: 20,
            }}>
            <AppText
              nol={5}
              textAlign="center"
              family="Poppins-Regular"
              size={hp('3.5%')}
              color="white"
              Label={'Congratulations'}
            />
            <AppText
              nol={5}
              textAlign="center"
              family="Poppins-Regular"
              size={hp('2%')}
              color="white"
              Label={'Your drink offer for has been sent to your drink buddy.'}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('nearme');
                  // navigation.goBack()
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{name: 'home'}],
                    }),
                  );
                }}
                style={styles.touchableOpacity}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-Regular"
                  size={hp('2.5%')}
                  color="white"
                  Label={'Done'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};
export default ProceedToPay;

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
    width: wp('60%'),
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
