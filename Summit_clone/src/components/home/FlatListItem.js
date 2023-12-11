import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../constants/colors';

const FlatListItem = ({ title }) => {
  const { item } = title;

  return (
    <View style={styles.container}>
      <Text>{item.title}</Text>
    </View>
  );
};

export default FlatListItem;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '60%',
    margin: '5%',
    backgroundColor: colors.primary,
  },
});
