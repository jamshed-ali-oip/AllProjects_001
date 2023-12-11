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
  ScrollView,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import ProductCard from '../components/products-card/card';
import moment from 'moment';
import * as actions from '../store/Actions';
import {themePurple} from '../assets/colors/colors';

const image = require('../assets/images/login_bg.png');
const {height, width} = Dimensions.get('window');

const InvoiceDetail = ({
  getUserProductsArray,
  UserReducer,
  navigation,
  route,
}) => {
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  const navParams = route.params.item;
  const accessToken = UserReducer?.accessToken;
  const [refreshing, setRefreshing] = React.useState(false);
  const [productsArray, setProductsArray] = useState([]);
  const [loading, setLoading] = useState(false);
console.log(navParams)
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  //   useEffect(() => {
  //     getProductsListings();
  //   }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      getProductsListings();
    });
  }, []);

  //   useEffect(() => {

  //       setProductsArray(UserReducer?.productsArray);

  //   }, [UserReducer?.productsArray]);

  //   const getProductsListings = async () => {
  //     const data = {
  //       platform: navParams?.type,
  //       email: UserReducer?.userData?.email,
  //     };

  //     setLoading(true);
  //     await getUserProductsArray(data, accessToken);
  //     setLoading(false);
  //   };
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{flex: 1, alignItems: 'center'}}>
      <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
        <StatusBar
          translucent
          backgroundColor={themePurple}
          barStyle="light-content"
        />
      </View>

      <View style={style.flatHeaderView}>
        <TouchableOpacity
          style={style.btnStyle}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Text style={style.btnTextStyle}>{'< Invoices'}</Text>
        </TouchableOpacity>
        <Text style={style.main_title}>{`Invoice Details`}</Text>
      </View>

      <View style={style.cardStyle}>
        <View style={style.textViewStyle}>
          <Text style={style.headingStyle}>Invoice Number </Text>
          <Text style={style.valueStyle}>{`${navParams?.invoice_no}`}</Text>
        </View>
        <View style={style.textViewStyle}>
          <Text style={style.headingStyle}>Customer Name </Text>
          <Text style={style.valueStyle}>{`${navParams?.customer ? navParams?.customer : 'No Name'}`}</Text>
        </View>

        <View style={style.textViewStyle}>
          <Text style={style.headingStyle}>Invoice Date</Text>
          <Text style={style.valueStyle}>{`${moment(
            navParams?.created_at,
          ).format('MMM-DD-YYYY')}`}</Text>
        </View>

        <View style={style.textViewStyle}>
          <Text style={style.headingStyle}>Quantity </Text>
          <Text style={style.valueStyle}>{navParams?.qty}</Text>
        </View>


        <View style={style.textViewStyle}>
          <Text style={style.headingStyle}>Product</Text>
          <Text style={style.valueStyle}>{navParams?.product}</Text>
        </View>
       

        <View style={style.textViewStyle}>
          <Text style={style.headingStyle}>Status</Text>
          <Text style={style.valueStyle}>{navParams?.Status === null ? 'Inactive' : "Active"}</Text>
        </View>
       

      
        <View style={style.textViewStyle}>
          <Text style={style.headingStyle}>Rate</Text>
          <Text style={style.valueStyle}>{navParams?.rate}</Text>
        </View>
      
        {/* <View style={style.textViewStyle}> */}
        <Text style={style.headingStyle}>Customer Email:</Text>
        <Text style={style.valueStyle}>{`${navParams?.customer_email}`}</Text>
        {/* </View> */}
        {/* <View style={style.textViewStyle}> */}
          <Text style={style.headingStyle}>Description: </Text>
          <Text style={style.valueStyle}>{navParams?.description}</Text>
        {/* </View> */}
        

        {/* <View style={style.textViewStyle}>
          <Text style={style.headingStyle}>Due Date</Text>
          <Text style={style.valueStyle}>{navParams?.due date}</Text>
        </View> */}
      </View>
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
    width: width * 0.9,
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
export default connect(mapStateToProps, actions)(InvoiceDetail);
