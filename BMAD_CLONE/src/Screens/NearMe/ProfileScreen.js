// @ts-nocheck
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
  Dimensions,
  ScrollView,
  RefreshControl,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import AppText from '../../Components/AppText';
import { connect } from 'react-redux';
import { imageUrl } from '../../Config/Apis.json';
import { useRoute, StackActions, useIsFocused } from '@react-navigation/native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import * as actions from '../../Store/Actions/index';
import { themeRed } from '../../Assets/Colors/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../src/constants/Colors';
//  import {useNavigation} from "@react-navigation/native"
// import { NavigationActions } from 'react-navigation';
const { width, height } = Dimensions.get('window');

const ProfileScreen = ({
  userReducer,
  navigation,
  unfriendUserFromProfile,
  route,
  usersNearmeReducer,
  cancelOfferFromProfile,
  createConversation,
  saveCurrentChatObject,
  messagesReducer,
  getUserData,
  ignoreInviteFromProfile,
  acceptInviteFromProfile,
}) => {
  const [lines, onChangeLines] = useState(2);
  const [linesCondition, onChangeLinesCondition] = useState(false);
  const [nearMeUserData, setNearMeUserData] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();
  const [actionLoader, setActionLoader] = useState(false);
  const [Sno, setSno] = useState(0);
  const [Pno, setPno] = useState(false);
  const [Fno, setFno] = useState(false);
  const LOGGED_IN_USER = userReducer?.data?.user_id;
  const profileData = route?.params?.userData;
  const isIOS = Platform.OS === 'ios';

  const [loading, setLoading] = useState(false);

  // console.log(navigation);
  const ReadMore = () => {
    onChangeLines(20);
    onChangeLinesCondition(true);
  };
  const ShowLess = () => {
    onChangeLines(2);
    onChangeLinesCondition(false);
  };

  // cancel my friend request sent to buddy
  const _cancelOfferRequest = async () => {
    const apiData = {
      user: userReducer?.data?.user_id,
      friend: nearMeUserData.user_id,
    };
    setActionLoader(true);
    await cancelOfferFromProfile(apiData, _onSuccessOfAction);
    setActionLoader(false);
  };

  const _onPressRemoveFriend = async () => {
    const apiData = {
      user: userReducer?.data?.user_id,
      friend: nearMeUserData.user_id,
    };
    setActionLoader(true);
    await unfriendUserFromProfile(apiData, _onSuccessOfAction);
    setActionLoader(false);
  };

  const _onPressMessageButton = async () => {
    //below two lines tab tak k liye hen jb tk profile se messages kr rahe hen phr hatadnaa
    saveCurrentChatObject(nearMeUserData);
    navigation.navigate('Chats');

    // const apiData = {
    //   sender: LOGGED_IN_USER,
    //   receiver: nearMeUserData?.user_id,
    // };
    // await createConversation(apiData, nearMeUserData, _onSuccess);
  };
  console.log("lllllllllllllllllllllll",)
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(async () => {
      setRefreshing(false);
      setLoading(true);

      getProfileData();

      setLoading(false);
    });
  }, []);

  const _onPressIgnoreInvite = async (item, index) => {
    const data = {
      user: LOGGED_IN_USER,
      friend: nearMeUserData?.user_id,
    };
    // console.log(data, 'Ignore data');
    await ignoreInviteFromProfile(data, _onSuccessOfAction);
  };

  const _onPressAcceptButton = async (item, index) => {
    const data = {
      user: LOGGED_IN_USER,
      friend: nearMeUserData?.user_id,
    };
    // console.log(data, 'accept data');
    await acceptInviteFromProfile(data, _onSuccessOfAction);
  };

  const _onSuccessOfAction = () => {
    getProfileData();
  };

  useEffect(() => {
    if (
      usersNearmeReducer?.user !== null &&
      usersNearmeReducer?.user !== undefined
    ) {
      // console.log('After Cancelling Request: Data Changed');
      // console.log(usersNearmeReducer?.user);
      setNearMeUserData(usersNearmeReducer?.user);
      console.log("opopopopppp", usersNearmeReducer?.user)
    }
  }, [usersNearmeReducer?.user]);

  const getProfileData = async () => {
    setLoading(true);
    await getUserData(
      userReducer?.data?.user_id,
      route?.params?.userData?.user_id,
    );
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      getProfileData();
    }
  }, [isFocused]);

  console.log(nearMeUserData?.status, nearMeUserData?.sendBy);
  if (loading) {
    return (
      <View style={styles.loaderView}>
        <StatusBar translucent backgroundColor="transparent" />
        <LottieView
          style={{
            width: width * 0.3,
            height: height * 0.35,
          }}
          source={require('../../Assets/Lottie/loading-heart.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
  const handlePrevios = (i) => {
    if (Sno == 0) {
      setPno(true)
    } else {
      setFno(false)
      setSno(Sno - 1)
    }
  }
  const handleafter = (i) => {
    if (i - 1 == Sno) {
      setFno(true)
    } else {
      setSno(Sno + 1)
      setPno(false)
    }
  }
  // console.log(JSON.stringify(nearMeUserData?.sendBy, null, 2));
  console.log("nearMeUserData", nearMeUserData)
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <StatusBar translucent backgroundColor="transparent" />

        {/* User Profile Section  */}

        {nearMeUserData?.user_image === undefined ||
          nearMeUserData?.user_image == null ? (
          <Image
            style={[styles.userProfilePic, isIOS && { height: height * 0.45 }]}
            source={require('./../../Assets/Images/userr.jpeg')}
            resizeMode="cover"
          // resizeMethod="auto"
          />
        ) : (
          <Image
            style={styles.userProfilePic}
            source={{ uri: `${imageUrl}/${nearMeUserData?.user_image?.[Sno]}` }}
          // resizeMode=""
          // resizeMethod="auto"
          />

        )}

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: -height * 0.045,
            backgroundColor: Colors?.themeColor,
            width: width * 1,
            zIndex: 5457,

          }}
        >
          <TouchableOpacity
            disabled={Pno}
            onPress={() => { handlePrevios(nearMeUserData?.user_image?.length) }}
          >
            <Entypo name="chevron-small-left" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={Fno}
            onPress={() => { handleafter(nearMeUserData?.user_image?.length) }}
          >
            <Entypo name="chevron-small-right" size={35} color="white" />
          </TouchableOpacity>
        </View>

        {/* Total Profile Likes  */}
        {/* <View style={styles.heartContainer}>
        <AntDesign name="heart" style={{padding: 2}} size={width * 0.1} color="red" />
        <Text style={styles.totalLike}>{nearMeUserData?.is_like}</Text>
      </View> */}

        {/* User Info Section  */}
        <View style={styles.userInfoSection}>
          {/* Age and Name View  */}
          <View style={styles.ageAndNameView}>
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={hp('3%')}
              color="white"
              Label={nearMeUserData?.user_name?.substring(0, 20)}
            />

            {/* <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={hp('2%')}
              color="white"
              // Label={'26'}
              Label={nearMeUserData?.user_gender[0] || 'Female'}
            /> */}
          </View>
          <Text style={{
            color: "white",
            fontSize: 15,
            marginLeft: 20,
            marginTop: -20
          }}>
            {/* <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: "800"
              }}
            >Bio:</Text> */}
            {nearMeUserData?.user_bio}
          </Text>
          <View style={{ marginLeft: width * 0.05 }}>
            {/* <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={width * 0.037}
              color="white"
              Label={`${nearMeUserData?.user_gender[0]}`}
            /> */}

            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={width * 0.037}
              color="white"
              Label={
                nearMeUserData?.user_lives
                  ? `${nearMeUserData?.user_lives}`
                  : ''
              }
            />
          </View>
          {/* Profession View  */}
          <View style={styles.professionView}>
            {nearMeUserData?.user_title != null &&
              nearMeUserData?.user_title !== undefined &&
              nearMeUserData?.user_lives != null &&
              nearMeUserData?.user_lives != undefined && (
                <View style={styles.professionInnerView}>
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-SemiBold"
                    size={hp('2%')}
                    color="white"
                    Label={'Lecturer'}
                  // Label={nearMeUserData?.user_title}
                  />
                  {(nearMeUserData?.user_title != null ||
                    (nearMeUserData?.user_title !== undefined &&
                      nearMeUserData?.user_lives != null &&
                      nearMeUserData?.user_lives != undefined)) && (
                      <View style={styles.noProfessions} />
                    )}
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-SemiBold"
                    size={hp('2%')}
                    color="white"
                    Label={'New York City'}
                  // Label={nearMeUserData?.user_lives}
                  />
                </View>
              )}

            {/* Address View */}
            {nearMeUserData?.user_address != null && (
              <View style={styles.addressView}>
                <AppText
                  nol={3}
                  textAlign="left"
                  family="Poppins-Regular"
                  size={hp('2%')}
                  color="white"
                  Label={
                    'New York, Times Square 1st Block 1st Cross Street# 43'
                  }
                // Label={nearMeUserData?.user_address}
                />
              </View>
            )}

            {/* Kilometers Far Away  */}
            {/* <View style={styles.kilometerView}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-Regular"
                size={hp('1.5%')}
                color="white"
                Label={
                  parseFloat(nearMeUserData?.distance).toFixed(2) +
                  ' Km far away'
                }
              />
            </View> */}
          </View>

          {/* Buttons View  */}
          <View style={styles.buttonsView}>
            {/* Loader for Action Buttons */}
            {actionLoader && (
              <View style={styles.touchableOpacity}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-SemiBold"
                  size={width * 0.03}
                  color="black"
                  Label={'Please Wait...'}
                />
              </View>
            )}

            {/* Connect Button  */}

            {/* Cancel Request Sent By Me  */}
            {nearMeUserData?.sendBy === LOGGED_IN_USER &&
              nearMeUserData?.status === 'pending' && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.touchableOpacity}
                  onPress={() => {
                    _cancelOfferRequest();
                  }}>
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-SemiBold"
                    size={width * 0.03}
                    color="black"
                    Label={'Cancel Offer'}
                  />
                </TouchableOpacity>
              )}

            {/* Send Friend Request  */}
            {(nearMeUserData?.status === null ||
              nearMeUserData?.status === 'null' ||
              nearMeUserData?.status === 'rejected') && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.touchableOpacity}
                  onPress={() => {
                    if (userReducer?.data?.coins <= 0) {
                      showMessage({
                        message: "You don't have enough coins to send a request.",
                        danger: 'error',
                      });
                      return;
                    }
                    navigation.navigate('OfferADrink');
                  }}>
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-SemiBold"
                    size={width * 0.03}
                    color="black"
                    Label={'Offer A Drink'}
                  />
                </TouchableOpacity>
              )}

            {/* REmove Friend  */}
            {nearMeUserData?.status === 'accepted' && !actionLoader && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  _onPressRemoveFriend();
                }}
                style={styles.touchableOpacity}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-SemiBold"
                  size={width * 0.03}
                  color="black"
                  Label={'Remove Friend'}
                />
              </TouchableOpacity>
            )}

            {/* Accept Button  */}
            {nearMeUserData?.sendBy !== LOGGED_IN_USER &&
              nearMeUserData?.status === 'pending' && (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      _onPressAcceptButton();
                    }}
                    style={styles.touchableOpacity}>
                    <AppText
                      nol={1}
                      textAlign="left"
                      family="Poppins-SemiBold"
                      size={width * 0.03}
                      color="black"
                      Label={'Accept'}
                    />
                  </TouchableOpacity>
                </View>
              )}

            {/* Ignore Button  */}
            {nearMeUserData?.sendBy !== LOGGED_IN_USER &&
              nearMeUserData?.status === 'pending' && (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      _onPressIgnoreInvite();
                    }}
                    style={[styles.touchableOpacity, { marginLeft: 10 }]}>
                    <AppText
                      nol={1}
                      textAlign="left"
                      family="Poppins-SemiBold"
                      size={width * 0.03}
                      color="black"
                      Label={'Ignore'}
                    />
                  </TouchableOpacity>
                </View>
              )}

            {/* Message Button  */}
            {nearMeUserData?.status === 'accepted' && !actionLoader && (
              <TouchableOpacity
                // onPress={
                //   likeStatus == false ? is_like : likeStatus == true ? unlike : error
                // }
                activeOpacity={0.8}
                onPress={() => _onPressMessageButton()}
                style={[styles.touchableOpacity, { marginLeft: 10 }]}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-SemiBold"
                  size={width * 0.03}
                  color="black"
                  Label={'Message'}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Favorite Heading  */}
          <View style={styles.FavoriteTextView}>
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={isIOS ? width * 0.05 : width * 0.05}
              color="white"
              Label={'Favourites'}
            // Label={'Favourites'}
            />
          </View>

          {/* Favorites Flatlist */}
          <View style={styles.favoritesFlatlistView}>
            <FlatList
              contentContainerStyle={styles.contentContainerStyle}
              showsHorizontalScrollIndicator={false}
              data={nearMeUserData?.user_favorite}
              horizontal
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    margin: 10,
                  }}>
                  <ImageBackground
                    style={{ width: 120, height: 120 }}
                    resizeMode="contain"
                    imageStyle={{ borderRadius: 5 }}
                    source={
                      item == 'Old Fashioned'
                        ? require('../../Assets/Images/1.png')
                        : item == 'Margarita'
                          ? require('../../Assets/Images/2.png')
                          : item == 'Dark & Stormy'
                            ? require('../../Assets/Images/3.png')
                            : item == 'Mimosa'
                              ? require('../../Assets/Images/4.png')
                              : item == 'Manhattan'
                                ? require('../../Assets/Images/5.png')
                                : item == 'Whiskey Sour'
                                  ? require('../../Assets/Images/6.png')
                                  : item == 'Cosmopolitan'
                                    ? require('../../Assets/Images/7.png')
                                    : item == 'Martini'
                                      ? require('../../Assets/Images/8.png')
                                      : null
                    }>
                    <View style={styles.flatTextStyle}>
                      <Text numberOfLines={2} style={styles.flatText}>
                        {item}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              )}
            />
          </View>

          {/* Interest Section  */}
          <View style={styles.FavoriteTextView}>
            <AppText
              nol={1}
              textAlign="left"
              family="Poppins-SemiBold"
              size={isIOS ? width * 0.05 : width * 0.05}
              color="white"
              Label={'Interest'}
            />
          </View>

          {/* Interest FlatList  */}
          <View style={styles.favoritesFlatlistView}>
            {/* {console.log(nearMeUserData, '...')} */}
            <FlatList
              contentContainerStyle={styles.contentContainerStyle}
              showsHorizontalScrollIndicator={false}
              data={nearMeUserData?.user_interest}
              horizontal
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    margin: 10,
                  }}>
                  <ImageBackground
                    style={{ width: 120, height: 120 }}
                    resizeMode="contain"
                    imageStyle={{ borderRadius: 5 }}
                    source={
                      item == 'Tech'
                        ? require('../../Assets/Images/Tech.png')
                        : item == 'Food'
                          ? require('../../Assets/Images/Food.png')
                          : item == 'Animal'
                            ? require('../../Assets/Images/Animal.png')
                            : item == 'Art & Design'
                              ? require('../../Assets/Images/Art.png')
                              : item == 'Book'
                                ? require('../../Assets/Images/Book.png')
                                : item == 'Movie'
                                  ? require('../../Assets/Images/Movies.png')
                                  : item == 'Nature'
                                    ? require('../../Assets/Images/Nature.png')
                                    : item == 'Poetry'
                                      ? require('../../Assets/Images/Poetry.png')
                                      : null
                    }>
                    <View style={styles.flatTextStyle}>
                      <Text style={styles.flatText}>{item}</Text>
                    </View>
                  </ImageBackground>
                </View>
              )}
            />
          </View>
          <View style={{ height: 170 }} />
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({
  userReducer,
  usersNearmeReducer,
  messagesReducer,
}) => {
  return { userReducer, usersNearmeReducer, messagesReducer };
};
export default connect(mapStateToProps, actions)(ProfileScreen);

var styles = StyleSheet.create({
  loaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    height: hp('103%'),
    backgroundColor: 'white',
  },
  touchableOpacity: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: 'white',
    width: width * 0.4,
    height: height * 0.05,
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  touchableOpacityText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: hp('2'),
    textAlign: 'center',
  },
  userProfilePic: {
    // position: 'absolute',
    // top: 0,
    width: width,
    height: height * 0.5,
  },
  heartContainer: {
    position: 'absolute',
    top: 15,
    right: 10,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalLike: {
    zIndex: 1,
    fontSize: 20,
    position: 'absolute',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  userInfoSection: {
    backgroundColor: themeRed,
    // height: 500,
    bottom: 0,
    justifyContent: 'flex-end',
    marginTop: -20,
    // borderRadius: 15,
    flexDirection: 'column',
    borderTopRightRadius: 20,
  },
  ageAndNameView: {
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row',
  },
  noProfessions: {
    height: 2,
    backgroundColor: 'white',
    width: 14,
    marginLeft: 5,
    marginRight: 5,
  },
  professionView: {
    justifyContent: 'flex-start',
    paddingLeft: 20,
    flexDirection: 'column',
  },
  professionInnerView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '90%',
  },
  kilometerView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
  },
  buttonsView: {
    justifyContent: 'flex-start',
    padding: 20,
    flexDirection: 'row',
    alignContent: 'space-around',
  },
  FavoriteTextView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  contentContainerStyle: {
    alignSelf: 'flex-start',
    margin: 5,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  flatTextStyle: {
    justifyContent: 'flex-end',
    height: 120,
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  flatText: {
    textAlign: 'left',
    display: 'flex',
    textAlignVertical: 'bottom',
    padding: 5,
    color: 'white',

    fontFamily: 'Poppins-Bold',
    fontSize: hp('2%'),
  },
});
