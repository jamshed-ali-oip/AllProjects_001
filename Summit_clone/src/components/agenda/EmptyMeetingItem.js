import dayjs from "dayjs";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";

import { RFPercentage } from "react-native-responsive-fontsize";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../../components/ui/Screen";

import colors from "../../constants/colors";
import { color } from "react-native-reanimated";

import Svg, { G, Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const images = require("../../images/agenda/image4.jpg");

var evenData = [
  {
    status: false,
    tag: "Sales",
    time: "10:00AM",
    title: "How to get clients to the YES",
    desp: "Susie Carder",
    bookmark: (
      <Svg
        width="15"
        height="20"
        viewBox="0 0 15 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M1 .12h13a1 1 0 0 1 1 1v17.61a1 1 0 0 1-1.702.713L7.5 13.731l-5.798 5.712A1 1 0 0 1 0 18.731V1.12a1 1 0 0 1 1-1z"
          fill="gray"
          fill-rule="evenodd"
        />
      </Svg>
    ),
  },
  {
    status: true,
    tag: "Mindset",
    time: "11:00AM",
    title: "Turn Your Dreams into a Reality",
    desp: "Helice Bridges",
    bookmark: (
      <Svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M14.673 1.12v17.61l-6.5-6.403-6.5 6.404V1.12h13z"
          stroke="#B3B3B3"
          stroke-width="2"
          fill="none"
          fill-rule="evenodd"
        />
      </Svg>
    ),
  },
  {
    status: false,
    tag: "Funnels",
    time: "12:00AM",
    title: "Sales Funnels that Convert",
    desp: "Josie Martinez",
    bookmark: (
      <Svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M14.673 1.12v17.61l-6.5-6.403-6.5 6.404V1.12h13z"
          stroke="#B3B3B3"
          stroke-width="2"
          fill="none"
          fill-rule="evenodd"
        />
      </Svg>
    ),
  },
  {
    status: false,
    tag: "Funnels",
    time: "12:00AM",
    title: "Sales Funnels that Convert",
    desp: "Josie Martinez",
    bookmark: (
      <Svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M14.673 1.12v17.61l-6.5-6.403-6.5 6.404V1.12h13z"
          stroke="#B3B3B3"
          stroke-width="2"
          fill="none"
          fill-rule="evenodd"
        />
      </Svg>
    ),
  },
  {
    status: false,
    tag: "Funnels",
    time: "12:00AM",
    title: "Sales Funnels that Convert",
    desp: "Josie Martinez",
    bookmark: (
      <Svg
        width="15"
        height="20"
        viewBox="0 0 15 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M1 .12h13a1 1 0 0 1 1 1v17.61a1 1 0 0 1-1.702.713L7.5 13.731l-5.798 5.712A1 1 0 0 1 0 18.731V1.12a1 1 0 0 1 1-1z"
          fill="gray"
          fill-rule="evenodd"
        />
      </Svg>
    ),
  },
  {
    status: false,
    tag: "Funnels",
    time: "12:00AM",
    title: "Sales Funnels that Convert",
    desp: "Josie Martinez",
    bookmark: (
      <Svg
        width="15"
        height="20"
        viewBox="0 0 15 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M1 .12h13a1 1 0 0 1 1 1v17.61a1 1 0 0 1-1.702.713L7.5 13.731l-5.798 5.712A1 1 0 0 1 0 18.731V1.12a1 1 0 0 1 1-1z"
          fill="gray"
          fill-rule="evenodd"
        />
      </Svg>
    ),
  },
];

const EmptyMeetingItem = ({ selectedDate }) => {
  const renderItem = ({ item }) => (
    <View style={styles.eventContainer}>
      {item.status ? (
        <View style={styles.lines}>
          <View style={styles.handle}></View>
        </View>
      ) : null}
      <View style={styles.eventRow}>
        <View style={styles.eventTags}>
          <View style={styles.tag}>
            <Text style={styles.tag_name}>{item.tag}</Text>
          </View>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.center_content}>
          <View style={styles.imageContainer}>
            <Image source={images} style={styles.image} />
          </View>
          <View>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.title}>{item.desp}</Text>
          </View>
        </View>
        <View style={styles.event_icon}>{item.bookmark}</View>
      </View>
    </View>
  );

  return (
    <Screen>
      <TouchableOpacity>
        {/* <View style={styles.renderItemWrapper}>
          <Text style={styles.noEvents}>
            No Events on {dayjs(selectedDate).format("MMM DD, YYYY")}
          </Text>
          <Text style={styles.anotherDate}>Please select another date</Text>
        </View> */}

        {console.log(selectedDate)}
      </TouchableOpacity>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={evenData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </Screen>
  );
};

export default EmptyMeetingItem;

const styles = StyleSheet.create({
  renderItemWrapper: {
    marginVertical: "3%",
    width: "100%",
    alignItems: "center",
  },
  anotherDate: {
    color: colors.darkGray,
    fontSize: RFPercentage(1.5),
    fontWeight: "normal",
    // backgroundColor: "red",
  },
  noEvents: {
    color: colors.primary,
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    // backgroundColor: "red",
  },
  eventContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    // backgroundColor: "red",
    paddingHorizontal: width * 0.03,
  },
  eventRow: {
    flexDirection: "row",
    // backgroundColor: "#000",
  },
  eventTags: {
    borderRightWidth: 4,
    borderRightColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 92,
    width : width * 0.18,
    // backgroundColor : 'yellow'
  },
  tag: {
    backgroundColor: colors.primary,
    borderRadius: 7.7,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingTop: 1,
    paddingBottom: 1.4,
  },
  tag_name: {
    fontSize: RFPercentage(1.2),
    // color: "white",
    // lineHeight: 0.1,
    // textAlign: "center",
    // fontWeight: "500",
    // letterSpacing: width * 0.001,
    // fontSize: 9.5,  
    fontFamily : 'SFProDisplayMedium',
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#ffffff",
  },
  time: {
    fontSize: RFPercentage(1.6),
    // marginTop: width * 0.01,
    // fontSize: 12,
    fontWeight: "900",
    fontStyle: "normal",
    letterSpacing: 0.13,
    textAlign: "center",
    color: "rgb(134, 134, 134)",
    marginTop : 8
  },
  center_content: {
    flexDirection: "row",
    paddingTop: 7,
    // paddingLeft: 12,
    paddingHorizontal: width * 0.03,
    flex: 1,
    // backgroundColor: "yellow",
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  name: {
    // width: width * 0.46,
    // fontWeight: "normal",
    // fontStyle: "normal",
    // lineHeight: width * 0.05,
    // color: "rgb(59,59,59)",
    width: 164,
    fontFamily : 'SFProDisplayRegular',
    // fontSize: 16.5,
    fontSize: RFPercentage(2.30),
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0.18,
    color: "rgb(59,59,59)",
    // backgroundColor : 'red'
    // color: "#3b3b3b",
  },
  title: {
    fontSize: RFPercentage(1.70),
    // fontWeight: "500",
    // fontSize: 12.5,
    fontFamily : 'SFProDisplayMedium',
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0.14,
    color: "rgb(171,171,171)",
    marginTop: 4,
  },
  event_icon: {
    alignSelf: "center",
    paddingRight: 12,
    // backgroundColor : red
  },
  lines: {
    backgroundColor: colors.primary,
    height: 2,
    width: width * 0.798,
    position: "absolute",
    top: 16,
    zIndex: 1,
    right: 0,
  },
  handle: {
    height: 8,
    width: 8,
    backgroundColor: colors.primary,
    borderRadius: 100,
    top: -3,
    left: -3,
  },
  bookmark: {
    height: 20,
    width: 15,
  },
});
