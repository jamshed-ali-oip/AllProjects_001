import React, {useEffect, useState, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const TextFieldCard = ({
  placeholder,
  value,
  onchange,
  keyboardType,
  secureTextEntry,
  max,
  customStyle,
  placeholderTextColor,
}) => {
  return (
    <TextInput
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor || 'grey'}
      style={[styles.input, customStyle]}
      onChangeText={onchange}
      value={value}
      caretHidden={false}
      secureTextEntry={secureTextEntry}
      underlineColorAndroid="grey"
      maxLength={max}
    />
  );
};
export default TextFieldCard;
var styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 5,

    color: 'black',
    // width: wp('80%'),
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
