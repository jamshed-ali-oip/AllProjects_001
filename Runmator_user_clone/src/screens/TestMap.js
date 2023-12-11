import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Linking,
  Image,
  Text,
} from 'react-native';
import colors from '../assets/colors';
import Map_img from '../assets/Map.png';
import Button from '../components/Button';
import userimg from '../assets/user_image.png';
import IconComp from '../components/IconComp';
import Header from '../components/Header';
import Heading from '../components/Heading';
import BottomSheet from '../components/BottomSheet';
import MapView, {Circle, Geojson, Marker, Polyline} from 'react-native-maps';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const TestMap = ({navigation}) => {
  console.log('object');
  return (
    <>
      {/* <Header showBack={true} navigation={navigation} iconName="arrow-back" />
      <MapView
        style={{flex: 1, zIndex: -1, position: 'relative'}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <View
          style={{
            backgroundColor: 'red',
            position: 'absolute',
            width: 20,
            height: 20,
            top: 10,
            left: 10,
            zIndex: 10,
          }}>
          <Text>asdsad</Text>
        </View>
      </MapView> */}
      {/* ------------------------- */}
      {/* <View style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <MapView
          ref="map"
          mapType="terrain"
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}>
          <MapView.Marker
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
            }}>
            <View style={styles.radius}>
              <View style={styles.marker} />
            </View>
          </MapView.Marker>
        </MapView>

        <View
          buttonColor="rgba(231,76,60,1)"
          style={styles.actionButton}>
          <Text
            onPress={() => console.log('notes tapped!')}>
            TESTING
          </Text>
        </View>
      </View> */}
      <View style={styles.container}>
        <Header showBack={true} navigation={navigation} iconName="arrow-back" />
        {/* <GooglePlacesAutocomplete
          placeholder="Enter your address"
          onPress={(data, details = null) => {
            console.log(data.geometry.location, details);
            // setCurrentLocation(data.geometry.location);
          }}
          onFail={() => console.log('error')}
          query={{
            key: 'AIzaSyA_1hBsTUutBCvCFLCBRB2glvBgK3scbJI',
            language: 'en',
          }}
          // predefinedPlaces={savedData}
          styles={{
            container: {
              position: 'absolute',
              zIndex: 9999,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop:height * 0.1,
            },
            textInputContainer: {
              width: '90%',
              // paddingTop: height * 0.03,
            },
            textInput: {
              height: height * 0.07,
              color: '#5d5d5d',
              fontSize: 16,
              width: width * 0.7,
            },
            row: {
              width: '90%',
              alignSelf: 'center',
              marginHorizontal: 20,
              // backgroundColor:"yellow",
            },
          }}
        /> */}
        <View
          style={{
            zIndex: 9999,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            marginTop: height * 0.1,
          }}>
          <GooglePlacesAutocomplete
            placeholder="Enter Your Location"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: 'YOUR API KEY',
              language: 'en',
            }}
            renderLeftButton={() => (
              <IconComp
                iconName="location-pin"
                type="Entypo"
                passedStyle={styles.locationIcon}
              />
            )}
            styles={{
              // container: {
              //   position: 'absolute',
              //   zIndex: 9999,
              //   width: '100%',
              //   justifyContent: 'center',
              //   alignItems: 'center',
              //   marginTop: height * 0.1,
              // },
              textInputContainer: {
                // marginTop: height * 0.02,
                width: width * 0.9,
                backgroundColor: 'white',
                borderRadius: width * 0.025,
                height: height * 0.084,
              },
              textInput: {
                borderRadius: width * 0.025,
                height: height * 0.084,
                color: '#5d5d5d',
                fontSize: width * 0.04,
              },
            }}
          />
          {/* Selected Rider Popup  */}
          <TouchableOpacity
            style={styles.boxContainer}
            activeOpacity={0.8}
            onPress={() => console.log('Mechanic')}>
            <View style={styles.rowView}>
              <Image source={userimg} />
              <View>
                <Heading
                  passedStyle={styles.text}
                  title={'Michael Reimer'}
                  fontType="bold"
                />
                <Heading
                  passedStyle={styles.textMechanic}
                  title={'Mechanic'}
                  fontType="medium"
                />
              </View>
            </View>

            <IconComp
              iconName="chevron-with-circle-right"
              type={'Entypo'}
              passedStyle={styles.icon_style}
            />
          </TouchableOpacity>
        </View>
        {/*Render our MapView*/}
        <MapView
          // ref={mapRef}
          style={{flex: 1}}
          showsMyLocationButton={true}
          // pitchEnabled={false}
          // rotateEnabled={false}
          zoomEnabled={true}
          scrollEnabled={true}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={e => {
            console.log(e);
          }}></MapView>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => console.log("Current location")}
          style={styles.currentLocBtn}>
          <IconComp
            iconName="my-location"
            type={'MaterialIcons'}
            passedStyle={{fontSize: width * 0.07}}
          />
        </TouchableOpacity>
        {/* confirm button */}
        <Button
          title="CONFIRM"
          btnStyle={styles.btnStyle}
          onBtnPress={() => console.log('confirm')}
          btnStyle={styles.button}
          isBgColor={true}
        />
      </View>
    </>
  );
};

//create our styling code:
const styles = StyleSheet.create({
  container: {
    flex: 1, //the container will fill the whole screen.
    backgroundColor: 'red',
    position:"relative"
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
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // marginTop: height * 0.1,
    bottom: width * 0.03,
    borderRadius: width * 0.02,
  },
  currentLocBtn:{
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
    position:"absolute",
    bottom: "13%",
    right:width * 0.055
  }
});

export default TestMap;
