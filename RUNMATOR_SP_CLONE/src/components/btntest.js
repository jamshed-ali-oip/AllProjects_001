import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const Btntest = (props) => {
  const {kk,a} =props
  console.log(kk,"===========",a);
  return (
    <TouchableOpacity
    // onPress={props}
    >
      <Text>aaaa </Text>
    </TouchableOpacity>
  );
};

export default Btntest;
