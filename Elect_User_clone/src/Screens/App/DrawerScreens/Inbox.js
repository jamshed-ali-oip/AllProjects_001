import { Dimensions, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../../assets/Colors/Colors'

import { SecondayButton } from '../../../Compoents/Buttons/BTN'
import PhoneInput from "react-native-phone-number-input";
import { useSelector } from 'react-redux';
let { width, height } = Dimensions.get("window")

const Inbox = ({ navigation }) => {
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
  const data = [
    {
      _id: 0
    },
    {
      _id: 1
    },
    {
      _id: 2
    }, {
      _id: 3
    }
  ]

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.bg, flex: 1 }}
    >
      <View
        style={{ flexDirection: "row" }}
      >
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}
        >
          <Image
            style={styles.back}
            source={require("../../../assets/images/back.png")}
          />
        </TouchableOpacity>
        <Text
          style={[styles.welcome, {
            color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
          }]}
        >
          {Country == "UKRAINE" ? "Вхідні" : "Inbox"}
        </Text>

      </View>

      <Image
        style={{
          resizeMode: "contain",
          height: height * 0.4,
          width: width * 0.8, alignSelf: "center",
          marginTop: height * 0.158
        }}
        source={require("../../../assets/images/comingSoon.png")}
      />
      {/* <Text
        style={{
          fontSize: width * 0.04,
          fontFamily: "Poppins-Medium",
          marginLeft: width * 0.035,
          color: Colors.metalic,
          marginTop: height * 0.03
        }}
      >All Messages</Text> */}
      {/* <View
        style={{
          width: width,
          borderBottomColor: Colors.placeholder,
          borderBottomWidth: 1, marginTop: height * 0.035,
        }}
      >

      </View> */}
      {/* {data.map((item) => {

        return (
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: Colors.placeholder,
              borderBottomWidth: 1,
              paddingLeft:width*0.05,
              alignItems:"center",paddingVertical:height*0.01
              
            }}
          >
            <Image
              style={{
                height: height * 0.07,
                width: width * 0.1,
                resizeMode: "contain",
                marginRight:width*0.035
              }}
              source={require("../../../assets/images/dollar.png")}
            />
            <View>
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: width * 0.038,
                  color: Colors.theme
                }}
              >You got 2$ tip</Text>
              <Text
              style={{
                fontFamily: "Poppins-Regular",
                color:"#6f7479",
                fontSize: width * 0.032
              }}
              >12/02/2023 ,06:47 PM</Text>
            </View>
          </View>
        )
      })} */}



    </SafeAreaView>
  )
}

export default Inbox

const styles = StyleSheet.create({
  back: {
    resizeMode: "contain",
    height: height * 0.05,
    // backgroundColor:"red",
    width: width * 0.13,
    // alignSelf: "center",
    marginTop: height * 0.03,

  },
  welcome: {
    fontSize: width * 0.05,
    fontFamily: "Poppins-Bold",
    color: Colors.theme,
    marginTop: height * 0.036,
    marginLeft: width * 0.05,
    // backgroundColor:"red"
  },
  statement: {

    fontSize: width * 0.036,
    fontFamily: "Poppins-Light",
    color: Colors.text,
    marginTop: -height * 0.01,
    marginLeft: width * 0.05,
    // backgroundColor:"red"
  },
  statement2: {

    fontSize: width * 0.036,
    fontFamily: "Poppins-Bold",
    color: Colors.Orange,
    marginTop: -height * 0.012,
    marginLeft: width * 0.01,
    // backgroundColor:"red"
    textDecorationColor: Colors.Orange,
    textDecorationLine: "underline",
  },
  remember: {
    marginLeft: width * 0.0229,
    fontFamily: "Poppins-Medium",
    color: Colors.placeholder,
    marginTop: -height * 0.005,
    fontSize: width * 0.037
  },
  Forget: {

    fontSize: width * 0.036,
    fontFamily: "Poppins-Medium",
    color: Colors.Orange,
    marginTop: -height * 0.008,
    marginLeft: width * 0.01,
    // backgroundColor:"red"
    textDecorationColor: Colors.Orange,
    textDecorationLine: "underline",
  }
})