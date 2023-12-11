import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  LogBox,
  FlatList,
  Text
} from 'react-native';
import Heading from '../components/Heading';
import userimg from '../assets/Images/user_image.png';
import colors from '../assets/colors';
import Header from '../components/Header';
import wave from '../assets/Images/Wave.png';
import _1K from '../assets/Images/1k.png';
import STARS from '../assets/Images/stars.png';
import IconComp from '../components/IconComp';
import { connect } from 'react-redux';
import * as actions from '../store/Actions/index';
import IconicIcon from "react-native-vector-icons/Ionicons"
import OngoingJobs from '../components/OngoingJobs';
import Toast from 'react-native-toast-message';
import Loader from "../components/Loader"
import { imgUrl2 } from "../config/keys.json"
import messaging from '@react-native-firebase/messaging';
import Button from '../components/Button';


LogBox.ignoreLogs(['new NativeEventEmitter']);

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const HomeOptionWithoutRightIcon = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.containerOption}
      activeOpacity={0.9}
      onPress={() => {
        onPress(item);
      }}>
      <View style={styles.boxContainer}>
        <Text style={{ color: colors.themeBlue, fontSize: 40, fontWeight: 'bold' }}>{item.d}</Text>
        <IconicIcon
          name={item.image}
          size={60}
          color={colors.themeBlue}
        />
      </View>
      <View style={styles.texticonhandler}>
        <Heading
          passedStyle={styles.textOption}
          title={item.text}
          fontType="bold"
        />
      </View>
    </TouchableOpacity>
  );
};

function Home({ navigation, user, setAval, getDashboard, dashboard, getCurrentBooking, currentBooking, cancelBooking, acceptRequest, sendNotification }) {
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(true);
  const [reqLoading, setReqLoading] = useState(false);
  const [acLoading, setAcLoading] = useState(false);


  const [options, setOptions] = useState(dummyOptions);
  let name = user?.data?.name?.split(' ')[0];
  console.log({ name })
  let job = {
    _id: 1,
    name: 'Jason Brown',
    type: 'mechanic',
  };
  // Options Handler
  const _onPressOptions = item => {
    // navigation.navigate('Map');
  };

  useEffect(() => {
    if (user?.data?.availability == "on") {
      setToggle(true)
    } else {
      setToggle(false)
    }
  }, [user])

  useEffect(() => {
    setLoading(true)
    Promise.all([getCurrentBooking(user?.data?.id), getDashboard(user?.data?.id)])
      .then(() => setLoading(false))
    const subsscribe = messaging().onMessage((remoteMessage) => {
      if (remoteMessage.notification.title == "Cancel") {
        getCurrentBooking(user?.data?.id)
      }
      else if (remoteMessage.notification.title == "Accept") {
        getCurrentBooking(user?.data?.id)
      }
      else if (remoteMessage.notification.title == "Request") {
        getCurrentBooking(user?.data?.id)
      }
      else if (remoteMessage.notification.title == "Complete") {
        getCurrentBooking(user?.data?.id)
      }
    })
    return subsscribe
  }, [])
  const refreshing = () => {
    Promise.all([getCurrentBooking(user?.data?.id), getDashboard(user?.data?.id)])
      .then(() => setLoading(false))
    const subsscribe = messaging().onMessage((remoteMessage) => {
      if (remoteMessage.notification.title == "Cancel") {
        getCurrentBooking(user?.data?.id)
      }
      else if (remoteMessage.notification.title == "Accept") {
        getCurrentBooking(user?.data?.id)
      }
      else if (remoteMessage.notification.title == "Request") {
        getCurrentBooking(user?.data?.id)
      }
      else if (remoteMessage.notification.title == "Complete") {
        getCurrentBooking(user?.data?.id)
      }
    })
    return subsscribe
  }


  const _onPressOngoingJobs = (item, index) => {
    navigation.navigate('Map');
  };


  function renderJobs() {
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
            <View>
              <Text style={{ color: colors.themeBlue, fontWeight: 'bold', fontSize: 18 }}>Current Booking</Text>
              <TouchableOpacity
                onPress={() => {
                  refreshing()
                }}
                style={{
                  flexDirection: "row",
                  // justifyContent:"center"
                }}
              >
                <Image
                  style={{
                    tintColor: colors.themeBlue,
                    width: width * 0.035,
                    height: height * 0.035,
                    resizeMode: "contain"
                  }}
                  source={require("../assets/Images/refesh.png")}
                />
                <Text
                  style={{
                    color: colors.themeBlue,
                    fontSize: width * 0.035,
                    fontWeight: "600",
                    textAlignVertical: "center",
                    marginLeft: 4
                    // textAlign: "center"

                  }}
                >Refresh</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {
                currentBooking.booking[0]?.status == "pending" ? (
                  <TouchableOpacity
                    disabled={reqLoading}
                    onPress={() => {
                      setReqLoading(true)
                      cancelBooking({
                        user_id: currentBooking?.user[0].id,
                        role: 2
                      }).then((res) => {
                        console.log("sd", res.data)
                        sendNotification({
                          title: "Cancel",
                          body: `${user?.data?.name} cancel your request`,
                          id: currentBooking?.user[0].id
                        })
                        Toast.show({ type: 'success', text1: "Cancel request Successfully" })
                        getCurrentBooking(user?.data?.id)
                        setReqLoading(false)
                      })
                    }}
                    style={{ marginRight: 10 }}>
                    <Text style={{ backgroundColor: colors.themeBlue, padding: 10, borderRadius: 3, fontSize: 10, color: 'white' }}>{reqLoading ? 'loading...' : 'cancel'}</Text>
                  </TouchableOpacity>) : null
              }

              <View>
                <TouchableOpacity
                  disabled={currentBooking.booking[0]?.status == "pending" ? false : true}
                  onPress={() => {
                    setAcLoading(true)
                    acceptRequest({
                      provider_id: user?.data?.id,
                      id: currentBooking?.booking[0]?.id
                    }).then(() => {
                      sendNotification({
                        title: "Accepted",
                        body: `${user?.data?.name} accept your request`,
                        id: currentBooking?.user[0].id
                      })
                      Toast.show({ type: 'success', text1: "Successfully accepted" })
                      getCurrentBooking(user?.data?.id)
                      setAcLoading(false)
                    }).catch(() => {
                      setAcLoading(false)
                      Toast.show({ type: 'error', text1: "you have insufficient balance" })
                    })
                  }}
                >
                  <Text style={{ backgroundColor: currentBooking.booking[0]?.status != "pending" ? 'gray' : 'green', padding: 10, borderRadius: 3, fontSize: 10, color: 'white', textAlign: "center" }}>{acLoading ? "...loading" : (currentBooking.booking[0]?.status == "pending" ? "Accept Request" : currentBooking.booking[0]?.status)}</Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: currentBooking.booking[0]?.payment_status == null ? "red" : "green",
                    alignSelf: "flex-end",
                    fontSize: width * 0.0325,
                    fontWeight: "600"
                  }}
                >
                  {currentBooking.booking[0]?.payment_status == null ? "Payment Pending" : "Payment Done"}
                </Text>
              </View>

            </View>

          </View>
          {/* <Text
            style={{
              color: currentBooking.booking[0]?.payment_status == null ? "red" : "green",
              alignSelf: "flex-end",
              fontSize: width * 0.0325,
              fontWeight: "600"
            }}
          >
            {currentBooking.booking[0]?.payment_status == null ? "Payment Pending" : "Payment Done"}
          </Text> */}
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={(currentBooking.user[0]?.profile_image) ? { uri: imgUrl2 + "/" + currentBooking.user[0]?.profile_image } : require('../assets/user.png')}
                style={{ width: 60, height: 60, borderRadius: 30 }}
              />
              <Text style={{ color: 'black', fontWeight: 'bold', textTransform: 'capitalize', marginTop: 5, fontSize: 12 }}>{currentBooking.user[0]?.name}</Text>
            </View>
            <View style={{ width: '60%', justifyContent: 'center' }}>
              <View>
                <Text style={{ color: 'black', fontSize: 12 }}>Price:<Text style={{ color: 'green' }}> ${currentBooking.service[0]?.services_price}</Text></Text>
                <Text style={{ color: 'black', fontSize: 12 }}>Service: {currentBooking.service[0]?.services_name}</Text>
                <Text style={{ color: 'black', fontSize: 12 }}>Phone No: {currentBooking.user[0]?.phone}</Text>
              </View>
            </View>
          </View>
          {currentBooking.booking[0]?.status == "accepted" ? (
            <TouchableOpacity
              onPress={() => navigation.push('Map', currentBooking)}
              style={{ marginVertical: 5, backgroundColor: colors.themeBlue, padding: 5, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
            >
              <Text style={{ color: 'white' }}>View Location</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      )
    } else {
      return null
    }
  }

  if (loading) {
    return <Loader />
  }
  return (
    <View style={styles.container}>
      {/* Header  */}
      <Header title="Menu" navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        {/* Username and Hi Wave  */}
        <View style={styles.nameAndWaveStyle}>
          <Image source={wave} style={styles.img_wave} resizeMode="contain" />
          {/* <View style={styles.helloView}>
            <Heading title="Hello," fontType="bold" />
            <Heading
              title={name}
              passedStyle={styles.heading_username}
              fontType="bold-italic"
            />
          </View> */}
          <View
            style={{
              flexDirection: name?.length > 7 ? 'column' : 'row',
              width: width * 0.8,
            }}>
            <Heading
              title="Hello,"
              passedStyle={styles.heading}
              fontType="bold"
            />
            <Heading
              title={name}
              passedStyle={styles.heading_username}
              fontType="bold-italic"
            />
          </View>
        </View>

        {/* Availability  */}
        <View style={styles.availabilityView}>
          <Heading
            title="Availability"
            fontType="bold"
            passedStyle={styles.availText}
          />
          <TouchableOpacity
            onPress={() => {
              setToggle(!toggle)
              setAval({
                user_id: user.data?.id,
                role: 3,
                availability: toggle ? "false" : "true"
              }).then(() => Toast.show({ type: "success", text1: "Succesfully changed availability" }))
            }}
            activeOpacity={0.8}>
            <IconComp
              iconName={toggle ? 'toggle-switch' : 'toggle-switch-off'}
              type={'MaterialCommunityIcons'}
              passedStyle={
                toggle ? styles.toggleOnStyle : styles.toggleOffStyle
              }
            />
          </TouchableOpacity>
        </View>

        {/* Options  */}
        <View style={styles.flatListContentContainerStyle}>
          <HomeOptionWithoutRightIcon
            item={{ ...Options[0], d: dashboard?.total_wallet }}
            onPress={_onPressOptions}
          />
          <HomeOptionWithoutRightIcon
            item={{ ...Options[1], d: dashboard?.total_rating }}
            onPress={_onPressOptions}
          />
        </View>

        {/* Ongoing Jobs  */}
        {renderJobs()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  noJobsView: {
    marginTop: height * 0.02,
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noJobTitle: {
    fontSize: width * 0.05,
    marginLeft: width * 0.02,
  },
  noJobImage: {
    width: width * 0.1,
    height: height * 0.05,
  },
  ongoingJobsView: {
    borderTopColor: 'rgba(0,0,0,0.08)',
    borderTopWidth: 1,
    marginTop: height * 0.03,
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.08,
  },
  icon_style: {
    marginLeft: width * 0.14,
  },

  textMechanic: {
    fontSize: height * 0.017,
    color: 'gray',
    marginLeft: width * 0.03,
  },
  popUpText: {
    fontSize: height * 0.025,
    color: 'black',
    marginLeft: width * 0.03,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ongoingLabel: {
    fontSize: width * 0.05,
  },
  toggleOnStyle: {
    fontSize: width * 0.15,
    color: colors.themeGreen,
  },
  toggleOffStyle: {
    fontSize: width * 0.15,
    color: 'grey',
  },
  availText: {
    fontSize: width * 0.05,
  },
  availabilityView: {
    borderTopWidth: 1,
    marginVertical: height * 0.03,
    paddingHorizontal: width * 0.09,
    borderBottomWidth: 1,
    paddingVertical: height * 0.01,
    borderTopColor: 'rgba(0,0,0,0.08)',
    borderBottomColor: 'rgba(0,0,0,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  helloView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameAndWaveStyle: {
    marginHorizontal: width * 0.09,
    marginTop: height * 0.05,
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  allServicesStyle: {
    // marginVertical: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  img_wave: {
    width: width * 0.14,
    height: height * 0.07,
  },
  heading: {
    color: 'black',
    fontSize: width * 0.11,
  },
  heading_username: {
    color: colors.themeBlue,
    fontSize: width * 0.11,
    paddingLeft: width * 0.02,
  },

  popUpBoxContainer: {
    flexDirection: 'row',
    paddingHorizontal: width * 0.04,
    justifyContent: 'space-between',
    borderRadius: width * 0.02,
    height: height * 0.13,
    width: width * 0.85,
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

  boxContainer: {
    borderRadius: width * 0.02,
    height: height * 0.2,
    width: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
    marginLeft: width * 0.065,
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

  containerOption: {
    marginHorizontal: width * 0.025,
  },
  textOption: {
    fontSize: width * 0.04,
    textTransform: 'capitalize',
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: width * 0.32,
    // height: height * 0.07,
  },
  texticonhandler: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },

  boxContainer: {
    borderRadius: width * 0.02,
    height: height * 0.2,
    width: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: 'white',
  },
});

const mapStateToProps = ({ user, dashboard, currentBooking }) => {
  return { user, dashboard, currentBooking };
};
export default connect(mapStateToProps, actions)(Home);

const dummyOptions = [
  {
    _id: 1,
    text: 'towing',
    image: require('../assets/Images/services/towing.png'),
  },
  {
    _id: 2,
    text: 'battery',
    image: require('../assets/Images/services/battery.png'),
  },
  {
    _id: 3,
    text: 'accident',
    image: require('../assets/Images/services/accident.png'),
  },
  {
    _id: 4,
    text: 'flat tyre',
    image: require('../assets/Images/services/flattyre.png'),
  },
];

const Options = [
  {
    _id: 1,
    image: "ios-checkmark-done-circle-sharp",
    text: 'completed jobs',
  },
  {
    _id: 2,
    image: "star",
    text: 'Ratings',
  },
];

const dummyJobs = [
  {
    _id: 1,
    name: 'Jason Brown',
    type: 'mechanic',
  },
];
