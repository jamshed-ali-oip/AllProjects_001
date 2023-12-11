import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  View,
  TouchableOpacity,
  Platform,
  Image,
  SafeAreaView,
  Linking,
  StatusBar,
  Text,
  Modal,
  Pressable
} from 'react-native';
import colors from '../assets/colors';
import Button from '../components/Button';
import IconComp from '../components/IconComp';
import LottieView from 'lottie-react-native';
import Header from '../components/Header';
import BottomSheet from '../components/BottomSheet';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { connect } from 'react-redux';
import * as actions from '../store/Actions/index';
import Heading from '../components/Heading';
import Geolocation from '@react-native-community/geolocation';
// import Loader from "../components/Loader"
import { useDispatch } from 'react-redux';
import { PUB_KEY_STRIPE, imageUrl2 } from '../configurations/config';
import { GET_CURRENT_LOC } from '../store/Actions/actionType';
import Toast from 'react-native-toast-message';
import { CardField, StripeProvider } from '@stripe/stripe-react-native';
import StripeCardComp from '../components/StripeCardComp';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.010101;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({
  UserReducer,
  navigation,
  requestForService,
  route,
  getCurrentBookings,
  getMechanics,
  mechanics,
  sendRequest,
  currentBooking,
  getCurrentBooking,
  cancelBooking,
  sendNotification
}) => {
  const sheetRef = useRef();
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = UserReducer?.accessToken;
  const stripeRef = useRef(null)
  const [stripeGeneratedKey, setStripeGeneratedKey] = useState('');
  console.log("setStripeGeneratedKey", stripeGeneratedKey)
  // console.log(UserReducer?.userData)
  const [location, setLocation] = useState('Karachi');
  const [phoneNumber, setPhoneNumber] = useState('030322221112');
  const [test, setTest] = useState('');
  const [reqLoading, setReqLoading] = useState(false);
  const [SpecData, setSpecData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const SERVICE = route?.params?.item;
  const dispatch = useDispatch()
  const Requetsing = () => {

    setReqLoading(true)
    sendRequest({
      user_id: UserReducer?.userData?.id,
      provider_id: SpecData.user_id,
      service_id: SpecData.service_id,
    }).then(res => {
      sendNotification({
        title: "Request",
        body: `${UserReducer?.userData?.name} Send Request`,
        id: SpecData.user_id
      })
      Toast.show({ type: 'success', text1: "Successfully send Request" })
      getCurrentBooking({
        user_id: UserReducer?.userData?.id,
        role: 2
      })
      setReqLoading(false)
      console.log(res.data)
    }).catch(err => {
      setReqLoading(false)
      Toast.show({ type: 'error', text1: err?.response?.data?.message })
      // alert(err?.response?.data?.message)
    })

  }
  useEffect(() => {
    console.log("lat:", UserReducer?.coords?.lat,
      "long:", UserReducer?.coords?.lng,)
    console.log("userID", UserReducer?.userData?.id, "service_id", SERVICE.id)
    setIsLoading(true)

    getMechanics({
      user_id: UserReducer?.userData?.id,
      service_id: SERVICE.id,
      lat: UserReducer?.coords?.lat,
      long: UserReducer?.coords?.lng,
      // lat:24.815095452706,
      // long:67.137794494629,
      radius: 100
    }).then(() => setIsLoading(false))
  }, [UserReducer?.coords])

  // Option Press Handler
  const onItemPress = (item, index) => {
    setModalData(item);
    // setIsModalVisible(true);
    sheetRef.current.open();
  };

  const _onPressStartTracking = () => {
    console.log('start tracking');
    sheetRef.current.close();
  };

  const _onPressCallNow = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const confirmBooking = () => {
    setIsLoading(true);
    const apiData = {
      user_id: 12,
      service_id: SERVICE?.id,
      lat: coordinates?.lat,
      long: coordinates?.lng,
      radius: 1000,
    };
    requestForService(
      apiData,
      accessToken,
      _onFailed,
      _onPressModalSuccessButton,
      isLoading,
    );
    setIsLoading(false);
  };

  const _onFailed = () => {
    setIsLoading(false);
  };

  const _onPressModalSuccessButton = () => {
    navigation.navigate('Home');
  };

  // console.log("m,echanis",mechanics)
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LottieView
          speed={1}
          style={styles.lottieStyles}
          autoPlay
          colorFilters={'blue'}
          loop
          source={require('../assets/Lottie/loading-yellow.json')}
        />
      </View>
    )
  }

  function renderBtn() {

    if (currentBooking.booking) {

      if (currentBooking?.booking[0]?.status == "pending") {
        return (
          <Button
            title="Cancel"
            onBtnPress={() => {
              setReqLoading(true)
              cancelBooking({
                user_id: UserReducer?.userData?.id,
                role: 2
              }).then(() => {
                sendNotification({
                  title: "Cancel",
                  body: `${UserReducer?.userData?.name} Canceled Request`,
                  id: currentBooking?.provider[0]?.id
                })
                Toast.show({ type: 'success', text1: "Cancel request Successfully" })
                getCurrentBooking({
                  user_id: UserReducer?.userData?.id,
                  role: 2
                })
                setReqLoading(false)
              })
            }}
            isBgColor={true}
            btnStyle={styles.btnStyle}
            btnTextStyle={styles.btnTextStyle}
          />
        )
      } else {
        return null
      }

    } else {
      return null
    }
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* {coordinates !== null && coordinates != undefined ? (
          <ImageBackground
            style={styles.loadMapStyle}
            source={require('../assets/Map.png')}>
            <LottieView
              speed={1}
              style={styles.lottieLoad}
              autoPlay
              colorFilters={'blue'}
              loop
              source={require('../assets/Lottie/loading-blue.json')}
            />
          </ImageBackground>
        ) :  */}

        <>
          <Header
            showBack={true}
            navigation={navigation}
            iconName="arrow-back"
          />
          <View
            style={{
              width: width,
              height: height,
              position: 'absolute',
              top: height * (Platform.OS == "ios" ? 0.08 : 0.08),
            }}
          >
            <MapView
              style={{
                width: width,
                height: height,
              }}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: UserReducer?.coords?.lat,
                longitude: UserReducer?.coords?.lng,
                // latitude: 48.8566,
                // longitude: 2.3522,
                latitudeDelta: 0.22,
                longitudeDelta: 0.22,
              }}
              region={{
                latitude: (UserReducer?.coords?.lat) ? (UserReducer?.coords?.lat) : 24.792558423984094,
                longitude: (UserReducer?.coords?.lng) ? (UserReducer?.coords?.lng) : 67.06577445573828,
                // latitude: 48.8566,
                // longitude: 2.3522,
                latitudeDelta: 0.22,
                longitudeDelta: 0.22,
              }}>
              <MapView.Circle
                key={(
                  ((UserReducer?.coords?.lat) ? (UserReducer?.coords?.lat) : 24.792558423984094) + ((UserReducer?.coords?.lng) ? (UserReducer?.coords?.lng) : 67.06577445573828)
                  // ||
                  // UserReducer?.coords?.lat + UserReducer?.coords?.lng
                ).toString()}
                center={{
                  latitude: (UserReducer?.coords?.lat) ? (UserReducer?.coords?.lat) : 24.792558423984094,
                  longitude: (UserReducer?.coords?.lng) ? (UserReducer?.coords?.lng) : 67.06577445573828,
                  // latitude: 48.8566,
                  // longitude: 2.3522,
                }}
                radius={10000}
                strokeWidth={1}
                strokeColor={'#1a66ff'}
              />
              {/* <Marker
              coordinate={{
                latitude:UserReducer?.coords?.lat,
                longitude:UserReducer?.coords?.lng,
                // latitude: 48.8566,
                // longitude: 2.3522,
              }}/> */}

              {mechanics?.map((item => {
                console.log(",sj,dfj,dsjfk", Number(item?.lat), Number(item?.lng))
                return (
                  <Marker
                    key={item?.id}
                    image={require('../assets/Car.png')}
                    coordinate={{
                      latitude: Number(item?.lat),
                      longitude: Number(item?.lng),
                      // latitude: 37.4220936,
                      // longitude: -122.083922,

                    }}>
                    <Callout
                      // onPress={() => { setSpecData(item) }}

                      // =======================================>>>>>>>>>>>>>>>>>>>>>>>ye kam ka code hai 
                      onPress={() => {
                        setReqLoading(true)
                        sendRequest({
                          user_id: UserReducer?.userData?.id,
                          provider_id: item?.user_id,
                          service_id: item?.service_id,
                          price: item?.price
                        }).then(res => {
                          console.log("object", res)
                          sendNotification({
                            title: "Request",
                            body: `${UserReducer?.userData?.name} Send Request`,
                            id: item.user_id
                          })
                          Toast.show({ type: 'success', text1: "Successfully send Request" })
                          getCurrentBooking({
                            user_id: UserReducer?.userData?.id,
                            role: 2
                          })
                          setReqLoading(false)
                          console.log("mydatatatata", res.data)
                        }).catch(err => {
                          setReqLoading(false)
                          Toast.show({ type: 'error', text1: err?.response?.data?.message })
                          // alert(err?.response?.data?.message)
                        })
                      }}
                    >
                      <TouchableOpacity
                        style={{ backgroundColor: 'white', padding: 5, borderRadius: 7 }}>
                        {console.log(imageUrl2 + "/" + UserReducer?.userData?.profile_image)}
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                          {console.log("asaaa", UserReducer?.userData?.profile_image)}
                          <Text>
                            <Image
                              style={{ width: 30, height: 30, borderRadius: 15 }}
                              source={{ uri: imageUrl2 + "/" + UserReducer?.userData?.profile_image }}
                              resizeMode="cover"
                            />
                          </Text>
                        </View>
                        <Text style={{ fontSize: 10, textAlign: 'center', color: 'black' }}>{item.name}</Text>
                        <Text style={{ fontSize: 10, textAlign: 'center', color: 'black' }}>Rating {item?.booking_rating}</Text>
                        <Text style={{ fontSize: 10, textAlign: 'center', color: 'black' }}>Price: <Text style={{ color: 'green', fontWeight: 'bold' }}>${item.price ? item.price : 0}</Text></Text>
                        <View style={{ backgroundColor: colors.themeBlue, padding: 2, justifyContent: 'center', alignItems: 'center', marginTop: 2, borderRadius: 3 }}>
                          <Text style={{ fontSize: 8, color: 'white', textAlign: 'center', paddingHorizontal: 5 }}>Send Request</Text>
                        </View>
                      </TouchableOpacity>
                    </Callout>
                  </Marker>
                )
              }))}
            </MapView>
          </View>
          <View style={styles.contentContainer}>
            <View
              style={{
                height: height * 0.4,
                // shadowColor: '#000',
                // shadowOffset: {
                //   width: 0,
                //   height: 2,
                // },
                // shadowOpacity: 0.25,
                // shadowRadius: 3.84,
                // backgroundColor: 'white',
                // elevation: 5,
              }}>
              {/* Rider Search Component  */}
              <GooglePlacesAutocomplete
                placeholder="Enter Your Location"
                fetchDetails={true}
                enablePoweredByContainer={false}
                onPress={(data, details = null) => {
                  // console.log(details?.geometry?.location);
                  dispatch({ type: GET_CURRENT_LOC, payload: details?.geometry?.location })
                  // setCoordinates(details?.geometry?.location);
                  setLocation(data?.description);
                }}
                query={{
                  // key: 'AIzaSyAE-uaXvfrMbCdPVqIF3xL_4pfzocEdM48',
                  key: 'AIzaSyDbfe81P6fqd8NqubnkPwme5ZTTKcLHg_4',
                  // key: 'AIzaSyBc18nAlur3f5u6N1HGgckDFyWW5IfkKWk',
                  language: 'en',
                }}
                onFail={err => console.log('error is here:::', err)}
                renderLeftButton={() => (
                  <IconComp
                    iconName="location-pin"
                    type="Entypo"
                    passedStyle={styles.locationIcon}
                  />
                )}
                styles={{
                  textInputContainer: {
                    width: width * 0.9,
                    backgroundColor: 'white',
                    borderRadius: width * 0.025,
                    height: height * 0.084,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  },
                  textInput: {
                    borderRadius: width * 0.025,
                    height: height * 0.084,
                    color: '#5d5d5d',
                    fontSize: width * 0.04,
                  },
                }}
              />
            </View>

            {/* Current Location & Confirm Button Container  */}
            <View style={{ position: 'absolute', bottom: height * -0.76 }}>
              {/* Current Location  */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Geolocation.getCurrentPosition(
                    position => {
                      dispatch({
                        type: GET_CURRENT_LOC,
                        payload: {
                          lat: position.coords.latitude,
                          lng: position.coords.longitude,
                        }
                      })
                    },
                    error => {
                      console.log(error.message);
                    },
                    {
                      enableHighAccuracy: false,
                      timeout: 30000,
                      maximumAge: 1000,
                    },
                  );
                }}
                style={styles.boxContainer2}>
                <IconComp
                  iconName="my-location"
                  type={'MaterialIcons'}
                  passedStyle={styles.myLocIconStyle}
                />
              </TouchableOpacity>

              {/* Confirm Button  */}
              {reqLoading ? (
                <View style={styles.lottieContainer}>
                  <LottieView
                    speed={1}
                    style={styles.lottieStyles}
                    autoPlay
                    colorFilters={'blue'}
                    loop
                    source={require('../assets/Lottie/loading-yellow.json')}
                  />
                  <Heading
                    title={'Requesting...'}
                    passedStyle={styles.requestLabel}
                  />
                </View>
              ) : (
                <>
                  {renderBtn()}
                </>
              )}
            </View>
          </View>
        </>

        {/* Bottom Sheet Component  */}
        <BottomSheet
          sheetRef={sheetRef}
          onPress={_onPressStartTracking}
          onPressCallNow={_onPressCallNow}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <StripeProvider publishableKey={PUB_KEY_STRIPE}>
                <CardField
                  postalCodeEnabled={true}
                  placeholders={{
                    number: '4242 4242 4242 4242',
                  }}
                  cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                  }}
                  style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                  }}
                  onCardChange={(cardDetails) => {
                    console.log('cardDetails', cardDetails);
                  }}
                  onFocus={(focusedField) => {
                    console.log('focusField', focusedField);
                  }}
                />
              </StripeProvider>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myLocIconStyle: {
    fontSize: width * 0.08,
  },
  lottieStyles: {
    // height: height * 0.12,
    width: 100,
    // marginLeft: width * 0.03,
    // marginTop: height * -0.01,
  },
  lottieLoad: {
    height: height * 0.3,
    marginTop: height * -0.01,
  },
  loadMapStyle: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestLabel: {
    fontSize: width * 0.055,
    color: 'white',
    // backgroundColor: 'red',
    position: 'absolute',
    marginLeft: width * 0.3,
    top: height * 0.02,
    zIndex: 999,
  },
  lottieContainer: {
    backgroundColor: colors.themeBlue,
    borderRadius: width * 0.02,
    width: width * 0.9,
    height: height * 0.08,
    justifyContent: 'center'
  },
  locationIcon: {
    color: 'gray',
    alignSelf: 'center',
    fontSize: width * 0.052,
    paddingLeft: width * 0.03,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: width * 0.05,
    justifyContent: 'space-between',
    marginVertical: height * 0.03,
  },
  btnStyle: {
    backgroundColor: colors.themeBlue,
    borderRadius: width * 0.02,
    width: width * 0.9,
    margin: 0,
    marginTop: height * 0.03,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: 'Montserrat-Bold',
  },
  image: {
    width: width,
    height: height * 0.92,
    alignItems: 'center',
  },

  boxContainer: {
    flexDirection: 'row',
    paddingHorizontal: width * 0.05,
    justifyContent: 'space-between',
    borderRadius: width * 0.02,
    height: height * 0.13,
    width: width * 0.9,
    marginTop: height * 0.12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: '#fff',
  },

  boxContainer2: {
    borderRadius: width * 0.02,
    height: height * 0.07,
    width: width * 0.15,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    // marginLeft: width * 0.6,
    shadowColor: '#000',
    shadowOffset: {
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: '#fff',
  },

  text: {
    fontSize: height * 0.025,
    color: 'black',
    marginLeft: width * 0.03,
  },

  textMechanic: {
    fontSize: height * 0.017,
    color: 'gray',
    marginLeft: width * 0.03,
  },

  icon_style: {
    marginLeft: width * 0.14,
  },

  header: {
    backgroundColor: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: height * 0.3,
    width: width * 0.8
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const mapStateToProps = ({ UserReducer, mechanics, currentBooking }) => {
  return { UserReducer, mechanics, currentBooking };
};

export default connect(mapStateToProps, actions)(Map);
/* <StatusBar
          translucent
          animated={true}
          backgroundColor="red"
          barStyle="dark-content"
          showHideTransition="slide"
        /> */
