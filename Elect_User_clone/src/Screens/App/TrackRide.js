import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ActivityIndicator, Platform } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Colors from '../../assets/Colors/Colors'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Header from '../../Compoents/Header/Header';
import { Google_API } from '../../config/GoogleApi';
import MapViewDirections from 'react-native-maps-directions';
import ImagePath from '../../config/ImagePath';
import { DetailsInput } from '../../Compoents/Inputs/Inputs';
import { SecondayButton } from '../../Compoents/Buttons/BTN';
import { useDispatch, useSelector } from 'react-redux';
import { CaculateFare, confirmRideRequest } from '../../redux/actions/ride.action';
import { color } from 'react-native-reanimated';
const { height, width } = Dimensions.get("window")
const TrackRide = ({ navigation, route }) => {
    const location = route?.params
    const estimateFare = useSelector((state) => state?.auth?.calculatedfare)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    const me = useSelector((state) => state?.auth?.userInfo)
    console.log("mystae", estimateFare)
    const dispatch = useDispatch()
    useEffect(() => {
        calculatedPrice()
    }, [estimateFare])
    const pickupCord = {
        //  location.data?.start.results[0]?.geometry?.location?.lat
        latitude: parseFloat(location?.data?.start?.latitude),  /* 24.9623677,67.0463966, */
        longitude: parseFloat(location?.data?.start?.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
    const dropofCord = {
        latitude: parseFloat(location?.data?.end?.latitude),  /* 24.9623677,67.0463966, */
        longitude: parseFloat(location?.data?.end?.longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
    const [addnote, setaddnote] = useState(false)
    const [handicap, sethandicap] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [Driver, setDriver] = useState(false)
    const [note, setNote] = useState()
    console.log("====================location================>", location)
    console.log(pickupCord, dropofCord)
    const mapRef = useRef()
    const HitRequest = () => {
        setLoading(true)
        const data = {
            pickup_latitude: location?.data?.start?.latitude?.toString(),
            pickup_longitude: location?.data?.start?.longitude?.toString(),
            dropoff_latitude: location?.data?.end?.latitude.toString(),
            dropoff_longitude: location?.data?.end?.longitude.toString(),
            pickupId: location?.pickup?.id,
            carSuggestId: location?.car?.id,
            note: note,
            isElderlyORHandicapped: handicap,
            femaleDriver: Driver,
            // actualPrice: 60,
            tip: 0

        }
        // console.log("pickup id", data)
        dispatch(confirmRideRequest(data, navigation, setLoading))
    }
    const calculatedPrice = async () => {
        const data = {
            pickup_latitude: location?.data?.start?.latitude?.toString(),
            pickup_longitude: location?.data?.start?.longitude?.toString(),
            dropoff_latitude: location?.data?.end?.latitude.toString(),
            dropoff_longitude: location?.data?.end?.longitude.toString(),
            pickupId: location?.pickup?.id,
            carSuggestId: location?.car?.id,
            note: note,
            isElderlyORHandicapped: handicap,
            tip: 0

        }
        setTimeout(() => {
            dispatch(CaculateFare(data))
        }, 2000);
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
                    initialRegion={pickupCord}
                >
                    <Marker
                        coordinate={pickupCord}
                        image={ImagePath.DropOff}
                    />
                    <Marker
                        coordinate={dropofCord}
                        image={ImagePath.DropOff}
                    />
                    <MapViewDirections
                        origin={pickupCord}
                        destination={dropofCord}
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
                            // setDistance(result?.distance),
                            //     setTime(result?.duration)

                            // console.log("distance", result.distance)
                            // console.log("dusration", result.duration)
                        }}
                        optimizeWaypoints={true}
                    />
                </MapView>

                <View
                    style={styles.card}
                >
                    <Text
                        style={[styles.Name, { color: Country == "UKRAINE" ? Colors.Yellow : Colors.theme }]}
                    >{Country == "UKRAINE" ? "Підтвердьте місце отримання" : "Confirm pickup spot"}</Text>
                    <View
                        style={styles.invoices}
                    >
                        <Text
                            style={{
                                fontFamily: "Poppins-Bold",
                                fontSize: width * 0.035,
                                // color: Colors?.theme,
                                marginTop: height * 0.0125,
                                marginLeft: width * 0.05,
                                color: Country == "UKRAINE" ? Colors.Yellow : Colors.theme
                            }}
                        >{Country == "UKRAINE" ? "Деталі поїздки" : "Ride Detail"}</Text>
                        <View
                            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}
                        >
                            <Text
                                style={[styles.titlepice, { color: Country == "UKRAINE" ? Colors.Yellow : Colors.theme }]}
                            >{Country == "UKRAINE" ? "Вартість проїзду" : "Ride Fare"}</Text>
                            <Text
                                style={[styles.amount, { color: Country == "UKRAINE" ? Colors.Yellow : Colors.theme }]}
                            >
                                {/* 0 */}
                                {Country == "UKRAINE" ? "₴" : "$ " + estimateFare?.data / 100}
                            </Text>
                        </View>

                    </View>
                    <TouchableOpacity
                        onPress={() => { setaddnote(!addnote) }}
                        activeOpacity={100}
                        style={{ flexDirection: "row", alignItems: "center", marginLeft: width * 0.065 }}

                    >
                        <Image source={Country == "UKRAINE" ? require("../../assets/images/adddesukr.png") : require("../../assets/images/adddes.png")} />
                        <Text
                            style={{
                                fontFamily: "Poppins-Regular",
                                fontSize: width * 0.035,
                                marginLeft: width * 0.035,
                                color: Colors.text
                            }}
                        >{Country == "UKRAINE" ? "Додайте примітку для водія" : "Add note for driver "}</Text>
                    </TouchableOpacity>
                    {
                        addnote == true ?
                            <DetailsInput
                                onChange={setNote}
                                value={note}
                                placeholder={Country == "UKRAINE" ? "Додайте примітку для водія" : "Add note for driver"}
                            /> : null
                    }
                    <TouchableOpacity
                        onPress={() => { sethandicap(!handicap) }}
                        activeOpacity={100}
                        style={{ flexDirection: "row", alignItems: "center", marginTop: height * 0.018, marginBottom: height * 0.045, marginLeft: width * 0.065 }}

                    >
                        <Image
                            style={{ tintColor: Country == "UKRAINE" ? Colors?.Yellow : Colors?.theme }}
                            source={handicap == true ? require("../../assets/images/select.png") : require("../../assets/images/unselect.png")} />
                        <Text
                            style={{
                                fontFamily: "Poppins-Regular",
                                fontSize: width * 0.035,
                                marginLeft: width * 0.035,
                                color: Colors.text
                            }}
                        > {Country == "UKRAINE" ? "Люди похилого віку/інваліди" : "Elderly / Handicapped"}</Text>
                    </TouchableOpacity>
                    {me?.gender == "FEMALE" ? <TouchableOpacity
                        onPress={() => { setDriver(!Driver) }}
                        activeOpacity={100}
                        style={{ flexDirection: "row", alignItems: "center", marginTop: -height * 0.020, marginBottom: height * 0.045, marginLeft: width * 0.065 }}

                    >
                        <Image
                            style={{ tintColor: Country == "UKRAINE" ? Colors?.Yellow : Colors?.theme }}
                            source={Driver == true ? require("../../assets/images/select.png") : require("../../assets/images/unselect.png")} />
                        <Text
                            style={{
                                fontFamily: "Poppins-Regular",
                                fontSize: width * 0.035,
                                marginLeft: width * 0.035,
                                color: Colors.text
                            }}
                        > {Country == "UKRAINE" ? "Віддаю перевагу водію-жінці" : "Prefer Female Driver"}</Text>
                    </TouchableOpacity> : null}

                    <SecondayButton
                        disabled={Loading}
                        onPress={() => { HitRequest() }}
                        title={Loading == true ? <ActivityIndicator size={"small"} color={Colors.white} /> : Country == "UKRAINE" ? "Підтвердити та запитати" : "Confirm and Request"} />
                </View>
            </>

        </SafeAreaView>
    )
}

export default TrackRide

const styles = StyleSheet.create({
    card: {
        height: height * 0.6,
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
        marginBottom: Platform.OS == "ios" ? height * 0.009 : null,
        marginLeft: width * 0.07

    },
    input: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 2,
        borderColor: Colors.placeholder,
        width: width * 0.7,
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
    titlepice: {
        fontFamily: "Poppins-Medium",
        fontSize: width * 0.035,
        color: Colors?.theme,
        alignSelf: "flex-start",
        marginTop: height * 0.0125,
        // backgroundColor: "red",
        width: width * 0.3
        // textAlignVertical: "center"
    },
    amount: {
        fontFamily: "Poppins-Medium",
        fontSize: width * 0.035,
        color: Colors?.theme,
        alignSelf: "flex-start",
        // alignSelf: "center",
        marginTop: height * 0.0125,
        width: width * 0.3

        // textAlignVertical: "center"
    },
    invoices: {
        height: height * 0.1,
        width: width * 0.8,
        backgroundColor: Colors?.white,
        alignSelf: "center",
        borderRadius: width * 0.035,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 5,
        marginBottom: height * 0.035
    },
    line: {
        borderBottomColor: Colors.placeholder,
        borderBottomWidth: 1,
        // width: width
    }
})