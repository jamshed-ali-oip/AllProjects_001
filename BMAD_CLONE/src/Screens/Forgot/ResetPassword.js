import React, {useEffect, useState, materialCommunityIconsef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
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
import {showMessage, hideMessage} from 'react-native-flash-message';
import Logo from './../../Components/Logo';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextInputFeild from './../../Components/TextFeild';
import * as actions from '../../Store/Actions/index';
import IconImage from './../../Components/Icons';
import {connect} from 'react-redux';
import Underline from './../../Components/Underline';
import Heading from './../../Components/Heading';
import TextSample from './../../Components/Text';
import TouchableOpacityBtn from './../../Components/TouchableOpacity';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PhoneInput from 'react-native-phone-number-input';
const ResetPassword = ({navigation, resetPassword, route}) => {
  const [newPassword, onChangeNewPassword] = useState('');
  const [confirmPass, onChangeNewConfirmPassword] = useState('');
  const onSuccess = () => {
    // navigation.navigate('verifyForgot');
    navigation.navigate('login');
  };
  const email = route?.params.email;
  //   console.log(email,')
  return (
    // <View style={styles.container}>
    <ImageBackground
      style={styles.backgroundImage}
      source={require('./../../Assets/Images/Bg1.png')}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* <KeyboardAvoidingView
          styles={{height: hp('10%')}}
          behavior="padding"
          enabled> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View
          style={{
            flexDirection: 'column',
            height: hp('80%'),
            top: 20,
            // backgroundColor: 'red',
          }}>
          <Logo />
          <Heading Label="Forgot" />
          <Heading Label="Password" />
          <TextSample Label="Enter Your Email For Password Verfication" />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 15,
            }}>
            <View style={styles.textElement}>
              <View style={styles.textField}>
                <MaterialCommunityIcons
                  name="numeric"
                  color="white"
                  size={20}
                />
                <TextInputFeild
                  maxLength={32}
                  placeholder="New Password"
                  value={newPassword}
                  onchange={onChangeNewPassword}
                  keyboardType="default"
                  //   secureTextEntry={true}
                />
              </View>
              <Underline />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              //   margin: 15,
            }}>
            <View style={styles.textElement}>
              <View style={styles.textField}>
                <MaterialCommunityIcons
                  name="numeric"
                  color="white"
                  size={20}
                />
                <TextInputFeild
                  maxLength={32}
                  placeholder="Confirm Password"
                  value={confirmPass}
                  onchange={onChangeNewConfirmPassword}
                  keyboardType="default"
                  //   secureTextEntry={true}
                />
              </View>
              <Underline />
            </View>
          </View>
        </View>

        <View
          style={{
            height: hp('20%'),
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
            alignContent: 'space-between',
            // bottom: 30,
            marginTop: 40,
            // backgroundColor:'blue'
          }}>
          <TouchableOpacityBtn
            onPress={() => {
              if (newPassword === confirmPass) {
                if (newPassword.length > 7) {
                  resetPassword(
                    {
                      user_email: email,
                      user_password: newPassword,
                      confirm_user_password: confirmPass,
                    },
                    onSuccess,
                  );
                } else {
                  showMessage({
                    message: 'The length of the password is too short.',
                    type: 'danger',
                  });
                }
              } else {
                showMessage({
                  message: 'Password not match',
                  type: 'danger',
                });
              }
            }}
            title="Reset"
          />
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </ImageBackground>
    // </View>
  );
};

export default connect(null, actions)(ResetPassword);

var styles = StyleSheet.create({
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
    marginHorizontal: 20,
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
    alignItems: 'center',
    alignSelf: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
});
