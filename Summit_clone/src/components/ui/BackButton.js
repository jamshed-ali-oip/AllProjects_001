import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from 'react-native-elements';

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={24}
          color={colors.white}
        />
        <Text style={styles.text}>Back</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
  },
});
