import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  SendProps,
} from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import * as actions from '../../Store/Actions/index';
import { View } from 'react-native';
import { themeRed } from '../../Assets/Colors/Colors';
import { io } from 'socket.io-client';
import { imageUrl } from '../../Config/Apis.json';
import { api } from '../../Config/Apis.json';
import { useIsFocused } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

function Chat({ route, getMessages, messagesReducer, sendMessage, userReducer }) {
  const isFocused = useIsFocused();
  // const socket = useRef();
  const [text, setText] = useState('');
  console.log("=========================", text)
  const userId = userReducer?.data?.user_id;
  const [messages, setMessages] = useState([]);
  const [randNum, setRandNum] = useState(null);
  const [arrivalMessage, setarrivalMessage] = useState(null);
  const CURRENT_CHAT = messagesReducer?.currentChat;
  const conversationId = CURRENT_CHAT?.conversationId;
  const chatPersonId = CURRENT_CHAT?.chatPerson?.user_id;
  const [saveText, setSaveText] = useState('');
  const [id, setId] = useState(null);
  const apiData = {
    sender: userId,
    receiver: CURRENT_CHAT?.chatPerson?.user_id,
  };
  const socket = io(api);
  // const socket = io("http://192.168.0.136:5001");
  useEffect(() => {
    socket.connect();

    const eventData = {
      userId: `${userId}`,

    };
    socket.emit('addUser', eventData);

  }, [])
  socket.on('connect', () => {
    console.log('Socket.IO connected+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
  });
  socket.on('disconnect', (reason) => {
    console.log('Socket.IO disconnected:', reason);
  });
  console.log("Messages", messages)
  const mymessages = () => {
    console.log("=======================================",
      "HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
    console.log(".sjlkdhslkahdlkhsalkhdlks", chatPersonId)
    const eventName = 'sendMessage';
    const eventData = {
      receiverId: chatPersonId,
      senderId: `${userId}`,
      text: saveText,
      id: id,

    };
    socket.emit(eventName, eventData)
  }
  useEffect(() => {
    socket.on("getMessage", (data) => {
      getMessageIsFocused(isFocused);

      console.log("adkhksahgdkj", data)
    })
  }, [])



  async function getMessageIsFocused(isFocused) {
    if (
      isFocused &&
      userId !== null &&
      userId !== undefined &&
      chatPersonId !== undefined &&
      chatPersonId !== null
    ) {
      await getMessages(apiData, CURRENT_CHAT);
    }
    if (isFocused === false) {
      setMessages([]);

    }
  }

  useEffect(() => {
    getMessageIsFocused(isFocused);

    return () => {

    };
  }, [isFocused]);

  useEffect(() => {
    setMessages(messagesReducer?.messages);
  }, [messagesReducer?.messages]);
  console.log("date__+_+_+_+_+_", new Date().toISOString())
  const handlesend = async () => {
    const messageToBeSend = {
      receiver: chatPersonId,
      sender: userId,
      message: text,
      // createdAt: new Date()
    };
    console.log("text", text)
    console.log(messageToBeSend, 'message to send');
    setSaveText(text);
    console.log(messageToBeSend);
    await sendMessage(messageToBeSend, onSucces);
    mymessages()
  }

  useEffect(() => {
    if (id !== null) {
      console.log('text:   ', text);
      const messageToAppend = {
        _id: id,
        text: saveText,
        createdAt: new Date(),
        user: {
          _id: userId,
          avatar: require('../../Assets/Images/pic8.png'),
          name: userReducer?.data?.user_name,
        },
      };

      console.log(messageToAppend, 'message To Append');
      setMessages(prev => [messageToAppend, ...prev]);
      // setText('');
      setId(null);
    }
  }, [id]);
  const onSucces = id => {
    console.log(id, '------');
    setId(id);
  };
  useEffect(() => {
    if (arrivalMessage) {
      setMessages(prev => [arrivalMessage, ...prev]);
    }
  }, [arrivalMessage]);

  return (
    <ImageBackground
      style={{ ...StyleSheet.absoluteFillObject }}
      source={require('../../Assets/Images/white-bg.jpeg')}>

      <GiftedChat
        keyboardShouldPersistTaps="always"

        onInputTextChanged={setText}
        messages={messages}

        onSend={messages => {

          handlesend();
        }}

        renderBubble={props => {
          return (
            <Bubble
              {...props}
              position={
                props?.currentMessage?.user?._id == userId ? 'right' : 'left'
              }
              textStyle={{
                right: {
                  color: 'white',
                  fontSize: width * 0.04,
                },
                left: {
                  fontSize: width * 0.04,
                },
              }}
              wrapperStyle={{
                right: {
                  color: 'white',
                  backgroundColor: themeRed,
                  marginRight: 5,
                  marginVertical: 5,

                },
                left: {
                  color: 'white',
                  backgroundColor: 'white',
                  marginVertical: 5,
                  borderWidth: 1,
                  borderColor: 'silver',

                },
              }}
            />
          );
        }}
        user={{
          _id: userId,
        }}
      />

    </ImageBackground>
  );
}

const mapStateToProps = ({ messagesReducer, userReducer }) => {
  return { messagesReducer, userReducer };
};
export default connect(mapStateToProps, actions)(Chat);
