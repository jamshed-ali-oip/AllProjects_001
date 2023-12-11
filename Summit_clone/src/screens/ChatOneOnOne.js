import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ActivityIndicator,
  FlatList
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  Actions,
  Bubble,
  Composer,
  GiftedChat,
  Send
} from "react-native-gifted-chat";
import { AntDesign, Feather } from "@expo/vector-icons";
import CustomHeader from "../components/common/CustomHeader";
import Dot from "../components/icons/Dot";
import { Avatar } from "../components/ui";
import Screen from "../components/ui/Screen";
import colors from "../constants/colors";
import Arrow from "../components/icons/Arrow";
import { useAuth } from "../context/Auth";
import { faker } from "@faker-js/faker";
import { db } from "../firebase";
import { getMessages, sendMessage, pickImage } from "../services/chatService";
import {
  getExtension,
  getProperFileName,
  getSender,
  uploadImage
} from "../helpers/functions";

const ChatOneOnOne = ({ navigation, route }) => {
  const { authData } = useAuth();

  const { parentScreen, attendees, conversationId } = route.params;
  const [messages, setMessages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [galleryImgSelected, setGalleryImgSelected] = useState(false);
  const [cameraImgSelected, setCameraImgSelected] = useState(false);
  const [txt, setTxt] = useState("");
  const [file, setFile] = useState(null);

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({
      tabBarStyle: {
        display: "none"
      }
    });
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      },
      header: customHeaderComponent
    });

    return () => {
      parent.setOptions({
        tabBarStyle: {
          display: parentScreen === "newChatScreen" ? "none" : "flex"
        }
      });
    };
  }, [navigation]);

  useEffect(() => {
    let ref;
    const attendeesLength = attendees.length;
    const userId = authData.user.id;
    if (attendeesLength > 1 && conversationId) {
      ref = db.ref("messages").child(userId).child(conversationId);
    } else if (attendeesLength === 1) {
      ref = db.ref("messages").child(userId).child(attendees[0].id);
    }
    const messagesListener = getMessages(ref, setMessages);
    return () => {
      ref.off("child_added", messagesListener);
    };
  }, []);

  useEffect(() => {
    if ((image || file) && txt === "") {
      setTxt(" ");
    }
  }, [txt]);

  const onSend = useCallback(
    async (messages = []) => {
      const message = messages[0];
      let imageUrl = "";
      // console.log("This is the image  ", image);
      // console.log("This is the file ", file);
      if (message?.text?.trim() !== "" || image || file) {
        let messageWithProperties = { text: message.text };
        const sender = getSender(
          [...attendees, authData.user],
          message.user._id
        );
        if (!image && !file) {
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
          );
        }
        if (image) {
          setUploading(true);
          imageUrl = await uploadImage(image, setUploading);
          // console.log("This is the uri of the uploaded image ", imageUrl);
        }
        if (file) {
          setUploading(true);
          // console.log("This is the second file ", file);
          const fileUrl = await uploadImage(file.uri, setUploading, true);
          const extension = getExtension(file.uri);
          messageWithProperties = {
            ...messageWithProperties,
            file_type: extension,
            file: fileUrl,
            file_name: file.name
          };
        }
        sendMessage(
          attendees,
          sender,
          messageWithProperties,
          imageUrl,
          message._id,
          conversationId
        );
        setUploading(false);
      }
      setImage(null);
      setCameraImgSelected(false);
      setGalleryImgSelected(false);
      setFile(null);
    },
    [image, file]
  );

  const renderHeaderItem = ({ item, index }) => {
    return (
      <View style={styles.headerItemContainer}>
        <Avatar src={{ uri: item.avatar || faker.image.avatar() }} size="medium" />
      </View>
    );
  };

  const customHeaderComponent = () => {
    const attendeesLength = attendees.length;
    const isGroupChat = attendeesLength > 1
    return (
      <CustomHeader>
        <View style={styles.customHeaderContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Arrow name="left" color={colors.primary}    
 />
          </TouchableOpacity>
          {isGroupChat ?<View style={styles.headerFlatListContainer}>
            <FlatList
              horizontal
              data={attendees}
              renderItem={renderHeaderItem}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          :
          <Avatar
          src={{ uri: attendees[0]?.imageSource || faker.image.avatar() }}
          size="medium"
        />}
          <Dot color={colors.active} style={styles.dot} />
          <Text style={isGroupChat ? styles.groupHeaderText : styles.name}>
            {isGroupChat ? attendeesLength < 7 ? attendeesLength  : "+6" : attendees[0]?.firstName} {isGroupChat && "Online Now"}
          </Text>
        </View>
      </CustomHeader>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.primary
          }
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

  const renderCustomView = ({ currentMessage, user }) => {
    const type = currentMessage?.file_type;
    const file = currentMessage?.file;
    const filename = currentMessage?.file_name;
    const isUser = currentMessage.user._id === authData.user.id;

    if (type) {
      return (
        <View style={{ paddingLeft: 5, paddingTop: 5 }}>
          <TouchableOpacity
            onPress={() => Linking.openURL(file)}
            style={styles.file}
          >
            <Feather
              name="file"
              size={24}
              color={isUser ? colors.white : colors.black}
            />
            <Text
              style={{
                ...styles.fileName,
                color: isUser ? colors.white : colors.black
              }}
            >
              {getProperFileName(filename, type)}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderActions = (props) => {
    return (
      <>
        <Actions
          {...props}
          icon={() => (
            <Feather
              name={`${cameraImgSelected ? "check" : "camera"}`}
              size={24}
              color={colors.primary}
            />
          )}
          onPressActionButton={() => {
            if (!uploading) {
              pickImage(
                true,
                setImage,
                setCameraImgSelected,
                setGalleryImgSelected,
                setFile,
                cameraImgSelected,
                txt,
                setTxt
              );
            }
          }}
        />
        <Actions
          {...props}
          icon={() => (
            <AntDesign
              name={`${galleryImgSelected || file ? "check" : "picture"}`}
              size={24}
              color={colors.primary}
            />
          )}
          onPressActionButton={() => {
            if (!uploading) {
              pickImage(
                false,
                setImage,
                setCameraImgSelected,
                setGalleryImgSelected,
                setFile,
                cameraImgSelected,
                txt,
                setTxt
              );
            }
          }}
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
          padding: 5
        }}
      />
    );
  };

  const renderSend = (props) => {
    return uploading ? (
      <ActivityIndicator
        size={24}
        color={colors.primary}
        style={styles.sendButton}
      />
    ) : (
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
        text={txt}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        onInputTextChanged={(text) => setTxt(text)}
        user={{
          _id: authData.user.id,
          name: authData.user.firstName
        }}
        renderBubble={renderBubble}
        renderActions={renderActions}
        renderSend={renderSend}
        renderComposer={renderComposer}
        renderCustomView={renderCustomView}
        renderLoading={() => (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
        disableComposer={uploading}
      />
      {/* {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />} */}
    </Screen>
  );
};

export default ChatOneOnOne;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colors.white,
    flex: 1
  },

  back: {
    color: colors.primary,
    fontSize: RFPercentage(2.5),
    marginRight: "3%"
  },
  customHeaderContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  name: {
    marginLeft: "1%",
    fontSize: RFPercentage(2.3),
    color: colors.black
  },
  groupHeaderText:{
    marginLeft: "1%",
    fontSize: RFPercentage(2),
    color: colors.black
  },
  dot: {
    marginLeft: -10
  },
  sendButton: {
    paddingBottom: 10,
    paddingRight: 10
  },

  tick: {
    fontSize: 10,
    color: colors.white
  },
  tickView: {
    flexDirection: "row",
    marginRight: 10
  },
  file: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  fileName: { marginRight: 10, marginLeft: 3 },
  headerFlatListContainer: {
    maxWidth: 190,
    borderRadius: 30,
    overflow: "hidden",
    marginLeft: 5
  },
  headerItemContainer: {
    // paddingTop: 15,
    marginRight: -15
  }
});
