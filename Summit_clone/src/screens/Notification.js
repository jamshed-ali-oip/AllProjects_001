import React, { useLayoutEffect } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar, 
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { getNotifications } from "../api/actions";
import Svg, { G, Path, Circle, Ellipse } from "react-native-svg";
import CustomHeader from "../components/common/CustomHeader";
import Dot from "../components/icons/Dot";
import NotificationIcon from "../components/icons/NotificationIcon";
import Arrow from "../components/icons/Arrow";
import Screen from "../components/ui/Screen";
import colors from "../constants/colors";
import { EvilIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");
const Notification = ({ navigation }) => {
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
        <Text style={styles.headerText}>NOTIFICATIONS</Text>
      </View>
    </CustomHeader>
  );

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0)" translucent={true} />

        <View style={styles.itemContainer}>

          <View style={styles.iconContainer}>
            <Svg
              width="47"
              height="47"
              viewBox="0 0 47 47"
              xmlns="http://www.w3.org/2000/svg"
            >
              <G fill="none" fill-rule="evenodd">
                <Circle fill="#9D0511" cx="23.5" cy="23.5" r="23.5" />
                <G stroke="#FFF">
                  <Path d="M21.131 14.72c-2.006.26-4.783 1.84-5.892 4.183-.6 1.268-.6 2.726-.6 4.06 0 2.609-.509 3.189-1.341 4.387-.579.832-1.841 2.47-1.038 4.385.803 1.915 3.646 1.223 4.626 1.15 1.076-.079 16.274-2.039 17-2.268.724-.23 2.114-.535 2.114-2.464 0-1.93-1.596-2.454-3.478-4.035-1.375-1.155-1.375-1.956-2.2-4.314-.823-2.357-2.342-3.376-3.29-3.928-1.854-1.082-3.894-1.415-5.9-1.156z" />
                  <Path
                    d="M18.23 33.67c.789 1.748 2.157 2.513 4.104 2.293 1.947-.22 2.969-1.378 3.066-3.476M23.817 13.982c-.665-1.456-1.717-2.053-3.155-1.79-1.439.262-2.147 1.288-2.125 3.077"
                    stroke-linecap="square"
                  />
                </G>
              </G>
            </Svg>
          </View>

          <View style={styles.messageContainer}>
            <Text style={styles.message} numberOfLines={1}>
              {item.message}
            </Text>
            <View style={styles.timestampContainer}>
              {/* <Dot color={item.isUnread ? colors.active : colors.gray} /> */}
              <View
                style={{
                  height: 9,
                  width: 9,
                  backgroundColor: item.isUnread ? colors.active : colors.gray,
                  borderRadius: 30,
                  marginRight: 6,
                }}
              ></View>
              <Text
                style={styles.timestampText}
              >{`${item.timestamp}m ago`}</Text>
            </View>
          </View>

          <View style={styles.arrowContainer}>
            {/* <EvilIcons name="chevron-right" size={30} color={colors.gray} /> */}
            {/* <Arrow size={20} color={colors.gray} /> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen style={styles.screenContainer}>
      <FlatList
        data={getNotifications()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

export default Notification;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  customHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor : 'white',
    paddingTop : 50,
    paddingBottom : 18,
  },
  headerText: {
    // fontFamily: "SFProDisplaySemibold",
    // fontSize: 18,
    // fontWeight: "600",
    // fontStyle: "normal",
    // letterSpacing: 0,
    // color: "#9d0511",
    fontSize: width * 0.048,
    fontFamily: "SFProDisplaySemibold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "rgb(157, 5, 17)",
    // width : 131,
    // backgroundColor : 'yellow'
  },

  itemContainer: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: 6,
    borderBottomColor: "#f3f3f3",
    borderBottomWidth: 1,
    paddingHorizontal: width * 0.03,
    // paddingTop : 10,
    // alignItems: "center",
    // marginVertical: 5,
    borderStyle: "solid",
  },
  iconContainer: { },
  message: {
    fontSize: 16,
    fontFamily: "SFProDisplayMedium",
    fontStyle: "normal",
    letterSpacing: -0.5,
    color: "#333333",
  },
  timestampContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timestampText: {
    fontFamily: "SFProDisplayRegular",
    fontSize: 10,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.29,
    color: "#b1babf",
  },
  arrowContainer: {
    justifyContent: "center",
  },
  messageContainer: {
    // flex: 1,
    paddingHorizontal: 10,
    // backgroundColor : 'black',
    width: width * 0.75,
    paddingTop : 3
  },
});
