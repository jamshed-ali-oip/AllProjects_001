import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  RefreshControl,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,StatusBar,
  Image,Platform
} from 'react-native';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import ProductCard from '../components/products-card/card';
import moment from 'moment';
import * as actions from '../store/Actions';
import { themePurple } from '../assets/colors/colors';

const image = require('../assets/images/login_bg.png');
const {height, width} = Dimensions.get('window');

const ProductsListings = ({
  getUserProductsArray,
  UserReducer,
  navigation,
  route,
}) => {
  const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  const navParams = route.params;
  const accessToken = UserReducer?.accessToken;
  const [refreshing, setRefreshing] = React.useState(false);
  const [productsArray, setProductsArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    getProductsListings();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      getProductsListings();
    });
  }, []);

  useEffect(() => {
   
      setProductsArray(UserReducer?.productsArray);
    
  }, [UserReducer?.productsArray]);

  const getProductsListings = async () => {
    const data = {
      platform: navParams?.type,
      email: UserReducer?.userData?.email,
    };

    setLoading(true);
    await getUserProductsArray(data, accessToken);
    setLoading(false);
  };
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{flex: 1, alignItems: 'center'}}>
          <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: themePurple }}>
          <StatusBar
            translucent
            backgroundColor={themePurple}
            barStyle="light-content"
          />
        </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={productsArray}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={style.contentContainerStyle}
        ListHeaderComponent={() => (
          <View style={style.flatHeaderView}>
            <TouchableOpacity
              style={style.btnStyle}
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}>
              <Text style={style.btnTextStyle}>{'< Products'}</Text>
            </TouchableOpacity>
            <Text
              style={style.main_title}>{`${navParams.type} Investments`}</Text>
          </View>
        )}
        ListFooterComponentStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: height * 0.25,
        }}
        ListFooterComponent={() => (
          <>
            {productsArray?.length === 0 && !loading && (
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  width: width * 0.7,
                  height: height * 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: width * 0.04,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins-Regular',
                    fontSize: width * 0.05,
                  }}>
                  No Investments
                </Text>
              </View>
            )}
          </>
        )}
        renderItem={({item, index}) => {
          return !loading &&(
            <View style={style.cardStyle}>
              <View style={style.textViewStyle}>
                <Text style={style.headingStyle}>Total Investment </Text>
                <Text
                  style={
                    style.valueStyle
                  }>{`$ ${item?.Total_Investment}`}</Text>
              </View>
              <View style={style.textViewStyle}>
                <Text style={style.headingStyle}>Total Earning </Text>
                <Text
                  style={style.valueStyle}>{`$ ${item?.Total_Earning}`}</Text>
              </View>
              <View style={style.textViewStyle}>
                <Text style={style.headingStyle}>Total Earning Per</Text>
                <Text
                  style={
                    style.valueStyle
                  }>{`$ ${item?.Total_Earning_per}`}</Text>
              </View>
              {navParams?.type === 'Amazon' && (
                <>
                  <View style={style.textViewStyle}>
                    <Text style={style.headingStyle}>Amazon Investment </Text>
                    <Text style={style.valueStyle}>
                      {`$ ${item?.Amazon_Investment}`}
                    </Text>
                  </View>
                  <View style={style.textViewStyle}>
                    <Text style={style.headingStyle}>Amazon Earning </Text>
                    <Text
                      style={
                        style.valueStyle
                      }>{`$ ${item?.Amazon_Earning}`}</Text>
                  </View>
                  <View style={style.textViewStyle}>
                    <Text style={style.headingStyle}>Amazon ROI </Text>
                    <Text
                      style={style.valueStyle}>{`$ ${item?.Amazon_ROI}`}</Text>
                  </View>
                </>
              )}

              {navParams?.type === 'Walmart' && (
                <>
                  <View style={style.textViewStyle}>
                    <Text style={style.headingStyle}>Walmart Investment </Text>
                    <Text style={style.valueStyle}>
                      {item?.Walmart_Investment}
                    </Text>
                  </View>

                  <View style={style.textViewStyle}>
                    <Text style={style.headingStyle}>Walmart Earning </Text>
                    <Text style={style.valueStyle}>
                      {item?.Walmart_Earning}
                    </Text>
                  </View>
                  <View style={style.textViewStyle}>
                    <Text style={style.headingStyle}>Walmart ROI </Text>
                    <Text style={style.valueStyle}>{item?.Walmart_ROI}</Text>
                  </View>
                </>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: 10,
                }}>
                <Text style={style.valueStyle}>
                  {`Last Updated: ${moment(item?.updated_at).format(
                    'MMM-DD-YYYY',
                  )}`}
                </Text>
              </View>
            </View>
          );
        }}
      />
      {loading && (
        <LottieView
          speed={1}
          style={style.lottieStyle}
          autoPlay
          loop
          source={require('../assets/lottie/purple-loading-2.json')}
        />
      )}
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  contentContainerStyle: {justifyContent: 'center', alignItems: 'center'},
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Medium',
  },
  btnStyle: {
    backgroundColor: 'purple',
    borderRadius: width * 0.02,
    paddingVertical: height * 0.007,
    paddingHorizontal: width * 0.02,
    marginRight: width * 0.03,
  },
  cardStyle: {
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: width * 0.03,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
  },
  flatHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  main_title: {
    fontSize: width * 0.055,
    color: 'white',
    marginBottom: 25,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginTop: 20,
  },
  main_title_sec: {
    fontSize: width * 0.065,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    flexWrap: 'wrap',
    lineHeight: width * 0.075,
  },
  textViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingStyle: {
    fontFamily: 'Poppins-Bold',
    color: 'purple',
    fontSize: width * 0.045,
  },
  valueStyle: {
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.04,
  },
  lottieStyle: {
    height: height * 0.4,
    // width:width * 0.3,
    // marginTop:100,
    position: 'absolute',
    // backgroundColor: 'red',
    // bottom: height * 0.032,
    top: height * 0.14,
    zIndex: 9999,
    // left: width * 0.01,
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(ProductsListings);
