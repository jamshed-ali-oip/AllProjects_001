

import { Dimensions, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../assets/Colors/Colors'
import { AuthInput } from '../../Compoents/Inputs/Inputs'
import { SecondayButton } from '../../Compoents/Buttons/BTN'
import PhoneInput from "react-native-phone-number-input";
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message';
import { registerUser } from '../../redux/actions/user.action'
let { width, height } = Dimensions.get("window")

const PhoneScreen = ({ navigation, route }) => {
    const profile = route?.params
    const [Phone, setPhone] = useState()
    const [code, setcode] = useState()
    const [Loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    const signupHandle = () => {
        setLoading(true)
        const body = {

            email: profile?.data?.email,
            password: profile?.data?.password,
            first_name: profile?.data?.first_name,
            last_name: profile?.data?.last_name,
            gender: profile?.data?.gender?.toUpperCase(),
            phone: Phone
        }
        console.log("body", body)
        // console.log(body.phone.length)
        // dispatch()
        if (body?.phone?.length !== 12) {
            Toast.show({
                type: 'error',
                text1: Country == "UKRAINE" ? "Недійсний номер телефону" : 'Invalid Phone Number',
                text2: Country == "UKRAINE" ? "Будь ласка, введіть правильний номер" : 'Please Enter Correct number" '
            })
        } else {
            // Toast.show({
            //     type: 'success',
            //     text1: 'Phone Number',
            //     text2: 'poyon oil '
            // })
            dispatch(registerUser(body, navigation, setcode, setLoading))
        }
    }
    console.log("code...", code)
    return (
        <SafeAreaView
            style={{ backgroundColor: Colors.bg, flex: 1 }}
        >
            <Toast ref={(ref) => { Toast.setref(ref) }} />
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
                {Country == "UKRAINE" ? "Який у тебе номер?" : "What's your number?"}
            </Text>

            <Text
                style={styles.statement}
            >
                {Country == "UKRAINE" ? "Ми надішлемо код для підтвердження вашого телефону" : "We’ll text a code to verify your phone"}
            </Text>

            <View
                style={{
                    marginTop: height * 0.035,
                    width: width * 0.7,
                    alignItems: "center",
                    alignSelf: "center",
                }}
            >
                <PhoneInput
                    // ref={phoneInput}
                    // defaultValue={value}
                    placeholder={Country == "UKRAINE" ? "Номер телефону" : 'Phone Number'}
                    defaultCode="DM"
                    layout="first"
                    containerStyle={{
                        height: height * 0.073,
                        borderRadius: width * 0.025,
                        borderWidth: 1,
                        borderColor: Colors.placeholder,
                        backgroundColor: Colors.bg
                    }}
                    textContainerStyle={{
                        height: height * 0.07,
                        paddingTop: height * 0.005,
                        borderRadius: 20,
                        backgroundColor: Colors.bg,
                        textAlignVertical: "center",
                        paddingBottom: -height * 0.05
                        // textalign:"center"
                    }}
                    // onChangeText={(text) => {
                    //     setPhone(text);
                    // }}
                    onChangeFormattedText={(text) => {
                        setPhone(text);
                    }}

                    // withDarkTheme
                    // withShadow
                    autoFocus
                />
            </View>
            <View
                style={{
                    marginTop: height * 0.35,
                    width: width * 0.7,
                    alignItems: "center",
                    alignSelf: "center",
                }}
            >
                <SecondayButton
                    title={Loading == true ? <ActivityIndicator size={"small"} color={Colors.white} /> : Country == "UKRAINE" ? "Отримайте код" : "Get The Code"}
                    onPress={() => {
                        signupHandle()
                        // navigation.navigate("OttpSignup") 
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default PhoneScreen

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
        width: width * 0.8
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