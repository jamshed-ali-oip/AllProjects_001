import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native'
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
import { RideDetail, confirmRideRequest } from '../../redux/actions/ride.action';
import { AuthContext } from '../../context/AuthContext';
// import { io } from 'socket.io-client';
// import { Socket_URL } from '../../config/config';
const { height, width } = Dimensions.get("window")
const WaitingforRider = ({ navigation, route }) => {

    const [RequestWaiting, setRequestWaiting] = useState([])
    const [DriverArrival, setDriverArrival] = useState([])
    const [DriverRidestart, setDriverRidestart] = useState([])
    const [Livelocationatrack, setLivelocationatrack] = useState([])
    // const location = route.params
    const RideDEtail = useSelector((state) => state?.auth?.ride?.ride)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    console.log("RideDetails", RideDEtail)
    console.log("====================>>>>>>>>>", RequestWaiting)
    const dispatch = useDispatch()
    // const socket = io(Socket_URL);
    const { socket } = useContext(AuthContext)
    const EventDetail = useSelector((i) => i?.auth?.ride?.ride)
    console.log("Riderrrrrrrrrr#########", EventDetail)
    useEffect(() => {
        const eventName = 'REQUEST_CREATE';
        // Emit the event to the server
        socket.emit(eventName, JSON.stringify(EventDetail))
    }, [])
    socket.on('USER_CREATE_NEW_REQUEST', (data) => {
        console.log('USER_CREATE_NEW_REQUEST', data);

    });
    socket.on('RIDE_WAITING_ROOM', (data) => {
        console.log('RIDE_WAITING_ROOM', data);

    });
    socket.on('RIDE_REQUEST_ACCEPTED', (data) => {
        console.log('RIDE_REQUEST_ACCEPTED', data);
        navigation.navigate("OnWay")
        setRequestWaiting(data)

    });
    console.log("onwaitingggggggggggggggggg")
    const [state, setState] = useState({
        pickUpCords: {
            latitude: 24.9623677,  /* 24.9623677,67.0463966, */
            longitude: 67.0463966,
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
    useEffect(() => {
        Ridersss()
    }, [RequestWaiting])
    const Ridersss = async () => {
        if (RequestWaiting?.type === "RIDE_REQUEST_ACCEPTED") {
            dispatch(RideDetail(RequestWaiting?.param?.rideId))
        }
    }
    socket.on('DRIVER_ARRIVED_PICKUP_POINT', (data) => {
        console.log('DRIVER_ARRIVED_PICKUP_POINT', data);
        setDriverArrival(data)


    });

    const mapRef = useRef()



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
                    initialRegion={pickUpCords}
                >
                    <Marker
                        coordinate={pickUpCords}
                        image={ImagePath.DropOff}
                    />
                    <Marker
                        coordinate={dropOfCords}
                        image={ImagePath.DropOff}
                    />
                    <MapViewDirections
                        origin={pickUpCords}
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
                    style={styles.card}

                >
                    <>


                        <Image
                            style={{ alignSelf: "center", marginTop: height * 0.1, resizeMode: "contain" }}
                            source={Country == "UKRAINE" ? require("../../assets/images/Loader/loadukr.gif") : require("../../assets/images/Loader/load.gif")}
                        />
                        <Text
                            style={{
                                alignSelf: "center",
                                fontFamily: "Poppins-Bold",
                                color: Colors.theme,
                                marginTop: height * 0.0125
                            }}
                        >{Country == "UKRAINE" ? "Очікування водія" : "Waiting For Driver"}</Text>
                    </>

                </View>



            </>

        </SafeAreaView >
    )
}

export default WaitingforRider

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
        backgroundColor: Colors.Orange,
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