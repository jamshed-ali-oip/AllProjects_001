import React, {useState} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './card_style';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import colors from '../../assets/colors';
import IconComp from '../../components/IconComp';
import Button from '../../components/Button';
import Heading from '../../components/Heading';
const {height, width} = Dimensions.get('window');

const PaidInvoice = ({
  data,
  isLoading,
  searchText,
  setSearchText,
  _onPressSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  _onPressDateSearch,
  productType,
  _onPressTypeSearch,
  setProductType,
  UserReducer,
  _onPressGetAllInvoices,
  refreshing,
  onRefresh,
}) => {
  const isAdmin = UserReducer?.userData?.role_id === 1 ? true : false;
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [searchChoice, setSearchChoice] = useState('email');

  const renderItem = ({item, index}) => {
    // console.log(JSON.stringify(UserReducer,null,2));
    return (
      <View key={index} style={{}}>
        <LinearGradient
          colors={['#7124BC', '#437AD8', '#05F0FF']}
          style={style.gradient_btn}
          start={{y: 0.0, x: 0.001}}
          angleCenter={{x: 5, y: 0}}
          end={{y: 0.0, x: 1.1}}>
          {/* <MaterialIcon
            name={
              item.status === 'paid' ? 'arrow-top-right' : 'arrow-bottom-right'
            }
            style={style.icon}
            color={item.status === 'paid' ? '#5FB971' : '#D50101'}
          /> */}
          <View style={style.titles_view}>
            <Text style={style.main_title}>{item?.type}</Text>
            <Text style={style.sub_title}>
              {moment(item?.date).format('MMMM-DD-yyy')}
            </Text>
          </View>
          <Text style={style.main_title}>{`$${item?.amount?.toFixed(2)}`}</Text>
        </LinearGradient>
      </View>
    );
  };

  return (
    <>
      <>
        <Text style={styles.main_title}>Invoices</Text>
        <View style={styles.btnContainers}>
          {UserReducer?.userData?.role_id !== 3 && (
            <>
              <Button
                title="Search By Email"
                onBtnPress={() => setSearchChoice('email')}
                btnStyle={[
                  styles.btnStyle,
                  searchChoice === 'email' && {backgroundColor: 'orange'},
                ]}
                isBgColor={false}
                btnTextStyle={{
                  fontFamily: 'Poppins-SemiBold',
                  color: 'white',
                  fontSize: width * 0.04,
                }}
              />

              <Button
                title="Search By Date"
                onBtnPress={() => setSearchChoice('date')}
                btnStyle={[
                  styles.btnStyle,
                  {marginLeft: width * 0.04},
                  searchChoice === 'date' && {backgroundColor: 'orange'},
                ]}
                isBgColor={false}
                btnTextStyle={{
                  fontFamily: 'Poppins-SemiBold',
                  color: 'white',
                  fontSize: width * 0.04,
                }}
              />

              <Button
                title="Get All Invoices"
                onBtnPress={() => {
                  setSearchChoice('all');
                  _onPressGetAllInvoices();
                }}
                btnStyle={[
                  styles.btnStyle,
                  {marginLeft: width * 0.04},
                  searchChoice === 'all' && {backgroundColor: 'orange'},
                ]}
                isBgColor={false}
                btnTextStyle={{
                  fontFamily: 'Poppins-SemiBold',
                  color: 'white',
                  fontSize: width * 0.04,
                }}
              />
            </>
          )}
        </View>

        {searchChoice === 'email' && isAdmin ? (
          <>
            <TextInput
              placeholder="Search by email"
              value={searchText}
              style={styles.searchBox}
              onChangeText={text => setSearchText(text)}
            />
          </>
        ) : (
          searchChoice === 'date' && (
            <>
              <View style={[styles.rowView, {justifyContent: 'flex-start'}]}>
                <Heading title={'Start Date:'} passedStyle={styles.dateLabel} />
                <Heading
                  title={'End Date:'}
                  passedStyle={[styles.dateLabel, {marginLeft: width * 0.25}]}
                />
              </View>
              <View style={[styles.rowView, {marginBottom: height * 0.03}]}>
                {/* start date  */}

                <View style={styles.rowView}>
                  <TouchableOpacity
                    style={styles.datePickerView}
                    activeOpacity={0.7}
                    onPress={() => {
                      setShowStartDatePicker(true);
                    }}>
                    <Heading
                      title={moment(startDate).format('DD-MMM-YYYY')}
                      passedStyle={styles.additionalInfoText}
                    />
                  </TouchableOpacity>
                  <IconComp
                    type="Ionicons"
                    name="calendar"
                    iconStyle={styles.eventStyle}
                  />
                </View>

                {/* end date  */}
                <View style={styles.rowView}>
                  <TouchableOpacity
                    style={styles.datePickerView}
                    activeOpacity={0.7}
                    onPress={() => {
                      setShowEndDatePicker(true);
                    }}>
                    <Heading
                      title={moment(endDate).format('DD-MMM-YYYY')}
                      passedStyle={styles.additionalInfoText}
                    />
                  </TouchableOpacity>
                  <IconComp
                    type="Ionicons"
                    name="calendar"
                    iconStyle={styles.eventStyle}
                  />
                </View>
              </View>
            </>
          )
        )}
        {(searchChoice == 'email' || searchChoice === 'date') && isAdmin && (
          <TouchableOpacity
            onPress={
              searchChoice === 'email' ? _onPressSearch : _onPressDateSearch
            }
            style={styles.btnContainer}>
            <Text style={styles.btnText}>Search</Text>
          </TouchableOpacity>
        )}
      </>
      {isLoading ? (
        <View
          style={{
            marginTop: isAdmin ? height * 0.1 : height * 0.28,
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: width * 0.03,
            width: width * 0.63,
          }}>
          <LottieView
            speed={1}
            style={styles.lottieStyle}
            autoPlay
            loop
            source={require('../../assets/lottie/purple-loading-2.json')}
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
        <FlatList
          // data={[]}
          data={isLoading ? [] : data}
          renderItem={renderItem}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          keyExtractor={item => item?.id?.toString()}
          ListFooterComponent={() => {
            return (
              // []?.length === 0 && (
              data?.length === 0 ? (
                <View
                  style={[
                    styles.notFoundContainer,
                    {marginTop: isAdmin ? height * 0.1 : height * 0.35},
                  ]}>
                  <Text style={styles.noRecFound}>No Invoices Found!</Text>
                  {/* <Text style={styles.swipeText}>Swipe down to refresh</Text> */}
                </View>
              ) : (
                <View style={{marginBottom: 200}} />
              )
            );
          }}
        />
      )}

      {/* Start Date Picker  */}
      <DatePicker
        modal
        mode="date"
        open={showStartDatePicker}
        // minimumDate={startDate}
        date={startDate}
        onConfirm={date => {
          var tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
          setShowStartDatePicker(false);
          setStartDate(date);
          setEndDate(tomorrow);
        }}
        onCancel={() => {
          setShowStartDatePicker(false);
        }}
      />
      {/* End Date Picker  */}
      <DatePicker
        modal
        mode="date"
        minimumDate={endDate}
        open={showEndDatePicker}
        date={endDate}
        onConfirm={date => {
          setShowEndDatePicker(false);
          setEndDate(date);
        }}
        onCancel={() => {
          setShowEndDatePicker(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  swipeText: {
    color: 'white',
    fontSize: width * 0.045,
    fontFamily: 'Poppins-Regular',
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
    height: height * 0.38,
    // backgroundColor: 'red',
    // position: 'absolute',
    // top:100,
    marginTop: height * -0.055,
    // zIndex: 99999,
    // left: width * 0.04,
  },
  btnContainers: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: width * 0.9,
  },
  btnStyle: {
    backgroundColor: 'purple',
    borderRadius: width * 0.07,
    width: width * 0.43,
    margin: 0,
    borderRadius: 10,
    marginVertical: height * 0.01,
  },
  typeBtnStyle: {
    backgroundColor: 'white',
    borderRadius: width * 0.1,
    width: width * 0.35,
    margin: 0,
    // borderRadius: 10,
    marginVertical: height * 0.01,
  },
  // lottieStyle: {
  //   height: height * 0.4,
  //   // width:width * 0.3,
  //   // marginTop:100,
  //   position: 'absolute',
  //   // backgroundColor: 'red',
  //   // bottom: height * 0.032,
  //   top: height * 0.21,
  //   zIndex: 9999,
  //   // left: width * 0.01,
  // },
  main_title: {
    fontSize: width * 0.06,
    color: 'white',
    marginBottom: 30,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginTop: 20,
  },
  eventStyle: {
    color: 'white',
    fontSize: width * 0.07,
    alignSelf: 'center',
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.02,
    // backgroundColor: 'rgba(0,0,0,0.03)',
  },
  main_title_sec: {
    fontSize: width * 0.06,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    flexWrap: 'wrap',
    textAlign: 'left',
    marginBottom: 15,
    paddingLeft: width * 0.1,
  },
  btnContainer: {
    width: width * 0.3,
    height: height * 0.06,
    backgroundColor: '#5BBBF2',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.04,
    marginBottom: height * 0.02,
    marginRight: width * 0.05,
  },
  btnText: {
    color: 'white',
    fontSize: width * 0.045,
    alignSelf: 'center',
  },
  searchBox: {
    width: width * 0.9,
    paddingHorizontal: width * 0.03,
    height: height * 0.07,
    backgroundColor: 'white',
    borderRadius: width * 0.03,
    alignSelf: 'center',
    marginVertical: height * 0.02,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  additionalInfoText: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: width * 0.04,
  },
  dateLabel: {
    color: 'white',
    fontSize: width * 0.04,
  },
  datePickerView: {
    // marginVertical: height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.34,
    borderRadius: width * 0.04,
    borderWidth: 1.2,
    height: height * 0.06,
    backgroundColor: 'white',
    borderColor: colors.themePurple1,
  },
});

const mapStateToProps = ({UserReducer}) => {
  return {
    UserReducer,
  };
};
export default connect(mapStateToProps, null)(PaidInvoice);

{
  /* <Button
                title="Search By Type"
                onBtnPress={() => setSearchChoice('type')}
                btnStyle={[
                  styles.btnStyle,
                  searchChoice === 'type' && {backgroundColor: 'orange'},
                ]}
                isBgColor={false}
                btnTextStyle={{
                  fontFamily: 'Poppins-SemiBold',
                  color: 'white',
                  fontSize: width * 0.04,
                }}
              /> */
}

// : (
//   <View
//     style={[
//       styles.rowView,
//       {justifyContent: 'space-around', marginBottom: height * 0.03},
//     ]}>
//     <Button
//       title="Walmart"
//       onBtnPress={() => setProductType('Walmart')}
//       btnStyle={[
//         styles.typeBtnStyle,
//         productType === 'Walmart' && {backgroundColor: 'green'},
//       ]}
//       isBgColor={false}
//       btnTextStyle={{
//         fontFamily: 'Poppins-SemiBold',
//         color: productType === 'Walmart' ? 'white' : 'purple',
//         fontSize: width * 0.04,
//       }}
//     />
//     <Button
//       title="Amazon"
//       onBtnPress={() => setProductType('Amazon')}
//       btnStyle={[
//         styles.typeBtnStyle,
//         productType === 'Amazon' && {backgroundColor: 'green'},
//       ]}
//       isBgColor={false}
//       btnTextStyle={{
//         fontFamily: 'Poppins-SemiBold',
//         color: productType === 'Amazon' ? 'white' : 'purple',
//         fontSize: width * 0.04,
//       }}
//     />
//   </View>
// )
