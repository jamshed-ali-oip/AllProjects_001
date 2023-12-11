import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import RNCheckboxCard from 'react-native-checkbox-card';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const CustomRadio = ({value}) => {
  if (value == false) {
    return null;
  } else {
    return (
      <TouchableOpacity
        onPress={() => {
          // console.log(value)
        }}
        style={{
          backgroundColor: '#B01125',
          width: 30,
          height: 30,
          borderRadius: 50,
          borderColor: 'white',
          borderWidth: 1,
        }}>
        <Image
          resizeMode="contain"
          source={require('./../Assets/Images/Check.png')}
        />
      </TouchableOpacity>
    );
  }
};
export default CustomRadio;
