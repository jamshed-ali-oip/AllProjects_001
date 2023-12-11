import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Badge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
const MessageIcon1 = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('message')}
      style={{right: 17}}>
      <View
        style={{
        //   backgroundColor: 'white',
          borderWidth: 1,
          borderRadius: 50,
          borderColor: '#B01125',
          padding: 8,
          zIndex: 99999,
        //   elevation: 4,
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        //   borderColor: '#B01125',
        }}>
        {/* <Badge status='#B01125'   textStyle={{color:'#B01125'}}  value={1} containerStyle={{  position: 'absolute', top: -11, right: -4, borderWidth:1, borderColor: '#B01125', borderRadius:50, backgroundColor:'white'}} />
                <Icon name="md-paper-plane-outline" style={{top:1}} size={20} color="#B01125" /> */}
      </View>
    </TouchableOpacity>
  );
};
export default MessageIcon1;
