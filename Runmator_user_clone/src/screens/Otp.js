import React from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import background_img from '../assets/backgroung-image.png';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import * as actions from '../store/Actions/index';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import colors from '../assets/colors';
import {connect} from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Otp = ({navigation, userSignup, route}) => {
  const OTP = '0000';
console.log(route?.params)
  // const _onPressSignUp = () => {
  //   // if (cardnumber === '') {
  //   //   alert('All fields required');
  //   // } else {
  //   navigation.navigate('Home');
  //   // }
  // };

  const _onConfirmOtp = code => {
    if (code == OTP) {
      console.log(`Code is ${code}, you are good to go!`);
      // navigation.navigate('home');
      userSignup({
        userData: {
          username:
            route?.params?.username === 'admin' ? 'Michael Reiner' : route?.params?.username,
        },
      });
    } else {
      alert('Invalid OTP!');
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground source={background_img} style={styles.image}>
        <Heading
          title="ENTER OTP CODE"
          passedStyle={styles.heading}
          fontType="extra-bold"
        />

        <View style={styles.inputBoxes}>
          <OTPInputView
            style={{width: '80%', height: height * 0.2}}
            pinCount={4}
            // code={otpCode} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged={code => {
            //   setOtpCode(code)
            // }}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              _onConfirmOtp(code);
            }}
          />
        </View>
        {/* <Button title="Next" onBtnPress={() => _onPressSignUp()} /> */}
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: colors.themeBlue,
    fontSize: width * 0.12,
    paddingHorizontal: width * 0.1,
    textAlign: 'center',
    lineHeight: height * 0.07,
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: width * 0.5,
  },
  image: {
    justifyContent: 'center',
    width: width,
    height: height,
    alignSelf: 'center',
    alignItems: 'center',
  },
  scrollview: {
    height: height,
  },
  inputBoxes: {
    marginTop: height * 0.02,
  },
  // OTP Styles
  underlineStyleBase: {
    width: width * 0.15,
    height: height * 0.08,
    fontSize: width * 0.07,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: width * 0.02,
    color: colors?.themeBlue,
    fontWeight: '500',
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});

export default connect(null, actions)(Otp);
