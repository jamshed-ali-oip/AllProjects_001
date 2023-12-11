import {Dimensions, Image, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React,{useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import { UserDetail } from '../../redux/actions/user.action';
import { delay } from '@reduxjs/toolkit/dist/utils';
const {width, height} = Dimensions.get('window');

const CPage7 = ({setPage}) => {
  const [detail, setDetail] = useState()
  const userId = useSelector((state) => state?.auth?.credential?.User?._id)
  useEffect(() => {

    UserInfo()

  }, [])
  const UserInfo = async () => {
    const {data}  = await UserDetail(userId)
    setDetail(data?.User)

  }
  return (
    <View style={styles.mainView}>
      <Text style={styles.heading}>télécharger mes données</Text>

      <Text style={styles.description}>
        Nous t’enverrons par e-mail un lien vers un fichier comportant tes
        photos, commentaires, informations de profil et plus encore. La collecte
        et l’envoi de ces données peuvent prendre jusqu’à 14 jours.
      </Text>

      <Text style={styles.confirmation}>Envoyer à l’adresse mail suivante :</Text>

      <View style={styles.view}>
        <Text style={styles.email}>{detail?.email}</Text>
        <Image
        style={styles.image}
          source={require('../../assets/images/verified.png')}
        /> 
      </View>
      <TouchableOpacity
        onPress={() =>setPage(8)}
        style={styles.Connnection}>
        <Text style={styles.C_btntext}>Suivant</Text>
      </TouchableOpacity> 
    </View>
  );
};
 
export default CPage7;

const styles = StyleSheet.create({
  image: {
    width:width*0.1,
    height:height*0.024,
    resizeMode:'contain',
    marginTop:height*0.015,
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
  confirmation: 
  {
    fontSize:width*0.045,
    color:'#000000', 
    // fontWeight:'500', 
    marginTop:height*0.025, 
    fontFamily:'Bebas Neue Pro Regular',
    // fontSize: width * 0.045,
    
  }, 
  email: 
  {
    fontSize:width*0.042,
    color: '#000000', 
    marginTop:height*0.018, 
    textAlign:'center', 
    fontFamily:'Bebas Neue Pro Regular',
    // fontSize: width * 0.045,


  }, mainView: 
  {
    alignItems:'center', 
    marginBottom:height*0.12, 
  }, 
  view:
  {
    flexDirection:'row', 
    alignItems:'center',
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
