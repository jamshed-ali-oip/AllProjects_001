import { Dimensions, Image, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../assets/Colors/Colors'
import { AuthInput } from '../../Compoents/Inputs/Inputs'
import { SecondayButton } from '../../Compoents/Buttons/BTN'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from '../../redux/actions/user.action'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

let { width, height } = Dimensions.get("window")

const Login = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [show, setshow] = useState(true)
  const [Loading, setLoading] = useState(false)
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

  const dispatch = useDispatch()
  const loginHandle = () => {
    const data = {
      email: email,
      password: password
    }
    setLoading(true)
    dispatch(LoginUser(data, Toast, setLoading))
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.bg, flex: 1 }}
    >


      <Image
        style={styles.logo}
        source={Country == "UKRAINE" ? require("../../assets/images/logoukr.png") : require("../../assets/images/logo.png")}
      />
      <Text
        style={[styles.welcome, { color: Country == "UKRAINE" ? Colors.Yellow : Colors.theme }]}
      >
        {Country == "UKRAINE" ? "З поверненням!" : "Welcome Back!"}
      </Text>
      <View
        style={{ flexDirection: "row" }}
      >
        <Text
          style={styles.statement}
        >
          {Country == "UKRAINE" ? "Немає облікового запису?" : "Don't have an account?"}
        </Text>
        <TouchableOpacity
          // onPress={() => { navigation.navigate("SignUp") }}
          onPress={() => { navigation?.navigate("PersonalDetail") }}
        >
          <Text
            style={[styles.statement2, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.Orange }]}
          >
            {Country == "UKRAINE" ? "Зареєструватися зараз!" : " Sign Up Now!"}
          </Text>
        </TouchableOpacity>
      </View>
      <Toast ref={(ref) => { Toast.setref(ref) }} />
      <AuthInput
        label={Country == "UKRAINE" ? "Електронна пошта" : "Email"}
        placeholder={Country == "UKRAINE" ? "Введіть свою електронну адресу тут..." : "Enter Your Email here..."}
        onChangeText={setEmail}
        value={email}
      />


      <AuthInput
        label={Country == "UKRAINE" ? "Пароль" : "Password"}
        placeholder={Country == "UKRAINE" ? "Введіть свій пароль тут..." : "Enter Your Password here..."}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={show}
      />


      <View
        style={{
          flexDirection: "row",
          padding: width * 0.035,
          alignContent: "center",
          justifyContent: "space-between",
          paddingHorizontal: width * 0.055,
          marginTop: height * 0.015
        }}
      >
        <View
          style={{ flexDirection: "row" }}
        >
          <TouchableOpacity
            activeOpacity={100}
          >
            {/* <Image
              style={{ resizeMode: "contain" }}
              source={require("../../assets/images/uncheck.png")}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { setshow(!show) }}
          >
            <Text
              style={styles.remember}
            >{show === true ? Country == "UKRAINE" ? "Показати пароль" : "Show Password" : Country == "UKRAINE" ? "Приховати пароль" : "Hide Password"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => { navigation.navigate("ForgetPass") }}
        >
          <Text
            style={[styles.Forget, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.Orange }]}
          >
            {Country == "UKRAINE" ? "Забули пароль?" : "Forgot Password?"}
          </Text>
        </TouchableOpacity>
      </View>
      <SecondayButton
        onPress={() => { loginHandle() }}
        title={Loading == true ? <ActivityIndicator size="small" color="#ffffff" /> : Country == "UKRAINE" ? "Увійти" : "Sign In"}
      />
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
    marginTop: height * 0.08,
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
    fontSize: width * 0.036,
    fontFamily: "Poppins-Medium",
    color: Colors.placeholder,
    marginTop: -height * 0.008,
    marginLeft: width * 0.01,
    // backgroundColor:"red"
    textDecorationColor: Colors.Orange,
    textDecorationLine: "underline",
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