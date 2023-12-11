import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState, useContext} from 'react';
import Colors from '../../assets/Colors/Colors';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Header from '../../Compoents/Header/Header';
import {useDispatch, useSelector} from 'react-redux';
import {
  ArriveRequest,
  CHAT_ID,
  RideCancel,
  RideEdit,
  VehicleCheck,
} from '../../redux/actions/driver.action';
import {Google_API} from '../../config/GoogleApi';
import MapViewDirections from 'react-native-maps-directions';
import Vehicle from './Vehicle';
import {
  PrimaryButton,
  PrimaryWhite,
  SecondayButton,
} from '../../Compoents/Buttons/BTN';
import {io} from 'socket.io-client';
import {Socket_URL} from '../../config/config';
import {AuthContext} from '../../context/AuthContext';
import {
  CurrentLocation,
  locationPermission,
} from '../../config/livelocationhelper';
const {height, width} = Dimensions.get('window');
const TrackingUser = ({navigation}) => {
  const dispatch = useDispatch();
  const RideDetail = useSelector(state => state?.auth?.ride?.ride);
  const [time, setTime] = useState();
  const [distance, setDistance] = useState();
  const [liveLocation, setLiveLocation] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Load, setLoad] = useState(false);
  const [toggle, settoggle] = useState(false);
  const {socket} = useContext(AuthContext);
  const Driver = useSelector(state => state?.auth?.accesToken?.user?.id);
  const RideID = useSelector(state => state?.auth?.ride?.ride?.id);
  const Country = useSelector(state => state?.auth?.Country?.toUpperCase());

  console.log('RideID', RideID);
  // useEffect(() => {
  //     setTimeout(() => {
  //         CHAT_ID_HIT()
  //     }, 5000);
  // }, [])
  // const CHAT_ID_HIT = () => {
  //     dispatch(CHAT_ID())
  // }
  // // const socket = io(Socket_URL);
  useEffect(() => {
    socket.on('RIDE_REQUEST_CANCELLED', data => {
      navigation?.navigate('Home');
    });
    socket.on('LOCATION_UPDATE_REQUEST', data => {
      // alert("sovket is working fine")
      settoggle(true);
    });
  }, []);
  const cancelRide = () => {
    const eventData = {
      rideId: RideDetail?.id,
      userId: RideDetail?.userId,
    };
    const eventName = 'REQUEST_CANCELLED';
    // Emit the event to the server
    socket.emit(eventName, JSON.stringify(eventData));
    dispatch(RideCancel(RideDetail?.id, navigation));
  };
  useEffect(() => {
    getCurrentLocation();
    const eventData = {
      id: RideDetail?.id,
      userId: RideDetail?.driverId,
    };
    const eventName = 'JOIN_CHAT_ROOM';
    // Emit the event to the server
    socket.emit(eventName, JSON.stringify(eventData));
  }, []);
  const CONVO_ID = useSelector(state => state?.auth?.Conversation);
  // console.log("CONVO_ID", CONVO_ID)
  console.log('RideDetail', RideDetail);

  const getCurrentLocation = async () => {
    const PermissionDenied = await locationPermission();
    // console.log('location permission', PermissionDenied);
    if (PermissionDenied) {
      const res = await CurrentLocation();
      // console.log('Response=========>>>>>>>', res);
      setLiveLocation(res);
    }
  };
  console.log('livelocation', typeof liveLocation.latitude);
  const live = {
    latitude: liveLocation?.latitude || 24.9623677 /* 24.9623677,67.0463966, */,
    longitude: liveLocation?.longitude || 67.0463966,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const livelocationtracking = () => {
    const eventName = 'LIVE_LOCATION';
    const eventData = {
      riderId: Driver,
      rideId: RideID,
      userId: RideDetail?.user?.id,
      longitude: liveLocation?.longitude?.toString(),
      latitude: liveLocation?.latitude?.toString(),
    };
    console.log(eventData);
    // Emit the event to the server
    socket.emit(eventName, JSON.stringify(eventData));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentLocation();
      livelocationtracking();
    }, 5000);
    return () => clearInterval(interval);
  });
  useEffect(() => {
    const eventName = 'REQUEST_ACCEPT';
    const eventData = {
      riderId: Driver,
      rideId: RideID,
    };

    // Emit the event to the server
    socket.emit(eventName, JSON.stringify(eventData));
  }, []);
  socket.on('RIDE_REQUEST_ACCEPTED', data => {
    console.log('RIDE_REQUEST_ACCEPTED ', data);
  });
  const pickUpCords = {
    latitude: parseFloat(
      RideDetail?.pickup_latitude,
    ) /* 24.9623677,67.0463966, */,
    longitude: parseFloat(RideDetail?.pickup_longitude),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const DropOfData = {
    latitude: parseFloat(RideDetail?.dropoff_latitude),
    longitude: parseFloat(RideDetail?.dropoff_longitude),
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  console.log('object', RideDetail);
  const Arrived = () => {
    setLoading(true);
    dispatch(ArriveRequest(RideDetail.id, navigation, setLoading));
  };

  const handleChanges = async i => {
    setLoad(true);
    const body = {
      status: i,
    };
    // alert(body?.status)
    dispatch(RideEdit(RideDetail.id, body, navigation, settoggle));

    setTimeout(() => {
      const eventData = {
        userId: RideDetail?.user?.id,
        rideId: RideDetail?.id,
        riderId: RideDetail?.driver?.id,
      };

      const eventName = 'LOCATION_UPDATE';
      // Emit the event to the server
      socket.emit(eventName, JSON.stringify(eventData));
      setLoad(false);
    }, 6000);
  };

  const mapRef = useRef();
  return (
    <>
      {toggle == false ? (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.bg}}>
          <>
            <Header
              onPress={() => {
                navigation.openDrawer();
              }}
            />

            <MapView
              ref={mapRef}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
              initialRegion={live}>
              <Marker
                coordinate={live}
                // image={ImagePath.DropOff}
              />
              <Marker
                coordinate={pickUpCords}
                // image={ImagePath.DropOff}
              />
              <MapViewDirections
                origin={live}
                destination={pickUpCords}
                apikey={Google_API}
                strokeWidth={4}
                strokeColor={Colors.theme}
                onReady={result => {
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: 30,
                      bottom: 600,
                      left: 30,
                      top: 100,
                    },
                  });
                  // setDistance(result?.distance),
                  //     setTime(result?.duration)

                  console.log('distance', result.distance);
                  console.log('dusration', result.duration);
                }}
                optimizeWaypoints={true}
              />
            </MapView>

            <View style={styles.Conatiner}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: ""
                  padding: width * 0.045,
                  marginBottom: height * 0.035,
                }}>
                <Image
                  style={{
                    resizeMode: 'cover',
                    alignSelf: 'center',
                    margin: width * 0.01,
                    height: height * 0.08,
                    width: width * 0.15,
                    backgroundColor: Colors.placeholder,
                    // resizeMode: "contain",
                    borderRadius: 100,
                  }}
                  source={{uri: `${RideDetail?.user?.profile_picture}`}}
                />
                <Text
                  style={[
                    styles.name,
                    {
                      color:
                        Country == 'UKRAINE' ? Colors.Bluetheme : Colors.theme,
                    },
                  ]}>
                  {RideDetail?.user?.first_name} {RideDetail?.user?.last_name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginBottom: height * 0.0425,
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    Linking.openURL(`tel:${RideDetail?.user?.phone}`);
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      tintColor:
                        Country == 'UKRAINE' ? Colors.Bluetheme : Colors.theme,
                    }}
                    source={require('../../assets/images/call.png')}
                  />
                  <Text style={styles.font}>
                    {Country == 'UKRAINE' ? 'Телефонуйте' : 'Call'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ChatScreen');
                  }}
                  style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      tintColor:
                        Country == 'UKRAINE' ? Colors.Bluetheme : Colors.theme,
                    }}
                    resizeMode="contain"
                    source={require('../../assets/images/msg.png')}
                  />
                  <Text style={styles.font}>
                    {Country == 'UKRAINE' ? 'Чат' : 'Chat'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    cancelRide();
                  }}>
                  <Image
                    style={{
                      tintColor:
                        Country == 'UKRAINE' ? Colors.Bluetheme : Colors.theme,
                    }}
                    resizeMode="contain"
                    source={require('../../assets/images/cut.png')}
                  />
                  <Text style={styles.font}>
                    {Country == 'UKRAINE' ? 'Скасувати' : 'Cancel'}
                  </Text>
                </TouchableOpacity>
              </View>
              <PrimaryButton
                // onPress={() => { navigation.navigate("RideStart") }}
                onPress={() => {
                  Arrived();
                }}
                title={
                  Loading == true ? (
                    <ActivityIndicator size={'small'} color={Colors.white} />
                  ) : Country == 'UKRAINE' ? (
                    'Прибуття'
                  ) : (
                    'Arrive'
                  )
                }
              />
              {/* <PrimaryWhite
                        title="Reject"
                    /> */}
            </View>
          </>
        </SafeAreaView>
      ) : (
        <View style={{flex: 1, paddingTop: height * 0.04}}>
          <Header
            onPress={() => {
              navigation.openDrawer();
            }}
          />
          {Load == true ? (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={{
                  color: Colors?.theme,
                  fontFamily: 'Poppins-Medium',
                  fontSize: width * 0.04,
                  alignSelf: 'center',
                  marginBottom: height * 0.0252,
                }}>
               Working on your request..
              </Text>
              <ActivityIndicator color={Colors?.theme} size={'large'} />
            </View>
          ) : (
            <View
              style={{
                width: width * 0.9,
                backgroundColor: Colors.white,
                alignSelf: 'center',
                height: height * 0.35,
                borderRadius: width * 0.025,
                justifyContent: 'center',
                marginTop: height * 0.2,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,

                elevation: 10,
              }}>
              <Text
                style={{
                  color: Colors.theme,
                  fontSize: width * 0.056,
                  fontFamily: 'Poppins-Bold',
                  alignSelf: 'center',
                  width: width * 0.8,
                  textAlign: 'center',
                }}>
                Message
              </Text>
              <Text
                style={{
                  color: Colors.blackish,
                  fontSize: width * 0.046,
                  fontFamily: 'Poppins-Medium',
                  alignSelf: 'center',
                  width: width * 0.8,
                }}>
                Ride Destination is Updated by User{' '}
                <Text style={{color: Colors.theme, fontFamily: 'Poppins-Bold'}}>
                  {RideDetail?.user?.first_name}
                </Text>{' '}
                So,Do you Accept these Changes?
              </Text>
              <SecondayButton
                onPress={() => {
                  handleChanges('ACCEPTED');
                }}
                title="Accept"
              />
              <SecondayButton
                onPress={() => {
                  handleChanges('REQUESTED');
                }}
                title="Cancel Ride"
              />
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default TrackingUser;

const styles = StyleSheet.create({
  Conatiner: {
    height: height * 0.35,
    width: width * 0.89,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    // borderTopEndRadius: width * 0.0325,
    // borderTopStartRadius: width * 0.0325,
    marginTop: -height * 0.035,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 18,
    borderRadius: width * 0.04,
    marginBottom: height * 0.023,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    color: Colors.theme,
    fontSize: width * 0.045,
    marginLeft: width * 0.035,
  },
  font: {
    fontFamily: 'Poppins-Medium',
    color: Colors.blackish,
    marginLeft: width * 0.0125,
    fontSize: width * 0.035,
  },
});
