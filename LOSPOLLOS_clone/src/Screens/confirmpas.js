import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from '../component/Header';
import { useState } from 'react';
let {width, height} = Dimensions.get('window');
const Confirmpas = ({navigation}) => {
    const [eye,seteye] =useState(true)
  return (
    <SafeAreaView>
      <Header
    //   onclick={navigation.navigate("Login")}
      title={'Réinitialisation du mot de passe'} />
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            width: width * 0.8,
            // textAlign:"center",
            fontSize: width * 0.04,
            fontWeight: '600',
            color: 'black',
            marginTop: height * 0.07,
          }}>
          Veuillez choisir un nouveau mot de passe pour l’adresse mail
          j••••••@o••••••.fr
        </Text>
        <View>
          <Text
            style={{
              marginTop: height * 0.05,
              marginBottom: height * 0.01,
              paddingLeft: width * 0.02,
            }}>
            Nouveau mot de passe
          </Text>
          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              // onChangeText={setpassword}
              // value={password}
              placeholder="Mot de passe"
              placeholderTextColor="#929292"
              textContentType="password"
              secureTextEntry={eye==true?true:false}
            />
            <TouchableOpacity
             style={styles.eye}
             onPress={()=>{seteye(!eye)}}
            >
            <Image
              style={styles.eye}
              source={eye=== true?require('../images/Eyeoff.png'):require('../images/openeye.png')}
            />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            style={{
              marginTop: height * 0.02,
              marginBottom: height * 0.01,
              paddingLeft: width * 0.02,
            }}>
            Confirmez votre nouveau mot de passe
          </Text>
          <View style={styles.inputbox}>
            <TextInput
              style={styles.input}
              // onChangeText={setpassword}
              // value={password}
              placeholder="Confirmation de mot de passe"
              placeholderTextColor="#929292"
              textContentType="password"
              secureTextEntry={eye==true?true:false}
            />
          <TouchableOpacity
             style={styles.eye}
             onPress={()=>{seteye(!eye)}}
            >
            <Image
              style={styles.eye}
              source={eye=== true?require('../images/Eyeoff.png'):require('../images/openeye.png')}
            />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{
            height: height * 0.08,
            width: width * 0.4,
            backgroundColor: '#383838',
            marginTop: height * 0.08,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: width * 0.05,
          }}>
          <Text
            style={{
              fontSize: width * 0.04,
              fontWeight: '600',
              color: '#ffffff',
            }}>
            Confirmer
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Confirmpas;

const styles = StyleSheet.create({
  inputbox: {
    flexDirection: 'row',
    borderWidth: 1,
    width: width * 0.8,
    // marginTop: 20,
    alignSelf: 'center',
    borderColor: '#d6d6d6',
    borderRadius: width * 0.03,
    paddingLeft: width * 0.03,
  },
  input: {
    // paddingLeft: width * 0.038,
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
});
