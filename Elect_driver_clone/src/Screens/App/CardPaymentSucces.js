import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Colors from '../../assets/Colors/Colors'
import { SecondayButton } from '../../Compoents/Buttons/BTN'
import { REFRESH } from '../../redux/const/const'
import { useDispatch, useSelector } from 'react-redux'

const { height, width } = Dimensions.get("window")

const CardPaymentSucces = ({ navigation }) => {
  const { socket } = useContext(AuthContext)
  const [payment, setpayment] = useState([])
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

  socket.on('RIDE_PAYMENT_RECEIVED', (data) => {
    console.log('RIDE_PAYMENT_RECEIVED hogya ', data);
    setpayment(data)
  });
  // useEffect(()=>{
  //   if(payment?.type==="RIDE_PAYMENT_RECEIVED"){

  //   }
  // },[])
  const dispatch = useDispatch()
  const refreh = () => {
    dispatch({
      type: REFRESH,
      payload: +1,
    });
    navigation.navigate("Home")
  }
  return (
    <View>
      {payment?.type === "RIDE_PAYMENT_RECEIVED" ? <>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: height * 0.15
          }}
        >
          <Image
            style={{
              alignSelf: "center",
            }}
            source={Country == "UKRAINE" ? require("../../assets/images/paymentdoneukr.png") : require("../../assets/images/Succes.png")}
          />
          <Text
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: width * 0.055,
              color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
            }}
          >{Country == "UKRAINE" ? "Оплату виконано успішно!" : "Payment Done Succesfully!"}</Text>

          <SecondayButton
            onPress={() => { refreh() }}
            title={Country == "UKRAINE" ? "в порядку" : "OK"} />
        </View>
      </> : <>
        <View style={{
          // flex:1,
          justifyContent: 'center',
          alignItems: "center",
          marginTop: height * 0.4
        }}>
          <Image
            style={{ alignSelf: "center" }}
            source={Country == "UKRAINE" ? require("../../assets/images/loadukr.gif") : require("../../assets/images/load.gif")}
          />
          <Text
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: width * 0.04,
              color: Country == "UKRAINE" ? Colors.Yellow : Colors.theme
            }}
          >{Country == "UKRAINE" ? "Виконується онлайн-платіж" : "Online Payment in Progress"}</Text>
        </View>
      </>}
    </View>
  )
}

export default CardPaymentSucces

const styles = StyleSheet.create({})