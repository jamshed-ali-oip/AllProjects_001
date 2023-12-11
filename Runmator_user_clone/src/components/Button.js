import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import colors from '../assets/colors';
import IconComp from './IconComp';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Button = ({
  title,
  onBtnPress,
  isBgColor = true,
  btnStyle,
  btnTextStyle,
  disable
}) => {
  return (
    <TouchableOpacity
      disabled={disable}
      style={[
        styles.btn,
        isBgColor ? styles.btnWithBgColor : styles.btnWithOutBgColor && btnStyle,
        btnStyle,

      ]}
      onPress={() => {
        onBtnPress();
      }}>
      <Text
        style={[
          styles.text,
          isBgColor
            ? { color: 'white' }
            : btnTextStyle
              ? btnTextStyle
              : { color: colors.themeBlue },
          // color: isBgColor ? '#ffffff' : colors.themeBlue},
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
    fontSize: width * 0.035,
    // fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  btn: {
    width: width * 0.8,
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    // paddingVertical: height * 0.018,
    margin: 5,
    height: height * 0.07
  },
  btnWithBgColor: {
    backgroundColor: colors.themeBlue,
  },
  btnWithOutBgColor: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 1,
    borderColor: colors.themeBlue,
  },
});

export default Button;
