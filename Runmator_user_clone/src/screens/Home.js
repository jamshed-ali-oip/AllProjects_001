import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  LogBox,
  SafeAreaView,
  FlatList,
  Text,
  Modal,
  TouchableOpacity
} from 'react-native';
import Heading from '../components/Heading';
import car from '../assets/Car.png';
import battery from '../assets/Battery.png';
import wave from '../assets/Wave.png';
import wheel from '../assets/Wheel.png';
import construction from '../assets/Construction.png';
import colors from '../assets/colors';
import BoxComp from '../components/BoxComp';
import Button from '../components/Button';
import Header from '../components/Header';
import OptionsMapper from '../components/OptionsMapper';
import * as actions from '../store/Actions/index';
import { connect, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { PUB_KEY_STRIPE, imageUrl2 } from '../configurations/config';

import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import RatingModal from '../components/RatingModal';
import { CardField, StripeProvider } from '@stripe/stripe-react-native';
import StripeCardComp from '../components/StripeCardComp';


LogBox.ignoreLogs(['new NativeEventEmitter']);

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Home({ navigation, UserReducer, getAllServices, ServicesReducer, currentBooking, getCurrentBooking, cancelBooking, completeBooking, sendNotification, RequestPayment }) {
  const [services, setServices] = useState([]);
  let isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [reqLoading, setReqLoading] = useState(false);
  const accessToken = UserReducer?.accessToken;
  const [ratingModal, setRatingModal] = useState(false)
  const [currentRating, setCurrentRating] = useState({})
  const [PaymentDone, setPaymentDone] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [stripeGeneratedKey, setStripeGeneratedKey] = useState('');
  const stripeRef = useRef(null)
  console.log("object", stripeGeneratedKey)
  const [options, setOptions] = useState(dummyOptions);
  let name = UserReducer?.userData?.name.split(' ')[0];
  console.log("stripeGeneratedKey0000", stripeGeneratedKey)
  useEffect(() => {
    const subsscribe = messaging().onMessage((remoteMessage) => {
      if (remoteMessage.notification.title == "Accepted") {
        getCurrentBooking({
          user_id: UserReducer?.userData?.id,
          role: 2
        })
      }
      else if (remoteMessage.notification.title == "Cancel") {
        getCurrentBooking({
          user_id: UserReducer?.userData?.id,
          role: 2
        })
      }
    })
    return subsscribe
  }, [PaymentDone])

  // let name = 'Chrsitiano';

  // Options Handler
  const _onPressOptions = (item, index) => {
    navigation.navigate('Map', { item });
  };

  const _onPressSignUp = () => {
    navigation.navigate('AllServices');
  };

  useEffect(() => {
    if (isFocused === true) {
      setIsLoading(true);
      getCurrentBooking({
        user_id: UserReducer?.userData?.id,
        role: 2
      })
      getAllServices(accessToken);
    }
  }, [isFocused]);

  useEffect(() => {
    if (ServicesReducer?.services?.length > 0) {
      let arr = [];
      ServicesReducer?.services?.map((ele, idx) => {
        if (idx < 4) {
          arr.push(ele);
        }
      });
      setServices(arr);
      setIsLoading(false);
    }
  }, [ServicesReducer?.services]);
  const dispatch = useDispatch()
  const Submit_pay = () => {
    const data = {
      user_id: UserReducer?.userData?.id,
      price: Number(currentBooking.service[0]?.services_price),
      token: stripeGeneratedKey
    }
    RequestPayment(data, setPaymentDone, setModalVisible)
  }


  function renderBooking() {
    console.log(currentBooking)
    if (currentBooking.booking) {
      return (
        <View
          style={{
            width: '85%',
            alignSelf: 'center',
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            padding: 10,
            borderRadius: width * 0.02,
            marginVertical: 10,
            paddingTop: 0
          }}
        >
          <View

            style={{
              borderBottomColor: 'lightgray',
              borderBottomWidth: 1,
              padding: 5,
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <Text style={{ color: colors.themeBlue, fontWeight: 'bold', fontSize: 18 }}>Current Booking</Text>
            <View style={{ flexDirection: 'row' }}>
              {
                currentBooking.booking[0]?.status == "pending" ? (
                  <TouchableOpacity
                    disabled={reqLoading}
                    onPress={() => {
                      setReqLoading(true)
                      cancelBooking({
                        user_id: UserReducer?.userData?.id,
                        role: 2
                      }).then(() => {
                        sendNotification({
                          title: "Cancel",
                          body: `${UserReducer?.userData?.name} Canceled Request`,
                          id: currentBooking.provider[0]?.id
                        })
                        Toast.show({ type: 'success', text1: "Cancel request Successfully" })
                        getCurrentBooking({
                          user_id: UserReducer?.userData?.id,
                          role: 2
                        })
                        setReqLoading(false)
                      })
                    }}
                    style={{ marginRight: 10 }}>
                    <Text style={{ color: 'white', backgroundColor: colors.themeBlue, padding: 10, borderRadius: 3, fontSize: 10 }}>{reqLoading ? 'loading...' : 'cancel'}</Text>
                  </TouchableOpacity>) : null
              }

              {currentBooking.booking[0]?.payment_status == null ?
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true)
                  }}
                >
                  <Text style={{ color: 'white', backgroundColor: 'green', padding: 10, borderRadius: 3, fontSize: 10 }}>Proceed Payment</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() => {
                    completeBooking({
                      provider_id: currentBooking.provider[0]?.id,
                      id: currentBooking.booking[0]?.id
                    }).then(() => {
                      setCurrentRating(currentBooking)
                      setRatingModal(true)
                      sendNotification({
                        title: "Complete",
                        body: `${UserReducer?.userData?.name} Completed Job`,
                        id: currentBooking.provider[0]?.id
                      })
                      Toast.show({ type: 'success', text1: "Successfully completed" })
                      getCurrentBooking({
                        user_id: UserReducer?.userData?.id,
                        role: 2
                      })
                    })
                  }}
                >
                  <Text style={{ color: 'white', backgroundColor: currentBooking.booking[0]?.status == "pending" ? 'gray' : 'green', padding: 10, borderRadius: 3, fontSize: 10 }}>{currentBooking.booking[0]?.status == "pending" ? "Pending" : "Mark as complete"}</Text>
                </TouchableOpacity>}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View style={{ width: '35%', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={(currentBooking.provider[0]?.profile_image) ? { uri: imageUrl2 + "/" + currentBooking.provider[0]?.profile_image } : require('../assets/user.png')}
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
              <Text style={{ color: 'black', fontWeight: 'bold', textTransform: 'capitalize', marginTop: 5, fontSize: 12 }}>{currentBooking.provider[0]?.name}</Text>
            </View>
            <View style={{ width: '65%', justifyContent: 'center' }}>
              <View>
                <Text style={{ color: 'black', fontSize: 11 }}> Price:<Text style={{ color: 'green' }}> ${currentBooking.service[0]?.services_price}</Text></Text>
                <Text style={{ color: 'black', fontSize: 11 }}>Service: {currentBooking.service[0]?.services_name}</Text>
                <Text style={{ color: 'black', fontSize: 11 }}>Phone No: {currentBooking.provider[0]?.phone}</Text>
              </View>
            </View>
          </View>
        </View>
      )
    } else {
      return null
    }
  }

  console.log(currentBooking)


  return (
    <View style={styles.container}>
      <RatingModal
        visible={ratingModal}
        title={"Please rate this service"}
        closeModle={() => setRatingModal(false)}
        currentRating={currentRating}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <Header title="Menu" navigation={navigation} />

        {/* Features FlatList  */}
        <FlatList
          vertical
          numColumns={2}
          nestedScrollEnabled={true}
          // style={{height: height * 0.83}}
          contentContainerStyle={styles.flatListContentContainerStyle}
          data={services?.length > 0 ? services : dummyOptions}
          keyExtractor={item => item?.id?.toString()}
          ListHeaderComponent={() => (
            <>
              <View style={styles.greetingContainer}>
                <View style={styles.animationView}>
                  <Heading
                    title="Hello,"
                    passedStyle={styles.heading}
                    fontType="bold"
                  />
                  <Heading
                    title={
                      name?.length > 6 ? `${name?.substring(0, 12)}...` : name
                    }
                    passedStyle={[
                      styles.heading_username,
                      name?.length > 7 && { fontSize: width * 0.08 },
                    ]}
                    fontType="bold"
                  />
                </View>
                <Image source={wave} style={styles.img_wave} />
              </View>
              {renderBooking()}
            </>
          )}
          ListFooterComponentStyle={styles.footerStyles}
          ListFooterComponent={() => {
            return (
              !isLoading && (
                <Button
                  title="View All Services"
                  onBtnPress={() => _onPressSignUp()}
                  isBgColor={true}
                  btnStyle={styles.btnStyle}
                  btnTextStyle={styles.btnTextStyle}
                />
              )
            );
          }}
          renderItem={({ item, index }) => (
            <OptionsMapper
              item={item}
              index={index}
              onPress={_onPressOptions}
              isLoading={isLoading}
            />
          )}
        />

        {/* All Services  */}
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
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  marginTop: -20
                }}
                onPress={() => {
                  setModalVisible(false)
                }}
              >
                <Image
                  style={{
                    height: 15,
                    width: 15,
                    // backgroundColor: "red"
                  }}
                  source={require("../assets/Images/close.png")}
                />
              </TouchableOpacity>
              <StripeProvider publishableKey={PUB_KEY_STRIPE}>
                <StripeCardComp myRef={stripeRef} setId={setStripeGeneratedKey} />
              </StripeProvider>
              <TouchableOpacity
                onPress={() => {
                  Submit_pay()
                }}
              >
                <Text style={{ color: 'white', backgroundColor: 'green', padding: 8, borderRadius: 3, fontSize: 15, paddingHorizontal: 30 }}>Pay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  animationView: {
    flexDirection: 'column',
    justifyContent: 'center',
    // marginLeft: width * 0.05,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // backgroundColor:'red',
    // width: '85%',
    // justifyContent: 'space-between',
    // textTransform: 'capitalize',
    marginTop: height * 0.02,
    // marginHorizontal: width * 0.05,
  },
  btnStyle: {
    backgroundColor: colors.themeBlue,
    borderRadius: width * 0.08,
    width: width * 0.6,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
  },
  flatListContentContainerStyle: {
    alignItems: 'center',
    // justifyContent:'space-between'
  },
  allServicesStyle: {
    // marginVertical: height * 0.05,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  img_wave: {
    // marginTop: height * 0.08,
    width: width * 0.15,
    height: height * 0.08,
  },
  heading: {
    color: 'black',
    fontSize: width * 0.11,
  },
  heading_username: {
    color: colors.themeBlue,
    fontSize: width * 0.10,
    paddingLeft: width * 0.02,
  },
  boxContainer: {
    borderRadius: width * 0.02,
    height: height * 0.2,
    width: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
    marginLeft: width * 0.065,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: 'white',
    paddingHorizontal: width * 0.2,
    paddingVertical: height * 0.005,
  },

  text: {
    fontSize: width * 0.05,
    color: '#000',
    marginLeft: width * 0.08,
    marginRight: width * 0.22,
    marginTop: height * 0.01,
  },
  footerStyles: {
    paddingTop: height * 0.07,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
const mapStateToProps = ({ UserReducer, ServicesReducer, currentBooking }) => {
  return { UserReducer, ServicesReducer, currentBooking };
};
export default connect(mapStateToProps, actions)(Home);

const dummyOptions = [
  {
    id: 1,
    services_name: 'Loading',
    services_icon: '',
  },
  {
    id: 2,
    services_name: 'Loading',
    services_icon: '',
  },
  {
    id: 3,
    services_name: 'Loading',
    services_icon: '',
  },
  {
    id: 4,
    services_name: 'Loading',
    services_icon: '',
  },
];
