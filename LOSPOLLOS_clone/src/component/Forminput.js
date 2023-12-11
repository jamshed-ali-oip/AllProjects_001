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
    />
    <TouchableOpacity>
      <Image source={require('../images/editbutton.png')} />
    </TouchableOpacity>
  </View>
    </View>
  );
};

export default Forminput;

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    borderWidth:1,
    borderColor: '#a9a9a9',
    width:width*0.78,
    alignItems:"center",
    alignSelf:"center",
    borderRadius:width*0.03,
    
  },
  input:{
    width:width*0.65,
    paddingLeft:width*0.04
  },
  title:{
    marginLeft:width*0.15,
    paddingBottom:height*0.01,
    color:"black",
    fontWeight:"600",
    fontSize:width*0.039,
    marginBottom:-height*0.01,
  },
  cont:{
    marginTop:height*0.005,
    // marginBottom:-height*0.01,
  }
});
