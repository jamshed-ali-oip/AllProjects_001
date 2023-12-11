import {Dimensions, Image, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
const {width, height} = Dimensions.get('window');

const CPage10 = ({setPage}) => {
  // const email=useSelector(state => state?.auth?.User?.email)
  // console.log("emaillllllllll",email||credentialemail)
  // const credentialemail=useSelector(state => state?.auth?.credential?.User?.email)
  const email=useSelector(state => state?.auth?.User?.data?.email)
  const credentialemail=useSelector(state => state?.auth?.credential?.User?.email)
  // const userData=useSelector(state => state?.auth?.User)

  // console.log("yahan meri email dikhao page 10",)
  
  return (
    <View style={styles.mainView}>
      <Text style={styles.heading}>Supprimer mon compte</Text>

      <Text style={styles.description}>
        La suppression de ton compte est définitive et tu ne seras pas en mesure
        de le récupérer. Toutes les données de ton compte ASKIP seront
        supprimées.
      </Text>
      <Text style={styles.description}>
        <Text style={styles.bold}> Prénom,</Text> si tu souhaites fermer votre
        compte de manière définitive, nous t’enverrons un e-mail contenant la
        dernière étape à suivre à l’adresse :
      </Text>

      <Text style={styles.email}>{email||credentialemail} </Text>
      <TouchableOpacity
        onPress={() =>setPage(11)}
        style={styles.Connnection}>
        <Text style={styles.C_btntext}>Suivant</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CPage10;

const styles = StyleSheet.create({
  bold: {
    fontWeight:'800',
    color:'#233765',
  },
  heading: {
    // fontSize: width * 0.04,
    textAlign:'center',
    marginTop:height*0.03, 
    marginVertical:height*0.02,
    // fontWeight: '700',
    color:'black',
    fontFamily:'Bebas Neue Pro Bold',
    fontSize:width*0.055,
    textTransform:'uppercase',
    letterSpacing:0.35, 
  },
  description: {
     // fontSize: width * 0.035,
     color:'#000000',
     textAlign:'center', 
     width:width*0.85, 
     marginVertical:height*0.0125, 
     fontFamily:'Bebas Neue Pro Regular',
     fontSize:width*0.045,
  },
  email: {
    fontSize:width*0.045,
    color:'#000000',
    fontWeight:'500',
    marginTop:height*0.01,
     fontFamily:'Bebas Neue Pro Regular'
  },

  mainView: {
    alignItems:'center',
    marginBottom:height*0.095, 
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
