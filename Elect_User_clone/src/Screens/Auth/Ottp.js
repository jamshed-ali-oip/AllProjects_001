
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../assets/Colors/Colors'
import { AuthInput } from '../../Compoents/Inputs/Inputs'
import { PrimaryButton, SecondayButton } from '../../Compoents/Buttons/BTN'
import OTPTextInput from "react-native-otp-textinput"
import { useDispatch, useSelector } from 'react-redux'
import { OttpForgetVerification } from '../../redux/actions/user.action'
let { width, height } = Dimensions.get("window")

const Ottp = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const email = route.params
    const [Ottp, setOttp] = useState()
    const [Loading, setLoading] = useState()

    console.log("first", email.data.email)
    // console.log(user)
    // useEffect(() => {
    //     if (Ottp?.length == 4) {
    //         navigation.navigate("NewPass")
    //     }
    // }, [Ottp])
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    const sendCode = () => {
        setLoading(true)
        const data = {
            email: email.data.email,
            otp: Ottp
        }
        if (Ottp?.length == 4) {
            dispatch(OttpForgetVerification(data, navigation, setLoading))
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
                style={[styles.welcome, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, }]}
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
                <PrimaryButton
                    title={Loading == true ? <ActivityIndicator size={"small"} color={Colors.white} /> : Country == "UKRAINE" ? "Надіслати код" : "Sumbit Code"}
                    onPress={() => { sendCode() }}
                />
            </View>
        </SafeAreaView>
    )
}

export default Ottp

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