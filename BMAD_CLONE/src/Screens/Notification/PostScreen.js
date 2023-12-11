import {
  StyleSheet,
  RefreshControl,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import PostList from '../Home/PostList';
import Comment from '../Home/Comments';
import * as actions from '../../Store/Actions/index';
import { connect } from 'react-redux';
import Avatar from '../../Components/Avatar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppText from '../../Components/AppText';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import { useRoute } from '@react-navigation/native';
import { imageUrl } from '../../Config/Apis.json';
import { dateInDays } from '../../Utils/times';

const { height, width } = Dimensions.get('window');

const PostScreen = ({
  getPostById,
  postsReducer,
  userReducer,
  route,
  navigation,
  likePostFromScreen,
  getAllCommentsOfPost,
  commentOnPost,
}) => {
  const userId = userReducer?.data?.user_id;
  const notificationData = route?.params?.notificationData;
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isIOS = Platform.OS === 'ios';
  const [refreshing, setRefreshing] = useState(false);
  const postId = notificationData?.post?.post_id;
  const [commentText, setCommentText] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [postComments, setPostComments] = useState([]);
  // console.log("sbagdjfksagkjgdjkgskjdgksjag", postComments)
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const getPostData = async () => {
    setIsLoading(true);
    await getPostById(postId, userId);
    await getAllCommentsOfPost(postId).then((res) => {
      setPostComments(res);
      // console.log("comments ", res)
    });
    setIsLoading(false);
  };

  const _onPressHeart = () => {
    const apiData = {
      post_id: postId,
      user_id: userId,
    };
    likePostFromScreen(apiData);
  };
  // console.log(postData, 'post data');
  // console.log(postsReducer?.postComments, 'post comments');
  const onRefresh = React.useCallback(() => {

  }, []);

  const _onPressComment = async () => {
    const apiData = {
      user_id: userId,
      post_id: postId,
      comment: commentText,
    };
    setIsCommenting(true);
    await commentOnPost(apiData, onSuccess);
  };

  const onSuccess = () => {
    setIsCommenting(false);
    setCommentText('');
    getAllCommentsOfPost(postId).then((res) => {
      setPostComments(res);
    });
  };

  useEffect(() => {
    if (postId !== null && postId !== undefined) {
      getPostData();
    }
  }, [postId]);

  useEffect(() => {
    if (postsReducer?.post !== null && postsReducer?.post !== undefined) {
      setPostData(postsReducer?.post);
    }
  }, [postsReducer?.post]);


  // console.log(userReducer?.data?.user_image, '--');
  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            <PostList
              item={postData}
              Img={postData?.post_url}
              Name={postData?.user_id?.user_name}
              Description={postData?.post_desc}
              ProfileImg={postData?.user_id?.user_coverImage}
              UploadTime={postData?.post_created_at}
              TotalLike={postData?.count_likes}
              Comment={postData?.count_comments}
              Navigation={navigation}
              _onPressHeart={_onPressHeart}
            />
            <View style={styles.shadowContainerForIos}>
              <View style={styles.commentBoxContainer}>
                <Avatar
                  size="small"
                  source={
                    userReducer?.data?.user_image
                      ? {
                        uri: `${imageUrl}/${userReducer?.data?.user_image}`,
                      }
                      : require('../../Assets/Images/maroon-dp2.jpeg')
                  }
                />
                <TouchableWithoutFeedback>
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
          </>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: height * 0.14 }}
        data={postComments.reverse()}
        keyExtractor={(item, index) => index}
        inverted={true}
        renderItem={({ item, index }) => {

          return (
            <Comment
              item={item}
              img={item?.user_image || item?.user?.user_image}
              name={item?.user_name || item?.user?.user_name}
              time={moment(item?.created_at).format('lll')}


              message={item?.comment}
            />
          );
        }}
      />
    </View>
  );
};

const mapStateToProps = ({ postsReducer, userReducer }) => {
  return { postsReducer, userReducer };
};

export default connect(mapStateToProps, actions)(PostScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3F2',
    paddingBottom: 100
  },
  commentBoxContainer: {
    flexDirection: 'row',
    width: width * 0.9,
    borderRadius: 10,
    zIndex: 4,
    padding: 10,
    elevation: 10,
    marginTop: height * 0.02,
    borderColor: 'silver',
    // borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'center',
    //  height:100
  },
  commentBtn: {
    borderRadius: width * 0.03,
    padding: 10,
    justifyContent: 'center',
    width: width * 0.3,
    alignItems: 'center',
    backgroundColor: '#B01125',
    alignSelf: 'flex-end',
    marginRight: width * 0.04,
    marginTop: height * 0.02,
    marginBottom: 10,
  },
  textInputStyles: {
    marginLeft: width * 0.03,
    width: '85%',
    borderRadius: 6,
    top: -3,
    color: 'grey',
    fontSize: hp('1.9%'),
    minHeight: height * 0.07,
    height: height * 0.1
  },
  shadowContainerForIos: {
    flex: 1,
    // No backgroundColor
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
  },
});
