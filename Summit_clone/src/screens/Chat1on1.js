import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
  Actions,
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import { AntDesign, Feather } from '@expo/vector-icons';
import { faker } from '@faker-js/faker';

import { getChatMessages } from '../api/actions';
import CustomHeader from '../components/common/CustomHeader';
import Dot from '../components/icons/Dot';
import { Avatar } from '../components/ui';
import Screen from '../components/ui/Screen';
import colors from '../constants/colors';
import Arrow from '../components/icons/Arrow';
import { useAuth } from '../context/Auth';

const Chat1on1 = ({ navigation, route }) => {
  const { authData } = useAuth();

  const { data } = route.params;
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });

    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
      header: customHeaderComponent,
    });

    return () => {
      parent.setOptions({
        tabBarStyle: {
          display: 'flex',
        },
      });
    };
  }, [navigation]);

  useEffect(() => {
    setMessages(getChatMessages());
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    
    // console.log("These are the messages ", messages)
  }, []);

  const renderAvatarListItem = ({ item }) => (
    <View style={{ marginRight: 10 }}>
      <Avatar
        src={{
          uri: item.avatarUrl != null ? item.avatarUrl : faker.image.avatar(),
        }}
        size="small"
      />
    </View>
  );

  const customHeaderComponent = () => (
    <CustomHeader>
      <View style={styles.customHeaderContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Arrow name="left" color={colors.primary} />
        </TouchableOpacity>

        {data.users.length < 2 ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar
              src={{
                uri:
                  data.users[0].avatarUrl != null
                    ? x.avatarUrl
                    : faker.image.avatar(),
              }}
              size="small"
            />
            <Dot color={colors.active} style={styles.dot} />
            <Text
              style={styles.name}
            >{`${data.users[0].firstName} ${data.users[0].lastName}`}</Text>
          </View>
        ) : (
          <FlatList
            data={data.users}
            renderItem={renderAvatarListItem}
            horizontal
            keyExtractor={(item, index) => index}
          />
        )}
      </View>
    </CustomHeader>
  );

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.primary,
          },
        }}
        renderTicks={renderTicks}
      />
    );
  };

  const renderTicks = ({ currentMessage, renderTicks, user, tickStyle }) => {
    if (renderTicks && currentMessage) {
      return renderTicks(currentMessage);
    }
    if (currentMessage && user && currentMessage.user._id !== user._id) {
      return null;
    }
    if (
      currentMessage &&
      (currentMessage.sent || currentMessage.received || currentMessage.pending)
    ) {
      return (
        <View style={styles.tickView}>
          {!!currentMessage.sent && (
            <Text style={[styles.tick, tickStyle]}>✓</Text>
          )}
          {!!currentMessage.received && (
            <Text style={[styles.tick, tickStyle]}>✓</Text>
          )}
        </View>
      );
    }
    return null;
  };

  const renderActions = (props) => {
    return (
      <>
        <Actions
          {...props}
          icon={() => (
            <Feather name="camera" size={24} color={colors.primary} />
          )}
          onPressActionButton={() => {}}
        />
        <Actions
          {...props}
          icon={() => (
            <AntDesign name="picture" size={24} color={colors.primary} />
          )}
          onPressActionButton={() => {}}
        />
      </>
    );
  };

  const renderComposer = (props) => {
    return (
      <Composer
        {...props}
        textInputStyle={{
          backgroundColor: colors.lightGray,
          borderRadius: 20,
          marginRight: 10,
          padding: 5,
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props} alwaysShowSend>
        <View style={styles.sendButton}>
          <Feather name="arrow-up-circle" size={24} color={colors.primary} />
        </View>
      </Send>
    );
  };

  return (
    <Screen style={styles.screenContainer}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: authData.user.id,
          name: authData.user.firstName
        }}
        renderBubble={renderBubble}
        renderActions={renderActions}
        renderSend={renderSend}
        renderComposer={renderComposer}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </Screen>
  );
};

export default Chat1on1;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },

  back: {
    color: colors.primary,
    fontSize: RFPercentage(2.5),
    marginRight: '3%',
  },
  customHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: '1%',
    fontSize: RFPercentage(2.5),
    color: colors.black,
  },
  dot: {
    marginLeft: -10,
  },
  flatlistContainer: {
    height: '90%',
    paddingLeft: '5%',
  },

  sendButton: {
    paddingBottom: 10,
    paddingRight: 10,
  },

  tick: {
    fontSize: 10,
    color: colors.white,
  },
  tickView: {
    flexDirection: 'row',
    marginRight: 10,
  },
});
