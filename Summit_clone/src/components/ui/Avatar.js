import React from 'react';
import { Avatar as RNEAvatar } from 'react-native-elements';

const Avatar = ({ src, size = 'medium', ...otherProps }) => {
  return <RNEAvatar rounded source={src} size={size} {...otherProps} />;
};

export default Avatar;
