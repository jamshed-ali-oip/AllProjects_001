import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ActivityIndicator, Linking } from 'react-native'
import React, { useState, useRef, useEffect, useContext } from 'react'
import Colors from '../../assets/Colors/Colors'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Header from '../../Compoents/Header/Header';
import { Google_API } from '../../config/GoogleApi';
import MapViewDirections from 'react-native-maps-directions';
import ImagePath from '../../config/ImagePath';
import { AuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
// import { io } from 'socket.io-client';
// import { Socket_URL } from '../../config/config';
const { height, width } = Dimensions.get("window")
const RideStart = ({ navigation, route }) => {
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    const { socket } = useContext(AuthContext)
    const [rideEnd, setrideEnd] = useState([])
    const [Livelocationatrack, setLivelocationatrack] = useState([])
    const emergencycallno = Country == "UKRAINE" ? "112" : "911"
    const RideData = useSelector((state) => state?.auth?.ride?.ride)
    console.log("mydetails", RideData)

    const mapRef = useRef()
    const [state, setState] = useState({
        pickUpCords: {
            latitude: parseFloat(RideData?.pickup_latitude),  /* 24.9623677,67.0463966, */
            longitude: parseFloat(RideData?.pickup_longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        dropOfCords: {
            latitude: parseFloat(RideData?.dropoff_latitude),
            longitude: parseFloat(RideData?.dropoff_longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    })
    socket.on('DRIVER_END_RIDE', (data) => {
        console.log('DRIVER_END_RIDE', data);
        setrideEnd(data)


    });
    socket.on('TRACK_LIVE_LOCATION', (data) => {
        console.log('TRACK_LIVE_LOCATION', data);
        setLivelocationatrack(data)


    });
    useEffect(() => {
        if (rideEnd.type === "DRIVER_END_RIDE") {
            navigation.navigate("TipScreen")
            // navigation.navigate("PaymentMthod")
        }
    }, [rideEnd])
    const live = {

        latitude: parseFloat(Livelocationatrack?.param?.latitude) || 24.9623677,  /* 24.9623677,67.0463966, */
        longitude: parseFloat(Livelocationatrack?.param?.longitude) || 67.0463966,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,

    }
    const { pickUpCords, dropOfCords } = state
    const [time, setTime] = useState()
    const [distance, setDistance] = useState()
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
                                    bottom: 300,
                                    left: 30,
                                    top: 100
                                }
                            })
                            setDistance(result?.distance),
                                setTime(result?.duration)

                        }}
                        optimizeWaypoints={true}
                    />
                </MapView>

                <View
                    style={styles.card}
                >

                    <View>
                        <Text
                            style={[styles.Name, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, }]}
                        >
                            {distance} KM
                        </Text>
                        <Text
                            style={styles.location_det}
                        >
                            {parseInt(time)} min
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => { Linking.openURL(`tel:${emergencycallno}`) }}
                            style={{ flexDirection: "row" }}
                        >
                            <Image
                                resizeMode='contain'
                                style={{ tintColor: "red" }}

                                source={require("../../assets/images/call.png")}
                            />
                            <Text
                                style={[styles.font, { textAlign: "center" }]}
                            >{Country == "UKRAINE" ? " Екстренний виклик" : " Emergency Assist"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </>

        </SafeAreaView >
    )
}

export default RideStart

const styles = StyleSheet.create({
    card: {
        height: height * 0.18,
        backgroundColor: Colors.white,
        // borderTopEndRadius: width * 0.04,
        // borderTopStartRadius: width * 0.04,
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
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: width * 0.04,
        marginBottom: height * 0.0125,
        flexDirection: "row",

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
        fontFamily: "Poppins-Medium",
        fontSize: width * 0.038,
        marginTop: -height * 0.005,
        color: Colors.text
    },
    locationBox: {
        marginLeft: width * 0.035
    },
    font: {
        fontFamily: "Poppins-Medium",
        color: Colors.blackish,
        marginLeft: width * 0.0125,
        fontSize: width * 0.035
    }
})