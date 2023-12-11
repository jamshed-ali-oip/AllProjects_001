import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
const {height, width} = Dimensions.get('window');

const InvoiceMapper = ({item, index, navigation}) => {
  return (
    <TouchableOpacity
      key={index}
      onPress={() => navigation.navigate('InvoiceDetail', {item: item})}
      activeOpacity={0.8}>
      {item?.Status == null ? (
        <LinearGradient
        
        colors={['#74B5E8', '#9974F2', '#E43DEC']}
          style={style.gradient_btn}
          start={{y: 0.0, x: 0.001}}
          angleCenter={{x: 5, y: 0}}
          end={{y: 0.0, x: 1.1}}
          >
          {/* <MaterialIcon
            name={
              item.status === 'paid' ? 'arrow-top-right' : 'arrow-bottom-right'
            }
            style={style.icon}
            color={item.status === 'paid' ? '#5FB971' : '#D50101'}
          /> */}
          <Image
            style={{height: 50, width: 50}}
            source={require('../../assets/images/pending.png')}
          />
          <View style={style.titles_view}>
           
            <Text style={style.main_title}>{item?.customer ? item?.customer:"No Name"}</Text>

            <Text style={style.sub_title}>
              {item?.customer_email}
            </Text>
            <Text style={style.sub_title}>
              {item?.product}
            </Text>
            <Text style={style.sub_title}>
            {moment(item?.created_at).format('DD, MMMM yyy')}
            </Text>
            <Text
              style={[
                style.main_title,
                {alignSelf: 'flex-end', position: 'absolute', marginTop: 15},
              ]}>{`$${item?.amount}`}</Text>
          </View>
          {/* <Text style={style.main_title}>{`$${item?.amount?.toFixed(2)}`}</Text> */}
        </LinearGradient>
      ) : null}
    </TouchableOpacity>
  );
};
export default InvoiceMapper;

const style = StyleSheet.create({
  gradient_btn: {
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.05,
    borderRadius: 25,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.045,
  },
  titles_view: {
    flex: 1,
    paddingLeft: width * 0.03,
  },
  main_title: {
    fontSize: width * 0.04,
    textTransform: 'uppercase',
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
