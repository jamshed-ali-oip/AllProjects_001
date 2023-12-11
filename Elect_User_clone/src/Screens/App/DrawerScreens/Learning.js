import { Dimensions, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../../assets/Colors/Colors'
import { useSelector } from 'react-redux';
let { width, height } = Dimensions.get("window")

const Learning = ({ navigation }) => {
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
  const data = [
    {
      _id: 0,
      name: "Home Location",
      ukrainianName: "Розташування будинку",
      icon: require("../../../assets/images/DrawerIcon/homelocation.png"),
      fileName: "HomeLocation"
    },
    {
      _id: 1,
      name: "Office Location",
      icon: require("../../../assets/images/DrawerIcon/officelocation.png"),
      fileName: "Officelocation",
      ukrainianName: "Розташування офісу",
    },
    {
      _id: 2,
      name: " Set Default Tip",
      icon: require("../../../assets/images/DrawerIcon/defaulttip.png"),
      fileName: "DefaultTip",
      ukrainianName: "Підказка за замовчуванням",
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
          style={[styles.welcome, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, }]}
        >
          {Country == "UKRAINE" ? "Налаштування" : "Setting"}
        </Text>

      </View>

      <ScrollView
        style={{ marginTop: height * 0.045 }}
      >
        <>
          {data?.map((i) => (
            <TouchableOpacity
              onPress={() => { navigation.navigate(i?.fileName) }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: height * 0.0125,
                borderBottomColor: Colors?.placeholder,
                borderBottomWidth: 1,
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                width: width * 0.8,
                height: height * 0.07,
                alignSelf: "center",
                borderRadius: width * 0.035
                // justifyContent:
              }}
            >
              <Image style={{
                height: height * 0.05,
                resizeMode: "contain",
                width: width * 0.065,
                tintColor: Country == "UKRAINE" ? Colors.Yellow : Colors.Orange,
                marginHorizontal: width * 0.0325
              }} source={i?.icon} />
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                }}
              >{Country == "UKRAINE" ? i?.ukrainianName : i?.name}</Text>
            </TouchableOpacity>
          ))}
        </>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Learning

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