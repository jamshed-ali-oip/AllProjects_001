import React, {useEffect, useState, useRef, useMemo} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Linking,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  TouchableHighlight,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import ReadMore from 'react-native-read-more-text';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import Items from './Items';
import {Rating} from 'react-native-elements';
import TouchableOpacityBtn from '../../Components/TouchableOpacity';
import AppText from '../../Components/AppText';
const DetailScreen = ({navigation, route}) => {
  const [Data, onChangeData] = React.useState(route.params.Data);
  const [lines, onChangeLines] = React.useState(2);
  const [linesCondition, onChangeLinesCondition] = React.useState(false);
  useEffect(() => {
    //   console.log(Data.items)
    //   AbortController()
  }, []);

  //   const abcUsedMemo = useMemo(() => {
  //     console.log(Data.items)
  //     AbortController()

  //     }, []);


  const ReadMore = () => {
    onChangeLines(20);
    onChangeLinesCondition(true);
  };
  const ShowLess = () => {
    onChangeLines(2);
    onChangeLinesCondition(false);
  };
  const _goToYosemite = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${Data.coordinate.latitude},${Data.coordinate.longitude}`;
    const label = 'Restaurant';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{justifyContent: 'center', top: 0, alignItems: 'center'}}>
          <Image
            style={{width: '100%', height: hp('40%')}}
            source={Data.image}
          />
        </View>
        {/* <View
          style={{
            justifyContent: 'center',
            flexDirection: 'column',
            padding: 10,
          }}>
          <View
            style={{
              backgroundColor: '#CBCBCB',
              width: 80,
              borderRadius: 12,
              height: 7,
              alignSelf: 'center',
            }}
          />
        </View> */}
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
          }}>
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'column',
              width: wp('40%'),
            }}>
            <AppText
              nol={3}
              textAlign="left"
              family="Poppins-Bold"
              size={hp('2.3%')}
              color="black"
              Label={Data.title}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Rating
                defaultRating={1}
                type="star"
                ratingColor="#3498db"
                ratingBackgroundColor="#c8c7c8"
                ratingCount={1}
                readonly
                startingValue={Data.rating / 5}
                imageSize={18}
                style={{}}
              />
              <View style={{padding: 5, top: 2, left: 2}}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-Bold"
                  size={hp('1.8%')}
                  color="black"
                  Label={Data.rating}
                />
              </View>
              <View style={{left: 5, top: 2}}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontFamily: 'Poppins-Regular',
                    fontSize: hp('1.7'),
                    color: 'black',
                  }}>
                  ( {Data.reviews} reviews )
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              width: wp('40%'),
            }}>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 50,
                  padding: 15,
                  zIndex: 99999,
                  elevation: 4,
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 59,
                  borderColor: '#EA2C2E',
                  height: 60,
                }}>
                <Icon
                  name="map-o"
                  style={{padding: 0}}
                  size={20}
                  color="#EA2C2E"
                />
              </View>
            </TouchableOpacity>
            <View style={{margin: 5}} />
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 50,
                  padding: 15,
                  zIndex: 99999,
                  elevation: 4,
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 59,
                  borderColor: '#EA2C2E',
                  height: 60,
                }}>
                <Icon
                  name="location-arrow"
                  style={{padding: 2}}
                  size={23}
                  color="#EA2C2E"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'column',
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
          }}>
          <AppText
            nol={lines}
            textAlign="left"
            family="Poppins-Regular"
            size={hp('1.7%')}
            color="black"
            Label={Data.description}
          />
          {!linesCondition ? (
            <TouchableOpacity style={{top: 5}} onPress={() => ReadMore()}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-Regular"
                size={hp('1.7%')}
                color="#EA2C2E"
                Label={'Read More'}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{top: 5}} onPress={() => ShowLess()}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-Regular"
                size={hp('1.7%')}
                color="#EA2C2E"
                Label={'Show Less'}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
            alignItems: 'center',
          }}>
          <Icon1
            name="location-pin"
            style={{padding: 2}}
            size={18}
            color="black"
          />
          <AppText
            nol={2}
            textAlign="left"
            family="Poppins-Regular"
            size={hp('1.6%')}
            color="black"
            Label={Data.Address}
          />
        </View>
        <View style={{height: hp('40%'), top: 10}}>
          <View style={{padding: 10}}>
            <AppText
              nol={2}
              textAlign="left"
              family="Poppins-Bold"
              size={hp('2.3%')}
              color="black"
              Label={'Drinks Available'}
            />
          </View>
          <FlatList
            horizontal
            data={Data.items}
            style={{}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Items image={item.image} name={item.name} price={item.price} />
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacityBtn
            onPress={() => _goToYosemite()}
            title="Get Direction"
          />
        </View>
        <View style={{height: 120}} />
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: hp('103%'),
    backgroundColor: '#FCFCFC',
  },
});
