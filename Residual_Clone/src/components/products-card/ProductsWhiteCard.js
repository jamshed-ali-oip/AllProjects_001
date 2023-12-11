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
import moment from 'moment';
import {themePurple} from '../../assets/colors';
import React from 'react';
const {height, width} = Dimensions.get('window');

const ProductsWhiteCard = ({item}) => {
  return (
    <View style={style.cardStyle}>
      {item?.Total_Investment && (
        <View style={style.textViewStyle}>
          <Text style={style.headingStyle}>Total Investment </Text>
          <Text style={style.valueStyle}>{`$${item?.Total_Investment}`}</Text>
        </View>
      )}
      {item?.Total_Earning && (
        <View style={style.textViewStyle}>
          <Text style={style.headingStyle}>Total Earning </Text>
          <Text style={style.valueStyle}>{`$${item?.Total_Earning}`}</Text>
        </View>
      )}
      {item?.Total_Earning_per && (
        <View style={style.textViewStyle}>
          <Text style={style.headingStyle}>Total Earning Per</Text>
          <Text style={style.valueStyle}>{`$${item?.Total_Earning_per}`}</Text>
        </View>
      )}
      <>
        {item?.Amazon_Investment && (
          <View style={style.textViewStyle}>
            <Text style={style.headingStyle}>Amazon Investment </Text>
            <Text
              style={style.valueStyle}>{`$${item?.Amazon_Investment}`}</Text>
          </View>
        )}
        {item?.Amazon_Earning && (
          <View style={style.textViewStyle}>
            <Text style={style.headingStyle}>Amazon Earning </Text>
            <Text style={style.valueStyle}>{`$${item?.Amazon_Earning}`}</Text>
          </View>
        )}
        {item?.Amazon_ROI && (
          <View style={style.textViewStyle}>
            <Text style={style.headingStyle}>Amazon ROI </Text>
            <Text style={style.valueStyle}>{`$${item?.Amazon_ROI}`}</Text>
          </View>
        )}
      </>

      <>
        {item?.Walmart_Investment && (
          <View style={style.textViewStyle}>
            <Text style={style.headingStyle}>Walmart Investment </Text>
            <Text style={style.valueStyle}>{`$${item?.Walmart_Investment}`}</Text>
          </View>
        )}

        {item?.Walmart_Earning && (
          <View style={style.textViewStyle}>
            <Text style={style.headingStyle}>Walmart Earning </Text>
            <Text style={style.valueStyle}>{`$${item?.Walmart_Earning}`}</Text>
          </View>
        )}
        {item?.Walmart_ROI && (
          <View style={style.textViewStyle}>
            <Text style={style.headingStyle}>Walmart ROI </Text>
            <Text style={style.valueStyle}>{`$${item?.Walmart_ROI}`}</Text>
          </View>
        )}
      </>
      {/* )} */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 10,
        }}>
        <Text style={style.valueStyle}>
          {`Last Updated: ${moment(item?.updated_at).format('MMM-DD-YYYY')}`}
        </Text>
      </View>
    </View>
  );
};

export default ProductsWhiteCard;

const style = StyleSheet.create({
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
      minHeight:height * 0.28,
    width: width * 0.95,
    backgroundColor: 'white',
    alignSelf: 'center',
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
});
