import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Screen from '../components/ui/Screen';

const SignUpScreen = () => {
  return (
    <Screen style={styles.container}>
      <Text>Sign Up Screen</Text>
    </Screen>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
