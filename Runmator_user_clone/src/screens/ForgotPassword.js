import React, { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import background_img from '../assets/backgroung-image.png';
import Inputbox from '../components/Inputbox';
import LottieView from 'lottie-react-native';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import colors from '../assets/colors';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import * as actions from "../store/Actions/index"
import Header from '../components/Header';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ForgotPassword = ({ navigation, resetPassword }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setEmail("")
    });
  }, [navigation])
  const _onPress = () => {
    if (email === '') {
      Toast.show({ type: 'error', text1: 'required email' })
    } else {
      setLoading(true)
      resetPassword({ email }).then((res) => {
        console.log("respo__+++", res)
        setLoading(false)
        Toast.show({ type: 'success', text1: res.data?.msg })
      })
        .catch((err) => {
          setLoading(false)
          if (err.response.data) {
            console.log("erre-=-=-==", err)
            Toast.show({ type: "success", text1: "Invalid email" })
          } else {
            Toast.show({ type: "error", text1: "please check your connection" })
          }
        })
    }
  };
  return (
    <>
      <Header showBack={true} navigation={navigation} iconName="arrow-back" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={background_img} style={styles.image}>
          <Heading title="FORGOT PASSWORD" fontType='extra-bold' passedStyle={styles.heading} />

          <View style={styles.inputBoxes}>
            <Inputbox
              value={email}
              setTextValue={setEmail}
              placeholderTilte="Email"
              placeHolderColor={"gray"}
            />
          </View>
          {loading ? (
            <LottieView
              speed={1}
              style={styles.lottieStyles}
              autoPlay
              colorFilters={'blue'}
              loop
              source={require('../assets/Lottie/loading-blue.json')}
            />) : (<Button disable={loading} title={loading ? "...loading" : "Submit"} onBtnPress={() => _onPress()} />)
          }
        </ImageBackground>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  lottieStyles: {
    height: height * 0.12,
    width: 100,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: colors.themeBlue,
    fontSize: width * 0.1,
    paddingHorizontal: width * 0.1,
    textAlign: 'center',
    lineHeight: height * 0.07,
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: width * 0.5,
  },
  image: {
    justifyContent: 'center',
    width: width,
    height: height,
    alignSelf: 'center',
    alignItems: 'center',
  },
  scrollview: {
    height: height,
  },
  inputBoxes: {
    marginTop: height * 0.02,
  },
});

export default connect(null, actions)(ForgotPassword);
