
import { ActivityIndicator, Dimensions, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../assets/Colors/Colors'
import { AuthInput } from '../../Compoents/Inputs/Inputs'
import { SecondayButton } from '../../Compoents/Buttons/BTN'
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux'
import { NewPassword } from '../../redux/actions/user.action'
let { width, height } = Dimensions.get("window")

const NewPass = ({ navigation, route }) => {
    const userId = route.params
    const [Password, setPassword] = useState()
    const [ConfirmPassword, setConfirmPassword] = useState()
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    const [show, setshow] = useState(true)
    const [Loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    console.log("user", userId)
    const newPassHit = () => {
        setLoading(true)
        const user = userId.data
        const data = {
            password: Password
        }
        if (Password !== ConfirmPassword) {
            setLoading(false)
            Toast.show({
                type: 'error',
                text1: Country == "UKRAINE" ? "Невірний пароль" : 'Invalid Password ',
                text2: Country == "UKRAINE" ? "Пароль не збігається" : 'Password Does not match'
            })
        } else if (Password.length < 6) {
            setLoading(false)
            Toast.show({
                type: 'error',
                text1: Country == "UKRAINE" ? "Невірний пароль" : 'Invalid Password ',
                text2: Country == "UKRAINE" ? "Пароль має бути не менше 6 букв" : 'Password must be atleast 6 letter'
            })
        } else {
            dispatch(NewPassword(data, navigation, user, setLoading))
        }
    }
    return (
        <SafeAreaView
            style={{ backgroundColor: Colors.bg, flex: 1 }}
        ><Toast ref={(ref) => { Toast.setref(ref) }} />
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
                {Country == "UKRAINE" ? "Новий пароль!" : " New Password!"}
            </Text>

            <Text
                style={styles.statement}
            >
                {Country == "UKRAINE" ? "Введіть свій новий пароль" : "Enter your new password"}
            </Text>


            <View>
                <AuthInput
                    label="New Password"
                    placeholder={Country == "UKRAINE" ? "Введіть новий пароль" : "Enter new password"}
                    onChangeText={setPassword}
                    value={Password}
                    secureTextEntry={show}

                />
                <TouchableOpacity
                    disabled={true}
                    style={{
                        position: "absolute",
                        alignSelf: "flex-end",
                        paddingRight: width * 0.15,
                        marginTop: height * 0.05,
                        width: width * 0.03
                    }}
                >
                    {/* <Image
                        style={{
                            resizeMode: "contain",

                        }}
                        source={require("../../assets/images/Uneye.png")}
                    /> */}
                </TouchableOpacity>
            </View>

            <View>
                <AuthInput
                    label="Confirm"
                    placeholder={Country == "UKRAINE" ? "Підтвердьте пароль" : "Confirm password"}
                    onChangeText={setConfirmPassword}
                    value={ConfirmPassword}
                    secureTextEntry={show}

                />
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        alignSelf: "flex-end",
                        paddingRight: width * 0.15,
                        marginTop: height * 0.05,
                        width: width * 0.03
                    }}
                    disabled={true}
                >
                    {/* <Image
                        style={{
                            resizeMode: "contain",

                        }}
                        source={require("../../assets/images/Uneye.png")}
                    /> */}
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => { setshow(!show) }}
            >
                <Text
                    style={styles.remember}
                >{show === true ? Country == "UKRAINE" ? "Показати пароль" : "Show Password" : Country == "UKRAINE" ? "Приховати пароль" : "Hide Password"}</Text>
            </TouchableOpacity>

            <View
                style={{ marginTop: height * 0.095 }}
            >
                <SecondayButton
                    title={Loading == true ? <ActivityIndicator size={"small"} color={Colors.white} /> : Country == "UKRAINE" ? "Підтвердити" : "Confirm"}
                    onPress={() => {
                        newPassHit()
                        // navigation.navigate("Ottp")
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default NewPass

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
        marginBottom: height * 0.085
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
    },
    remember: {
        fontSize: width * 0.036,
        fontFamily: "Poppins-Medium",
        color: Colors.placeholder,
        marginTop: -height * 0.002,
        marginLeft: width * 0.05,
        // backgroundColor:"red"
        textDecorationColor: Colors.Orange,
        textDecorationLine: "underline",

    },
})