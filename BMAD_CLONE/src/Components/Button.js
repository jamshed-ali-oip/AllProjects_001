import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import {themeRed} from '../Assets/Colors/Colors';
import IconComp from './IconComp';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Button = ({
  title,
  onBtnPress,
  isBgColor = true,
  btnStyle,
  btnTextStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.btn,
        btnStyle,
        isBgColor
          ? styles.btnWithBgColor
          : styles.btnWithOutBgColor && btnStyle,
      ]}
      onPress={() => {
        onBtnPress();
      }}>
      <Text
        style={[
          styles.text,
          isBgColor
            ? {color: 'white'}
            : btnTextStyle
            ? btnTextStyle
            : {color: themeRed},
          // color: isBgColor ? '#ffffff' : themeRed},
        ]}>
        {title}
      </Text>
      <IconComp
        iconName={'exclamationcircle'}
        // iconSize={}
        type={'AntDesign'}
        // passedStyle={}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: width * 0.05,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  btn: {
    width: width * 0.8,
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    paddingVertical: height * 0.018,
    margin: 15,
  },
  btnWithBgColor: {
    backgroundColor: themeRed,
  },
  btnWithOutBgColor: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 1,
    borderColor: themeRed,
  },
});

export default Button;
