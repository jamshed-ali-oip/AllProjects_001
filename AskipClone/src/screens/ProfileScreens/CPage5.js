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
import { SignupBtn,Loginbtn } from '../../components/BTNS';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Inner_password_Reset } from '../../redux/actions/user.action';
const {height, width} = Dimensions.get('window');

const CPage5 = ({setPage}) => {
  const [password,setpassword]=useState()
  const dispatch = useDispatch()
  const [confirmPassword,setconfirmPassword]= useState()
  const confirm_Otp_Data_phone = useSelector((state)=>state?.auth?.forgetInnerPassData?.phone)
  const confirm_Otp_Data_email = useSelector((state)=>state?.auth?.forgetInnerPassData?.email)
  const resetPassword = () => {
    let data = {
      phone:confirm_Otp_Data_phone||null,
      email:confirm_Otp_Data_email||null,
      newPassword: password,
      confirmPassword: confirmPassword,
    };
    // console.log('------------------------', data);
    dispatch(Inner_password_Reset(data, setPage));
  };

  return (
    <View
    style={{marginBottom:height*0.07}}
    >
      {/* <Inputs

    height={height*0.05}
    width={width*0.5}
    placeholder="Lorem..."
    /> */}
  <Text style={styles.heading}>Réinitialiser mon mot de passe </Text>
      <FormInput
        title="Nouveau mot de passe "
        placeholder="************"
        type="numeric"
        contentype={'password'}
        security={true}
        // maxletter={4}
        value={password}
        setvalue={setpassword}
      />
     <View style={styles.space}> 

     </View>
      <FormInput
        title="Confirmation du nouveau mot de passe"
        placeholder="************"
        type="numeric"
        contentype={'password'}
        security={true}
        // maxletter={4}
        value={confirmPassword}
        setvalue={setconfirmPassword}
      />
        <TouchableOpacity
        onPress={() =>resetPassword()}
        style={styles.Connnection}>
        <Text style={styles.C_btntext}>Envoyer</Text>
      </TouchableOpacity> 
    
    </View>
  );
};

export default CPage5;

const styles = StyleSheet.create({
  textline: {
    fontSize:width*0.032,
    textDecorationLine:'underline',
    marginTop:height*0.015,
    marginLeft:width*0.12,
  },
  heading: {
   // fontSize: width * 0.04,
   textAlign:'center',
   marginTop:height*0.05, 
   marginVertical:height*0.035,
   // fontWeight: '700',
   color:'black',
   fontFamily:'Bebas Neue Pro Bold',
   fontSize:width*0.055,
   textTransform:'uppercase',
  },
  space:{
    height:height*0.018,
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
