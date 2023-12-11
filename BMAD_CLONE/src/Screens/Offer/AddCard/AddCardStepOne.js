import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import AppText from '../../../Components/AppText';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SplashScreen from  "react-native-splash-screen";
import TouchableOpacityBtn from '../../../Components/TouchableOpacity';
const AddCardStepOne = ({navigation}) => {

  useEffect(() => {
    SplashScreen.hide();
   },[]);

    return(
            <View style={styles.container} >
              <StatusBar translucent backgroundColor="transparent" />
              <View style={{justifyContent:'center', width:'70%', flexDirection:'column',  alignItems:'center'}}>
              <AppText  nol={1}  textAlign="left"  family="Poppins-SemiBold" size={hp("4%")} color="black" Label={"No Credit Card"} />
              <AppText  nol={3}  textAlign="center"  family="Poppins-Regular" size={hp("2%")} color="black" Label={"You don't have any credit cards associated with your accounts"} />
              </View>
              <View style={{justifyContent:'center', alignItems:'center',position: 'absolute', bottom: 0, marginBottom: 20}}>
              <TouchableOpacityBtn  
                                onPress={()=> navigation.navigate('stepTwo')}
                                title="Add Card"
                    />
                </View>
            </View>
    )
}

export default AddCardStepOne



var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      height: '100%',
      backgroundColor: 'white',
      alignItems:'center'
    },

  })