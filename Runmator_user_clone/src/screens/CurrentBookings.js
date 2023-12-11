import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import BookingMapper from '../components/BookingMapper';
import colors from '../assets/colors';
import Loader from "../components/Loader"

const {width, height} = Dimensions.get('window');

const CurrentBookings = ({
  navigation,
  getCurrentBookings,
  UserReducer,
  allBooking,
  getAllBooking
}) => {
  useEffect(() => {
    setIsLoading(true)
    const data = {
      user_id: UserReducer?.userData?.id,
      role: 2,
    };
    getAllBooking(data).then(()=>setIsLoading(false));
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  if(isLoading){
    return <Loader/>
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <Header title="Current Bookings" navigation={navigation} />
        <FlatList
          data={[1,2,3]}
          // data={BookingsReducer?.currentBookings}
          renderItem={({item, index}) => (
            <BookingMapper item={item} index={index} isLoading={isLoading}/>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = ({UserReducer, allBooking}) => {
  return {
    UserReducer,
    allBooking,
  };
};
export default connect(mapStateToProps, actions)(CurrentBookings);

const styles = StyleSheet.create({ container: {
  flex: 1,
  backgroundColor: 'white',
},
heading: {
  color: 'black',
  marginLeft: width * 0.08,
  fontSize: width * 0.08,
},
heading2: {
  color: colors.themeBlue,
  fontSize: width * 0.1,
},
flatListContentContainerStyle: {
  marginHorizontal: width * 0.05,
},
textStyle: {
  color: 'rgba(0,0,0,0.7)',
  textTransform: 'capitalize',
  fontSize: width * 0.045,
},});
