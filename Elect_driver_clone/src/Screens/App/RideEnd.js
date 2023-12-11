
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Image, ActivityIndicator
} from 'react-native'
import React, { useEffect, useRef, useState, useContext } from 'react'
import Colors from '../../assets/Colors/Colors'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Header from '../../Compoents/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RideEnding, VehicleCheck } from '../../redux/actions/driver.action';
import { Google_API } from '../../config/GoogleApi';
import MapViewDirections from 'react-native-maps-directions';
import Vehicle from './Vehicle';
import { PrimaryButton, PrimaryWhite } from '../../Compoents/Buttons/BTN';
import { AuthContext } from '../../context/AuthContext';
import { CurrentLocation, locationPermission } from '../../config/livelocationhelper';
const { height, width } = Dimensions.get("window")

const RideEnd = ({ navigation }) => {
    const { socket } = useContext(AuthContext)
    const dispatch = useDispatch()
    const RideDetail = useSelector((state) => state?.auth?.ride?.ride)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    const [time, setTime] = useState()
    const [liveLocation, setLiveLocation] = useState([]);
    const [distance, setDistance] = useState()
    const [Loading, setLoading] = useState(false);
    const RideData = useSelector((state) => state?.auth?.ride?.ride)
    const Driver = useSelector((state) => state?.auth?.accesToken?.user?.id)
    const RideID = useSelector((state) => state?.auth?.ride?.ride?.id)
    //    console.log("RideData?.driver?.id",RideData?.driver?.id)
    useEffect(() => {
        getCurrentLocation();
    }, []);
    const livelocationtracking = () => {
        const eventName = 'LIVE_LOCATION';
        const eventData = {
            riderId: Driver,
            rideId: RideID,
            userId: RideData?.user?.id,
            longitude: liveLocation?.longitude?.toString(),
            latitude: liveLocation?.latitude?.toString()
        };
        console.log(eventData)
        // Emit the event to the server
        socket.emit(eventName, JSON.stringify(eventData))
    }
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
    useEffect(() => {
        const interval = setInterval(() => {
            getCurrentLocation()
            livelocationtracking()
        }, 5000);
        return () => clearInterval(interval);
    })
    useEffect(() => {
        const eventName = 'RIDE_START';
        const eventData = {
            userId: RideData?.user?.id,
            rideId: RideData?.id,
            riderId: RideData?.driver?.id
        };

        // Emit the event to the server
        socket.emit(eventName, JSON.stringify(eventData))

    }, [])
    const pickUpCords = {
        latitude: parseFloat(RideDetail?.pickup_latitude),  /* 24.9623677,67.0463966, */
        longitude: parseFloat(RideDetail?.pickup_longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
    const DropOfData = {
        latitude: parseFloat(RideDetail?.dropoff_latitude),
        longitude: parseFloat(RideDetail?.dropoff_longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
    const RideEndHandle = () => {
        setLoading(true)
        dispatch(RideEnding(RideDetail?.id, navigation, setLoading))
        const eventName = 'RIDE_END';
        const eventData = {
            userId: RideData?.user?.id,
            rideId: RideData?.id,
            riderId: RideData?.driver?.id
        };

        // Emit the event to the server
        socket.emit(eventName, JSON.stringify(eventData))
    }
    console.log("object", RideDetail)
    const mapRef = useRef()
    return (

        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.bg }}
        >


            <>
                <Header
                    onPress={() => { navigation.openDrawer(); }}
                />

                <MapView
                    ref={mapRef}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1
                    }}
                    initialRegion={live}
                >
                    <Marker
                        coordinate={live}
                    // image={ImagePath.DropOff}
                    />
                    <Marker
                        coordinate={DropOfData}
                    // image={ImagePath.DropOff}
                    />
                    <MapViewDirections
                        origin={live}
                        destination={DropOfData}
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
                    />
                </MapView>

                <View
                    style={styles.Conatiner}
                >
                    <View
                        style={{ flexDirection: "row", alignItems: "center", padding: width * 0.035 }}
                    >
                        <TouchableOpacity
                            disabled={true}
                            style={{
                                backgroundColor: Colors.white,
                                padding: width * 0.018,
                                // borderRadius: 100,
                                // borderWidth: 1,
                                // borderColor: Colors.theme
                            }}
                        >
                            {/* <Image
                                source={require("../../assets/images/cut.png")}
                            /> */}
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontFamily: "Poppins-Bold",
                                color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                                fontSize: width * 0.055,
                                alignSelf: "center",
                                marginLeft: width * 0.29
                            }}
                        >{parseInt(time)} min</Text>
                    </View>
                    <Text
                        style={{
                            fontFamily: "Poppins-Regular",
                            color: Colors.text,
                            fontSize: width * 0.035,
                            alignSelf: "center",
                            // marginLeft: width * 0.25
                        }}
                    >{distance} KM </Text>
                    <PrimaryButton
                        onPress={() => { RideEndHandle() }}
                        title={Loading == true ? <ActivityIndicator size={"small"} color={Colors.white} /> : Country == "UKRAINE" ? "Кінець їзди" : "Ride End"} />

                </View>
            </>


        </SafeAreaView>
    )
}

export default RideEnd

const styles = StyleSheet.create({
    Conatiner: {
        height: height * 0.25,
        width: width * 0.89,
        backgroundColor: Colors.white,
        alignSelf: "center",
        // borderTopEndRadius: width * 0.0325,
        // borderTopStartRadius: width * 0.0325,
        marginTop: -height * 0.035,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.57,
        shadowRadius: 15.19,
        elevation: 18,
        borderRadius: width * 0.04,
        marginBottom: height * 0.023

    },
    name: {
        fontFamily: "Poppins-Bold",
        color: Colors.theme,
        fontSize: width * 0.045,
        marginLeft: width * 0.035
    }, font: {
        fontFamily: "Poppins-Medium",
        color: Colors.blackish,
        marginLeft: width * 0.0125,
        fontSize: width * 0.035
    }
})