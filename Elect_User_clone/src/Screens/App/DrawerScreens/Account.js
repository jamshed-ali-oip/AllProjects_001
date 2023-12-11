import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PrimaryButton } from '../../../Compoents/Buttons/BTN'
import Colors from '../../../assets/Colors/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { FundDonation } from '../../../redux/actions/ride.action'
const { height, width } = Dimensions.get("window")
const Account = ({ navigation }) => {
  const [tip, settip] = useState(0)
  const [done, setdone] = useState(false)
  const dispatch = useDispatch()
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
  const ProceedFundPAyment = () => {
    const data = {
      amount: tip * 100
    }
    if (tip > 0) {
      dispatch(FundDonation(data, navigation, setdone))
    }
  }
  useEffect(() => {
    if (done == true) {
      setTimeout(function () {
        navigation.navigate("Home")
        setdone(false)
      }, 2000);

    }
  }, [done])
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
          style={{ fontFamily: "Poppins-Bold", color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, fontSize: width * 0.045, marginLeft: width * 0.025, width: width * 0.7 }}
        >
          {Country == "UKRAINE" ? "Пожертвування" : "Donation"}
        </Text>

      </View>
      {
        done == false ?
          <>
            <Image
              style={{
                resizeMode: "contain",
                alignSelf: "center",

              }}
              source={require("../../../assets/images/DrawerIcon/donate.png")}
            />
            <Text
              style={{
                fontSize: width * 0.035,
                alignSelf: "center",
                fontFamily: "Poppins-Bold",
                color: Country == "UKRAINE" ? Colors.Yellow : Colors.Orange,
                marginTop: -height * 0.012
              }}
            >
              HOPP-E
            </Text>
            <Text
              style={{
                fontSize: width * 0.04,
                alignSelf: "center",
                fontFamily: "Poppins-Bold",
                color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                marginTop: -height * 0.012,
                marginTop: height * 0.035
              }}
            >
              {Country == "UKRAINE" ? "Скільки ви хочете пожертвувати?" : "How much you want to donate?"}
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
            <PrimaryButton
              onPress={() => { ProceedFundPAyment() }}
              title={Country == "UKRAINE" ? "Пожертвуйте" : "Donate"}
            /></> : <>
            <Image
              source={require("../../../assets/images/psymentdone.png")}
            />
            <Text
              style={{
                fontSize: width * 0.04,
                fontFamily: "Poppins-Bold",
                alignSelf: "center",
                color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
              }}
            >
              {Country == "UKRAINE" ? "Дякуємо, що пожертвували нам" : "Thank You For Donating us"}
            </Text>
          </>
      }
    </SafeAreaView>
  )
}

export default Account

const styles = StyleSheet.create({})