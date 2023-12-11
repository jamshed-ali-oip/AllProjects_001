import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity, Dimensions, Linking, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../assets/Colors/Colors'
import { useDispatch, useSelector } from 'react-redux'

import { DefaultCard, WalletDetail, WalletUrl, DeleteCard, SavedCards } from '../../../redux/actions/driver.action'
const { height, width } = Dimensions.get("window")
const Wallet = ({ navigation }) => {
    const dispatch = useDispatch()
    const [cardDetail, setCardsDetail] = useState()
    const [myWalllet, setmyWalllet] = useState()
    const [URL, setURL] = useState()
    const [Loading, setLoading] = useState(false)

    useEffect(() => {
        cardData()

    }, [cardDetail])
    useEffect(() => {
        wallete()

    }, [myWalllet])
    const cardData = async () => {
        const data = await dispatch(SavedCards())
        console.log("my catd dtaada", data?.data?.data?.paymentMethod?.data)
        setCardsDetail(data?.data?.data?.paymentMethod)
    }
    const ProfileData = useSelector((state) => state?.auth?.userInfo)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    const deleteCard = (i) => {
        dispatch(DeleteCard(i?.id)).then(() => {
            cardData()
        })
    }
    console.log("object", URL?.data?.data?.accountLink?.url)

    const wallete = async () => {
        const data = await dispatch(WalletDetail())
        console.log("wallete data", data)
        setmyWalllet(data?.data?.data)
    }
    const hitUrl = async () => {
        dispatch(WalletUrl(navigation))

    }
    console.log("loadinggggg", Loading)
    const setDefaultcard = (i) => {
        setLoading(true)
        const data = {
            card: i?.id
        }
        dispatch(DefaultCard(data, setLoading))
    }
    return (

        <SafeAreaView>
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
                    style={{ fontFamily: "Poppins-Bold", color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, fontSize: width * 0.045, marginLeft: width * 0.025 }}
                >
                    {Country == "UKRAINE" ? "Гаманець" : " Wallet"}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    backgroundColor: Colors.white,
                    width: width * 0.9,
                    alignSelf: "center",
                    padding: width * 0.035,
                    borderRadius: width * 0.035,
                    marginBottom: height * 0.035
                }}
            >
                <View
                >
                    <Text
                        style={{
                            fontFamily: "Poppins-Medium",
                            color: Colors.text,
                            fontSize: width * 0.04
                        }}
                    >
                        {Country == "UKRAINE" ? "Виберіть Wallet" : "Elect Wallet"}
                    </Text>
                    <Text
                        style={{
                            fontFamily: "Poppins-Bold",
                            color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                            fontSize: width * 0.075
                        }}
                    >
                        {Country == "UKRAINE" ? "₴" : "$ "}{myWalllet?.balance?.balance / 100}
                    </Text>
                    <Text
                        style={{
                            fontFamily: "Poppins-Regular",
                            color: Colors.text,
                            fontSize: width * 0.035
                        }}
                    >
                        {Country == "UKRAINE" ? "Плануйте заздалегідь, бюджет легко" : " Plan ahead, budget easier"}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row"
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Deposite") }}
                            style={{
                                backgroundColor: "red",
                                height: height * 0.035,
                                width: width * 0.2,
                                borderRadius: width * 0.02,
                                justifyContent: "center",
                                alignItems: "center",
                                margin: width * 0.015
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors?.white,
                                    fontSize: width * 0.03,
                                    fontFamily: "Poppins-Medium"
                                }}
                            >
                                {Country == "UKRAINE" ? "Депозит" : " Deposite"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Withdraw") }}
                            style={{
                                backgroundColor: Colors.succes,
                                height: height * 0.035,
                                width: width * 0.2,
                                borderRadius: width * 0.02,
                                justifyContent: "center",
                                alignItems: "center",
                                margin: width * 0.015
                            }}
                        >
                            <Text
                                style={{
                                    color: Colors?.white,
                                    fontSize: width * 0.03,
                                    fontFamily: "Poppins-Medium"
                                }}
                            >
                                {Country == "UKRAINE" ? "Вилучити" : " Withdraw"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Image
                    style={{ resizeMode: "contain" }}
                    source={require("../../../assets/images/coins.png")}
                />
            </View>
            {/* {
                myWalllet?.account?.payouts_enabled == false ?


                    <TouchableOpacity
                        style={[styles.addbtn, {
                            marginBottom: height * 0.035,
                            marginTop: -height * 0.02
                        }]}
                        onPress={() => { hitUrl() }}
                    >
                        <Text
                            style={styles.addbtnText}
                        >
                            Connect Wallet
                        </Text>
                    </TouchableOpacity> : null

            } */}

            {Loading == false ?
                cardDetail?.map((i) => {
                    return (
                        <View
                            style={{
                                width: width * 0.8,
                                height: height * 0.0845,
                                backgroundColor: "white",
                                alignSelf: "center",
                                borderRadius: width * 0.035,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 6,
                                },
                                shadowOpacity: 0.39,
                                shadowRadius: 8.30,

                                elevation: 10,
                                // alignContent: "center",
                                // justifyContent: "center",
                                flexDirection: "row",
                                alignItems: "center",
                                margin: width * 0.008
                            }}
                        >
                            <Image
                                style={{
                                    resizeMode: "contain",
                                    height: height * 0.035,
                                    width: width * 0.15,
                                    // backgroundColor: "red"

                                }}
                                source={i?.card?.brand == "visa" ? require("../../../assets/images/DrawerIcon/visa.png") : require("../../../assets/images/DrawerIcon/bank.png")}
                            />
                            <View
                                style={{ width: width * 0.54 }}
                            >
                                <Text
                                    style={{
                                        fontSize: width * 0.035,
                                        color: Colors.blackish,
                                        fontFamily: "Poppins-Regular"
                                    }}
                                >{i?.type == "card" ? i?.card?.brand + `****${i?.card?.last4}` : i?.us_bank_account?.bank_name + `****${i?.us_bank_account?.last4}`}</Text>
                                <Text
                                    style={{
                                        fontSize: width * 0.035,
                                        color: Colors.blackish,
                                        fontFamily: "Poppins-Regular"
                                    }}
                                > {i?.type == "card" ? "Expires " + i?.card?.exp_month + "/" + i?.card?.exp_year : "USD"}</Text>

                                {i?.default_method ? <Text
                                    style={{
                                        fontSize: width * 0.025,
                                        fontFamily: "Poppins-Italic",
                                        marginTop: -height * 0.0035,
                                        color: Colors.succes,
                                        marginLeft: width * 0.015
                                    }}
                                >{Country == "UKRAINE" ? "" : "Default Card"}</Text> :
                                    <TouchableOpacity
                                        onPress={() => { setDefaultcard(i) }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: width * 0.025,
                                                fontFamily: "Poppins-Italic",
                                                marginTop: -height * 0.0035,
                                                color: "red",
                                                marginLeft: width * 0.015
                                            }}
                                        >{Country == "UKRAINE" ? "" : "Tap here to Make this Card Default"}</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            <TouchableOpacity
                                // style={}
                                onPress={() => { deleteCard(i) }}
                            >

                                <Image
                                    style={{
                                        resizeMode: "contain",
                                        height: height * 0.025,
                                        width: width * 0.1,
                                        // backgroundColor: "red"

                                    }}
                                    source={require("../../../assets/images/DrawerIcon/delete.png")}
                                />
                            </TouchableOpacity>


                        </View>
                    )
                }) : <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <ActivityIndicator
                        color={Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme}
                        size={"large"}
                    />
                    <Text
                        style={{
                            fontSize: width * 0.035,
                            color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                            alignSelf: "center",
                            fontFamily: "Poppins-Medium",
                        }}
                    >{Country == "UKRAINE" ? "Працюємо за вашим запитом" : "Working on your Request"}</Text>
                </View>
            }

            <TouchableOpacity
                style={[styles.addbtn, { borderColor: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme }]}
                onPress={() => { navigation.navigate("AddWallet") }}
            >
                <Text
                    style={[styles.addbtnText, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme }]}
                >
                    {Country == "UKRAINE" ? "Додати картку" : " Add Card"}
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default Wallet

const styles = StyleSheet.create({
    addbtn: {
        backgroundColor: Colors.white,
        width: width * 0.5,
        alignSelf: "center",
        alignItems: "center",
        height: height * 0.038,
        borderRadius: width * 0.015,
        marginTop: height * 0.055,
        borderWidth: 1,
        borderColor: Colors.theme,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,

    },
    addbtnText: {
        fontFamily: "Poppins-Medium",
        color: Colors.theme,
    }
})

