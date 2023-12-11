import {StyleSheet, Text, View, Image,Dimensions,TouchableOpacity} from 'react-native';
import React from 'react';
const {height,width}=Dimensions.get('window');
const FrontScreen = ({navigation}) => {
  return (
    <View style={style.container}>
     <TouchableOpacity onPress={()=>{navigation.navigate("selectscreen")}}>
     <Image style={style.logo} source={require('../images/logo.png')} />
     </TouchableOpacity>
     
    </View>
  );
};

export default FrontScreen;

const style = StyleSheet.create({
  logo: {
    height: height*0.2,
    width: width*0.35,
    alignSelf:"center",
    
  },
  container:{
    justifyContent:"center",
    alignItems:"center",
    alignContent:"center",
    flex:1
  }
});
