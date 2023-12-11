import { Dimensions, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../../assets/Colors/Colors'

import { OutlineButtton, PrimaryButton, SecondayButton } from '../../../Compoents/Buttons/BTN'
import PhoneInput from "react-native-phone-number-input";
import { useDispatch, useSelector } from 'react-redux';
import { GoogleInput } from '../../../Compoents/Inputs/Inputs';
import Geocoder from 'react-native-geocoding';
import { Google_API } from '../../../config/GoogleApi';
import { CurrentLocation, locationPermission } from '../../../config/LiveLocationHelper';
import { MylocationFinder, UpdateProfile } from '../../../redux/actions/user.action';
import { Toast } from 'react-native-toast-message/lib/src/Toast'

let { width, height } = Dimensions.get("window")

const Officelocation = ({ navigation }) => {
    const [PickupState, SetPickupState] = useState(false)
    const [DropOfState, SetDropOfState] = useState(false)
    const [startPoint, SetStartPoint] = useState()
    const [Location, SelectLocation] = useState()
    const [FinalLocation, SelecFinaltLocation] = useState()
    const [Loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    const me = useSelector((state) => state?.auth?.userInfo)
    console.log("mee", me)
    console.log("StartPoint", startPoint)
    useEffect(() => {
        if (me?.home_lng) {
            SelecFinaltLocation({
                formattedAddress: me?.office_address,
                latitude: me?.office_lat,
                longitude: me?.office_lng
            })
        }
    }, [me])

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
            latitude: Location?.latitude?.toString(),
            longitude: Location?.longitude?.toString()
        }
        const datamy = await dispatch(MylocationFinder(data))
        console.log("safjgvakgs__++++++++++++++++++++++", datamy)
        SelecFinaltLocation({
            formattedAddress: datamy?.data?.data?.entity[0]?.formattedAddress,
            latitude: datamy?.data?.data?.entity[0]?.latitude,
            longitude: datamy?.data?.data?.entity[0]?.longitude
        })
        // setmylocation(datamy)
    }
    console.log("?mydata", FinalLocation)
    const currentLocation = () => {
        getCurrentLocation()
        setTimeout(() => {
            finder()
        }, 200);
    }
    const updateMe = () => {
        setLoading(true)

        if (FinalLocation !== undefined) {
            const data = {
                office_lat: FinalLocation?.latitude?.toString(),
                office_lng: FinalLocation?.longitude?.toString(),
                office_address: FinalLocation?.formattedAddress
            }
            console.log(data, "==================")
            dispatch(UpdateProfile(data, Toast, setLoading))
        } else {
            setLoading(false)
            Toast.show({
                type: 'error',
                text1: "Select location First",
                // text2: 'New password and Confirm password does not match '
            })
        }

    }
    Geocoder.init(Google_API)
    return (
        <SafeAreaView
            style={{ backgroundColor: Colors.bg, flex: 1 }}
        >
            <View
                style={{ flexDirection: "row" }}
            >
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                >
                    <Image
                        style={styles.back}
                        source={require("../../../assets/images/back.png")}
                    />
                </TouchableOpacity>
                <Text
                    style={[styles.welcome, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, }]}
                >
                    {Country == "UKRAINE" ? "Розташування офісу" : "Office Location"}
                </Text>

            </View>
            <Toast ref={(ref) => { Toast.setref(ref) }} />
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                width: width * 0.8,
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                alignSelf: "center",
                height: height * 0.1,
                paddingHorizontal: width * 0.053,
                marginTop: height * 0.0525,
                borderRadius: width * 0.0125

            }}>
                <Image
                    style={{ height: height * 0.075, resizeMode: "contain", width: width * 0.12, tintColor: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme }}
                    source={require("../../../assets/images/DrawerIcon/officelocation.png")}
                />
                <Text
                    style={{
                        marginLeft: width * 0.0125,
                        color: Colors.metalic,
                        fontFamily: "Poppins-Regular",
                        textAlignVertical: "center",
                        width: width * 0.6

                    }}
                // >{startPoint?.results[0].formatted_address}</Text>
                >{FinalLocation?.formattedAddress}</Text>
            </View>
            <GoogleInput
                // ref={ref}
                textInputProps={{
                    onFocus: () => { SetDropOfState(false), SetPickupState(true) },
                    placeholderTextColor: Colors.placeholder,
                    // onBlur: () => setSearchFocused(false),
                    // autoCapitalize: 'none',
                    // autoCorrect: false,
                }}
                placeholder={Country == "UKRAINE" ? "Виберіть розташування офісу" : "Choose Office Location"}

                title={Country == "UKRAINE" ? "Виберіть Розташування офісу" : "Select Office Location"}
                setAddressText={() => { "" }}

                onPress={(data, details = null) => {

                    Geocoder.from(details?.description)
                        .then(json => {
                            const location = json.results[0].geometry.location;
                            SelecFinaltLocation({
                                formattedAddress: json?.results[0]?.formatted_address,
                                latitude: json?.results[0]?.geometry?.location?.lat,
                                longitude: json?.results[0]?.geometry?.location?.lng
                            })
                            // SetStartPoint(json)
                            // setrecentlocation(json)
                            // alert("dfadshj")
                            // savedata()
                        })
                        .catch(error => console.warn(error));
                }}
            />

            <SecondayButton onPress={() => { currentLocation() }} title={Country == "UKRAINE" ? "Виберіть моє поточне місцезнаходження" : "Choose my Current Location"} />
            <SecondayButton onPress={() => { updateMe() }} title={Loading == true ? <ActivityIndicator size={"small"} color={"white"} /> : Country == "UKRAINE" ? "зберегти" : "Save "} />




        </SafeAreaView>
    )
}

export default Officelocation

const styles = StyleSheet.create({
    back: {
        resizeMode: "contain",
        height: height * 0.05,
        // backgroundColor:"red",
        width: width * 0.13,
        // alignSelf: "center",
        marginTop: height * 0.03,

    },
    welcome: {
        fontSize: width * 0.05,
        fontFamily: "Poppins-Bold",
        color: Colors.theme,
        marginTop: height * 0.036,
        marginLeft: width * 0.05,
        // backgroundColor:"red"
    },
    statement: {

        fontSize: width * 0.036,
        fontFamily: "Poppins-Light",
        color: Colors.text,
        marginTop: -height * 0.01,
        marginLeft: width * 0.05,
        // backgroundColor:"red"
    },
    statement2: {

        fontSize: width * 0.036,
        fontFamily: "Poppins-Bold",
        color: Colors.Orange,
        marginTop: -height * 0.012,
        marginLeft: width * 0.01,
        // backgroundColor:"red"
        textDecorationColor: Colors.Orange,
        textDecorationLine: "underline",
    },
    remember: {
        marginLeft: width * 0.0229,
        fontFamily: "Poppins-Medium",
        color: Colors.placeholder,
        marginTop: -height * 0.005,
        fontSize: width * 0.037
    },
    Forget: {

        fontSize: width * 0.036,
        fontFamily: "Poppins-Medium",
        color: Colors.Orange,
        marginTop: -height * 0.008,
        marginLeft: width * 0.01,
        // backgroundColor:"red"
        textDecorationColor: Colors.Orange,
        textDecorationLine: "underline",
    }
})