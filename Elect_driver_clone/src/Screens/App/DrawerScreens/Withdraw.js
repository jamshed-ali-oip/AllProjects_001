import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ActivityIndicator
} from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../../assets/Colors/Colors'

import { SecondayButton, PrimaryButton } from '../../../Compoents/Buttons/BTN'
import PhoneInput from "react-native-phone-number-input";
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { WithdrawAmount } from '../../../redux/actions/user.action';
let { width, height } = Dimensions.get("window")

const Withdraw = ({ navigation }) => {
    const [tip, settip] = useState(0)
    const [Loading, setLoading] = useState(false)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    const dispatch = useDispatch()
    const WithdrawRequest = () => {
        setLoading(true)
        const data = {
            amount: tip * 100
        }
        dispatch(WithdrawAmount(data, Toast, setLoading, navigation))
    }
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
                    style={[styles.welcome, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme }]}
                >
                    {Country == "UKRAINE" ? "Вилучити" : "Withdraw"}
                </Text>

            </View>
            <Toast ref={(ref) => { Toast.setref(ref) }} />
            <>
                <Image
                    style={{
                        resizeMode: "contain",
                        alignSelf: "center",
                        height: height * 0.2,
                        marginTop: height * 0.035

                    }}
                    source={require("../../../assets/images/withdraw.png")}
                />

                <Text
                    style={{
                        fontSize: width * 0.04,
                        alignSelf: "center",
                        fontFamily: "Poppins-Bold",
                        color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                        marginTop: -height * 0.012,
                        marginTop: height * 0.035
                    }}
                >
                    {Country == "UKRAINE" ? "Скільки ви хочете зняти?" : "How much you want to withdraw?"}
                </Text>
                <View
                    style={{
                        borderWidth: 1,
                        width: width * 0.7,
                        alignSelf: "center",
                        borderRadius: width * 0.025,
                        borderColor: Colors.placeholder,
                        marginBottom: height * 0.035,
                        marginTop: height * 0.05,
                        paddingLeft: width * 0.0145
                    }}
                >
                    <TextInput
                        style={{ width: width * 0.65, color: "#000000",height:height*0.05 }}
                        placeholder={Country == "UKRAINE" ? "₴ Введіть суму" : '$ Enter Amount'}
                        placeholderTextColor={"grey"}
                        keyboardType='number-pad'
                        onChangeText={settip}
                        value={tip}
                    />
                </View>
                <PrimaryButton
                    onPress={() => { WithdrawRequest() }}
                    title={Loading == true ? <ActivityIndicator
                        size={"small"} color={Colors?.white}
                    /> : Country == "UKRAINE" ? "Вилучити" : "Withdraw"}
                /></>

        </SafeAreaView>
    )
}

export default Withdraw

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