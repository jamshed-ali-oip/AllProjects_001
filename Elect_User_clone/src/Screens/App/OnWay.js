import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ActivityIndicator, Linking, Platform } from 'react-native'
import React, { useState, useRef, useEffect, useContext } from 'react'
import Colors from '../../assets/Colors/Colors'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Header from '../../Compoents/Header/Header';
import { Google_API } from '../../config/GoogleApi';
import MapViewDirections from 'react-native-maps-directions';
import ImagePath from '../../config/ImagePath';
import { DetailsInput, GoogleInput } from '../../Compoents/Inputs/Inputs';
import { SecondayButton } from '../../Compoents/Buttons/BTN';
import { useDispatch, useSelector } from 'react-redux';
import { ChatIDAPI, Locationupdate, RideCancel, RideDetail, RideDetail2, confirmRideRequest } from '../../redux/actions/ride.action';
import { AuthContext } from '../../context/AuthContext';
import Geocoder from 'react-native-geocoding';
// import { io } from 'socket.io-client';
// import { Socket_URL } from '../../config/config';
const { height, width } = Dimensions.get("window")
const OnWay = ({ navigation, route }) => {
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    console.log("ONWAYYYYYYYYYYY")
    const [RequestWaiting, setRequestWaiting] = useState([])
    const [time, setTime] = useState()
    const [distance, setDistance] = useState()
    const [Livelocationatrack, setLivelocationatrack] = useState([])
    const [edittoggle, setedittoggle] = useState(false)
    const [editDetail, seteditDetail] = useState()
    const [Load, setLoad] = useState(false)
    // const location = route.params
    const RideDEtail = useSelector((state) => state?.auth?.ride?.ride)
    console.log("888888888************", RideDEtail)
    const dispatch = useDispatch()
    // const socket = io(Socket_URL);
    const { socket } = useContext(AuthContext)
    const EventDetail = useSelector((i) => i?.auth?.ride?.ride)
    useEffect(() => {
        const data = {
            participants: [
                `${RideDEtail?.driverId}`
            ],
            name: "okklh"
        }
        dispatch(ChatIDAPI(data))
    }, [RideDEtail])
    const CONVO_ID = useSelector((state) => state?.auth?.Coversation)
    console.log("RideDetails", RideDEtail)
    console.log("CONVO_ID", CONVO_ID)
    socket.on('TRACK_LIVE_LOCATION', (data) => {
        console.log('TRACK_LIVE_LOCATION', data);
        setLivelocationatrack(data)


    });
    socket.on('DRIVER_ARRIVED_PICKUP_POINT', (data) => {
        console.log('DRIVER_ARRIVED_PICKUP_POINT', data);
        navigation.navigate("TrackingRiderLocation")
    });
    useEffect(() => {
        socket.on('RIDE_REQUEST_CANCELLED', (data) => {
            navigation?.navigate("Home")
        })
        socket.on('LOCATION_UPDATE_REQUEST', data => {
            handleUpdates()
        });
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

    const eventData = {
        id: RideDEtail?.id,
        userId: RideDEtail?.userId
    };
    const eventName = 'JOIN_CHAT_ROOM';
    // Emit the event to the server
    socket.emit(eventName, JSON.stringify(eventData));

    const mapRef = useRef()
    console.log("live location", Livelocationatrack?.param?.latitude)
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

    const live = {

        latitude: parseFloat(Livelocationatrack?.param?.latitude) || 24.9623677,  /* 24.9623677,67.0463966, */
        longitude: parseFloat(Livelocationatrack?.param?.longitude) || 67.0463966,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,

    }
    Geocoder.init(Google_API)
    console.log("my target", editDetail?.results[0])
    const handleUpdates = async () => {
        const data = await dispatch(RideDetail2(RideDEtail?.id))

        // setTimeout(() => {
        //     handleUpdates()
        // }, 4000);
        //    console.log(object)
        // alert(data)
        if (data == "ACCEPTED") {
            setLoad(false),
                setedittoggle(false)
        } else {
            navigation?.navigate("WaitingforRider")
        }
    }
    const handleupadtelocaion = async () => {
        const body = {
            dropoff_address: editDetail?.results[0]?.formatted_address,
            dropoff_latitude: editDetail?.results[0]?.geometry?.location?.lat?.toString(),
            dropoff_longitude: editDetail?.results[0]?.geometry?.location?.lng?.toString()
        }
        dispatch(Locationupdate(RideDEtail?.id, body, setedittoggle))
        setLoad(true)
        setTimeout(() => {
            const eventData = {
                userId: RideDEtail?.user?.id,
                rideId: RideDEtail?.id,
                riderId: RideDEtail?.driver?.id
            };

            const eventName = 'LOCATION_UPDATE';
            // Emit the event to the server
            socket.emit(eventName, JSON.stringify(eventData));
        }, 5000);


    }
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.bg }}
        >
            <Header
                onPress={() => { navigation.openDrawer(); }}
            />
            {edittoggle == false ?
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
                            coordinate={live}
                            image={ImagePath.DropOff}
                        />
                        <MapViewDirections
                            origin={pickUpCords}
                            destination={live}
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
                                setDistance(result?.distance),
                                    setTime(result?.duration)

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
                                style={{ flexDirection: "column" }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "Poppins-Bold",
                                        color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                                        fontSize: width * 0.0425,
                                        marginLeft: width * 0.069,
                                        marginTop: height * 0.015,
                                        // marginVertical: height * 0.015,
                                        marginBottom: Platform.OS == "ios" ? height * 0.002 : null,
                                        width: width * 0.75
                                    }}
                                >{Country == "UKRAINE" ? "Водій уже в дорозі" : "Driver is on the way"}</Text>
                                <TouchableOpacity
                                    disabled={true}
                                    // onPress={() => { cancelRide() }}
                                    style={{
                                        // margin: width * 0.035
                                        flexDirection: "row"
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Poppins-Medium",
                                            color: Colors.blackish,
                                            fontSize: width * 0.0325,
                                            marginLeft: width * 0.069,
                                        }}
                                    >Black Color Rivo,</Text>
                                    <Text
                                        style={{
                                            fontFamily: "Poppins-Bold",
                                            color: "red",
                                            fontSize: width * 0.0325,
                                            backgroundColor: "#f0f0f0",
                                            textAlignVertical: "center"
                                            // marginLeft: width * 0.069,
                                        }}
                                    > KDF 3191</Text>
                                    {/* <Image
                                    style={{ resizeMode: "contain" }}
                                    source={require("../../assets/images/cut.png")}
                                /> */}
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    borderBottomColor: Colors.placeholder,
                                    borderBottomWidth: 1,
                                    width: width * 0.8,
                                    alignSelf: "center"
                                }}
                            >


                            </View>

                            {/* <TouchableOpacity
                            onPress={() => { navigation.navigate("ChatScreen") }}
                        >
                            <Text>Chat</Text>
                        </TouchableOpacity> */}


                            <View
                                style={{ flexDirection: "row", marginTop: height * 0.02, alignItems: "center", paddingHorizontal: width * 0.035 }}
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
                                        > {Country == "UKRAINE" ? "₴" : "$ "}{RideDEtail?.ridePayment?.total / 100}</Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: height * 0.01 }}
                            >
                                <TouchableOpacity
                                    style={{ flexDirection: "row" }}
                                    onPress={() => { Linking.openURL(`tel:${RideDEtail?.driver?.phone}`) }}
                                >
                                    <Image
                                        resizeMode='contain'
                                        style={{ tintColor: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme }}
                                        source={require("../../assets/images/call.png")}
                                    />
                                    <Text
                                        style={styles.font}
                                    >{Country == "UKRAINE" ? "Телефонуйте" : "Call"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate("ChatScreen") }}
                                    style={{ flexDirection: "row" }}
                                >
                                    <Image
                                        resizeMode='contain'
                                        style={{ tintColor: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme }}

                                        source={require("../../assets/images/msg.png")}
                                    />
                                    <Text
                                        style={styles.font}
                                    >{Country == "UKRAINE" ? "Чат" : "Chat"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { { setedittoggle(true) } }}
                                    style={{ flexDirection: "row" }}
                                >
                                    <Image
                                        resizeMode='contain'
                                        style={{ tintColor: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme }}

                                        source={require("../../assets/images/DrawerIcon/edit.png")}
                                    />
                                    <Text
                                        style={styles.font}
                                    >{Country == "UKRAINE" ? "Чат" : "Edit Ride"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { cancelRide() }}
                                    style={{ flexDirection: "row" }}
                                >
                                    <Image
                                        resizeMode='contain'
                                        style={{ tintColor: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme }}

                                        source={require("../../assets/images/cut.png")}
                                    />
                                    <Text
                                        style={styles.font}
                                    >{Country == "UKRAINE" ? "Скасувати" : "Cancel"}</Text>
                                </TouchableOpacity>

                            </View>
                            {/* <TouchableOpacity>
                            <Text>
                                Emergency Assist
                            </Text>
                        </TouchableOpacity> */}
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
                            {Country == "UKRAINE" ? "Вершник є" : "Rider is"} {distance} {Country == "UKRAINE" ? "КМ від вас Буде там всередині" : "KM away from you  Will be there in"} {parseInt(time)} {Country == "UKRAINE" ? "хв" : "min"}

                        </Text>
                    </View>
                </>
                :
                <>
                    {
                        Load == false ?

                            <View>
                                <GoogleInput
                                    textInputProps={{
                                        // onFocus: () => { SetDropOfState(true), SetPickupState(false) },
                                        placeholderTextColor: Colors.placeholder,
                                        // onBlur: () => setSearchFocused(false),
                                        // autoCapitalize: 'none',
                                        // autoCorrect: false,
                                    }}
                                    // onFocus={() => { console.log("niklee") }}
                                    title={Country == "UKRAINE" ? "Пункт призначення" : "Destination"}
                                    placeholder={Country == "UKRAINE" ? "Введіть пункт призначення" : "Enter Destination"}
                                    onPress={(data, details = null) => {
                                        // console.log(data)
                                        Geocoder.from(details?.description)
                                            .then(json => {
                                                const location = json.results[0].geometry.location;
                                                console.log("sfsfas", location)
                                                seteditDetail(json)
                                            })
                                            .catch(error => console.warn(error));
                                    }}
                                />
                                <SecondayButton
                                    onPress={() => { handleupadtelocaion() }}
                                    title="Update"
                                />

                            </View> :
                            <View
                                style={{ flex: 1, justifyContent: "center" }}
                            >
                                <Text
                                    style={{
                                        color: Colors?.theme,
                                        fontFamily: "Poppins-Medium",
                                        fontSize: width * 0.04,
                                        alignSelf: "center",
                                        marginBottom: height * 0.0252
                                    }}
                                >
                                    Waiting For Driver Response..
                                </Text>
                                <ActivityIndicator
                                    color={Colors?.theme}
                                    size={"large"}
                                />
                            </View>
                    }
                </>
            }

        </SafeAreaView >
    )
}

export default OnWay

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
    font: {
        fontFamily: "Poppins-Medium",
        color: Colors.blackish,
        marginLeft: width * 0.0125,
        fontSize: width * 0.035
    }
})