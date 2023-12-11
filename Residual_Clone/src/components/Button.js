import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { themePurple } from '../assets/colors/colors';

import IconComp from './IconComp';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Button = ({
  title,
  onBtnPress,
  isBgColor = true,
  btnStyle,
  btnTextStyle,
  selected
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        onBtnPress();
      }}>
      <LinearGradient
        colors={selected?['#74B5E8', '#9974F2', '#E43DEC']:['#fff','#fff']}
        style={[
          styles.btn,
          btnStyle,
          isBgColor
            ? styles.btnWithBgColor
            : styles.btnWithOutBgColor && btnStyle,
        ]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        locations={[0, 0.7, 0.9]}
      >
        <Text
          style={[
            styles.text,
            isBgColor
              ? { color: 'white' }
              : btnTextStyle
                ? btnTextStyle
                : { color: themePurple },
                {color:selected?'white':'black'}
            // color: isBgColor ? '#ffffff' : themePurple},
          ]}>
          {title}
        </Text>
        <IconComp
          iconName={'exclamationcircle'}
          // iconSize={}
          type={'AntDesign'}
        // passedStyle={}
        />
      </LinearGradient>
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
    backgroundColor: themePurple,
  },
  btnWithOutBgColor: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 1,
    borderColor: themePurple,
  },
});

export default Button;
