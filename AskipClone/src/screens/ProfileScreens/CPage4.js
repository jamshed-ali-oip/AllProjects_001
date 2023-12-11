import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Inputs from '../../components/Inputs';
import FormInput from '../../components/Forminput';
import {SignupBtn, Loginbtn} from '../../components/BTNS';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Inner_userVerifyInfo } from '../../redux/actions/user.action';
const {height, width} = Dimensions.get('window');

const CPage4 = ({setPage}) => {
  const [Ottp,setOttp]=useState()
  const dispatch = useDispatch()

  const confirm_Otp_Data_phone = useSelector((state)=>state?.auth?.forgetInnerPassData?.phone)
  const confirm_Otp_Data_email = useSelector((state)=>state?.auth?.forgetInnerPassData?.email)
  // console.log(confirm_Otp_Data_phone,confirm_Otp_Data_email)

  const userConfirmation = () => {
    let userVerify = {
      phone:confirm_Otp_Data_phone||null,
      email:confirm_Otp_Data_email||null,
      otpCode: Ottp,
    };
    // console.log(userVerify);
    dispatch(Inner_userVerifyInfo(userVerify,setPage));
  };
  return (
    <View
    style={{marginBottom:height*0.15}}
    >
    
      <Text style={styles.heading}>Réinitialiser mon mot de passe </Text>
      <Text style={styles.line}>Renseigne ton code de connexion :</Text>
      <FormInput
      placeholder="123"
      type="numeric"
      setvalue={setOttp}
      value={Ottp}
      />
      
 
      <TouchableOpacity
        onPress={() =>userConfirmation()}
        style={styles.Connnection}>
        <Text style={styles.C_btntext}>Envoyer</Text>
      </TouchableOpacity>      
    </View>
  );
};

export default CPage4;

const styles=StyleSheet.create({
  textline:{
    fontSize:width*0.032,
    textDecorationLine: 'underline',
    marginTop:height*0.025,
    marginLeft:width*0.12,
  },
  heading: {
    // fontSize: width * 0.04,
    textAlign: 'center',
    marginTop:height*0.06, 
    marginVertical:height*0.02,
    // fontWeight: '700',
    color:'black',
    fontFamily:'Bebas Neue Pro Bold',
    fontSize:width*0.055,
    textTransform:'uppercase',
  },
  line: {
    fontSize:width*0.035,
    textAlign:'center',
    marginTop:height*0.02,
    marginBottom:-height*0.022,
    // fontWeight: '500',
    color:'black',
    fontFamily:'Bebas Neue Pro Regular',
    fontSize:width*0.045,
  },Connnection: {
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
