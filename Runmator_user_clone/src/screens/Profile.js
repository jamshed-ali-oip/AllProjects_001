import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import Header from '../components/Header';
import LottieView from 'lottie-react-native';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
import colors from '../assets/colors';
import Button from '../components/Button';
import Inputbox from '../components/Inputbox';
// import ImagePicker from 'react-native-image-crop-picker';
// test
import {launchImageLibrary} from 'react-native-image-picker';
import DisplayNameChangeModal from '../components/DisplayNameChangeModal';
import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';
import {imageUrl,imageUrl2} from '../configurations/config';

const {width, height} = Dimensions.get('window');

const Profile = ({UserReducer, navigation, updateProfile}) => {
  const accessToken = UserReducer?.accessToken;
  // image state
  const [isLoading, setIsLoading] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [image, setImage] = useState(UserReducer?.userData?.profile_image);
  // display name state
  const [displayName, setDisplayName] = useState(UserReducer?.userData?.name);
  // modal state
  const [isModalVisible, setIsModalVisible] = useState(false);

  var matches = displayName?.match(/\b(\w)/g);
  var acronym = matches?.join('');

  const _onPressSave = async () => {
    // setIsLoading(true);
    // if (userImage !== null) {
    //   const apiDataForImage = {
    //     id: UserReducer?.userData?.id,
    //     image: userImage,
    //   };
    //   await updateProfile(apiDataForImage, accessToken);
    //   const userData = {
    //     first_name: firstName,
    //     last_name: lastName,
    //     language: [language?.id],
    //   };
    //   await updateUserData(userData, accessToken, onSuccess);
    //   setUserImage(null);
    // } else {
    //   const userData = {
    //     first_name: firstName,
    //     last_name: lastName,
    //     language: [language?.id],
    //   };
    //   await updateUserData(userData, accessToken, onSuccess);
    // }
    // setIsLoading(false);
  };

  // Change Display Name
  const _onPressEditName = () => {
    setIsModalVisible(true);
  };

  // Upload Photo
  const uploadPhoto = async () => {
    var options = {
      title: 'Select Image',
      allowsEditing: true,
      quality: 0.9,
      maxWidth: 1200,
      maxHeight: 1200,
      mediaType: 'photo',
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      // var ArraySingleImage = []
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        // SelectMultipleImage()
      } else {
        // console.log(response.assets[0],"==------....")
        setUserImage(response.assets[0]);

        // const source = {
        // for showing image
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        // console.log(source)
        // ArraySingleImage.push(source)
      }
    });
  };
  // console.log(userImage)
  const _onPressUpdateProfile = () => {
    if(displayName?.length == 0) {
      alert("Please Enter Display Name");
      return;
    }
    setIsLoading(true);
    const apiDataForImage = {
      id: UserReducer?.userData?.id,
      file:{
          uri:userImage?.uri,
          name:userImage?.fileName,
          type:userImage?.type
      },
      name: displayName,
    };
    let isUpdatingImage =(userImage?.uri)?true:false
    updateProfile(
      apiDataForImage,
      accessToken,
      _onFailed,
      isUpdatingImage,
    ).then(() => {
      setIsLoading(false);
      setUserImage(null);
    });
  };

  // useEffect(() => {
  //   if (userImage !== undefined && userImage !== null && userImage !== '') {
  //     updateUserImage();
  //   }
  // }, [userImage]);

  const _onFailed = () => {
    setIsLoading(false);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        {/* Header  */}
        <Header
          showBack={true}
          navigation={navigation}
          iconName="arrow-back"
          iconSize={25}
        />

        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            {/* Page Heading */}
            <Heading
              title="Profile Settings"
              passedStyle={styles.heading}
              fontType="bold"
            />

            {/* Image Container  */}
            <View style={styles.boxContainer}>
              {UserReducer?.userData?.profile_image || userImage ? (
                <Image
                  source={{
                    uri: userImage
                      ? `data:${userImage?.type};base64,${userImage?.base64}`
                      : imageUrl2+"/"+UserReducer?.userData?.profile_image,
                  }}
                  // `${imageUrl}${UserReducer?.userData?.profile_image.substring(
                  //   0,
                  //   5,
                  // )}`,
                  style={[StyleSheet.absoluteFill, {borderRadius: 100}]}
                />
              ) : (
                <Heading
                  passedStyle={styles.usernameWordsStyle}
                  title={acronym}
                  fontType="bold"
                />
              )}
              <TouchableOpacity
                style={styles.iconTouchable}
                onPress={() => uploadPhoto()}>
                <IconComp
                  iconName="camera-alt"
                  type={'MaterialIcons'}
                  passedStyle={styles.icon}
                />
              </TouchableOpacity>
            </View>

            {/* Username Container  & Password */}
            <View style={styles.usernameViewStyle}>
              <Heading
                title={displayName}
                passedStyle={styles.usernameStyle}
                fontType="medium"
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => _onPressEditName()}>
                <IconComp
                  iconName="pencil"
                  type="MaterialCommunityIcons"
                  passedStyle={styles.pencilIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Save Button  */}
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
                title="SAVE"
                btnStyle={styles.btnStyle}
                onBtnPress={() => _onPressUpdateProfile()}
                btnTextStyle={styles.btnTextColor}
                isBgColor={true}
              />
            )}
          </View>
        </View>
        {/* </ScrollView> */}
        {isModalVisible && (
          <DisplayNameChangeModal
            value={displayName}
            setValue={setDisplayName}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pencilIcon: {
    color: 'black',
    fontSize: width * 0.045,
    paddingLeft: width * 0.02,
  },
  usernameWordsStyle: {
    fontSize: width * 0.12,
    color: colors.themeBlue,
    textTransform: 'uppercase',
  },
  btnStyle: {
    borderRadius: width * 0.02,
    backgroundColor: colors.themeBlue,
  },
  btnTextColor: {
    color: 'white',
    fontSize: width * 0.045,
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
    // paddingBottom: 100,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#707070',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    marginLeft: width * 0.1,
    marginRight: width * 0.1,
  },
  heading: {
    color: 'black',
    marginLeft: width * 0.08,
    fontSize: width * 0.08,
    marginTop: height * 0.04,
  },
  boxContainer: {
    borderRadius: width * 0.8,
    height: width * 0.5,
    width: width * 0.48,
    alignItems: 'center',
    marginHorizontal: width * 0.22,
    marginTop: width * 0.06,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 9,
    // borderWidth: 1,
    // borderColor: 'grey',
    backgroundColor: 'rgba(0,0,0,0.008)',
    // paddingHorizontal: width * 0.2,
    // paddingVertical: height * 0.005,
  },
  usernameStyle: {
    fontSize: height * 0.031,
    marginRight: width * 0.01,
  },
  usernameViewStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginHorizontal: width * 0.1,
    marginVertical: height * 0.03,
  },
  icon: {
    color: '#ffffff',
    // borderRadius: 50,
    padding: height * 0.014,
  },
  iconTouchable: {
    position: 'absolute',
    top: height * 0.18,
    width: width * 0.11,
    alignSelf: 'center',
    height: height * 0.05,
    right: width * 0.02,
    backgroundColor: colors.themeBlue,
    borderRadius: 50,
  },
  border_line: {
    borderBottomWidth: 1,

    borderBottomColor: 'red',
    width: width * 0.95,
    fontFamily: 'Montserrat-Regular',
    fontSize: width * 0.04,
  },
  imageStyle: {
    width: width * 0.5,
    height: height * 0.28,
    borderRadius: width * 0.8,
  },

  loadingComponent: {
    borderRadius: width * 0.02,
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.themeBlue,
    backgroundColor: colors.themeBlue,
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS != 'ios' ? height * 0.08 : height * 0.065,
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
  lottieStyles: {
    height: height * 0.1,
    position: 'absolute',
    left: width * 0.07,
    right: 0,
    // top: height * -0.005,
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(Profile);
