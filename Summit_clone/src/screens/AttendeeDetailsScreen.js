import React, { useLayoutEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Platform,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AntDesign, Feather } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import CustomHeader from "../components/common/CustomHeader";
import { Avatar } from "../components/ui";
import Screen from "../components/ui/Screen";
import colors from "../constants/colors";
import Arrow from "../components/icons/Arrow";

const AttendeeDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
      header: customHeaderComponent,
    });
  }, [navigation]);

  const customHeaderComponent = () => (
    <CustomHeader>
      <View style={styles.customHeaderContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Arrow name="left" color={colors.primary} />
            <Text style={styles.headerText}>{`ATTENDEES`}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="setting" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </CustomHeader>
  );

  return (
    <Screen style={styles.screenContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View onStartShouldSetResponder={() => true}>
          <View style={styles.personContainer}>
            <Avatar
              src={{
                uri:
                  item.avatarUrl != null
                    ? item.avatarUrl
                    : faker.image.avatar(),
              }}
              size="xlarge"
            />
            <Text style={styles.greetingText}>{`Hey ${item.firstName}!`}</Text>
            <Text
              style={{
                fontFamily: "SFProDisplayRegular",
                fontSize: 17,
                fontWeight: "normal",
                fontStyle: "normal",
                lineHeight: 41,
                letterSpacing: 0,
                textAlign: "center",
                color: "#60626a",
              }}
            >
              Transformational Coach
            </Text>
            <Text
              style={{
                fontFamily: "SFProDisplayRegular",
                fontSize: 12,
                fontWeight: "normal",
                fontStyle: "normal",
                lineHeight: 22,
                letterSpacing: 0.09,
                textAlign: "center",
                color: "#5b5b5c",
                marginVertical: 15,
              }}
            >
              Follow me on social media
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "10%" }}>
                <Image
                  source={require("../images/attendee/facebookIcon.png")}
                  style={{ width: 12, height: 24, resizeMode: "contain" }}
                />
              </View>
              <View style={{ width: "14%" }}>
                <Image
                  source={require("../images/attendee/facebookMessengerIcon.png")}
                  style={{ width: 24, height: 24, resizeMode: "contain" }}
                />
              </View>
              <View style={{ width: "14%" }}>
                <Image
                  source={require("../images/attendee/linkedinIcon.png")}
                  style={{ width: 29, height: 24, resizeMode: "contain" }}
                />
              </View>
              <View style={{ width: "14%" }}>
                <Image
                  source={require("../images/attendee/twitterIcon.png")}
                  style={{ width: 29, height: 24, resizeMode: "contain" }}
                />
              </View>
              <View style={{ width: "14%" }}>
                <Image
                  source={require("../images/attendee/instagramIcon.png")}
                  style={{ width: 24, height: 24, resizeMode: "contain" }}
                />
              </View>

              <View style={{ width: "14%" }}>
                <Image
                  source={require("../images/attendee/youtubeIcon.png")}
                  style={{ width: 34, height: 24, resizeMode: "contain" }}
                />
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <Text
                style={{
                  fontFamily: "SFProDisplaySemiBold",
                  fontSize: 14,
                  fontWeight: Platform.OS === "android" ? "bold" : "600",
                  fontStyle: "normal",
                  lineHeight: 22,
                  letterSpacing: 0.1,
                  textAlign: "center",
                  color: "#5b5b5c",
                  marginTop: 10,
                }}
              >
                I am a transformational coach that helps women reshape their
                relationship with money.
              </Text>
            </View>
          </View>
          <Text style={styles.detailsInfo}>
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.{" "}
          </Text>

          <View style={styles.infoContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 7,
              }}
            >
              <Image
                source={require("../images/attendee/check.png")}
                style={styles.image}
              />
              <Text style={styles.text}>4/4 Profile Complete & Verified</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 7,
              }}
            >
              <Image
                source={require("../images/attendee/taskIcon.png")}
                style={styles.image}
              />
              <Text style={styles.text}>4/5 Preparation tasks completed</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 7,
              }}
            >
              <Image
                source={require("../images/attendee/tabBarCalendarIcon.png")}
                style={styles.image}
              />
              <Text style={styles.text}>6 Agenda sessions saved</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 7,
              }}
            >
              <Image
                source={require("../images/attendee/tabBarChatIcon.png")}
                style={styles.image}
              />
              <Text style={styles.text}>89 Messages sent</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 7,
              }}
            >
              <Image
                source={require("../images/attendee/connectionsIcon.png")}
                style={styles.image}
              />
              <Text style={styles.text}>14 connections</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 7,
              }}
            >
              <Image
                source={require("../images/attendee/timeIcon.png")}
                style={styles.image}
              />
              <Text style={styles.text}>13 hours in app</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default AttendeeDetailsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colors.white,
    // flex:1
  },
  customHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  headerText: {
    // color: colors.primary,
    // fontSize: RFPercentage(2.5),
    fontFamily: "SFProDisplayMedium",
    fontSize: 18,
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#9d0511",
  },

  infoContainer: {
    paddingBottom: "7%",
    paddingHorizontal: "5%",
  },
  personContainer: {
    paddingHorizontal: "10%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 40,
  },
  descriptionContainer: {
    paddingHorizontal: "10%",
  },
  greetingText: {
    fontFamily: "SFProDisplaySemiBold",
    fontSize: 34,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 41,
    letterSpacing: 0,
    textAlign: "center",
    color: "#60626a",
  },
  description: {
    fontSize: RFPercentage(2),
    color: colors.black,
    textAlign: "center",
    lineHeight: 30,
  },
  detailsInfo: {
    paddingHorizontal: 16,
    textAlign: "left",
    marginVertical: 20,
    fontFamily: "SFProDisplayRegular",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 22,
    letterSpacing: 0.1,
    color: "#5b5b5c",
    marginLeft: 5,
  },

  image: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  icon: {
    marginHorizontal: 6,
  },
  text: {
    marginLeft: 30,
    fontFamily: "SFProDisplayMedium",
    fontSize: 14,
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontStyle: "normal",
    lineHeight: 22,
    letterSpacing: 0.1,
    color: "#5b5b5c",
    // fontWeight: "600",
    // fontSize: RFPercentage(2.3),
  },
});
