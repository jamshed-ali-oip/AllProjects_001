import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import Heading from '../components/Heading';
import car from '../assets/Car.png';
import battery from '../assets/Battery.png';
import wheel from '../assets/Wheel.png';
import construction from '../assets/Construction.png';
import fuel_Out from '../assets/FuelOut.png';
import malfunction from '../assets/Malfunction.png';
import Header from '../components/Header';
import IconComp from '../components/IconComp';
import OptionsMapper from '../components/OptionsMapper';
import colors from '../assets/colors';
import Button from '../components/Button';
import ServiceModal from '../components/ServiceModal';
import CustomDropdownModal from '../components/CustomDropdownModal';
import { connect } from 'react-redux';
import * as actions from "../store/Actions"
import Toast from 'react-native-toast-message';
import Loader from "../components/Loader"
import { imgUrl } from "../config/keys.json"

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function AllServices({ navigation, services, allServices, getServices, getAllServices, user, addService, deleteService }) {
  const [options, setOptions] = useState(dummyOptions);
  // const [services,setServices] = useState(dummyServices)
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceId, setServiceId] = useState(null);
  const [showDropDownModal, setShowDropDownModal] = useState(false);
  const [showAddNewserviceModal, setShowAddNewserviceModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);




  // Options Handler
  const _onPressOptions = (item, index) => {
    setIsUpdating(true);
    setServiceId(item.service_id);
    setServiceName({ ...item, id: item._id });
    setServicePrice(item.price.toString());
    setShowAddNewserviceModal(true);
  };

  // Update Service Name
  const _onPressUpdateService = () => {
    let index = options.findIndex(ele => ele._id === serviceId);
    let copyItem = {
      ...options[index],
      text: serviceName,
      price: servicePrice,
    };
    let copyArray = [...options];
    copyArray[index] = copyItem;
    setOptions(copyArray);
    console.log(JSON.stringify(options, null, 2));
    setShowAddNewserviceModal(false);
    setServiceName('');
    setServicePrice('');
  };

  // add new service handler
  const _onPressAddNewService = () => {
    // let newService = {
    //   _id: Math.floor(Math.random(10 * 0.01)),
    //   text: serviceName,
    //   price: servicePrice,
    //   image: require('../assets/Images/services/towing.png'),
    // };
    // let copyArray = [{...newService}, ...options];
    // setOptions(copyArray);
    // console.log({copyArray});
    // setShowAddNewserviceModal(false);
    // console.log(servicePrice,serviceName)
    setAddLoading(true)
    addService({ price: servicePrice, service_id: serviceName.id, user_id: user?.data.id })
      .then((res) => {
        console.log(res.data)
        setAddLoading(false)
        getServices(user.data.id)
        Toast.show({ type: 'success', text1: "Added Successfully" })
        setShowAddNewserviceModal(false);
        setServiceName("")
        setServicePrice("")
      })
  };

  // on service item selection
  const _onDropdownSelectionPress = service => {
    setShowDropDownModal(false);
    setServiceName(service);
    setShowAddNewserviceModal(true);
  };

  // Delete Service Item
  const _onPressDeleteService = () => {
    // let copyArray = [...options];
    // let index = options.findIndex(ele => ele._id === serviceId);
    // copyArray.splice(index, 1);
    // console.log({copyArray});
    // setOptions(copyArray);
    setDelLoading(true)
    deleteService({
      user_id: user.data?.id,
      service_id: serviceName.id
    }).then(() => {
      getServices(user.data.id)
      setDelLoading(false)
      setShowAddNewserviceModal(false);
      Toast.show({ type: 'success', text1: "Deleted Successfully" })
      setServiceName("")
      setServicePrice("")

    }).catch(err=>{
      setLoading(false)
      console.log(err)
    })
    // setServiceName('');
    // setServicePrice('');
  };

  // useEffect(() => {
  //   const r = services.filter(
  //     elem => !options.find(({_id}) => elem._id === _id) && elem._id,
  //   );

  //   setServices(r);
  // }, []);

  useEffect(() => {
    setLoading(true)
    Promise.all([getServices(user.data.id), getAllServices()]).then(() => setLoading(false))
  }, [])

  //   var filteredKeywords = services.filter(
  //     (word) => {
  //       !options.includes(word._id)}
  //   );

  //   // console.log(filteredKeywords);

  //   // var obj = { a: 'test1', b: 'test2' };
  // if (Object.values(obj).indexOf('test1') > -1) {
  //    console.log('has test1');
  // }

  if (loading) {
    return <Loader />
  }
  return (
    <View style={styles.container}>
      <Header
        showBack={true}
        navigation={navigation}
        iconName="arrow-back"
      />
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      {/* <View style={styles.centerView}>
          <Heading title="All Services" passedStyle={styles.heading} />
        </View> */}
      {/* <View style={styles.container}>
          {boxes_data.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  _onPress();
                }}>
                <View style={styles.boxContainer}>
                  <Image source={item.image} />
                </View>
                <View style={styles.texticonhandler}>
                  <Text style={styles.text}>{item.title}</Text>
                  <IconComp
                    iconName="arrow-with-circle-right"
                    type={'Entypo'}
                    passedStyle={styles.icon}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View> */}
      <FlatList
        nestedScrollEnabled={true}
        vertical
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContentContainerStyle}
        data={services?.map(item => ({
          _id: item.services.id,
          services_name: item.services.services_name,
          image: imgUrl + item.services.services_icon + "/" + item.services.services_icon,
          price: item.price ? item.price : 0,
        }))}
        keyExtractor={item => item?._id.toString()}
        ListHeaderComponentStyle={styles.flatlistHeaderStyle}
        ListFooterComponent={() => {
          return (
            <Button
              title="ADD NEW SERVICE"
              onBtnPress={() => {
                setIsUpdating(false);
                setShowAddNewserviceModal(true);
              }}
              isBgColor={false}
              btnStyle={styles.btnSignUpStyle}
              btnTextStyle={styles.btnSignUpTextStyle}
            />
          );
        }}
        ListFooterComponentStyle={{
          marginTop: height * 0.05,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        ListHeaderComponent={() => (
          <Heading
            title="My Services"
            passedStyle={styles.heading}
            fontType="bold"
          />
        )}
        renderItem={({ item, index }) => (
          <OptionsMapper item={item} index={index} onPress={_onPressOptions} />
        )}
      />
      {showAddNewserviceModal && (
        <ServiceModal
          isUpdating={isUpdating}
          serviceName={serviceName}
          setServiceName={setServiceName}
          servicePrice={servicePrice}
          setServicePrice={setServicePrice}
          isModalVisible={showAddNewserviceModal}
          setIsModalVisible={setShowAddNewserviceModal}
          addLoading={addLoading}
          delLoading={delLoading}
          setShowDropDownModal={setShowDropDownModal}
          _onPressAddNewService={_onPressAddNewService}
          _onPressUpdateService={_onPressUpdateService}
          _onPressDeleteService={_onPressDeleteService}
        />
      )}

      {showDropDownModal && (
        <CustomDropdownModal
          array={allServices}
          onPress={_onDropdownSelectionPress}
          isModalVisible={showDropDownModal}
          setIsModalVisible={setShowDropDownModal}
        />
      )}
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  btnSignUpStyle: {
    backgroundColor: colors.themeBlue,
    borderRadius: width * 0.4,
    width: width * 0.6,
    borderWidth: 1,
    borderColor: colors.themeBlue,
  },
  btnSignUpTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
    fontFamily: 'Montserrat-Bold',
  },
  flatlistHeaderStyle: {
    alignSelf: 'flex-start',
    marginHorizontal: width * 0.05,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    // marginHorizontal: width * 0.06,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  centerView: {
    marginHorizontal: width * 0.05,
  },
  heading: {
    fontSize: width * 0.1,
  },
  boxContainer: {
    borderRadius: width * 0.02,
    height: height * 0.2,
    width: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    // paddingHorizontal: width * 0.2,
    // paddingVertical: height * 0.005,
  },

  text: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: width * 0.02,
  },
  texticonhandler: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  flatListContentContainerStyle: {
    // alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingBottom: 100,
  },
  icon: {
    // marginRight: width * 0.8,
  },
});

function mapStateToProps({ services, allServices, user }) {
  return { services, allServices, user }
}
export default connect(mapStateToProps, actions)(AllServices);

const dummyOptions = [
  {
    _id: 1,
    text: 'towing',
    image: require('../assets/Images/services/towing.png'),
    price: 10,
  },
  {
    _id: 2,
    text: 'battery',
    image: require('../assets/Images/services/battery.png'),
    price: 20,
  },
  {
    _id: 3,
    text: 'accident',
    image: require('../assets/Images/services/accident.png'),
    price: 30,
  },
  {
    _id: 4,
    text: 'flat tyre',
    image: require('../assets/Images/services/flattyre.png'),
    price: 40,
  },
  {
    _id: 5,
    text: 'fuel out',
    image: require('../assets/Images/services/fuelout.png'),
    price: 50,
  },
  {
    _id: 6,
    text: 'malfunction',
    image: require('../assets/Images/services/malfunction.png'),
    price: 60,
  },
];

const dummyServices = [
  {
    _id: 1,
    text: 'towing',
    image: require('../assets/Images/services/towing.png'),
    price: 1450,
  },
  {
    _id: 2,
    text: 'battery',
    image: require('../assets/Images/services/battery.png'),
    price: 2450,
  },
  {
    _id: 66,
    label: 'Hybrid Battery',
    image: require('../assets/Images/services/towing.png'),
    price: 1340,
  },
  {
    _id: 34,
    label: 'Transmission Control',
    image: require('../assets/Images/services/towing.png'),
    price: 100,
  },
  {
    _id: 333,
    label: 'Radiator Jam',
    image: require('../assets/Images/services/towing.png'),
    price: 180,
  },
  {
    _id: 412,
    label: 'Electronic Blinkings',
    image: require('../assets/Images/services/towing.png'),
    price: 160,
  },
  {
    _id: 512,
    label: 'Braking Faults',
    image: require('../assets/Images/services/towing.png'),
    price: 110,
  },
  {
    _id: 612,
    label: 'Clutch Mishandling',
    image: require('../assets/Images/services/towing.png'),
    price: 150,
  },
  {
    _id: 712,
    label: 'Sensor Repairing',
    image: require('../assets/Images/services/towing.png'),
    price: 120,
  },
];
