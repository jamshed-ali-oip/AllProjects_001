import { StyleSheet, Text, View, SectionList, SafeAreaView, Dimensions, Image, TouchableOpacity, FlatList, ScrollView, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ImagePath from '../../config/ImagePath';
import Colors from '../../assets/Colors/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { carRecommendations } from '../../redux/actions/ride.action';
import { Toast } from 'react-native-toast-message/lib/src/Toast'

const { height, width } = Dimensions.get("window")
const CarSelection = ({ navigation, route }) => {
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    const dispatch = useDispatch()
    const paramaters = route.params
    const [CarsData, setCarsData] = useState()
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
    console.log("param +++++....", paramaters)
    const Startpoint = paramaters?.start?.title
    const Endpoint = paramaters?.end?.title
    console.log(Startpoint, Endpoint)

    const Cars = async () => {
        const data = await dispatch(carRecommendations())
        setCarsData(data)
        // console.log("============>car dta", data)
        // setlstName(data?.User?.firstName)

    }
    console.log("stateeee=============>>>", CarsData?.data?.data?.pickUps)
    useEffect(() => {
        Cars()
    }, [])

    const { pickUpCords, dropOfCords } = state
    const [select, setSelect] = useState()
    const [selectedCar, setselectedCar] = useState()

    const [open, setOpen] = useState(false)
    const mapRef = useRef()
    
    const pickupcontainer = (item) => {
        console.log("pickup data ", item)
        return (
            <TouchableOpacity
                onPress={() => setSelect(item?.item)}
                style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: width * .085, alignItems: "center" }}
            >
                <View
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <Image
                        style={{ resizeMode: "contain", tintColor: Country == "UKRAINE" ? Colors?.Yellow : Colors?.theme }}
                        source={
                            select?.id == item.item.id ? require("../../assets/images/select.png") : require("../../assets/images/unselect.png")
                        }
                    />
                    <View style={{ flexDirection: "column", marginLeft: width * 0.035 }}>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.rideType} >{item?.item?.name}</Text>
                        </View>
                        <Text
                            style={styles.desc}
                        >{item?.item?.description}</Text>
                    </View>
                </View>
                <Text
                    style={styles.rideType}
                >
                    {/* ${item?.item?.price}.00 */}
                </Text>


            </TouchableOpacity>
        )
    }
    const carsformate = (item) => {
        return (
            <TouchableOpacity
                onPress={() => { setselectedCar(item?.item) }}

                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: width * .03,
                    alignItems: "center",
                    backgroundColor: selectedCar == item?.item ? "#d3cdc3" : "white"
                }}
            >
                <View
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <Image
                        style={{ tintColor: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.Orange }}
                        source={require("../../assets/images/Sedan.png")}
                    />
                    <View style={{ flexDirection: "column", marginLeft: width * 0.035 }}>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.rideType} >{item?.item?.name}</Text>
                            <Image
                                style={styles.seats}
                                source={require("../../assets/images/Seats.png")}
                            />
                            <Text
                                style={styles.noSeat}
                            >5</Text>
                        </View>
                        <Text
                            style={styles.desc}
                        >{item?.item?.description}</Text>
                    </View>


                </View>
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={[styles.rideType, { marginRight: width * 0.04 }]}
                    >
                        {/* $ {item?.item?.price}.00 */}
                    </Text>
                    {/* <Text
                    style={[styles.time, { marginLeft: width * 0.035 }]}
                >12:00 PM</Text> */}
                </View>
            </TouchableOpacity>
        )
    }
    const doneRide = () => {
        // onPress={() => navigation.navigate("TrackRide", { data: paramaters, pickup: select, car: selectedCar })}
        if (select == undefined) {
            Toast.show({
                type: 'error',
                text1: 'Select Pickup time',
                // text2: 'Please Enter Valid Card Details'
            })
        } else if (selectedCar == undefined) {
            Toast.show({
                type: 'error',
                text1: 'Select Vehicle',
                // text2: 'Please Enter Valid Card Details'
            })

        } else {
            // alert("ok")
            navigation.navigate("TrackRide", { data: paramaters, pickup: select, car: selectedCar })

        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View
                style={styles.locCont}
            >
                <TouchableOpacity
                    disabled={true}
                >
                    <Text
                        style={styles.destText}
                    >
                        {Startpoint?.slice(0, 15)}..{" "}
                    </Text>
                </TouchableOpacity>
                <Image
                    style={{ resizeMode: "contain", marginVertical: width * 0.035 }}
                    source={require("../../assets/images/rightArrow.png")}
                />
                <TouchableOpacity
                    disabled={true}
                >
                    <Text
                        style={styles.destText}
                    >
                        {" "}{Endpoint?.slice(0, 15)}..
                    </Text>
                </TouchableOpacity>
            </View>

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
                        // image={ImagePath.carmarker}
                    />
                    <Marker
                        coordinate={dropOfCords}
                        // image={ImagePath.carmarker}
                    />

                </MapView></>
            <TouchableOpacity
                onPress={() => { navigation?.goBack() }}
                style={{
                    marginLeft: width * 0.0125
                }}
            >
                <Image
                    style={{ marginTop: -height * 0.055 }}
                    source={require("../../assets/images/leftArrow.png")}
                />
            </TouchableOpacity>
            <View
                style={[styles.card, { height: open == false ? height * 0.6 : height * 0.8 }]}
            >
                <View style={{ height: height * 0.15 }}>
                    <Toast ref={(ref) => { Toast.setref(ref) }} />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: width * 0.045,
                        // marginTop: height * 0.095
                    }}
                >

                    <TouchableOpacity
                        onPress={() => { setOpen(!open) }}
                        style={[styles.drawerCarButton, { backgroundColor: Country == "UKRAINE" ? Colors?.Yellow : Colors?.theme }]}
                    >
                        <Image
                            style={{
                                tintColor: Colors.white
                            }}
                            source={require("../../assets/images/car.png")}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        // onPress={() => navigation.navigate("TrackRide", { data: paramaters, pickup: select, car: selectedCar })}
                        // onPress={() => { console.log("param", paramaters, "select", select, "selectcar", selectedCar) }}
                        onPress={() => { doneRide() }}
                    >

                        <Text
                            style={{
                                fontFamily: "Poppins-Medium",
                                color: Colors.blackish
                            }}
                        >{Country == "UKRAINE" ? "Готово" : "Done"}</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <Text
                        style={styles.category}
                    >{Country == "UKRAINE" ? "час" : "Time"}</Text>
                    {/* <TouchableOpacity

                        style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: width * .035, alignItems: "center" }}
                    >
                        <View
                            style={{ flexDirection: "row", alignItems: "center" }}
                        >
                            <Image
                                source={require("../../assets/images/Sedan.png")}
                            />
                            <View style={{ flexDirection: "column", marginLeft: width * 0.035 }}>

                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={styles.rideType} >Elect-T</Text>
                                    <Image
                                        style={styles.seats}
                                        source={require("../../assets/images/Seats.png")}
                                    />
                                    <Text
                                        style={styles.noSeat}
                                    >5</Text>
                                </View>
                                <Text
                                    style={styles.desc}
                                >Top Drivers in 5 min</Text>
                            </View>


                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text
                                style={styles.time}
                            >Get there by</Text>
                            <Text
                                style={styles.time}
                            >12:00 PM</Text>
                        </View>
                    </TouchableOpacity> */}

                    <View>
                        <FlatList
                            // style={{ backgroundColor: "red" }}
                            data={CarsData?.data?.data?.pickUps}
                            renderItem={pickupcontainer}
                            keyExtractor={item => item._id}
                        />
                    </View>

                    <Text
                        style={styles.category}
                    >{Country == "UKRAINE" ? "Економіка" : "Economy"}</Text>
                    <View>
                        <FlatList
                            // style={{ backgroundColor: "green" }}
                            data={CarsData?.data?.data?.economy}
                            renderItem={carsformate}
                            keyExtractor={item => item._id}
                        />
                    </View>
                    <Text
                        style={styles.category}
                    >{Country == "UKRAINE" ? "Розкіш" : "Luxury"}</Text>
                    <View>
                        <FlatList
                            // style={{ backgroundColor: "yellow" }}
                            data={CarsData?.data?.data?.luxury}
                            renderItem={carsformate}
                            keyExtractor={item => item._id}
                        />
                    </View>
                </ScrollView>

                {/* lay out code   */}


            </View>
        </SafeAreaView >
    )
}

export default CarSelection

const styles = StyleSheet.create({
    locCont: {
        height: height * 0.055,
        backgroundColor: Colors.white,
        zIndex: 1,
        marginTop: 30,
        position: "absolute",
        width: width * 0.8,
        alignSelf: "center",
        borderRadius: width * 0.015,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
        flexDirection: "row"
    },
    destText: {
        fontFamily: "Poppins-Medium",
        color: Colors.text,
        fontSize: width * 0.035
    },
    card: {
        backgroundColor: Colors.white,
        width: width * 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 40,
    },
    category: {
        fontFamily: "Poppins-Bold",
        color: Colors.text,
        fontSize: width * 0.038,
        marginLeft: width * 0.035
    }, rideType: {
        fontFamily: "Poppins-Bold",
        color: Colors.text,
        fontSize: width * 0.038
    }, seats: {
        resizeMode: "contain",
        height: height * 0.015,
        width: width * 0.035, marginLeft: width * 0.035
    }, noSeat: {
        fontFamily: "Poppins-Regular",
        color: Colors.text,
        fontSize: width * 0.025,
        marginTop: width * 0.005
    },
    time: {
        fontFamily: "Poppins-Regular",
        fontSize: width * 0.027,
        width: width * 0.2,
        color: Colors.theme
    }, desc: {
        fontFamily: "Poppins-Regular",
        fontSize: width * 0.027,
        width: width * 0.2,
        marginTop:Platform.OS=="ios"? -height * 0.003:-height * 0.01,
        color: Colors.metalic
    }, drawerCarButton: {
        backgroundColor: Colors.theme,
        height: height * 0.035,
        justifyContent: "center",
        width: width * 0.09,
        alignItems: "center",
        borderRadius: width * 0.015,
        margin: width * 0.0245
    }
})