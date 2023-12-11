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
import colors from '../assets/colors';
import Header from '../components/Header';
import LottieView from 'lottie-react-native';
import Heading from '../components/Heading';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';
import * as actions from '../store/Actions/index';
import {connect} from 'react-redux';
import AlertModal from '../components/AlertModal';
import {color} from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
const {width, height} = Dimensions.get('window');

const ChangePassword = ({navigation, UserReducer, changePasswordRequest}) => {
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

    useEffect(()=>{
      const unsubscribe = navigation.addListener('blur', () => {
        setNewPass("")
        setConfirmPass("")
      });
    },[navigation])
  // Save Button
  const _onPressSave = () => {
    setIsLoading(true);
    const data = {
        user_id: UserReducer?.userData?.id,
        password: newPass,
        new_password: confirmPass,
    };
    if ( newPass.length > 0 && confirmPass.length > 0) {
      if (newPass !== confirmPass) {
        setIsLoading(false)
        setShowMismatchPasswordAlert(true);
      } else {
        if (newPass.length < 8 || confirmPass.length < 8) {
          setIsLoading(false)
          setShowPasswordShouldBeLongAlert(true);
        } else {
          changePasswordRequest(data, accessToken, _onSuccessChanged,()=>setIsLoading(false));
        }
      }
    } else {
      setIsLoading(false)
      setShowFieldsLeftEmptyAlert(true);
    }
  };

  const _onPressShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const _onSuccessChanged = () => {
    setIsLoading(false)
    setNewPass('');
    setOldPass('');
    setConfirmPass('');
    setShowSuccessModal(true);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <Header navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
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
              color: colors.themeBlue,
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
            value={newPass}
            setTextValue={setNewPass}
            isSecure={true}
            viewStyle={styles.border_line}
            placeholderTilte="Confirm Password"
            placeHolderColor="rgba(0,0,0,0.7)"
            textInputStyle={{ color: 'black' }}
          />
          <Inputbox
            value={confirmPass}
            isSecure={true}
            setTextValue={setConfirmPass}
            viewStyle={styles.border_line}
            placeholderTilte="Confirm Password"
            placeHolderColor="rgba(0,0,0,0.7)"
            textInputStyle={{ color: 'black' }}
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
                  source={require('../assets/Lottie/loading-yellow.json')}
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
            <AlertModal
              title="Password Mismatch"
              message="New and Confirm password can not be different."
              isModalVisible={showMismatchPasswordAlert}
              setIsModalVisible={setShowMismatchPasswordAlert}
            />
          )}
          {showFieldsLeftEmptyAlert && (
            <AlertModal
              title="Oh Snaps!"
              message="One or more fields are left empty."
              isModalVisible={showFieldsLeftEmptyAlert}
              setIsModalVisible={setShowFieldsLeftEmptyAlert}
            />
          )}
          {showPasswordShouldBeLongAlert && (
            <AlertModal
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
    borderRadius: width * 0.02,
    borderWidth: 1,
    color: 'black',
    borderColor: colors.themeBlue,
    width: width * 0.9,
    // fontFamily: 'Poppins-Regular',
  },
  heading: {
    color: 'black',
    marginLeft: width * 0.08,
    fontSize: width * 0.08,
    marginTop: height * 0.04,
  },

  btnStyle: {
    borderRadius: width * 0.02,
    height:height *0.08,
    backgroundColor: colors.themeBlue,
  },
  btnTextColor: {
    color: 'white',
    // fontFamily: 'Poppins-SemiBold',
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
    borderColor: colors.themeBlue,
    backgroundColor: colors.themeBlue,
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
  border_line: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.12)',
    width: width * 0.9,
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
  },
});
