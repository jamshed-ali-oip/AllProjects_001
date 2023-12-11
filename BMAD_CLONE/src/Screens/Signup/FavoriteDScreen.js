import React, { useEffect, useState, useRef } from 'react';
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
  Dimensions,
  Animated,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FavouriteList from './../../Components/FavouriteList';
import * as actions from '../../Store/Actions';
import { connect } from 'react-redux';
import { showMessage, hideMessage } from 'react-native-flash-message';
import Geolocation from '@react-native-community/geolocation';
import LottieView from 'lottie-react-native';
import { themeRed } from '../../Assets/Colors/Colors';
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Data = [
  {
    Name: 'Old Fashioned',
    Image: require('./../../Assets/Images/1.png'),
    Value: false,
    Id: 1,
  },
  {
    Name: 'Margarita',
    Image: require('./../../Assets/Images/2.png'),
    Value: false,
    Id: 2,
  },
  {
    Name: 'Dark & Stormy',
    Image: require('./../../Assets/Images/3.png'),
    Value: false,
    Id: 3,
  },
  {
    Name: 'Mimosa',
    Image: require('./../../Assets/Images/4.png'),
    Value: false,
    Id: 4,
  },
  {
    Name: 'Manhattan',
    Image: require('./../../Assets/Images/5.png'),
    Value: false,
    Id: 5,
  },
  {
    Name: 'Whiskey Sour',
    Image: require('./../../Assets/Images/6.png'),
    Value: false,
    Id: 6,
  },
  {
    Name: 'Cosmopolitan',
    Image: require('./../../Assets/Images/7.png'),
    Value: false,
    Id: 7,
  },
  {
    Name: 'Martini',
    Image: require('./../../Assets/Images/8.png'),
    Value: false,
    Id: 8,
  },
];
const FavoriteDScreen = ({
  navigation,
  Favourite,
  userSignup,
  userFavourite,
  userInterest,
  userCoordsReducer,
  SignupAll,
  coords,
}) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const _onPressDone = async () => {
    if (userFavourite?.length === 0 || userFavourite == undefined) {


      showMessage({
        message: 'Please Select Atleast One Drink.',
        // description: 'Please Select Atleast One Drink.',
        type: 'danger',
      });
      return;
    }
    setIsLoading(true);
    console.log("usersignupppp", userSignup)
    await SignupAll(userSignup, userFavourite, userInterest, _onSignUpFailed);
    console.log("+++++++++++++++++++++0-0-9-0", userSignup);
  };

  const _onSignUpFailed = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (
      userSignup?.user_latitude == null ||
      userSignup?.user_latitude === undefined
    ) {
      getOneTimeLocation();
    }
  }, [userSignup?.user_latitude]);

  const getOneTimeLocation = () => {
    // console.log('one time==================');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        // setLocationStatus('You are Here');
        // console.log("----------------- get one time")
        coords(position.coords.latitude, position.coords.longitude);

        console.log('getting one time location coords...');
      },
      error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ alignItems: 'center', height: hp(100) }}>
        <FlatList
          contentContainerStyle={{
            justifyContent: 'center',
            flexDirection: 'column',
            width: wp('100%'),
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            backgroundColor: 'white',
          }}
          // contentContainerStyle={{alignSelf: 'flex-start'}}
          numColumns={4 / 2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={null}
          ListHeaderComponent={<View style={{ height: 40 }}></View>}
          ListFooterComponent={<View style={{ height: 120 }}></View>}
          data={Data}
          keyExtractor={(item, index) => index}
          extraData={items}
          renderItem={({ item, index }) => (
            <FavouriteList
              Name={item.Name}
              Images={item.Image}
              Value={item.Value}
              Id={item.Id}
              Favourite={Favourite}
            />
          )}
        />
        {
          <View style={styles.viewOfBtn}>
            {!isLoading ? (
              <TouchableOpacity onPress={_onPressDone} style={styles.donebtn}>
                <Text style={{ color: 'white', fontSize: width * 0.05 }}>
                  Done
                </Text>
              </TouchableOpacity>
            ) : (
              <LottieView
                style={{
                  width: width * 0.2,
                  height: height * 0.1,
                }}
                source={require('../../Assets/Lottie/red-loader.json')}
                autoPlay
                loop
              />
            )}
          </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: hp('110%'),
    backgroundColor: 'white',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  viewOfBtn: {
    width: width,
    height: height * 0.12,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    bottom: width * 0.07,
  },
  donebtn: {
    marginTop: 15,
    backgroundColor: themeRed,
    width: width * 0.4,
    height: height * 0.06,
    borderRadius: width * 0.04,

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});

const mapStateToProps = ({
  userSignup,
  userCoordsReducer,
  userFavourite,
  userInterest,
}) => {
  return {
    userSignup,
    userCoordsReducer,
    userFavourite,
    userInterest,
  };
};
export default connect(mapStateToProps, actions)(FavoriteDScreen);
