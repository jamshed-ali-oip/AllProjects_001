import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const UserLocationMarker = () => {
  return (
    <View
      style={{
        backgroundColor: '#EA2C2E',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 50,
        padding: 3,
        alignItems: 'center',
        width: 35,
        height: 35,
      }}>
      <Icon
        name="location-arrow"
        style={{padding: 2}}
        size={20}
        color="white"
      />
    </View>
  );
};
export default UserLocationMarker;
