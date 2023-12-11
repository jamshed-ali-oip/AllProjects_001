import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  StatusBar,
  ScrollView,
  ImageBackground,
  RefreshControl,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {themePurple} from '../assets/colors/colors';
import {connect, useDispatch} from 'react-redux';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
import * as actions from '../store/Actions/index';
import LottieView from 'lottie-react-native';
import SubscriptionReqsMapper from '../components/SubscriptionReqsMapper';
import axios from 'axios';
import {apiUrl} from '../config/config';
import {useIsFocused} from '@react-navigation/native';
import {GET_SUBSCRIPTION_REQUESTS} from '../store/Actions/actionType';

const {width, height} = Dimensions.get('window');
const image = require('../assets/images/login_bg.png');

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const SubscriptionRequests = ({
  UserReducer,
  getSubscriptionRequests,
  route,
  navigation,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  // const isRecall = route?.params?.isRecall;

  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const isAdmin = UserReducer?.userData?.role_id !== 3 ? true : false;
  const [pageNo, setPageNo] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [subscriptionRequests, setSubscriptionRequests] = useState([]);

  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  const accessToken = UserReducer?.accessToken;

  // useEffect(() => {
  //   getSubscriptionRequests(accessToken, pageNo);
  // }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1500).then(async () => {
      setRefreshing(false);
      setIsLoading(true);
      setSubscriptionRequests([]);
      await getSubscriptionRequests(accessToken, 1);
      setPageNo(2);
      setIsLoading(false);
    });
  }, []);

  const _onPressLoadMore = async () => {
    setPageNo(pageNo + 1);
    // setIsLoading(true);
    // await getSubscriptionRequests(accessToken, pageNo);
    // setIsLoading(false);
  };

  console.log(pageNo, lastPage, subscriptionRequests?.length);
  const renderFooter = () => {
    if (subscriptionRequests?.length === 0) {
      return (
        <View
          style={[
            styles.notFoundContainer,
            {marginTop: isAdmin ? height * 0.1 : height * 0.35},
          ]}>
          <Text style={styles.noRecFound}>No Subscription Requests Found!</Text>
        </View>
      );
    } else if (pageNo < lastPage) {
      //Footer View with Load More button
      return (
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={_onPressLoadMore}
            //On Click of button calling getData function to load more data
            style={styles.loadMoreBtn}>
            <Text style={styles.btnText}>Load More</Text>
            {isLoading ? (
              <ActivityIndicator color="white" style={{marginLeft: 8}} />
            ) : null}
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  // useEffect(() => {
  //   // if (UserReducer?.subsReqs) {
  //     const oldData = [...subscriptionRequests];
  //     setSubscriptionRequests([...oldData, ...UserReducer?.subsReqs]);
  //   // } else {
  //     // setSubscriptionRequests([]);
  //   // }
  // }, [UserReducer?.subsReqs]);

  const getRequests = async () => {
    pageNo==1?setIsLoading(true):null
    const response = await axios.get(
      `${apiUrl}/getAllSubscribeCustomer?page=${pageNo}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    // if (checkIsRecall) {
    //   setSubscriptionRequests([...response?.data?.data?.data]);
    // } else {
    if (pageNo === 1) {
      setSubscriptionRequests(response?.data?.data?.data);
    } else {
      setSubscriptionRequests([
        ...subscriptionRequests,
        ...response?.data?.data?.data,
      ]);
    }
    // }
    dispatch({
      type: GET_SUBSCRIPTION_REQUESTS,
      payload: {
        array: response?.data?.data?.data,
        last_page: 0,
      },
    });
    setLastPage(response?.data?.data?.last_page);
    pageNo==1?setIsLoading(false):null
    // setIsLoading(false);
  };

  useEffect(() => {
    getRequests();
  }, [pageNo]);

  // useEffect(() => {
  //   setSubscriptionRequests([
  //     ...subscriptionRequests,
  //     ...UserReducer?.subsReqs,
  //   ]);
  // }, [UserReducer?.subsReqs]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      setPageNo(1)
      setSubscriptionRequests([])
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <ImageBackground source={image} resizeMode="cover" style={{flex: 1}}>
      {Platform.OS == 'android' && (
        <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
          <StatusBar
            translucent
            backgroundColor={themePurple}
            barStyle="light-content"
          />
        </View>
      )}
      {isLoading ? (
        <View
          style={{
            marginTop: height * 0.35,
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: width * 0.03,
            alignSelf: 'center',
            width: width * 0.63,
          }}>
          <LottieView
            speed={1}
            style={styles.lottieStyle}
            autoPlay
            loop
            source={require('../assets/lottie/purple-loading-2.json')}
          />
          <Text
            style={{
              marginTop: height * -0.15,
              color: 'white',
              fontSize: width * 0.07,
              fontFamily: 'Poppins-Bold',
            }}>
            Fetching Data..
          </Text>
        </View>
      ) : (
        <>
          {/* Header  */}
          <View style={styles.headerStyle}>
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
              <IconComp
                iconName={'arrow-left'}
                type="Feather"
                passedStyle={{color: 'white', fontSize: width * 0.052}}
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
                onRefresh();
              }}>
              <Image
                style={{
                  height: 22,
                  width: 22,
                  tintColor: 'white',
                }}
                source={require('../assets/images/refresh.png')}
              />
            </TouchableOpacity>
          </View>

          {/* ScrollView  */}

          {subscriptionRequests?.length > 0 ? (
            <FlatList
              data={subscriptionRequests}
              ListHeaderComponent={
                <Text style={styles.main_title}>{`Subscription Requests`}</Text>
              }
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListFooterComponent={renderFooter}
              renderItem={({item, index}) => {
                return (
                  <SubscriptionReqsMapper
                    item={item}
                    index={index}
                    navigation={navigation}
                    subscriptionRequests={subscriptionRequests}
                    setSubscriptionRequests={setSubscriptionRequests}
                  />
                );
              }}
            />
          ) : (
            <View style={styles.viewContainer}>
              <Heading
                title={'No Subscription Requests Found!'}
                passedStyle={styles.textStyle}
                fontType="medium"
              />
            </View>
          )}
        </>
      )}
    </ImageBackground>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {
    UserReducer,
  };
};
export default connect(mapStateToProps, actions)(SubscriptionRequests);

const styles = StyleSheet.create({
  btnText: {
    color: 'white',
    fontSize: width * 0.045,
    alignSelf: 'center',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: themePurple,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecFound: {
    color: 'white',
    fontSize: width * 0.05,
    fontFamily: 'Poppins-Bold',
  },
  notFoundContainer: {
    width: width * 0.6,
    height: height * 0.17,
    borderRadius: width * 0.04,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  lottieStyle: {
    height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    // backgroundColor: 'red',
    // position: 'absolute',
    // top:100,
    marginTop: Platform?.OS === 'ios' ? height * -0.037 : height * -0.06,
    // zIndex: 99999,
    // left: width * 0.04,
  },
  viewContainer: {
    borderRadius: width * 0.04,
    height: height * 0.1,
    backgroundColor: themePurple,
    width: width * 0.9,
    justifyContent: 'center',
    alignSelf: 'center',
    // alignItems: 'center',
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.01,
  },
  passwordViewContainer: {
    backgroundColor: themePurple,
    borderRadius: width * 0.04,
    height: height * 0.1,
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.01,
  },
  main_title: {
    marginVertical: height * 0.05,
    fontSize: width * 0.06,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    textTransform: 'capitalize',
    alignSelf: 'center',
    width: width * 0.8,
    // borderWidth: 1,
    paddingHorizontal: width * 0.02,
    // borderColor: 'white',
    borderRadius: width * 0.04,
  },
  textStyle: {
    color: 'white',
    fontSize: width * 0.045,
    fontFamily: 'Poppins-Medium',
  },
  emailStyle: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Medium',
  },
  headerStyle: {
    flexDirection: 'row',
    width: width,
    marginTop: height * 0.05,
    paddingVertical: height * 0.01,
    paddingBottom: height * 0.03,
    justifyContent: 'space-between',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: height * 0.04,
  },
});

// const array = [
//   {
//     id: 1,
//     name: 'John Doe',
//     image: require('../../test.png'),
//     product: 'Amazon',
//     date: new Date(),
//   },
//   {
//     id: 2,
//     name: 'Chirs Brown',
//     image: require('../../test.png'),
//     product: 'AirBnB,',
//     date: new Date(),
//   },
//   {
//     id: 3,
//     name: 'Peter Mareqeqq',
//     image: require('../../test.png'),
//     product: 'Walmart',
//     date: new Date(),
//   },
//   {
//     id: 4,
//     name: 'Hyeyte Oasdaa',
//     image: require('../../test.png'),
//     product: 'AirBnB',
//   },
//   {
//     id: 5,
//     name: 'Daswew Mnhdeww',
//     image: require('../../test.png'),
//     product: 'Amazon',
//     date: new Date(),
//   },
//   {
//     id: 6,
//     name: 'Xmasua Zsuasiu',
//     image: require('../../test.png'),
//     product: 'Walmart',
//     date: new Date(),
//   },
// ];
