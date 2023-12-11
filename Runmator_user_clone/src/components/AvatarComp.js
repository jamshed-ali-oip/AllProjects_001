import * as React from 'react';
import {Avatar} from 'react-native-paper';
import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');

const AvatarComp = () => (
  <Avatar.Image
  size={height*0.26}
    source={require('../assets/placeholder-300x202.jpg')}
  />
);
export default AvatarComp;
