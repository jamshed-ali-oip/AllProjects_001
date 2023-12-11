import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../../assets/Colors/Colors';
import { AuthInput } from '../../Compoents/Inputs/Inputs';
import { SecondayButton } from '../../Compoents/Buttons/BTN';
import AsyncStorage from '@react-native-async-storage/async-storage';
let { width, height } = Dimensions.get('window');

const Login = async ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [ConfirmPassword, setConfirm_Password] = useState();
  // async function readMergedValue() {
  //   const saved = await AsyncStorage.getItem('MERGER');
  //   setMergedValue(saved ? JSON.parse(saved) : {});
  // }
  await AsyncStorage.setItem('MERGER', "qaduu")
  const data = await AsyncStorage.getItem('MERGER')
  console.log("my dataaaa", data)
  console.log("asyncd", data)
  useEffect(async () => {
    const data = await AsyncStorage.getItem('inputKey')
    console.log("asyncd", data)
  }, [])
  return (
    <SafeAreaView style={{ backgroundColor: Colors.bg, flex: 1 }}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />
      <Text style={styles.welcome}>Create Account!</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.statement}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.statement2}>Sign in!</Text>
        </TouchableOpacity>
      </View>
      <AuthInput
        label="Email"
        placeholder="Enter Your Email here..."
        onChangeText={setEmail}
        value={email}
        name="email"
      />
      <AuthInput
        label="Password"
        placeholder="Passwords here..."
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <AuthInput
        label="Confirm Password"
        placeholder="Confirm Password here..."
        onChangeText={setConfirm_Password}
        value={ConfirmPassword}
        secureTextEntry={true}
      />

      <View style={{ marginTop: height * 0.035 }}>
        <SecondayButton
          onPress={() => {
            navigation.navigate('PhoneScreen');
          }}
          title="Sign up"
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    height: height * 0.075,
    // backgroundColor:"red",
    width: width * 0.5,
    alignSelf: 'center',
    marginTop: height * 0.11,
  },
  welcome: {
    fontSize: width * 0.062,
    fontFamily: 'Poppins-Bold',
    color: Colors.theme,
    marginTop: height * 0.08,
    marginLeft: width * 0.05,
    // backgroundColor:"red"
  },
  statement: {
    fontSize: width * 0.036,
    fontFamily: 'Poppins-Light',
    color: Colors.text,
    marginTop: -height * 0.01,
    marginLeft: width * 0.05,
    // backgroundColor:"red"
  },
  statement2: {
    fontSize: width * 0.036,
    fontFamily: 'Poppins-Bold',
    color: Colors.Orange,
    marginTop: -height * 0.012,
    marginLeft: width * 0.01,
    // backgroundColor:"red"
    textDecorationColor: Colors.Orange,
    textDecorationLine: 'underline',
  },
  remember: {
    marginLeft: width * 0.0229,
    fontFamily: 'Poppins-Medium',
    color: Colors.placeholder,
    marginTop: -height * 0.005,
    fontSize: width * 0.037,
  },
  Forget: {
    fontSize: width * 0.036,
    fontFamily: 'Poppins-Medium',
    color: Colors.Orange,
    marginTop: -height * 0.008,
    marginLeft: width * 0.01,
    // backgroundColor:"red"
    textDecorationColor: Colors.Orange,
    textDecorationLine: 'underline',
  },
});
