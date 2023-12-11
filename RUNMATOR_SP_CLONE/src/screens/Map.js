// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import React, {useRef, useState} from 'react';
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
// import {
//   StyleSheet,
//   Platform,
//   Dimensions,
//   View,
//   TouchableOpacity,
//   Linking,
//   Image,
// } from 'react-native';
// import colors from '../assets/colors';
// import Map_img from '../assets/Map.png';
// import Button from '../components/Button';
// import userimg from '../assets/Images/user_image.png';
// import IconComp from '../components/IconComp';
// import Header from '../components/Header';
// import Heading from '../components/Heading';
// import BottomSheet from '../components/BottomSheet';

// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

// const Map = ({navigation}) => {
//   const [modalData, setModalData] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState('030322221112');
//   const sheetRef = useRef();

//   // Option Press Handler
//   const onItemPress = (item, index) => {
//     setModalData(item);
//     // setIsModalVisible(true);
//     sheetRef.current.open();
//   };

//   const _onPressStartTracking = () => {
//     console.log('start tracking');
//     sheetRef.current.close();
//   };

//   const _onPressCallNow = () => {
//     Linking.openURL(`tel:${phoneNumber}`);
//   };

//   // Current Location
//   const _onPressCurrentLoc = () => {
//     console.log('Curr location');
//   };
//   return (
//     <View style={styles.container}>
//       {/* <Image source={Map_img} style={StyleSheet.absoluteFillObject} /> */}
//       <Header showBack={true} navigation={navigation} iconName="arrow-back" />
//       <MapView
//         style={{flex: 1}}
//         provider={PROVIDER_GOOGLE}
//         showsUserLocation
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       />

//       <View style={styles.contentContainer}>
//         {/* Selected Rider View  */}
//         <View>
//           {/* Selected Rider Popup  */}
//           <TouchableOpacity style={styles.boxContainer} activeOpacity={0.8}>
//             <View style={styles.rowView}>
//               <Image source={userimg} />
//               <View>
//                 <Heading
//                   passedStyle={styles.text}
//                   title={'Michael Reimer'}
//                   fontType="bold"
//                 />
//                 <Heading
//                   passedStyle={styles.textMechanic}
//                   title={'Mechanic'}
//                   fontType="medium"
//                 />
//               </View>
//             </View>

//             <IconComp
//               iconName="chevron-with-circle-right"
//               type={'Entypo'}
//               passedStyle={styles.icon_style}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Current Location & Confirm Button Container  */}
//         <View>
//           {/* Current Location  */}
//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() => _onPressCurrentLoc}
//             style={styles.boxContainer2}>
//             <IconComp
//               iconName="my-location"
//               type={'MaterialIcons'}
//               passedStyle={{fontSize: width * 0.07}}
//             />
//           </TouchableOpacity>

//           {/* Confirm Button  */}
//           <Button
//             title="CONFIRM"
//             onBtnPress={() => onItemPress()}
//             isBgColor={false}
//             btnStyle={styles.btnStyle}
//             btnTextStyle={styles.btnTextStyle}
//           />
//         </View>
//       </View>

//       {/* Bottom Sheet Component  */}
//       <BottomSheet
//         sheetRef={sheetRef}
//         onPress={_onPressStartTracking}
//         onPressCallNow={_onPressCallNow}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   locationIcon: {
//     color: 'gray',
//     alignSelf: 'center',
//     fontSize: width * 0.052,
//     paddingLeft: width * 0.03,
//     // backgroundColor:'red'
//   },
//   contentContainer: {
//     flex: 1,
//     marginHorizontal: width * 0.05,
//     justifyContent: 'space-between',
//     marginVertical: height * 0.03,
//   },
//   btnStyle: {
//     backgroundColor: colors.themeBlue,
//     borderRadius: width * 0.02,
//     width: width * 0.9,
//     margin: 0,
//     marginTop: height * 0.03,
//   },
//   rowView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   btnTextStyle: {
//     color: 'white',
//     fontSize: width * 0.04,
//     fontFamily: 'Montserrat-Bold',
//   },
//   image: {
//     width: width,
//     height: height * 0.92,
//     alignItems: 'center',
//   },

//   boxContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: width * 0.05,
//     justifyContent: 'space-between',
//     borderRadius: width * 0.02,
//     height: height * 0.13,
//     width: width * 0.9,
//     marginTop: height * 0.12,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       height: 9,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,

//     elevation: 5,
//     backgroundColor: '#fff',
//   },

//   boxContainer2: {
//     borderRadius: width * 0.02,
//     height: height * 0.07,
//     width: width * 0.15,
//     alignItems: 'center',
//     alignSelf: 'flex-end',
//     justifyContent: 'center',
//     // marginLeft: width * 0.6,
//     shadowColor: '#000',
//     shadowOffset: {
//       height: 9,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,

//     elevation: 5,
//     backgroundColor: '#fff',
//   },

//   text: {
//     fontSize: height * 0.025,
//     color: 'black',
//     marginLeft: width * 0.03,
//   },

//   textMechanic: {
//     fontSize: height * 0.017,
//     color: 'gray',
//     marginLeft: width * 0.03,
//   },

//   icon_style: {
//     marginLeft: width * 0.14,
//   },

//   header: {
//     backgroundColor: 'white',
//   },
// });

// export default Map;

// {
//   /* <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginLeft: width * 0.05,
//         }}>
//         <GooglePlacesInput />
//         <IconComp
//           iconName="location-pin"
//           type={'MaterialIcons'}
//           passedStyle={{
//             marginRight: width * 0.87,
//             marginTop: height * 0.04,
//             color: 'grey',
//           }}
//         />
//       </View> */
// }

import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Linking,
  Image,
  Text,
} from 'react-native';
// import colors from '../assets/colors';
import Button from '../components/Button';
import userimg from '../assets/Images/user_image.png';
import IconComp from '../components/IconComp';
import Header from '../components/Header';
import Heading from '../components/Heading';
import BottomSheet from '../components/BottomSheet';
import MapView, { Circle, Geojson, Marker, Polyline } from 'react-native-maps';
import colors from '../assets/colors';
import MapViewDirections from 'react-native-maps-directions';
import { imgUrl2 } from "../config/keys.json"
import Geolocation from 'react-native-geolocation-service';
import Loader from '../components/Loader';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Map = ({ navigation, route }) => {
  const myData = route.params
  const [modalData, setModalData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('030322221112');
  const sheetRef = useRef();
  const [currentLocation, setCurrentLocation] = useState({
  })


  useEffect(() => {
    const subscribe = Geolocation.getCurrentPosition((cor) => {
      setCurrentLocation({
        latitude: cor.coords.latitude,
        longitude: cor.coords.longitude
      })
      Geolocation.watchPosition((cor) => {
        setCurrentLocation({
          latitude: cor.coords.latitude,
          longitude: cor.coords.longitude
        })
      }, () => { }, {
        distanceFilter: 1
      })
    }, () => { }, {
    })

    return subscribe
  }, [])
  // Option Press Handler
  const onItemPress = (item, index) => {
    setModalData(item);
    // setIsModalVisible(true);
    sheetRef.current.open();
  };

  const _onPressStartTracking = () => {
    console.log('start tracking');
    sheetRef.current.close();
  };

  const _onPressCallNow = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  // Current Location
  const _onPressCurrentLoc = () => {
    console.log('Curr location');
  };
  if(!currentLocation.latitude){
    return <Loader/>
  }
  return (
    <>
      <View style={styles.container}>
        <Header showBack={true} navigation={navigation} iconName="arrow-back" />

        <View style={styles.tapMechanicView}>
          <TouchableOpacity
            disabled={true}
            style={styles.boxContainer}
            activeOpacity={0.8}
            onPress={() => console.log('Mechanic')}>
            <View style={styles.rowView}>
              <Image
                style={{ width: 60, height: 60, borderRadius: 30 }}
                source={(myData.user[0]?.profile_image) ? { uri: imgUrl2 + "/" + myData.user[0]?.profile_image } : require('../assets/user.png')}
              />
              <View>
                <Heading
                  passedStyle={styles.text}
                  title={myData.user[0].name}
                  fontType="bold"
                />
                <Heading
                  passedStyle={styles.textMechanic}
                  title={myData.service[0].services_name}
                  fontType="medium"
                />
                <Heading
                  passedStyle={styles.textMechanic}
                  title={"$" + myData.service[0].services_price}
                  fontType="medium"
                />
              </View>
            </View>

            {/* <IconComp
              iconName="chevron-with-circle-right"
              type={'Entypo'}
              passedStyle={styles.icon_style}
            /> */}
          </TouchableOpacity>
        </View>
        <MapView
          // ref={mapRef}
          style={{ flex: 1 }}
          showsMyLocationButton={true}
          zoomEnabled={true}
          scrollEnabled={true}
          region={{
            ...currentLocation,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              longitude: Number(myData.user[0]?.lng),
              latitude: Number(myData.user[0]?.lat),
            }}
            />
          {/* {console.log("curr",currentLocation)}
            {console.log("des",{
              longitude:Number(myData.user[0]?.lng),
              latitude:Number(myData.user[0]?.lat),
            })} */}

          <MapViewDirections
            destination={currentLocation}
            origin={{
              longitude: Number(myData.user[0]?.lng),
              latitude: Number(myData.user[0]?.lat),
            }}
            strokeColor={colors.themeBlue}
            strokeWidth={5}
            apikey={"AIzaSyAE-uaXvfrMbCdPVqIF3xL_4pfzocEdM48"}
          />
                                <Marker
            coordinate={{
              longitude: Number(myData.user[0]?.lng),
              latitude: Number(myData.user[0]?.lat),
            }}
            />
            <Marker
            coordinate={currentLocation}
            />
        </MapView>

        {/* Current Location  */}
        {/* <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => console.log('Current location')}
          style={styles.currentLocBtn}>
          <IconComp
            iconName="my-location"
            type={'MaterialIcons'}
            passedStyle={{ fontSize: width * 0.07 }}
          />
        </TouchableOpacity> */}

        {/* Confirm Button  */}
        {/* <Button
          btnTextStyle={styles.btnTextStyle}
          title="CONFIRM"
          onBtnPress={onItemPress}
          btnStyle={styles.button}
          isBgColor={false}
        /> */}

        {/* Bottom Sheet Component  */}
        <BottomSheet
          sheetRef={sheetRef}
          onPress={_onPressStartTracking}
          onPressCallNow={_onPressCallNow}
        />
      </View>
    </>
  );
};

//create our styling code:
const styles = StyleSheet.create({
  tapMechanicView: {
    zIndex: 9999,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginTop: height * 0.1,
  },
  container: {
    flex: 1, //the container will fill the whole screen.
    position: 'relative',
  },
  locationIcon: {
    color: 'gray',
    alignSelf: 'center',
    fontSize: width * 0.052,
    paddingLeft: width * 0.03,
    // backgroundColor:'red'
  },
  boxContainer: {
    flexDirection: 'row',
    paddingHorizontal: width * 0.05,
    justifyContent: 'space-between',
    borderRadius: width * 0.02,
    height: height * 0.13,
    width: width * 0.9,
    marginTop: height * 0.01,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: height * 0.025,
    color: 'black',
    marginLeft: width * 0.03,
  },
  textMechanic: {
    fontSize: height * 0.017,
    color: 'gray',
    marginLeft: width * 0.03,
  },
  button: {
    zIndex: 9999,
    backgroundColor: colors.themeBlue,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 10,
    bottom: width * 0.03,
    borderRadius: width * 0.02,
  },
  btnTextStyle: {
    color: 'white',
  },
  currentLocBtn: {
    borderRadius: width * 0.02,
    height: height * 0.07,
    width: width * 0.15,
    alignItems: 'center',
    // alignSelf: 'flex-end',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: '13%',
    right: width * 0.055,
  },
});

export default Map;
