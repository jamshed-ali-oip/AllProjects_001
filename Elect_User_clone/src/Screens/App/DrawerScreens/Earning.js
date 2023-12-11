import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../../assets/Colors/Colors'
import { useSelector } from 'react-redux'

const { height, width } = Dimensions.get("window")
const Earning = ({ navigation }) => {
  const ProfileData = useSelector((state) => state?.auth?.userInfo)
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
  console.log("Profile", ProfileData?.wallet?.amount)
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
          style={{ fontFamily: "Poppins-Bold", color: Country == "UKRAINE" ? Colors?.Bluetheme : Colors.theme, fontSize: width * 0.045, marginLeft: width * 0.025 }}
        >
          {Country == "UKRAINE" ? "Платежі" : "Payments"}
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
          borderRadius: width * 0.035
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
            {Country == "UKRAINE" ? "Елект-Кеш" : "Elect-Cash"}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins-Bold",
              color: Country == "UKRAINE" ? Colors?.Bluetheme : Colors.theme,
              fontSize: width * 0.075
            }}
          >
            {Country == "UKRAINE" ? "₴" : "$ "}{ProfileData?.wallet == null ? "0.00" : ProfileData?.wallet?.amount}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              color: Colors.text,
              fontSize: width * 0.035
            }}
          >
            {Country == "UKRAINE" ? "Плануйте заздалегідь, бюджет легший" : "Plan ahead, budget easier"}
          </Text>
        </View>
        <Image
          style={{ resizeMode: "contain" }}
          source={require("../../../assets/images/coins.png")}
        />
      </View>
      <View
        style={{
          flexDirection: "row", alignItems: "center", width: width * 0.8, alignSelf: "center",
          marginTop: height * 0.035
        }}
      >

        <Image
          style={{ resizeMode: "contain" }}
          source={Country == "UKRAINE" ? require("../../../assets/images/123ukr.png") : require("../../../assets/images/123.png")}
        />

        <TouchableOpacity
          onPress={() => { navigation.navigate("ReferalHistory") }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              color: Colors.text,
              fontSize: width * 0.038,
              marginLeft: width * 0.035,
              marginTop: -height * 0.0135
            }}
          >
            {Country == "UKRAINE" ? "Історія направлень" : "Referal History"}
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView >
  )
}

export default Earning

const styles = StyleSheet.create({})