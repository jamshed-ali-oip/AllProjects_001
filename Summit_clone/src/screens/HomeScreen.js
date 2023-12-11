import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  RefreshControl,
  StatusBar,
} from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import dayjs from "dayjs";
import Constants from "expo-constants";

import Screen from "../components/ui/Screen";
import colors from "../constants/colors";
import { TouchableOpacity } from "react-native";
import {
  homescreenFlatListData,
  homescreenInitialSession,
} from "../constants/data";
import { getAllEvents } from "../services/agendaService";
import * as Device from "expo-device";
import { LinearGradient } from "expo-linear-gradient";

const { height, width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const initialTargetDate = null;
  const windowWidth = Dimensions.get("window").width;
  const [sessionList, setSessionList] = useState(homescreenInitialSession);
  const [events, setEvents] = useState([]);
  const [targetDate, setTargetDate] = useState(initialTargetDate);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [sessionRefresher, setSessionRefresher] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    getAllEvents(setEvents, setLoading);
  }, []);

  // componentDidMount()
  // {
  //   EventService.getCurrentEvent().then(s=>{
  //     if(s.data)
  //     {
  //       //current event here.
  //     }
  //   });
  // }

  useEffect(() => {
    const sortedEvents = events
      .filter(
        (event) =>
          !dayjs(event.date, "YYYY-MM-DD").isBefore(
            dayjs().format("YYYY-MM-DD")
          )
      )
      .sort((a, b) => {
        return dayjs(a.date, "YYYY-MM-DD") - dayjs(b.date, "YYYY-MM-DD");
      });
    // console.log("These are the sorted events ", sortedEvents)
    if (sortedEvents.length > 0) {
      let allSessions = [];
      sortedEvents.forEach((event) => {
        if (event.sessions) {
          event.sessions.forEach((session) => {
            allSessions.push(session);
          });
        }
      });
      const sortedSessions = allSessions

        .filter(
          (session) =>
            !dayjs(session.sessionTime, "YYYY-MM-DD hh:mm").isBefore(dayjs())
        )
        .sort((a, b) => {
          return (
            dayjs(a.sessionTime, "YYYY-MM-DD hh:mm") -
            dayjs(b.sessionTime, "YYYY-MM-DD hh:mm")
          );
        });

      // console.log("These are the sorted sessions ", sortedSessions)
      if (sortedSessions.length > 0) {
        setTargetDate(dayjs(sortedSessions[0]?.sessionTime));
      } else {
        setTargetDate(null);
      }
    }
  }, [events, sessionRefresher]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
      headerShown: false,
    });

    (async () => {
      const type = await Device.getDeviceTypeAsync();
      console.log("This is the device type ", type);
      setIsTablet(type === 2);
    })();
  }, [navigation]);

  useEffect(() => {
    if (targetDate) {
      const now = dayjs();
      const timeInMilliSeconds = targetDate.diff(now);

      const seconds = timeInMilliSeconds / 1000;
      const minutes = seconds / 60;
      const hours = minutes / 60;
      const days = hours / 24;
      const weeks = days / 7;

      const timer = setTimeout(() => {
        setSessionList([
          {
            date: parseInt(weeks),
            time: "WKS",
          },
          {
            date: parseInt(days % 7),
            time: "DYS",
          },
          {
            date: parseInt(hours % 24),
            time: "HRS",
          },
          {
            date: parseInt(minutes % 60),
            time: "MIN",
          },
          {
            date: parseInt(seconds % 60),
            time: "SEC",
          },
        ]);
      }, 1000);

      setTimeout(() => {
        setSessionRefresher(!sessionRefresher);
        clearTimeout(timer);
      }, timeInMilliSeconds);
    }
  }, [sessionList, targetDate]);

  const renderItem = ({ item, index }) => (
    <View key={index} style={[styles.btmImageContainer]}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.push(item.text)}
        style={{}}
      >
        <View style={[{ overflow: "hidden", position: "relative" }]}>
          <View
            style={{
              backgroundColor: "rgba(174, 29, 34, 0.75)",
              height: 133,
              width: 200,
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
              borderRadius: 8,
            }}
          ></View>
          <Image
            source={item.imageSource}
            style={{ width: 200, height: 133, borderRadius: 8 }}
          />
          <Text style={styles.prepText}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    </View>
    
  );

  // mushfiq changes width
  /* <View
        key={item.id}
        style={[
          styles.btmImageContainer,
          {
            marginLeft:
              index === 0 && !isTablet ? 7 : index === 0 && isTablet ? 23 : 0,
            marginRight:
              index === homescreenFlatListData.length - 1 && !isTablet
                ? 8
                : index === homescreenFlatListData.length - 1 && isTablet
                ? 25
                : 0,
          },
        ]}

      > */

  return (
    <ScrollView style={styles.wrapper} showsHorizontalScrollIndicator={false}>
      <Screen style={styles.container}>
        {/* <StatusBar backgroundColor="rgba(0, 0, 0, 0)" translucent={true} /> */}
        <View style={styles.imageContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.push("GlobalLeadershipProgram")}
            style={{}}
          >
            <Image
              source={require("../images/home/banner.jpg")}
              resizeMode="contain"
              style={{
                width: width * 0.95,
                height: width * 0.95,
                borderRadius: 12,
              }}
            />
            <View style={styles.headingContainer}>
              <Text style={styles.subHeading}>ABOUT</Text>
              <Text style={styles.heading}>SCALE UP 3-DAY EVENT</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.sessionContainer,
            {
              marginTop: "3%",
            },
          ]}
        >
          <Text style={styles.bigSessionText}>NEXT BIG SESSION IN</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
          >
            {sessionList.map((item, index) => (
              <View style={styles.session} key={index}>
                <Text style={styles.dateText}>
                  {item.date.toString().length !== 2
                    ? `0${item.date}`
                    : item.date}
                </Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <FlatList
          horizontal
          data={homescreenFlatListData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: isTablet ? 40 : 0 }}
          refreshControl={
            <RefreshControl
              onRefresh={() => setRefresh(!refresh)}
              refreshing={loading}
              colors={[colors.primary]}
            />
          }
        />
      </Screen>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
  },
  imageContainer: {
    alignItems: "center",
    position: "relative",
    borderRadius: 8,
    shadowOffset: {},
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
    marginHorizontal: width * 0.032,
  },
  headingContainer: {
    position: "absolute",
    bottom: 0,
    left: 12,
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
    width: width * 0.45,
    marginBottom: 10,
    // backgroundColor : "black",
  },

  sessionContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  session: {
    paddingHorizontal: 15,
  },
  bigSessionText: {
    fontSize: width * 0.03,
    fontFamily: "SFProDisplayThin",
    fontStyle: "normal",
    letterSpacing: 1,
    color: "#000000",
  },
  dateText: {
    fontSize: width * 0.066,
    fontFamily: "SFProDisplayMedium",
    letterSpacing: 0,
    textAlign: "center",
    color: "#9d0511",
  },
  timeText: {
    fontSize: width * 0.028,
    fontFamily: "SFProDisplayRegular",
    letterSpacing: 1,
    textAlign: "center",
    color: "#000000",
  },
  btmImageContainer: {
    backgroundColor: "white",
    marginLeft: 12,
    borderRadius: 8,
    marginTop: 13,
    marginBottom: 20,
    shadowOffset: {},
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  prepText: {
    fontFamily: "SFProDisplayMedium",
    color: colors.white,
    fontSize: 18,
    paddingLeft: width * 0.032,
    paddingBottom: width * 0.032,
    position: "absolute",
    bottom: 0,
    zIndex: 2,
  },
});
