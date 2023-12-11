// @ts-nocheck
import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  ScrollView,
  DeviceEventEmitter,
  BackHandler,
  Alert,
  Dimensions,
} from 'react-native';
import Logo from './../../Components/Logo';
import TextInputFeild from './../../Components/TextFeild';
import LottieView from 'lottie-react-native';
import Underline from './../../Components/Underline';
import Heading from './../../Components/Heading';
import TouchableOpacityBtn from './../../Components/TouchableOpacity';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import * as actions from '../../Store/Actions';
import SplashScreen from 'react-native-splash-screen';
import {showMessage, hideMessage} from 'react-native-flash-message';
import Feather from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation, route, loginUser}) => {
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginHandle = async () => {
    if (username.length == 0 || password.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }

    // if (foundUser.length == 0) {
    //   Alert.alert('Invalid User!', 'Username or password is incorrect.', [
    //     {text: 'Okay'},
    //   ]);
    //   return;
    // }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username))
    {
      setLoading(true);
      await loginUser(username, password, onLoginFailed);
    }else{
      showMessage({
        message: 'Oh Snaps!',
        description: 'Invalid Email Address',
        danger: 'error',
      });
    }
  
  };

  const onLoginFailed = () => {
    setLoading(false);
  };

  useEffect(() => {
    SplashScreen.hide();
    if (Platform.OS === 'android') {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          "<div style='background-color: #f5fcff; border-radius: 100px;'> <h3 style='font-color:#31a4de'>This App access to your Location</h3>This App wants to change your device settings:<br/><br/>Use GPS for Location<br/></div>",
        ok: 'YES',
        cancel: 'NO',
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
        preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
        providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
      })
        .then(
          function (success) {
            Geolocation.getCurrentPosition(
              position => {
                let initialPosition = JSON.stringify(position);
              },
              error => console.log(error),
              {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
            );
          }.bind(this),
        )
        .catch(error => {
          console.log(error.message);
        });
      BackHandler.addEventListener('hardwareBackPress', () => {
        LocationServicesDialogBox.forceCloseDialog();
      });
      DeviceEventEmitter.addListener(
        'locationProviderStatusChange',
        function (status) {
          console.log(status);
        },
      );
    } else {
      Geolocation.getCurrentPosition(
        //Will give you the current location
        position => {
          // setLocationStatus('You are Here');
          console.log(position, 'APP getCurrentPosition');
        },
        error => {
          console.log(error.message);
        },
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 1000,
        },
      );
    }
    return () => {
      // Anything in here is fired on component unmount.
      if (Platform.OS === 'android') {
        LocationServicesDialogBox.stopListener();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        style={styles.backgroundImage}
        source={require('./../../Assets/Images/Bg1.png')}>
        {/* <KeyboardAvoidingView styles={{height: hp('10%')}} behavior = 'padding'  enabled> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <View style={{flexDirection: 'column', height: hp('80%'), top: 20}}>
            <Logo />
            <Heading Label="Sign In" />
            <View style={styles.textElement}>
              <View style={styles.textField}>
                <Feather name="user" color="white" size={20} />
                <TextInputFeild
                  placeholder="Email"
                  value={username}
                  onchange={e => onChangeUsername(e)}
                  keyboardType="default"
                  secureTextEntry={false}
                />
              </View>
              <Underline />
            </View>
            <View style={styles.textElement}>
              <View style={styles.textField}>
                <Feather name="lock" color="white" size={20} />
                <TextInputFeild
                  placeholder="Password"
                  value={password}
                  onchange={onChangePassword}
                  keyboardType="default"
                  secureTextEntry={true}
                />
              </View>
              <Underline />
            </View>
          </View>
          <View style={styles.btnContainer}>
            {loading ? (
              <LottieView
                style={{
                  marginTop: -10,
                  width: width * 0.2,
                  height: height * 0.1,
                }}
                source={require('../../Assets/Lottie/red-loader.json')}
                autoPlay
                loop
              />
            ) : (
              <TouchableOpacityBtn onPress={loginHandle} title="Sign In" />
            )}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                // return;
                navigation.navigate('forgot');
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-Regular',
                  fontSize: hp('2%'),
                  textAlign: 'center',
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate('signup');
                // return;
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-Regular',
                  fontSize: hp('2%'),
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* </KeyboardAvoidingView> */}
      </ImageBackground>
    </View>
  );
};

// export default LoginScreen;

var styles = StyleSheet.create({
  btnContainer: {
    height: hp('20%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'space-between',
    bottom: 30,
  },
  textElement: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 60,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    height: hp('103%'),
  },
  scrollView: {
    // marginHorizontal: 20,
  },
  input: {
    height: 40,
    padding: 10,
    borderWidth: 0,
    color: 'white',
    width: wp('80%'),
    justifyContent: 'center',
    borderColor: 'white',
    fontFamily: 'Poppins-Regular',
    fontWeight: '200',
    fontSize: hp('2%'),
  },
  textField: {
    width: wp('95%'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
});

export default connect(null, actions)(LoginScreen);
