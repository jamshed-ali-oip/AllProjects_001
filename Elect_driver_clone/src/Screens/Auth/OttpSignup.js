
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../assets/Colors/Colors'
import { AuthInput } from '../../Compoents/Inputs/Inputs'
import { PrimaryButton, SecondayButton } from '../../Compoents/Buttons/BTN'
import OTPTextInput from "react-native-otp-textinput"
import { useDispatch, useSelector } from 'react-redux'
import { OttpForgetVerification } from '../../redux/actions/user.action'
import { ActivityIndicator } from 'react-native'
let { width, height } = Dimensions.get("window")

const OttpSignup = ({ navigation, route }) => {
    const myvalue = route.params
    console.log("myvalue", myvalue)
    const [Ottp, setOttp] = useState()
    const [Loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    console.log(Ottp)
    const submit = () => {
        const data = {
            email: myvalue?.data?.email,
            otp: Ottp
        }
        dispatch(OttpForgetVerification(data, navigation, setLoading))
    }
    const ok = () => {
        setLoading(true)
        if (Ottp?.length == 4) {
            // navigation.navigate("NewPass")
            submit()
        }
    }

    return (
        <SafeAreaView
            style={{ backgroundColor: Colors.bg, flex: 1 }}
        >
            <TouchableOpacity
                onPress={() => { navigation.goBack() }}
            >
                <Image
                    style={styles.back}
                    source={require("../../assets/images/back.png")}
                />
            </TouchableOpacity>
            <Text
                style={[styles.welcome, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme }]}
            >
                {Country == "UKRAINE" ? "Введіть код!" : "Enter the Code!"}
            </Text>

            <Text
                style={styles.statement}
            >
                {/* sent to +923021041363 */}
            </Text>




            <View
                style={{
                    marginTop: height * 0.035,
                    width: width * 0.7,
                    alignItems: "center",
                    alignSelf: "center",
                }}
            >
                <OTPTextInput
                    tintColor={Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme}
                    handleTextChange={setOttp}
                />

            </View>
            <PrimaryButton
                title={Loading == true ? <ActivityIndicator size={"small"} color={Colors.white} /> : Country == "UKRAINE" ? "Надіслати" : "Submit"}
                onPress={() => {
                    // navigation.navigate('Ottp');
                    ok()
                }}
            />
            {/* <View
                style={{
                    marginTop: height * 0.035,
                    width: width * 0.7,
                    alignItems: "center",
                    alignSelf: "center",
                }}
            >
                <OTPTextInput
                    tintColor={Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme}
                    handleTextChange={setOttp}
                />

            </View> */}
        </SafeAreaView>
    )
}

export default OttpSignup

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
        fontSize: width * 0.062,
        fontFamily: "Poppins-Bold",
        color: Colors.theme,
        marginTop: height * 0.05,
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