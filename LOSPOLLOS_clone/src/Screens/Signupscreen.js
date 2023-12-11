


import React, {useState, useEffect, useMemo, useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
let {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../component/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Svg, Path} from 'react-native-svg';

const Signupscreen = ({navigation}) => {
  const [email, setemail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [name,setname]= React.useState('');
  const [number,setnumber]= React.useState('');

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <View style={styles.ctn1}>
            <Image style={styles.logo} source={require('../images/logo.png')} />
            <Text style={styles.title}>Spécialiste du Poulet Braisé</Text>
            <Text style={styles.tag}>AGREE PAR AVS</Text>
          </View>

          <View style={styles.ctn2}>
            <View style={styles.inputbox}>
              <TextInput
                style={styles.input}
                onChangeText={setname}
                value={name}
                placeholder="Nom et Prénom"
                // keyboardType="numeric"
                placeholderTextColor="#929292"
              />
            </View>
            <View style={styles.inputbox}>
              <TextInput
                style={styles.input}
                onChangeText={setemail}
                value={email}
                placeholder="E-mail"
                placeholderTextColor="#929292"
                // textContentType="password"
                // secureTextEntry={true}
              />
             
            </View>
            <View style={styles.inputbox}>
              <TextInput
                style={styles.input}
                onChangeText={setnumber}
                value={number}
                placeholder="Numéro de téléphone"
                keyboardType="numeric"
                placeholderTextColor="#929292"
              />
            </View>
            <View style={styles.inputbox}>
              <TextInput
                style={styles.input}
                onChangeText={setpassword}
                value={password}
                placeholder="Mot de passe"
                placeholderTextColor="#929292"
                textContentType="password"
                secureTextEntry={true}
              />
              <Image
                style={styles.eye}
                source={require('../images/Eyeoff.png')}
              />
            </View>
           
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CreateAcount")
              }}
              style={styles.Signin}>
              <Text style={styles.btntxt}>Créer un compte</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
              <Text style={{color:"#000"}}>
              J’ai un compte
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Signupscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logintext: {
    fontSize: width * 0.065,
    fontWeight: '400',
    color: 'black',
    alignSelf: 'center',
  },
  line: {
    borderWidth: 1,
    borderColor: '#d6d6d6',
    width: width,
    borderBottomColor: 'transparent',
    marginTop: height * 0.05,
  },
  inputbox: {
    flexDirection: 'row',
    borderWidth: 1,
    width: width * 0.8,
    marginTop: height*0.01,
    alignSelf: 'center',
    borderColor: '#d6d6d6',
    borderRadius: width * 0.03,
  },
  input: {
    paddingLeft: width * 0.038,
  },
  logo: {
    height: height * 0.2,
    width: width * 0.35,
    alignSelf: 'center',
  },

  title: {
    fontSize: width * 0.05,
    color: 'black',
    fontweight: '600',
    textAlign: 'center',
  },
  tag: {
    fontSize: width * 0.083,
    textAlign: 'center',
    color: 'black',
    fontWeight: '800',
    marginTop: -height * 0.012,
  },
  btn: {
    height: height * 0.065,
    width: width * 0.85,
    backgroundColor: '#d74844',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginTop: 20,
  },
  Signin: {
    height: height * 0.06,
    width: width * 0.8,
    backgroundColor: '#E63835',
    borderRadius: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.02,
    alignSelf: 'center',
  },
  btntxt: {
    color: '#ffffff',
    fontSize: width * 0.038,
    fontWeight: '500',
  },
  ctn1: {
    marginTop: height * 0.08,
    alignItems: 'center',
  },
  ctn2: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  eye: {
    height: height * 0.035,
    width: width * 0.05,
    resizeMode: 'contain',
    // alignSelf:"flex-end",
    position: 'absolute',
    // alignItems:"stretch"
    marginLeft: width * 0.7,
    alignSelf: 'center',
  },
  round: {
    height: height * 0.03,
    width: width * 0.032,
    resizeMode: 'contain',
    marginRight:height *0.01
  },
});
