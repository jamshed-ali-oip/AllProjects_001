import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
const {height, width} = Dimensions.get('window');

const SubscriptionReqsMapper = ({
  item,
  index,
  navigation,
  setSubscriptionRequests,
  subscriptionRequests,
}) => {
  return (
    <TouchableOpacity
      key={index}
      style={{alignSelf: 'center'}}
      onPress={() => {
        navigation.navigate('ViewSubscriptionDetails', {
          item: item,
          index: index,
          setSubscriptionRequests: setSubscriptionRequests,subscriptionRequests:subscriptionRequests
        });
      }}
      activeOpacity={0.8}>
      {
        <LinearGradient
          colors={['#7124BC', '#437AD8', '#05F0FF']}
          style={style.gradient_btn}
          start={{y: 0.0, x: 0.001}}
          angleCenter={{x: 5, y: 0}}
          end={{y: 0.0, x: 1.1}}>
          <View style={style.titles_view}>
            <Text style={style.main_title}>
              {item?.name ? item?.name : 'No Name'}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Feather
                name="package"
                size={width * 0.05}
                color="#fff"
                style={style.list_icon}
              />
              <Text style={style.sub_title}>
                {/* {moment(item?.created_at).format('MMMM-DD-yyy')} */}
                {` Product: ${item?.type}`}
              </Text>
            </View>

            {/* <Text
              style={[
                style.main_title,
                {alignSelf: 'flex-end', position: 'absolute', marginTop: 15},
              ]}>{`$322`}</Text> */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="time"
                size={width * 0.05}
                color="#fff"
                style={style.list_icon}
              />
              <Text style={style.sub_title}>
                {` Requested On: ${moment(item?.created_at).format(
                  'MMMM-DD-yyy',
                )}`}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="email"
                size={width * 0.05}
                color="#fff"
                style={style.list_icon}
              />
              <Text style={style.sub_title}>{` ${item?.email}`}</Text>
            </View>
          </View>
          <Image
            style={{
              height: height * 0.07,
              width: width * 0.13,
              borderRadius: width * 0.03,
            }}
            source={
              item?.image ? {uri: item?.image} : require('../../test.png')
            }
          />
        </LinearGradient>
      }
    </TouchableOpacity>
  );
};
export default SubscriptionReqsMapper;

const style = StyleSheet.create({
  gradient_btn: {
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.05,
    borderRadius: 25,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.045,
  },
  titles_view: {
    flex: 1,
  },
  main_title: {
    fontSize: width * 0.04,
    textTransform: 'uppercase',
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  sub_title: {
    fontSize: width * 0.035,
    color: '#fff',
    marginTop: width * 0.001,
    fontFamily: 'Poppins-Bold',
  },
});
