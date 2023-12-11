import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Inputs from '../../components/Inputs';
import FormInput from '../../components/Forminput';
import {SignupBtn, Loginbtn} from '../../components/BTNS';
import Colors from '../../assets/colors/Colors';
const {height, width} = Dimensions.get('window');

const CPage6 = ({setPage}) => {
  return (
    <View
    style={{marginBottom:height*0.15}}
    >
      {/* <Inputs

    height={height*0.05}
    width={width*0.5}
    placeholder="Lorem..."
    /> */}
      <Text style={styles.heading}>Réinitialiser mon mot de passe</Text>
      <Text style={styles.line}>Succès ! Tu as bien modifié ton mot de passe.</Text>
      <Image
      style={styles.image}
      source={require("../../assets/images/succes.png")}
      />
      <TouchableOpacity
      onPress={()=>{setPage(1)}}
      style={styles.confirmbtn}
      >
        <Text
           style={styles.confirmtext}
        >
          Confirmer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CPage6;

const styles = StyleSheet.create({
  textline: {
    fontSize:width*0.032,
    textDecorationLine:'underline',
    marginTop:height*0.025,
    marginLeft:width*0.12,
  },
  heading: {
    // fontSize: width * 0.04,
    textAlign:'center',
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
    marginTop:height*0.01,
    // fontWeight: '500',
    color:'black',
    fontFamily:'Bebas Neue Pro Regular',
    fontSize:width*0.045,
  },
  image:{
    height:height*0.153,
    width:height*0.153,
    resizeMode:'contain',
    alignSelf:"center",
    marginTop:height*0.035
  },
  confirmbtn:{
    height:height*0.045,
    width:height*0.3,
    borderWidth:1,
    borderColor:Colors.ButtonBorder,
    alignSelf:"center",
    margin:height*0.05,
    justifyContent:"center",
    borderRadius:width*0.01

  },
  confirmtext:{
    textAlign:"center",
    fontSize:width*0.04,
    color:Colors.ButtonBorder,
    // fontWeight:"600",
    fontFamily:'Bebas Neue Pro Bold', 

  }
});
