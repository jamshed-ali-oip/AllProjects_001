import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Platform,
  Dimensions,
  TextInput,
  RefreshControl,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Avatar from '../../Components/Avatar';
import AppText from '../../Components/AppText';
import moment from 'moment';
import Comment from './Comments';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
import { showMessage } from 'react-native-flash-message';
import { ActivityIndicator } from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import Colors from '../../src/constants/Colors';
import Preview from './Preview';
import { imageUrl } from '../../Config/Apis.json';
import { colors } from '../../src/screens/drawer/constant';
import { Text } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
// const {width} = Dimensions.get('window');
const ITEM_SIZE = Platform?.OS === 'ios' ? width * 0.99 : width * 0.99;
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const MainPost = ({
  getAllCommentsOfPost,
  userReducer,
  commentOnPost,
  postsReducer,
  navigation,
  route,
}) => {
  console.log(route?.params?.post_url, 'route');
  // const IMAGES = item?.post_url?.map(ele => `${imageUrl}/${ele}`);
  const [commentText, setCommentText] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const postId = route?.params?.item?.post_id;
  const [isCommenting, setIsCommenting] = useState(false);
  const [loader, onChangeLoader] = useState(false);
  const userId = userReducer?.data?.user_id;
  const [postComments, setPostComments] = useState([]);
  const isIOS = Platform.OS === 'ios';

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

  const _onPressComment = async () => {
    if (commentText.length > 0) {
      const apiData = {
        user_id: userId,
        post_id: postId,
        comment: commentText,
      };
      setIsCommenting(true);
      await commentOnPost(apiData, onSuccess);
    } else {
      showMessage({
        message: 'Please enter comment.',
        danger: 'error',
      });
    }
  };

  const onSuccess = () => {
    setIsCommenting(false);
    setCommentText('');
    getAllCommentsOfPost(route?.params?.item?.post_id).then(res => {
      // console.log(res, "========================");
      setPostComments(res);
    });
  };

  useEffect(() => {
    onChangeLoader(true);
    getAllCommentsOfPost(route?.params?.item?.post_id).then(res => {
      // console.log(res, "========================");
      setPostComments(res);
      onChangeLoader(false);
    });
  }, []);

  if (loader) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          size={responsiveScreenFontSize(3)}
          color={Colors.themeColor}
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => { navigation.goBack(); }}
          style={{
            // position: "absolute",
            zIndex: 100,
            height: height * 0.05,
            backgroundColor: "rgba(247, 247, 247, 0.76)",
            width: width * 0.2,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            marginTop: height * 0.01,
            alignSelf: 'flex-start',
            marginLeft: width * 0.0125
          }}
        >
          <Text
            style={{
              color: colors.themeblue,
              fontFamily: "Poppins-Bold"
            }}
          >Go Back</Text>
        </TouchableOpacity >
        <>

          <View style={styles.outerInfoView}>
            <View style={styles.innerInfoView}>
              <Avatar
                size="medium"
                source={
                  route?.params?.profileImg
                    ? {
                      uri: `${imageUrl}/${route?.params?.profileImg}`,
                    }
                    : require('../../Assets/Images/maroon-dp.png')
                }
              />
              <View style={styles.textView}>
                <View style={styles.innerTextView}>
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-SemiBold"
                    size={hp('1.9%')}
                    color="black"
                    Label={route.params.name}
                  />
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-SemiBold"
                    size={hp('1.5%')}
                    color="black"
                    Label={moment(route.params.uploadTime).calendar()}
                  />
                </View>
              </View>
            </View>
            <View style={styles.descripView}>
              <AppText
                nol={12}
                textAlign="left"
                family="Poppins-Regular"
                size={hp('1.9%')}
                color="black"
                Label={route.params.description}
              />
            </View>
          </View>
        </>
        <View style={styles.photosView}>
          {/* <View style={{height: 30}} /> */}

          <Animated.FlatList
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
            keyExtractor={(item, i) => i}
            data={route?.params?.post_url}
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
            {route?.params?.post_url?.map((item, index) => {
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
        <View style={{
          height: responsiveHeight(25), marginVertical: responsiveFontSize(5),
          paddingVertical: responsiveFontSize(2),

        }}>
          <View style={styles.shadowContainerForIos}>
            <View style={styles.commentBoxContainer}>
              <Avatar
                size="small"
                source={
                  route?.params?.profileImg
                    ? {
                      uri: `${imageUrl}/${userReducer?.data?.user_image?.[0]}`,
                    }
                    : require('../../Assets/Images/maroon-dp2.jpeg')
                }
              />
              <TouchableWithoutFeedback style={{ marginBottom: 100 }}>
                <TextInput
                  placeholder="Add a comment"
                  numberOfLines={5}
                  placeholderTextColor="grey"
                  multiline={true}
                  onChangeText={e => {
                    setCommentText(e);
                  }}
                  textAlignVertical="top"
                  value={commentText}
                  style={styles.textInputStyles}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
          {isCommenting ? (
            // <LottieView
            //   style={{
            //     width: width * 0.2,
            //     height: height * 0.1,
            //     marginLeft: width * 0.38,
            //   }}
            //   source={require('../../Assets/Lottie/red-loader.json')}
            //   autoPlay
            //   loop
            // />

            <View
              style={[
                styles.commentBtn,
                isCommenting && isIOS && { width: width * 0.35 },
              ]}>
              <AppText
                nol={1}
                family="Poppins-SemiBold"
                size={hp('1.7%')}
                color="white"
                Label={'Commenting...'}
              />
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.commentBtn}
              onPress={_onPressComment}>
              <AppText
                nol={1}
                family="Poppins-SemiBold"
                size={hp('1.7%')}
                color="white"
                Label={'Comment'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: height * 0.14 }}
        data={postComments}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => {
          return (
            <Comment
              item={item}
              img={item?.user?.user_image}
              name={item?.user?.user_name}
              time={moment(item?.created_at).format('lll')}
              message={item?.comment}
            />
          );
        }}
      />
    </ScrollView>
  );
};

const mapStateToProps = ({ userReducer, postsReducer }) => {
  return { userReducer, postsReducer };
};

export default connect(mapStateToProps, actions)(MainPost);

const styles = StyleSheet.create({
  descripView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: height * 0.015,
    width: width * 0.9,
  },
  mainContainer: {
    // height: hp('100%'),
    backgroundColor: '#F7F3F2',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  textView: {
    flexDirection: 'row',
    // padding: 4,
    justifyContent: 'space-between',
    alignContent: 'center',
    left: 5,
    width: '94%',
  },
  innerTextView: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  commentBoxContainer: {
    flexDirection: 'row',
    width: width * 0.9,
    borderRadius: 10,
    minHeight: height * 0.12,
    zIndex: 4,
    padding: 10,
    elevation: 10,
    borderColor: 'gray',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.01,
  },
  shadowContainerForIos: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    // backgroundColor:'red'
    width: width * 0.9,
    marginHorizontal: width * 0.05,
  },
  textInputStyles: {
    marginLeft: width * 0.03,
    width: '85%',
    borderRadius: 6,
    top: -3,
    color: 'grey',
    fontSize: hp('1.9%'),
    minHeight: height * 0.07,
    height: height * 0.1,
  },
  commentBtn: {
    borderRadius: width * 0.03,
    padding: 10,
    justifyContent: 'center',
    width: width * 0.3,
    alignItems: 'center',
    backgroundColor: '#B01125',
    alignSelf: 'flex-end',
    // marginRight: width * 0.01,
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
    marginRight: width * 0.05,
  },
  outerInfoView: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: width * 0.9,
    // paddingHorizontal: width * 0.05,
  },
  innerInfoView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginVertical: height * 0.01,
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
});
