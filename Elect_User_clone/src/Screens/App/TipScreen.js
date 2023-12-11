import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../assets/Colors/Colors'
import { PrimaryButton } from '../../Compoents/Buttons/BTN'
import { useDispatch, useSelector } from 'react-redux'
import { RideDetail, TipApi } from '../../redux/actions/ride.action'
const { height, width } = Dimensions.get("window")

const TipScreen = ({ navigation }) => {
    const rideid = useSelector((state) => state?.auth?.ride?.ride?.id)
    const [loading, setLoading] = useState(false)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    const RideDEtail = useSelector((state) => state?.auth?.ride?.ride)
    const me = useSelector((state) => state?.auth?.userInfo)
    console.log("RideID", rideid)
    useEffect(() => {
        if (me?.default_tip == null) {
            settip(0)
        } else {
            settip(me?.default_tip)
        }
    }, [me?.default_tip])
    const dispatch = useDispatch()
    const [tip, settip] = useState(0)
    const SubmitTip = () => {
        setLoading(true)
        const data = {
            "tip": tip
        }
        dispatch(TipApi(data, rideid, navigation, setLoading))
    }
    return (
        <SafeAreaView
            style={{ flex: 1 }}
        >

            <View
                style={{
                    backgroundColor: Country == "UKRAINE" ? Colors.Yellow : Colors.theme,
                    height: height * 0.18,
                    borderBottomEndRadius: width * 0.045,
                    borderBottomStartRadius: width * 0.045,
                }}
            >
                <View
                    style={{
                        height: height * 0.15,
                        backgroundColor: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                        borderBottomEndRadius: width * 0.045,
                        borderBottomStartRadius: width * 0.045,
                        // flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"

                    }}
                >

                    <Text
                        style={{
                            fontFamily: "Poppins-Bold",
                            fontSize: width * 0.04,
                            color: Colors.white,
                            alignSelf: "center"
                            // marginLeft: width * 0.0145
                        }}
                    >{Country == "UKRAINE" ? "Додайте підказку для водія" : "Add a tip for Driver"}</Text>

                </View>
                <Text
                    style={{
                        fontFamily: "Poppins-Medium",
                        fontSize: width * 0.035,
                        color: Colors.white,
                        alignSelf: "center"
                        // marginLeft: width * 0.0145
                    }}
                >{Country == "UKRAINE" ? "Поїздка успішно завершена!" : "Ride has been ended succesfully!"}</Text>

            </View>
            <ScrollView>
                <View
                    style={{ flexDirection: "row", alignSelf: "center", alignItems: "center", marginTop: height * 0.065 }}
                >
                    <View
                        style={{ width: width * 0.78 }}
                    >
                        <Text
                            style={{
                                fontSize: width * 0.03,
                                fontFamily: "Poppins-Regular",
                                color: Country == "UKRAINE" ? Colors.Yellow : Colors.theme,
                            }}
                        >{Country == "UKRAINE" ? "Водій" : "Driver"}</Text>
                        <Text

                            style={{
                                fontSize: width * 0.04,
                                fontFamily: "Poppins-Bold",
                                color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                                marginTop: -height * 0.006
                            }}
                        >{RideDEtail?.driver?.first_name}</Text>
                        {/* <Text

                        style={{
                            fontSize: width * 0.03,
                            fontFamily: "Poppins-Medium",
                            color: Colors.text,
                            marginTop: -height * 0.009
                        }}
                    >your ride was $45.00</Text> */}
                    </View>
                    {/* <Image
                    source={{ uri: `${RideDEtail?.driver?.profile_picture}` }}
                /> */}
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        backgroundColor: Country == "UKRAINE" ? Colors.Yellow : Colors.theme,
                        width: width * 0.82,
                        alignSelf: "center",
                        height: height * 0.09,
                        borderRadius: width * 0.045,
                        alignItems: "center",
                        justifyContent: "space-around",
                        paddingHorizontal: width * 0.035,
                        marginTop: height * 0.1,
                        shadowColor: Colors.Orange,
                        shadowOffset: {
                            width: 0,
                            height: 7,
                        },
                        shadowOpacity: 0.43,
                        shadowRadius: 9.51,

                        elevation: 30,
                    }}
                >
                    <TouchableOpacity

                    >
                        <Text
                            style={{ fontSize: width * 0.03, fontFamily: "Poppins-Regular", color: Colors.white }}
                        >
                            {Country == "UKRAINE" ? "без чайових" : "no tip"}
                        </Text>
                    </TouchableOpacity>
                    {/* <View
                    style={{ borderRightWidth: 1, borderRightColor: "rgba(255, 255, 255, 0.39)", height: height * 0.04 }}
                ></View> */}
                    <Image
                        style={{ resizeMode: "contain" }}
                        source={require("../../assets/images/line.png")}
                    />
                    <TouchableOpacity
                        style={{ alignItems: "center" }}
                    >
                        <Text
                            style={{ fontSize: width * 0.03, fontFamily: "Poppins-Regular", color: Colors.white }}
                        >
                            15%
                        </Text>
                        <Text
                            style={{ fontSize: width * 0.03, fontFamily: "Poppins-Regular", color: Colors.white }}
                        >
                            {Country == "UKRAINE" ? "без чайових" : "no tip"}
                        </Text>
                    </TouchableOpacity>
                    <Image
                        style={{ resizeMode: "contain" }}
                        source={require("../../assets/images/line.png")}
                    />
                    <TouchableOpacity
                        style={{ alignItems: "center" }}
                    >
                        <Text
                            style={{ fontSize: width * 0.03, fontFamily: "Poppins-Regular", color: Colors.white }}
                        >
                            20%
                        </Text>
                        <Text
                            style={{ fontSize: width * 0.03, fontFamily: "Poppins-Regular", color: Colors.white }}
                        >
                            {Country == "UKRAINE" ? "без чайових" : "no tip"}
                        </Text>
                    </TouchableOpacity>
                    <Image
                        style={{ resizeMode: "contain" }}
                        source={require("../../assets/images/line.png")}
                    />
                    <TouchableOpacity
                        style={{ alignItems: "center" }}
                    >
                        <Text
                            style={{ fontSize: width * 0.03, fontFamily: "Poppins-Regular", color: Colors.white }}
                        >
                            25%
                        </Text>
                        <Text
                            style={{ fontSize: width * 0.03, fontFamily: "Poppins-Regular", color: Colors.white }}
                        >
                            {Country == "UKRAINE" ? "без чайових" : "no tip"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        fontFamily: "Poppins-Bold",
                        color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                        alignSelf: "center",
                        marginTop: height * 0.045
                    }}
                >
                    {Country == "UKRAINE" ? "Спеціальна підказка" : "Custom Tip"}
                </Text>
                <View
                    style={{
                        borderWidth: 1,
                        width: width * 0.8,
                        alignSelf: "center",
                        borderRadius: width * 0.025,
                        borderColor: Colors.placeholder,
                        marginBottom: height * 0.035,
                        marginTop: height * 0.05,
                        paddingLeft: width * 0.0145
                    }}
                >
                    <TextInput
                        style={{ width: width * 0.75, color: "#000", height: height * 0.06, }}
                        placeholder={Country == "UKRAINE" ? "₴ Введіть суму" : '$ Enter Amount'}
                        keyboardType='number-pad'
                        onChangeText={settip}
                        value={tip}
                        placeholderTextColor={Colors.placeholder}

                    />
                </View>
                <PrimaryButton

                    onPress={() => { SubmitTip() }}
                    title={loading == true ? <ActivityIndicator size={"small"} color={Colors.white} /> : Country == "UKRAINE" ? "Готово" : "Done"}
                />
                <TouchableOpacity
                    onPress={() => { SubmitTip() }}
                    style={{
                        alignSelf: "center",
                        marginTop: height * 0.035
                    }}
                >
                    <Text>{Country == "UKRAINE" ? "Пропустити" : "Skip"}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TipScreen

const styles = StyleSheet.create({})