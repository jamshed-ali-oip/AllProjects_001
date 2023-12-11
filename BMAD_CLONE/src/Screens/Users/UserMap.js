import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {Badge} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import {
  markers,
  mapDarkStyle,
  mapStandardStyle,
} from './../../../model/mapData';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppText from '../../Components/AppText';
import {Rating} from 'react-native-elements';
import {connect} from 'react-redux';
import {imageUrl} from '../../Config/Apis.json';
import * as actions from '../../Store/Actions';
import UserProfileMarker from './../../Components/UserProfileMarker';
import YourImage from './../../Assets/Images/pic5.png';
import {Avatar} from 'react-native-elements';
import {googleMapKey} from './../../Config/Apis.json';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.42;
const SPACING_FOR_CARD_INSET = width * 0.055 - 10;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01725;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const UserMap = ({
  navigation,
  route,
  props,
  userCoordsReducer,
  usersNearmeReducer,
  userReducer,
}) => {
  // console.log(usersNearmeReducer, 'COORDINATES');
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  const initialMapState = {
    usersNearmeReducer,
    region: {
      latitude: userCoordsReducer?.lat,
      longitude: userCoordsReducer?.long,
      latitudeDelta: 0.0925,
      longitudeDelta: 0.0925,
    },
  };

  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    if (usersNearmeReducer == {} || state.usersNearmeReducer.length > 0) {
      // alert("AAAA")
      mapAnimation.addListener(({value}) => {
        let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        if (index >= state.usersNearmeReducer?.length) {
          index = state.usersNearmeReducer?.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }
        clearTimeout(regionTimeout);
        const regionTimeout = setTimeout(() => {
          if (mapIndex !== index) {
            mapIndex = index;
            const {coordinate} = state.usersNearmeReducer[index];
            _map.current.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: state.region.latitudeDelta,
                longitudeDelta: state.region.longitudeDelta,
              },
              350,
            );
          }
        }, 10);
      });
    }
  });

  const GETNearPlace = () => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${state.region?.latitude},${state.region?.longitude}&radius=300&type=restaurant&key=${googleMapKey}`;
    fetch(url)
      .then(response => response.json())
      .then(JsonResponse => {
        // console.log(JsonResponse)
      })
      .catch(error => {
        alert('error');
      });
  };

  const onMarkerPress = mapEventData => {
    const markerID = mapEventData._targetInst.return.key;
    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }
    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  };
  // console.log(state.usersNearmeReducer)

  const interpolations = (
    state.usersNearmeReducer == {} ? [] : usersNearmeReducer
  ).map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];
    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1.1, 1.1, 1],
      extrapolate: 'clamp',
    });
    return {scale};
  });

  const onRegionChange = mark => {
    const Delta = 0.025;
    changeCoords({
      latitude: mark.nativeEvent.coordinate.latitude,
      longitude: mark.nativeEvent.coordinate.longitude,
      latitudeDelta: Delta,
      longitudeDelta: Delta,
    });
  };

  // const size = zoomLevel <= 10 ? 40 : 80;

  if (state.usersNearmeReducer == {} || state.usersNearmeReducer.length > 0) {
    // alert("AAAA")
    return (
      <View style={styles.container}>
        <MapView
          minZoomLevel={16} // revert it back to 16 !!
          onMarkerDragEnd={onRegionChange}
          ref={_map}
          initialRegion={state.region}
          style={{flex: 1}}
          // mapType={Platform.OS == 'android' ? 'terrain' : 'standard'}
          provider={Platform.OS == 'android' ? PROVIDER_GOOGLE : null}>
          <Marker
            stopPropagation={false}
            style={{position: 'absolute'}}
            coordinate={{
              latitude: state.region.latitude,
              longitude: state.region.longitude,
            }}
            title={'Your Location'}>
            <MapView.Circle
              key={(state.region.latitude + state.region.longitude).toString()}
              center={state.region}
              radius={2000}
              strokeWidth={0}
              strokeColor={'#1a66ff'}
              fillColor={'rgba(176,17,37,0.2)'}
            />
            {userReducer?.data?.user_image?.includes('ngrok') ? (
              <Avatar
                rounded
                size="medium"
                containerStyle={{borderWidth: 1}}
                source={require('./../../Assets/Images/maroon-dp2.jpeg')}
              />
            ) : (
              <Avatar
                rounded
                size="medium"
                source={{uri: `${imageUrl}/${userReducer?.data?.user_image}`}}
              />
            )}
          </Marker>

          {/* Maps Users Location on Map  */}
          {state.usersNearmeReducer?.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            return (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: marker.user_latitude,
                  longitude: marker.user_longitude,
                }}
                title={marker.user_name}
                onPress={e => onMarkerPress(e)}>
                <Animated.View style={styles.markerWrap}>
                  <Animated.View
                    style={{
                      borderColor: '#EA2C2E',
                      borderRadius: 50,
                      padding: 0,
                      alignItems: 'center',
                      width: 40,
                      height: 40,
                      justifyContent: 'center',
                    }}>
                    {marker.user_image ? (
                      <Animated.Image
                        source={{uri: marker.user_image}}
                        style={[styles.marker, scaleStyle]}
                        resizeMode="cover"
                      />
                    ) : (
                      <Animated.Image
                        source={require('./../../Assets/Images/maroon-dp2.jpeg')}
                        style={[styles.marker, scaleStyle]}
                        resizeMode="cover"
                      />
                    )}
                  </Animated.View>
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>

        {/* Users Near Me Cards  */}
        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          style={styles.scrollView}
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          contentContainerStyle={{
            paddingHorizontal:
              Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}>
          {state.usersNearmeReducer.map((marker, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cardContainer}
              onPress={() => navigation.navigate('OfferADrink')}>
              <View style={styles.card}>
                <View style={styles.imageView}>
                  {/* {console.log(marker.user_image)} */}
                  {marker.user_image.includes('ngrok') ? (
                    <Avatar
                      rounded
                      size="large"
                      source={require('./../../Assets/Images/maroon-dp2.jpeg')}
                    />
                  ) : (
                    <Avatar
                      rounded
                      size="large"
                      source={{uri: marker.user_image}}
                    />
                  )}

                  {/* <Badge
                    badgeStyle={{
                      height: 12,
                      width: 12,
                      borderRadius: 50,
                      borderColor: 'white',
                      borderWidth: 1,
                      position: 'absolute',
                    }}
                    status="success"
                    containerStyle={{position: 'absolute', top: height * 0.042, right: 55}}
                  /> */}
                </View>
                <View style={styles.textContent}>
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-Regular"
                    size={hp('1.6%')}
                    color="black"
                    Label={marker.user_name}
                  />
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <AppText
                      nol={3}
                      family="Poppins-Regular"
                      size={hp('1.4%')}
                      color="grey"
                      Label={marker.user_address}
                    />
                  </View>
                  <AppText
                    nol={1}
                    family="Poppins-Regular"
                    size={hp('1.4%')}
                    color="grey"
                    Label={
                      parseFloat(marker.distance).toFixed(2) + ' Km far away'
                    }
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </View>
    );
  } else {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-around',
          alignSelf: 'center',
          flexDirection: 'column',
          alignContent: 'space-around',
        }}>
        <LottieView
          style={{width: '80%', height: '90%', alignItems: 'center'}}
          source={require('./../../Assets/Lottie/notfound.json')}
          autoPlay
          loop
        />
        <View style={{top: -150}}>
          <AppText
            nol={1}
            textAlign="left"
            family="Poppins-Regular"
            size={hp('2.5%')}
            color="black"
            Label={'No People Found'}
          />
        </View>
      </View>
    );
  }
};
function mapStateToProps({userCoordsReducer, usersNearmeReducer, userReducer}) {
  return {userCoordsReducer, usersNearmeReducer, userReducer};
}

export default connect(mapStateToProps, actions)(UserMap);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    padding: 5,
    borderRadius: 6,
    height: hp('18%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#EA2C2E',
    width: '100%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },

  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 7,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 0,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: 150,
    overflow: 'hidden',
    marginBottom: 100,
    borderRadius: 8,
  },
  cardImage: {
    flex: 3,
    margin: 2,
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
    textAlign: 'left',
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    // alignItems: "center",
    // justifyContent: "center",
    // width:50,
    // height:50,
    backgroundColor: '#EA2C2E',
    borderWidth: 1,
    borderColor: '#EA2C2E',
    borderRadius: 50,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
