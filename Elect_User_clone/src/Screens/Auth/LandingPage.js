import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SecondayButton } from '../../Compoents/Buttons/BTN'
import Colors from '../../assets/Colors/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { CountryDetect } from '../../redux/actions/user.action'
let { height, width } = Dimensions.get("window")

const LandingPage = ({ navigation }) => {
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
  console.log(Country, "{}}}}}}}}}}}}}}}}}}}}}}}}}}}}")
  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.bg, flex: 1 }}
    >
      <Image
        style={{
          resizeMode: "contain",
          height: height * 0.7,
          width: width * 0.75,
          // backgroundColor:"red",
          alignSelf: "flex-end"
        }}
        source={Country == "UKRAINE" ? require("../../assets/images/backUkr.png") : require("../../assets/images/background.png")}
      />
      <View
        style={{ marginTop: height * 0.015 }}
      >
        <SecondayButton
          title={Country == "UKRAINE" ? "Почати" : "Get Started"}
          onPress={() => { navigation.navigate("Login") }}
        />
        <SecondayButton
          title={Country == "UKRAINE" ? "Створити акаунт" : "Create Account"}
          onPress={() => { navigation.navigate("SignUp") }}
        />

      </View>
    </SafeAreaView>
  )
}

export default LandingPage

const styles = StyleSheet.create({})