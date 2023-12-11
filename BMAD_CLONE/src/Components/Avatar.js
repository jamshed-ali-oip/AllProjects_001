import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';

 import { Avatar } from 'react-native-elements';

 const Avatara= ({source, size}) => {
    return(
        <Avatar
            rounded
            size={size}
            source={source}
        />
    )
 }

 
 export default Avatara;