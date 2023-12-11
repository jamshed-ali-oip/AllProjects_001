import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'
import { InfoInput } from '../../Compoents/Inputs/Inputs'
import { IconButton, PrimaryButton } from '../../Compoents/Buttons/BTN'
import Colors from '../../assets/Colors/Colors'
let { height, width } = Dimensions.get("window")

const PersonalDetail = ({navigation}) => {
  return (
    <SafeAreaView
    style={{ backgroundColor:Colors.bg, flex: 1 }}
    >
      <View
        style={{ flexDirection: "row" }}
      >
        <TouchableOpacity
                onPress={()=>{navigation.goBack()}}
                >
                <Image
                    style={styles.back}
                    source={require("../../assets/images/back.png")}
                />
                </TouchableOpacity>
        <Text
          style={styles.welcome}
        >
          Personal detail
        </Text>
      </View>
      <View
        style={{
          marginTop: height * 0.055
        }}
      >
        <InfoInput
          placeholder="First Name"
          source={require("../../assets/images/profile.png")}
        />
        <InfoInput
          placeholder="Last Name"
          source={require("../../assets/images/profile.png")}
        />
        <InfoInput
          placeholder="Date Of Birth"
          source={require("../../assets/images/date.png")}
        />
        <InfoInput
          placeholder="Driver’s License number"
          source={require("../../assets/images/card.png")}
        />
        <InfoInput
          placeholder="Expiration date"
          source={require("../../assets/images/profile.png")}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingHorizontal:width*0.1,
          marginTop:height*0.15
        }}
      >
        <IconButton
          source={require("../../assets/images/scan.png")}
          onPress={()=>{navigation.navigate("Scanner")}}
        />
        <PrimaryButton
          title="Submit"
        />

      </View>
    </SafeAreaView>
  )
}

export default PersonalDetail

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
  }
})