
import { Dimensions, Image, ScrollView, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../assets/Colors/Colors'
import { AuthInput } from '../../Compoents/Inputs/Inputs'
import { SecondayButton } from '../../Compoents/Buttons/BTN'
// import { ScrollView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux'
let { width, height } = Dimensions.get("window")

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [ConfirmPassword, setConfirm_Password] = useState("")
  const [first_name, setfirst_name] = useState("")
  const [last_name, setlast_name] = useState("")
  const [referalCode, setReferalCode] = useState("")
  const [Loading, setLoading] = useState(false)
  // const [phone, setphone] = useState()
  const [gender, setgender] = useState("MALE")
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
  const Submit = () => {
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
    const data = {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      gender: gender?.toUpperCase()
    }
    if (!strongRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid email address',
        text2: 'check your email address 👋'
      })
    }
    else if (password.length < 6) {
      // alert("password must be 6 character")
      Toast.show({
        type: 'info',
        text1: 'Invalid Password',
        text2: 'password must be 6 character" 👋'
      })

    } else if (password !== ConfirmPassword) {
      Toast.show({
        type: 'info',
        text1: 'Invalid Password',
        text2: 'Password Doest not match" 👋'
      })


    } else {
      navigation.navigate("PhoneScreen", { data: data })
    }
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.bg, flex: 1 }}
    >

      <ScrollView>
        <Image
          style={styles.logo}
          source={Country == "UKRAINE" ? require("../../assets/images/logoukr.png") : require("../../assets/images/logo.png")}
        />
        <Text
          style={[styles.welcome, { color: Country == "UKRAINE" ? Colors.Yellow : Colors.theme }]}
        >
          {Country == "UKRAINE" ? "Створити акаунт!" : "Create Account!"}
        </Text>
        <View
          style={{ flexDirection: "row" }}
        >
          <Text
            style={styles.statement}
          >
            {Country == "UKRAINE" ? "Вже є аккаунт?" : "Already have an account?"}
          </Text>
          <TouchableOpacity
            onPress={() => { navigation.navigate("Login") }}
          >
            <Text
              style={[styles.statement2, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.Orange }]}
            >
              {Country == "UKRAINE" ? "Увійти!" : "Sign in!"}
            </Text>
          </TouchableOpacity>
        </View>
        <Toast ref={(ref) => { Toast.setref(ref) }} />
        <AuthInput
          // label="Email"
          placeholder={Country == "UKRAINE" ? "Введіть своє ім'я" : "Enter Your First Name"}
          onChangeText={setfirst_name}
          value={first_name}
        />
        <AuthInput
          // label="Password"
          placeholder={Country == "UKRAINE" ? "Введіть своє прізвище" : "Enter Your Last Name"}
          onChangeText={setlast_name}
          value={last_name}
        // secureTextEntry={true}
        />
        <AuthInput
          // label="Confirm Password"
          placeholder={Country == "UKRAINE" ? "Введіть свою електронну адресу" : "Enter Your Email"}
          onChangeText={setEmail}
          value={email}
        // secureTextEntry={true}
        />
        <AuthInput
          // label="Confirm Password"
          placeholder={Country == "UKRAINE" ? "Введіть свою стать" : "Enter Your Gender"}
          onChangeText={setgender}
          value={gender}
        // secureTextEntry={true}
        />
        <AuthInput
          // label="Email"
          placeholder={Country == "UKRAINE" ? "Введіть ваш пароль" : "Enter Your Password"}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <AuthInput
          // label="Password"
          placeholder={Country == "UKRAINE" ? "Підтвердьте пароль" : "Confirm Password"}
          onChangeText={setConfirm_Password}
          value={ConfirmPassword}
          secureTextEntry={true}
        />
        <AuthInput
          // label="Password"
          placeholder={Country == "UKRAINE" ? "Реферальний код (необов'язково)" : "Referal Code (Optional)"}
          onChangeText={setReferalCode}
          value={referalCode}

          secureTextEntry={true}
        />


        <View
          style={{ marginTop: height * 0.035 }}
        >
          <SecondayButton
            onPress={() => {
              // showToast()
              Submit()
            }}
            title={Country == "UKRAINE" ? "Зареєструватися" : "Sign up"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    height: height * 0.075,
    // backgroundColor:"red",
    width: width * 0.5,
    alignSelf: "center",
    marginTop: height * 0.11,

  },
  welcome: {
    fontSize: width * 0.062,
    fontFamily: "Poppins-Bold",
    color: Colors.theme,
    marginTop: height * 0.04,
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