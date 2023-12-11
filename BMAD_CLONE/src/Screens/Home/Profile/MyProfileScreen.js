// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
  Animated,
  TextInput,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import AppText from '../../../Components/AppText';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/Feather';
import { showMessage, hideMessage } from 'react-native-flash-message';
import Entypo from 'react-native-vector-icons/Entypo';
import PhoneInput from 'react-native-phone-number-input';
import * as actions from '../../../Store/Actions';
import { imageUrl } from '../../../Config/Apis.json';
import { connect } from 'react-redux';
import CountryPicker, { FlagButton } from 'react-native-country-picker-modal';
import { themeRed } from '../../../Assets/Colors/Colors';
import { CountryCode, Country } from './src/types';
import ImagePicker from 'react-native-image-crop-picker';
import IconComp from '../../../Components/IconComp';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';

const { width, height } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const data = [
  { key: 'A', image: require('../../../Assets/Images/post1.png') },
  { key: 'B', image: require('../../../Assets/Images/post2.png') },
  { key: 'C', image: require('../../../Assets/Images/post3.png') },
  { key: 'D', image: require('../../../Assets/Images/Animal.png') },
  { key: 'E', image: require('../../../Assets/Images/Tech.png') },
  { key: 'F', image: require('../../../Assets/Images/share1.png') },
  { key: 'G', image: require('../../../Assets/Images/share2.png') },
  { key: 'H', image: require('../../../Assets/Images/share2.png') },
  { key: 'I', image: require('../../../Assets/Images/share2.png') },
  { key: 'J', image: require('../../../Assets/Images/share1.png') },
  { key: 'K', image: require('../../../Assets/Images/share1.png') },
  { key: 'L', image: require('../../../Assets/Images/share1.png') },
  { key: 'M', image: require('../../../Assets/Images/post1.png') },
  { key: 'N', image: require('../../../Assets/Images/post1.png') },
  { key: 'O', image: require('../../../Assets/Images/Animal.png') },
  { key: 'P', image: require('../../../Assets/Images/post1.png') },
  { key: 'Q', image: require('../../../Assets/Images/Animal.png') },
  { key: 'R', image: require('../../../Assets/Images/post1.png') },
  { key: 'S', image: require('../../../Assets/Images/Animal.png') },
  { key: 'I', image: require('../../../Assets/Images/share2.png') },
  { key: 'J', image: require('../../../Assets/Images/share1.png') },
  { key: 'K', image: require('../../../Assets/Images/share1.png') },
  { key: 'L', image: require('../../../Assets/Images/share1.png') },
  { key: 'M', image: require('../../../Assets/Images/post1.png') },
  { key: 'N', image: require('../../../Assets/Images/post1.png') },
  { key: 'O', image: require('../../../Assets/Images/Animal.png') },
  { key: 'P', image: require('../../../Assets/Images/post1.png') },
  { key: 'Q', image: require('../../../Assets/Images/Animal.png') },
  { key: 'R', image: require('../../../Assets/Images/post1.png') },
  { key: 'S', image: require('../../../Assets/Images/Animal.png') },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

const numColumns = 3;
const imageHeight = 400;
const Data = [
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
  'item 1',
];
const MyProfileScreen = ({ navigation, route, userReducer, updateProfile }) => {
  const [username, setUsername] = useState(userReducer?.data?.user_name);
  const [userBio, setUserBio] = useState(userReducer?.data?.user_bio);
  const [phone_no, setPhone_no] = useState(userReducer?.data?.user_contact);
  const [email, setemail] = useState(userReducer?.data?.user_email);
  const [countryCodeForPhone, onChangecountryCodeForPhone] = useState(
    userReducer?.data?.user_phoneCountryCode,
  );
  const phoneInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const usernameRegex = /^[a-zA-Z0-9]+$/;

  const [value, setValue] = useState(userReducer?.data?.user_contact);
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity>
          <Image
            style={{ height: 105, width: 105, borderRadius: 10 }}
            source={item.image}
          />
        </TouchableOpacity>
      </View>
    );
  };
  // console.log(userReducer, 'PROFILE SCREEN USERDATA');
  useEffect(() => {
    setValue(userReducer?.data?.user_contact);
  }, []);
  let AnimatedHeaderValue = new Animated.Value(0);
  const Heade_Max = 550;
  const Header_Min = 150;

  const animatedHeaderBgColor = AnimatedHeaderValue.interpolate({
    inputRange: [0, imageHeight],
    outputRange: ['black', '#B01125'],
    extrapolateLeft: 'extend',
    extrapolateRight: 'clamp',
    // extrapolate:'extend',
  });

  const animatedHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, imageHeight],
    outputRange: [imageHeight, 100],
    // outputRange: [imageHeight + 20, 180],
    // extrapolate:'extend',
    extrapolateLeft: 'extend',
    extrapolateRight: 'clamp',
  });

  const animatedImageh = AnimatedHeaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolateLeft: 'extend',
    extrapolateRight: 'clamp',
  });

  const animatedImagep = AnimatedHeaderValue.interpolate({
    inputRange: [90, 90],
    outputRange: [90, 90],
    extrapolateLeft: 'extend',
    extrapolateRight: 'identity',
    extrapolate: 'clamp',
  });

  const animatedImagew = AnimatedHeaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolateLeft: 'extend',
    extrapolateRight: 'clamp',
  });
  const ID = userReducer?.data?.user_id;

  const [countryCode, setCountryCode] = useState('PK');
  const [flagName, setFlagName] = useState('flag-as');
  const [country, setCountry] = useState(userReducer?.data?.user_lives);
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [imageObject, setImageObject] = useState(null);

  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(false);
  const [Sno, setSno] = useState(0);
  const [Pno, setPno] = useState(false);
  const [Fno, setFno] = useState(false);
  const [Pno2, setPno2] = useState(false);
  const [Fno2, setFno2] = useState(false);
  const [local, setlocal] = useState(false);
  console.log("userReducer?.data?.user_lives", userReducer?.data)
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
  };
  const handleafter = (i) => {
    if (i - 1 == Sno) {
      setFno(true)
    } else {
      setSno(Sno + 1)
      setPno(false)
    }
  }
  console.log("yyyyyyyyyyyyyyy", imageObject)
  const handlePrevios = (i) => {
    if (Sno == 0) {
      setPno(true)
    } else {
      setFno(false)
      setSno(Sno - 1)
    }
  }
  const handleafter2 = (i) => {
    if (i - 1 == Sno) {
      setFno2(true)
    } else {
      setSno(Sno + 1)
      setPno2(false)
    }
  }
  console.log("yyyyyyyyyyyyyyy", imageObject)
  const handlePrevios2 = (i) => {
    if (Sno == 0) {
      setPno2(true)
    } else {
      setFno2(false)
      setSno(Sno - 1)
    }
  }
  const openGallery = async () => {
    try {
      await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: true,
        multiple: true,
        maxFiles: 4,
        minFiles: 1
      }).then(image => {
        setSno(0)
        setlocal(true)
        console.log("gjgjbjb j jklhlknlk", image)
        // console.log(image);
        setImageObject(image);
        // setImage(`data:${image[0]?.mime};base64,${image[0]?.data}`);
        // console.log("yyyyyyyyyyyyyyy", imageObject)
      });
    } catch (err) {
      console.log(err, 'Catched.');
    }
  };
  useEffect(() => {
    console.log("userReducer?.data?.user_lives", userReducer?.data)
  }, [])
  const updateProfileChanges = async () => {
    var numbersRegex = /^[0-9]+$/;
    if (numbersRegex.test(value)) {
      const data = {
        user_name: username,
        user_contact: value,
        user_id: ID,
        user_lives: country,
        user_image: userReducer?.data?.user_image,
        imageObj: imageObject,
        country_code: countryCode
          ? countryCode
          : userReducer?.data?.country_code,
        user_phoneCountryCode: countryCodeForPhone,
        user_bio: userBio,
        user_email: email
      };
      console.log("jnksagdkjsakjdkjgkjgkjgkjgjkgkjgk", userReducer?.data?.user_image)
      if (username && country && phone_no) {
        if (usernameRegex.test(username)) {
          setLoading(true);
          await updateProfile(data, _onSuccess, _onFailed);
        } else {
          showMessage({
            message: ' Invalid Username, there might be any space.',
            type: 'danger',
          });
        }
      } else {
        showMessage({
          message: 'All fields are required!',
          // description: 'Invalid Credentials.',
          type: 'danger',
        });
      }
    } else {
      showMessage({
        message: 'Invalid Number',
        // description: 'Invalid Credentials.',
        type: 'danger',
      });
    }
  };
  const _onSuccess = () => {
    setlocal(true)
    setLoading(false);
    ImagePicker.clean().then(() => {
      // console.log('removed all tmp images from tmp directory');
    });
    navigation.goBack();
  };

  const _onFailed = () => {
    setLoading(false);
  };

  useEffect(() => {
    setUsername(userReducer?.data?.user_name);
    if (userReducer?.data?.country_code) {
      setCountryCode(userReducer?.data?.country_code);
    }
  }, [userReducer?.data]);

  // console.log(userReducer?.data, "=================")
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: AnimatedHeaderValue,
                },
              },
            },
          ],
          { useNativeDriver: false },
        )}>
        <View style={[styles.iconContainer]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BMAD', {
                screen: 'BMAD',
                initial: false,
              })
            }>
            <Icon name="arrow-back" size={25} color="white" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} onPress={openGallery}>
            <MaterialIcons name="edit-3" color="white" size={25} style={{}} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={openGallery}>
          <View
            style={[
              styles.imagebackground,
              {
                height: isIOS ? height * 0.45 : height * 0.5,
              },
            ]}>
            <View style={{}} />
            {image !== null || userReducer?.data?.user_image ? (
              <>
              <ActivityIndicator style={{
                marginTop:height*0.22,position:"absolute",alignSelf:"center",
              }} color={"white"} size={"large"}/>
              <Image
                style={[
                  styles.imagebackground,
                  {
                    height: isIOS ? height * 0.45 : height * 0.5,
                    // backgroundColor: animatedHeaderBgColor,
                  },
                ]}
                resizeMode="cover"
                source={{
                  uri: imageObject
                    ? imageObject[Sno]?.path
                    : `${imageUrl}/${userReducer?.data?.user_image?.[Sno]}`,
                }}
              />
              </>
            ) : (
              <Image
                style={[
                  styles.imagebackground,
                  {
                    height: isIOS ? height * 0.45 : height * 0.5,
                    // backgroundColor: animatedHeaderBgColor,
                  },
                ]}
                resizeMode="cover"
                source={require('../../../Assets/Images/test.png')}
              />
            )}
            <View style={[styles.textContainer, isIOS && { top: height * 0.33 }]}>
              <Text style={styles.nameStyles}>{`${username?.length > 17
                ? `${username?.substring(0, 17)}...`
                : username
                }`}</Text>
              <Text
                style={[
                  styles.emailStyles,
                  isIOS && { marginTop: height * 0.007 },
                ]}>
                {userReducer?.data?.user_email}
              </Text>
            </View>
          </View>

        </TouchableOpacity>
        {
          local == false ?

            <View
              style={{ justifyContent: "space-between", flexDirection: "row", marginTop: height * 0.025 }}
            >
              <TouchableOpacity
                disabled={Pno}
                onPress={() => { handlePrevios(userReducer?.data?.user_image?.length) }}
              >
                <Entypo name="chevron-small-left" size={35} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={Fno}
                onPress={() => { handleafter(userReducer?.data?.user_image?.length) }}
              >
                <Entypo name="chevron-small-right" size={35} color="white" />
              </TouchableOpacity>
            </View> :
            <View
              style={{ justifyContent: "space-between", flexDirection: "row", marginTop: height * 0.025 }}
            >
              <TouchableOpacity
                disabled={Pno2}
                onPress={() => { handlePrevios2(imageObject?.length) }}
              >
                {/* <Text>hsadji</Text> */}
                <Entypo name="chevron-small-left" size={35} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={Fno2}
                onPress={() => { handleafter2(imageObject?.length) }}
              >
                <Entypo name="chevron-small-right" size={35} color="white" />
              </TouchableOpacity>
            </View>}
        <View style={styles.formView}>
          <Text style={styles.formLabelStyle}>Username</Text>
          <TextInput
            value={username}
            onChangeText={e => setUsername(e)}
            style={styles.textInputLabel}
          />
          <Text style={styles.formLabelStyle}>User Bio</Text>
          <TextInput
            value={userBio}
            onChangeText={e => setUserBio(e)}
            style={styles.textInputLabel}
          />
          <Text style={styles.formLabelStyle}>Phone Number</Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            addInternationalOption={false}
            defaultCode={countryCodeForPhone || userReducer?.data?.country_code}
            layout="first"
            placeholder="Phone"
            containerStyle={styles.phoneInputContainerStyle}
            textInputStyle={styles.phoneInputTextStyle}
            // codeTextStyle={styles.codeTextStyle}
            textContainerStyle={styles.textContainerStyle}
            // flagButtonStyle={{backgroundColor:'red'}}
            onChangeCountry={c => {
              // console.log(c.cca2, "====================================")
              onChangecountryCodeForPhone(c.cca2);
            }}
            onChangeText={text => {
              setValue(text);
            }}
            onChangeFormattedText={text => {
              setPhone_no(text);
            }}
          />

          <Text style={styles.formLabelStyle}>Country</Text>

          {/* <CountryPicker
            containerButtonStyle={[
              styles.textInputLabel,
              {padding: height * 0.02, color: 'black'},
            ]}
            
            visible
          /> */}
          {/* {...{
              countryCode,
              withFilter,
              withFlag,
              withCountryNameButton,
              withAlphaFilter,
              withCallingCode,
              withEmoji,
            }} */}

          <CountryPicker
            containerButtonStyle={[
              styles.textInputLabel,
              { color: 'white', zIndex: 9999 },
            ]}
            withFilter={true}
            withFlag={true}
            visible={false}
            withCallingCode
            withAlphaFilter
            withCloseButton
            withCountryNameButton
            withEmoji
            withCurrency
            withFlagButton
            withModal
            withCallingCodeButton
            withCurrencyButton
            placeholder={''}
            onSelect={t => {
              console.log("T", t.flag, "==============")
              setFlagName(t.flag);
              setCountryCode(t.cca2);
              setCountry(t.name);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',

              alignSelf: 'center',
              marginTop: isIOS ? height * -0.055 : height * -0.056,

            }}>

            <FlagButton withEmoji={true} countryCode={countryCode} />
            <Text
              style={{
                // width: width * 0.7,
                // marginTop: isIOS ? height * -0.055 : height * -0.056,
                // marginLeft: width * 0.28,
                color: 'black',
                fontSize: width * 0.04,
                fontFamily: 'Poppins-Medium',
              }}>
              {country}
            </Text>
            <View style={{ width: responsiveScreenWidth(10) }} />
          </View>

          <AntDesign
            name="caretdown"
            color="black"
            style={{
              width: width * 0.7,
              marginTop: isIOS ? height * -0.025 : height * -0.025,
              marginLeft: width * 0.16,
              color: 'black',
              fontSize: width * 0.026,
              fontFamily: 'Poppins-Medium',
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
              style={styles.updateBtnStyle}>
              <Text style={styles.btnTxt}>Update</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>

      {/* <View style={{height: '37%'}} /> */}
    </SafeAreaView>
  );
};

function mapStateToProps({ userReducer }) {
  return { userReducer };
}
export default connect(mapStateToProps, actions)(MyProfileScreen);

var styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    width: width * 0.95,
    top: height * 0.06,
    alignSelf: 'center',
    // right: width * 0.03,
    flexDirection: 'row',
    zIndex: 9999,
    // backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  imageStyles: {
    width: width,
    height: height * 0.5,
    borderBottomRightRadius: width * 0.15,
  },
  textContainer: {
    position: 'absolute',
    top: height * 0.38,
    left: width * 0.05,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.007,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
    zIndex: 9999999,
    // minWidth:width * 0.9,
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
  contentbellowImage: {
    // justifyContent: 'space-between',
    // width: 200,
    // backgroundColor:'red',
    right: width * 0.26,
    alignItems: 'center',
    flexDirection: 'row',
    top: height * 0.28,
  },
  upperImage: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '95%',
    top: 20,
    alignItems: 'center',
  },
  image: {
    alignItems: 'center',
    zIndex: 1,
    top: -300,
  },
  imagebackground: {
    // height: 200,
    width: '100%',
    // opacity: 0.85,
    //  borderWidth: 2,
    //  borderColor: 'white'
  },
  container: {
    // height: hp('103%'),
    // backgroundColor: 'white',
    backgroundColor: themeRed,
  },

  btnTxt: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Bold',
  },
  updateBtnStyle: {
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: themeRed,
    width: width * 0.4,
    alignSelf: 'center',
    height: height * 0.07,
    borderRadius: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.07,
    elevation: 9,
  },
  touchableOpacity: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'white',
    width: wp('100%'),
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    bottom: 20,
    marginTop: 10,
  },
  touchableOpacity1: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'white',
    width: wp('29%'),
    height: hp('4%'),
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    elevation: 4,
    zIndex: 999,
  },
  container2: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: -4,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },

  formView: {
    paddingHorizontal: width * 0.05,
    // marginBottom: height * 0.15,
    // backgroundColor: 'red',
    backgroundColor: themeRed,
  },
  formLabelStyle: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    backgroundColor: themeRed,
    marginVertical: height * 0.01,
  },
  textInputLabel: {
    borderColor: 'white',
    backgroundColor: 'white',
    width: width * 0.9,
    fontFamily: 'Poppins-Medium',
    borderRadius: width * 0.3,
    fontSize: width * 0.04,
    height: height * 0.08,
    paddingHorizontal: width * 0.05,
    elevation: 20,
  },
  phoneInputContainerStyle: {
    // backgroundColor: 'green',
    borderRadius: 50,
    color: 'black',
    height: height * 0.0755,
    width: width * 0.9,
  },
  phoneInputTextStyle: {
    color: 'black',
    height: height * 0.07,
    paddingVertical: 0,
    // backgroundColor: 'purple',
  },
  codeTextStyle: {
    color: 'black',
  },
  textContainerStyle: {
    color: 'black',
    borderRadius: 50,
    // backgroundColor:'lightgreen'
  },
});
