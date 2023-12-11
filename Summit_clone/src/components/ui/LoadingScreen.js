import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';

import Screen from './Screen';

const LoadingScreen = () => {
  return (
    <Screen style={styles.container}>
      <ActivityIndicator size="large" />
    </Screen>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});
