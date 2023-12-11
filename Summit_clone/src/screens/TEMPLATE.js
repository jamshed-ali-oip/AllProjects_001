import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Screen from '../components/ui/Screen';
import colors from '../constants/colors';

const TEMPLATE = () => {
  return (
    <Screen
      style={styles.innerContainer}
      containerStyle={styles.outerContainer}
    >
      {/* Screen component has a SafeAreaView which avoids the IOS camera */}

      {/* Add KeyboardAvoidingView if there are input components on the screen so it
      will adjust when keyboard is present */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.contentsContainer}
      >
        {/* CONTENTS GOES HERE */}
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default TEMPLATE;

const styles = StyleSheet.create({
  // containers
  contentsContainer: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: colors.primary,
    paddingHorizontal: '5%', // padding 5% is fixed on all screens
  },
  outerContainer: {
    backgroundColor: color.primary,
  },

  // Text Sizes
  textNormal: {
    fontSize: RFPercentage(2),
  },
  textHeader: {
    fontSize: RFPercentage(5),
  },
});
