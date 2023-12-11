import React, { useLayoutEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Platform,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";
import Carousel from "react-native-snap-carousel";
import {
  Feather,
  FontAwesome5,
  SimpleLineIcons,
  MaterialCommunityIcons,
  EvilIcons,
  Entypo,
} from "@expo/vector-icons";
import Svg, { G, Path, Circle, Ellipse } from "react-native-svg";

const backgroundImage = require("../images/susie_black.jpg");
const { height, width } = Dimensions.get("window");

const data = [
  {
    userName: "Linda Belcher",
    tagLine: "follow me on social media",
    externalLink: "lindabelchercoaching.com",
    shortDescription:
      "I am a transformational coach that helps women reshape thier relationship with money.",
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    userName: "Linda Belcher",
    tagLine: "follow me on social media",
    externalLink: "lindabelchercoaching.com",
    shortDescription:
      "I am a transformational coach that helps women reshape thier relationship with money.",
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    userName: "Linda Belcher",
    tagLine: "follow me on social media",
    externalLink: "lindabelchercoaching.com",
    shortDescription:
      "I am a transformational coach that helps women reshape thier relationship with money.",
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const AboutSpeakerProfile = ({ navigation }) => {
  const [refCarousel, setRefCarousel] = useState(null);
  const [externalLink, setExternalLink] = useState(false);

  const CarouselCardItem = ({ item, index }) => {
    console.log(item*9, "-----");
    return (
      <View style={{ marginBottom: 40 }} key={index}>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0)" translucent={true} />
        <Text style={styles.greetingText}>{item.userName}</Text>
        <Text style={styles.tagLine}>{item.tagLine}</Text>
        <View style={styles.socialIcon}>
          <TouchableOpacity activeOpacity={0.5}>
            <Feather
              name="facebook"
              size={26}
              color="#f1f1f1"
              style={{ height: 26, width: 26 }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              xmlns="http://www.w3.org/2000/svg"
            >
              <G stroke="#F1F1F1" fill="none" fill-rule="evenodd">
                <Path d="M13.104 1C6.419 1 1 6.184 1 12.579c0 3.524 1.647 6.678 4.243 8.801v2.592c0 .757.79 1.254 1.472.925L9.4 23.604a12.6 12.6 0 0 0 3.705.554c6.685 0 12.104-5.184 12.104-11.58C25.208 6.185 19.788 1 13.104 1z" />
                <Path d="M20.34 9.983 16.6 15.667a1.574 1.574 0 0 1-2.227.416l-3.097-2.205a.534.534 0 0 0-.64.016l-3.677 2.899c-.61.481-1.426-.26-1.006-.913l3.64-5.668a1.574 1.574 0 0 1 2.244-.426l3.246 2.34c.198.144.469.133.656-.024l3.584-3.024c.607-.513 1.456.241 1.019.905z" />
              </G>
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              xmlns="http://www.w3.org/2000/svg"
            >
              <G stroke="#F1F1F1" fill="none" fill-rule="evenodd">
                <Path d="M6.868 3.934a2.933 2.933 0 1 1-5.867 0 2.933 2.933 0 0 1 5.867 0zM1.401 25h5.066V8.905H1.4zM24.989 15.534v9.465h-5.067v-9.465c0-1.506-1.065-2.723-2.5-2.723-1.614 0-2.913 1.217-2.913 2.723v9.465H9.443V8.906h4.812v2.19c1.201-1.575 3.033-2.58 5.093-2.58 3.858 0 5.64 3.14 5.64 7.018z" />
              </G>
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <SimpleLineIcons
              name="social-twitter"
              size={26}
              color="#f1f1f1"
              style={{ height: 26, width: 26 }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <SimpleLineIcons
              name="social-instagram"
              size={26}
              color="#f1f1f1"
              style={{ height: 26, width: 26 }}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Svg
              width="36"
              height="26"
              viewBox="0 0 36 26"
              xmlns="http://www.w3.org/2000/svg"
            >
              <G stroke="#F1F1F1" fill="none" fill-rule="evenodd">
                <Path d="M35.151 12.999c0 3.987-.436 6.715-.955 8.548a4.077 4.077 0 0 1-3.437 2.931c-2.114.257-5.931.522-12.683.522-6.755 0-10.57-.265-12.684-.522a4.077 4.077 0 0 1-3.437-2.93C1.437 19.713 1 16.985 1 12.997c0-3.984.437-6.711.955-8.545a4.074 4.074 0 0 1 3.437-2.931C7.506 1.265 11.322 1 18.076 1c6.752 0 10.57.265 12.683.522a4.074 4.074 0 0 1 3.437 2.93c.519 1.835.955 4.562.955 8.547z" />
                <Path d="m23.401 12.999-8.825 5.077V7.924z" />
              </G>
            </Svg>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.externalLink, externalLink ? {} : {}]}
          onPress={() => {
            setExternalLink(true);
          }}
        >
          <Svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <G
              transform="translate(1 1)"
              stroke="#F1F1F1"
              fill="none"
              fill-rule="evenodd"
            >
              <Circle cx="11" cy="11" r="11" />
              <Ellipse cx="11" cy="11" rx="4" ry="11" />
              <Path d="M11 0a10.951 10.951 0 0 0-7.543 3.008A10.135 10.135 0 0 0 11 6a10.135 10.135 0 0 0 7.543-2.992A10.951 10.951 0 0 0 11 0zM11 16a10.951 10.951 0 0 0-7.543 3.008A10.135 10.135 0 0 0 11 22a10.135 10.135 0 0 0 7.543-2.992A10.951 10.951 0 0 0 11 16zM0 11h22" />
            </G>
          </Svg>

          <Text style={styles.externalLinkText}>{item.externalLink}</Text>
        </TouchableOpacity>
        <Text style={styles.shortDescription}>{item.shortDescription}</Text>
        <TouchableOpacity style={[styles.giftButton, { marginBottom: 20 }]}>
          <Text style={styles.buttonText}>GET MY FREE GIFT</Text>
        </TouchableOpacity>
        <Text style={styles.longDescription}>{item.longDescription}</Text>
        <TouchableOpacity style={[styles.giftButton, { marginTop: 20 }]}>
          <Text style={styles.buttonText}>GET MY FREE GIFT</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
      <View
        style={{
          flex: 1,
          position: "relative",
          backgroundColor: "rgba(197, 46, 56, 1)",
        }}
      >
        <StatusBar backgroundColor="rgba(0, 0, 0, 0)" translucent={true} />
        <LinearGradient
          colors={[
            "rgba(0, 0, 0, .2)",
            "rgba(0, 0, 0, .7)",
            "rgba(0, 0, 0, 0)",
          ]}
          start={{ x: 0, y: 0.1 }}
          style={{ height: height * 1, backgroundColor: "rgba(197, 46, 56, 1)", }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerContainer}
          >
            <Entypo
              name="chevron-small-left"
              size={width * 0.07}
              color="white"
            />
            <Text style={styles.headerTitle}>ABOUT</Text>
          </TouchableOpacity>

          <Image
            source={require("../images/aboutProfile.jpg")}
            style={{
              position: "absolute",
              width: width * 1,
              height: width * 1,
              zIndex: -1,
            }}
          />

          <ScrollView style={{}} showsVerticalScrollIndicator={false}>
            <View style={styles.carouselContainer}>
              <Carousel
                layout="default"
                layoutCardOffset={9}
                ref={(ref) => {
                  setRefCarousel(ref);
                }}
                data={data}
                renderItem={CarouselCardItem}
                keyExtractor={(item) => item.index_id}
                sliderWidth={width * 0.9}
                itemWidth={width * 0.9}
                inactiveSlideShift={0}
                useScrollView={true}
              />
            </View>
          </ScrollView>
          <LinearGradient
            colors={[
              "rgba(197, 46, 56, 0)",
              "rgba(197, 46, 56, .8)",
              "rgba(197, 46, 56, 1)",
            ]}
            start={{ x: 0, y: 0.5 }}
            style={{
              width: width * 1,
              height: height * 0.6,
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
              // backgroundColor : 'yellow'
            }}
          ></LinearGradient>
        </LinearGradient>
        <TouchableOpacity
          style={{
            position: "absolute",
            zIndex: 999,
            top: height * 0.45,
            left: width * 0.02,
          }}
          onPress={() => refCarousel.snapToPrev()}
        >
          <EvilIcons
            name="chevron-left"
            size={30}
            color="rgba(255, 255, 255, .5)"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            zIndex: 999,
            top: height * 0.45,
            right: width * 0.02,
          }}
          onPress={() => refCarousel.snapToNext()}
        >
          <EvilIcons
            name="chevron-right"
            size={30}
            color="rgba(255, 255, 255, .5)"
          />
        </TouchableOpacity>
      </View>
  );
};

export default AboutSpeakerProfile;

const styles = StyleSheet.create({
  // screenContainer: {
  //   backgroundColor: colors.white,
  //   // flex:1
  // },
  // customHeaderContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   paddingVertical: 10,
  // },
  // headerText: {
  //   // color: colors.primary,
  //   // fontSize: RFPercentage(2.5),
  //   fontFamily: "SFProDisplayMedium",
  //   fontSize: 18,
  //   // fontWeight: Platform.OS === "android" ? "bold" : "600",
  //   fontStyle: "normal",
  //   letterSpacing: 0,
  //   color: "#9d0511",
  // },

  // infoContainer: {
  //   paddingBottom: "7%",
  //   paddingHorizontal: "5%",
  // },
  // personContainer: {
  //   paddingHorizontal: "10%",
  //   alignItems: "center",
  //   justifyContent: "space-around",
  //   marginTop: 40,
  // },
  // descriptionContainer: {
  //   paddingHorizontal: "10%",
  // },

  // description: {
  //   fontSize: RFPercentage(2),
  //   color: colors.black,
  //   textAlign: "center",
  //   lineHeight: 30,
  // },
  // detailsInfo: {
  //   paddingHorizontal: 16,
  //   textAlign: "left",
  //   marginVertical: 20,
  //   fontFamily: "SFProDisplayRegular",
  //   fontSize: 14,
  //   fontWeight: "normal",
  //   fontStyle: "normal",
  //   lineHeight: 22,
  //   letterSpacing: 0.1,
  //   color: "#5b5b5c",
  //   marginLeft: 5,
  // },

  // image: {
  //   height: width * 0.5,
  //   width: width * 0.5,
  //   resizeMode: "contain",
  // },
  // row: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginVertical: 15,
  // },
  // icon: {
  //   marginHorizontal: 6,
  // },
  // text: {
  //   marginLeft: 30,
  //   fontFamily: "SFProDisplayMedium",
  //   fontSize: 14,
  //   fontWeight: Platform.OS === "android" ? "bold" : "600",
  //   fontStyle: "normal",
  //   lineHeight: 22,
  //   letterSpacing: 0.1,
  //   color: "#5b5b5c",
  //   fontWeight: "600",
  //   fontSize: RFPercentage(2.3),
  // },
  // container: {
  //   backgroundColor: 'white',
  //   borderRadius: 8,
  //   width: ITEM_WIDTH,
  //   paddingBottom: 40,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 3,
  //   },
  //   shadowOpacity: 0.29,
  //   shadowRadius: 4.65,
  //   elevation: 7,
  // },
  // image: {
  //   width: ITEM_WIDTH,
  //   height: 300,
  // },
  // header: {
  //   color: "#222",
  //   fontSize: 28,
  //   fontWeight: "bold",
  //   paddingLeft: 20,
  //   paddingTop: 20
  // },
  // body: {
  //   color: "#222",
  //   fontSize: 18,
  //   paddingLeft: 20,
  //   paddingLeft: 20,
  //   paddingRight: 20
  // }

  headerContainer: {
    // position: "absolute",
    // paddingHorizontal: width * 0.015,
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "yellow",
    width: width * 0.25,
  },

  headerTitle: {
    fontSize: width * 0.05,
    fontFamily: "SFProDisplaySemibold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff",
    left: width * -0.015,
    top: -1,
  },

  carouselContainer: {
    marginTop: height * 0.335,
    alignItems: "center",
    justifyContent: "center",
  },
  greetingText: {
    fontFamily: "SFProDisplayRegular",
    fontSize: width * 0.095,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#f1f1f1",
  },
  tagLine: {
    fontFamily: "SFProDisplayRegular",
    fontSize: width * 0.038,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#f1f1f1",
  },
  socialIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: width * 0.08,
    paddingRight: width * 0.08,
    marginTop: 12,
    marginBottom: 18,
  },
  externalLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  externalLinkText: {
    fontSize: width * 0.038,
    fontFamily: "SFProDisplayRegular",
    fontStyle: "normal",
    lineHeight: 22,
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#f1f1f1",
    // textDecorationColor: "#f1f1f1",
    // textDecorationStyle: "solid",
    // textDecorationLine: "underline",
    paddingLeft: width * 0.033,
  },
  shortDescription: {
    fontSize: width * 0.038,
    fontFamily: "SFProDisplaySemibold",
    fontStyle: "normal",
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width * 0.15,
    marginBottom: 20,
  },
  giftButton: {
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "SFProDisplayRegular",
    fontSize: width * 0.044,
    letterSpacing: -0.09,
    textAlign: "center",
    color: "#131415",
  },
  longDescription: {
    fontFamily: "SFProDisplayRegular",
    fontSize: width * 0.038,
    letterSpacing: 0.1,
    color: "#f1f1f1",
  },
});
