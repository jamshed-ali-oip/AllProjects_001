import React from "react";
import colors from "../../constants/colors";
import { Avatar } from "../ui";
import Arrow from "../icons/Arrow";
import Dot from "../icons/Dot";
import routes from "../../routes/routes";
import { TouchableOpacity } from "react-native-gesture-handler";
import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";


const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
const updateLocale = require("dayjs/plugin/updateLocale");
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  }
});

export function ChatItem({ item }) {
    const navigation = useNavigation();

  return (
      <View>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(routes.CHAT_ONE_ON_ONE_SCREEN_DETAILS, {
          attendees: item.users,
          conversationId: item.id
        })
      }
    >
      <View style={styles.conversationContainer}>
        <View style={styles.avatarContainer}>
          {item.users.length > 1 ? (
            <View
              style={{
                position: "relative"
              }}
            >
              <View style={styles.smallAvatarContainerTop}>
                <Avatar
                  src={{
                    uri: item.users[0]?.avatar
                  }}
                  size="small"
                />
              </View>
              <View style={styles.smallAvatarContainerBottom}>
                <Avatar
                  src={{
                    uri: item.users[1]?.avatar
                  }}
                  size="small"
                />
              </View>

              {item.users.length > 2 ? (
                <View style={styles.smallUsersCountContainer}>
                  <Text style={styles.count}>+{item.users.length - 2}</Text>
                </View>
              ) : null}
            </View>
          ) : (
            <Avatar
              src={{
                uri: item.users[0]?.avatar
              }}
            />
          )}
        </View>

        <View style={styles.messageContainer}>
          <View style={styles.nameContainer}>
            <Dot
              color={item.isActive ? colors.active : colors.gray}
              style={styles.dot}
            />
            {item.users.length === 1 ? (
              <Text style={styles.name}>{item.users[0].firstName}</Text>
            ) : null}
            {item.users.length === 2 ? (
              <Text
                style={styles.name}
              >{`${item.users[0].firstName} & ${item.users[1].firstName}`}</Text>
            ) : null}
            {item.users.length > 2 ? (
              <Text style={styles.name}>{`${item.users[0].firstName} & ${
                item.users[1].firstName
              } + ${item.users.length - 2}`}</Text>
            ) : null}
          </View>
          <View>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.time}>
            {dayjs(item.timestamp).from(dayjs(new Date()))}
          </Text>
        </View>

        <View style={styles.arrowContainer}>
          <TouchableOpacity>
            <Arrow size={12} colors={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    width: "18%",
    padding: 10,
    position: "relative",
    height: 70
  },
  conversationContainer: {
    flexDirection: "row",
    marginVertical: 10,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray
  },
  messageContainer: {
    flex: 1
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden"
  },
  name: {
    fontSize: RFPercentage(2.2),
    fontWeight: "bold"
  },
  message: {
    color: colors.darkGray,
    marginLeft: 18
  },
  dot: {
    margin: -15
  },
  timeContainer: {
    paddingTop: 5
  },
  time: {
    color: colors.darkGray
  },
  smallAvatarContainerTop: {
    position: "absolute",
    top: -10,
    right: -5
  },
  smallAvatarContainerBottom: {
    position: "absolute",
    top: 20,
    left: -10
  },
  count: {
    color: colors.darkGray
  },
  smallUsersCountContainer: {
    position: "absolute",
    top: 30,
    right: 0
  },
  arrowContainer: {
    justifyContent: "center"
  }
});
