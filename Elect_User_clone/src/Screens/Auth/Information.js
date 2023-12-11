// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'


import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'
import { InfoInput, VerInput } from '../../Compoents/Inputs/Inputs'
import { IconButton, PrimaryButton } from '../../Compoents/Buttons/BTN'
import Colors from '../../assets/Colors/Colors'
let { height, width } = Dimensions.get("window")

const Information = ({ navigation }) => {
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
          Your Info
        </Text>
      </View>
      <View 
      style={{
        alignItems:"center",
        marginTop:height*0.035
      }}
      >
        <Image
          style={{
            resizeMode: "contain",
            alignSelf: "center"
          }}
          source={require("../../assets/images/dummy.png")}
        />
        <Text
        style={{
          fontFamily:"Poppins-Bold",
          fontSize:width*0.04,
          color:Colors.theme,
        }}
        >
          John Smith
        </Text>
        <Text
         style={{
          fontFamily:"Poppins-Light",
          fontSize:width*0.03,
          color:Colors.text,
          
        }}
        >
          View Profile
        </Text>
      </View>
      <View
        style={{
          marginTop: height * 0.02
        }}
      >
        <VerInput
          placeholder="First Name"
          source={require("../../assets/images/profile.png")}
        />
        <VerInput
          placeholder="Last Name"
          source={require("../../assets/images/profile.png")}
        />
        <VerInput
          placeholder="Date Of Birth"
          source={require("../../assets/images/date.png")}
        />
        <VerInput
          placeholder="Driver’s License number"
          source={require("../../assets/images/card.png")}
        />
        <VerInput
          placeholder="Expiration date"
          source={require("../../assets/images/profile.png")}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingHorizontal: width * 0.1,
          marginTop: height * 0.07
        }}
      >

        <PrimaryButton
          title="Next"
          onPress={()=>{navigation.navigate("Agreement")}}
        />

      </View>
    </SafeAreaView>
  )
}

export default Information

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