
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Button, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { StripeProvider, CardField, useStripe, useConfirmPayment, confirmSetupIntent, BillingDetails } from '@stripe/stripe-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import Colors from '../../../assets/Colors/Colors';
import { SecondayButton } from '../../../Compoents/Buttons/BTN';
import { AddNewCard } from '../../../redux/actions/driver.action';
import { Toast } from 'react-native-toast-message/lib/src/Toast'

let { width, height } = Dimensions.get("window")


const AddWallet = ({ navigation }) => {
    const [cardData, setcardData] = useState()
    const [loading, setLoading] = useState(false)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    console.log("kjsgjk", cardData)
    const dispatch = useDispatch()
    const handlePayPress = async () => {
        setLoading(true)
        const data = {
            number: cardData?.values?.number,
            exp_month: parseInt(cardData?.values?.expiry?.slice(0, 2)),
            exp_year: parseInt(cardData?.values?.expiry?.slice(3, 5)),
            cvc: cardData?.values?.cvc
        }
        if (cardData?.valid == true) {
            dispatch(AddNewCard(data, navigation, setLoading))
        } else {
            setLoading(false)
            Toast.show({
                type: 'error',
                text1: 'card is invalid',
                text2: 'Please Enter Valid Card Details'
            })
        }
        console.log("myvalue", cardData?.values?.expiry, data)
    };
    return (
        <SafeAreaView>

            <View
                style={{ flexDirection: "row", alignItems: "center", padding: width * 0.0225, backgroundColor: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, }}
            >
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                >
                    <Image
                        style=
                        {{ resizeMode: "contain", height: height * 0.055 }}
                        source={require("../../../assets/images/back.png")}
                    />
                </TouchableOpacity>
                <Text
                    style={{ fontFamily: "Poppins-Bold", color: Colors.white, marginLeft: width * 0.0125 }}
                >Add Card</Text>

            </View>
            <ScrollView>
                <Toast ref={(ref) => { Toast.setref(ref) }} />
                <View
                    style={{
                        height: height * height,
                        backgroundColor: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                    }}
                >

                    <Image
                        style={{ alignSelf: "center", marginTop: height * 0.03 }}
                        source={Country == "UKRAINE" ? require("../../../assets/images/1ukr.png") : require("../../../assets/images/1.png")}
                    />
                    <Text
                        style={{ fontFamily: "Poppins-Bold", color: Colors.white, alignSelf: "center", fontSize: width * 0.035 }}
                    >
                        Card/Credit Card
                    </Text>
                    <View
                        style={{
                            height: height * height,
                            backgroundColor: Colors.white,
                            marginBottom: 0,
                            borderRadius: width * 0.035,
                            marginTop: height * 0.0

                        }}
                    >
                        <Text
                            style={{ fontFamily: "Poppins-Bold", color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, alignSelf: "center", fontSize: width * 0.04, marginTop: height * 0.055 }}
                        >
                            Card/Credit Card
                        </Text>
                        <Toast ref={(ref) => { Toast.setref(ref) }} />
                        <View
                            style={{
                                width: width * 0.8,
                                alignSelf: "center",
                                marginBottom: height * 0.035, marginTop: height * 0.05
                            }}
                        >

                            <CreditCardInput onChange={(e) => { setcardData(e) }} />

                        </View>
                        <SecondayButton
                            onPress={() => { handlePayPress() }}
                            title={loading == true ? <ActivityIndicator size={"small"} color={Colors.white} /> : "Proceed Payment"}
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddWallet

const styles = StyleSheet.create({})