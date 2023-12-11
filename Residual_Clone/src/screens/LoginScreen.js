import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Platform,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import * as actions from '../store/Actions/index';
import { showMessage, hideMessage } from 'react-native-flash-message';
import LottieView from 'lottie-react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { themePurple } from '../assets/colors/colors';

const image = require('../assets/images/login_bg.png');
const logo = require('../assets/images/logo.png');

const { height, width } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

// const Login = ({ navigation }) => {
const Login = ({ navigation, userLogin }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [userChange, setUserChange] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);



  console.log("aaaaaaaaa")
  const _onPressLogin = async () => {
    if (userChange.length == 0 || password.length == 0) {
      showMessage({
        message: 'Fields Left Empty',
        description: 'Enter both fields.',
        error: 'danger',
      });
      return;
    }
    setLoading(true);
    await userLogin(userChange, password, _onLoginFailed);
  };

  const _onLoginFailed = () => {
    setLoading(false);
  };
  return (
    <ImageBackground source={image} resizeMode="cover" style={style.login_bg}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {Platform.OS == 'android' && (
            <View
              style={{ height: STATUS_BAR_HEIGHT, backgroundColor: themePurple }}>
              <StatusBar
                translucent
                backgroundColor={themePurple}
                barStyle="light-content"
              />
            </View>
          )}

          <Image
            style={{
              alignSelf: 'center',
              marginTop: height * 0.15,
              marginBottom: height * 0.12,
            }}
            source={logo}
            resizeMode="contain"
          />

          <View style={style.login_detail}>
            <Text style={style.login_text}>Login</Text>
            <Text style={style.welcome_text}>Welcome Back!</Text>
            <View style={style.form_field}>
              <Icon name="user-circle" color="#A557F2" style={style.icon} />
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#565B66"
                  style={[style.inputfield, { marginBottom: width * 0.04 }]}
                  onChangeText={e => {
                    if (e == ' ') {
                      return;
                    }
                    setUserChange(e);
                  }}
                  value={userChange}
                />
              </TouchableWithoutFeedback>
            </View>

            <View style={style.form_field}>
              <Icon name="lock" color="#A557F2" style={style.icon} />
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#565B66"
                  style={{
                    backgroundColor: 'white',
                    width: width * 0.8,
                    borderRadius: 10,
                    paddingLeft: 50,
                    height: height * 0.065,
                  }}
                  value={password}
                  onChangeText={e => {
                    if (e == ' ') {
                      return;
                    }
                    setPassword(e);
                  }}
                  secureTextEntry={showPassword}
                />
              </TouchableWithoutFeedback>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: width * 0.001,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: width * 0.1,
                  height: height * 0.065,
                }}
                onPress={() => {
                  setShowPassword(!showPassword);
                }}>
                <Icon
                  name={showPassword ? 'eye-slash' : 'eye'}
                  color="#ABACB3"
                  style={style.icon2}
                />
              </TouchableOpacity>
            </View>

            {loading ? (
              <View style={{ marginTop: height * 0.055 }}>
                {/* <LinearGradient
                  colors={['purple', '#9B72F2', '#05F0FF']}
                  style={style.button}
                  start={{ y: 0.0, x: -0.05 }}
                  angleCenter={{ x: 5, y: 0 }}
                  end={{ y: 0.0, x: 1.2 }}>
                  <Text style={style.loggingIn}>Authorizing..</Text>
                </LinearGradient> */}
                <LinearGradient

                  colors={['#74B5E8', '#9974F2', '#E43DEC']}
                  style={style.button}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  locations={[0, 0.7, 0.9]}
                >
                  <Text style={style.button_text}>Authorizing..</Text>
                </LinearGradient>

              </View>
            ) : (
              <TouchableOpacity
                style={{ marginTop: height * 0.055 }}
                onPress={() => _onPressLogin()}>
                {/* <LinearGradient
                colors={['#7124BC', '#437AD8', '#05F0FF']}
                style={style.button}
                start={{y: 0.0, x: -0.05}}
                angleCenter={{x: 5, y: 0}}
                end={{y: 0.0, x: 1.2}}>
                <Text style={style.button_text}>Login</Text>
              </LinearGradient> */}
                <LinearGradient

                  colors={['#74B5E8', '#9974F2', '#E43DEC']}
                  style={style.button}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  locations={[0, 0.7, 0.9]}
                >
                  <Text style={style.button_text}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
            <Text style={style.people_first}>
              Putting People First, Profits Second
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  lottieStyle: {
    height: height * 0.25,
    // backgroundColor: 'red',
    position: 'absolute',
    top: height * 0.155,
    zIndex: 99999,
    left: width * 0.04,
  },
  login_bg: {
    flex: 1,
    // justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logo: {},
  login_detail: {
    // margin: 'auto',
    paddingBottom: height * 0.1,
    width: width * 0.8,
  },
  login_text: {
    fontSize: width * 0.08,
    // fontWeight: 'bold',
    color: 'white',
    // marginBottom: 8,
    fontFamily: 'Poppins-Bold',
  },
  welcome_text: {
    fontSize: width * 0.037,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    // color: 'red',
    opacity: 0.7,
    marginBottom: 25,
    // fontFamily: 'Poppins-Light',
  },
  form_field: {
    position: 'relative',
    zIndex: 0,
  },
  inputfield: {
    backgroundColor: 'white',
    width: width * 0.8,
    borderRadius: 10,
    paddingLeft: 50,
    height: height * 0.065,
  },
  icon: {
    position: 'absolute',
    fontSize: 20,
    top: height * 0.022,
    left: 10,
    width: 30,
    textAlign: 'center',
    zIndex: 1,
  },
  icon2: {
    fontSize: 15,
    // zIndex: 1,
  },
  recover_password: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    opacity: 0.7,
    marginBottom: 25,
    marginTop: 25,
  },
  people_first: {
    marginTop: height * 0.02,
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Italic',
    // fontStyle: 'italic',
    color: '#ffffff',
  },
  button: {
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: height * 0.07,
    color: 'white',
  },
  button_text: {
    fontSize: width * 0.045,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
  },
  loggingIn: {
    fontSize: width * 0.045,
    color: '#ffffff',
    fontFamily: 'Poppins-Bold',
  },
});

export default connect(null, actions)(Login);
