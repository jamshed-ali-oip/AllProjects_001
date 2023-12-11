import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {imageUrl} from '../../Config/Apis.json';
import Avatar from '../../Components/Avatar';
import AppText from '../../Components/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import CarouselCardItem, {SLIDER_WIDTH, ITEM_WIDTH} from './CarouselCardItems';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useRoute} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Comment = ({img, item,name, time, message}) => {
  const route = useRoute();
  const routeName = route?.name;
 
  return (
    <View
      style={[
        routeName == 'post' && {marginRight: width * 0.03},
        {
          flexDirection: 'row',
          width: width * 0.9,
          marginVertical: height * 0.01,
          // padding: 5,
          borderRadius: 5,
          paddingHorizontal: 5,
          backgroundColor: 'rgba(1,1,1,0.05)',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingVertical: 4,
          alignSelf: 'center',
          alignItems: 'center',
        },
      ]}>
      <View
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'column',
          // paddingHorizontal: 10,
        }}>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            // width: width * 0.8,
          }}>
          <Avatar
            size="small"
            source={
              img !== undefined && img !== null
                ? {
                    uri: `${imageUrl}/${img}`,
                  }
                : require('../../Assets/Images/maroon-dp2.jpeg')
            }
          />
          <View
            style={{
              flexDirection: 'row',
              padding: 4,
              justifyContent: 'space-between',
              alignContent: 'center',
              // left: -3,
              width: width * 0.75,
            }}>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'column',
                padding: 3,
              }}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-SemiBold"
                size={hp('1.9%')}
                color="black"
                Label={name}
              />
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'column',
                padding: 3,
              }}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-SemiBold"
                size={hp('1.5%')}
                color="grey"
                Label={time}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '90%',
          }}>
          <AppText
            nol={12}
            textAlign="left"
            family="Poppins-Regular"
            size={hp('1.9%')}
            color="black"
            Label={message}
          />
        </View>
      </View>
    </View>
  );
};
export default Comment;

const styles = StyleSheet.create({});
