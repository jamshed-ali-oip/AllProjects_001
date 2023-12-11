import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  RefreshControl,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import dayjs from "dayjs";

import Screen from "../components/ui/Screen";
import colors from "../constants/colors";
import { RFPercentage } from "react-native-responsive-fontsize";
import CalendarWeek from "../components/agenda/CalendarWeek";
import MeetingItem from "../components/agenda/MeetingItem";
import EmptyMeetingItem from "../components/agenda/EmptyMeetingItem";
import CustomHeader from "../components/common/CustomHeader";

import LoadingScreen from "../components/ui/LoadingScreen";
import { auth, db } from "../firebase";

import Svg, { G, Path } from "react-native-svg";

import {
  checkCalendar,
  getAllEvents,
  getUsersSessions,
} from "../services/agendaService";

const { width, height } = Dimensions.get("window");

const AgendaScreen = ({ navigation }) => {
  const today = dayjs().format("YYYY-MM-DDT00:00:00.000") + "Z";
  const [events, setEvents] = useState([]);
  const [month, setMonth] = useState(dayjs().format("MMMM"));
  const [selectedDate, setSelectedDate] = useState(today);
  const [meeting, setMeeting] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookmarkedSessions, setBookmarkedSessions] = useState([]);
  const [calendarId, setCalendarId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const emptyEvent = [{ id: 1 }];

  useEffect(() => {
    checkCalendar(setCalendarId);
    const usersSessionsListener = getUsersSessions(setBookmarkedSessions);
    return () => {
      return () =>
        db
          .ref("UsersSessions/" + auth.currentUser.uid)
          .off("value", usersSessionsListener);
    };
  }, []);

  useEffect(() => {
    getAllEvents(setEvents, setLoading);
  }, [refresh]);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitleStyle: {
  //       color: "rgb(157, 5, 17)",
  //     },
  //     headerStyle: {
  //       elevation: 0,
  //       shadowOpacity: 0,
  //     },
  //     header: customHeaderComponent,
  //   });
  // }, [navigation, month]);

  useEffect(() => {
    if (selectedDate <= today && events.length !== 0) {
      // console.log("This is the first event ", dayjs(events[0].date, "YYYY-MM-DD"))
      // console.log("This is the today event ", dayjs())

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
      console.log("These are the sorted events ", sortedEvents);
      if (sortedEvents.length > 0) {
        setSelectedDate(
          dayjs(sortedEvents[0]?.date).format("YYYY-MM-DDT00:00:00.000") + "Z"
        );
      }
    }
  }, [events]);

  useEffect(() => {
    if (events != null && selectedDate) {
      // console.log("These are the events ", events);
      // console.log("This is the selectedDate ", selectedDate);

      const data = events.filter((item) => {
        return (
          dayjs(item.date).format("YYYY-MM-DDT00:00:00.000") + "Z" ===
          selectedDate
        );
      });
      if (data.length > 0) {
        let allSessions = [];
        data.forEach((item) => {
          allSessions = [...allSessions, ...item.sessions];
        });
        const sortedSessions = allSessions.sort((a, b) => {
          return (
            dayjs(b.sessionTime, "YYYY-MM-DD HH:mm") -
            dayjs(a.sessionTime, "YYYY-MM-DD HH:mm")
          );
        });
        setMeeting(sortedSessions);
      } else {
        setMeeting([]);
      }
    }
  }, [events, selectedDate]);

  useEffect(() => {
    if (selectedDate) {
      setMonth(dayjs(selectedDate).format("MMMM").toUpperCase());
    }
  }, [selectedDate]);

  const customHeaderComponent = () => (
    <View style={styles.customHeaderContainer}>
      <Text style={styles.headerText}>{month}</Text>
      <TouchableOpacity onPress={() => {}}>
        <Svg
          width="20"
          height="19"
          viewBox="0 0 20 19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <G stroke="#9D0511" fill="none" fill-rule="evenodd">
            <Path d="M13.273 1.636h4.09c.904 0 1.637.733 1.637 1.637v13.09c0 .904-.733 1.637-1.636 1.637H2.636A1.636 1.636 0 0 1 1 16.364V3.273c0-.904.733-1.637 1.636-1.637h4.091M10 0v10.636" />
            <Path
              stroke-linecap="square"
              d="m10 10.636 4.091-4.091M10 10.636 5.909 6.545"
            />
          </G>
        </Svg>
      </TouchableOpacity>
    </View>
  );

  if (loading) return <LoadingScreen />;

  return (
    <Screen style={styles.container} containerStyle={styles.wrapper}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0)" translucent={true} />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerContainer}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headerTitle}>HOME</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <G stroke="#9D0511" fill="none" fill-rule="evenodd">
              <Path d="M13.273 1.636h4.09c.904 0 1.637.733 1.637 1.637v13.09c0 .904-.733 1.637-1.636 1.637H2.636A1.636 1.636 0 0 1 1 16.364V3.273c0-.904.733-1.637 1.636-1.637h4.091M10 0v10.636" />
              <Path
                stroke-linecap="square"
                d="m10 10.636 4.091-4.091M10 10.636 5.909 6.545"
              />
            </G>
          </Svg>
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.calendarContainer}>
        <View style={styles.calenderItemContainer}>
          <Text style={styles.deselectdayOfWeek}>W</Text>
          <TouchableOpacity>
            <View style={styles.deselectedContainer}>
              <View style={styles.deselectedDayItemContainer}>
                <Text style={styles.deselectedDateDay}>6</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.calenderItemContainer}>
          <Text style={styles.dayOfWeek}>T</Text>
          <TouchableOpacity>
            <View style={styles.dayContainer}>
              <View style={styles.dayItemContainer}>
                <Text style={styles.dateDay}>7</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.calenderItemContainer}>
          <Text style={styles.dayOfWeek}>F</Text>
          <TouchableOpacity>
            <View style={styles.dayContainer}>
              <View style={styles.dayItemContainer}>
                <Text style={styles.dateDay}>8</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.calenderItemContainer}>
          <Text style={styles.dayOfWeek}>S</Text>
          <TouchableOpacity>
            <View style={styles.selectedDayContainer}>
              <View style={styles.selectedDayItemContainer}>
                <Text style={styles.selectedDateDay}>9</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.calenderItemContainer}>
          <Text style={styles.dayOfWeek}>S</Text>
          <TouchableOpacity>
            <View style={styles.dayContainer}>
              <View style={styles.dayItemContainer}>
                <Text style={styles.dateDay}>10</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.calenderItemContainer}>
          <Text style={styles.dayOfWeek}>M</Text>
          <TouchableOpacity>
            <View style={styles.dayContainer}>
              <View style={styles.dayItemContainer}>
                <Text style={styles.dateDay}>11</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.calenderItemContainer}>
          <Text style={styles.deselectdayOfWeek}>T</Text>
          <TouchableOpacity>
            <View style={styles.deselectedContainer}>
              <View style={styles.deselectedDayItemContainer}>
                <Text style={styles.deselectedDateDay}>12</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.flatListContainer}>
        {/* {meeting.length > 0 ? (
         <FlatList
          data={meeting}
          renderItem={(props) => (
            <MeetingItem
              {...props}
              bookmarkedSessions={bookmarkedSessions}
              calendarId={calendarId}
              events={events}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={() => setRefresh(!refresh)}
          refreshing={loading}
          refreshControl={
            <RefreshControl
              refresh control used for the Pull to Refresh
              onRefresh={() => setRefresh(!refresh)}
              refreshing={loading}
              colors={['rgb(157, 5, 17)']}
            />
          }
          ListEmptyComponent={<EmptyMeetingItem selectedDate={selectedDate} />}
        />  */}
        <FlatList
          ListEmptyComponent={<EmptyMeetingItem selectedDate={selectedDate} />}
        />
        {/* ) : (
          <EmptyMeetingItem selectedDate={selectedDate} />
        )} */}
        <View style={styles.vipLockContainer}>
          <View style={styles.vipLockContainerInner}>
            <View style={styles.vipLock}>
              <Svg
                width="19"
                height="22"
                viewBox="0 0 19 22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <G stroke="#FFF" fill="none" fill-rule="evenodd">
                  <Path d="M1 10.091h17v7.273H1z" />
                  <Path d="M3.833 6.455C3.833 3.442 6.37 1 9.5 1s5.667 2.442 5.667 5.455v3.636H3.833V6.455zM1 17.364h17V21H1zM7.611 10.091 1 16.455M13.278 10.091l-7.556 7.273M18 11l-6.611 6.364" />
                </G>
              </Svg>
              <Text style={styles.vipText}>VIP ONLY</Text>
            </View>
            <View style={styles.joinUnlockContainer}>
              <TouchableOpacity style={styles.joinUnlockButton}>
                <Text style={styles.joinUnlockText}>JOIN & UNLOCK NOW</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default AgendaScreen;

const styles = StyleSheet.create({

  headerContainer: {
    // position: "absolute",
    paddingHorizontal : width * 0.032,
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // zIndex: 3,
    // top: 50,
    width: width * 1,
    // backgroundColor: "black",
  },

  headerTitle: {
    fontSize: width * 0.05,
    fontFamily: "SFProDisplaySemibold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "rgba(157, 5, 17, 1)",
    // left: width * -0.015,
    // top: .5,
  },



  container: {
    flex: 1,
    backgroundColor: "white",
  },

  flatListContainer: {
    backgroundColor: "white",
    flex: 5,
  },

  customHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: width * 0.03,
    backgroundColor: "#fff",
  },

  // anotherDate: {
  //   color: colors.darkGray,
  //   fontSize: RFPercentage(1.5),
  //   fontWeight: "normal",
  // },
  // noEvents: {
  //   color: 'rgb(157, 5, 17)',
  //   fontSize: RFPercentage(2.5),
  //   fontWeight: "bold",
  //   // marginTop: 50,
  //   // marginStart: 150,
  // },

  headerText: {
    fontSize: width * 0.045,
    fontFamily: "SFProDisplaySemibold",
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "rgb(157, 5, 17)",
    // backgroundColor : 'blue'
  },
  subHeaderText: {
    // color: colors.darkGray,
    // fontSize: RFPercentage(1.8),
    // textAlign: "center",
    // backgroundColor : 'blue'
  },
  noEventsMessae: {
    // flex: 1,
    // backgroundColor: "white",
    // justifyContent: "center",
    // alignItems: "center",
  },

  //

  calendarContainer: {
    // paddingTop: height * 0.01,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    paddingBottom: height * 0.017,
    marginBottom: height * 0.017,
    paddingTop: height * 0.02,
    // backgroundColor: "#000",
    backgroundColor: "#fff",
    shadowColor: "rgba(131, 134, 163, 0.12)",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 10,
    zIndex: 1,
  },

  calenderItemContainer: {
    width: width * 0.14,
    alignItems: "center",
    justifyContent: "center",
    // width: 54,
    // backgroundColor : 'red'
  },

  dayOfWeek: {
    // fontSize: width * 0.035,
    // marginBottom: height * 0.015,
    // backgroundColor : 'yellow',
    color: "rgb(157, 5, 17)",
    fontSize: width * 0.03,
    fontFamily: "SFProDisplaySemibold",
    fontWeight: "600",
    fontStyle: "normal",
    height: height * 0.035,
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    paddingVertical: height * 0.005,
  },

  deselectdayOfWeek: {
    color: "rgb(216, 216, 216)",
    fontSize: width * 0.03,
    fontFamily: "SFProDisplaySemibold",
    fontWeight: "600",
    fontStyle: "normal",
    height: height * 0.035,
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    paddingVertical: height * 0.005,
  },

  selectedDayContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.14,
    height: width * 0.12,
    paddingHorizontal: width * 0.03,
    paddingTop: width * 0.02,
    paddingBottom: width * 0.02,
    // backgroundColor : 'yellow'
  },

  selectedDayItemContainer: {
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    backgroundColor: "rgb(157, 5, 17)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },

  selectedDateDay: {
    fontSize: width * 0.03,
    fontFamily: "SFProDisplaySemibold",
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "white",
  },

  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.14,
    height: width * 0.12,
    paddingHorizontal: width * 0.028,
    paddingTop: width * 0.02,
    paddingBottom: width * 0.02,
  },

  dayItemContainer: {
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },

  dateDay: {
    fontSize: width * 0.03,
    fontFamily: "SFProDisplaySemibold",
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "rgb(51, 51 ,51)",
  },

  deselectedContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.14,
    height: width * 0.12,
    paddingHorizontal: width * 0.028,
    paddingTop: width * 0.02,
    paddingBottom: width * 0.02,
  },

  deselectedDayItemContainer: {
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },

  deselectedDateDay: {
    fontSize: width * 0.03,
    fontFamily: "SFProDisplaySemibold",
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "rgb(216, 216, 216)",
    // backgroundColor : 'yellow'
  },

  vipLockContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: width * 0.05,
    // paddingHorizontal :  width * 0.03,
    // backgroundColor : 'yellow',
  },

  vipLockContainerInner: {
    width: width * 0.9,
    borderRadius: 8,
    backgroundColor: "rgba(157, 5, 17, .9)",
    paddingVertical: 24,
  },
  vipLock: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  vipText: {
    fontSize: 16,
    fontFamily: "SFProDisplayRegular",
    letterSpacing: -0.09,
    color: "#ffffff",
    marginLeft: 12,
  },
  joinUnlockContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  joinUnlockButton: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    width: 220,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  joinUnlockText: {
    fontFamily: "SFProDisplaySemibold",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: -0.09,
    color: "#131415",
  },
});
