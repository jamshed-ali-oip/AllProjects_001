import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
import AppText from '../../Components/AppText';
 import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

 const Items = ({image, name, price}) => {
    return(
        <View style={{
            flexDirection:'column',
            backgroundColor:'white',
            borderRadius: 6,
            height: hp('25%'),
            width: wp('31%'),
            margin: 10,
            zIndex: 10, 
            
            borderColor:'white',
            borderWidth: 1,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 0.84,

            elevation: 8,
            }}>
                <View style={{
                     justifyContent:'center',
                     alignContent: 'center',
                     alignItems:'center',
                }}>
                    <Image style={{
                        borderRadius: 6,
                        height: hp('16%'),
                        width:'100%'
                        }} 
                        resizeMode='stretch'
                        source={image}/>
                </View>
                     <View style={{justifyContent:'flex-start', flexDirection:'column', padding: 10, backgroundColor:'white',  alignItems:'flex-start',}}>
                        <AppText  nol={1}  textAlign="left"  family="Poppins-SemiBold" size={hp("1.6%")} color="black" Label={name} />
                        <AppText  nol={1}  textAlign="left"  family="Poppins-Bold" size={hp("2%")} color="#EA2C2E" Label={price} />
                    </View> 
        </View>
    )
 }
 export default Items;