import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import React, {useState, useEffect, useRef} from 'react';
import {themePurple} from '../assets/colors/colors';
import PhoneInput from 'react-native-phone-number-input';
import ImagePicker from 'react-native-image-crop-picker';
import * as actions from '../store/Actions/index';
import {showMessage, hideMessage} from 'react-native-flash-message';
import IconComp from '../components/IconComp';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const imageURL = require('../assets/images/login_bg.png');

const EditProfile = ({UserReducer, updateProfile, navigation}) => {
  const [fname, setFname] = useState(UserReducer?.userData?.first_name);
  const [lname, setLname] = useState(UserReducer?.userData?.last_name);
  const [phone_no, setPhone_no] = useState(UserReducer?.userData?.phone);
  const phoneInput = useRef(null);
  const [value, setValue] = useState(
    UserReducer?.userData?.phone?.substring(
      3,
      UserReducer?.userData?.phone?.length,
    ),
  );
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  const [imageObject, setImageObject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const accessToken = UserReducer?.accessToken;
  const ID = UserReducer?.userData?.id;
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      //   console.log(image);
      // setImageObject(image);
      setImage(`data:${image?.mime};base64,${image?.data}`);
    });
  };

  const updateProfileChanges = async () => {
    if (fname && lname && phone_no) {
      let data = {
        first_name: fname,
        last_name: lname,
        phone: phone_no,
        // image: image,
        image: image !== null ? image : UserReducer?.userData?.profile_image,
      };

      setLoading(true);
      await updateProfile(data, ID, accessToken, _onSuccess, _onFailed);
    } else {
      showMessage({
        message: 'All fields are required!',
        // description: 'Invalid Credentials.',
        danger: 'error',
      });
    }
  };

  const _onSuccess = () => {
    setLoading(false);

    ImagePicker.clean().then(() => {
      console.log('removed all tmp images from tmp directory');
    });
    navigation.goBack();
  };

  const _onFailed = () => {
    setLoading(false);
  };
  useEffect(() => {
    setFname(UserReducer?.userData?.first_name);
    setLname(UserReducer?.userData?.last_name);
  }, [UserReducer?.userData]);
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
      {Platform?.OS !== 'ios' && (
        <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
          <StatusBar
            translucent
            backgroundColor={themePurple}
            barStyle="light-content"
          />
        </View>
      )}
      <ImageBackground
      source={imageURL} resizeMode="cover"
      style={{flex:1}}
      >
      <View style={styles.container}>
        {/* Image Container  */}
        <View style={styles.imageContainer}>
          {image !== null ? (
            <Image source={{uri: image}} style={styles.imageStyles} />
          ) : UserReducer?.userData?.profile_image !== '' &&
            UserReducer?.userData?.profile_image !== null ? (
            <Image
              source={{uri: UserReducer?.userData?.profile_image}}
              style={styles.imageStyles}
            />
          ) : (
            <Image
              source={require('../assets/images/test.png')}
              style={styles.imageStyles}
            />
          )}
        </View>

        {/* Name And Email Container  */}
        <View style={styles.textContainer}>
          <Text
            style={
              styles.nameStyles
            }>{`${UserReducer?.userData?.first_name} ${UserReducer?.userData?.last_name}`}</Text>
          <Text style={styles.emailStyles}>{UserReducer?.userData?.email}</Text>
        </View>

        {/* Icon Edit Profile  */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={openGallery}
          style={styles.iconContainer}>
          <IconComp
            type={'FontAwesome'}
            iconName="edit"
            passedStyle={{fontSize: width * 0.08, marginLeft: 4}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={{
            zIndex: 9999,
            position: 'absolute',
            top: height * 0.05,
            left: width * 0.03,
            backgroundColor: themePurple,
            paddingHorizontal: width * 0.01,
            flexDirection: 'row',
            justifyContent: 'center',
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

        {/* Form Input Fields View */}
        <View style={styles.formView}>
          <Text style={styles.formLabelStyle}>First Name</Text>
          <TextInput
            value={fname}
            onChangeText={e => setFname(e)}
            style={styles.textInputLabel}
          />
          <Text style={styles.formLabelStyle}>Last Name</Text>
          <TextInput
            value={lname}
            onChangeText={e => setLname(e)}
            style={styles.textInputLabel}
          />
          <Text style={styles.formLabelStyle}>Phone Number</Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="PK"
            layout="first"
            placeholder="Phone"
            containerStyle={styles.phoneInputContainerStyle}
            textInputStyle={styles.phoneInputTextStyle}
            codeTextStyle={styles.codeTextStyle}
            textContainerStyle={styles.textContainerStyle}
            onChangeText={text => {
              setValue(text);
            }}
            onChangeFormattedText={text => {
              setPhone_no(text);
            }}
          />

          {loading ? (
            <View style={styles.updateBtnStyle}>
              <Text style={styles.btnTxt}>Updating..</Text>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={updateProfileChanges}
              >
              <LinearGradient
              colors={['#74B5E8', '#9974F2', '#E43DEC']}
              start={{y: 0.0, x: 0.001}}
              angleCenter={{x: 5, y: 0}}
              end={{y: 0.0, x: 1.1}}
              style={styles.updateBtnStyle}
              >
              <Text style={styles.btnTxt}>Update</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
      </ImageBackground>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(EditProfile);

const styles = StyleSheet.create({
  login_bg: {
    flex: 1,
    alignItems: 'center',
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    // height: height,
    // backgroundColor: themePurple,
  },
  btnTxt: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Bold',
  },
  updateBtnStyle: {
    borderWidth: 0,
    borderColor: 'white',
    backgroundColor: themePurple,
    width: width * 0.4,
    alignSelf: 'center',
    height: height * 0.07,
    borderRadius: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.03,
    elevation: 9,
  },
  imageContainer: {
    width: width,
    height: height * 0.55,
    borderBottomRightRadius: width * 0.15,
  },
  imageStyles: {
    width: width,
    height: height * 0.5,
    borderBottomRightRadius: width * 0.15,
  },
  textContainer: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? height * 0.37 : height * 0.34,
    left: width * 0.05,
    paddingHorizontal: width * 0.03,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
    paddingVertical: height * 0.02,
  },
  nameStyles: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: width * 0.07,
    textTransform: 'capitalize',
  },
  emailStyles: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.04,
    marginTop: height * -0.01,
  },
  iconContainer: {
    position: 'absolute',
    top: height * 0.05,
    right: width * 0.03,
    zIndex: 9999,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  formView: {
    marginHorizontal: width * 0.05,
    marginBottom: height * 0.03,
  },
  formLabelStyle: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    // backgroundColor: themePurple,
    marginVertical: height * 0.01,
  },
  textInputLabel: {
    borderColor: 'white',
    backgroundColor: 'white',
    width: width * 0.9,
    borderRadius: width * 0.3,
    paddingHorizontal: width * 0.05,
    elevation: 20,
    fontSize: width * 0.045,
    height: height * 0.08,
  },
  phoneInputContainerStyle: {
    backgroundColor: 'white',
    borderRadius: 50,
    color: 'black',
    height: height * 0.0755,
    width: width * 0.9,
  },
  phoneInputTextStyle: {
    color: 'black',
    height: height * 0.07,
    paddingVertical: 0,
  },
  codeTextStyle: {
    color: 'black',
  },
  textContainerStyle: {
    color: 'black',
    borderRadius: 50,
  },
});
