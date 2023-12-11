import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  StatusBar,
  ScrollView,
  ImageBackground,
  RefreshControl,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {themePurple} from '../assets/colors/colors';
import {connect} from 'react-redux';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
import * as actions from '../store/Actions/index';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');
const image = require('../assets/images/login_bg.png');

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const ViewAuthCredentials = ({
  UserReducer,
  getCredentials,
  route,
  navigation,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const TYPE = route?.params?.type;

  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  const accessToken = UserReducer?.accessToken;

  const apiData = {
    type: TYPE,
    email: UserReducer?.userData?.email,
  };

  useEffect(() => {
    getAccountCredentials();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(async () => {
      setRefreshing(false);
      setIsLoading(true);
      await getCredentials(apiData, accessToken);

      setIsLoading(false);
    });
  }, []);

  const getAccountCredentials = async () => {
    setIsLoading(true);
   await getCredentials(apiData, accessToken);
    setIsLoading(false);
  };
  return (
    <ImageBackground source={image} resizeMode="cover" style={{flex: 1}}>
      {Platform?.OS !== 'ios' && (
        <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
          <StatusBar
            translucent
            backgroundColor={themePurple}
            barStyle="light-content"
          />
        </View>
      )}

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <LottieView
            speed={1}
            style={styles.lottieStyle}
            autoPlay
            loop
            source={require('../assets/lottie/purple-loading-2.json')}
          />
          <Text style={styles.fetchTextStyle}>Fetching Data..</Text>
        </View>
      ) : (
        <>
          {/* Header  */}
          <View style={styles.headerStyle}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: width * 0.15,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <IconComp
                iconName={'arrow-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.052}}
              />
            </TouchableOpacity>

            <Image
              style={{height: 50, width: 50}}
              source={require('../assets/images/app-logo.png')}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: width * 0.15,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                onRefresh();
              }}>
              <Image
                style={{
                  height: 22,
                  width: 22,
                  tintColor: 'white',
                }}
                source={require('../assets/images/refresh.png')}
              />
            </TouchableOpacity>
          </View>

          {/* ScrollView  */}
          <ScrollView
            nestedScrollEnabled={true}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <Text style={styles.main_title}>
              {`${TYPE === 'airbnb' ? 'Air BnB' : TYPE} Credentials`}
            </Text>

            {UserReducer?.credentials !== null ? (
              <>
                {/* Email  */}
                <View style={styles.viewContainer}>
                  <Heading
                    title={'Email-Address:'}
                    passedStyle={styles.textStyle}
                    fontType="medium"
                  />
                  <Heading
                    title={UserReducer?.credentials?.email}
                    passedStyle={styles.emailStyle}
                    fontType="medium"
                  />
                </View>

                {/* Password  */}
                <View style={styles.passwordViewContainer}>
                  <Heading
                    title={'Password:'}
                    passedStyle={[styles.textStyle]}
                    fontType="medium"
                  />
                  <View style={{flexDirection: 'row', marginTop: -9}}>
                    <TextInput
                      secureTextEntry={isVisible}
                      editable={false}
                      value={UserReducer?.credentials?.password}
                      style={[
                        styles.textStyle,

                        isVisible && {fontSize: width * 0.065},
                        {
                          width: width * 0.7,
                        },
                      ]}
                    />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        width: width * 0.15,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setIsVisible(!isVisible);
                      }}>
                      <IconComp
                        iconName={isVisible ? 'eye-off' : 'eye'}
                        type="Ionicons"
                        passedStyle={{color: 'white', fontSize: width * 0.052}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            ) : (
              <View style={styles.viewContainer}>
                <Heading
                  title={'No Credentials Found!'}
                  passedStyle={styles.textStyle}
                  fontType="medium"
                />
                <Heading
                  title={'Swipe Down To Refresh.'}
                  passedStyle={styles.textStyle}
                  fontType="medium"
                />
              </View>
            )}
          </ScrollView>
        </>
      )}
    </ImageBackground>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {
    UserReducer,
  };
};
export default connect(mapStateToProps, actions)(ViewAuthCredentials);

const styles = StyleSheet.create({
  lottieStyle: {
    height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    // backgroundColor: 'red',
    // position: 'absolute',
    // top:100,
    marginTop: Platform?.OS === 'ios' ? height * -0.037 : height * -0.06,
    // zIndex: 99999,
    // left: width * 0.04,
  },
  fetchTextStyle: {
    marginTop: height * -0.15,
    color: 'white',
    fontSize: width * 0.07,
    fontFamily: 'Poppins-Bold',
  },
  loaderContainer: {
    marginTop: height * 0.36,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: width * 0.03,
    justifyContent: 'center',
    width: width * 0.63,
    alignSelf: 'center',
  },
  viewContainer: {
    borderRadius: width * 0.04,
    height: height * 0.1,
    backgroundColor: themePurple,
    width: width * 0.9,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.01,
  },
  passwordViewContainer: {
    backgroundColor: themePurple,
    borderRadius: width * 0.04,
    height: height * 0.1,
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.01,
  },
  main_title: {
    marginVertical: height * 0.02,
    fontSize: width * 0.06,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    alignSelf: 'center',
    width: width * 0.5,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: width * 0.04,
  },
  textStyle: {
    color: 'white',
    fontSize: width * 0.045,
    fontFamily: 'Poppins-Medium',
  },
  emailStyle: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Medium',
  },
  headerStyle: {
    flexDirection: 'row',
    width: width,
    marginTop: Platform.OS == 'ios' ? height * 0.05 : height * 0.02,
    paddingVertical: height * 0.01,
    justifyContent: 'space-between',
  },
});
