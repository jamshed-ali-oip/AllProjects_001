import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Header from '../../Compoents/Header/Header';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Colors from '../../assets/Colors/Colors';
import { DetailsInput, GoogleInput, Mapdetailinput } from '../../Compoents/Inputs/Inputs';
import Geocoder from 'react-native-geocoding';
import { Google_API } from '../../config/GoogleApi';
import { useDispatch, useSelector } from 'react-redux';
import { GettingFavlocation, GettingRecentlocation, Recentlocation, StatusUpdateLocation } from '../../redux/actions/ride.action';
import { Toast } from 'react-native-toast-message/lib/src/Toast'

const { height, width } = Dimensions.get("window")

const SelectLocation = ({ navigation, route }) => {
    const mylocation = route?.params
    console.log("**********************************", mylocation)
    const [startPoint, SetStartPoint] = useState()
    const [EndPoint, SetEndPoint] = useState()
    const [savelocation, Setsavelocation] = useState()
    const [Pickup, SetPickup] = useState(null)
    const [DropOff, SetDropOff] = useState(null)
    const [favloc, SetFavloc] = useState()
    const [PickupState, SetPickupState] = useState(false)
    const [DropOfState, SetDropOfState] = useState(false)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    const me = useSelector((state) => state?.auth?.userInfo)
    console.log("mee", me)
    console.log("===Start===>", startPoint)
    console.log("===end===>", EndPoint)
    // console.log("Pickup", Pickup)
    useEffect(() => {

        SetPickup(mylocation?.data)

    }, [])
    const Data1 = {
        title: startPoint?.results[0].formatted_address || Pickup?.title,
        latitude: startPoint?.results[0]?.geometry?.location?.lat || Pickup?.latitude,
        longitude: startPoint?.results[0]?.geometry?.location?.lng || Pickup?.longitude
    }
    const Data2 = {
        title: EndPoint?.results[0].formatted_address || DropOff?.title,
        latitude: EndPoint?.results[0]?.geometry?.location?.lat || DropOff?.latitude,
        longitude: EndPoint?.results[0]?.geometry?.location?.lng || DropOff?.longitude
    }
    const dispatch = useDispatch()
    // console.log(object)
    useEffect(() => {
        savedata()
    }, [startPoint])
    const FAV = async () => {
        const data = await dispatch(GettingFavlocation())
        console.log("dtatdatdtadt", data)
        SetFavloc(data?.data?.data?.location)
    }
    useEffect(() => {
        FAV()
    }, [])
    const savedata = async () => {
        const data = await dispatch(GettingRecentlocation())
        Setsavelocation(data?.data?.data?.location)
        console.log("saved data", savelocation)
    }
    const setrecentlocation = (json) => {
        const data = {
            title: json.results[0]?.formatted_address,
            type: "RECENT",
            latitude: json.results[0]?.geometry?.location?.lat.toString(),
            longitude: json.results[0]?.geometry?.location?.lng.toString()
        }
        console.log("lojkfaskfh", data)
        dispatch(Recentlocation(data)).then(() => { savedata() })
    }
    const Indicator = (i) => {
        console.log("iiiiiiii", i)
        if (PickupState == true) {
            SetStartPoint()
            SetPickup(i)
        } else if (DropOfState === true) {
            SetDropOff(i)
            SetEndPoint()
        }
    }
    console.log(Pickup, DropOff)
    Geocoder.init(Google_API)
    const ref = useRef();
    const addfav = (i) => {
        let status = {
            type: "FAVORITE"
        }
        dispatch(StatusUpdateLocation(i?.id, status)).then(() => { FAV() })

    }
    const Removefav = (i) => {
        let status = {
            type: "RECENT"
        }
        dispatch(StatusUpdateLocation(i?.id, status)).then(() => { FAV() })

    }
    console.log("bgsgkjdgkj", DropOfState)
    const doneRide = () => {
        // alert(Data1?.title)
        if (Data1?.title == undefined) {
            Toast.show({
                type: 'error',
                text1: 'Enter Pickup Location',
                // text2: 'Please Enter Valid Card Details'
            })
        } else if (Data2?.title == undefined) {
            Toast.show({
                type: 'error',
                text1: 'Enter DropOff Location',
                // text2: 'Please Enter Valid Card Details'
            })
        } else {
            navigation.navigate("CarSelection", { start: Data1, end: Data2 })

        }

        // navigation.navigate("CarSelection", { start: Data1, end: Data2 })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
            <Toast ref={(ref) => { Toast.setref(ref) }} />
            <View
                style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: width * 0.035, marginTop: height * 0.015, marginBottom: height * 0.039 }}
            >

                <TouchableOpacity
                    onPress={() => { navigation.navigate("Home", { start: Data1, end: Data2 }) }}
                >
                    <Text
                        style={{
                            fontFamily: "Poppins-Regular",
                            fontSize: width * 0.0435,
                            color: Colors.blackish,
                        }}
                    >X</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { doneRide() }}
                // onPress={() => { console.log(Data1, Data2) }}
                >
                    <Text
                        style={{
                            fontFamily: "Poppins-Regular",
                            fontSize: width * 0.0355,
                            color: Colors.blackish,
                        }}
                    >{Country == "UKRAINE" ? "Готово" : "Done"}</Text>
                </TouchableOpacity>
            </View>
            {/* <ScrollView
                keyboardShouldPersistTaps="handled"
            > */}
            {
                Pickup !== null ? null : <GoogleInput
                    // ref={ref}
                    textInputProps={{
                        onFocus: () => { SetDropOfState(false), SetPickupState(true) },
                        placeholderTextColor: Colors.placeholder,
                        // onBlur: () => setSearchFocused(false),
                        // autoCapitalize: 'none',
                        // autoCorrect: false,
                    }}
                    placeholder={Country == "UKRAINE" ? "Введіть початкову точку" : "Enter Start Point"}

                    title={Country == "UKRAINE" ? "старт" : "Start"}
                    setAddressText={() => { "" }}

                    onPress={(data, details = null) => {
                        console.log('====================================');
                        console.log("JJJJJJJJJJJJJJJJJJ");
                        console.log('====================================');
                        Geocoder.from(details?.description)
                            .then(json => {
                                const location = json.results[0].geometry.location;
                                console.log("jkjkjkjkjkjkjkjkj", json)
                                SetStartPoint(json)
                                setrecentlocation(json)
                                // alert("dfadshj")
                                // savedata()
                            })
                            .catch(error => console.warn(error));
                    }}
                />
            }
            {
                Pickup !== null ? <Mapdetailinput
                    onPress={() => { SetPickup(null) }}
                    title={Country == "UKRAINE" ? "старт" : "Start"}
                    text={Pickup?.title?.slice(0, 35) + ".."}
                    source={require("../../assets/images/cut.png")}
                /> : null
            }
            <View

            />
            <TouchableOpacity
                style={{ flexDirection: "row", marginLeft: width * 0.08, alignItems: "center", marginTop: height * 0.004, marginBottom: -height * 0.01 }}
                onPress={() => { SetPickup(mylocation?.data) }}
            >
                <Image
                    style={{ height: height * 0.05, resizeMode: "contain" }}
                    source={Country == "UKRAINE" ? require("../../assets/images/Aimukr.png") : require("../../assets/images/Aim.png")}
                />
                <Text
                    style={{ fontFamily: "Poppins-Regular", color: Colors.metalic }}
                >{Country == "UKRAINE" ? "Поточне місцезнаходження" : "Current Location"}</Text>
            </TouchableOpacity>
            {
                DropOff ? null : <GoogleInput
                    textInputProps={{
                        onFocus: () => { SetDropOfState(true), SetPickupState(false) },
                        placeholderTextColor: Colors.placeholder,
                        // onBlur: () => setSearchFocused(false),
                        // autoCapitalize: 'none',
                        // autoCorrect: false,
                    }}
                    // onFocus={() => { console.log("niklee") }}
                    title={Country == "UKRAINE" ? "Пункт призначення" : "Destination"}
                    placeholder={Country == "UKRAINE" ? "Введіть пункт призначення" : "Enter Destination"}
                    onPress={(data, details = null) => {
                        Geocoder.from(details?.description)
                            .then(json => {
                                const location = json.results[0].geometry.location;
                                SetEndPoint(json)
                            })
                            .catch(error => console.warn(error));
                    }}
                />

            }
            {
                DropOff ? <Mapdetailinput
                    title={Country == "UKRAINE" ? "Пункт призначення" : "Destination"}
                    onPress={() => { SetDropOff(null) }}
                    text={DropOff?.title?.slice(0, 35) + ".."}
                    source={require("../../assets/images/cut.png")}
                /> : null
            }

            <View>
                {/* home location  */}
                <TouchableOpacity
                    onPress={() => {
                        SetDropOff({
                            title: me?.home_address,
                            latitude: me?.home_lat,
                            longitude: me?.home_lng
                        })
                    }}
                    style={{
                        backgroundColor: Colors.white,
                        padding: width * 0.025,
                        borderWidth: 1,
                        borderColor: Colors.placeholder,
                        borderRadius: width * 0.0125,
                        width: width * 0.8,
                        alignSelf: "center",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >

                    <Image
                        style={{ resizeMode: "contain", height: height * 0.055, width: width * 0.055, tintColor: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, marginLeft: width * 0.0125 }}
                        source={require("../../assets/images/DrawerIcon/homelocation.png")}

                    />

                    <Text
                        style={{
                            fontFamily: "Poppins-Regular",
                            fontSize: width * 0.035,
                            width: width * 0.55,
                            alignSelf: "center",
                            color: Colors.placeholder
                            // backgroundColor: Colors.white,
                            // padding: width * 0.025,
                            // borderWidth: 1,
                            // borderColor: Colors.placeholder,
                            // borderRadius: width * 0.0125
                        }}
                    >{me?.home_address}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("HomeLocation")
                        }}
                    >
                        <Image
                            style={{ resizeMode: "contain", marginTop: height * 0.01, tintColor: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme }}
                            source={require("../../assets/images/DrawerIcon/edit.png")}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>

                {/* office location  */}

                <TouchableOpacity
                    onPress={() => {
                        SetDropOff({
                            title: me?.office_address,
                            latitude: me?.office_lat,
                            longitude: me?.office_lng
                        })
                    }}
                    style={{
                        backgroundColor: Colors.white,
                        padding: width * 0.025,
                        borderWidth: 1,
                        borderColor: Colors.placeholder,
                        borderRadius: width * 0.0125,
                        width: width * 0.8,
                        alignSelf: "center",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >

                    <Image
                        style={{ resizeMode: "contain", height: height * 0.055, width: width * 0.055, tintColor: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, marginLeft: width * 0.0125 }}
                        source={require("../../assets/images/DrawerIcon/officelocation.png")}

                    />

                    <Text
                        style={{
                            fontFamily: "Poppins-Regular",
                            fontSize: width * 0.035,
                            width: width * 0.55,
                            alignSelf: "center",
                            color: Colors.placeholder
                            // backgroundColor: Colors.white,
                            // padding: width * 0.025,
                            // borderWidth: 1,
                            // borderColor: Colors.placeholder,
                            // borderRadius: width * 0.0125
                        }}
                    >{me?.office_address}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Officelocation")
                        }}
                    >
                        <Image
                            style={{ resizeMode: "contain", marginTop: height * 0.01, tintColor: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme }}
                            source={require("../../assets/images/DrawerIcon/edit.png")}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <ScrollView

                style={{
                    marginBottom: height * 0.035
                }}
            >
                {favloc?.map((i) => {
                    return (
                        <View>

                            <TouchableOpacity
                                onPress={() => {
                                    Indicator(i)
                                }}
                                style={{
                                    backgroundColor: Colors.white,
                                    padding: width * 0.025,
                                    borderWidth: 1,
                                    borderColor: Colors.placeholder,
                                    borderRadius: width * 0.0125,
                                    width: width * 0.8,
                                    alignSelf: "center",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >

                                <Image
                                    style={{ resizeMode: "contain" }}
                                    source={Country == "UKRAINE" ? require("../../assets/images/Historyukr.png") : require("../../assets/images/History.png")}
                                />

                                <Text
                                    style={{
                                        fontFamily: "Poppins-Regular",
                                        fontSize: width * 0.035,
                                        width: width * 0.55,
                                        alignSelf: "center",
                                        color: Colors.placeholder
                                        // backgroundColor: Colors.white,
                                        // padding: width * 0.025,
                                        // borderWidth: 1,
                                        // borderColor: Colors.placeholder,
                                        // borderRadius: width * 0.0125
                                    }}
                                >{i.title}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        // console.log('====================================');
                                        // console.log("(((((((((((((", ref);
                                        // console.log('====================================');
                                        Removefav(i)
                                        // Indicator(i)
                                    }}
                                // onPress={() => { console.log("okkkkkkkkkkkkkkkkkk") }}
                                >
                                    <Image
                                        style={{ resizeMode: "contain" }}
                                        source={Country == "UKRAINE" ? require("../../assets/images/favukr.png") : require("../../assets/images/fav.png")}

                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>

                        </View>
                    )
                })}
                {/* <Text>--------------recent location-------------</Text> */}
                {savelocation?.map((i) => {
                    return (
                        <View>

                            <TouchableOpacity
                                onPress={() => {
                                    Indicator(i)
                                }}
                                style={{
                                    backgroundColor: Colors.white,
                                    padding: width * 0.025,
                                    borderWidth: 1,
                                    borderColor: Colors.placeholder,
                                    borderRadius: width * 0.0125,
                                    width: width * 0.8,
                                    alignSelf: "center",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >

                                <Image
                                    style={{ resizeMode: "contain" }}
                                    source={Country == "UKRAINE" ? require("../../assets/images/Historyukr.png") : require("../../assets/images/History.png")}

                                />

                                <Text
                                    style={{
                                        fontFamily: "Poppins-Regular",
                                        fontSize: width * 0.035,
                                        width: width * 0.55,
                                        alignSelf: "center",
                                        color: Colors.placeholder
                                        // backgroundColor: Colors.white,
                                        // padding: width * 0.025,
                                        // borderWidth: 1,
                                        // borderColor: Colors.placeholder,
                                        // borderRadius: width * 0.0125
                                    }}
                                >{i.title}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        // console.log('====================================');
                                        // console.log("(((((((((((((", ref);
                                        // console.log('====================================');
                                        // Indicator(i)
                                        addfav(i)
                                    }}
                                // onPress={() => { console.log("okkkkkkkkkkkkkkkkkk") }}
                                >
                                    <Image
                                        style={{ resizeMode: "contain" }}
                                        source={require("../../assets/images/unfav.png")}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>

                        </View>
                    )
                })}
            </ScrollView>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

export default SelectLocation

const styles = StyleSheet.create({})