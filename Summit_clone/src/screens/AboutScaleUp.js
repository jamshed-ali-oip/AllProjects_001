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
import { Entypo } from "@expo/vector-icons";

const backgroundImage = require("../images/susie_black.jpg");
const iconimage = require("../images/icon.png");

const { height, width } = Dimensions.get("window");

const AboutScaleUp = ({ navigation }) => {
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerStyle: {
  //       elevation: 0,
  //       shadowOpacity: 0,
  //       backgroundColor: "black",
  //       // position:'absolute',
  //     },
  //     header: customHeaderComponent,
  //     // header: () =>  <Text style={styles.headerText}>HOME</Text>,
  //   });
  // }, [navigation]);

  // const customHeaderComponent = () => (
  //   <View style={styles.customHeaderContainer}>
  //     <TouchableOpacity onPress={() => navigation.goBack()}>
  //       <View
  //         style={{
  //           alignItems: "center",
  //           flexDirection: "row",
  //         }}
  //       >
  //         <Text style={styles.headerText}>HOME</Text>
  //       </View>
  //     </TouchableOpacity>
  //   </View>
  // );

  const ActiveUnactiveArray = [
    {
      id: 0,
      image_url: require("../images/agenda/image1.png"),
      isActive: true,
      username: "Micheal",
    },
    {
      id: 1,
      image_url: require("../images/agenda/image2.jpg"),
      isActive: false,
      username: "Charles",
    },
    {
      id: 3,
      image_url: require("../images/agenda/image3.jpg"),
      isActive: true,
      username: "Informix",
    },
    {
      id: 4,
      image_url: require("../images/agenda/image4.jpg"),
      isActive: true,
      username: "Launch",
    },
    {
      id: 5,
      image_url: require("../images/agenda/image5.jpg"),
      isActive: true,
      username: "Test",
    },
    {
      id: 6,
      image_url: require("../images/agenda/image1.png"),
      isActive: true,
      username: "Micheal",
    },
    {
      id: 7,
      image_url: require("../images/agenda/image2.jpg"),
      isActive: false,
      username: "Charles",
    },
    {
      id: 8,
      image_url: require("../images/agenda/image3.jpg"),
      isActive: true,
      username: "Informix",
    },
    {
      id: 9,
      image_url: require("../images/agenda/image4.jpg"),
      isActive: true,
      username: "Launch App",
    },
    {
      id: 10,
      image_url: require("../images/agenda/image5.jpg"),
      isActive: true,
      username: "Test",
    },
  ];

  const uiItems = (item) => (
    <View key={item.id} style={styles.listItem}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.push("AboutSpeakerProfile")}
        style={{ alignItems: "center" }}
      >
        <Image source={item.item.image_url} style={styles.profileImage} />
        <View style={styles.userTitle}>
          <Text style={styles.username}>{item.item.username}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, position : "relative" }}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0)" translucent={true} />
      <View style={styles.backgroundContainer}>
        <View style={styles.leftContainer}></View>
        <View style={styles.midContainer}></View>
        <View style={styles.rightContainer}></View>
      </View>
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, .6)", "rgba(0, 0, 0, 0)"]}
        start={{ x: 0, y: 0.25 }}
        style={styles.linearGradient}
      >
        <View
          style={{
            width: width * 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Image
            style={{
              height: height * 0.6,
              width: width * 0.8,
              marginTop: height * 0.05,
              marginRight: width * 0.032,
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
            position: "absolute",
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
          <ScrollView>
            <View
              style={[
                styles.content,
                {
                  flex: 1,
                  // paddingBottom: 50,
                  paddingTop: height * 0.5,
                  paddingLeft: width * 0.03,
                  // backgroundColor: "rgba(0, 0, 0, 1)",
                },
              ]}
            >
              <Text style={styles.subHeading}>ABOUT</Text>
              <Text style={styles.heading}>SCALE UP 3-DAY EVENT</Text>
              <View style={styles.iconContent}>
                <MaterialCommunityIcons
                  name="calendar-check-outline"
                  size={width * 0.03}
                  color="white"
                />
                <Text style={[styles.iconText, { marginRight: 12 }]}>
                  January 1, 2022 @ 11 AM PST
                </Text>
                <Entypo name="location" size={width * 0.03} color="white" />
                <Text style={styles.iconText}>Zoom</Text>
              </View>
              <View style={[styles.tagsContainer, {}]}>
                <Text style={[styles.sales_tag, {}]}>Sales</Text>
                <Text style={[styles.sales_tag, {}]}>Funnels</Text>
                <Text style={[styles.sales_tag, {}]}>Mindset</Text>
                <Text style={[styles.sales_tag, {}]}>Finance</Text>
                <Text style={[styles.sales_tag, {}]}>Leadership</Text>
              </View>
              <Text style={styles.titleHeading}>Speakers</Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={ActiveUnactiveArray}
                renderItem={uiItems}
                keyExtractor={(item) => item.id}
              />
              <Text style={styles.aboutEventDetail}>
                You did it! You’re now part of the Virtual Big Money Business
                Summit. And on Friday, June 25th through Sunday, June 27th, 2021
                you’re going to rock your business and the world with this 3-Day
                Live Event designed to help you rapidly find the wealth building
                opportunities that currently exist in your business and turn
                them into reality. Get ready to experience rapid growth in your
                business during the sales explosion edition. Let’s review the
                details you need to make your day super easy and convenient:
                Event Location The Big Money Business Summit is 100% virtual
                this year and we'll all be gathering together with Zoom. We will
                be sending you more details, including the Zoom link, when we
                get closer to the event kickoff.
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </LinearGradient>

      {/*         

          <View style={styles.buttonText}>
            <Text
              style={{
                color: "white",
                fontSize: 17,
                marginTop: height * 0.16,
              }}
            >
              About
            </Text>
            <Text style={{ color: "white", fontSize: 30, fontWeight: "600" }}>
              SCALE UP
            </Text>
            <Text style={{ color: "white", fontSize: 30, fontWeight: "600" }}>
              3 DAY EVENT
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{ height: 20, width: 20 }}
                source={require("../images/calender.png")}
              />
              <Text style={{ color: "white" }}>
                {" "}
                January,1,2020 @ 11 AM PST{" "}
              </Text>
              <Image
                style={{ height: 20, width: 20 }}
                source={require("../images/location.png")}
              />
              <Text style={{ color: "white" }}> Zoom</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Text
                style={{
                  borderRadius: 50,
                  borderWidth: 1.5,
                  borderColor: "white",
                  color: "white",
                  width: 60,
                  textAlign: "center",
                }}
              >
                Sales
              </Text>
              <Text
                style={{
                  borderRadius: 50,
                  borderWidth: 1.5,
                  borderColor: "white",
                  color: "white",
                  width: 65,
                  textAlign: "center",
                  marginLeft: 8,
                }}
              >
                funnel
              </Text>
              <Text
                style={{
                  borderRadius: 50,
                  borderWidth: 1.5,
                  borderColor: "white",
                  color: "white",
                  width: 75,
                  textAlign: "center",
                  marginLeft: 8,
                }}
              >
                Mindset
              </Text>
              <Text
                style={{
                  borderRadius: 50,
                  borderWidth: 1.5,
                  borderColor: "white",
                  color: "white",
                  width: 75,
                  textAlign: "center",
                  marginLeft: 8,
                }}
              >
                finance
              </Text>
              <Text
                style={{
                  borderRadius: 50,
                  borderWidth: 1.5,
                  borderColor: "white",
                  color: "white",
                  width: 100,
                  textAlign: "center",
                  marginLeft: 8,
                }}
              >
                Leadership
              </Text>
            </View>
            <Text style={{ color: "white", fontSize: 20 }}>Speakers</Text>
          </View>
        </LinearGradient> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    // paddingHorizontal: width * 0.010,
    // marginTop: 60,
    top : 60,
    left : 0, 
    flexDirection: "row",
    alignItems: "center",
    zIndex: 99,
    //  backgroundColor: "yellow",
     width : width * 0.25
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
    // paddingTop: height * 0.07,
    // backgroundColor: "transparent",
    // paddingBottom: 12,
    // position : "relative",
    // top: 100,
    // left: 0,
    // zIndex: 999,
    // backgroundColor: "#000",
    // height: 0,
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
    // fontSize: width * 0.06,
    // width: width * 0.6,
    // color: "white",
    // // fontWeight : '500',
    // lineHeight: width * 0.07,
    // marginVertical: width * 0.01,
    // letterSpacing: width * 0.001,
    fontSize: width * 0.066,
    fontFamily: "SFProDisplayMedium",
    fontWeight: "500",
    color: "#ffffff",
    width: width * 0.45,
    marginBottom: 10,
    // backgroundColor : "black",
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 16,
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

  titleHeading: {
    fontSize: width * 0.044,
    fontFamily: "SFProDisplayRegular",
    color: "#ffffff",
    marginBottom: 12,
    // backgroundColor : "black",
  },
  flatListContainer: {
    // backgroundColor: "red",
    paddingLeft: width * 0.03,
    paddingTop: 12,
    paddingBottom: 21,
  },
  listItem: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    marginRight: width * 0.085,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 100,
  },

  username: {
    fontSize: width * 0.044,
    fontFamily: "SFProDisplayRegular",
    fontWeight: "500",
    fontStyle: "normal",
    color: "#fff",
    marginTop: 2,
    // backgroundColor : "blue"
  },

  aboutEventDetail: {
    fontSize: width * 0.037,
    fontFamily: "SFProDisplayRegular",
    lineHeight: width * 0.06,
    letterSpacing: 0.1,
    color: "#ffffff",
    marginTop: 12,
    paddingRight: width * 0.035,
  },

  backgroundContainer: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    width: "100%",
    position: "absolute",
    width: width * 1,
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

  addButton: {
    zIndex: 1111,
    width: 200,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    position: "absolute",
    height: "100%",
    // backgroundColor : 'black'
    // marginTop: height * 0.25,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    // textAlign: 'center',
    margin: 10,
    height: height * 0.7,
    width: width * 1,
    // color: '#ffffff',
    backgroundColor: "transparent",
  },
});

export default AboutScaleUp;
