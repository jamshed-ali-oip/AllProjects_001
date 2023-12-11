import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Badge} from 'react-native-elements';
import AppText from '../../Components/AppText';
import moment from 'moment';
import {imageUrl} from '../../Config/Apis.json';
import Avatar from './../../Components/Avatar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');

export const MessageList = ({
  item,
  Image,
  Name,
  Message,
  Navigation,
  Time,
  onPress,
  OnlineStatus,
}) => {
  const isIos = Platform.OS === 'ios';
  return (
    <TouchableOpacity
      style={Styles.messageContainer}
      onPress={() =>
        // Navigation.navigate('chats', {item: item})
        onPress(item)
      }>
      <View style={Styles.insideContainer}>
        <View style={Styles.leftView}>
          <View style={Styles.imageView}>
            <Avatar
              size={"large"}
              source={
                Image !== undefined && Image !== null && Image !== ''
                  ? {uri: `${imageUrl}/${Image}`}
                  : require('../../Assets/Images/maroon-dp2.jpeg')
              }
            />
            {/* <Badge 
                    badgeStyle={{height:15,width: 15, borderRadius:50, borderColor: 'white', borderWidth: 1, position: 'absolute'}}
                    status={OnlineStatus ? 'success': 'warning'}
                    containerStyle={{ position: 'absolute', top: 0, right: 12 }}
                    /> */}
          </View>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'column',
              left: 15,
            }}>
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-Bold"
              size={isIos ? width * 0.04 : width * 0.04}
              color="#757575"
              Label={Name === 'Sbdhdh' ? 'Daniyal Ahmed Khan' : Name}
            />
            <View style={{width: wp('60%')}}>
              <AppText
                nol={2}
                textAlign="left"
                family="Poppins-SemiBold"
                size={isIos ? width * 0.035 : width * 0.035}
                color="#757575"
                Label={item?.messageId?.message}
              />
            </View>
          </View>
        </View>

        <View style={{alignSelf: 'flex-start', marginLeft : isIos ? 0 : -width * 0.04}}>
          <AppText
            nol={1}
            textAlign="left"
            family="Poppins-Regular"
            size={isIos ? width * 0.028 : width * 0.028}
            color="#757575"
            Label={moment(item?.messageId?.createdAt).format('hh:mm A')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  messageContainer: {
    // height: hp('10%'),
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: width * 0.025,
    borderRadius: 7,
    marginVertical: height * 0.005,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.025,
    alignItems: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  insideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageView: {
    padding: 0,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  leftView: {flexDirection: 'row', alignContent: 'flex-start'},
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 150,
    width: 150,
  },
});
export default MessageList;
