import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Avatar from '../../Components/Avatar';
import * as actions from '../../Store/Actions/index';
import AppText from '../../Components/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItems';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FlatListSlider } from 'react-native-flatlist-slider';
import Preview from './Preview';
import { imageUrl } from '../../Config/Apis.json';
import moment from 'moment';
import { connect } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { colors } from '../../src/screens/drawer/constant';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const { width, height } = Dimensions.get('window');
// const {width} = Dimensions.get('window');
const ITEM_SIZE = Platform?.OS === 'ios' ? width * 0.99 : width * 0.99;
//  heart heart-o FontAwesome
// const Img = [
//   {image: require('./../../Assets/Images/post1.png')},
//   {image: require('./../../Assets/Images/place2.png')},
//   {image: require('./../../Assets/Images/place3.png')},
// ];
const PostList = ({
  Name,
  Description,
  ProfileImg,
  UploadTime,
  TotalLike,
  Comment,
  Img,
  item,
  Navigation,
  likePost,
  userReducer,
  index,
  _onPressHeart,
}) => {
  const IMAGES = item?.post_url?.map(ele => `${imageUrl}/${ele}`);

  const route = useRoute();
  const routeName = route?.name;
  const flatListRef = useRef(null);
  const [ind, onChangeIndex] = useState(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  // console.log(IMAGES,"IMAGES",route?.name);
  // const isIos =

  const onScroll = useCallback(({ viewableItems }) => {
    console.log(viewableItems[0]?.index);
    onChangeIndex(viewableItems[0]?.index);
    // onChangeIndex(viewableItems.changed[0]?.index)
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => <Preview index={index} item={item} scrollX={scrollX} />,
    [],
  );

  useEffect(() => {
    if (ind != null) {
      flatListRef?.current?.scrollToIndex({ animated: true, index: ind });
    }
  }, [ind]);
  console.log(item?.post_id, 'item?.id');
  return (
    <TouchableOpacity
      key={item?.post_id}
      onPress={() => {
        if (routeName === 'post') {
          return;
        }
        Navigation.navigate('mainpost', {
          name: Name,
          description: Description,
          profileImg: ProfileImg,
          uploadTime: UploadTime,
          totalLike: TotalLike,
          comment: Comment,
          img: Img,
          item: item,
          post_url: IMAGES,
        });
      }}>
      <View key={item?.post_id} style={styles.postContainer}>
        {/* Post Info View */}

        <View style={styles.postInfoOuterView}>
          <View style={styles.postInfoInnerView}>
            <Avatar
              size="medium"
              source={
                ProfileImg
                  ? {
                    uri: `${imageUrl}/${ProfileImg}`,
                  }
                  : require('../../Assets/Images/placeholderImage.png')
              }
            />

            {/* Username Time And Like Comment View  */}
            <View style={styles.nameDateIconsView}>
              <View style={styles.nameAndDateView}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-SemiBold"
                  size={hp('1.9%')}
                  color="black"
                  Label={Name}
                />

                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-Regular"
                  size={hp('1.5%')}
                  color="black"
                  Label={moment(UploadTime).calendar()}
                />
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-around',height:60 }}>

<TouchableOpacity
                  style={{ 
                    flexDirection: 'row',
                    // backgroundColor:"green",
                    paddingTop:10 }}
                  activeOpacity={0.9}
                  // onPress={() => {
                  //   if (routeName === 'post') {
                  //     return;
                  //   }
                  //   Navigation.navigate('mainpost', {
                  //     name: Name,
                  //     description: Description,
                  //     profileImg: ProfileImg,
                  //     uploadTime: UploadTime,
                  //     totalLike: TotalLike,
                  //     comment: Comment,
                  //     img: Img,
                  //     item: item,
                  //   });
                  // }}
                  key={item?.post_id}
                  onPress={() => {
                    if (routeName === 'post') {
                      return;
                    }
                    Navigation.navigate('mainpost', {
                      name: Name,
                      description: Description,
                      profileImg: ProfileImg,
                      uploadTime: UploadTime,
                      totalLike: TotalLike,
                      comment: Comment,
                      img: Img,
                      item: item,
                      post_url: IMAGES,
                    });
                  }}
                >
                  <View style={{ paddingRight: 5 }}>
                    <Icon1 name="message-outline" size={18} color="#B01125" />
                  </View>
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-Regular"
                    size={hp('1.5%')}
                    color="black"
                    Label={Comment}
                  />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ paddingRight: 5 }}>
                    <TouchableOpacity
                    style={{
                      // backgroundColor:"orange",
                      width:width*0.2,
                      flexDirection:"row",
                      height:height*0.05,
                      paddingLeft:20,
                      paddingTop:10
                    }}
                      onPress={() => _onPressHeart(item)}
                      activeOpacity={0.9}>
                      {item?.is_like === 1 ? (
                        <Icon name="heart" size={18} color="#B01125" />
                      ) : (
                        <Icon name="heart-o" size={18} color="#B01125" />
                      )}
                    <View style={{marginLeft:width*0.02}}>
                    <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-Regular"
                    size={hp('1.5%')}
                    color="black"
                    Label={TotalLike}
                  />
                    </View>
                    </TouchableOpacity>
                  </View>
                  
                </View>
               
              </View>
            </View>
          </View>

          {/* Post Description View */}
          <TouchableOpacity
            onPress={() => {
              if (routeName === 'post') {
                return;
              }
              Navigation.navigate('mainpost', {
                name: Name,
                description: Description,
                profileImg: ProfileImg,
                uploadTime: UploadTime,
                totalLike: TotalLike,
                comment: Comment,
                img: Img,
                item: item,
              });
            }}>
            <View style={styles.descriptionView}>
              <AppText
                nol={3}
                textAlign="left"
                family="Poppins-Regular"
                size={hp('1.9%')}
                color="black"
                Label={
                  Description?.length > 100
                    ? `${Description?.substring(0, 100)}...`
                    : Description
                }
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Photos Slider  */}
        {/* {console.log(IMAGES, "000")} */}
        <View key={item?.post_id} style={styles.photosView}>
          <View style={{ height: 30 }} />
          <Animated.FlatList
            key={item?.post_id}
            bounces={false}
            decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
            renderToHardwareTextureAndroid
            contentContainerStyle={{ alignItems: 'center' }}
            snapToInterval={ITEM_SIZE}
            snapToAlignment="start"
            onEndReachedThreshold={0.2}
            ListFooterComponentStyle={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
            horizontal
            ref={flatListRef}
            pagingEnabled={true}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false },
            )}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            viewabilityConfig={{
              minimumViewTime: 1000,
              itemVisiblePercentThreshold: 90,
            }}
            keyExtractor={(item, i) => i.toString()}
            data={IMAGES}
            onViewableItemsChanged={onScroll}
          />
          <View style={{ height: 10 }} />

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              height: responsiveFontSize(5),
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {IMAGES?.map((item, index) => {
              return (
                <View
                  style={{
                    width: '3%',
                    backgroundColor: 'white',
                    height: responsiveFontSize(1.5),
                    borderRadius: responsiveFontSize(100),
                    borderWidth: 1,
                    borderColor: colors.themeblue,
                    marginHorizontal: responsiveFontSize(0.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {index == ind || (ind == null && index == 0) ? (
                    <View
                      style={{
                        backgroundColor: colors.themeblue,
                        height: responsiveFontSize(0.7),
                        width: '60%',
                        borderRadius: responsiveFontSize(100),
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        height: responsiveFontSize(0.7),
                        width: '60%',
                        borderRadius: responsiveFontSize(100),
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>

          <View
            style={{
              width: width * 0.95,
              height: 0.4,
              backgroundColor: 'silver',
              top: -3,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};

const styles = StyleSheet.create({
  postInfoOuterView: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  descriptionView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  nameDateIconsView: {
    flexDirection: 'row',
    padding: 4,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    left: 5,
    width: width * 0.78,
    // backgroundColor: 'red',
  },
  postContainer: {
    // height: height*0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: width * 0.008,
    // padding: 4,
    paddingVertical: height * 0.035,
    width: width * 0.95,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  photosView: {
    justifyContent: 'center',
    flexDirection: 'column',
    top: height * 0.022,
    width: width,
    alignItems: 'center',
    alignSelf: 'center',
    // height: height * 0.32,
    // marginVertical: 10,
    // marginBottom: 10,
    // backgroundColor:'red',
  },
  nameAndDateView: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // backgroundColor:'red',
  },
  postInfoInnerView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'green',
    // width: width * 0.93,
  },
});
export default connect(mapStateToProps, actions)(PostList);
