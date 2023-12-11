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

const Preperation = ({ navigation }) => {
  const [checkedOne, setCheckedOne] = useState(true);
  const [checkedTwo, setCheckedTwo] = useState(true);
  const [checkedThree, setCheckedThree] = useState(true);
  const [checkedFour, setCheckedFour] = useState(true);

  return (
    <View style={{ position: "relative", flex: 1 }}>

      <StatusBar backgroundColor="rgba(0, 0, 0, 0)" translucent={true} />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerContainer}
      >
        <View style={{ flexDirection: "row" }}>
          <Entypo name="chevron-small-left" size={width * 0.07} color="white" />
          <Text style={styles.headerTitle}>HOME</Text>
        </View>

        <TouchableOpacity>
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
      </TouchableOpacity>

      <Image
        source={require("../images/home/preperation.jpg")}
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
              <Text style={styles.sales_tag}>PREPARATION</Text>
              <Text style={styles.heading}>GET READY TO SCALE UP</Text>
              <Text style={styles.headerDesp}>
                In order to give you the best experience we need to make sure
                some things are done.
              </Text>
              <View style={[styles.checkDetailContainer]}>
                <TouchableOpacity
                  style={[styles.checkContainer]}
                  onPress={()=> setCheckedOne(!checkedOne)}
                >
                  {checkedOne ? (
                    <Svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Rect
                        width="18"
                        height="18"
                        rx="2"
                        transform="translate(1 1)"
                        stroke="#FFF"
                        fill="none"
                        fill-rule="evenodd"
                      />
                    </Svg>
                  ) : (
                    <Svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <G
                        stroke="#FFF"
                        fill="none"
                        fill-rule="evenodd"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <Path d="M19 11.8v5.4a1.8 1.8 0 0 1-1.8 1.8H2.8A1.8 1.8 0 0 1 1 17.2V2.8A1.8 1.8 0 0 1 2.8 1H10" />
                        <Path d="m6.4 8.2 3.6 3.6L19 1" />
                      </G>
                    </Svg>
                  )}
                </TouchableOpacity>
                <View style={[styles.checkContainerText]}>
                  <TouchableOpacity>
                    <Text style={[styles.checkLinkText]}>
                      Submit your mailing address to receive your swagbox and
                      workbook
                      <AntDesign
                        name="link"
                        size={12}
                        color="white"
                        style={{}}
                      />
                    </Text>
                    <View style={[styles.checkLinkTextDetail]}>
                      <MaterialCommunityIcons
                        name="calendar-check"
                        size={12}
                        color="white"
                      />
                      <Text
                        style={[
                          styles.checkLinkTextDetailText,
                          { marginRight: 10 },
                        ]}
                      >
                        Due January 1, 2022 @ 11 AM PST
                      </Text>
                      <Entypo name="location" size={12} color="white" />
                      <Text style={styles.checkLinkTextDetailText}>
                        San Diego, CA
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.checkDetailContainer]}>
                <TouchableOpacity
                  style={[styles.checkContainer]}
                  onPress={()=> setCheckedTwo(!checkedTwo)}
                >
                  {checkedTwo ? (
                    <Svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Rect
                        width="18"
                        height="18"
                        rx="2"
                        transform="translate(1 1)"
                        stroke="#FFF"
                        fill="none"
                        fill-rule="evenodd"
                      />
                    </Svg>
                  ) : (
                    <Svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <G
                        stroke="#FFF"
                        fill="none"
                        fill-rule="evenodd"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <Path d="M19 11.8v5.4a1.8 1.8 0 0 1-1.8 1.8H2.8A1.8 1.8 0 0 1 1 17.2V2.8A1.8 1.8 0 0 1 2.8 1H10" />
                        <Path d="m6.4 8.2 3.6 3.6L19 1" />
                      </G>
                    </Svg>
                  )}
                </TouchableOpacity>
                <View style={[styles.checkContainerText]}>
                  <TouchableOpacity>
                    <Text style={[styles.checkLinkText]}>
                      Submit your mailing address to receive your swagbox and
                      workbook
                      <AntDesign
                        name="link"
                        size={12}
                        color="white"
                        style={{}}
                      />
                    </Text>
                    <View style={[styles.checkLinkTextDetail]}>
                      <MaterialCommunityIcons
                        name="calendar-check"
                        size={12}
                        color="white"
                      />
                      <Text
                        style={[
                          styles.checkLinkTextDetailText,
                          { marginRight: 10 },
                        ]}
                      >
                        Due January 1, 2022 @ 11 AM PST
                      </Text>
                      <Entypo name="location" size={12} color="white" />
                      <Text style={styles.checkLinkTextDetailText}>
                        San Diego, CA
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.checkDetailContainer]}>
                <TouchableOpacity
                  style={[styles.checkContainer]}
                  onPress={()=> setCheckedThree(!checkedThree)}
                >
                  {checkedThree ? (
                    <Svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Rect
                        width="18"
                        height="18"
                        rx="2"
                        transform="translate(1 1)"
                        stroke="#FFF"
                        fill="none"
                        fill-rule="evenodd"
                      />
                    </Svg>
                  ) : (
                    <Svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <G
                        stroke="#FFF"
                        fill="none"
                        fill-rule="evenodd"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <Path d="M19 11.8v5.4a1.8 1.8 0 0 1-1.8 1.8H2.8A1.8 1.8 0 0 1 1 17.2V2.8A1.8 1.8 0 0 1 2.8 1H10" />
                        <Path d="m6.4 8.2 3.6 3.6L19 1" />
                      </G>
                    </Svg>
                  )}
                </TouchableOpacity>
                <View style={[styles.checkContainerText]}>
                  <TouchableOpacity>
                    <Text style={[styles.checkLinkText]}>
                      Submit your mailing address to receive your swagbox and
                      workbook
                      <AntDesign
                        name="link"
                        size={12}
                        color="white"
                        style={{}}
                      />
                    </Text>
                    <View style={[styles.checkLinkTextDetail]}>
                      <MaterialCommunityIcons
                        name="calendar-check"
                        size={12}
                        color="white"
                      />
                      <Text
                        style={[
                          styles.checkLinkTextDetailText,
                          { marginRight: 10 },
                        ]}
                      >
                        Due January 1, 2022 @ 11 AM PST
                      </Text>
                      <Entypo name="location" size={12} color="white" />
                      <Text style={styles.checkLinkTextDetailText}>
                        San Diego, CA
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.checkDetailContainer]}>
                <TouchableOpacity
                  style={[styles.checkContainer]}
                  onPress={()=> setCheckedFour(!checkedFour)}
                >
                  {checkedFour ? (
                    <Svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Rect
                        width="18"
                        height="18"
                        rx="2"
                        transform="translate(1 1)"
                        stroke="#FFF"
                        fill="none"
                        fill-rule="evenodd"
                      />
                    </Svg>
                  ) : (
                    <Svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <G
                        stroke="#FFF"
                        fill="none"
                        fill-rule="evenodd"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <Path d="M19 11.8v5.4a1.8 1.8 0 0 1-1.8 1.8H2.8A1.8 1.8 0 0 1 1 17.2V2.8A1.8 1.8 0 0 1 2.8 1H10" />
                        <Path d="m6.4 8.2 3.6 3.6L19 1" />
                      </G>
                    </Svg>
                  )}
                </TouchableOpacity>
                <View style={[styles.checkContainerText]}>
                  <TouchableOpacity>
                    <Text style={[styles.checkLinkText]}>
                      Submit your mailing address to receive your swagbox and
                      workbook
                      <AntDesign
                        name="link"
                        size={12}
                        color="white"
                        style={{}}
                      />
                    </Text>
                    <View style={[styles.checkLinkTextDetail]}>
                      <MaterialCommunityIcons
                        name="calendar-check"
                        size={12}
                        color="white"
                      />
                      <Text
                        style={[
                          styles.checkLinkTextDetailText,
                          { marginRight: 10 },
                        ]}
                      >
                        Due January 1, 2022 @ 11 AM PST
                      </Text>
                      <Entypo name="location" size={12} color="white" />
                      <Text style={styles.checkLinkTextDetailText}>
                        San Diego, CA
                      </Text>
                    </View>
                  </TouchableOpacity>
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
  headerContainer: {
    position: "absolute",
    paddingLeft: width * 0.015,
    paddingRight: width * 0.032,
    // marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 3,
    top: 50,
    width: width * 1,
    // backgroundColor: "black",
  },

  headerTitle: {
    fontSize: width * 0.05,
    fontFamily: "SFProDisplaySemibold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff",
    left: width * -0.015,
    top: 0.5,
  },

  linearGradient: {
    // flex: 1,
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
    width: width * 0.45,
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
  },
  checkDetailContainer: {
    marginTop: 25,
    flexDirection: "row",
    // backgroundColor: "black",
  },
  checkContainerText: {
    marginLeft: width * 0.032,
  },
  checkLinkText: {
    fontSize: width * 0.044,
    fontWeight: "normal",
    fontStyle: "normal",
    color: "#ffffff",
    fontFamily: "SFProDisplayRegular",
    lineHeight: 20,
    // textDecorationColor: "white",
    // textDecorationLine: "underline",
    // textDecorationStyle: "solid",
  },
  checkLinkTextDetail: {
    marginTop: 10,
    flexDirection: "row",
    // justifyContent : 'center'
    alignItems: "center",
  },
  checkLinkTextDetailText: {
    fontSize: width * 0.027,
    letterSpacing: 0.07,
    color: "#ffffff",
    fontFamily: "SFProDisplayRegular",
    marginLeft: 10,
    // backgroundColor : 'black'
  },
});

export default Preperation;

// I need more time to complete all the screens because you have add more screens that I will create from scratch and also some screens data is not coming from backend that reduce my time.
// I am working for another client and
