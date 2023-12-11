import { Dimensions, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
// import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Colors from '../../assets/Colors/Colors'
import { Google_API } from '../../config/GoogleApi';
import { color } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
// import { ScrollView } from 'react-native-gesture-handler';
let { width, height } = Dimensions.get("window")
const AuthInput = (props) => {
  return (
    <View
      style={{ marginTop: height * 0.015 }}
    >
      {/* <Text
      style={styles.lable}
      >{props.label}</Text>   */}
      <TextInput
        style={styles.input}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholderTextColor={Colors.placeholder}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        editable={props.editable}
      />
    </View>
  )
}
const InfoInput = (props) => {
  return (
    <View
      style={{ marginTop: height * 0.015 }}
    >

      <TextInput
        style={styles.Info}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholderTextColor={Colors.text}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        editable={props.editable}
      />
      <Image
        style={styles.icon}
        source={props.source}
      />
    </View>
  )
}
const VerInput = (props) => {
  return (
    <View
      style={{ marginTop: height * 0.015 }}
    >

      <TextInput
        style={styles.Ver}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholderTextColor={Colors.text}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
      />
      {/* <Image
      style={styles.icon}
      source={props.source}
      /> */}
      <Text
        style={styles.verfitext}
      >Verified</Text>
    </View>
  )
}
const GoogleInput = (props) => {
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
  return (
    <View
      style={{ width: width * 0.8, alignSelf: "center", marginTop: height * 0.035, marginBottom: height * 0.015 }}
    >
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: width * 0.03,
          paddingLeft: width * 0.012,
          color: Colors.text
        }}
      >{props.title}</Text>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 1,
        // backgroundColor: Colors.white,
        borderColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 5,
        borderRadius: 7,
        // height: height * 0.06
      }} >
        <Image
          style={{ resizeMode: "contain", width: width * 0.05, marginLeft: 5, tintColor: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme }}
          source={require("../../assets/images/search.png")} />

        <>
          <GooglePlacesAutocomplete

            textInputProps={props.textInputProps}
            onFocus={props.onFocus}


            styles={{
              textInput: {
                color: "#000000",

              },
              description: {
                fontSize: 16,
                color: '#000000', // Change the text color of the suggestion
              },
            }}
            // predefinedPlaces={{ color: "red" }}

            placeholder={props.placeholder}
            onPress={props.onPress}
            query={{
              key: Google_API,
              language: 'en',
            }}
          /></>
      </View>
    </View>
  )
}
const DetailsInput = (props) => {
  return (
    <View
      style={{ marginTop: height * 0.015 }}
    >

      <TextInput
        style={styles.detail}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholderTextColor={Colors.text}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        multiline={true}
        numberOfLines={4}
        onFocus={() => { console.log("onFocus") }}
      />

    </View>
  )
}
const Mapdetailinput = (props) => {
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
  return (
    <View
      style={{
        marginTop: height * 0.015,
        marginBottom: height * 0.015,

      }}
    >
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: width * 0.03,
          paddingLeft: width * 0.11,
          color: Colors.text
        }}
      >{props?.title}</Text>
      <View
        style={{
          height: height * 0.06,
          borderColor: Colors.placeholder,
          padding: width * 0.0135,
          borderWidth: 1,
          alignSelf: "center",
          width: width * 0.8,
          backgroundColor: Colors.white,
          color: "#000000", fontFamily: "Poppins-Regular",
          borderRadius: width * 0.015,
          paddingLeft: width * 0.035,
          borderWidth: 1,
          // backgroundColor: Colors.white,
          borderColor: Colors.white,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.46,
          shadowRadius: 11.14,
          elevation: 5,
          justifyContent: "center"

        }}

      >
        <Text
          style={{ color: Colors.text, fontFamily: "Poppins-Regular", }}
        >{props.text}</Text>
      </View>
      <TouchableOpacity
        onPress={props.onPress}
      >
        <Image
          style={[styles.icon2, { tintColor: Country == "UKRAINE" ? Colors?.Yellow : Colors?.theme }]}
          source={props.source}
        />
      </TouchableOpacity>
    </View>
  )
}
export { AuthInput, InfoInput, VerInput, GoogleInput, DetailsInput, Mapdetailinput }

const styles = StyleSheet.create({
  input: {
    height: height * 0.055,
    // margin: width*0.0325,
    // borderWidth: 1,
    borderBottomColor: Colors.placeholder,
    padding: width * 0.0135,
    borderBottomWidth: 1,
    alignSelf: "center",
    width: width * 0.9,
    // backgroundColor:"red"
    color: "#000000", fontFamily: "Poppins-Regular"
  },
  lable: {
    color: Colors.placeholder,
    marginLeft: width * 0.048
  },
  Info: {
    height: height * 0.07,
    // margin: width*0.0325,
    // borderWidth: 1,
    borderColor: Colors.placeholder,
    padding: width * 0.0135,
    borderWidth: 1,
    alignSelf: "center",
    width: width * 0.85,
    // backgroundColor:"red"
    color: "#000000", fontFamily: "Poppins-Regular",
    borderRadius: width * 0.015,
    paddingLeft: width * 0.035
  },
  icon: {
    resizeMode: "contain",
    position: "absolute",
    alignSelf: "flex-end",
    paddingRight: width * 0.28,
    marginTop: height * 0.025,
    // backgroundColor:"red"
  },
  icon2: {
    resizeMode: "contain",
    position: "absolute",
    alignSelf: "flex-end",
    paddingRight: width * 0.28,
    marginTop: -height * 0.04,
    // backgroundColor:"red"
  },
  Ver: {
    height: height * 0.07,
    // margin: width*0.0325,
    // borderWidth: 1,
    borderColor: Colors.placeholder,
    padding: width * 0.0135,
    borderWidth: 1,
    alignSelf: "center",
    width: width * 0.85,
    // backgroundColor:"red"
    color: "#000000", fontFamily: "Poppins-Regular",
    borderRadius: width * 0.015,
    paddingLeft: width * 0.035
  }, verfitext: {
    color: Colors.succes,
    position: "absolute",
    alignSelf: "flex-end",
    paddingRight: width * 0.12,
    marginTop: height * 0.022,
    fontFamily: "Poppins-Italic",
    // backgroundColor:"red"
    fontSize: width * 0.03
  },
  detail: {
    height: height * 0.12,
    // margin: width*0.0325,
    // borderWidth: 1,
    borderColor: Colors.text,
    padding: width * 0.0135,
    borderWidth: 1,
    alignSelf: "center",
    width: width * 0.8,
    // backgroundColor:"red"
    color: "#000000", fontFamily: "Poppins-Regular",
    borderRadius: width * 0.015,
    paddingLeft: width * 0.035,
    textAlignVertical: "top"
  },
  // verfitext: {
  //   color: Colors.succes,
  //   position: "absolute",
  //   alignSelf: "flex-end",
  //   paddingRight: width * 0.12,
  //   marginTop: height * 0.022,
  //   fontFamily: "Poppins-Italic",
  //   // backgroundColor:"red"
  //   fontSize: width * 0.03,
  //   // textAlignVertical: "top"
  // },
})