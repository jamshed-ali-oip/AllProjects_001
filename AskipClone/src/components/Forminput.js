import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
let {width, height} = Dimensions.get('window');

const Forminput = props => {
  return (
    <View
    style={styles.cont}
    >
    <Text
    style={styles.title}
    >{props.title}</Text>
    <View style={styles.box}>
    
    <TextInput
      style={styles.input}
      onChangeText={props.setvalue}
      value={props.value}
      placeholder={props.placeholder}
      keyboardType={props.type}
      placeholderTextColor="#9e9e9e"
      textContentType={props.contentype}
      secureTextEntry={props.security}
      maxLength={props.maxletter}
      // placeholderTextColor="#9e9e9e"
    />
  
  </View>
    </View>
  );
};

export default Forminput;

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    borderWidth:1,
    borderColor: '#606469',
    width:width*0.78,
    alignItems:"center",
    alignSelf:"center",
    borderRadius:width*0.01,
    height:height*0.065
    
  },
  input:{
    width:width*0.78,
    paddingLeft:width*0.04,
    color:"black"
  },
  title:{
    marginLeft:width*0.12,
    paddingBottom:height*0.01,
    color:"black",
    fontWeight:"600",
    // fontSize:width*0.035,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize:width *0.0415,
    // marginBottom:-height*0.01,
    
  },
  cont:{
    marginTop:height*0.005,
    // marginBottom:-height*0.01,
  }
});
