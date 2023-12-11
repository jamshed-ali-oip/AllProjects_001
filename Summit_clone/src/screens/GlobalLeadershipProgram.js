import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Button,
  StatusBar,
} from "react-native";
import Svg, { G, Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo, Feather } from "@expo/vector-icons";

const backgroundImage = require("../images/susie_black.jpg");
const iconimage = require("../images/icon.png");

const { height, width } = Dimensions.get("window");

const GlobalLeadershipProgram = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0)" translucent={true} />
      <View style={styles.backgroundContainer}>
        <View style={styles.leftContainer}></View>
        <View style={styles.midContainer}></View>
        <View style={styles.rightContainer}></View>
      </View>
      <LinearGradient
        colors={[
          "rgba(0, 0, 0, 0)",
          "rgba(0, 0, 0, .6)",
          "rgba(0, 0, 0, 0)",
          "rgba(0, 0, 0, 0)",
        ]}
        start={{ x: 0, y: 0.3 }}
        style={styles.linearGradient}
      >
        <View
          style={{
            width: width * 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            position: "absolute",
            top: 0,
            right: -2,
          }}
        >
          <Image
            style={{
              height: height * 0.55,
              width: width * 0.7,
              marginTop: height * 0.04,
              marginRight: 0,
            }}
            source={require("../images/aunty.png")}
            resizeMode="contain"
          />
        </View>

        <LinearGradient
          colors={[
            "rgba(197, 46, 56, 0)",
            "rgba(197, 46, 56, 1)",
            "rgba(197, 46, 56, 1)",
          ]}
          start={{ x: 0, y: 0.3 }}
          // end={{ x: 0.1, y: 0.1 }}
          style={{
            width: width * 1,
            height: height * 1,
            // position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 0,
            // paddingTop: height * 0.5,
          }}
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
            <Text style={styles.headerTitle}>HOME</Text>
          </TouchableOpacity>
          <ScrollView style={{ marginTop: 50 }}>
            <View
              style={[
                styles.content,
                {
                  flex: 1,
                  paddingBottom: 15,
                  paddingTop: height * 0.32,
                  paddingHorizontal: width * 0.033,
                  //   backgroundColor: "rgba(0, 0, 0, 1)",
                },
              ]}
            >
              <Text style={styles.subHeading}>LIMITED AVAILABILITY</Text>
              <Text style={styles.heading}>THE GLOBAL LEADERSHIP PROGRAM</Text>
              <View style={[styles.tagsContainer, {}]}>
                <Text style={[styles.sales_tag, {}]}>Sales</Text>
                <Text style={[styles.sales_tag, {}]}>Funnels</Text>
                <Text style={[styles.sales_tag, {}]}>Mindset</Text>
                <Text style={[styles.sales_tag, {}]}>Finance</Text>
                <Text style={[styles.sales_tag, {}]}>Leadership</Text>
              </View>
              <Text
                style={[
                  styles.subHeading,
                  { color: "white", textAlign: "center" },
                ]}
              >
                OFFER ENDS IN
              </Text>
              <View style={[styles.offerDetailContainer]}>
                <View style={styles.offerDetailContainerInner}>
                  <Text style={styles.offerDetailTime}>00</Text>
                  <Text style={styles.offerDetailTimeName}>WKS</Text>
                </View>
                <View style={styles.offerDetailContainerInner}>
                  <Text style={styles.offerDetailTime}>03</Text>
                  <Text style={styles.offerDetailTimeName}>DYS</Text>
                </View>
                <View style={styles.offerDetailContainerInner}>
                  <Text style={styles.offerDetailTime}>15</Text>
                  <Text style={styles.offerDetailTimeName}>HRS</Text>
                </View>
                <View style={styles.offerDetailContainerInner}>
                  <Text style={styles.offerDetailTime}>06</Text>
                  <Text style={styles.offerDetailTimeName}>MIN</Text>
                </View>
                <View style={styles.offerDetailContainerInner}>
                  <Text style={styles.offerDetailTime}>54</Text>
                  <Text style={styles.offerDetailTimeName}>SEC</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.push("AboutScaleUp")}
                style={[styles.giftButton, { marginVertical: 24 }]}
              >
                <Text style={styles.buttonText}>JOIN NOW</Text>
              </TouchableOpacity>
              <Text style={styles.generalText}>
                Led by myself and a faculty of master teachers, GLP is a
                12-month business-building experience.
              </Text>
              <Text style={styles.generalText}>THE GOAL?</Text>
              <Text style={styles.generalText}>
                To give you the help you need, when you need it to master your
                approach to bolster:
              </Text>
              <Text style={styles.generalText}>
                Sales, Products, Operations and Finance.
              </Text>
              <Text style={styles.generalText}>
                While keeping you clear, accountable and taking action every
                step of the way.
              </Text>
              <Text style={styles.generalText}>
                That’s exactly what I’m here to help you do. And that’s exactly
                what we’ve created for you here.
              </Text>
              <Text style={styles.generalText}>
                GLP is a 1 year program because world-changing, success isn’t
                something that can be achieved in 30, 60, or 90 days. Business
                is a long game, and we’re here to guide you through every step
                of the journey.
              </Text>
              <Text style={styles.generalText}>
                You get lifetime access to all materials, from our video classes
                and worksheets to templates, scripts and spreadsheets. You’ll
                have every resource you need at your fingertips to avoid
                pitfalls and feel completely supported as you level up.
              </Text>
              <Text style={styles.generalText}>
                Our community is second to none. This tight-knit group of
                purpose-driven entrepreneurs can’t wait to connect with you,
                cheer you on and challenge you when you need it.
              </Text>
              <Text style={styles.generalText}>
                Open Q&A sessions are available to you each month with myself
                and your GLP expert faculty, so you can ensure you never feel
                alone and can get exactly the help you need when you need it.
              </Text>
              <Text style={styles.generalText}>
                This program is driven by Business Development Results (BDR) to
                help you track your progress, and clearly measure your business
                productivity.
              </Text>
              <Text
                style={[
                  styles.subHeadingTitle,
                  {
                    marginTop: 16,
                    marginBottom: 8,
                    fontFamily: "SFProDisplayMedium",
                  },
                ]}
              >
                GLOBAL LEADERSHIP PROGRAM
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 2,
                }}
              >
                <Feather
                  name="check"
                  size={15}
                  style={{ paddingTop: 5, paddingRight: 5 }}
                  color="white"
                />
                <Text style={styles.programList}>
                  12 modules with comprehensive workbooks
                </Text>
                <Text style={styles.programListAmount}>$45,000</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 2,
                }}
              >
                <Feather
                  name="check"
                  size={15}
                  style={{ paddingTop: 5, paddingRight: 5 }}
                  color="white"
                />
                <Text style={styles.programList}>Group Mastermind Calls</Text>
                <Text style={styles.programListAmount}>$60,000</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 2,
                }}
              >
                <Feather
                  name="check"
                  size={15}
                  style={{ paddingTop: 5, paddingRight: 5 }}
                  color="white"
                />
                <Text style={styles.programList}>
                  One on one coaching calls with Susie
                </Text>
                <Text style={styles.programListAmount}>$20,000</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 2,
                }}
              >
                <Feather
                  name="check"
                  size={15}
                  style={{ paddingTop: 5, paddingRight: 5 }}
                  color="white"
                />
                <Text style={styles.programList}>
                  Blueprint tools & templates
                </Text>
                <Text style={styles.programListAmount}>$2,000</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 2,
                }}
              >
                <Feather
                  name="check"
                  size={15}
                  style={{ paddingTop: 5, paddingRight: 5 }}
                  color="white"
                />
                <Text style={styles.programList}>Accountability coaching</Text>
                <Text style={styles.programListAmount}>$6,000</Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Feather
                  name="check"
                  size={15}
                  style={{ paddingTop: 5, paddingRight: 5 }}
                  color="white"
                />
                <Text style={styles.programList}>Done for you services</Text>
                <Text style={styles.programListAmount}>$24,000</Text>
              </View>
              <View
                style={{ flexDirection: "row", marginBottom: 12, marginTop: 6 }}
              >
                <Text
                  style={[
                    styles.subHeadingTitle,
                    { flex: 1, fontFamily: "SFProDisplaySemibold" },
                  ]}
                >
                  Total Value
                </Text>
                <Text style={styles.programListAmount}>$157,000</Text>
              </View>
              <Text
                style={[
                  styles.subHeadingTitle,
                  { fontFamily: "SFProDisplayMedium", marginBottom : 8 },
                ]}
              >
                BONUSES
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Feather
                  name="check"
                  size={15}
                  style={{ paddingTop: 5, paddingRight: 5 }}
                  color="white"
                />
                <Text style={styles.programList}>Video Mastery Program</Text>
                <Text style={styles.programListAmount}>$2,497</Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Feather
                  name="check"
                  size={15}
                  style={{ paddingTop: 5, paddingRight: 5 }}
                  color="white"
                />
                <Text style={styles.programList}>Sales Bonus with Natalie Klun</Text>
                <Text style={styles.programListAmount}>$997</Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Feather
                  name="check"
                  size={15}
                  style={{ paddingTop: 5, paddingRight: 5 }}
                  color="white"
                />
                <Text style={styles.programList}>Bootstrap to Big Money</Text>
                <Text style={styles.programListAmount}>$5197</Text>
              </View>
              <View
                style={{ flexDirection: "row", marginBottom: 6, marginTop: 6 }}
              >
                <Text
                  style={[
                    styles.subHeadingTitle,
                    { flex: 1, fontFamily: "SFProDisplaySemibold" },
                  ]}
                >
                  Bonus Value
                </Text>
                <Text style={styles.programListAmount}>$8,673</Text>
              </View>
              <View
                style={{ flexDirection: "row",}}
              >
                <Text
                  style={[
                    styles.subHeadingTitle,
                    { flex: 1, fontFamily: "SFProDisplaySemibold" },
                  ]}
                >
                  Total Value with Bonuses
                </Text>
                <Text style={styles.programListAmount}>$165,673</Text>
              </View>
              <TouchableOpacity
                style={[styles.giftButton, { marginVertical: 24 }]}
              >
                <Text style={styles.buttonText}>JOIN NOW</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    top: 50,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 99,
    width: width * 0.25,
    // backgroundColor: "yellow",
  },

  headerTitle: {
    fontSize: width * 0.05,
    fontFamily: "SFProDisplaySemibold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff",
    left: width * -0.015,
    top: -1.2,
  },

  customHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerText: {
    fontSize: width * 0.045,
    fontFamily: "SFProDisplaySemibold",
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "rgb(157, 5, 17)",
    // backgroundColor : 'blue' `
  },

  subHeading: {
    fontSize: width * 0.028,
    fontFamily: "SFProDisplayRegular",
    color: "white",
  },

  heading: {
    fontSize: width * 0.066,
    fontFamily: "SFProDisplayMedium",
    fontWeight: "500",
    color: "#ffffff",
    width: width * 0.75,
    marginBottom: 10,
    // backgroundColor : "black",
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
  },

  sales_tag: {
    fontSize: width * 0.026,
    color: "white",
    paddingHorizontal: 4,
    height: 15,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "white",
    textAlign: "center",
    marginRight: 8,
    fontFamily: "SFProDisplayMedium",
  },

  iconContent: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor : "black"
  },

  iconText: {
    fontSize: width * 0.027,
    color: "white",
    letterSpacing: width * 0.0001,
    marginLeft: 8,
    fontFamily: "SFProDisplayRegular",
  },

  backgroundContainer: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    width: "100%",
    position: "absolute",
    width: width * 1,
    zIndex: 0,
  },

  leftContainer: {
    backgroundColor: "rgba(129,30,36,1)",
    height: "100%",
    width: width * 0.4,
  },

  midContainer: {
    backgroundColor: "rgba(162,38,46,1)",
    width: width * 0.4,
    height: "100%",
  },

  rightContainer: {
    backgroundColor: "rgba(129,30,36,1)",
    width: width * 0.2,
    height: "100%",
  },

  linearGradient: {
    flex: 1,
    width: width * 1,
  },

  offerDetailContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "black",
  },
  offerDetailContainerInner: {
    paddingHorizontal: 19,
    textAlign: "center",
  },
  offerDetailTime: {
    // fontSize: 24,
    fontSize: width * 0.066,
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
    fontFamily: "SFProDisplayRegular",
    // backgroundColor : 'blue'
  },
  offerDetailTimeName: {
    fontSize: width * 0.027,
    letterSpacing: 1,
    lineHeight: width * 0.027,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.67)",
    fontFamily: "SFProDisplayRegular",
    // backgroundColor : 'yellow',
    // color : 'black'
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

  generalText: {
    fontFamily: "SFProDisplayRegular",
    fontSize: width * 0.038,
    lineHeight: 22,
    letterSpacing: 0.1,
    color: "#ffffff",
  },

  subHeadingTitle: {
    fontSize: width * 0.05,
    letterSpacing: 0,
    color: "#ffffff",
  },

  programList: {
    fontSize: width * 0.042,
    fontFamily: "SFProDisplayRegular",
    letterSpacing: 0.11,
    color: "#ffffff",
    flexWrap: "wrap",
    flex: 1,
  },

  programListAmount: {
    fontSize: width * 0.042,
    fontFamily: "SFProDisplayMedium",
    letterSpacing: 0.11,
    textAlign: "right",
    color: "#ffffff",
  },
});

// const GlobalLeadershipProgram = ({ navigation }) => {
//   return (
//     <SafeAreaView style={{ flex: 1, position: "relative" }}>
//       <StatusBar backgroundColor="rgba(0, 0, 0, 0)" translucent={true} />
//       <View style={styles.backgroundContainer}>
//         <View style={styles.leftContainer}></View>
//         <View style={styles.midContainer}></View>
//         <View style={styles.rightContainer}></View>
//       </View>
//       <LinearGradient
//         colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 0)"]}
//         start={{ x: 0, y: 0.25 }}
//         style={styles.linearGradient}
//       >
//         <View
//           style={{
//             width: width * 1,
//             justifyContent: "flex-end",
//             alignItems: "flex-end",
//           }}
//         >
//           <Image
//             style={{
//               height: height * 0.6,
//               width: width * 0.8,
//               marginTop: height * 0.05,
//               marginRight: width * 0.032,
//             }}
//             source={require("../images/aunty.png")}
//             resizeMode="contain"
//           />
//         </View>
//         <LinearGradient
//           colors={[
//             "rgba(197, 46, 56, 0)",
//             "rgba(197, 46, 56, 1)",
//             "rgba(197, 46, 56, 1)",
//           ]}
//           start={{ x: 0, y: 0.3 }}
//           // end={{ x: 0.1, y: 0.1 }}
//           style={{
//             width: width * 1,
//             height: height * 1,
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             zIndex: 0,
//             // paddingTop: height * 0.5,
//           }}
//         >
//           {/* <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={styles.headerContainer}
//           >
//             <Entypo
//               name="chevron-small-left"
//               size={width * 0.07}
//               color="white"
//             />
//             <Text style={styles.headerTitle}>HOME</Text>
//           </TouchableOpacity>
//           <ScrollView>
//             <View
//               style={[
//                 styles.content,
//                 {
//                   flex: 1,
//                   // paddingBottom: 50,
//                   paddingTop: height * 0.4,
//                   paddingLeft: width * 0.03,
//                   // backgroundColor: "rgba(0, 0, 0, 1)",
//                 },
//               ]}
//             >
//               <Text style={styles.subHeading}>LIMITED AVAILABILITY</Text>
//               <Text style={styles.heading}>THE GLOBAL LEADERSHIP PROGRAM</Text>
//               <View style={[styles.tagsContainer, {}]}>
//                 <Text style={[styles.sales_tag, {}]}>Sales</Text>
//                 <Text style={[styles.sales_tag, {}]}>Funnels</Text>
//                 <Text style={[styles.sales_tag, {}]}>Mindset</Text>
//                 <Text style={[styles.sales_tag, {}]}>Finance</Text>
//                 <Text style={[styles.sales_tag, {}]}>Leadership</Text>
//               </View>
//               <Text
//                 style={[
//                   styles.subHeading,
//                   { color: "white", textAlign: "center", width: width * 0.94 },
//                 ]}
//               >
//                 OFFER ENDS IN
//               </Text>
//               <View style={[styles.offerDetailContainer]}>
//                 <View style={styles.offerDetailContainerInner}>
//                   <Text style={styles.offerDetailTime}>00</Text>
//                   <Text style={styles.offerDetailTimeName}>WKS</Text>
//                 </View>
//                 <View style={styles.offerDetailContainerInner}>
//                   <Text style={styles.offerDetailTime}>03</Text>
//                   <Text style={styles.offerDetailTimeName}>DYS</Text>
//                 </View>
//                 <View style={styles.offerDetailContainerInner}>
//                   <Text style={styles.offerDetailTime}>15</Text>
//                   <Text style={styles.offerDetailTimeName}>HRS</Text>
//                 </View>
//                 <View style={styles.offerDetailContainerInner}>
//                   <Text style={styles.offerDetailTime}>06</Text>
//                   <Text style={styles.offerDetailTimeName}>MIN</Text>
//                 </View>
//                 <View style={styles.offerDetailContainerInner}>
//                   <Text style={styles.offerDetailTime}>54</Text>
//                   <Text style={styles.offerDetailTimeName}>SEC</Text>
//                 </View>
//               </View>
//             </View>
//           </ScrollView> */}
//         </LinearGradient>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     position: "relative",
//     // paddingHorizontal: width * 0.010,
//     // marginTop: 60,
//     top: 60,
//     left: 0,
//     flexDirection: "row",
//     alignItems: "center",
//     zIndex: 99,
//     width: width * 0.25,
//     // backgroundColor: "yellow",
//   },

//   headerTitle: {
//     fontSize: width * 0.05,
//     fontFamily: "SFProDisplaySemibold",
//     fontStyle: "normal",
//     letterSpacing: 0,
//     color: "#ffffff",
//     left: width * -0.015,
//     top: -1.2,
//   },

//   customHeaderContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   headerText: {
//     fontSize: width * 0.045,
//     fontFamily: "SFProDisplaySemibold",
//     fontWeight: "600",
//     fontStyle: "normal",
//     letterSpacing: 0,
//     color: "rgb(157, 5, 17)",
//     // backgroundColor : 'blue' `
//   },

//   subHeading: {
//     fontSize: width * 0.028,
//     fontFamily: "SFProDisplayRegular",
//     color: "white",
//   },

//   heading: {
//     // fontSize: width * 0.06,
//     // width: width * 0.6,
//     // color: "white",
//     // // fontWeight : '500',
//     // lineHeight: width * 0.07,
//     // marginVertical: width * 0.01,
//     // letterSpacing: width * 0.001,
//     fontSize: width * 0.066,
//     fontFamily: "SFProDisplayMedium",
//     fontWeight: "500",
//     color: "#ffffff",
//     width: width * 0.75,
//     marginBottom: 10,
//     // backgroundColor : "black",
//   },

//   tagsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     // marginTop: 10,
//     marginBottom: 24,
//   },

//   sales_tag: {
//     fontSize: width * 0.026,
//     color: "white",
//     paddingHorizontal: 4,
//     height: 15,
//     alignItems: "center",
//     borderWidth: 1,
//     borderRadius: 30,
//     borderColor: "white",
//     textAlign: "center",
//     marginRight: 8,
//     fontFamily: "SFProDisplayMedium",
//   },

//   iconContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     // backgroundColor : "black"
//   },

//   iconText: {
//     fontSize: width * 0.027,
//     color: "white",
//     letterSpacing: width * 0.0001,
//     marginLeft: 8,
//     fontFamily: "SFProDisplayRegular",
//   },

//   backgroundContainer: {
//     flex: 1,
//     flexDirection: "row",
//     height: "100%",
//     width: "100%",
//     position: "absolute",
//     width: width * 1,
//   },

//   leftContainer: {
//     backgroundColor: "rgba(129,30,36,1)",
//     height: "100%",
//     width: width * 0.4,
//   },

//   midContainer: {
//     backgroundColor: "rgba(162,38,46,1)",
//     width: width * 0.4,
//     height: "100%",
//   },

//   rightContainer: {
//     backgroundColor: "rgba(129,30,36,1)",
//     width: width * 0.2,
//     height: "100%",
//   },

//   addButton: {
//     zIndex: 1111,
//     width: 200,
//   },
//   linearGradient: {
//     flex: 1,
//     paddingLeft: 15,
//     paddingRight: 15,
//     borderRadius: 5,
//     position: "absolute",
//     height: "100%",
//     zIndex : 99
//   },

//   offerDetailContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     // backgroundColor: "black",3

//     width: width * 0.94,
//   },
//   offerDetailContainerInner: {
//     paddingHorizontal: 19,
//     textAlign: "center",
//   },
//   offerDetailTime: {
//     // fontSize: 24,
//     fontSize: width * 0.066,
//     letterSpacing: 0,
//     textAlign: "center",
//     color: "#ffffff",
//     fontFamily: "SFProDisplayRegular",
//     // backgroundColor : 'blue'
//   },
//   offerDetailTimeName: {
//     fontSize: width * 0.027,
//     letterSpacing: 1,
//     lineHeight : width * 0.027,
//     textAlign: "center",
//     color: "rgba(255, 255, 255, 0.67)",
//     fontFamily: "SFProDisplayRegular",
//     // backgroundColor : 'yellow',
//     // color : 'black'
//   },
// });

export default GlobalLeadershipProgram;

// import React from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   Button,
//   Dimensions,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   TextInput,
// } from "react-native";

// let { width, height } = Dimensions.get("window");

// var Trending = [
//   {
//     id: 5665,
//     url: require("../images/girl.jpeg"),
//     resource: "RESOURCE 1",
//     card: "Scale UP 3 day Event Workbook",
//     text: "Your companion full of lesson and resources",
//     link: "https://www.facebook.com/",
//   },
//   {
//     id: 56898,
//     url: require("../images/girl.jpeg"),
//     resource: "RESOURCE 2",
//     card: "Scale UP Guid",
//     text: "Your companion full of lesson and resources",
//     link: "https://www.facebook.com/",
//   },
//   {
//     id: 3658,
//     url: require("../images/girl.jpeg"),
//     resource: "RESOURCE 3",
//     card: "Scale UP Flash Card",
//     text: "Your companion full of lesson and resources",
//     link: "https://www.facebook.com/",
//   },
// ];

// const GlobalLeadershipProgram = ({ navigation }) => {
//   const [title, onChangetitle] = React.useState("");
//   const [Stitle, onChangeStitle] = React.useState("");
//   const [Desc, onChangeDesc] = React.useState("");
//   const [name, onChangename] = React.useState("");
//   const [text, onChangeText] = React.useState("");
//   const [link, onChangelink] = React.useState("");

//   const renderTrending = ({ item }) => (
//     <View style={{ padding: 10 }}>
//       <View style={{ flexDirection: "row" }}>
//         <Text style={{ color: "#b9b9bb" }}>{item.resource}</Text>
//         <TouchableOpacity>
//           <Image
//             style={{
//               height: 30,
//               width: 25,
//               marginLeft: "55%",
//               tintColor: "#b9b9bb",
//             }}
//             source={require("../images/bar.png")}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Image
//             style={{
//               height: 30,
//               width: 25,
//               tintColor: "#a8222d",
//               marginLeft: "25%",
//             }}
//             source={require("../images/bin.png")}
//           />
//         </TouchableOpacity>
//       </View>
//       <View
//         style={{
//           // backgroundColor:"red",
//           flexDirection: "row",
//         }}
//       >
//         <Image
//           style={{
//             height: height * 0.12,
//             width: width * 0.23,
//             borderWidth: 1,
//             borderColor: "white",
//           }}
//           source={item.url}
//         />

//         <View>
//           <TouchableOpacity style={styles.Button2}>
//             <Text style={{ color: "#a8222d", fontSize: 17 }}>DELETE PHOTO</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.Button2}>
//             <Text style={{ color: "black", fontSize: 17 }}>REPLACE PHOTO</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangename}
//         value={name}
//         placeholder={item.card}
//         numberOfLines={4}
//       />
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeText}
//         value={text}
//         placeholder={item.text}
//         numberOfLines={4}
//       />
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangelink}
//         value={link}
//         placeholder={item.link}
//         numberOfLines={4}
//       />
//     </View>
//   );

//   return (
//     <SafeAreaView>
//       <View
//         style={{
//           flexDirection: "row",
//           margin: 10,
//           marginTop: 20,
//           justifyContent: "space-between",
//         }}
//       >
//         <TouchableOpacity
//           onPress={() => {
//             navigation.goBack();
//           }}
//           style={{ flexDirection: "row" }}
//         >
//           <Image
//             style={{ height: 25, width: 25, tintColor: "#a8222d" }}
//             source={require("../images/bin.png")}
//           />

//           <Text style={{ color: "#a8222d", fontWeight: "700", fontSize: 17 }}>
//             RESOURCES
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             alert("save daata");
//           }}
//         >
//           <Text
//             style={{
//               color: "#a8222d",
//               fontWeight: "500",
//               fontSize: 17,
//               alignSelf: "flex-end",
//             }}
//           >
//             Save
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <ScrollView>
//         <View style={{ flex: 1, marginBottom: height * 0.1 }}>
//           <Text style={{ fontSize: 18, fontWeight: "500", marginLeft: 10 }}>
//             RESOURCES DETAILS
//           </Text>
//           <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 10 }}>
//             resize and adjust photo with your finger
//           </Text>
//           <Image
//             style={{
//               height: height * 0.5,
//               width: width * 0.96,
//               alignSelf: "center",
//               borderRadius: 10,
//             }}
//             source={require("../images/product.png")}
//           />
//           <TouchableOpacity style={styles.Button}>
//             <Text style={{ color: "#a8222d", fontSize: 17 }}>DELETE PHOTO</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.Button}>
//             <Text style={{ color: "black", fontSize: 17 }}>REPLACE PHOTO</Text>
//           </TouchableOpacity>
//           <Text style={styles.title}>Above the title</Text>
//           <TextInput
//             style={styles.input}
//             onChangeText={onChangetitle}
//             value={title}
//             placeholder="Above the title"
//             numberOfLines={4}
//           />
//           <Text style={styles.title}>Session title</Text>
//           <TextInput
//             style={styles.input2}
//             onChangeText={onChangeStitle}
//             value={Stitle}
//             placeholder="Session title"
//             numberOfLines={4}
//             multiline={true}
//           />
//           <Text style={styles.title}>Description</Text>
//           <TextInput
//             style={styles.input2}
//             onChangeText={onChangeDesc}
//             value={Desc}
//             placeholder="Description"
//             numberOfLines={4}
//             multiline={true}
//           />
//           <FlatList
//             data={Trending}
//             renderItem={renderTrending}
//             keyExtractor={(item) => item.id}
//           />
//           <TouchableOpacity style={styles.Button}>
//             <Text style={{ color: "black", fontSize: 17 }}>
//               ADD NEW RESOURCE
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   Button: {
//     borderWidth: 1,
//     borderColor: "grey",
//     width: "96%",
//     height: height * 0.05,
//     alignSelf: "center",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 50,
//     marginTop: 10,
//   },
//   input: {
//     height: 50,
//     margin: 5,
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 15,
//     backgroundColor: "#e3e1e2",
//     borderColor: "#e3e1e2",
//   },
//   input2: {
//     height: 80,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 15,
//     backgroundColor: "#e3e1e2",
//     borderColor: "#e3e1e2",
//   },
//   title: {
//     marginLeft: 20,
//     color: "grey",
//     fontSize: 15,
//   },
//   Button2: {
//     borderWidth: 1,
//     borderColor: "grey",
//     width: width * 0.7,
//     height: height * 0.05,
//     alignSelf: "center",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 50,
//     marginTop: 10,
//     marginLeft: 10,
//   },
// });

// export default GlobalLeadershipProgram;
