


import { Dimensions, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../assets/Colors/Colors'
import { AuthInput } from '../../Compoents/Inputs/Inputs'
import { SecondayButton } from '../../Compoents/Buttons/BTN'
import { useDispatch, useSelector } from 'react-redux'
import { EmailVerification } from '../../redux/actions/user.action'

let { width, height } = Dimensions.get("window")

const ForgetPass = ({ navigation }) => {
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
  const dispatch = useDispatch()
  const [email, setEmail] = useState()
  const [Loading, setLoading] = useState(false)
  const submitemail = () => {
    setLoading(true)
    const data = {
      email: email
    }
    dispatch(EmailVerification(data, navigation, setLoading))
  }
  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.bg, flex: 1 }}
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
        style={[styles.welcome, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme }]}
      >
        {Country == "UKRAINE" ? "Забули пароль!" : "Forget Password!"}
      </Text>

      <Text
        style={styles.statement}
      >
        {Country == "UKRAINE" ? "Ми надішлемо вам код для підтвердження облікового запису" : "We will send you code to verify account"}
      </Text>


      <AuthInput
        // label="Email"
        placeholder={Country == "UKRAINE" ? "Електронна пошта або телефон" : "Email or Phone"}
        onChangeText={setEmail}
        value={email}
      />


      <View
        style={{ marginTop: height * 0.035 }}
      >
        <SecondayButton
          title={Loading == true ? <ActivityIndicator size={"small"} color={Colors.white} /> : Country == "UKRAINE" ? "Надіслати код" : "Send Code"}
          onPress={() => {
            submitemail()
            //  navigation.navigate("Ottp") 
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default ForgetPass

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