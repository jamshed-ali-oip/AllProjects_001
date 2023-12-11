import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions?.get('window');

const CustomersRender = ({item, index, onPress}) => {
  return (
    item?.role_id === 3 && (
      <TouchableOpacity key={index} activeOpacity={0.5} onPress={() =>onPress(item)}>
        <LinearGradient
           colors={['#74B5E8', '#9974F2', '#E43DEC']}
          style={style.gradient_btn}
          start={{y: 0.0, x: 0.001}}
          angleCenter={{x: 5, y: 0}}
          end={{y: 0.0, x: 1.1}}>
          <Image
            source={
              item?.customer?.profile_image !== undefined &&
              item?.customer?.profile_image !== null &&
              item?.customer?.profile_image !== ''
                ? {
                    uri: item?.customer?.profile_image,
                  }
                : require('../assets/images/app-logo.png')
            }
            resizeMode="contain"
            style={style.imageStyle}
          />
          <View style={style.titles_view}>
            <Text style={style.main_title}>
              {item?.customer?.first_name == undefined ||
              item?.customer?.last_name == undefined ||
              item?.customer?.first_name == '' ||
              item?.customer?.first_name == '' ||
              item?.customer?.first_name == null ||
              item?.customer?.first_name == null
                ? 'No Name'
                : `${item?.customer?.first_name} ${item?.customer?.last_name}`}
            </Text>
            <Text style={style.sub_title}>
              {item?.email == undefined ||
              item?.email == '' ||
              item?.email == null
                ? 'No Email'
                : item?.email}
            </Text>
            <Text style={style.main_title}>
              {item?.customer?.phone == undefined ||
              item?.customer?.phone == '' ||
              item?.customer?.phone == null
                ? 'No Phone'
                : item?.customer?.phone}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    )
  );
};

export default CustomersRender;

StyleSheet.create({});

const style = StyleSheet.create({
  imageStyle: {
    width: width * 0.15,
    height: height * 0.08,
    borderRadius: width * 0.05,
  },
  gradient_btn: {
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.05,
    borderRadius: 25,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.02,
  },
  icon: {
    width: width * 0.14,
    height: width * 0.14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
    lineHeight: width * 0.14,
    fontSize: width * 0.13,
    borderRadius: 12,
  },
  titles_view: {
    flex: 1,
    paddingLeft: width * 0.03,
  },
  main_title: {
    fontSize: width * 0.04,
    textTransform: 'capitalize',
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  sub_title: {
    fontSize: width * 0.035,
    color: '#fff',
    marginTop: width * 0.001,
    fontFamily: 'Poppins-Bold',
  },
});
