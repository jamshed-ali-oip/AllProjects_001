import React, {useEffect, useState,useRef} from 'react';
import {
    View, TextInput,StyleSheet
 } from 'react-native';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 const InAppTextFeild = ({placeholder, value, onchange, keyboardType, secureTextEntry, multi}) => {
    return(
       
  
                
                <TextInput
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    placeholderTextColor="#B01125"
                    style={styles.input}
                    onChangeText={onchange}
                    value={value}
                    caretHidden={true}
                    selectionColor="#B01125"
                    secureTextEntry={secureTextEntry}
                    multiline={multi}
                    // textAlign='center'
                    textAlignVertical='bottom'

                />
             
    
            
             
    )
 }
 export default InAppTextFeild;
 var styles = StyleSheet.create({
    input: {
        height: 40,
        padding:5,
        top:-5,
        borderWidth: 0,
        color: '#B01125',
        width: wp('80%'),
        justifyContent: 'center',
        borderColor: '#B01125',
        fontFamily: 'Poppins-Regular',
        fontWeight: '200',
        fontSize: hp('1.8%'),

        
        
        
      },
    textField: {
        width: wp('95%'),
        justifyContent: 'center',
        flexDirection: 'row',
        
        alignSelf:'center',
    },
})