import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
  Platform
} from 'react-native';
import React, { useEffect, useRef, useState, useContext } from 'react';
import Colors from '../../assets/Colors/Colors';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Header from '../../Compoents/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import {
  RequestAccept,
  RideRequests,
  VehicleCheck,
} from '../../redux/actions/driver.action';
import { Google_API } from '../../config/GoogleApi';
import MapViewDirections from 'react-native-maps-directions';
import Vehicle from './Vehicle';
import { PrimaryButton, PrimaryWhite } from '../../Compoents/Buttons/BTN';
import { ScrollView } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { locationFinder } from '../../helper/location';

import { AuthContext } from '../../context/AuthContext';
import {
  CurrentLocation,
  locationPermission,
} from '../../config/livelocationhelper';
// import MapAdress from '../../Compoents/MapAdress'

const { height, width } = Dimensions.get('window');
const Home = ({ navigation }) => {
  const [liveLocation, setLiveLocation] = useState([]);
  const [Loading, setLoading] = useState(false);
  const ProfileData = useSelector((state) => state?.auth?.userInfo)
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

  console.log("profileData", ProfileData)
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    const PermissionDenied = await locationPermission();
    // console.log('location permission', PermissionDenied);
    if (PermissionDenied) {
      const res = await CurrentLocation();
      // console.log('Response=========>>>>>>>', res);
      setLiveLocation(res);
    }
  };

  const dispatch = useDispatch();
  const CheckVehicle = () => {
    dispatch(VehicleCheck());
  };
  useEffect(() => {
    CheckVehicle();
  }, []);
  const Vehicle_Data = useSelector(state => state?.auth?.vehicle?.vehicle);
  const Driver = useSelector(state => state?.auth?.accesToken?.user?.id);
  const RRR = useSelector(state => state?.auth);
  console.log("RRRRRR", RRR)
  // console.log('Driver', Driver);
  const [state, setState] = useState({
    // pickUpCords: {
    //   latitude: liveLocation?.latitude||24.9623677,  /* 24.9623677,67.0463966, */
    //   longitude: liveLocation?.longitude||67.0463966,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // },
    dropOfCords: {
      latitude: 24.9107,
      longitude: 67.0311,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });
  const live = {
    latitude: liveLocation?.latitude || 24.9623677 /* 24.9623677,67.0463966, */,
    longitude: liveLocation?.longitude || 67.0463966,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const [time, setTime] = useState();
  const [distance, setDistance] = useState();
  const [Rides, setRides] = useState([]);
  const [Ride, setRide] = useState();

  const [Request, setRequest] = useState([]);
  const { socket } = useContext(AuthContext);
  const MyStatus = useSelector(state => state.auth.status);
  const { pickUpCords, dropOfCords } = state;
  const mapRef = useRef();

  useEffect(() => {
    const eventName = 'WAITING_FOR_RIDE';
    const eventData = { riderId: Driver };

    // Emit the event to the server
    socket.emit(eventName, JSON.stringify(eventData));
    // console.log('object');
  }, []);
  useEffect(() => {
    RequestDone()
  }, [RRR])

  const RequestDone = async () => {
    const data = await RideRequests();
    // console.log('okookokokok', data);
    setRides(data?.data?.data?.rides)
  };
  console.log("ridessss", Rides)
  socket.on('USER_CREATE_NEW_REQUEST', data => {
    // console.log('USER_CREATE_NEW_REQUEST hogya ', data);
    // setRides(data);
    RequestDone();
    // let data1 = JSON.parse(data?.param);
    // let rides=Request;
    // // const RidesData = Rides.length !== 0 ? JSON?.parse(Rides?.param) : [];
    // console.log('Rides event', data1);
    // rides.push(data1);
    // console.log(object)
    // setRequest(rides);
  });
  // useEffect(()=>{
  //   return RequestDone()
  // },[])



  const AcceptRide = item => {
    console.log('first', item?.item?.id);
    // RequestDone()
    setLoading(true)
    dispatch(RequestAccept(item?.item?.id, navigation, setRides, setLoading)).then(() => {
      RequestDone()
    });
  };

  const Riderdetail = item => {
    // console.log('itemsss6547f7ds7f7sdf79ds7f97ds9f7', item);
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',

          padding: width * 0.045,
        }}>
        <Image
          style={{
            // resizeMode: "contain",
            alignSelf: "center",
            margin: width * 0.01,
            height: height * 0.08,
            width: width * 0.15,
            backgroundColor: Colors.theme,
            resizeMode: "cover",
            borderRadius: 100
          }}
          source={{ uri: `${item?.item?.user?.profile_picture}` }}
        />
        <View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.name2}>{item?.item?.user?.gender}</Text>
              <Text style={[styles.name, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme }]}>
                {item?.item?.user?.first_name?.slice(0, 9)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: width * 0.03,
                marginTop: height * 0.01,
              }}>
              {/* Accept  */}
              <TouchableOpacity
                style={{
                  backgroundColor: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                  height: height * 0.03,
                  width: width * 0.2,
                  borderRadius: width * 0.0325,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,

                  elevation: 7,
                }}
                onPress={() => {
                  AcceptRide(item);
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: width * 0.025,
                    color: Colors.white,
                  }}>
                  {Country == "UKRAINE" ? "прийняти" : "Accept"}
                </Text>
              </TouchableOpacity>
              {/* reject  */}
              <TouchableOpacity
                onPress={() => {
                  setRides(Rides?.filter(e => e.id !== item.item.id));
                }}
                style={{
                  backgroundColor: Colors.white,
                  height: height * 0.03,
                  width: width * 0.18,
                  borderRadius: width * 0.0325,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,

                  elevation: 7,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: width * 0.025,
                    color: Colors.blackish,
                  }}>
                  {Country == "UKRAINE" ? "Відхиляти" : "Reject"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              fontSize: width * 0.03,
              marginLeft: width * 0.05,
              // marginTop: -height * 0.0125,
              fontStyle: 'italic',
              color: Colors.text,
              marginBottom: height * 0.0025,
              backgroundColor: '#d8eeed',
              width: width * 0.45,
              borderRadius: Platform.OS == "ios" ? width * 0.5 : width * 0.023,
              paddingLeft: width * 0.018,
            }}>
            {item?.item?.pickup_address.slice(0, 8)}.. TO{' '}
            {item?.item?.dropoff_address.slice(2, 15)}...
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      {Vehicle_Data?.length == 0 ? (
        <Vehicle />
      ) : (
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
              coordinate={dropOfCords}
            // image={ImagePath.DropOff}
            />
            <MapViewDirections
              origin={live}
              destination={dropOfCords}
              apikey={Google_API}
              strokeWidth={4}
              strokeColor={Colors.theme}
              onReady={result => {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  },
                });
                setDistance(result?.distance), setTime(result?.duration);

                // console.log("distance", result.distance)
                // console.log("dusration", result.duration)
              }}
              optimizeWaypoints={true}
            />
          </MapView>

          {MyStatus === true ? (
            <View style={styles.Conatiner}>
              {Rides?.length == 0 ? (
                <View
                  style={{
                    marginTop: height * 0.15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* <ActivityIndicator size="large" color={Colors.theme} /> */}
                  <Image source={Country == "UKRAINE" ? require('../../assets/images/loadukr.gif') : require('../../assets/images/load.gif')} />
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                      fontSize: width * 0.035,
                      marginTop: height * 0.015,
                    }}>
                    {Country == "UKRAINE" ? "Чекаю поїздки.." : " Waiting For Ride.."}
                  </Text>
                </View>
              ) : (
                <>{Loading == false ?
                  <FlatList
                    data={Rides}
                    renderItem={Riderdetail}
                    keyExtractor={item => item?.id}
                  /> :
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: height * 0.15
                    }}
                  >
                    <ActivityIndicator
                      color={Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme}
                      size={"large"}
                    />
                    <Text
                      style={{
                        fontFamily: "Poppins-Medium",
                        alignSelf: "center",
                        fontSize: width * 0.035,
                        color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                      }}
                    >
                      {Country == "UKRAINE" ? "Прийняття поїздки" : " Accepting Ride"}
                    </Text>
                  </View>
                }</>
              )}

              <Text></Text>
            </View>
          ) : null}
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Conatiner: {
    height: height * 0.4,
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
    borderRadius: width * 0.04,
    elevation: 18,
    marginBottom: height * 0.023,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    color: Colors.theme,
    fontSize: width * 0.046,
    marginLeft: width * 0.035,
    width: width * 0.22,
    // backgroundColor:"red"
  },
  name2: {
    fontFamily: 'Poppins-Regular',
    color: Colors.text,
    fontSize: Platform.OS == "ios" ? width * 0.025 : width * 0.03,
    marginLeft: width * 0.035,
    marginBottom: Platform.OS == "ios" ? -height * 0.005 : -height * 0.014,
  },
});
