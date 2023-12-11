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
  RefreshControl,
  DeviceEventEmitter,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppText from '../../Components/AppText';
import NearMe from './../../../model/NearMe';
import NearMeList from './NearMeList.js';
import DeviceInfo from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import * as actions from '../../Store/Actions';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/native';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const NearMeScreen = ({
  navigation,
  nearMeUsers,
  usersNearmeReducer,
  coords,
  userReducer,
  userCoordsReducer,
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [tablet, onChangeTablet] = useState(false);
  const USER_ID = userReducer?.data?.user_id;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      nearMeUsers(
        userCoordsReducer.lat,
        userCoordsReducer.long,
        USER_ID,
      );
    });
  }, []);

  useEffect(() => {
    if (Platform.OS === ' android') {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          "<div style='background-color: #f5fcff; border-radius: 100px;'> <h3 style='font-color:#31a4de'>This App access to your Location</h3>This App wants to change your device settings:<br/><br/>Use GPS for Location<br/></div>",
        ok: 'YES',
        cancel: 'NO',
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
        preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
        providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
      })
        .then(
          function (success) {
            Geolocation.getCurrentPosition(
              position => {
                nearMeUsers(
                  position.coords.latitude,
                  position.coords.longitude,
                  userReducer.user_id,
                );
                coords(position.coords.latitude, position.coords.longitude);
              },
              error => console.log(error),
              {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
            );
          }.bind(this),
        )
        .catch(error => {
          console.log(error.message);
        });
      BackHandler.addEventListener('hardwareBackPress', () => {
        LocationServicesDialogBox.forceCloseDialog();
      });
      DeviceEventEmitter.addListener(
        'locationProviderStatusChange',
        function (status) {
          console.log(status);
        },
      );
    } else {
      Geolocation.getCurrentPosition(
        position => {
          nearMeUsers(
            position.coords.latitude,
            position.coords.longitude,
            userReducer?.data?.user_id,
          );
          coords(position.coords.latitude, position.coords.longitude);
          // console.log(position.longitude)
        },
        error => console.log(error),
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
      );
    }
    const isTablet = DeviceInfo.isTablet();
    onChangeTablet(isTablet);
    if (Platform.OS === ' android') {
      return () => {
        // Anything in here is fired on component unmount.
        LocationServicesDialogBox.stopListener();
      };
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* {console.log(usersNearmeReducer)} */}
      {usersNearmeReducer.length > 0 ? (
        <View style={styles.flatListOuterView}>
          {tablet ? (
            <FlatList
              key={'_'}
              contentContainerStyle={styles.contentContainerStyleForTablet}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              //   contentContainerStyle={{
              //     justifyContent: 'center',
              //     alignItems: 'center',
              //     alignContent: 'flex-start',
              //     alignSelf: 'flex-start',
              //   }}
              numColumns={8 / 2}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={null}
              ListHeaderComponentStyle={
                styles.listHeaderComponentStyleForTablet
              }
              ListHeaderComponent={
                <View style={styles.listHeadCompViewStyle}>
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-Regular"
                    size={hp('2%')}
                    color="black"
                    Label={'People Near You'}
                  />
                  <TouchableOpacity>
                    <AppText
                      nol={1}
                      textAlign="left"
                      family="Poppins-Regular"
                      size={hp('1.5%')}
                      color="black"
                      Label={'View More'}
                    />
                  </TouchableOpacity>
                </View>
              }
              ListFooterComponent={<View style={{height: 100}}></View>}
              data={usersNearmeReducer}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => (
                <NearMeList
                  Img={item?.user_image}
                  Name={item?.user_name}
                  Age={item?.user_age}
                  Profession={item?.user_title}
                  Status={item?.user_status}
                  City={item?.user_lives}
                  Interest={item?.user_interest}
                  Favorite={item?.user_favorite}
                  Distance={item?.distance}
                  Relation={item?.user_relation}
                  Address={item?.user_address}
                  GenderInterest={item?.user_gender_interest}
                  Email={item?.user_email}
                  Navigation={navigation}
                  Connect={item?.is_follow}
                  TotalLike={item?.like}
                  Like={item?.is_like}
                  Id={item?.user_id}
                  UserID={userReducer?.data?.user_id}
                />
              )}
            />
          ) : (
            <FlatList
              key={'#'}
              contentContainerStyle={styles.contentContainerStyleForPhone}
              numColumns={2}
              style={styles.flatListPhoneStyle}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={null}
              ListHeaderComponentStyle={
                styles.listHeaderComponentStyleForTablet
              }
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListHeaderComponent={
                <View style={styles.listHeadCompViewStylePhone}>
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-SemiBold"
                    size={hp('2%')}
                    color="black"
                    Label={'People Near You'}
                  />
                  <TouchableOpacity>
                    <AppText
                      nol={1}
                      textAlign="left"
                      family="Poppins-SemiBold"
                      size={hp('1.5%')}
                      color="black"
                      Label={'View More'}
                    />
                  </TouchableOpacity>
                </View>
              }
              ListFooterComponent={<View style={{height: 100}}></View>}
              data={usersNearmeReducer}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => (
                <NearMeList
                  Img={item?.user_image}
                  Name={item?.user_name}
                  Age={item?.user_age}
                  Profession={item?.user_title}
                  Status={item?.user_status}
                  City={item?.user_lives}
                  Interest={item?.user_interest}
                  Favorite={item?.user_favorite}
                  Distance={item?.distance}
                  Relation={item?.user_relation}
                  Address={item?.user_address}
                  GenderInterest={item?.user_gender_interest}
                  Email={item?.user_email}
                  Navigation={navigation}
                  Connect={item?.is_follow}
                  TotalLike={item?.like}
                  Like={item?.is_like}
                  Id={item?.user_id}
                  UserID={userReducer?.data.user_id}
                />
              )}
            />
          )}
        </View>
      ) : (
        <View style={styles.lottieContainerView}>
          <LottieView
            style={styles.lottieStyles}
            source={require('./../../Assets/Lottie/notfound.json')}
            autoPlay
            loop
          />
          <View style={{top: -120}}>
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-Regular"
              size={hp('2.5%')}
              color="black"
              Label={'No NearBy People'}
            />
          </View>
        </View>
      )}
    </View>
  );
};

function mapStateToProps({usersNearmeReducer, userReducer, userCoordsReducer}) {
  return {usersNearmeReducer, userReducer, userCoordsReducer};
}

export default connect(mapStateToProps, actions)(NearMeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: hp('103%'),
    backgroundColor: 'white',
  },
  flatListOuterView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    alignSelf: 'center',
  },
  contentContainerStyleForTablet: {
    justifyContent: 'center',
    flexDirection: 'column',
    width: wp('100%'),
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  listHeaderComponentStyleForTablet: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  listHeadCompViewStyle: {
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: wp('90%'),
  },
  listHeadCompViewStylePhone: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: wp('90%'),
  },
  contentContainerStyleForPhone: {
    alignContent: 'space-between',
    width: '90%',
  },
  flatListPhoneStyle: {
    position: 'relative',
    width: '100%',
    flexWrap: 'wrap',
  },
  lottieContainerView: {
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    flexDirection: 'column',
    alignContent: 'space-around',
  },
  lottieStyles: {
    width: '80%',
    height: '80%',
    alignItems: 'center',
  },
});
