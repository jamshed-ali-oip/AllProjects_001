import React from 'react';
import { StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import colors from '../../constants/colors';

const Dot = ({ size = 48, color = colors.gray, style, ...otherProps }) => {
  return (
    <Entypo
      name="dot-single"
      size={size}
      color={color}
      style={[styles.dot, style]}
      {...otherProps}
    />
  );
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    margin: -15,
  },
});
