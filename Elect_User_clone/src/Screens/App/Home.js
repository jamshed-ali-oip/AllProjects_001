import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, Linking, Platform } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Colors from '../../assets/Colors/Colors'
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import Header from '../../Compoents/Header/Header';
import { Google_API } from '../../config/GoogleApi';
import MapViewDirections from 'react-native-maps-directions';
import ImagePath from '../../config/ImagePath';
import { CurrentLocation, locationPermission } from '../../config/LiveLocationHelper';
import { useDispatch, useSelector } from 'react-redux';
import { SecondayButton } from '../../Compoents/Buttons/BTN';
import { MylocationFinder } from '../../redux/actions/user.action';
const { height, width } = Dimensions.get("window")
const Home = ({ navigation, route }) => {
  const data = route.params
  console.log(data)
  const Startpoint = data?.start?.title
  const Endpoint = data?.end?.title
  const [location, SelectLocation] = useState()
  const [mylocation, setmylocation] = useState()
  const myinfo = useSelector((state) => state?.auth)
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
  const dispatch = useDispatch()
  console.log("my info", myinfo)
  useEffect(() => {
    getCurrentLocation();

  }, [])
  useEffect(() => {
    finder()
  }, [location])
  const getCurrentLocation = async () => {
    const PermissionDenied = await locationPermission()
    console.log("location permission", PermissionDenied)
    if (PermissionDenied) {
      const res = await CurrentLocation()
      SelectLocation(res)
      console.log("Response=========>>>>>>myyyy currentlocation>", res)
    }
  }
  const finder = async () => {
    const data = {
      latitude: location?.latitude?.toString(),
      longitude: location?.longitude?.toString()
    }
    const datamy = await dispatch(MylocationFinder(data))
    console.log("safjgvakgs__++++++++++++++++++++++", datamy)
    setmylocation(datamy)
  }

  const [state, setState] = useState({
    pickUpCords: {
      latitude: 24.9623677,  /* 24.9623677,67.0463966, */
      longitude: 67.0463966,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    dropOfCords: {
      latitude: Country == "UKRAINE" ? 48.379433 : 37.259674,
      longitude: Country == "UKRAINE" ? 31.165581 : -95.545410,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  })
  const [time, setTime] = useState()
  const [distance, setDistance] = useState()
  const ProfileData = useSelector((state) => state?.auth?.userInfo)
  const { pickUpCords, dropOfCords } = state
  const mapRef = useRef()
  console.log("=======================================", mylocation?.data?.data?.entity[0])
  const LocationMaping = {
    title: mylocation?.data?.data?.entity[0]?.formattedAddress,
    latitude: location?.latitude?.toString(),
    longitude: location?.longitude?.toString()
  }
  console.log("first", location)

  console.log("first")
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.bg }}
    >
      <Header
        onPress={() => { navigation.openDrawer(); }}
      />
      <>
        <MapView
          ref={mapRef}
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
          initialRegion={dropOfCords}
        >
          <Circle
            center={{ latitude: 24.9107, longitude: 67.0311 }} // Replace with your desired coordinates
            radius={1000} // Replace with your desired radius
            strokeColor="transparent"
            fillColor="rgba(18, 109, 106, 0.5)"
            zIndex={2}
          />
          {/* <Marker
            coordinate={pickUpCords}
            image={ImagePath.DropOff}
          /> */}
          {/* <Marker
            coordinate={dropOfCords}
            image={ImagePath.DropOff}
          /> */}
          {/* <MapViewDirections
            origin={pickUpCords}
            destination={dropOfCords}
            apikey={Google_API}
            strokeWidth={4}
            strokeColor={Colors.theme}
            onReady={result => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 300,
                  left: 30,
                  top: 100
                }
              })
              setDistance(result?.distance),
                setTime(result?.duration)

              console.log("distance", result.distance)
              console.log("dusration", result.duration)
            }}
            optimizeWaypoints={true}
          /> */}
        </MapView>

        <View
          style={styles.card}
        >
          {/* <Text>Distance :{distance} KM</Text>
          <Text>Time :{time} Min</Text> */}
          <Text
            style={[styles.Name, { color: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme }]}
          >
            {Country == "UKRAINE" ? "привіт" : "Howdy"},{ProfileData?.first_name}{" "}{ProfileData?.last_name}
          </Text>
          <Text
            style={[styles.titletext, { color: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme }]}
          >
            {Country == "UKRAINE" ? "привіт" : "Where to?"}
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginLeft: width * 0.005 }}
          >
            <Image
              style={{
                resizeMode: "contain",
                height: height * 0.05,
                marginRight: width * 0.005,
                tintColor: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme
              }}
              source={require("../../assets/images/drop.png")}
            />
            <View>
              <Text
                style={styles.firsttext}
              >
                {mylocation?.data?.data?.entity[0]?.city}
              </Text>
              <Text
                style={styles.secondtext}
              >
                {mylocation?.data?.data?.entity[0]?.formattedAddress?.slice(0, 45)}

              </Text></View>
          </View>
          {/* <TouchableOpacity
            onPress={() => { navigation.navigate("SelectLocation") }}
            activeOpacity={100}
            style={styles.input}
          >
            <Image style={[styles.icon, { tintColor: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme }]} source={require("../../assets/images/search.png")} />
            <Text
              style={{ fontSize: width * 0.04, fontFamily: "Poppins-Regular", color: Colors.placeholder }}
            >{Country == "UKRAINE" ? "Куди ти йдеш?" : "Where are you going?"}</Text>
            <Image style={[styles.icon, { tintColor: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme }]} source={require("../../assets/images/car.png")} />
          </TouchableOpacity> */}
          <SecondayButton
            onPress={() => { navigation.navigate("SelectLocation", { data: LocationMaping }) }}
            title={Country == "UKRAINE" ? "Підтвердьте пункт призначення" : "Confirm Destination"} />

        </View>
      </>

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  card: {
    height: height * 0.3,
    backgroundColor: Colors.white,
    borderTopEndRadius: width * 0.04,
    borderTopStartRadius: width * 0.04,
    marginTop: -height * 0.0135,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    width: width * 0.95,
    alignSelf: "center",
    paddingLeft: width * 0.065,
  },
  Name: {
    fontFamily: "Poppins-Bold",
    color: Colors.theme,
    fontSize: width * 0.05,
    marginTop: width * 0.0425,
    marginBottom: Platform.OS == "ios" ? height * 0.005 : null,
    marginLeft: width * 0.035
  },
  titletext: {
    fontFamily: "Poppins-Bold",
    color: Colors.theme,
    fontSize: width * 0.037,
    marginTop: width * 0.003,
    marginBottom: Platform.OS == "ios" ? height * 0.005 : null,
    marginLeft: width * 0.035
  },
  firsttext: {
    fontFamily: "Poppins-Bold",
    color: Colors.text,
    fontSize: width * 0.036,
    marginTop: width * 0.003,
    marginBottom: Platform.OS == "ios" ? height * 0.005 : null
  },
  secondtext: {
    fontFamily: "Poppins-Regular",
    color: Colors.text,
    fontSize: width * 0.03,
    marginTop: width * 0.003,
    marginBottom: Platform.OS == "ios" ? height * 0.005 : null
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: Colors.placeholder,
    width: width * 0.8,
    borderRadius: width * 0.0125,
    height: height * 0.06,
    paddingHorizontal: width * 0.035
  },
  icon: {
    resizeMode: "contain"
  },
  location: {
    fontFamily: "Poppins-Medium",
    fontSize: width * 0.035
  },
  location_det: {
    fontFamily: "Poppins-Regular",
    fontSize: width * 0.03,
    marginTop: -height * 0.005
  },
  locationBox: {
    marginLeft: width * 0.035
  }
})