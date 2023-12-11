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
  ScrollView, Dimensions
} from 'react-native';
import {Badge} from 'react-native-elements';
import {imageUrl} from '../../Config/Apis.json';
import AppText from '../../Components/AppText';
import Avatar from './../../Components/Avatar';
import NotificationAction from '../../Components/NotificationAction';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');

export const NotificationList = ({
  Item,
  Img,
  Name,
  Message,
  Navigation,
  Time,
  OnlineStatus,
  Assets,
  type,
  Action,
}) => {
//  console.log(Img)
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => Navigation.navigate('post', {notificationData: Item})}
      style={Styles.container}>
      <View style={Styles.dateContainer}>
        <AppText
          nol={1}
          textAlign="left"
          family="Poppins-SemiBold"
          size={hp('1.5%')}
          color="#757575"
          Label={moment(Time).fromNow()}
        />
      </View>
      <View style={Styles.contentOuterView}>
        <View style={Styles.contentInnerView}>
          <View style={Styles.imageView}>
            <Avatar
              size="medium"
              source={
                Img !== undefined && Img !== null
                  ? {uri: `${imageUrl}/${Img}`}
                  : require('../../Assets/Images/maroon-dp2.jpeg')
              }
            />
            {/* <Badge
              badgeStyle={{
                height: 15,
                width: 15,
                borderRadius: 50,
                borderColor: 'white',
                borderWidth: 1,
                position: 'absolute',
              }}
              status={OnlineStatus ? 'success' : 'warning'}
              containerStyle={{position: 'absolute', top: -7, right: 12}}
            /> */}
          </View>
          <View style={Styles.textAndImagesView}>
            <View style={{flexDirection: 'column'}}>
              <AppText
                nol={2}
                textAlign="left"
                family="Poppins-SemiBold"
                size={hp('1.7%')}
                color="#757575"
                Label={`${Name} ${
                  type === 'like' ? 'Liked' : 'Commented On'
                } your post.`}
              />
              <View style={Styles.postImagesView}>
                {Assets == null ? (
                  <NotificationAction
                    onPress={() => alert('ok')}
                    title={Action}
                  />
                ) : (
                  <FlatList
                    contentContainerStyle={{alignSelf: 'flex-start'}}
                    showsHorizontalScrollIndicator={false}
                    data={Assets}
                    horizontal
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => {
                      return (
                        <Image
                          source={{uri: `${imageUrl}/${item}`}}
                          style={{
                            height: 30,
                            width: 35,
                            borderRadius: 4,
                            margin: 3,
                          }}
                        />
                      );
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 150,
    width: 150,
  },
  container: {
    width: width * 0.95,
    marginLeft:width * 0.05,
    alignSelf: 'center',
    // margin: 40,
    // marginVertical:10,
    // top: -40,
    flexDirection: 'column',
    // alignContent: 'space-around',
    alignItems: 'flex-start',
  },
  dateContainer: {
    top: -20,
    width: '90%',
    position: 'absolute',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  contentOuterView: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    width: '90%',
    // alignContent: 'center',
    alignSelf: 'center',
  },
  contentInnerView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  imageView: {
    position: 'absolute',
    elevation: 10,
    zIndex: 9999,
    top: 25,
    left: -25,
  },
  textAndImagesView: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
    zIndex: 4,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1.5,
    },
    shadowOpacity: 3.22,
    backgroundColor: 'white',
    padding: 20,
    // position: 'absolute',
    width: '100%',
    paddingLeft: 30,
  },
  postImagesView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    top: 5,
    alignContent: 'flex-start',
  },
});
export default NotificationList;

//  <View style={{ zIndex: 10,
//     elevation: 4,}}>
// <Avatar
//                 size='medium'
//                 source={Img}
//                 />
// <Badge
// badgeStyle={{height:15,width: 15, borderRadius:50, borderColor: 'white', borderWidth: 1, position: 'absolute'}}
// status={OnlineStatus ? 'success': 'warning'}
// containerStyle={{ position: 'absolute', top: -7, right: 12 }}
// />
// </View>
{
  /* <View style={{bottom:0}}>
          <AppText  nol={1}  textAlign='left'  family="Poppins-SemiBold" size={hp("1.5%")} color="#757575" Label={Time} />
        </View> */
}
