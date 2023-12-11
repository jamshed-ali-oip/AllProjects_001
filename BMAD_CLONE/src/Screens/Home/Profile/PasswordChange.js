import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Heading from '../../../Components/Heading';
import Inputbox from '../../../Components/Inputbox';
import Button from '../../../Components/Button';
import * as actions from '../../../Store/Actions/index';
import {connect} from 'react-redux';
import AlertModal2 from '../../../Components/AlertModal2';
import {color} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import {themeRed} from '../../../Assets/Colors/Colors';
const {width, height} = Dimensions.get('window');

const ChangePassword = ({navigation, userReducer, changePassword}) => {
  const accessToken = userReducer?.accessToken;
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
      user_id: userReducer?.data?.user_id,
      old_password: oldPass,
      new_password: newPass,
      confirm_new_password: confirmPass,
    };
    console.log(data);

    if (oldPass.length > 0 && newPass.length > 0 && confirmPass.length > 0) {
      if (newPass !== confirmPass) {
        setShowMismatchPasswordAlert(true);
      } else {
        if (newPass.length < 8 || confirmPass.length < 8) {
          setShowPasswordShouldBeLongAlert(true);
        } else {
          await changePassword(data, _onSuccessChanged);
        }
      }
    } else {
      setShowFieldsLeftEmptyAlert(true);
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
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Page Heading */}
          {/* <Heading
            title="Change Password"
            passedStyle={styles.heading}
            fontType="semi-bold"
          /> */}
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
              color: themeRed,
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
              color: themeRed,
              paddingLeft: width * 0.1,
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
              color: themeRed,
              paddingLeft: width * 0.1,
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
              color: themeRed,
              paddingLeft: width * 0.1,
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
                  source={require('../../../Assets/Lottie/red-loader.json')}
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
    </View>
  );
};

const mapStateToProps = ({userReducer}) => {
  return {userReducer};
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
    borderRadius: width * 0.02,
    borderWidth: 1,
    color: 'black',
    borderColor: themeRed,
    width: width * 0.9,
    fontSize:width * 0.04,
    fontFamily: 'Poppins-Regular',
  },
  heading: {
    color: 'black',
    marginLeft: width * 0.08,
    fontSize: width * 0.08,
    marginTop: height * 0.04,
  },

  btnStyle: {
    borderRadius: width * 0.02,
    height: height * 0.08,
    backgroundColor: themeRed, 
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
    borderRadius: width * 0.02,
    position: 'relative',
    borderWidth: 1,
    borderColor: themeRed,
    backgroundColor: themeRed,
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
