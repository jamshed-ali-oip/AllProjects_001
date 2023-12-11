import React from 'react';
import { AntDesign } from '@expo/vector-icons';

import colors from '../../constants/colors';

const Arrow = ({
  name = 'right',
  size = 16,
  color = colors.darkGray,
  ...otherProps
}) => {
  return <AntDesign name={name} size={size} color={color} {...otherProps} />;
};

export default Arrow;
