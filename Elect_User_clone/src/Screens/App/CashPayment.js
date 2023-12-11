import { SafeAreaView, StyleSheet, Text, View, Dimensions, Button, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { SecondayButton } from '../../Compoents/Buttons/BTN'
import { TextInput } from 'react-native-gesture-handler'

let { width, height } = Dimensions.get("window")
const CashPayment = ({ navigation }) => {
    const [amount, setAmount] = useState()
    return (
        <View
            style={{
                height: height * height,
                backgroundColor: Colors.theme,
            }}
        >
            <View
                style={{ flexDirection: "row", alignItems: "center", padding: width * 0.0225 }}
            >
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                >
                    <Image
                        style=
                        {{ resizeMode: "contain", height: height * 0.055 }}
                        source={require("../../assets/images/back.png")}
                    />
                </TouchableOpacity>
                <Text
                    style={{ fontFamily: "Poppins-Bold", color: Colors.white, marginLeft: width * 0.0125 }}
                >Payment</Text>
            </View>
            <Image
                style={{ alignSelf: "center", marginTop: height * 0.035 }}
                source={require("../../assets/images/2.png")}
            />
            <Text
                style={{ fontFamily: "Poppins-Bold", color: Colors.white, alignSelf: "center", fontSize: width * 0.035 }}
            >
                Cash Payment
            </Text>
            <View
                style={{
                    height: height * height,
                    backgroundColor: Colors.white,
                    marginBottom: 0,
                    borderRadius: width * 0.035,
                    marginTop: height * 0.035

                }}
            >
                <Text
                    style={{ fontFamily: "Poppins-Bold", color: Colors.theme, alignSelf: "center", fontSize: width * 0.04, marginTop: height * 0.055 }}
                >
                    Cash Payment
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
                        style={{ width: width * 0.75, }}
                        placeholder='$ Enter Amount'
                        keyboardType='number-pad'
                        onChangeText={setAmount}
                        value={amount}
                    />
                </View>
                <SecondayButton
                    // onPress={() => { () }}
                    title={"Proceed Payment"}
                />
            </View>

        </View>
    )
}

export default CashPayment

const styles = StyleSheet.create({})