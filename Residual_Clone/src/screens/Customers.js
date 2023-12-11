import {
  StyleSheet,
  ImageBackground,
  Text,
  FlatList,
  View,
  StatusBar,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themePurple} from '../assets/colors/colors';
import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';
import CustomersRender from '../components/CustomersRender';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {apiUrl} from '../config/config';
const image = require('../assets/images/login_bg.png');
const {width, height} = Dimensions?.get('window');

const Customers = ({UserReducer, navigation}) => {
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  const accessToken = UserReducer?.accessToken;
  const [customers, setCustomers] = useState(UserReducer?.customers);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const getCustomers = async () => {
    pageNo==1?setIsLoading(true):null
    const response = await axios.get(`${apiUrl}/customers?page=${pageNo}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (pageNo === 1) {
      setCustomers(response?.data?.data?.data);
    } else {
      setCustomers([...customers, ...response?.data?.data?.data]);
    }

    setLastPage(response?.data?.data?.last_page);
    pageNo==1?setIsLoading(false):null
  };

  useEffect(() => {
    getCustomers();
  }, [pageNo]);

  const _onPressCustomer = item => {
    navigation.navigate('customerDetail', {item: item});
  };

  const onRefresh = React.useCallback(() => {
    setIsLoading(true)
    setRefreshing(true);
    wait(1000).then(async () => {
      setRefreshing(false)
      setIsLoading(false)
      setPageNo(1);
    });
  }, []);

  const _onPressLoadMore = async () => {
    setPageNo(pageNo + 1);
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPageNo(1);
    });

    return unsubscribe;
  }, [navigation]);

  console.log(
    'pageno: ',
    pageNo,
    'lastPage: ',
    lastPage,
    'clients: ',
    customers?.length,
  );
  const renderFooter = () => {
    if (customers?.length === 0) {
      return (
        <View style={[styles.notFoundContainer, {marginTop: height * 0.1}]}>
          <Text style={styles.noRecFound}>No Clients Found!</Text>
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
  return (
    <ImageBackground source={image} resizeMode="cover" style={{flex: 1}}>
      <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
        <StatusBar
          translucent
          backgroundColor={themePurple}
          barStyle="light-content"
        />
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <LottieView
            speed={1}
            style={styles.lottieStyle}
            autoPlay
            loop
            source={require('../assets/lottie/purple-loading-2.json')}
          />
          <Text style={styles.fetchTextStyle}>Fetching Data..</Text>
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <>
              <View style={[styles.headerStyle]}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    width: width * 0.15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('profile');
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
              <Text
                style={{
                  color: 'white',
                  fontSize: width * 0.055,
                  fontFamily: 'Poppins-Bold',
                  alignSelf: 'center',
                  paddingVertical: height * 0.01,
                }}>
                Clients
              </Text>
            </>
          )}
          ListHeaderComponentStyle={
            {
              // marginVertical: height * 0.04,
              // marginTop: 20,
            }
          }
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
          data={customers}
          renderItem={({item, index}) => {
            return (
              item?.role_id === 3 && (
                <CustomersRender
                  item={item}
                  index={index}
                  onPress={_onPressCustomer}
                />
              )
            );
          }}
        />
      )}
    </ImageBackground>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(Customers);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fetchTextStyle: {
    marginTop: height * -0.15,
    color: 'white',
    fontSize: width * 0.07,
    fontFamily: 'Poppins-Bold',
  },
  loaderContainer: {
    marginTop: height * 0.36,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: width * 0.03,
    justifyContent: 'center',
    width: width * 0.63,
    alignSelf: 'center',
  },
  headerStyle: {
    flexDirection: 'row',
    width: width,
    marginTop: height * 0.05,
    paddingTop: height * 0.01,
    justifyContent: 'space-between',
  },
  lottieStyle: {
    height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    marginTop: Platform?.OS === 'ios' ? height * -0.037 : height * -0.06,
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
  noRecFound: {
    color: 'white',
    fontSize: width * 0.05,
    fontFamily: 'Poppins-Bold',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: height * 0.04,
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: themePurple,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: width * 0.045,
    alignSelf: 'center',
  },
});
