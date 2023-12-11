import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity,StyleSheet, Text,View
 } from 'react-native';
 import LinearGradient from 'react-native-linear-gradient'
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 const NotificationAction = ({ onPress, title }) => {
    return(
        <TouchableOpacity onPress={onPress} >
            <View style={{}}>
            <LinearGradient
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[ '#B01125','#E82E30']}
                style={styles.touchableOpacity}
                >
                <Text style={styles.touchableOpacityText}>{title}</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
    )
 }
 export default NotificationAction;
 var styles = StyleSheet.create({
    touchableOpacity:{
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 0,
        borderColor: 'white',
        // width: wp('40%'),
        height: hp('3.8%'),
        justifyContent: 'center',
        borderRadius: 5
    },
    touchableOpacityText: {
      color: 'white',
    //   fontFamily: '' 
     fontFamily: 'Poppins-SemiBold',
      fontSize: hp('1.7'),
      textAlign:'center'
      
    },
})