import React from 'react';
import {Text, View, Image, TouchableOpacity,Dimensions,Linking} from 'react-native';
import style from './card_style';
const {height, width} = Dimensions.get('window');

const PromotionCard = props => {
  return (
    <TouchableOpacity style={style.promotion_card} onPress={() => {
        Linking.canOpenURL(props?.link).then(supported => {
            if (supported) {
              Linking.openURL(props?.link);
            } else {
              console.log("Don't know how to open URI: " + props?.link);
            }
          });
    }}>
      <Image source={props.img} resizeMode='contain' style={{width:width*0.9}} />
    </TouchableOpacity>
  );
};

export default PromotionCard;
