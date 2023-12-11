import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PrimaryButton } from '../../../Compoents/Buttons/BTN'
import Colors from '../../../assets/Colors/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { UpdateProfile } from '../../../redux/actions/user.action'

const { height, width } = Dimensions.get("window")
const DefaultTip = ({ navigation }) => {
    const [tip, settip] = useState(0)
    const [Loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    const ExisitingTip = useSelector((state) => state?.auth?.userInfo?.default_tip)
    console.log("exis", ExisitingTip)
    useEffect(() => {
        if (ExisitingTip !== null) {
            settip(ExisitingTip)
        } else {
            settip(0)
        }

    }, [])
    const updateMe = () => {


        if (tip !== null) {
            const data = {
                default_tip: parseInt(tip)
            }
            console.log(data, "==================")
            dispatch(UpdateProfile(data, Toast))
        } else {
            setLoading(false)
            Toast.show({
                type: 'error',
                text1: "Add some amount",
                // text2: 'New password and Confirm password does not match '
            })
        }

    }
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.bg }}
        >
            <Toast ref={(ref) => { Toast.setref(ref) }} />
            <View
                style={{ flexDirection: "row", alignItems: "center", padding: width * 0.0325 }}
            >
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                >
                    <Image
                        style={{ resizeMode: "contain" }}
                        source={require("../../../assets/images/back.png")}
                    />
                </TouchableOpacity>
                <Text
                    style={{ fontFamily: "Poppins-Bold", color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, fontSize: width * 0.045, marginLeft: width * 0.025, width: width * 0.7 }}
                >
                    {Country == "UKRAINE" ? "Підказка за замовчуванням" : "Default Tip"}
                </Text>

            </View>


            <Image
                style={{
                    resizeMode: "contain",
                    alignSelf: "center",
                    height: height * 0.2,
                    tintColor: Country == "UKRAINE" ? Colors.Yellow : Colors.Orange,
                    marginTop: height * 0.045

                }}
                source={require("../../../assets/images/DrawerIcon/defaulttip.png")}
            />
            <Text
                style={{
                    fontSize: width * 0.08,
                    alignSelf: "center",
                    fontFamily: "Poppins-Bold",
                    color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                    // marginTop: -height * 0.012,
                    marginTop: height * 0.035
                }}
            >
                {ExisitingTip == null ? "$0" : "$" + ExisitingTip}
            </Text>
            <Text
                style={{
                    fontSize: width * 0.04,
                    alignSelf: "center",
                    fontFamily: "Poppins-Bold",
                    color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                    marginTop: -height * 0.012,
                    // marginTop: height * 0.035
                }}
            >
                {Country == "UKRAINE" ? "Скільки ви хочете встановити чайові за замовчуванням?" : "How much you want to set Default Tip?"}
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
                    style={{ width: width * 0.65, color: "#000000", height: height * 0.06 }}
                    placeholder={Country == "UKRAINE" ? "₴ Введіть суму" : '$ Enter Amount'}
                    placeholderTextColor={"grey"}
                    keyboardType='number-pad'
                    onChangeText={settip}
                    value={tip}
                />
            </View>
            <PrimaryButton onPress={() => { updateMe() }} title={Loading == true ? <ActivityIndicator size={"small"} color={"white"} /> : Country == "UKRAINE" ? "зберегти" : "Save "} />

        </SafeAreaView>
    )
}

export default DefaultTip

const styles = StyleSheet.create({})