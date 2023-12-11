import React, { useEffect, useState } from 'react';

import {
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  Image
} from 'react-native';
import Header from '../components/Header';
import HistoryModal from '../components/HistoryModal';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
const { width, height } = Dimensions.get('window');
import { connect } from "react-redux"
import * as actions from '../store/Actions/index';
import Loader from "../components/Loader"
import { imageUrl2 } from "../configurations/config"
import { Rating, AirbnbRating } from 'react-native-ratings';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import colors from '../assets/colors';
import invoice from "../utils/invoice"

const HistoryScreen = ({
  UserReducer,
  allBooking,
  getAllBooking,
  navigation
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const onItemPress = (item, index) => {
    setModalData(item);
    setIsModalVisible(true);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsLoading(true)
      const data = {
        user_id: UserReducer?.userData?.id,
        role: 2,
      };
      getAllBooking(data).then(() => setIsLoading(false));
    });

    return unsubscribe;
  }, [navigation]);
  if (isLoading) {
    return <Loader />
  }

  async function generatePDF(data) {
    let options = {
      html: invoice(data,UserReducer?.userData),
      fileName: data.services[0]?.services_name,
    }
    let file = await RNHTMLtoPDF.convert(options)
    await RNPrint.print({ filePath: file.filePath })
  }
  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Header  */}
          <Header
            showBack={true}
            navigation={navigation}
            iconName="arrow-back"
          />

          {/* Screen Heading  */}
          <View style={{ flexDirection: 'row' }}>
            <Heading
              title="History"
              passedStyle={styles.heading}
              fontType="bold"
            />
          </View>

          <FlatList
            data={allBooking?.reverse()}
            vertical
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.flatListContentContainerStyle}
            ListEmptyComponent={() => {
              return (
                <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>No data Found</Text>
                </View>
              )
            }}
            renderItem={({ item, index }) => (
              // <TouchableOpacity
              //   key={index}
              //   style={styles.rowView}
              //   onPress={() => onItemPress(item, index)}>
              //     <View>
              //       <Text>{item.service_proivder[0].name}</Text>
              //     </View>
              // </TouchableOpacity>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 9,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                  padding: 10,
                  borderRadius: width * 0.02,
                  marginVertical: 10,
                  paddingTop: 0
                }}
              >
                <View

                  style={{
                    borderBottomColor: 'lightgray',
                    borderBottomWidth: 1,
                    padding: 5,
                    marginVertical: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                  <Text style={{ color: colors.themeBlue, fontWeight: 'bold', fontSize: 18, textTransform: 'capitalize' }}>{item.service_proivder[0]?.name}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={(item.service_proivder[0]?.profile_image) ? { uri: imageUrl2 + "/" + item.service_proivder[0]?.profile_image } : require('../assets/user.png')}
                      style={{ width: 60, height: 60, borderRadius: 30 }}
                    />
                    <Text style={{ color: 'black', fontWeight: 'bold', textTransform: 'capitalize', marginTop: 5, fontSize: 12 }}></Text>
                  </View>
                  <View style={{ width: '60%', justifyContent: 'center' }}>
                    <View>
                      <Text style={{ color: 'black', fontSize: 12 }}>Price:<Text style={{ color: 'green' }}> ${ item?.get_services_prvider_price?.filter(it=>it.service_id==item?.services[0].id)[0]?.price}</Text></Text>
                      <Text style={{ color: 'black', fontSize: 12 }}>Service: {item.services[0]?.services_name} </Text>
                      <Text style={{ color: 'black', fontSize: 12 }}>Phone No: {item.service_proivder[0]?.phone}</Text>
                      {
                        item.bookingrating?.length > 0 ? (
                          <View style={{ alignItems: 'flex-start' }}>
                            <Rating
                              startingValue={item.bookingrating[0]?.rating}
                              readonly={true}
                              imageSize={20}
                            />
                          </View>
                          // <Text style={{ color: 'black', fontSize: 12 }}>Rating: {item.bookingrating[0]?.rating}</Text>
                        ) : null
                      }
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    generatePDF(item)
                  }}
                  style={{ backgroundColor: colors.themeBlue, justifyContent: 'center', alignItems: 'center', borderRadius: 5, padding: 10 }}>
                  <Text style={{ color: 'white' }}>Generate or Print Invoice</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </SafeAreaView>
      </View>
      {isModalVisible && (
        <HistoryModal
          data={modalData}
          showModal={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ UserReducer, allBooking }) => {
  return {
    UserReducer,
    allBooking,
  };
};
export default connect(mapStateToProps, actions)(HistoryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    color: 'black',
    marginLeft: 20,
    fontSize: width * 0.1,
    // marginTop: height * 0.04,
  },
  heading1: {
    marginTop: height * 0.05,
    // marginLeft: width * 0.04,
    // marginRight: width * 0.09,
    fontSize: width * 0.06,
    color: 'black',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: height * 0.013,
  },
  flatListContentContainerStyle: {

  },
  tableHeadings: {
    marginHorizontal: width * 0.1,
    marginVertical: height * 0.01,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: height * 0.009,
  },
  textStyle: {
    color: 'rgba(0,0,0,0.7)',
    textTransform: 'capitalize',
    fontSize: width * 0.045,
  },
});

const dummyData = [
  {
    _id: 1,
    text: 'flat tire',
    price: 5,
    location:
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  },
  {
    _id: 2,
    text: 'battery',
    price: 20,
    location:
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  },
  {
    _id: 3,
    text: 'accident',
    price: 200,
    location:
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  },
  {
    _id: 4,
    text: 'fuel out',
    location:
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',

    price: 10,
  },
  {
    _id: 5,
    text: 'towing',
    location:
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',

    price: 30,
  },
  {
    _id: 6,
    text: 'malfunction',
    location:
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',

    price: 5,
  },
];
