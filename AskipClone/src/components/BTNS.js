import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import Colors from './Colors';
const {height, width} = Dimensions.get('window');
const Loginbtn = (props,navigation) => {
  return (
    <TouchableOpacity style={style.Loginbtn} onPress={props.link}>
      <Text style={style.btntext}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const SignupBtn = (props,navigation) => {
  return (
    <TouchableOpacity
    style={style.SignupBtn}
    onPress={props.link}>
      <Text style={style.S_btntext}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const Connnection = (props,navigation) => {
  return (
    <TouchableOpacity
    style={[style.Connnection,{backgroundColor:props.color}]}
    onPress={props.link}>
      <Text style={style.C_btntext}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export {Loginbtn, SignupBtn,Connnection};

const style = StyleSheet.create({
  Loginbtn: {
    height: height * 0.065,
    backgroundColor: Colors.ButtonBorder,
    width: width * 0.8,
    borderRadius: width * 0.02,
    // alignItems:"center",
    justifyContent:"center",
    alignSelf:"center",
    marginTop:height * 0.015,
   
  },
  btntext: {
    textAlign:"center",
    // fontSize:width *0.045,
    // fontWeight:"800",
    color: Colors.whitetext,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize:width *0.051,

  },
  SignupBtn:{
    height: height * 0.065,
    width: width * 0.8,
    borderRadius: width * 0.02,
    // alignItems:"center",
    justifyContent:"center",
    alignSelf:"center",
    marginTop:height * 0.015,
    borderWidth:2,
    borderColor:Colors.ButtonBorder
  },
  S_btntext:{
    textAlign:"center",
    // fontWeight:"700",
    color: Colors.ButtonBorder,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize:width *0.049,
  },
  Connnection:{
    height: height * 0.065,
    width: width * 0.8,
    borderRadius: width * 0.02,
    // alignItems:"center",
    justifyContent:"center",
    alignSelf:"center",
    marginTop:height * 0.015,
    alignItems:'center'
    // borderWidth:1,
    
    // borderColor:Colors.ButtonBorder
  },
  C_btntext:{
    textAlign:"center",
    // fontSize:width *0.045,
    // fontWeight:"800",
    color: Colors.whitetext,
    letterSpacing:0, 
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize:width *0.053,
  }
});
