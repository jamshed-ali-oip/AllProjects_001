import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { faker } from "@faker-js/faker";
import { Avatar } from "../components/ui";
import CustomHeader from "../components/common/CustomHeader";
import Screen from "../components/ui/Screen";
import colors from "../constants/colors";
import { useAuth } from "../context/Auth";
import routes from "../routes/routes";
import { getAllAttendees } from "../services/commonService";
import RBSheet from "react-native-raw-bottom-sheet";

const Height = Dimensions.get("screen").height;

const { width, height } = Dimensions.get("window");

const Attendees = ({ navigation }) => {
  const { signOut, authData } = useAuth();
  const [attendees, setAttendees] = useState([]);
  const refRBSheet = useRef();

  // viewDetail = () => {
  //   var item = authData.user;
  //   navigation.navigate(routes.ATTENDEES_DETAILS_SCREEN, {
  //     item,
  //   });
  // };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
      header: customHeaderComponent,
    });
  }, [navigation]);

  useEffect(() => {
    getAllAttendees(setAttendees);
  }, []);

  const sortData = (data) => {
    let contactsArr = [];
    let aCode = "A".charCodeAt(0);
    const attendees = data;
    for (let i = 0; i < 26; i++) {
      let currChar = String.fromCharCode(aCode + i);
      let obj = {
        title: currChar,
      };

      let currContacts = attendees.filter((item) => {
        return item.firstName[0].toUpperCase() === currChar;
      });

      if (currContacts.length > 0) {
        currContacts.sort((a, b) => a.firstName.localeCompare(b.firstName));

        obj.data = currContacts;
        contactsArr.push(obj);
      }
    }

    return contactsArr;
  };

  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  const renderLeaderItem = ({ item }) => {
    // console.log(item, '=======================')
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(routes.ATTENDEES_DETAILS_SCREEN, {
            item,
          })
        }
      >
        <View style={styles.itemRenderLeaderContainer}>
          <View style={styles.itemDetailsLeaderContainer}>
            <Text style={styles.leaderNo}>1</Text>
            <View style={styles.leaderRow}>
              <Avatar
                src={{
                  uri:
                    item.avatarUrl != null
                      ? item.avatarUrl
                      : faker.image.avatar(),
                }}
              />
              <View style={{ marginLeft: 15 }}>
                <Text style={styles.itemTitleLeaderText}>
                  {item.firstName + " " + item.lastName}
                </Text>
                <Text style={styles.itemSubtitleLeaderText}>
                  {item.jobTitle}
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={[
              styles.leaderText,
              {
                fontWeight: "500",
                marginRight: 15,
                fontSize: RFPercentage(1.7),
              },
            ]}
          >
            1291 pts
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(routes.ATTENDEES_DETAILS_SCREEN, {
          item,
        })
      }
    >
      {/* {console.log(item, '===========')} */}
      <View style={styles.itemRenderContainer}>
        <Avatar
          style={{ width: 47, height: 47 }}
          src={{
            uri:
              item?.avatarUrl != null && item?.avatarUrl != undefined
                ? item?.avatarUrl
                : faker.image.avatar(),
          }}
        />
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemTitleText}>
            {item.firstName + " " + item.lastName}
          </Text>
          {/* <Text style={styles.itemSubtitleText}>{item.jobTitle}</Text> */}
          <Text style={styles.itemSubtitleText}>Fitness Coach</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const customHeaderComponent = () => (
    <View style={styles.customHeaderContainer}>
      <Text style={styles.headerText}>ATTENDEES</Text>
      <View style={styles.headerRightContainer}>
        <Text style={styles.userProfileName}>
          Hey {authData.user.firstName}!
        </Text>
        <TouchableOpacity onPress={{}} style={{ marginLeft: 4 }}>
          <View style={styles.headerImageContainer}>
            <Image
              source={require("../images/agenda/image2.jpg")}
              style={styles.headerUserImage}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const Alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "#",
  ];

  const renderItemAlphabet = (item) => {
    return (
      <Text style={styles.alphabetLetter} key={item.index}>
        {item.item}
      </Text>
    );
  };

  return (
    <Screen style={styles.screenContainer}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0)" translucent={true} />

      <View style={styles.alphabetContainer}>
        <FlatList
          data={Alphabet}
          renderItem={renderItemAlphabet}
          keyExtractor={(item) => item}
          style={styles.sideAlphabets}
        />
      </View>

      <SectionList
        sections={sortData(attendees)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={renderSectionHeader}
        style={{ marginBottom: 50 }}
      />
      <TouchableOpacity
        onPress={() => refRBSheet.current.open()}
        activeOpacity={0.6}
        style={styles.footer}
      >
        <View style={styles.footerTapBar}></View>
        <Text style={styles.leaderText}>LEADER BOARD</Text>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={Height - 50}
          customStyles={{
            container: {
              backgroundColor: colors.primary,
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          <View style={styles.footerContainer}>
            <Text style={[styles.leaderText, { fontSize: RFPercentage(2.6) }]}>
              LEADER BOARD
            </Text>

            <View style={styles.leaderBoard}>
              <SectionList
                sections={sortData(attendees)}
                renderItem={renderLeaderItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </View>
        </RBSheet>
      </TouchableOpacity>
    </Screen>
  );
};

export default Attendees;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colors.white,
  },
  customHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: width * 0.03,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },

  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  userProfileName: {
    // fontWeight: "normal",
    // fontStyle: "normal",
    // letterSpacing: 0,
    // fontSize: 14,
    fontSize: width * 0.033,
    fontFamily: "SFProDisplayRegular",
    fontWeight: "400",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "rgb(96, 98, 106)",
    // color: "rgb(157, 5, 17)",
  },

  headerImageContainer: {
    borderRadius: 100,
    overflow: "hidden",
  },

  headerUserImage: {
    width: 24,
    height: 24,
  },

  headerText: {
    // fontWeight: "600",
    // fontSize: 18,
    // fontWeight: "600",
    // fontStyle: "normal",
    // letterSpacing: 0,
    // color: "rgb(157, 5, 17)",
    fontSize: width * 0.045,
    fontFamily: "SFProDisplaySemibold",
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "rgb(157, 5, 17)",
  },

  sectionHeaderContainer: {
    backgroundColor: "rgba(18, 19, 20, 0.33)",
    width: 304,
    height: 24,
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,
    // paddingLeft: 12,
    paddingLeft: width * 0.03,
    justifyContent: "center",
    marginTop: 0,
  },

  sectionHeaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0.57,
    opacity: 0.6,
  },

  itemRenderContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 9,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(243, 243, 243)",
    paddingVertical: 6,
  },

  itemDetailsContainer: {
    paddingLeft: 8,
  },

  itemTitleText: {
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: -0.5,
    color: "#333333",
  },
  itemSubtitleText: {
    fontSize: 10,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.29,
    color: "#b1babf",
  },

  footer: {
    backgroundColor: colors.primary,
    position: "absolute",
    width: "100%",
    alignSelf: "center",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 50,
  },

  footerTapBar: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: 4,
    width: 35,
    borderRadius: 10,
    marginBottom: 5,
  },

  leaderText: {
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#f1f1f1",
  },

  footerContainer: {
    flex: 1,
    marginVertical: 20,
  },

  itemRenderLeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "5%",
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey",
    marginVertical: 6,
    paddingVertical: 8,
  },
  itemDetailsLeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  leaderNo: {
    color: colors.white,
    fontSize: RFPercentage(2),
    fontWeight: "600",
    marginRight: 5,
  },
  leaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 15,
  },
  itemTitleLeaderText: {
    fontSize: RFPercentage(2),
    fontWeight: "600",
    color: colors.white,
  },
  leaderBoard: {
    paddingVertical: 40,
  },

  alphabetContainer: {
    position: "absolute",
    backgroundColor: "red",
    top: 0,
    right: 0,
    flex: 1,
    zIndex: 9,
    height: "93%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    // backgroundColor : 'red'
  },

  sideAlphabets: {
    height: 355,
    position: "absolute",
    right: 0,
    // bottom: Height * 0.17,
    // height: 355,
    width: 13,
    borderRadius: 7,
    backgroundColor: "rgba(18, 19, 20, 0.33)",
    zIndex: 9,
  },

  alphabetLetter: {
    fontSize: 11,
    fontWeight: "200",
    fontStyle: "normal",
    letterSpacing: 0.39,
    textAlign: "center",
    color: "#ffffff",
    lineHeight: 13,
  },
});
