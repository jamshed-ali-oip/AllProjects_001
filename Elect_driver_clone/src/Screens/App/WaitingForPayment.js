import { StyleSheet, Text, View, ActivityIndicator, Dimensions, Image } from 'react-native'
import { AuthContext } from '../../context/AuthContext'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../../assets/Colors/Colors'
import { useSelector } from 'react-redux'

const { height, width } = Dimensions.get("window")
const WaitingForPayment = ({ navigation }) => {
  const { socket } = useContext(AuthContext)
  const [payment, setpayment] = useState([])
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

  socket.on('RIDER_RECEIVED_ONLINE_PAYMENT', (data) => {
    console.log('RIDER_RECEIVED_ONLINE_PAYMENT hogya ', data);
    setpayment(data)
  });
  socket.on('RIDE_RECEIVED_CASH_PAYMENT', (data) => {
    console.log('RIDE_RECEIVED_CASH_PAYMENT hogya ', data);
    setpayment(data)
  });
  useEffect(() => {
    if (payment.type === "RIDE_RECEIVED_CASH_PAYMENT") {
      navigation.navigate("CashPayment")
    } else if (payment.type === "RIDER_RECEIVED_ONLINE_PAYMENT") {
      navigation.navigate("CardPaymentSucces")
    }
  }, [payment])
  return (
    <View style={{
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      backgroundColor: Colors.bg
    }}>
      <Image
        style={{
          height: height,
          width: width
        }}
        source={Country == "UKRAINE" ? require("../../assets/images/Accountsukr.png") : require("../../assets/images/Accounts.png")}
      />
      {/* <Image
      style={{
        resizeMode:"contain"
      }}
      source={require("../../assets/images/waiting.png")}
      />
     
      <Text
      style={{
        fontSize:width*0.045,
        color:Colors.theme,
        textAlign:"center",
        fontFamily:"Poppins-Medium",
      }}
      >
        Payment in Progress</Text> */}
    </View>
  )
}

export default WaitingForPayment

const styles = StyleSheet.create({})