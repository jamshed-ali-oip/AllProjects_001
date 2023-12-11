// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Dimensions,
//   ScrollView,
//   TouchableOpacity,
//   ImageBackground,
//   Button,
// } from "react-native";
// // import LinearGradient from 'react-native-linear-gradient';

// const image = require("../images/home/home_bg.png");
// const iconimage = require("../images/home/123.png");

// const { height, width } = Dimensions.get("window");

// const Resources = () => {
//   return (
//     <ImageBackground
//       source={image}
//       resizeMode="cover"
//       style={{ flex: 1, alignItems: "center" }}
//     >
//       <ScrollView>
//         <View style={{ justifyContent: "center", alignItems: "center" }}>
//           <View style={styles.content}>
//             <Text style={styles.sales_tag}>RESOURCES</Text>
//             <Text style={styles.heading}>SCALE UP EVENT RESOURCES</Text>
//             <Text style={styles.icon_text}>
//               Get the most out of the event by following along with event
//               materials always at your fingertips.
//             </Text>
//           </View>
//           <View style={styles.accordian}>
//             <View style={styles.accordian_inner}>
//               <Image source={iconimage} style={styles.user_image} />
//               <View style={styles.accordian_content}>
//                 <Text style={styles.accordian_title}>
//                   Scale Up 3-Day Eevent Workbook
//                 </Text>
//                 <Text style={styles.accordian_desp}>
//                   Your Companion Full of Lessons & Resources
//                 </Text>
//               </View>
//               <View style={styles.accordian_icon}>
//                 {/* <Entypoicon name='chevron-thin-right' color={'rgba(255, 255, 255, .2)'} size={20} /> */}
//               </View>
//             </View>
//             <View style={styles.accordian_inner}>
//               <Image source={iconimage} style={styles.user_image} />
//               <View style={styles.accordian_content}>
//                 <Text style={styles.accordian_title}>Scale Up Sales Guide</Text>
//                 <Text style={styles.accordian_desp}>
//                   The Only Sales Script You Will Ever Need
//                 </Text>
//               </View>
//               <View style={styles.accordian_icon}>
//                 {/* <Entypoicon name='chevron-thin-right' color={'rgba(255, 255, 255, .2)'} size={20} /> */}
//               </View>
//             </View>
//             <View style={styles.accordian_inner}>
//               <Image source={iconimage} style={styles.user_image} />
//               <View style={styles.accordian_content}>
//                 <Text style={styles.accordian_title}>Scale Up Flash Cards</Text>
//                 <Text style={styles.accordian_desp}>
//                   Stay Engaged & Show Us How You Feel
//                 </Text>
//               </View>
//               <View style={styles.accordian_icon}>
//                 {/* <Entypoicon name='chevron-thin-right' color={'rgba(255, 255, 255, .2)'} size={20} /> */}
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   content: {
//     paddingTop: height * 0.45,
//     width: width * 0.92,
//   },
//   sales_tag: {
//     fontSize: width * 0.025,
//     color: "white",
//     lineHeight: width * 0.045,
//     fontFamily: "SFProDisplayMedium",
//     letterSpacing: width * 0.001,
//   },
//   heading: {
//     fontSize: width * 0.06,
//     width: width * 0.6,
//     color: "white",
//     lineHeight: width * 0.07,
//     marginVertical: width * 0.01,
//     fontFamily: "SFProDisplayMedium",
//     letterSpacing: width * 0.001,
//   },
//   icon_text: {
//     fontSize: width * 0.037,
//     color: "white",
//     fontFamily: "SFProDisplayRegular",
//     letterSpacing: width * 0.0001,
//     lineHeight: height * 0.028,
//     marginTop: height * 0.01,
//   },
//   accordian: {
//     width: width * 1,
//     alignItems: "center",
//     marginTop: height * 0.03,
//   },
//   accordian_inner: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: width * 0.04,
//     borderBottomColor: "rgba(19, 20, 21, .05)",
//     // borderBottomColor : 'black' ,
//     borderBottomWidth: 1,
//     paddingVertical: height * 0.01,
//   },
//   user_image: {
//     width: width * 0.15,
//     height: width * 0.15,
//     borderRadius: 100,
//   },
//   accordian_content: {
//     flex: 1,
//     paddingLeft: width * 0.001,
//     alignItems: "flex-start",
//   },
//   accordian_title: {
//     fontSize: width * 0.04,
//     paddingLeft: width * 0.03,
//     color: "white",
//     fontFamily: "SFProDisplayRegular",
//   },
//   accordian_desp: {
//     fontSize: width * 0.028,
//     paddingLeft: width * 0.03,
//     color: "rgb(177, 186, 191)",
//     marginTop: height * 0.001,
//     fontFamily: "SFProDisplayRegular",
//   },
//   // accordian_icon : {
//   //     fontSize : width * 0.027,
//   //     paddingLeft : width * 0.03,
//   //     marginTop : height * 0.001
//   // }
// });

// export default Resources;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { G, Path, Rect } from "react-native-svg";
import { MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons";
import colors from "../constants/colors";

const { height, width } = Dimensions.get("window");
const iconimage = require("../images/home/123.png");

const Resources = ({ navigation }) => {
  const [checked, setChecked] = useState(true);

  const onCheckmarkPress = () => {
    setChecked(!checked);
  };

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0)" translucent={true} />

      <View
        style={{
          backgroundColor: "transparent",
          width: width * 1,
          position: "absolute",
          paddingRight: width * 0.033,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 3,
          top: 50,
          // marginTop: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flexDirection: "row", backgroundColor: "transparent" }}
        >
          <Entypo
            name="chevron-small-left"
            size={width * 0.07}
            color="white"
            style={{
              backgroundColor: "transparent",
              width: 30,
              paddingLeft: 3,
            }}
          />
          <Text
            style={[
              styles.headerTitle,
              {
                backgroundColor: "transparent",
                fontSize: width * 0.05,
                fontFamily: "SFProDisplaySemibold",
                fontStyle: "normal",
                letterSpacing: 0,
                color: "#ffffff",
                left: width * -0.015,
                top: 0.5,
              },
            ]}
          >
            HOME
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("EventResourcesEdit")}>
          <Svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="m11.212 1 .174 1.136a2.229 2.229 0 0 0 3.453 1.507l.913-.619 1.468 1.467-.68.927a2.229 2.229 0 0 0 1.377 3.509L19 9.134v2.078l-1.136.174a2.229 2.229 0 0 0-1.507 3.453l.619.913-1.469 1.468-.654-.477a2.229 2.229 0 0 0-3.519 1.458l-.122.799H9.134l-.21-1.083a2.229 2.229 0 0 0-3.506-1.376l-.921.68-1.473-1.47.619-.912a2.229 2.229 0 0 0-1.507-3.453L1 11.212V9.134l1.083-.21A2.229 2.229 0 0 0 3.46 5.419l-.68-.921 1.47-1.473 1.18.799a2.23 2.23 0 0 0 3.437-1.425L9.134 1h2.078zM10 6.727a3.273 3.273 0 1 0 0 6.546 3.273 3.273 0 0 0 0-6.546z"
              fill-rule="nonzero"
              stroke="#FFF"
              fill="none"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <Image
        source={require("../images/home/resources.jpg")}
        style={{
          height: height * 0.7,
          width: width * 1,
          position: "absolute",
          top: -1,
        }}
      />
      <LinearGradient
        colors={[
          "rgba(0, 0, 0, .5)",
          "rgba(65, 20, 18, 1)",
          "rgba(150, 46, 56, 1)",
        ]}
        style={styles.linearGradient}
        locations={[0.4, 0.6, 1]}
      >
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <View style={styles.preperationContainer}>
              <Text style={styles.sales_tag}>RESOURCES</Text>
              <Text style={styles.heading}>SCALE UP EVENT RESOURCES</Text>
              <Text style={styles.headerDesp}>
                Get the most out of the event by following along with event
                materials  at your fingertips.
              </Text>
              <View style={styles.accordian}>
                <View style={styles.accordian_inner}>
                  <Image source={iconimage} style={styles.user_image} />
                  <View style={styles.accordian_content}>
                    <Text style={styles.accordian_title}>
                      Scale Up Sales Guide
                    </Text>

                    <Text style={styles.accordian_desp}>
                      The Only Sales Script You Will Ever Need
                    </Text>
                  </View>
                  <View style={styles.accordian_icon}>
                    <Svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M0 10.6 1.4 12l6-6-6-6L0 1.4 4.6 6z"
                        fill="#DFE3E7"
                        fill-rule="evenodd"
                        opacity=".2"
                      />
                    </Svg>
                  </View>
                </View>
                <View style={styles.accordian_inner}>
                  <Image source={iconimage} style={styles.user_image} />
                  <View style={styles.accordian_content}>
                    <Text style={styles.accordian_title}>
                      Scale Up Sales Guide
                    </Text>

                    <Text style={styles.accordian_desp}>
                      The Only Sales Script You Will Ever Need
                    </Text>
                  </View>
                  <View style={styles.accordian_icon}>
                    <Svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M0 10.6 1.4 12l6-6-6-6L0 1.4 4.6 6z"
                        fill="#DFE3E7"
                        fill-rule="evenodd"
                        opacity=".2"
                      />
                    </Svg>
                  </View>
                </View>
                <View style={styles.accordian_inner}>
                  <Image source={iconimage} style={styles.user_image} />
                  <View style={styles.accordian_content}>
                    <Text style={styles.accordian_title}>
                      Scale Up Sales Guide
                    </Text>

                    <Text style={styles.accordian_desp}>
                      The Only Sales Script You Will Ever Need
                    </Text>
                  </View>
                  <View style={styles.accordian_icon}>
                    <Svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M0 10.6 1.4 12l6-6-6-6L0 1.4 4.6 6z"
                        fill="#DFE3E7"
                        fill-rule="evenodd"
                        opacity=".2"
                      />
                    </Svg>
                  </View>
                </View>
                <View style={styles.accordian_inner}>
                  <Image source={iconimage} style={styles.user_image} />
                  <View style={styles.accordian_content}>
                    <Text style={styles.accordian_title}>
                      Scale Up Sales Guide
                    </Text>

                    <Text style={styles.accordian_desp}>
                      The Only Sales Script You Will Ever Need
                    </Text>
                  </View>
                  <View style={styles.accordian_icon}>
                    <Svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M0 10.6 1.4 12l6-6-6-6L0 1.4 4.6 6z"
                        fill="#DFE3E7"
                        fill-rule="evenodd"
                        opacity=".2"
                      />
                    </Svg>
                  </View>
                </View>
                <View style={styles.accordian_inner}>
                  <Image source={iconimage} style={styles.user_image} />
                  <View style={styles.accordian_content}>
                    <Text style={styles.accordian_title}>
                      Scale Up Sales Guide
                    </Text>

                    <Text style={styles.accordian_desp}>
                      The Only Sales Script You Will Ever Need
                    </Text>
                  </View>
                  <View style={styles.accordian_icon}>
                    <Svg
                      width="8"
                      height="12"
                      viewBox="0 0 8 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M0 10.6 1.4 12l6-6-6-6L0 1.4 4.6 6z"
                        fill="#DFE3E7"
                        fill-rule="evenodd"
                        opacity=".2"
                      />
                    </Svg>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  // headerContainer: {
  //   position: "absolute",
  //   paddingLeft: width * 0.015,
  //   paddingRight: width * 0.032,
  //   // marginTop: 50,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   zIndex: 3,
  //   top: 50,
  //   width: width * 1,
  //   // backgroundColor: "black",
  // },

  // headerTitle: {
  //   fontSize: width * 0.05,
  //   fontFamily: "SFProDisplaySemibold",
  //   fontStyle: "normal",
  //   letterSpacing: 0,
  //   color: "#ffffff",
  //   left: width * -0.015,
  //   top: 0.5,
  // },

  linearGradient: {
    //  flex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 5,
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    height: "100%",
    // paddingTop: height * 0.5,
    paddingTop: 350,
    // backgroundColor: "black",
  },
  preperationContainer: {
    // paddingTop: height * 0.45,
    width: width * 1,
    paddingHorizontal: width * 0.032,
    // backgroundColor : 'black'
  },
  sales_tag: {
    fontSize: width * 0.03,
    color: "white",
    lineHeight: width * 0.045,
    fontFamily: "SFProDisplayMedium",
    letterSpacing: width * 0.001,
    marginBottom: 5,
  },
  heading: {
    fontSize: width * 0.066,
    width: width * 0.6,
    color: "white",
    lineHeight: width * 0.07,
    fontFamily: "SFProDisplayMedium",
    letterSpacing: width * 0.001,
  },
  headerDesp: {
    fontSize: width * 0.037,
    color: "white",
    fontFamily: "SFProDisplayRegular",
    letterSpacing: width * 0.0001,
    lineHeight: height * 0.028,
    marginTop: 7,
    marginBottom: 25,
  },
  accordian: {
    alignItems: "center",
  },
  accordian_inner: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "rgba(19, 20, 21, .05)",
    // borderBottomColor : 'black' ,
    borderBottomWidth: 1,
    paddingVertical: height * 0.01,
  },
  user_image: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 100,
  },
  accordian_content: {
    flex: 1,
    paddingLeft: width * 0.001,
    alignItems: "flex-start",
  },
  accordian_title: {
    fontSize: width * 0.04,
    paddingLeft: width * 0.03,
    color: "white",
    fontFamily: "SFProDisplayRegular",
    marginBottom: 2,
  },
  accordian_desp: {
    fontSize: width * 0.028,
    paddingLeft: width * 0.03,
    color: "rgb(177, 186, 191)",
    marginTop: height * 0.001,
    fontFamily: "SFProDisplayRegular",
  },
  // accordian_icon : {
  //     fontSize : width * 0.027,
  //     paddingLeft : width * 0.03,
  //     marginTop : height * 0.001
  // }
});

export default Resources;

// I need more time to complete all the screens because you have add more screens that I will create from scratch and also some screens data is not coming from backend that reduce my time.
// I am working for another client and
