import React from 'react';
import { StyleSheet, SafeAreaView, View, Platform, Dimensions } from 'react-native';

import colors from '../../constants/colors';

const { width, height } = Dimensions.get("window");
const CustomHeader = ({ children }) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.headerInnerContainer}>{children}</View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'android' ? '0%' : null,
  },
  headerInnerContainer: {
    paddingHorizontal: width * 0.03,
    paddingBottom: Platform.OS === 'android' ? '0%' : null,
    backgroundColor: 'white',
  },
});
