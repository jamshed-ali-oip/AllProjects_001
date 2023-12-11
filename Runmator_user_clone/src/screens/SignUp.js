import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Button from '../components/Button';
import Inputbox from '../components/Inputbox';
import logo from '../assets/run-matter-logo.png';
import background_img from '../assets/backgroung-image.png';
import Heading from '../components/Heading';
import colors from '../assets/colors';
import * as actions from '../store/Actions/index';
import LottieView from 'lottie-react-native';


import PhoneInput from 'react-native-phone-number-input';
import { useRef } from 'react';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = ({ navigation, UserReducer, userSignup }) => {
  const phoneInput = useRef(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_no, setPhone_no] = useState('');
  const [password, setPassword] = useState('');
  const [referring_email, set_referring_email] = useState('');
  const [c_password, setC_Password] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState('');


  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const _onPressSignUp = () => {
    let Username = username.trim();
    if (
      Username?.length == 0 ||
      email.length === 0 ||
      password.length === 0 ||
      c_password.length === 0 ||
      phone_no.length === 0
    ) {
      Toast.show({ type: 'error', text1: 'All fields required' })
    } else if (/\s/g.test(email)) {
      Toast.show({ type: 'error', text1: 'Please Check Your Fields For Spaces' })
    } else if (!validateEmail(email)) {
      Toast.show({ type: 'error', text1: 'improper email address' })
    }
    else if (!(phone_no.length > 9)) {
      Toast.show({ type: 'error', text1: 'Phone numbers is less than format digits' })
    }
    else if (password?.length < 8 || c_password.length < 8) {
      Toast.show({ type: 'error', text1: 'Passwords must be more than 8 characters.' })
    } else if (password != c_password) {
      Toast.show({ type: 'error', text1: 'Password does not match ' })
    }
    else if (phone_no.length > 20) {
      Toast.show({ type: 'error', text1: 'improper phone no' })
    }
    else {
      // console.log({
      //   email: email,
      //   password: password,
      //   name: username,
      //   role_id: 2,
      //   phone: phone_no,
      //   lat: UserReducer?.coords?.lat,
      //   lng: UserReducer?.coords?.lng,
      // });
      setLoading(true)
      const data = {
        email: email,
        password: password,
        name: username,
        role_id: 2,
        phone: phone_no,
        lat: UserReducer?.coords?.lat,
        lng: UserReducer?.coords?.lng,
        referring_email
      }
      userSignup(data, () => setLoading(false))
      // navigation.navigate('BankCardDetails', {
      //   email: email,
      //   password: password,
      //   name: username,
      //   role_id: 2,
      //   phone: phone_no,
      //   lat: UserReducer?.coords?.lat,
      //   lng: UserReducer?.coords?.lng,
      //   referring_email
      // });
    }
  };
  const _onPresslogin = () => {
    navigation.navigate('LogIn');
  };
  return (
    <SafeAreaView>
      <ImageBackground source={background_img} style={styles.image}>
        {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ height: height * 1.35 }}> */}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image resizeMode='contain' source={logo} style={styles.logo} />

          <View style={styles.inputBoxes}>
            <Inputbox
              value={username}
              setTextValue={setUsername}
              placeHolderColor="grey"
              placeholderTilte="Full Name"
            />
            <Inputbox
              value={email}
              setTextValue={setEmail}
              placeHolderColor="grey"
              placeholderTilte="E-mail Address"
            />

            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="PK"
              layout="first"
              placeholder="Phone"
              containerStyle={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: colors.themeBlue,
                borderRadius: 50,
                color: 'black',
                height: height * 0.0755,
                marginTop: height * 0.002,
                marginBottom: height * 0.025,
              }}
              // flagButtonStyle={{
              //   // backgroundColor: 'red',
              //   width: width * 0.2,
              // }}
              // countryPickerButtonStyle={{
              //   // backgroundColor: 'red',
              //   // paddingRight: 10,
              // }}
              textInputStyle={{
                color: 'black',
                height: height * 0.07,
                paddingVertical: 0,
              }}
              codeTextStyle={{
                color: 'black',
              }}
              textContainerStyle={{
                color: 'black',
                borderRadius: 50,
                // backgroundColor:'blue',
              }}
              onChangeText={text => {
                setValue(text);
              }}
              onChangeFormattedText={text => {
                setPhone_no(text);
              }}
            />
            {/* <Inputbox
                value={referring_email}
                setTextValue={set_referring_email}
                placeHolderColor="grey"
                placeholderTilte="Reference"
              /> */}
            <Inputbox
              value={password}
              setTextValue={setPassword}
              placeholderTilte="Password"
              placeHolderColor="grey"
              isSecure={true}
            />
            <Inputbox
              value={c_password}
              setTextValue={setC_Password}
              placeholderTilte="Confirm Password"
              placeHolderColor="grey"
              isSecure={true}
            />
          </View>
          {loading ? (
            <LottieView
              speed={1}
              style={styles.lottieStyles}
              autoPlay
              colorFilters={'blue'}
              loop
              source={require('../assets/Lottie/loading-blue.json')}
            />
          ) : (
            <Button
              title="Sign up"
              onBtnPress={() => _onPressSignUp()}
              isBgColor={true}
              btnStyle={styles.btnStyle}
              btnTextStyle={styles.btnTextStyle}
            />
          )}

          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 200,
              justifyContent: 'center',
            }}>
            <Heading
              title="Already have an Account?"
              fontType="medium"
              passedStyle={styles.alreadyLabel}
            />
            <TouchableOpacity onPress={() => _onPresslogin()}>
              <Heading
                title="Login"
                fontType="bold"
                passedStyle={styles.loginLabel}
              />
            </TouchableOpacity>
          </View>

          {/* <View style={styles.horizontalLinePosi  tion}>
          <View style={styles.horizontalLine} />
          <View>
            <Text style={{width: 30, textAlign: 'center'}}>Or</Text>
          </View>
          <View style={styles.horizontalLine} />
        </View> */}
          {/* <View style={{position: 'relative'}}>
          <Button
            title="Sign Up Now"
            onBtnPress={() => _onPressSignUp()}
            isBgColor={false}
          />
        </View> */}
        </View>
        {/* </ScrollView> */}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputBoxStyles: {
    margin: 0,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.themeBlue,
  },
  lottieStyles: {
    height: height * 0.12,
    width: 100,
  },
  alreadyLabel: {
    fontSize: width * 0.034,
    color: 'rgba(0,0,0,.8)',
  },
  btnStyle: {
    backgroundColor: colors.themeBlue,
    borderRadius: width * 0.8,
    width: width * 0.8,
  },
  btnTextStyle: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
  loginLabel: {
    fontSize: width * 0.034,
    color: colors.themeBlue,
    paddingLeft: width * 0.015,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: width * 0.5,
  },

  logo: {
    margin: 15,
    width: width * 0.4,
    height: height * 0.12,
    marginTop: height * 0.16,
  },

  image: {
    // flex: 1,
    // resizeMode: 'stretch',
    justifyContent: 'center',
    width: width,
    height: height,
    // backgroundColor:'red',
    alignSelf: 'center',
    alignItems: 'center',
  },
  scrollview: {
    height: height,
  },
  inputBoxes: {
    marginTop: height * 0.02,
  },
});

const mapStateToProps = ({ UserReducer }) => {
  return { UserReducer };
};
export default connect(mapStateToProps, actions)(SignUp);
