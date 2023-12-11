import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// fonts type
const BOLD = 'Poppins-Bold';
const MEDIUM = 'Poppins-Medium';
const BLACK = 'Poppins-Black';
const ITALIC = 'Poppins-Italic';
const REGULAR = 'Poppins-Regular';
const BOLD_ITALIC = 'Poppins-BoldItalic';
const EXTRA_BOLD_ITALIC = 'Poppins-ExtraBoldItalic';
const SEMI_BOLD = 'Poppins-SemiBold';
const EXTRA_BOLD = 'Poppins-ExtraBold';

const Heading = ({title, passedStyle, fontType}) => {
  return (
    <Text
      style={[
        styles.text,
        passedStyle,
        {
          fontFamily:
            fontType === 'semi-bold'
              ? SEMI_BOLD
              : fontType === 'black'
              ? BLACK
              : fontType === 'medium'
              ? MEDIUM
              : fontType === 'italic'
              ? ITALIC
              : fontType === 'bold'
              ? BOLD
              : fontType === 'extra-bold'
              ? EXTRA_BOLD
              : fontType === 'bold-italic'
              ? BOLD_ITALIC
              : fontType === 'extra-bold-italic'
              ? EXTRA_BOLD_ITALIC
              : REGULAR,
        },
      ]}>
      {title}
    </Text>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: width * 0.11,
    color: 'black',
  },
});

export default Heading;
