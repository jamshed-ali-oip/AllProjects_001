

import { Dimensions, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../assets/Colors/Colors'
import { AuthInput } from '../../Compoents/Inputs/Inputs'
import { SecondayButton } from '../../Compoents/Buttons/BTN'
import PhoneInput from "react-native-phone-number-input";
let { width, height } = Dimensions.get("window")

const PhoneScreen = ({ navigation }) => {
    const [Phone, setPhone] = useState()


    return (
        <SafeAreaView
        style={{ backgroundColor:Colors.bg, flex: 1 }}
        >
            <TouchableOpacity
                onPress={() => { navigation.goBack() }}
            >
                <Image
                    style={styles.back}
                    source={require("../../assets/images/back.png")}
                />
            </TouchableOpacity>
            <Text
                style={styles.welcome}
            >
              What's your number?
            </Text>

            <Text
                style={styles.statement}
            >
               We’ll text a code to verify your phone
            </Text>

            <View
                style={{
                    marginTop: height * 0.035,
                    width: width * 0.7,
                    alignItems: "center",
                    alignSelf:"center",
                }}
            >
              <PhoneInput
            // ref={phoneInput}
            // defaultValue={value}
            defaultCode="DM"
            layout="first"
            containerStyle={{
                height:height*0.073,
                borderRadius:width*0.025,
                borderWidth:1,
                borderColor:Colors.placeholder,
                backgroundColor:Colors.bg
            }}
            textContainerStyle={{
                height:height*0.07,
                paddingTop:height*0.005,
                borderRadius:20,
                backgroundColor:Colors.bg,
                textAlignVertical:"center",
                paddingBottom:-height*0.05
                // textalign:"center"
            }}
            // onChangeText={(text) => {
            //   setValue(text);
            // }}
            // onChangeFormattedText={(text) => {
            //   setFormattedValue(text);
            // }}
            // withDarkTheme
            // withShadow
            autoFocus
          />
            </View>
            <View
                style={{
                    marginTop: height * 0.35,
                    width: width * 0.7,
                    alignItems: "center",
                    alignSelf:"center",
                }}
            >
                <SecondayButton
                title="Get The Code"
                onPress={()=>{navigation.navigate("OttpSignup")}}
                />
            </View>
        </SafeAreaView>
    )
}

export default PhoneScreen

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
        fontSize: width * 0.062,
        fontFamily: "Poppins-Bold",
        color: Colors.theme,
        marginTop: height * 0.05,
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