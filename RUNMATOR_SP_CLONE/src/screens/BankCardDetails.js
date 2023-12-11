import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions, SafeAreaView,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Button from '../components/Button';
import Inputbox from '../components/Inputbox';
import * as actions from '../store/Actions/index';
import background_img from '../assets/backgroung-image.png';
import Heading from '../components/Heading';
import colors from '../assets/colors';
import { StripeProvider } from '@stripe/stripe-react-native';
import StripeCardComp from '../components/StripeCardComp';
import { connect, useSelector } from 'react-redux';
// import { PUB_KEY_STRIPE } from '../configurations/config';

import LottieView from 'lottie-react-native';
import Header from '../components/Header';
import Toast from 'react-native-toast-message';
import NetInfo from "@react-native-community/netinfo";
import { PUB_KEY_STRIPE } from '../config';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const BankCardDetails = ({ navigation, saveCard, UserReducer, getCard, card }) => {
  const [stripeGeneratedKey, setStripeGeneratedKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const stripeRef = useRef(null)
  const [connection, setConnection] = useState(true)
  const data = useSelector((state) => state)

  const userid = data?.user?.data?.id
  console.log("=============================", userid)
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setConnection(state.isConnected)
    });
    setIsLoading(true)
    getCard(UserReducer?.userData?.id)
      .then(() => setIsLoading(false))
    return () => {
      unsubscribe();
    }
  }, [])

  useEffect(() => {
    if (stripeRef?.current) {
      stripeRef?.current.clear()
    }
  }, [connection])

  const _onPressSignUp = async () => {
    if (connection) {
      if (stripeGeneratedKey === '') {
        Toast.show({ type: 'error', text1: 'Card number is required' })
      } else {
        console.log("++++++++++++++++++++++++", userid, stripeGeneratedKey)
        console.log(data)
        setIsLoading(true)
        saveCard(userid, stripeGeneratedKey)
          .then(() => {
            setStripeGeneratedKey("")
            Toast.show({ type: 'success', text1: "Save successfully" })
            setTimeout(() => {
              navigation?.navigate("Home")
            }, 500);
            setIsLoading(false)
          })
          .catch((err) => {
            console.log(err.response?.data)
            setIsLoading(false)
          })

      }
    } else {
      Toast.show({ type: "error", text1: "please check your connection" })
    }
  };

  const _onSignUpFailed = () => {
    setIsLoading(false);
  };

  console.log("aa", card)
  return (
    <ImageBackground source={background_img} style={styles.image}>
      <SafeAreaView>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Button
            title="Back"
            onBtnPress={() => navigation.goBack()}
            isBgColor={false}
            btnStyle={styles.backButton}
          // btnTextStyle={styles.btnTextStyle}
          />
          <View style={styles.centerView}>
            <Heading
              title="BANK ACCOUNT DETAILS"
              fontType="extra-bold"
              passedStyle={styles.heading}
            />

            <View style={styles.stripeInputView}>
              <StripeProvider publishableKey={PUB_KEY_STRIPE}>
                <StripeCardComp myRef={stripeRef} setId={setStripeGeneratedKey} />
              </StripeProvider>
            </View>
            {!connection ? <Text style={{ color: 'red', fontSize: 11, textAlign: 'center', marginVertical: 10 }}>Please check your internet connection</Text> : null}
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
                title="Save"
                disable={!stripeGeneratedKey}
                onBtnPress={() => _onPressSignUp()}
                isBgColor={true}
                btnStyle={styles.btnStyle}
                btnTextStyle={styles.btnTextStyle}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: width * 0.2,
    borderWidth: 0,
    margin: 0,
    borderRadius: 0,
  },
  stripeInputView: {
    flexDirection: 'row',
    marginHorizontal: width * 0.03,
    marginVertical: height * 0.03,
  },
  centerView: {
    height: height,
    alignItems: 'center',
    marginTop: height * 0.15,
  },
  lottieStyles: {
    height: height * 0.12,
    width: 100,
  },
  heading: {
    color: colors.themeBlue,
    textAlign: 'center',
    fontSize: width * 0.075,
  },
  btnStyle: {
    backgroundColor: colors.themeBlue,
    borderRadius: width * 0.8,
    width: width * 0.8,
  },
  btnTextStyle: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },

  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: width * 0.5,
  },
  image: {
    width: width,
    height: height,
  },
  inputBoxes: {
    marginTop: height * 0.02,
  },
});

function mapStateToProps({ UserReducer, card }) {
  return { UserReducer, card }
}

export default connect(mapStateToProps, actions)(BankCardDetails);
