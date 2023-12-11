import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const IconComp = ({iconName, iconSize, type, passedStyle}) => {
  switch (type) {
    case 'MaterialIcons':
      return (
        <MaterialIcons
          name={iconName}
          size={iconSize || 20}
          color={'#0756A3'}
          style={passedStyle}
        />
      );
    case 'Entypo':
      return (
        <Entypo
          name={iconName}
          size={iconSize || 20}
          color={'#0756A3'}
          style={passedStyle}
        />
      );

    case 'Ionicons':
      return (
        <Ionicons
          name={iconName}
          size={iconSize || 20}
          color={'#0756A3'}
          style={passedStyle}
        />
      );

    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIcons
          name={iconName}
          size={iconSize || 20}
          color={'#0756A3'}
          style={passedStyle}
        />
      );

    case 'Feather':
      return (
        <Feather
          name={iconName}
          size={iconSize || 20}
          color={'#0756A3'}
          style={passedStyle}
        />
      );

    case 'FontAwesome5':
      // console.log(
      //   {iconName, iconSize, type, passedStyle},
      //   '5-------------------------------',
      // );
      return (
        <FontAwesome5
          name={iconName}
          size={iconSize || 20}
          color={'#0756A3'}
          style={passedStyle}
        />
      );

    case 'FontAwesome':
      return (
        <FontAwesome
          name={iconName}
          size={iconSize || 20}
          color={'#0756A3'}
          style={passedStyle}
        />
      );

    case 'Fontisto':
      return (
        <Fontisto
          name={iconName}
          size={iconSize || 20}
          color={'#0756A3'}
          style={passedStyle}
        />
      );

    default:
      return null;
      break;
  }
};

const styles = StyleSheet.create({});
export default IconComp;
