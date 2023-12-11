import React, {useEffect, useState,useRef} from 'react';
import {
    View,Text
 } from 'react-native';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 const TextSample = ({Label}) => {
    return(   
        <View style={{flexDirection: 'row', justifyContent:"center", margin: 20}}>
               <Text  style={{color: 'white', fontFamily: 'Poppins-Regular',fontSize: hp('2%'), textAlign:'center'}}>
                   {Label}
                </Text>
        </View>     
    )
 }
 export default TextSample;
