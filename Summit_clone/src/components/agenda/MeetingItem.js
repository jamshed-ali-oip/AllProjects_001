import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { faker } from "@faker-js/faker";

import colors from "../../constants/colors";
import { Avatar, Chip } from "../ui";
import dayjs from "dayjs";
import { auth, db } from "../../firebase";
import * as Calendar from "expo-calendar";
import { handleSessionBookmark } from "../../services/agendaService";
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const MeetingItem = ({ item, bookmarkedSessions, events, calendarId }) => {
  const [updating, setUpdating] = useState(false);

  const dateObj = new Date(item.timestamp);
  const hour = dateObj.toTimeString().split(" ")[0].substring(0, 5);

  const currentTime = new Date("2021-09-08T11:20:00"); //TODO: change to current time

  const differenceMinutes = (currentTime - dateObj) / (1000 * 60);

  const bookmarked = bookmarkedSessions.some(
    (session) => session.id === item.id
  );

  return (
    <TouchableOpacity
      onPress={() =>
        handleSessionBookmark(
          item,
          bookmarkedSessions,
          events,
          calendarId,
          updating,
          setUpdating
        )
      }
    >
      <View style={styles.renderItemWrapper}>
        <View style={styles.renderItemLeftContainer}>
          <Chip title={item.expertiseLabel} />
          <Text style={styles.subtitle}>
            {dayjs(item.sessionTime).format("h:mm: A")}
          </Text>
        </View>
        <View style={styles.renderItemRightContainer}>
          <View>
            {/* <Avatar src={item?.imageSource} /> */}
            <Avatar src={{ uri: faker.image.avatar() }} />
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: "3%"
            }}
          >
            <Text numberOfLines={3} style={styles.title}>
              {item.sessionTitle}
            </Text>
            <Text numberOfLines={1} style={styles.subtitle}>
              {item.sessionHost}
            </Text>
          </View>
          <View>
            <MaterialIcons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={24}
              color={colors.darkGray}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MeetingItem;

const styles = StyleSheet.create({
  floater: {
    position: "absolute",
    height: 2,
    width: "100%",
    backgroundColor: colors.primary,
    marginTop: 1,
    zIndex: 10
  },
  renderItemWrapper: {
    marginVertical: "3%",
    width: "100%",
    flexDirection: "row"
  },
  renderItemLeftContainer: {
    alignItems: "center",
    borderRightWidth: 2,
    borderRightColor: colors.primary,
    justifyContent: "center",
    width: "25%",
    padding: "2%",
    position: "relative"
  },
  renderItemRightContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
    padding: "2%",
    height: 90
  },
  title: {
    fontSize: RFPercentage(2.2),
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: RFPercentage(1.6),
    color: colors.darkGray,
    marginTop: 5
  }
});
