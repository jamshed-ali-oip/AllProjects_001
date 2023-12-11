import React, {useEffect, useState, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const TextInputFeild = ({
  placeholder,
  value,
  onchange,
  keyboardType,
  secureTextEntry,
}) => {
  return (
    <TextInput
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor="white"
      style={styles.input}
      onChangeText={text => {
        onchange(text.toLowerCase());
      }}
      maxLength={35}
      value={value}
      caretHidden={false}
      selectionColor="white"
      secureTextEntry={secureTextEntry}
      // textAlign='center'
      textAlignVertical="bottom"
    />
  );
};
export default TextInputFeild;
var styles = StyleSheet.create({
  input: {
    height: 40,
    padding: 5,
    // top:-5,
    left: 10,
    borderWidth: 0,
    color: 'white',
    width: wp('80%'),
    justifyContent: 'center',
    borderColor: 'white',
    fontFamily: 'Poppins-Regular',
    fontWeight: '200',
    fontSize: hp('1.8%'),
  },
  textField: {
    width: wp('95%'),
    justifyContent: 'center',
    flexDirection: 'row',

    alignSelf: 'center',
  },
});
