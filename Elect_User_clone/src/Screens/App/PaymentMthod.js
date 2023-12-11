import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native'
import React, { useContext } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Colors from '../../assets/Colors/Colors'
import { AuthContext } from '../../context/AuthContext'
import { useSelector } from 'react-redux'
const { height, width } = Dimensions.get("window")
const PaymentMthod = ({ navigation }) => {
    const { socket } = useContext(AuthContext)
    const RideData = useSelector((state) => state?.auth?.ride?.ride)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    const CardPayment = () => {
        const eventData = {
            userId: RideData?.user?.id,
            rideId: RideData?.id,
            riderId: RideData?.driver?.id
        };
        console.log("EventCashPAyment", eventData)
        const eventName = 'ONLINE_PAYMENT';
        // Emit the event to the server
        socket.emit(eventName, JSON.stringify(eventData));
        navigation.navigate("CardPayment")
    }
    const CashPayment = () => {
        const eventData = {
            userId: RideData?.user?.id,
            rideId: RideData?.id,
            riderId: RideData?.driver?.id
        };
        const eventName = 'CASH_PAYMENT';
        // Emit the event to the server
        socket.emit(eventName, JSON.stringify(eventData))
        navigation.navigate("CashPayment")
    }
    return (
        <ScrollView>
            <Text
                style={[styles.head, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme }]}
            >
                {Country == "UKRAINE" ? "Як би ви хотіли заплатити?" : "How would you like to pay?"}
            </Text>
            <View>
                <TouchableOpacity
                    style={styles.row}
                    onPress={() => { CardPayment() }}
                >
                    <Image
                        style={styles.icon}
                        source={Country == "UKRAINE" ? require("../../assets/images/cardpayukr.png") : require("../../assets/images/cardpay.png")} />
                    <Text style={styles.font}>{Country == "UKRAINE" ? "Кредитна/дебетова картка" : "Credit/DebitCard"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={true}
                    onPress={() => { CashPayment() }}
                    style={styles.row}
                >
                    <Image
                        style={styles.icon}
                        source={Country == "UKRAINE" ? require("../../assets/images/cashpayukr.png") : require("../../assets/images/cashpay.png")} />

                    <Text style={styles.font} >{Country == "UKRAINE" ? "Готівковий платіж" : "Cash Payment"}</Text>
                </TouchableOpacity>


            </View>
        </ScrollView>
    )
}

export default PaymentMthod

const styles = StyleSheet.create({
    head: {
        fontFamily: "Poppins-Bold",
        color: Colors.theme,
        fontSize: width * 0.055,
        margin: width * 0.045,
        alignSelf: "center"

        // marginTop: height * 0.015
    },
    row: {
        // flexDirection: "row",
        alignItems: "center",
        // marginLeft: width * 0.0625,
        marginTop: height * 0.055,
        justifyContent: "center",
    },
    icon: {

        resizeMode: "contain",


    },
    font: {
        fontFamily: "Poppins-Medium",
        color: Colors.text
    }
})