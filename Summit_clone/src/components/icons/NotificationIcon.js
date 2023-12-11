import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import colors from '../../constants/colors';

const NotificationIcon = ({
  name = 'bell-ring-outline',
  size = 24,
  color = 'black',
}) => {
  return (
    <View
      style={[
        styles.container,
        { borderRadius: size, width: size * 2, height: size * 2 },
      ]}
    >
      <MaterialCommunityIcons name={name} size={size} color={color} />
    </View>
  );
};

export default NotificationIcon;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
