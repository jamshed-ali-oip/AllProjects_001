import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Heading from '../components/Heading';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';
const image = require('../assets/images/login_bg.png');
import * as actions from '../store/Actions/index';
import {connect} from 'react-redux';
import AlertModal2 from '../components/AlertModal2';
import {color} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import {themePurple} from '../assets/colors/colors';
import IconComp from '../components/IconComp';
import {showMessage} from 'react-native-flash-message';
const {width, height} = Dimensions.get('window');

const ChangePassword = ({navigation, UserReducer, changePassword}) => {
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  const accessToken = UserReducer?.accessToken;
  const [isLoading, setIsLoading] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [showPasswordShouldBeLongAlert, setShowPasswordShouldBeLongAlert] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFieldsLeftEmptyAlert, setShowFieldsLeftEmptyAlert] =
    useState(false);
  const [showMismatchPasswordAlert, setShowMismatchPasswordAlert] =
    useState(false);

  // Save Button
  const _onPressSave = async () => {
    setIsLoading(true);
    const data = {
      user_id: UserReducer?.userData?.id,
      old_password: oldPass,
      password: newPass,
      confirm_password: confirmPass,
    };
    console.log(data);

    if (oldPass.length > 0 && newPass.length > 0 && confirmPass.length > 0) {
      if (newPass !== confirmPass) {
        showMessage({
          message: 'Password Mismatch',
          description: 'New and Confirm password can not be different.',
          type: 'danger',
        });
      } else {
        if (newPass.length < 8 || confirmPass.length < 8) {
          showMessage({
            message: 'Oh Snaps!',
            description: 'Password should be of atleast 8 characters.',
            type: 'danger',
          });
        } else {
          await changePassword(data, _onSuccessChanged,accessToken);
        }
      }
    } else {
      showMessage({
        message: 'Oh Snaps!',
        description: 'One or more fields are left empty.',
        type: 'danger',
      });
    }
    setIsLoading(false);
  };

  const _onPressShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const _onSuccessChanged = () => {
    setNewPass('');
    setOldPass('');
    setConfirmPass('');
    setShowSuccessModal(true);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>
    <ImageBackground source={image} resizeMode="cover" style={styles.container}>
     {Platform?.OS !== 'ios' && <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
        <StatusBar
          translucent
          backgroundColor={themePurple}
          barStyle="light-content"
        />
      </View>}
      <SafeAreaView style={{flex: 1}}>
       <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
            style={{
              zIndex: 9999,
              marginLeft: width * 0.04,
              width: width * 0.2,
              backgroundColor: themePurple,
              paddingHorizontal: width * 0.01,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop:10,
              alignItems: 'center',
              borderRadius: width * 0.02,
              paddingVertical: height * 0.01,
            }}>
            <IconComp
              type={'Ionicons'}
              iconName="chevron-back-sharp"
              passedStyle={{color: 'white', fontSize: width * 0.05}}
            />
            <Text
              style={{
                color: 'white',
                fontSize: width * 0.045,
                paddingRight: width * 0.02,
              }}>
              Back
            </Text>
          </TouchableOpacity>
          {/* Page Heading */}
          <Heading
            title="Change Password"
            passedStyle={styles.heading}
            fontType="semi-bold"
          />
          {/* <Inputbox
            value={oldPass}
            isSecure={isShowPassword}
            isPassword={true}
            isShowIcon={true}
            names={'lock'}
            setTextValue={setOldPass}
            onPressIcon={_onPressShowPassword}
            passedStyle={styles.textInputStyle}
            placeholderTilte="Old Password"
            iconStyle={{
              color: themePurple,
              paddingLeft: width * 0.1,
            }}
            iconWrapperStyle={{
              position: 'absolute',
              right: width * 0.04,
              left: width * 0.7,
            }}
            placeholderTextColor="rgba(0,0,0,0.5)"
          /> */}
          <Inputbox
            value={oldPass}
            isSecure={isShowPassword}
            isPassword={true}
            isShowIcon={true}
            names={'lock'}
            setTextValue={setOldPass}
            passedStyle={styles.textInputStyle}
            onPressIcon={_onPressShowPassword}
            placeholderTilte="Old Password"
            placeholderTextColor="rgba(0,0,0,0.5)"
            iconStyle={{
              color: themePurple,
              paddingLeft: width * 0.1,
              fontSize:width * 0.06,
            }}
            iconWrapperStyle={{
              position: 'absolute',
              right: width * 0.04,
              left: width * 0.7,
            }}
          />
          <Inputbox
            value={newPass}
            isSecure={isShowPassword}
            isPassword={true}
            isShowIcon={true}
            names={'lock'}
            setTextValue={setNewPass}
            passedStyle={styles.textInputStyle}
            onPressIcon={_onPressShowPassword}
            placeholderTilte="New Password"
            placeholderTextColor="rgba(0,0,0,0.5)"
            iconStyle={{
              color: themePurple,
              paddingLeft: width * 0.1,
              fontSize:width * 0.06,
            }}
            iconWrapperStyle={{
              position: 'absolute',
              right: width * 0.04,
              left: width * 0.7,
            }}
          />
          <Inputbox
            value={confirmPass}
            isSecure={isShowPassword}
            isPassword={true}
            isShowIcon={true}
            names={'lock'}
            setTextValue={setConfirmPass}
            onPressIcon={_onPressShowPassword}
            passedStyle={styles.textInputStyle}
            placeholderTilte="Confirm Password"
            placeholderTextColor="rgba(0,0,0,0.5)"
            iconStyle={{
              color: themePurple,
              paddingLeft: width * 0.1,
              fontSize:width * 0.06,
            }}
            iconWrapperStyle={{
              position: 'absolute',
              right: width * 0.04,
              left: width * 0.7,
            }}
          />

          <View style={styles.btnContainer}>
            {isLoading ? (
              <View style={styles.loadingComponent}>
                <Heading
                  title="Saving..."
                  passedStyle={styles.savingText}
                  fontType="semi-bold"
                />

                <LottieView
                  speed={1}
                  style={styles.lottieStyles}
                  autoPlay
                  loop
                  source={require('../assets/lottie/purple-loading-2.json')}
                />
              </View>
            ) : (
              <Button
                title="Save Changes"
                btnStyle={styles.btnStyle}
                onBtnPress={() => _onPressSave()}
                // onBtnPress={() => console.log("pressed")}
                btnTextStyle={styles.btnTextColor}
                isBgColor={false}
              />
            )}
          </View>
          {showMismatchPasswordAlert && (
            <AlertModal2
              title="Password Mismatch"
              message="New and Confirm password can not be different."
              isModalVisible={showMismatchPasswordAlert}
              setIsModalVisible={setShowMismatchPasswordAlert}
            />
          )}
          {showFieldsLeftEmptyAlert && (
            <AlertModal2
              title="Oh Snaps!"
              message="One or more fields are left empty."
              isModalVisible={showFieldsLeftEmptyAlert}
              setIsModalVisible={setShowFieldsLeftEmptyAlert}
            />
          )}
          {showPasswordShouldBeLongAlert && (
            <AlertModal2
              title="Oh Snaps!"
              message={'Password should be of atleast 8 characters.'}
              isModalVisible={showPasswordShouldBeLongAlert}
              setIsModalVisible={setShowPasswordShouldBeLongAlert}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(ChangePassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  textInputStyle: {
    borderRadius: width * 0.2,
    borderWidth: 1,
    color: 'black',
    borderColor: themePurple,
    width: width * 0.9,
    // fontFamily: 'Poppins-Regular',
  },
  heading: {
    fontSize: width * 0.065,
    color: 'white',
    marginTop:20,
    marginBottom: 25,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },

  btnStyle: {
    borderRadius: width * 0.1,
    height: height * 0.08,
    backgroundColor: themePurple,
  },
  btnTextColor: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: width * 0.045,
  },
  lottieStyles: {
    height: height * 0.1,
    position: 'absolute',
    left: width * 0.07,
    right: 0,
    top: height * -0.005,
  },
  loadingComponent: {
    borderRadius: width * 0.1,
    position: 'relative',
    borderWidth: 1,
    borderColor: themePurple,
    backgroundColor: themePurple,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.08,
    width: width * 0.8,
    marginVertical: height * 0.02,
  },
  savingText: {
    color: 'white',
    position: 'absolute',
    left: width * 0.24,
    top: height * 0.022,
    fontSize: width * 0.045,
  },
});
