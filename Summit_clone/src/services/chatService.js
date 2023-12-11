import { auth, db, storage, firebase } from "../firebase";
import { faker } from "@faker-js/faker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import routes from "../routes/routes";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import {
  arrayEquals,
  getExtension,
  getReceivers,
  uploadImage
} from "../helpers/functions";
import { fileTypes, imageExtensions } from "../constants/data";
import {isEqual} from "lodash"

export const getConversationId = (conversationUsersIds, attendees) => {
  console.log("This is the conversationUsersIds ", conversationUsersIds)
  let conversationId;
  const attendeesIds = attendees.map((attendee) => attendee.id);
  // console.log("This is the attendeesIds ", attendeesIds)

  conversationUsersIds.forEach((item) => {
    const firstArray = Object.values(item)[0];
    if (arrayEquals(firstArray.sort(), attendeesIds.sort())) {
      conversationId = Object.keys(item)[0];
    }
  });
  return conversationId;
};

export const getConversations = async (ref, setConversations, setGroupChats) => {
  const conversationUsersIds = await AsyncStorage.getItem(
    "@ConversationUsersIds"
  );
  const listener = ref.on("value", (snapShot) => {
    let dbConversations = [];
    const dbConversationUsersIds = [];
    let users = [];
    let id;
    snapShot.forEach((shot) => {
      let messages = [];
      id = shot.key;
      shot.forEach((item) => {
        const itemVal = item.val();
        let dbReceivers = [];
        Object.keys(itemVal.to).forEach((key) => {
          const receiver = {
            _id: key,
            ...itemVal.to[key]
          };
          dbReceivers.push(receiver);
        });
        users = [...dbReceivers, itemVal.from].filter(
          (item) => item._id !== auth.currentUser.uid
        );
        messages.push(itemVal);
      });
      messages.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      const lastMessage = messages[0];
      const msg = {
        id: id,
        isActive: faker.datatype.boolean(),
        message: (lastMessage.file_type && lastMessage.text === "" )? "File" : (lastMessage.text === "" && lastMessage.image !== "") ? "Image" : lastMessage.text,
        users: users.map((user) => ({
          id: user?._id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          avatar: faker.image.avatar()
        })),
        timestamp: lastMessage.createdAt
      };
      dbConversationUsersIds.push({
        [id]: users.map((user) => user._id)
      });
      dbConversations.push(msg);
    });
    console.log("dbConversations ", dbConversations)
    setConversations(dbConversations.filter((msg) => msg.users.length === 1).sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    }));
    setGroupChats(dbConversations.filter((msg) => msg.users.length > 1).sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    }))
    if (
      !conversationUsersIds || !isEqual(JSON.parse(conversationUsersIds, dbConversationUsersIds.length))
      // .length !== dbConversationUsersIds.length
    ) {
      AsyncStorage.setItem(
        "@ConversationUsersIds",
        JSON.stringify(dbConversationUsersIds)
      );
    }
  })
  return listener
};


export const sendMessage = async (
  attendees,
  user,
  message,
  imageUrl,
  msgId,
  groupId,
  firstMsg
) => {
  // console.log("This is the message ", message);
  // console.log("This is the imageUrl ", imageUrl);
  const allUsers = [...attendees, user];
  const receivers = getReceivers(allUsers, user.id);
  const dbReceivers = {};
  receivers.forEach((receiver) => {
    const receiverId = receiver.id;
    dbReceivers[receiverId] = {
      firstName: receiver.firstName,
      lastName: receiver.lastName,
      avatar: ""
    };
  });

  const sender = {
    _id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: ""
  };
  const createdAt = new Date();
  const msg = {
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    image: imageUrl,
    from: sender,
    to: dbReceivers,
    ...message
  };
  // console.log("This is the message to create ", msg);
  let updates = {};
  if (attendees.length === 1) {
    const attendee = attendees[0];
    updates["messages/" + user.id + "/" + attendee.id + "/" + msgId] = msg;
    updates["messages/" + attendee.id + "/" + user.id + "/" + msgId] = msg;
  } else {
    allUsers.forEach((item) => {
      updates["messages/" + item.id + "/" + groupId + "/" + msgId] = msg;
    });
  }
  if (firstMsg) {
    await db.ref().update(updates);
  } else {
    db.ref().update(updates);
  }
};

export const handleNewChat = async (
  selectedAttendees,
  message,
  image,
  file,
  user,
  navigation,
  setUploading
) => {
  let conversationId;
  let messageWithProperties = { text: message };
  let imageUrl = "";

  if (selectedAttendees.length > 0) {
    setUploading(true);
    try {
      if (image) {
        imageUrl = await uploadImage(image, setUploading);
        // console.log("This is the uri of the uploaded image ", imageUrl);
      }
      if (file) {
        const fileUrl = await uploadImage(file.uri, setUploading, true);
        // console.log("This is the uri of the uploaded file ", fileUrl);
        const extension = getExtension(file.uri);
        messageWithProperties = {
          ...messageWithProperties,
          file_type: extension,
          file: fileUrl,
          file_name: file.name
        };
      }
    } catch (error) {
      setUploading(false);
    }
    if (
      selectedAttendees.length === 1 &&
      (message.trim() !== "" || image || file)
    ) {
      let msgId = db
        .ref("messages")
        .child(user.id)
        .child(selectedAttendees[0].id)
        .push().key;
      await sendMessage(
        selectedAttendees,
        user,
        messageWithProperties,
        imageUrl,
        msgId,
        conversationId,
        true
      );
    } else if (selectedAttendees.length > 1) {
      const conversationUsersIds = await AsyncStorage.getItem(
        "@ConversationUsersIds"
      );
      const id = await getConversationId(
        JSON.parse(conversationUsersIds),
        selectedAttendees
      );
      if (id) {
        conversationId = id;
      } else {
        conversationId = await db.ref("messages").child(user.id).push().key;
      }
      if (message.trim() !== "" || image || file) {
        let msgId = db
          .ref("messages")
          .child(user.id)
          .child(conversationId)
          .push().key;

        await sendMessage(
          selectedAttendees,
          user,
          messageWithProperties,
          imageUrl,
          msgId,
          conversationId,
          true
        );
      }
    }
    setUploading(false);
    navigation.navigate(routes.CHAT_ONE_ON_ONE_SCREEN_DETAILS, {
      attendees: selectedAttendees,
      conversationId,
      parentScreen: "newChatScreen"
    });
  }
};

export const getMessages = (ref, setMessages) => {
  return ref.on("child_added", (value) => {
    const dbMsgId = value.key;
    const dbMsgValue = value.val();
    const sender = { ...dbMsgValue.from, name: dbMsgValue.from.firstName };
    delete sender.firstName;
    let newMessage = {
      _id: value.key,
      text: dbMsgValue.text,
      createdAt: dbMsgValue.createdAt,
      user: sender,
      image: dbMsgValue.image
    };
    if (dbMsgValue.file_type) {
      newMessage = {
        ...newMessage,
        file_type: dbMsgValue.file_type,
        file: dbMsgValue.file,
        file_name: dbMsgValue.file_name
      };
    }
    // console.log("This is the dbMsgValue ", dbMsgValue);
    setMessages((previousMessages) => {
      const index = previousMessages.findIndex((item) => item._id === dbMsgId);
      if (index === -1) {
        return [...previousMessages, newMessage].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      } else {
        return [...previousMessages].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      }
    });
  });
};

export const pickImage = async (
  camera,
  setImage,
  setCameraImgSelected,
  setGalleryImgSelected,
  setFile,
  cameraImgSelected,
  txt,
  setTxt
) => {
  let result;
  const options = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1
  };
  if (camera) {
    result = await ImagePicker.launchCameraAsync(options);
  } else {
    result = await DocumentPicker.getDocumentAsync({});
  }
  if (!result.cancelled) {
    let uri = result.uri;
    if (!camera) {
      uri = "file://" + uri;
    }
    const extension = getExtension(uri).toLowerCase();
    const allAllowedTypes = [...imageExtensions, ...fileTypes];
    if (allAllowedTypes.includes(extension)) {
      if (txt === "") {
        setTxt(" ");
      }
      console.log("This is extension ", extension.toLowerCase())
      if (imageExtensions.includes(extension)) {
        if (!camera && !result.uri.startsWith("file")) {
          setGalleryImgSelected(true);
          if (cameraImgSelected) {
            setCameraImgSelected(false);
          }
        } else {
          setCameraImgSelected(true);
          setGalleryImgSelected(false);
        }
        setImage(uri);
        setFile(null);
      } else {
        const newFile = { ...result, uri };
        setFile(newFile);
        setGalleryImgSelected(true);
        setImage(null);
        setCameraImgSelected(false);
      }
    } else if (result.uri) {
      setFile(null);
      setGalleryImgSelected(false);
      setImage(null);
      setCameraImgSelected(false);
      alert("File Not Supported");
    }
  }
};
