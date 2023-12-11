import React from 'react';
import {Rating} from 'react-native-ratings';

import {Dimensions, TouchableOpacity, Text} from 'react-native';
import {useState} from 'react';

const {width, height} = Dimensions.get('window');

const RatingComp = ({rateValue, onPress}) => {
  return (
    <Rating
      type="star"
      onFinishRating={rating => onPress(rating)}
      fractions={true}
      startingValue={rateValue}
    />
  );
};

export default RatingComp;
