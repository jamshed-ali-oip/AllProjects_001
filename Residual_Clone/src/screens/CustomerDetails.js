import {
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  View,
  ImageBackground,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {themePurple} from '../assets/colors/colors';
import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';
import IconComp from '../components/IconComp';
import ProductsWhiteCard from '../components/products-card/ProductsWhiteCard';
const image = require('../assets/images/login_bg.png');

const {width, height} = Dimensions?.get('window');

const CustomerDetails = ({route, UserReducer, navigation}) => {
  const data = route.params.item;
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  console.log(data?.customer?.email);
  return (
    // <ImageBackground source={image} resizeMode="cover" style={{flex: 1}}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: themePurple}}>
      {Platform.OS === 'android' && (
        <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
          <StatusBar
            translucent
            backgroundColor={themePurple}
            barStyle="light-content"
          />
        </View>
      )}

      {/* User Image  */}
      <Image
        source={
          data?.customer?.profile_image !== '' &&
          data?.customer?.profile_image !== undefined &&
          data?.customer?.profile_image !== null
            ? {uri: data?.customer?.profile_image}
            : require('../assets/images/test.png')
        }
        style={{
          width: width,
          height: height * 0.5,
        }}
      />

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.goBack()}
        style={{
          zIndex: 9999,
          position: 'absolute',
          top: Platform?.OS == 'android' ? height * 0.11 : height * 0.07,
          left: width * 0.03,
          backgroundColor: themePurple,
          paddingHorizontal: width * 0.01,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: width * 0.02,
          borderWidth:1,
          borderColor:'grey',
          paddingVertical: height * 0.01,
        }}>
        <IconComp
          type={'Ionicons'}
          iconName="chevron-back-sharp"
          passedStyle={{color: 'white', fontSize: width * 0.05}}
        />
        <Text
          style={{
            color: 'white',
            fontSize: width * 0.045,
            paddingRight: width * 0.02,
          }}>
          Customers
        </Text>
      </TouchableOpacity>

      {/* Name And Email Container  */}
      <View style={styles.textContainer}>
        <Text style={styles.nameStyles}>
          {data?.customer?.first_name == undefined ||
          data?.customer?.last_name == undefined ||
          data?.customer?.first_name == '' ||
          data?.customer?.first_name == '' ||
          data?.customer?.first_name == null ||
          data?.customer?.first_name == null
            ? 'No Name'
            : `${data?.customer?.first_name} ${data?.customer?.last_name}`}
        </Text>
        <Text style={styles.emailStyles}>
          {data?.email == '' || data?.email == undefined || data?.email == null
            ? 'No Email-Address'
            : data?.email}
        </Text>
      </View>

      <View style={styles.allAttrs}>
        <View style={styles.attrContainer}>
          <IconComp
            type={'FontAwesome'}
            iconName="map-marker"
            passedStyle={{color: themePurple, fontSize: width * 0.09}}
          />
          <Text
            style={{
              fontSize: width * 0.045,
              marginLeft: width * 0.03,
              fontFamily: 'Poppins-Medium',
            }}>
            {data?.customer?.city == '' ||
            data?.customer?.city == undefined ||
            data?.customer?.city == null ||
            data?.customer?.country == '' ||
            data?.customer?.country == undefined ||
            data?.customer?.country == null ||
            data?.customer?.state == '' ||
            data?.customer?.state == undefined ||
            data?.customer?.state == null
              ? 'No Location Description Available'
              : `${data?.customer?.city}, ${data?.customer?.country}, ${data?.customer?.state}`}
          </Text>
        </View>

        <View style={styles.attrContainer}>
          <IconComp
            type={'FontAwesome'}
            iconName="mobile-phone"
            passedStyle={{
              color: themePurple,
              fontSize: width * 0.09,
              marginLeft: 5,
            }}
          />
          <Text
            style={{
              fontSize: width * 0.045,
              marginLeft: width * 0.03,
              fontFamily: 'Poppins-Medium',
            }}>
            {data?.customer?.phone == '' ||
            data?.customer?.phone == null ||
            data?.customer?.phone == undefined
              ? 'No Contact Available'
              : data?.customer?.phone}
          </Text>
        </View>

        <View style={styles.attrContainer}>
          <IconComp
            type={
              data?.customer?.status === 1 ? 'FontAwesome' : 'MaterialIcons'
            }
            iconName={data?.customer?.status === 1 ? 'check-circle' : 'cancel'}
            passedStyle={{
              color: data?.customer?.status === 1 ? 'green' : 'maroon',
              fontSize: width * 0.08,
            }}
          />
          <Text
            style={{
              fontSize: width * 0.045,
              marginLeft: width * 0.01,
              fontFamily: 'Poppins-Medium',
            }}>
            {data?.customer?.status === 1
              ? 'Account Activated'
              : 'Account Deactivated'}
          </Text>
        </View>

        <ProductsWhiteCard item={data?.sheet} />
      </View>
    </ScrollView>
    // </ImageBackground>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, actions)(CustomerDetails);

const styles = StyleSheet.create({
  allAttrs: {
    paddingTop: height * 0.02,
    marginTop: height * -0.03,
    // height: height * 0.5,
    backgroundColor: 'white',
    borderTopLeftRadius: width * 0.08,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 25,
    borderTopRightRadius: width * 0.08,
  },
  attrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.01,
    // backgroundColor:'red',
    marginHorizontal: width * 0.05,
  },
  textContainer: {
    paddingVertical: height * 0.01,
    position: 'absolute',
    top: Platform.OS == 'android' ?height * 0.37: height * 0.34,
    left: width * 0.05,
    paddingHorizontal: width * 0.045,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
  },
  nameStyles: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: width * 0.07,
    textTransform: 'capitalize',
  },
  emailStyles: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.04,
    // marginTop: height * -0.01,
  },
});
