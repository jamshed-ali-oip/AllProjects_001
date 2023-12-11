import React, {useEffect, useState,useRef} from 'react';
import {
   StyleSheet, View, Image,TouchableOpacity
 } from 'react-native';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import Avatara from './../Components/Avatar'
 const UserProfileMarker = ({source}) => {
    return(
     
            <View style={{  backgroundColor:'#EA2C2E', borderWidth: 1, borderColor: '#EA2C2E', borderRadius: 50, padding:0,alignItems:'center' }}>
                <Avatara size="small" source={source} />
            </View>
     
    )
 }
 export default UserProfileMarker;
