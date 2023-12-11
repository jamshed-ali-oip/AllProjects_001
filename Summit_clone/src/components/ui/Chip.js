import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../constants/colors';

const Chip = ({ title, color = 'red' }) => {
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.text}>
        {title}
      </Text>
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 20,
  },
  text: {
    color: colors.white,
    textTransform:"capitalize"
  },
});
