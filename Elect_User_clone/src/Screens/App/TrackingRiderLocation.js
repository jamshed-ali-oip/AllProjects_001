import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useRef, useEffect, useContext } from 'react'
import Colors from '../../assets/Colors/Colors'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Header from '../../Compoents/Header/Header';
import { Google_API } from '../../config/GoogleApi';
import MapViewDirections from 'react-native-maps-directions';
import ImagePath from '../../config/ImagePath';
import { DetailsInput } from '../../Compoents/Inputs/Inputs';
import { SecondayButton } from '../../Compoents/Buttons/BTN';
import { useDispatch, useSelector } from 'react-redux';
import { RideCancel, RideDetail, confirmRideRequest } from '../../redux/actions/ride.action';
import { AuthContext } from '../../context/AuthContext';
// import { io } from 'socket.io-client';
// import { Socket_URL } from '../../config/config';
const { height, width } = Dimensions.get("window")
const TrackingRiderLocation = ({ navigation, route }) => {
    const [RequestWaiting, setRequestWaiting] = useState([])
    const [DriverArrival, setDriverArrival] = useState([])
    const [DriverRidestart, setDriverRidestart] = useState([])
    const [Livelocationatrack, setLivelocationatrack] = useState([])
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    // const location = route.params
    const RideDEtail = useSelector((state) => state?.auth?.ride?.ride)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    console.log("RideDetails", RideDEtail)
    const dispatch = useDispatch()
    // const socket = io(Socket_URL);
    const { socket } = useContext(AuthContext)
    const EventDetail = useSelector((i) => i?.auth?.ride?.ride)
    console.log("Riderrrrrrrrrr#########", EventDetail)


    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setTotalSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isRunning]);
    const startTimer = () => {
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setTotalSeconds(0);
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
        return `${formattedMinutes}:${formattedSeconds}`;
    };
    socket.on('DRIVER_STARTED_RIDE', (data) => {
        console.log('DRIVER_STARTED_RIDE', data);
        setDriverRidestart(data)

    });
    // socket.on('TRACK_LIVE_LOCATION', (data) => {
    //     console.log('TRACK_LIVE_LOCATION', data);
    //     setLivelocationatrack(data)


    // });
    useEffect(() => {
        startTimer()
        socket.on('RIDE_REQUEST_CANCELLED', (data) => {
            navigation?.navigate("Home")
            stopTimer()
            resetTimer()
        })
    }, [])
    const cancelRide = () => {
        const eventData = {
            rideId: RideDEtail?.id,
            userId: RideDEtail?.userId
        };
        const eventName = 'REQUEST_CANCELLED';
        // Emit the event to the server
        socket.emit(eventName, JSON.stringify(eventData));
        dispatch(RideCancel(RideDEtail?.id, navigation))
    }
    useEffect(() => {
        if (DriverRidestart.type === "DRIVER_STARTED_RIDE") {

            navigation.navigate("RideStart")
        }
    }, [DriverRidestart])
    console.log(RequestWaiting, "RequestWaiting")
    const mapRef = useRef()
    console.log("live location", Livelocationatrack?.param?.latitude)
    const [state, setState] = useState({
        pickUpCords: {
            latitude: parseFloat(Livelocationatrack?.param?.latitude) || 24.9623677,  /* 24.9623677,67.0463966, */
            longitude: parseFloat(Livelocationatrack?.param?.longitude) || 67.0463966,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        dropOfCords: {
            latitude: 24.9107,
            longitude: 67.0311,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    })

    const { pickUpCords, dropOfCords } = state

    const live = {

        latitude: parseFloat(Livelocationatrack?.param?.latitude) || 24.9623677,  /* 24.9623677,67.0463966, */
        longitude: parseFloat(Livelocationatrack?.param?.longitude) || 67.0463966,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,

    }

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
                    initialRegion={live}
                >
                    <Marker
                        coordinate={live}
                        image={ImagePath.DropOff}
                    />
                    <Marker
                        coordinate={dropOfCords}
                        image={ImagePath.DropOff}
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
                                    right: 30,
                                    bottom: 600,
                                    left: 30,
                                    top: 100
                                }
                            })

                        }}
                        optimizeWaypoints={true}
                    />
                </MapView>





                <View
                    style={[styles.card2, { backgroundColor: Country == "UKRAINE" ? Colors.Yellow : Colors.theme, }]}
                >
                    <View
                        style={styles.card3}
                    >
                        <View
                            style={{ flexDirection: "row" }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Poppins-Bold",
                                    color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                                    fontSize: width * 0.0425,
                                    marginLeft: width * 0.069,
                                    marginVertical: height * 0.015,
                                    width: width * 0.75
                                }}
                            >{Country == "UKRAINE" ? "Водій прибув" : "Driver Arrived"}</Text>
                            <TouchableOpacity
                                onPress={() => { cancelRide() }}
                                style={{
                                    margin: width * 0.035
                                }}
                            >
                                <Image
                                    style={{ resizeMode: "contain", tintColor: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme }}
                                    source={require("../../assets/images/cut.png")}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                borderBottomColor: Colors.placeholder,
                                borderBottomWidth: 1,
                                width: width * 0.8,
                                alignSelf: "center"
                            }}
                        ></View>

                        <View
                            style={{ flexDirection: "row", marginTop: height * 0.035, alignItems: "center", paddingHorizontal: width * 0.035 }}
                        >
                            <Image
                                style={{
                                    // resizeMode: "contain",
                                    alignSelf: "center",
                                    margin: width * 0.01,
                                    height: height * 0.06,
                                    width: width * 0.12,
                                    backgroundColor: Colors.placeholder,
                                    resizeMode: "cover",
                                    borderRadius: 100
                                }}
                                source={{ uri: `${RideDEtail?.driver?.profile_picture}` }}
                            />
                            <View style={{ width: width * 0.75 }} >
                                <View
                                    style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: width * 0.035 }}

                                >
                                    <Text
                                        style={{
                                            color: Country == "UKRAINE" ? Colors.Yellow : Colors.theme,
                                            fontFamily: "Poppins-Regular",
                                            fontSize: width * 0.03
                                        }}
                                    >{Country == "UKRAINE" ? "Водій" : "Driver"}</Text>
                                    <Text
                                        style={{
                                            color: Colors.text,
                                            fontFamily: "Poppins-Regular",
                                            fontSize: width * 0.03
                                        }}
                                    >{Country == "UKRAINE" ? "Звинувачення" : "Charges"}</Text>
                                </View>
                                <View
                                    style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: width * 0.035 }}

                                >
                                    <Text
                                        style={{
                                            color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                                            fontFamily: "Poppins-Medium",
                                            fontSize: width * 0.035
                                        }}
                                    >{RideDEtail?.user?.first_name}{" "}{RideDEtail?.user?.last_name}</Text>
                                    <Text
                                        style={{
                                            color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                                            fontFamily: "Poppins-Medium",
                                            fontSize: width * 0.035
                                        }}
                                    > {Country == "UKRAINE" ? "₴" : "$ "}{RideDEtail?.ridePayment[0]?.total / 100}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text
                        style={{
                            color: Colors.white,
                            fontFamily: "Poppins-Regular",
                            fontSize: width * 0.032,
                            textAlignVertical: "center",
                            alignSelf: "center"
                        }}
                    >
                        {Country == "UKRAINE" ? "Водій у вашому місці посадки" : "Driver is at your Pickup Location"}
                        {/* Rider is 6 KM away from you  Will be there in 15 min */}
                    </Text>
                    <Text
                        style={{
                            color: Colors.white,
                            fontFamily: "Poppins-Regular",
                            fontSize: width * 0.03,
                            textAlignVertical: "center",
                            alignSelf: "center",
                            marginTop: -height * 0.008
                        }}
                    >Waiting Time: {formatTime(totalSeconds)}</Text>
                </View>
            </>

        </SafeAreaView >
    )
}

export default TrackingRiderLocation

const styles = StyleSheet.create({
    card: {
        height: height * 0.4,
        backgroundColor: Colors.white,
        // borderTopEndRadius: width * 0.04,
        // borderTopStartRadius: width * 0.04,
        borderRadius: width * 0.04,
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
        marginBottom: height * 0.0125
    },
    Name: {
        fontFamily: "Poppins-Bold",
        color: Colors.theme,
        fontSize: width * 0.05,
        marginTop: width * 0.0425
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
    },
    card2: {
        height: height * 0.28,
        // backgroundColor: Colors.Orange,
        // borderTopEndRadius: width * 0.04,
        // borderTopStartRadius: width * 0.04,
        borderRadius: width * 0.04,
        marginTop: -height * 0.0135,
        shadowColor: Colors.Orange,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 50,
        width: width * 0.95,
        alignSelf: "center",
        // paddingLeft: width * 0.065,
        marginBottom: height * 0.0325
    },
    card3: {
        height: height * 0.23,
        backgroundColor: Colors.white,
        borderRadius: width * 0.04,
        width: width * 0.95,
        alignSelf: "center",

    },
})