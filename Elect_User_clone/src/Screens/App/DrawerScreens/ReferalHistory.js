import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReferenceList } from '../../../redux/actions/ride.action'
import Colors from '../../../assets/Colors/Colors'

const { height, width } = Dimensions.get("window")

const ReferalHistory = ({ navigation }) => {
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    const dispatch = useDispatch()
    const [referal, setreferal] = useState()
    const listdata = async () => {
        const data = await dispatch(ReferenceList())
        setreferal(data?.data?.data?.referList)
        console.log("referal list data listimg", data)
    }
    useEffect(() => {
        listdata()
    }, [])
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: Colors.bg }}
        >
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
                    style={{ fontFamily: "Poppins-Bold", color: Country == "UKRAINE" ? Colors?.Bluetheme : Colors.theme, fontSize: width * 0.045, marginLeft: width * 0.025 }}
                >
                    {Country == "UKRAINE" ? "Реферали" : "Referals"}
                </Text>
            </View>
            <ScrollView>
                {
                    referal?.length > 0 ?
                        referal?.map((i) => {
                            return (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        borderWidth: 1,
                                        height: height * 0.1,
                                        width: width * 0.8,
                                        borderColor: Colors.placeholder,
                                        alignSelf: "center",
                                        margin: width * 0.0125,
                                        backgroundColor: Colors.white,
                                        borderRadius: width * 0.0325,
                                        padding: width * 0.035,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 6,
                                        },
                                        shadowOpacity: 0.37,
                                        shadowRadius: 7.49,

                                        elevation: 12,
                                    }}
                                >
                                    <Image
                                        style={{
                                            resizeMode: "contain"
                                        }}
                                        source={require("../../../assets/images/dummy.png")}
                                    />
                                    <Text
                                        style={{
                                            color: Country == "UKRAINE" ? Colors?.Bluetheme : Colors.theme,
                                            fontFamily: "Poppins-Bold",
                                            marginLeft: width * 0.035
                                        }}
                                    >{i?.first_name}{" "}{i?.last_name}</Text>
                                </View>
                            )
                        })
                        : <>

                            <Image
                                style={{
                                    height: height * 0.15,
                                    width: width * 0.2,
                                    resizeMode: "contain",
                                    alignSelf: "center",
                                    marginTop: height * 0.25
                                }}
                                source={require("../../../assets/images/nodata.png")}
                            />
                            <Text
                                style={{
                                    fontFamily: "Poppins-Medium",
                                    fontSize: height * 0.025,
                                    color: Country == "UKRAINE" ? Colors?.Bluetheme : Colors.theme,
                                    alignSelf: "center"
                                }}
                            >
                                {Country == "UKRAINE" ? "Наразі немає історії направлень" : "No referal history till now"}
                            </Text>
                        </>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default ReferalHistory

const styles = StyleSheet.create({})