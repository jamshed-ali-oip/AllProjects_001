import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/core";
import { useAuth } from "../../context/Auth";
import { AntDesign, Feather } from "@expo/vector-icons";
import { handleNewChat, pickImage } from "../../services/chatService";

const NewChatScreenInput = ({ selectedAttendees }) => {
  const { authData } = useAuth();
  const [message, setMessage] = useState("");
  const navigation = useNavigation();
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [galleryImgSelected, setGalleryImgSelected] = useState(false);
  const [cameraImgSelected, setCameraImgSelected] = useState(false);
  const user = authData.user;
  const handleOpenNewChat = async () => {
    await handleNewChat(
      selectedAttendees,
      message,
      image,
      file,
      user,
      navigation,
      setUploading
    );
    setMessage("");
    setImage(null);
    setFile(null);
    setGalleryImgSelected(false);
    setCameraImgSelected(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (!uploading) {
            pickImage(
              true,
              setImage,
              setCameraImgSelected,
              setGalleryImgSelected,
              setFile,
              cameraImgSelected
            );
          }
        }}
      >
        <Feather
          name={`${cameraImgSelected ? "check" : "camera"}`}
          size={24}
          color={colors.primary}
          style={styles.cameraIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (!uploading) {
            pickImage(
              false,
              setImage,
              setCameraImgSelected,
              setGalleryImgSelected,
              setFile,
              cameraImgSelected
            );
          }
        }}
      >
        <AntDesign
          name={`${galleryImgSelected ? "check" : "picture"}`}
          size={24}
          color={colors.primary}
          style={styles.pictureIcon}
        />
      </TouchableOpacity>
      <TextInput
        // placeholderTextColor={colors.black}
        onChangeText={(text) => setMessage(text)}
        value={message}
        style={styles.textInput}
        placeholder="Type a message..."
        placeholderTextColor={"#adada8"}
        placeholderStyle={{ fontSize: 30 }}
      />
      {uploading ? (
        <ActivityIndicator
          size={24}
          color={colors.primary}
          style={styles.arrowIcon}
        />
      ) : (
        <TouchableOpacity onPress={handleOpenNewChat}>
          <Feather
            name="arrow-up-circle"
            size={24}
            color={colors.primary}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    backgroundColor: colors.lightGray,
    marginBottom: 8
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    fontSize: 16,
  },
  pictureIcon: {
    marginRight: 15
  },
  cameraIcon: {
    marginLeft: 12,
    marginRight: 10
  },
  arrowIcon: {
    marginRight: 10
  }
});

export default NewChatScreenInput;
