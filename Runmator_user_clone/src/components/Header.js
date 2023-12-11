// import { Icon } from 'native-base';
import React from 'react';
import {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import colors from '../assets/colors';
import IconComp from '../components/IconComp';
import Heading from './Heading';

const {width, height} = Dimensions.get('window');

const Header = ({showBack, title, iconName, navigation, passedStyle}) => {
  return (
    <View style={[styles.container, passedStyle]}>
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.rowView}>
            <IconComp
              iconName={iconName}
              type="MaterialIcons"
              passedStyle={styles.backIconStyle}
            />
            <Heading
              passedStyle={[styles.textStyle]}
              title="Back"
              fontType="bold"
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={styles.rowView}>
            <IconComp
              iconName={'menu'}
              type="MaterialIcons"
              passedStyle={styles.iconStyle}
            />
            <Heading passedStyle={styles.textStyle} title={title} fontType='bold'/>
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.rowView}></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // marginHorizontal: width * 0.05,
    backgroundColor: '#fff',
    // width:width
  },
  iconStyle: {
    color: colors.themeBlue,
    paddingRight: width * 0.02,
    fontSize: width * 0.1,
  },
  backIconStyle: {
    color: colors.themeBlue,
    paddingRight: width * 0.02,
    fontSize: width * 0.07,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.01,
    marginLeft: width * 0.04,
    height: height * 0.07,
    width: width,
  },
  textStyle: {
    color: colors.themeBlue,
    fontSize: width * 0.06,
  },
  titleStyle: {
    color: colors.themeBlue,
    fontSize: width * 0.045,
  },
  searchStyle: {
    color: 'rgba(0,0,0,0.1)',
    paddingRight: width * 0.02,
    fontSize: width * 0.03,
  },
});
