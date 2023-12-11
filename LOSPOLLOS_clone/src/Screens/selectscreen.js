import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Loginbtn, SignupBtn} from '../component/BTNS';
const {height, width} = Dimensions.get('window');

const Selectscreen = ({navigation}) => {
  return (
    <View style={style.container}>
      <View style={style.ctn1}>
        <Image style={style.logo} source={require('../images/logo.png')} />
        <Text style={style.title}>Spécialiste du Poulet Braisé</Text>
        <Text style={style.tag}>AGREE PAR AVS</Text>
      </View>
      <View style={style.ctn2}>
        <TouchableOpacity 
        onPress={()=>{navigation.navigate("Login")}}
        style={style.Loginbtn}>
          <Text style={style.btntxt}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={()=>{navigation.navigate("Signupscreen")}}
        style={style.Signin}>
          <Text style={style.btntxt}>Créer un nouveau compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Selectscreen;

const style = StyleSheet.create({
  logo: {
    height: height * 0.2,
    width: width * 0.35,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: width * 0.05,
    color: 'black',
    fontweight: '600',
    textAlign: 'center',
  },
  tag: {
    fontSize: width * 0.082,
    textAlign: 'center',
    color: 'black',
    fontWeight: '800',
    marginTop: -height * 0.012,
  },
  Signin: {
    height: height * 0.06,
    width: width * 0.8,
    backgroundColor: '#000',
    borderRadius: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:height*0.02
  },
  Loginbtn: {
    height: height * 0.06,
    width: width * 0.8,
    backgroundColor: '#E63835',
    borderRadius: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:height*0.02
  },
  btntxt:{
    color:"#ffffff",
    fontSize:width*0.038,
    fontWeight:"500"
},
ctn1:{
marginTop:height*0.2,
alignItems:"center",

},
ctn2:{
    alignContent:"center",
    justifyContent:"center",
    alignItems:"center",
    marginTop:height*0.2
}
});
