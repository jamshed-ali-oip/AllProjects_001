import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  RefreshControl,Platform
} from 'react-native';
import Messages from '../../../model/Messages';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MessageList from './MessageList';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import AppText from '../../Components/AppText';
import * as actions from '../../Store/Actions/index';
import {useIsFocused} from '@react-navigation/native';
import {themeRed} from '../../Assets/Colors/Colors';

const {width, height} = Dimensions.get('window');

const MessageScreen = ({
  navigation,
  route,
  userReducer,
  getAllConversations,
  messagesReducer,
  saveCurrentChatObject,
}) => {
  const user = userReducer?.data;
  const [conversationlist, setconversationlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const isIOS = Platform.OS === 'ios';

  useEffect(async () => {
    setIsLoading(true);
    await getAllConversations(user?.user_id);
    setIsLoading(false);
  }, [isFocused]);

  useEffect(() => {
    if (messagesReducer?.conversations !== undefined) {
      setconversationlist(messagesReducer?.conversations);
    }
  }, [messagesReducer?.conversations]);

  const Separater = () => {
    return (
      <View
        style={{
          borderBottomColor: '#D8D8D8',
          borderBottomWidth: 0.8,
          width: wp('100%'),
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      />
    );
  };

  const onPressChat = item => {
    saveCurrentChatObject(item);
    navigation.navigate('chats');
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(async () => {
      setRefreshing(false);
      setIsLoading(true);
      await getAllConversations(user?.user_id);
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={[styles.container, conversationlist?.length === 0 && {backgroundColor:'white'}]}>
      {isLoading ? (
        <>
          <LottieView
            style={[styles.lottieStyles, isIOS ? {marginLeft: width * 0.06} : {marginLeft: width * 0.11}]}
            source={require('../../Assets/Lottie/loading-heart.json')}
            autoPlay
            loop
          />
          <Text style={[styles.loadingText,!isIOS && {marginBottom: height * -0.02,}]}>{`Loading`}</Text>
          <Text style={styles.convStyles}>{`Conversations..`}</Text>
        </>
      ) : conversationlist?.length === 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            style={{
              width: width * 0.5,
              height: height * 0.35,
            }}
            source={require('../../Assets/Lottie/no-messages.json')}
            autoPlay
            loop
          />
          <View
            style={{
              // marginTop: height * -0.07,
              width: width * 0.75,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppText
              nol={1}
              family="Poppins-Bold"
              size={width * 0.06}
              style={{alignSelf: 'center'}}
              color="black"
              Label={'No Messages'}
            />
            <AppText
              nol={3}
              family="Poppins-Medium"
              size={width * 0.05}
              style={{alignSelf: 'center'}}
              color="black"
              Label={'Offer drinks and connect'}
            />
            <AppText
              style={{marginTop: -5}}
              nol={2}
              family="Poppins-Medium"
              size={width * 0.05}
              color="black"
              Label={' to start a conversation.'}
            />
          </View>
        </View>
      ) : (
        // null
        <FlatList
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          data={conversationlist}
          ItemSeparatorComponent={Separater}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={<View style={{height: 20}}></View>}
          ListFooterComponent={() => {
            if (isLoading) {
              return <View />;
            } else {
              return <View style={{paddingBottom: height * 0.01}} />;
            }
          }}
          renderItem={({item, index}) => (
            <MessageList
              item={item}
              Time={new Date()}
              Image={item?.user_image}
              Name={item?.user_name}
              Message={'This is a dummy last message of this user.'}
              onPress={onPressChat}
              OnlineStatus={false}
              Navigation={navigation}
            />
          )}
        />
      )}
    </View>
  );
};
const mapStateToProps = ({userReducer, messagesReducer}) => {
  return {userReducer, messagesReducer};
};

export default connect(mapStateToProps, actions)(MessageScreen);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: hp('103%'),
    backgroundColor: 'rgba(224, 224, 224, 0.8)',
  },
  lottieStyles: {
    // marginTop: height * -0.03,
    // width: width * 0.2,
    marginBottom: height * -0.05,
    height: height * 0.3,
    marginLeft: width * 0.12,
  },
  loadingText: {
    // marginTop: height * -0.06,
    marginLeft: width * 0.36,
    fontSize: width * 0.07,
    fontFamily: 'Poppins-Medium',
  },
  convStyles: {
    marginLeft: width * 0.24,
    fontSize: width * 0.07,
    fontFamily: 'Poppins-Medium',
  },
});
