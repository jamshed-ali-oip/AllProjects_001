import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from 'react-native-elements';

const NextButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>NEXT</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={colors.white}
        />
      </View>
    </TouchableOpacity>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
  },
});
