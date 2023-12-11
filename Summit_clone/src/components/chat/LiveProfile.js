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

const imageArray = [
  {
    id: 0,
    image_url: require("../../images/agenda/image1.png"),
  },
  {
    id: 1,
    image_url: require("../../images/agenda/image2.jpg"),
  },
  {
    id: 3,
    image_url: require("../../images/agenda/image3.jpg"),
  },
  {
    id: 4,
    image_url: require("../../images/agenda/image4.jpg"),
  },
  {
    id: 5,
    image_url: require("../../images/agenda/image5.jpg"),
  },
  {
    id: 6,
    image_url: require("../../images/agenda/image1.png"),
  },
  {
    id: 7,
    image_url: require("../../images/agenda/image2.jpg"),
  },
  {
    id: 8,
    image_url: require("../../images/agenda/image3.jpg"),
  },
  {
    id: 9,
    image_url: require("../../images/agenda/image4.jpg"),
  },
  {
    id: 10,
    image_url: require("../../images/agenda/image5.jpg"),
  },
  {
    id: 11,
    image_url: require("../../images/agenda/image1.png"),
  },
  {
    id: 12,
    image_url: require("../../images/agenda/image2.jpg"),
  },
  {
    id: 13,
    image_url: require("../../images/agenda/image3.jpg"),
  },
  {
    id: 14,
    image_url: require("../../images/agenda/image4.jpg"),
  },
  {
    id: 15,
    image_url: require("../../images/agenda/image5.jpg"),
  },
  {
    id: 16,
    image_url: require("../../images/agenda/image1.png"),
  },
  {
    image_url: require("../../images/agenda/image2.jpg"),
  },
  {
    image_url: require("../../images/agenda/image3.jpg"),
  },
  {
    image_url: require("../../images/agenda/image4.jpg"),
  },
  {
    image_url: require("../../images/agenda/image5.jpg"),
  },
  {
    image_url: require("../../images/agenda/image2.jpg"),
  },
  {
    image_url: require("../../images/agenda/image3.jpg"),
  },
  {
    image_url: require("../../images/agenda/image4.jpg"),
  },
  {
    image_url: require("../../images/agenda/image5.jpg"),
  },
  {
    image_url: require("../../images/agenda/image1.png"),
  },
  {
    image_url: require("../../images/agenda/image2.jpg"),
  },
  {
    image_url: require("../../images/agenda/image3.jpg"),
  },
  {
    image_url: require("../../images/agenda/image4.jpg"),
  },
  {
    image_url: require("../../images/agenda/image5.jpg"),
  },
];

// for (let i = 0; i < array.length; i++) {
//     const element = array[i];
//     red
// }

const showOnline = (item) => (
  <View key={item.index} style={styles.listItem}>
    <Image
      source={item.item.image_url}
      style={styles.profileImage}
    />
  </View>
);

function LiveProfile() {
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        horizontal
        inverted={false}
        showsHorizontalScrollIndicator={false}
        data={imageArray}
        renderItem={showOnline}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.userTitle}>
        <View style={styles.active}></View>
        <Text style={styles.username}>137 Online Now</Text>
      </View>
    </View>
  );
}

export default LiveProfile;

const styles = StyleSheet.create({
  flatListContainer: {
    // backgroundColor: "red",
    paddingLeft: width * 0.03,
  },
  listItem: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "yellow",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 1,
    marginRight: -17,
    zIndex: 1,
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
    borderRadius: 30,
    marginRight: width * 0.01,
    backgroundColor: "#2fcf00",
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
    // backgroundColor : "yellow"
  },
});
