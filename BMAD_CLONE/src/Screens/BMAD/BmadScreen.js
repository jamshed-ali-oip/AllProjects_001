// @ts-nocheck
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
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
import * as actions from '../../Store/Actions';
import {Rating} from 'react-native-elements';
import {connect} from 'react-redux';
import {googleMapKey} from './../../Config/Apis.json';
import UserLocationMarker from './../../Components/UserLocationMarker';

const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 240;
const CARD_WIDTH = width * 0.42;
const SPACING_FOR_CARD_INSET = width * 0.055 - 10;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0925;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const BmadScreen = ({navigation, route, props, userCoordsReducer}) => {
  // console.log(userCoordsReducer, "COORDINATES")

  const initialMapState = {
    markers,
    region: {
      latitude: 24.7931,
      longitude: 67.0651,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  };

  const [state, setState] = React.useState(initialMapState);
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state?.markers?.length) {
        index = state?.markers?.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {coordinate} = state.markers[index];
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
  });

  const GETNearPlace = () => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${state.region.latitude},${state.region?.longitude}&radius=300&type=restaurant&key=${googleMapKey}`;
    fetch(url)
      .then(response => response.json())
      .then(JsonResponse => {
        // console.log(JsonResponse)
      })
      .catch(error => {
        alert('error');
      });
  };

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  const onMarkerPress = mapEventData => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  };

  const onRegionChange = mark => {
    const Delta = 0.025;
    changeCoords({
      latitude: mark.nativeEvent.coordinate.latitude,
      longitude: mark.nativeEvent.coordinate.longitude,
      latitudeDelta: Delta,
      longitudeDelta: Delta,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        // minZoomLevel={16}
        initialRegion={state.region}
        onMarkerDragEnd={onRegionChange}
        ref={_map}
        style={{flex: 1}}>
        <Marker
          stopPropagation={false}
          style={{position: 'absolute'}}
          coordinate={{
            latitude: state.region.latitude,
            longitude: state.region.longitude,
          }}
          title={'Your Location'}>
          <UserLocationMarker />
        </Marker>
        <MapView.Circle
          key={(state.region.latitude + state.region.longitude).toString()}
          center={state.region}
          radius={2000}
          strokeWidth={0}
          strokeColor={'#1a66ff'}
          fillColor={'rgba(176,17,37,0.2)'}
        />
        {state.markers.map((marker, index) => {
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
              coordinate={marker.coordinate}
              onPress={e => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('./../../Assets/Images/pin-map.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>

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
        {state.markers.map((marker, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardContainer}
            onPress={() => navigation.navigate('detail', {Data: marker})}>
            <View style={styles.card}>
              <View style={styles.imageView}>
                <Image
                  source={marker.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.textContent}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-Regular"
                  size={hp('1.8%')}
                  color="black"
                  Label={marker.title}
                />
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-Regular"
                  size={hp('1.3%')}
                  color="grey"
                  Label={marker.description}
                />
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Rating
                    defaultRating={1}
                    type="star"
                    ratingColor="#3498db"
                    ratingBackgroundColor="#c8c7c8"
                    ratingCount={5}
                    readonly
                    startingValue={marker.rating}
                    imageSize={15}
                    style={{paddingVertical: 10}}
                  />
                  <AppText
                    nol={1}
                    family="Poppins-Regular"
                    size={hp('1.8%')}
                    color="grey"
                    Label={marker.distance}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </View>
  );
};
function mapStateToProps({userCoordsReducer}) {
  return {userCoordsReducer};
}

export default connect(mapStateToProps, actions)(BmadScreen);

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
  },

  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
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
  card: {
    padding: 0,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: 250,
    overflow: 'hidden',
    marginBottom: 100,
    borderRadius: 5,
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
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 20,
    height: 25,
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
