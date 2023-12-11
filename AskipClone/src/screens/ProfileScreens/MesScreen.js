import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification'
const { height, width } = Dimensions.get('window');
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import Page5 from './page5';
import Colors from '../../assets/colors/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { FCMUPDATE } from '../../redux/actions/user.action';
const MesScreen = () => {
  const [Page, setPage] = useState(1);
  const [FCM, setFCM] = useState();
  const profile = useSelector(state => state?.auth?.User)
  // console.log("Sfdsdf",useSelector(state => state?.auth))
  const userId = useSelector((state) => state?.auth?.credential?.User?._id)
  const dispatch = useDispatch()
  // console.log("FCMMMMM",FCM,"====",userId)
  useEffect(() => {
    requestUserPermission();
    try {
      messaging()
        .getToken()
        .then(token => {
          setFCM(token);
          // console.log(token, "FCM")
        });
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
        });
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log(remoteMessage, 'remoteMessage ahsan');
        PushNotification.localNotification({
          channelId: 'channel-id',
          channelName: 'My channel',
          message: remoteMessage.notification.body,
          playSound: true,
          title: remoteMessage.notification.title,
          priority: 'high',
          soundName: 'default',
        });
        // }
      });
      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      // console.log('Authorization status:', authStatus);
      SplashScreen.hide();
    }
  }
  useEffect(() => {
    dispatch(FCMUPDATE(FCM, userId))
  }, [FCM])

  return (
    <>
      {/* <Text
    // style={{position:"absolute"}}
    >khsfkdsga</Text> */}
      <View style={styles.container}>
        {/* {/ step slector /} */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: height * 0.02,
          }}>
          <TouchableOpacity
            activeOpacity={100}
            // onPress={() => {
            //   setPage(1);
            // }}
            style={[
              styles.check,
              {
                backgroundColor:
                  Page == 1 || Page > 1 ? Colors.theme_color : '#b2b2b2',
              },
            ]}>
            <Text style={styles.num}>1</Text>
          </TouchableOpacity>
          <View
            style={[
              styles.line,
              {
                borderColor:
                  Page == 2 || Page > 2 ? Colors.theme_color : '#b2b2b2',
              },
            ]}></View>
          <TouchableOpacity
            activeOpacity={100}
            // onPress={() => {
            //   setPage(2);
            // }}
            style={[
              styles.check,
              {
                backgroundColor:
                  Page == 2 || Page > 2 ? Colors.theme_color : '#b2b2b2',
              },
            ]}>
            <Text style={styles.num}>2</Text>
          </TouchableOpacity>
          <View
            style={[
              styles.line,
              {
                borderColor:
                  Page == 3 || Page > 3 ? Colors.theme_color : '#b2b2b2',
              },
            ]}></View>
          <TouchableOpacity
            activeOpacity={100}
            // onPress={() => {
            //   setPage(3);
            // }}
            style={[
              styles.check,
              {
                backgroundColor:
                  Page == 3 || Page > 3 ? Colors.theme_color : '#b2b2b2',
              },
            ]}>
            <Text style={styles.num}>3</Text>
          </TouchableOpacity>
          <View
            style={[
              styles.line,
              {
                borderColor:
                  Page == 4 || Page > 4 ? Colors.theme_color : '#b2b2b2',
              },
            ]}></View>
          <TouchableOpacity
            activeOpacity={100}
            // onPress={() => {
            //   setPage(4);
            // }}
            style={[
              styles.check,
              {
                backgroundColor:
                  Page == 4 || Page > 4 ? Colors.theme_color : '#b2b2b2',
              },
            ]}>
            <Text style={styles.num}>4</Text>
          </TouchableOpacity>
          <View
            style={[
              styles.line,
              {
                borderColor:
                  Page == 5 || Page > 5 ? Colors.theme_color : '#b2b2b2',
              },
            ]}></View>
          <TouchableOpacity
            activeOpacity={100}
            // onPress={() => {
            //   setPage(5);
            // }}
            style={[
              styles.check,
              {
                backgroundColor:
                  Page == 5 || Page > 5 ? Colors.theme_color : '#b2b2b2',
              },
            ]}>
            <Text style={styles.num}>5</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {Page == 1 ? (
          <Page1 setPage={setPage} profile={profile} />
        ) : Page == 2 ? (
          <Page2
            setPage={setPage}
            profile={profile}
          />
        ) : Page == 3 ? (
          <Page3 setPage={setPage} profile={profile} />
        ) : Page == 4 ? (
          <Page4 setPage={setPage} profile={profile} />
        ) : Page == 5 ? (
          <Page5 setPage={setPage} profile={profile} />
        ) : null}
        {/* <View style={styles.cont}>
          <TouchableOpacity
           disabled={Page == 1 ? true : false}
           onPress={() => {
             setPage(Page - 1);
           }}>
            <Image
              style={styles.navimg}
              source={
                Page == 1 ? null : require('../../assets/images/prev.png')
              }
            />
          </TouchableOpacity>
         
          <TouchableOpacity
            // disabled={Page == 5 ? true : false}
            // onPress={() => {
            //   setPage(Page + 1);
            // }}
            disabled={Page == 5 ? true : false}
            onPress={() => {
              setPage(Page + 1);
            }}
            >
            <Image
              style={styles.navimg}
              source={
                Page == 5 ? null : require('../../assets/images/next.png')
              }
            />
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </>
  );
};

export default MesScreen;

const styles = StyleSheet.create({
  check: {
    // backgroundColor: 'red',
    width: height * 0.04,
    height: height * 0.04,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // padding:widsth
  },
  line: {
    width: width * 0.085,
    borderWidth: width * 0.0015,
    // borderColor:"red",
    height: 0,
    alignSelf: 'center',
  },
  container: {
    alignSelf: 'center',
    marginTop: height * 0.01,
  },
  num: {
    fontSize: width * 0.035,
    color: 'white',
    fontWeight: '600',
  },
  touch: {
    height: height * 0.055,
    borderWidth: 2,
    borderColor: '#fdbf18',
    width: width * 0.7,
    marginTop: height * 0.02,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.023,
    marginBottom: height * 0.01,
  },
  text2: {
    color: '#fdbf18',
    fontSize: width * 0.042,
    // fontWeight:'700',
    fontFamily: 'Bebas Neue Pro Bold',
  },
  cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: width * 0.015,

  },
  navimg: {
    height: height * 0.045,
    width: width * 0.12,
    resizeMode: 'contain',
    marginTop: height * 0.01,
    // marginHorizontal: width * 0.05,
    // paddingHorizontal:width*0.02,
  },
});
