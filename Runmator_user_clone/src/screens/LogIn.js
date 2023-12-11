import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  PermissionsAndroid,
  BackHandler,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Button from '../components/Button';
import Inputbox from '../components/Inputbox';
import logo from '../assets/run-matter-logo.png';
import background_img from '../assets/backgroung-image.png';
import colors from '../assets/colors';
import Heading from '../components/Heading';
import { connect } from 'react-redux';
import * as actions from '../store/Actions/index';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import { responsiveHeight } from 'react-native-responsive-dimensions';
// import { LoginManager } from "react-native-fbsdk-next";

import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginButton,
  LoginManager,
} from 'react-native-fbsdk-next';// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LogIn = ({ navigation, UserReducer, userLogin, getCurrentLocation, userSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fb, setfb] = useState();
  const [acfb, setacfb] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [granted, setGranted] = useState(false);

  //  LoginManager.setLoginBehavior('web');
  const _onPressLogIn = async () => {
    const data = {
      email: username,
      password: password,
      roll_id: 2,
    };
    setIsLoading(true);
    if (username === '' || password === '') {
      Toast.show({ type: 'error', text1: 'Both fields required' })
      onLoginFailed();
    } else {
      await userLogin(data, onLoginFailed);
    }
  };

  const _onPressSignUp = () => {
    navigation.navigate('SignUp');
  };

  const _onPresspassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const onLoginFailed = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (granted) {
      getCurrentLocation();
    }
  }, [granted]);

  useEffect(() => {
    async function requestLocationPermission() {
      try {
        const platformCheck = Platform.OS;
        if (platformCheck != 'ios') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setGranted(granted);
          } else {
            BackHandler.exitApp();
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
    requestLocationPermission();
  }, []);

  useEffect(() => {
    GoogleSignin.configure({

      webClientId: '835877004640-c82n8njmb1cqru1sbauekds3vl1qq3s4.apps.googleusercontent.com', // Web client ID from the Google Developer Console
    });
  }, []);
  const signInViaGoogle = async () => {
    try {
      await GoogleSignin?.hasPlayServices();
      const googleemailaddress = await GoogleSignin?.signIn();
      const { accessToken } = await GoogleSignin?.getTokens();
      console.log("==============>>", googleemailaddress?.user);
      console.log("==============>acces>", accessToken);
      // await handleSignup(googleemailaddress.user.email, '123456', 'Buyer');

      // await handleLogin(googleemailaddress.user.email, '123456', 'Buyer');
      const data = {
        email: googleemailaddress?.user?.email,
        password: 123456789,
        name: googleemailaddress?.user?.name,
        role_id: 2,
        phone: null,
        lat: null,
        lng: null,
        referring_email: null,
        google_token: accessToken,
        google_id: googleemailaddress?.user?.id
      }

      await userSignup(data)


    } catch (error) {
      console.log("erorr", error)
      if (error.code === statusCodes?.SIGN_IN_CANCELLED) {
        Alert.alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes?.IN_PROGRESS) {
        Alert.alert('Signing In');
      } else if (error.code === statusCodes?.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services Not Available or Outdated');
      } else {
        console.log('Error', error);
      }
    }
  };

  // const logoutFromGoogle = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     console.log('Chal Raha Ha')
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const fbLogout = async () => {
    try {
      await LoginManager.logOut();
      console.log('Logout successful');
    } catch (error) {
      console.log('Logout failed with error: ' + error);
    }
  };
  const fbLogin = async () => {

    try {

      const result = await LoginManager.logInWithPermissions(['public_profile']);
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (data) {
          const userAccessToken = data.accessToken.toString();
          console.log('User Access Token:', userAccessToken);
          setacfb(userAccessToken)
          // You can use the user access token to make further API calls on behalf of the user
          // For example, you can fetch user data using the Graph API
          // Here's an example of fetching user data:
          const response = await fetch(`https://graph.facebook.com/me?access_token=${userAccessToken}`);
          const userData = await response.json();
          console.log('User Data:', userData);

          setfb(userData)
        } else {
          console.log('Failed to get user access token.');
        }
      }
    } catch (error) {
      console.log('Login fail with error:', error);
    }
  }
  console.log("============================", fb, acfb)
  // try {
  //   fetch('https://jsonplaceholder.typicode.com/todos/1')
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  // } catch (error) {
  //   console.log("::::::::::::::", error)
  // }


  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    headers: {}
  };

  axios.request(config)
    .then((response) => {
      console.log("Checking api ", JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log("checking api error", error);
    });

  const fblg = async () => {
    if (acfb !== undefined) {
      const data = {
        email: null,
        password: 123456789,
        name: fb?.name,
        role_id: 2,
        phone: null,
        lat: null,
        lng: null,
        referring_email: null,
        facebook_token: acfb,
        facebook_id: fb?.id
      }

      await userSignup(data)
    }
  }
  useEffect(() => {
    fblg()
  }, [acfb])
  return (
    // <ScrollView showsVerticalScrollIndicator={false}>
    <ImageBackground source={background_img} style={styles.image}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      {/* Input Fields  */}
      <View style={styles.inputBoxes}>
        <Inputbox
          value={username}
          setTextValue={setUsername}
          viewStyle={{ width: width * 0.8, height: height * 0.08 }}
          iconStyle={{ color: 'grey', fontSize: width * 0.034 }}
          iconType="FontAwesome5"
          iconName="user"
          placeHolderColor="grey"
          isShowRightIcon={true}
          textInputStyle={{ color: 'grey', width: width * 0.8 }}
          placeholderTilte="E-mail Address"
        />
        <Inputbox
          value={password}
          setTextValue={setPassword}
          placeholderTilte="Password"
          isSecure={true}
          placeHolderColor="grey"
          viewStyle={{ width: width * 0.8, height: height * 0.08 }}
          iconStyle={{ color: 'grey' }}
          textInputStyle={{ color: 'grey', width: width * 0.8 }}
        />
      </View>

      {/* Login Button  */}
      {isLoading ? (
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
          title="Login"
          onBtnPress={() => _onPressLogIn()}
          isBgColor={true}
          btnStyle={styles.btnStyle}
          btnTextStyle={styles.btnTextStyle}
        />
      )}
      {/* <Button
        title="Login with Facebook"
        // onBtnPress={() => alert("App is underReivew")}
        onBtnPress={() => fbLogin()}
        // onBtnPress={() => mydata()}
        isBgColor={true}
        btnStyle={{ ...styles.btnStyle, backgroundColor: '#4267B2' }}
        btnTextStyle={styles.btnTextStyle}
      /> */}
      {/* <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {

                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    let accessToken = data.accessToken
                    alert(accessToken.toString())

                    const responseInfoCallback = (error, result) => {
                      if (error) {
                        console.log(error)
                        alert('Error fetching data: ' + error.toString());
                      } else {
                        console.log(result)
                        alert('Success fetching data: ' + result.toString());
                      }
                    }

                    const infoRequest = new GraphRequest(
                      '/me',
                      {
                        accessToken: accessToken,
                        parameters: {
                          fields: {
                            string: 'email,name,first_name,middle_name,last_name'
                          }
                        }
                      },
                      responseInfoCallback
                    );

                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start()

                  }
                )

              }
            }
          }
          onLogoutFinished={() => alert("logout.")} /> */}
      <Button
        title="Login with Google"
        onBtnPress={() => signInViaGoogle()}
        // onBtnPress={()=>alert("kdahdh")}
        isBgColor={true}
        btnStyle={{ ...styles.btnStyle, backgroundColor: 'red' }}
        btnTextStyle={styles.btnTextStyle}
      />
      {/* Forgot Password  */}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 2,
          justifyContent: 'center',
        }}>
        <Heading
          title="Forgot Password?"
          passedStyle={styles.forgetPass}
          fontType="medium"
        />
        <TouchableOpacity onPress={() => _onPresspassword()}>
          <Heading
            passedStyle={styles.clickHere}
            title="Click Here"
            fontType="semi-bold"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.horizontalLinePosition}>
        <View style={styles.horizontalLine} />
        <View>
          <Heading
            passedStyle={styles.orStyle}
            fontType="medium"
            title="Or"
          />
        </View>
        <View style={styles.horizontalLine} />
      </View>

      {/* Signup Button  */}
      <View style={{ position: 'relative' }}>
        <Button
          title="Sign Up Now"
          onBtnPress={() => _onPressSignUp()}
          // onBtnPress={() => fbLogout()}
          isBgColor={false}
          btnStyle={styles.btnSignUpStyle}
          btnTextStyle={styles.btnSignUpTextStyle}
        />
      </View>
    </ImageBackground>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  lottieStyles: {
    height: height * 0.12,
    width: 100,
  },
  orStyle: {
    fontSize: width * 0.03,
    paddingHorizontal: width * 0.02,
    textAlign: 'center',
  },
  btnStyle: {
    backgroundColor: colors.themeBlue,
    borderRadius: width * 0.8,
    paddingHorizontal: height * 0.03,
    width: width * 0.8,
  },
  btnTextStyle: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
  forgetPass: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: width * 0.035,
  },

  btnSignUpStyle: {
    backgroundColor: 'transparent',
    borderRadius: width * 0.8,
    width: width * 0.8,
    borderWidth: 1,
    borderColor: colors.themeBlue,
  },
  btnSignUpTextStyle: {
    color: colors.themeBlue,
    fontFamily: 'Montserrat-SemiBold',
  },

  clickHere: {
    color: colors.themeBlue,
    fontSize: width * 0.035,
    marginLeft: width * 0.01,
    textDecorationLine: 'underline',
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: width * 0.5,
  },

  logo: {
    margin: 15,
    width: width * 0.5,
    height: height * 0.16,
    marginTop: height * 0.08,
    // backgroundColor:'red'
  },

  image: {
    // flex: 1,
    // resizeMode: 'stretch',
    justifyContent: 'flex-start',
    width: width,
    height: height + responsiveHeight(8),
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

// export default LogIn;
const mapStateToProps = ({ UserReducer }) => {
  return { UserReducer };
};

export default connect(mapStateToProps, actions)(LogIn);
