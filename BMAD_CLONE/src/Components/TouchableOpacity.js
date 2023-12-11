import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity,StyleSheet, Text
 } from 'react-native';
 import LinearGradient from 'react-native-linear-gradient'
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 const TouchableOpacityBtn = ({ onPress, title }) => {
    return(
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <LinearGradient
            start={{ x: -1, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[ '#B01125','#CC4E50']}
            style={styles.touchableOpacity}
            >
             <Text style={styles.touchableOpacityText}>{title}</Text>
          </LinearGradient>
        </TouchableOpacity>
    )
 }
 export default TouchableOpacityBtn;
 var styles = StyleSheet.create({
    touchableOpacity:{
        
        borderWidth: 0,
        borderColor: 'white',
        width: wp('60%'),
        height: hp('6%'),
        justifyContent: 'center',
        borderRadius: 25
    },
    touchableOpacityText: {
      color: 'white',
    //   fontFamily: '' 
     fontFamily: 'Poppins-Regular',
      fontSize: hp('2'),
      textAlign:'center'
    },
})