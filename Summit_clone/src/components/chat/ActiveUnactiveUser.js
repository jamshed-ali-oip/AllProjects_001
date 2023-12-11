import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const ActiveUnactiveArray = [
  {
    id: 0,
    image_url: require("../../images/agenda/image1.png"),
    isActive: true,
    username: "Micheal",
  },
  {
    id: 1,
    image_url: require("../../images/agenda/image2.jpg"),
    isActive: false,
    username: "Charles",
  },
  {
    id: 3,
    image_url: require("../../images/agenda/image3.jpg"),
    isActive: true,
    username: "Informix",
  },
  {
    id: 4,
    image_url: require("../../images/agenda/image4.jpg"),
    isActive: true,
    username: "Launch",
  },
  {
    id: 5,
    image_url: require("../../images/agenda/image5.jpg"),
    isActive: true,
    username: "Test",
  },
  {
    id: 6,
    image_url: require("../../images/agenda/image1.png"),
    isActive: true,
    username: "Micheal",
  },
  {
    id: 7,
    image_url: require("../../images/agenda/image2.jpg"),
    isActive: false,
    username: "Charles",
  },
  {
    id: 8,
    image_url: require("../../images/agenda/image3.jpg"),
    isActive: true,
    username: "Informix",
  },
  {
    id: 9,
    image_url: require("../../images/agenda/image4.jpg"),
    isActive: true,
    username: "Launch App",
  },
  {
    id: 10,
    image_url: require("../../images/agenda/image5.jpg"),
    isActive: true,
    username: "Test",
  },
];

const uiItems = (item) => (
    <View key={item.id}  style={styles.listItem}>
      <Image source={item.item.image_url} style={styles.profileImage} />
      <View style={styles.userTitle}>
        <View style={item.item.isActive ? [styles.active, {backgroundColor: "#2fcf00"}] : [styles.active, {backgroundColor: "#dfe3e7"}] }></View>
        <Text style={styles.username}>{item.item.username}</Text>
      </View>
    </View>
);

function ActiveUnactiveUser() {
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={ActiveUnactiveArray}
        renderItem={uiItems}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default ActiveUnactiveUser;

const styles = StyleSheet.create({
  flatListContainer: {
    // backgroundColor: "red",
    paddingLeft: width * 0.03,
    paddingTop : 12,
    paddingBottom : 21,
  },
  listItem: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    marginRight: width * 0.055,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  userTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop : 8,
    paddingLeft : width * 0.035
  },
  active: {
    height: 9,
    width: 9,
    borderRadius: 100,
    marginRight: width * 0.01,
    position : "absolute",
    // left : -13,
    top : 2
    // marginTop : width * 0.01
  },
  username: {
    fontSize: width * 0.044,
    fontFamily: "SFProDisplayMedium",
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: -0.5,
    lineHeight : width * 0.044,
    color: "#333333",
  },
});
