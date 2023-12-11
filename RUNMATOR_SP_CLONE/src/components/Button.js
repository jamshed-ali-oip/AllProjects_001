import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import colors from '../assets/colors';
import IconComp from './IconComp';
import Loader from './Loader';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Button = ({
  title,
  onBtnPress,
  isBgColor = true,
  btnStyle,
  btnTextStyle,
  loader,
  disabled
}) => {

  if (loader) {
    return (
      <TouchableOpacity

        activeOpacity={0.8}
        style={[
          styles.btn,
          btnStyle,
          isBgColor ? styles.btnWithBgColor : styles.btnWithOutBgColor && btnStyle,
          { height: 60 }
        ]}
        disabled
      >
        <Loader color={'white'} />
      </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      style={[
        styles.btn,
        btnStyle,
        isBgColor ? styles.btnWithBgColor : styles.btnWithOutBgColor && btnStyle,
        { height: 60 }
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
    fontSize: width * 0.05,
    // fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
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
    backgroundColor: colors.themeBlue,
  },
  btnWithOutBgColor: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 1,
    borderColor: colors.themeBlue,
  },
});

export default Button;
