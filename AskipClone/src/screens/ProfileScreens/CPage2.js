import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import Inputs from '../../components/Inputs';
import FormInput from '../../components/Forminput';
import { SignupBtn, Loginbtn, Connnection } from '../../components/BTNS';
const { height, width } = Dimensions.get('window');

const CPage2 = ({ Data, setData,setPage}) => {

  const data = [

    {
      name: "SMS",
      id: 1
    }, {
      name: "Courrier éléctronique",
      id: 2
    }
  ]

const handle=()=>{
  if(Data){
    // setSelect(Data);
    setPage(3)
    // console.log(Data,"PAGE NO")
  }
}

  return (
    <View
      style={{
        marginBottom: height * 0.115,
      }}
    >

      <Text style={styles.heading}>Réinitialiser mon mot de passe </Text>
      <Text style={styles.line}>
        Je souhaite recevoir mon nouveau code de connexion par
      </Text>

      <View
        style={{ marginLeft: width * 0.15, marginTop: height * 0.02 }}
      >
        {
          data.map((item) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: width * 0.05,
                  marginTop: height * 0.02,
                }}>
                <TouchableOpacity
                  onPress={() => { setData(item.id) }}
                >
                  <Image
                    style={{ resizeMode: "contain" }}
                    source={Data == item.id ? require('../../assets/images/selectedcircle.png') : require('../../assets/images/round.png')} />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: width * 0.038,
                    marginLeft: width * 0.038,
                    fontFamily: Data == item.id ? 'Bebas Neue Pro Bold' : 'Bebas Neue Pro Regular',
                    fontSize: width * 0.05,
                    color: "black"
                  }}>
                  {item.name}
                </Text>
              </View>
            )
          })
        }
      </View>
      <TouchableOpacity
        onPress={() =>handle()}
        style={styles.Connnection}>
        <Text style={styles.C_btntext}>Envoyer</Text>
      </TouchableOpacity>

    </View>
  );
};

export default CPage2;

const styles = StyleSheet.create({
  textline: {
    fontSize: width * 0.032,
    textDecorationLine: 'underline',
    marginTop: height * 0.015,
    marginLeft: width * 0.12,
  },
  heading: {
    // fontSize: width * 0.04,
    textAlign: 'center',
    marginVertical: height * 0.065,
    // fontWeight: '700',
    color: 'black',
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.055,
    textTransform: 'uppercase',
  },
  line: {
    // fontSize: width * 0.035,
    textAlign: 'center',
    marginTop: -height * 0.015,
    // fontWeight: '500',
    color: 'black',
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.04,
    letterSpacing: 0.3,
  },
  text: {
    // fontSize: width * 0.035,
    color: '#2a2a2a',
    paddingHorizontal: width * 0.035,
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.048,
  },
  image: {
    width: width * 0.05,
    height: height * 0.04,
    resizeMode: 'contain',
  },
  view: {
    flexDirection: 'row',
    paddingHorizontal: width * 0.09,
    alignItems: 'center',
    marginTop: height * 0.033,
  },
  insideimage: {
    width: width * 0.035,
    height: height * 0.023,
    resizeMode: 'contain',
    position: 'absolute',
    marginTop: height * 0.0095,
    marginLeft: width * 0.007,
  },
  Connnection: {
    height: height * 0.06,
    width: width * 0.65,
    borderRadius: width * 0.02,
    // alignItems:"center",
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: height * 0.015,
    // borderWidth:1,
    backgroundColor: Colors.grey,
    marginTop: height * 0.04,
    // borderColor:Colors.ButtonBorder
  },
  C_btntext: {
    textAlign: 'center',
    // fontSize: width * 0.045,
    // fontWeight: '800',
    color: Colors.whitetext,
    letterSpacing: 0,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.053,
  },
});
