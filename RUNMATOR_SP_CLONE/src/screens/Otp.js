import React from 'react';
import Heading from '../components/Heading';
import background_img from '../assets/backgroung-image.png';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import * as actions from '../store/Actions/index';

import {StyleSheet, View, Dimensions, ImageBackground} from 'react-native';
import colors from '../assets/colors';
import { user_login } from '../store/Actions';
import { connect } from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Otp = ({navigation, user_sign_up, route}) => {
  const OTP = '0000';
console.log(route.params)
  const _onConfirmOtp = code => {
    if (code == OTP) {
      console.log(`Code is ${code}, you are good to go!`);
      // user_login({email: 'test@test.com', password: 'admin'}).then(() => {
      //   console.log('work');
      // });
      user_sign_up({
        userData: {
          displayName:
            route?.params?.username === 'admin' ? 'Michael Reiner' : route?.params?.username,
        },
      });
    } else {
      alert('Invalid OTP!');
    }
  };
  return (
    <ImageBackground
      resizeMode="cover"
      source={background_img}
      style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Heading
          title="ENTER OTP CODE"
          passedStyle={styles.heading}
          fontType="extra-bold"
        />

        <OTPInputView
          style={{
            width: '90%',
            height: height * 0.2,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
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
        {/* </View> */}
        {/* <Button title="Next" onBtnPress={() => _onPressSignUp()} /> */}
      </View>
    </ImageBackground>
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
    // justifyContent: 'center',
    // width: width,
    // height: height,
    // // flex:1,
    // alignSelf: 'center',
    // alignItems: 'center',
  },
  scrollview: {
    height: height,
  },
  inputBoxes: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: height * 0.02,
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

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(Otp);
