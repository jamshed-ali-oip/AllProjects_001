import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../../assets/Colors/Colors';
let { width, height } = Dimensions.get('window');
const AuthInput = props => {
  return (
    <View style={{ marginTop: height * 0.015 }}>
      <Text style={styles.lable}>{props.label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholderTextColor={Colors.placeholder}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};
const InfoInput = props => {
  return (
    <View style={{ marginTop: height * 0.015 }}>
      <TextInput
        style={styles.Info}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholderTextColor={Colors.text}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        maxLength={props.maxLength}
        editable={props.editable}
      />
      <Image style={styles.icon} source={props.source} />
    </View>
  );
};
const VerInput = props => {
  return (
    <View style={{ marginTop: height * 0.015 }}>
      <TextInput
        style={styles.Ver}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholderTextColor={Colors.text}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
      />
      {/* <Image
      style={styles.icon}
      source={props.source}
      /> */}
      <Text style={styles.verfitext}>Verified</Text>
    </View>
  );
};
export { AuthInput, InfoInput, VerInput };

const styles = StyleSheet.create({
  input: {
    height: height * 0.055,
    // margin: width*0.0325,
    // borderWidth: 1,
    borderBottomColor: Colors.placeholder,
    padding: width * 0.0135,
    borderBottomWidth: 1,
    alignSelf: 'center',
    width: width * 0.9,
    // backgroundColor:"red"
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  },
  lable: {
    color: Colors.placeholder,
    marginLeft: width * 0.048,
  },
  Info: {
    height: height * 0.07,
    // margin: width*0.0325,
    // borderWidth: 1,
    borderColor: Colors.placeholder,
    padding: width * 0.0135,
    borderWidth: 1,
    alignSelf: 'center',
    width: width * 0.85,
    // backgroundColor:"red"
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    borderRadius: width * 0.015,
    paddingLeft: width * 0.035,
  },
  icon: {
    resizeMode: 'contain',
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: width * 0.28,
    marginTop: height * 0.022,
    tintColor: '#ababac',
    // backgroundColor:"red"
  },
  Ver: {
    height: height * 0.07,
    // margin: width*0.0325,
    // borderWidth: 1,
    borderColor: Colors.placeholder,
    padding: width * 0.0135,
    borderWidth: 1,
    alignSelf: 'center',
    width: width * 0.85,
    // backgroundColor:"red"
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    borderRadius: width * 0.015,
    paddingLeft: width * 0.035,
  },
  verfitext: {
    color: Colors.succes,
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: width * 0.12,
    marginTop: height * 0.022,
    fontFamily: 'Poppins-Italic',
    // backgroundColor:"red"
    fontSize: width * 0.03,
  },
});
