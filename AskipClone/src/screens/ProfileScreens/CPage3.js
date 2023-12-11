import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Inputs from '../../components/Inputs';
import FormInput from '../../components/Forminput';
import { SignupBtn, Loginbtn } from '../../components/BTNS';
import { forget_Inner_Password, forget_Password } from '../../redux/actions/user.action';
import { useDispatch, useSelector } from 'react-redux';
const { height, width } = Dimensions.get('window');

const CPage3 = ({ Data,setPage,Page }) => {
  
  const dispatch=useDispatch()
  const [email, setemail] = useState(null)
  const [phone, setphone] = useState(null)
  const sendCode=()=>{
    // console.log("set page",setPage)
 let data={
  phone:phone?.slice(1),
  email:email,
 }
//  console.log(data,"PHONE DATA")
 dispatch(forget_Inner_Password(data,setPage))
  }

  return (
    <View
      style={{ marginBottom: height * 0.15 }}
    >

      <Text style={styles.heading}>Réinitialiser mon mot de passe </Text>

      {
        Data === 1 ? (

          <FormInput
            placeholder="Phone"
            type="numeric"
            setvalue={setphone}
            value={phone}
            maxletter={10}
          />
        ) : (

          <FormInput
            placeholder="Email"
            setvalue={setemail}
            value={email}
          />
        )
      }
      <TouchableOpacity
        onPress={() =>sendCode()}
        style={styles.Connnection}>
        <Text style={styles.C_btntext}>Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CPage3;

const styles = StyleSheet.create({
  textline: {
    fontSize: width * 0.032,
    textDecorationLine: 'underline',
    marginTop: height * 0.025,
    marginLeft: width * 0.12,
  },
  heading: {
    // fontSize: width * 0.04,
    textAlign: 'center',
    marginTop: height * 0.06,
    marginVertical: height * 0.02,
    // fontWeight: '700',
    color: 'black',
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.055,
    textTransform: 'uppercase',
  },
  line: {
    fontSize: width * 0.035,
    textAlign: 'center',
    marginTop: height * 0.02,
    marginBottom: -height * 0.022,
    // fontWeight: '500',
    color: 'black',
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.045,
  },  Connnection: {
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
