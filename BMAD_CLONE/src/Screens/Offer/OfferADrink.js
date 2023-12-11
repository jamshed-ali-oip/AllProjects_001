import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  Dimensions,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppText from './../../Components/AppText';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SplashScreen from 'react-native-splash-screen';
import * as actions from '../../Store/Actions/index';
import LottieView from 'lottie-react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { imageUrl } from '../../Config/Apis.json';
import { themeRed } from '../../Assets/Colors/Colors';
import { responsiveHeight, responsiveScreenFontSize } from 'react-native-responsive-dimensions';

const { width, height } = Dimensions.get('window');

const OfferADrink = ({
  usersNearmeReducer,
  navigation,
  userReducer,
  connectUser,
  deductDrinksAfterRequestSent,
}) => {
  const NEARME_USERDATA = usersNearmeReducer?.user;
  const [loading, setLoading] = useState(false);

  // send request to drink buddy
  const _onPressConfirm = async () => {

    setLoading(true);

    const apiData = {
      user: userReducer?.data?.user_id,
      friend: NEARME_USERDATA?.user_id,
    };
    // console.log("http://192.168.0.136:3000", apiData)
    await connectUser(apiData, onSuccess, NEARME_USERDATA, _onRequestFialed);
    setLoading(false)
  };

  const onSuccess = () => {
    deductDrinksAfterRequestSent();
    // setLoading(false);
    navigation.navigate('ProceedToPay');
  };

  const _onRequestFialed = () => {
    setLoading(false);
  };


  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent backgroundColor="transparent" />

      <AppText
        nol={1}
        textAlign="left"
        family="Poppins-SemiBold"
        size={width * 0.13}
        color="white"
        Label={'Cheers!'}
      />
      <View style={{ height: responsiveHeight(60), width: '100%', alignSelf: 'center', justifyContent: 'flex-start', alignItems: 'center' }}>
        <View style={{ height: 100 }}></View>
        <View style={styles.contentContainer}>

          <View style={styles.userInfoContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.imageStyles}
                // resizeMethod="auto"
                source={
                  userReducer?.data?.user_image !== null &&
                    userReducer?.data?.user_image !== undefined
                    ? { uri: `${imageUrl}/${userReducer?.data?.user_image}` }
                    : require('../../Assets/Images/placeholderImage.png')
                }
              />
            </View>
            <View style={styles.loaderContainer}>
              <Image
                style={styles.imageStyles}
                source={
                  NEARME_USERDATA?.user_image !== null &&
                    NEARME_USERDATA?.user_image !== undefined
                    ? { uri: `${imageUrl}/${NEARME_USERDATA?.user_image}` }
                    : require('../../Assets/Images/placeholderImage.png')
                }
              />
            </View>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <AppText
            nol={5}
            textAlign="center"
            family="Poppins-SemiBold"
            size={width * 0.045}
            color="white"
            Label={`Proceed to Offer a Drink to ${NEARME_USERDATA?.user_name} Today!`}
          />
        </View>
        {loading ? (
          <>
            <LottieView
              style={styles.lottieStyles}
              source={require('../../Assets/Lottie/white-loader.json')}
              autoPlay
              loop
            />
            <Text style={styles.pleaseWait}>Please Wait</Text>
          </>
        ) : (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => _onPressConfirm()}
              style={styles.touchableOpacity}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-SemiBold"
                size={width * 0.045}
                color={'white'}
                Label={'Confirm'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.touchableOpacity, { marginTop: height * 0.02 }]}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-SemiBold"
                size={width * 0.045}
                color={'white'}
                Label={'Later'}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>


    </View>
  );
};

const mapStateToProps = ({ userReducer, usersNearmeReducer }) => {
  return { userReducer, usersNearmeReducer };
};
export default connect(mapStateToProps, actions)(OfferADrink);

var styles = StyleSheet.create({
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: height * 0.05,
  },
  pleaseWait: {
    color: 'white',
    fontSize: width * 0.045,
    position: 'absolute',
    bottom: height * 0.1,
    // left: width * 0.37,
    fontFamily: 'Poppins-Bold',
  },
  lottieStyles: {
    position: 'absolute',
    bottom: height * 0.02,
    // left: width * 0.15,
    // backgroundColor:'white',
    width: width * 0.4,
    height: height * 0.3,
  },
  actionContainer: {
    top: height * 0.17,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
  },
  loaderContainer: {
    position: 'absolute',
  },
  imageStyles: {
    width: responsiveHeight(20),
    height: responsiveHeight(20),
    borderRadius: responsiveScreenFontSize(50),
    borderWidth: 1,
    borderColor: themeRed,
  },
  imageContainer: {
    position: 'absolute',
    left: 10,
  },
  userInfoContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    right: 50,
  },
  contentContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    position: 'relative',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  mainContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeRed,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white',
  },
  touchableOpacity: {
    backgroundColor: themeRed,
    borderWidth: 2,
    borderColor: 'white',
    width: width * 0.5,
    height: height * 0.07,
    justifyContent: 'center',
    borderRadius: 35,
    alignItems: 'center',
  },
  touchableOpacityText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: width * 0.04,
    textAlign: 'center',
  },
});
