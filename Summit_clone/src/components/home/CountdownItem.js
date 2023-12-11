import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';

import colors from '../../constants/colors';

const CountdownItem = ({ number, text }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: RFPercentage(3),
          color: colors.primary,
        }}
      >
        {number}
      </Text>
      <Text>{text}</Text>
    </View>
  );
};

export default CountdownItem;

const styles = StyleSheet.create({
  container: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
