import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeI from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserReducer} from '../store/Reducers/UserReducer';
import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';
import {themePurple} from '../assets/colors/colors';

const image = require('../assets/images/login_bg.png');
const walmart = require('../assets/images/walmart-icon.png');
const bnb = require('../assets/images/bnb.png');
const category = require('../assets/images/category.png');
const profileImage = require('../assets/images/dp.png');
const {height, width} = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const Profile = ({UserReducer, user_logout, navigation}) => {
  const [name, setName] = useState(
    `${UserReducer?.userData?.first_name} ${UserReducer?.userData?.last_name}`,
  );
  const isAdmin = UserReducer?.userData?.role_id !== 3 ? true : false;
  useEffect(() => {
    setName(
      `${UserReducer?.userData?.first_name} ${UserReducer?.userData?.last_name}`,
    );
  }, [UserReducer?.userData]);

  return (
    <ImageBackground source={image} resizeMode="cover" style={style.login_bg}>
      <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
        <StatusBar
          translucent
          backgroundColor={themePurple}
          barStyle="light-content"
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={style.contentView}>
          {/* Header  */}
          <View style={style.headerStyle}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: width * 0.15,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                style={{height: 30, width: 30, resizeMode: 'contain'}}
                source={require('../assets/images/menu.png')}
              />
            </TouchableOpacity>

            <Image
              style={{height: 50, width: 50}}
              source={require('../assets/images/app-logo.png')}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: width * 0.15,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                // onRefresh();
              }}>
              {/* <Image
                style={{
                  height: 22,
                  width: 22,
                  tintColor: 'white',
                }}
                source={require('../assets/images/refresh.png')}
              /> */}
            </TouchableOpacity>
          </View>

          <LinearGradient
             colors={['#74B5E8', '#9974F2', '#E43DEC']}
            style={[
              style.gradient_btn,
              {
                borderColor: '#707070',
                borderStyle: 'solid',
                borderWidth: 1,
                marginVertical: height * 0.02,
              },
            ]}
            start={{y: 0.0, x: 0.001}}
            angleCenter={{x: 5, y: 0}}
            end={{y: 0.0, x: 1.1}}>
            <View style={[style.card_main]}>
              <Image
                source={
                  UserReducer?.userData?.profile_image
                    ? {uri: UserReducer?.userData?.profile_image}
                    : profileImage
                }
                style={style.profile_img}
              />
              <View style={{marginLeft: width * 0.04}}>
                <Text style={style.user_name}>{name}</Text>
                <Text style={style.user_email}>
                  {UserReducer?.userData?.email}
                </Text>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient
             colors={['#74B5E8', '#9974F2', '#E43DEC']}
            style={[style.gradient_btn]}
            start={{y: 0.0, x: 0.001}}
            angleCenter={{x: 5, y: 0}}
            end={{y: 0.0, x: 1.1}}>
            {/* <View style={[style.card_main, {paddingBottom: width * 0.05}]}>
              <View style={style.list_icon}>
                <Fontisto
                  name="credit-card"
                  size={width * 0.03}
                  color="#fff"
                  style={style.list_icon}
                />
              </View>
              <Text style={style.list_title}>Wallet</Text>
              <Icon name="chevron-right" size={width * 0.04} color="#fff" />
            </View> */}

            {/* Amazon Cred  */}
            {!isAdmin && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('viewAuthCredentials', {type: 'amazon'})
                }
                activeOpacity={0.8}
                style={[style.card_main, {paddingBottom: width * 0.05}]}>
                <View style={style.list_icon}>
                  <Icon
                    name="amazon"
                    size={width * 0.05}
                    color="#fff"
                    style={style.list_icon}
                  />
                </View>
                <Text style={style.list_title}>Amazon Credentials</Text>
                <Icon name="chevron-right" size={width * 0.04} color="#fff" />
              </TouchableOpacity>
            )}

            {/* Walmart Cred  */}
            {!isAdmin && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('viewAuthCredentials', {type: 'walmart'})
                }
                activeOpacity={0.8}
                style={[style.card_main, {paddingBottom: width * 0.05}]}>
                <View style={style.list_icon}>
                  <Image source={walmart} />
                </View>
                <Text style={style.list_title}>Walmart Credentials</Text>
                <Icon name="chevron-right" size={width * 0.04} color="#fff" />
              </TouchableOpacity>
            )}

            {/* Air BNB */}
            {!isAdmin && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('viewAuthCredentials', {type: 'airbnb'})
                }
                activeOpacity={0.8}
                style={[style.card_main, {paddingBottom: width * 0.05}]}>
                <View style={style.list_icon}>
                  <Image source={bnb} />
                </View>
                <Text style={style.list_title}>Air BnB Credentials</Text>
                <Icon name="chevron-right" size={width * 0.04} color="#fff" />
              </TouchableOpacity>
            )}

            {/* Subscription  */}
            {isAdmin && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('subscriptionReqs', {type: 'amazon'})
                }
                activeOpacity={0.8}
                style={[style.card_main, {paddingBottom: width * 0.05}]}>
                <View style={style.list_icon}>
                  <Feather
                    name="package"
                    size={width * 0.05}
                    color="#fff"
                    style={style.list_icon}
                  />
                </View>
                <Text style={style.list_title}>Subscription Requests</Text>
                <Icon name="chevron-right" size={width * 0.04} color="#fff" />
              </TouchableOpacity>
            )}
            {/* <View style={[style.card_main, {paddingBottom: width * 0.05}]}>
              <View style={style.list_icon}>
                <MaterialCommunityIcons
                  name="truck"
                  size={width * 0.06}
                  color="#fff"
                  style={style.list_icon}
                />
              </View>
              <Text style={style.list_title}>Trucking Credentials</Text>
              <Icon name="chevron-right" size={width * 0.04} color="#fff" />
            </View>
            <View style={[style.card_main, {paddingBottom: width * 0.05}]}>
              <View style={style.list_icon}>
                <Fontisto
                  name="credit-card"
                  size={width * 0.03}
                  color="#fff"
                  style={style.list_icon}
                />
              </View>
              <Text style={style.list_title}>All Credit Cards</Text>
              <Icon name="chevron-right" size={width * 0.04} color="#fff" />
            </View>
            <View style={[style.card_main, {paddingBottom: width * 0.05}]}>
              <View style={style.list_icon}>
                <Image source={category} />
              </View>
              <Text style={style.list_title}>Categories</Text>
              <Icon name="chevron-right" size={width * 0.04} color="#fff" />
            </View>
            <View style={[style.card_main, {marginBottom: width * 0.05}]}>
              <TouchableOpacity>
                <Text style={style.connect_btn}>Connect to bank</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                style.card_main,
                {
                  paddingBottom: width * 0.03,
                  marginBottom: width * 0.035,
                  borderBottomColor: 'white',
                  borderBottomWidth: 1,
                },
              ]}>
              <View style={style.list_icon}>
                <Icon
                  name="puzzle-piece"
                  size={width * 0.06}
                  color="#fff"
                  style={style.list_icon}
                />
              </View>
              <Text style={style.list_title}>Tools</Text>
              <Icon name="chevron-right" size={width * 0.04} color="#fff" />
            </View>
            <View style={[style.card_main, {paddingBottom: width * 0.05}]}>
              <View style={style.list_icon}>
                <Icon
                  name="question-circle"
                  size={width * 0.06}
                  color="#fff"
                  style={style.list_icon}
                />
              </View>
              <Text style={style.list_title}>Help and support</Text>
              <Icon name="chevron-right" size={width * 0.04} color="#fff" />
            </View> */}

            {/* Edit Profile  */}
            <TouchableOpacity
              style={[
                style.card_main,
                {
                  // paddingBottom: width * 0.05,
                  // borderBottomWidth: 1,
                  // borderBottomColor: 'white',
                },
              ]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('editProfile')}>
              <View style={style.list_icon}>
                <Fontisto
                  name="player-settings"
                  size={width * 0.05}
                  color="#fff"
                  style={style.list_icon}
                />
              </View>
              <Text style={style.list_title}>Edit Profile</Text>
              <Icon name="chevron-right" size={width * 0.04} color="#fff" />
            </TouchableOpacity>

            {/* Change Password  */}
            <TouchableOpacity
              style={[
                style.card_main,
                {
                  paddingTop: width * 0.05,
                  // borderBottomWidth: 1,
                  // borderBottomColor: 'white',
                },
              ]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('changePassword')}>
              <View style={style.list_icon}>
                <Fontisto
                  name="locked"
                  size={width * 0.05}
                  color="#fff"
                  style={style.list_icon}
                />
              </View>
              <Text style={style.list_title}>Change Password</Text>
              <Icon name="chevron-right" size={width * 0.04} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[style.card_main, {paddingTop: height * 0.03}]}
              onPress={() => user_logout()}>
              <View style={style.list_icon}>
                <MaterialCommunityIcons
                  name="logout"
                  size={width * 0.05}
                  color="#fff"
                  style={style.list_icon}
                />
              </View>
              <Text style={style.list_title}>Logout</Text>
              {/* <Icon name="chevron-right" size={width * 0.04} color="#fff" /> */}
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  login_bg: {
    flex: 1,
    alignItems: 'center',
  },
  card_main: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: width * 0.9,
  },
  gradient_btn: {
    borderRadius: 20,
    padding: width * 0.05,
    width: width * 0.9,
    alignSelf: 'center',
  },
  profile_img: {
    height: width * 0.15,
    width: width * 0.15,
    borderRadius: 100,
  },
  user_name: {
    fontSize: width * 0.055,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    lineHeight: width * 0.07,
    textTransform: 'capitalize',
  },
  user_email: {
    fontSize: width * 0.035,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  list_icon: {
    width: width * 0.1,
  },
  list_title: {
    flex: 1,
    fontSize: width * 0.04,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    lineHeight: width * 0.06,
  },
  connect_btn: {
    color: 'white',
    fontSize: width * 0.04,
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 50,
    width: width * 0.8,
    textAlign: 'center',
    paddingVertical: width * 0.04,
    fontFamily: 'Poppins-SemiBold',
  },
  contentView: {
    marginVertical: height * 0.04,
  },
  headerStyle: {
    flexDirection: 'row',
    width: width,
    marginVertical: height * 0.02,
    marginTop:height * 0.008,
    // paddingVertical: height * 0.01,
    justifyContent: 'space-between',
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(Profile);
