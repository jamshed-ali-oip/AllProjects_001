import React, { useLayoutEffect } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Screen from "../components/ui/Screen";
import colors from "../constants/colors";
import CustomHeader from "../components/common/CustomHeader";
import { RFPercentage } from "react-native-responsive-fontsize";
import CoachesList from "../components/chat/CoachesList";
import ActiveUnactiveUser from "../components/chat/ActiveUnactiveUser";
import Conversations from "../components/chat/ChatSections";
import routes from "../routes/routes";
import Svg, { G, Path } from "react-native-svg";
import LiveProfile from "../components/chat/LiveProfile";

const { width, height } = Dimensions.get("window");

const iconimage = require("../images/agenda/image2.jpg");

const Chat = ({ navigation }) => {
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
    <View style={styles.customHeaderContainer}>
      <Text style={styles.headerText}>CHAT</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.NEW_CHAT_SCREEN)}
      >
        <Svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="m11.738 4.132-.783.783H.783v13.302h13.302V8.045l.783-.783V19H0V4.132h11.738zm2.815-2.045.786.787-7.473 7.473-.393 1.18 1.18-.393 7.473-7.473.787.786-7.867 7.867L5.9 13.1l1.18-3.54 7.473-7.473zM15.59 1.05a.748.748 0 0 1 1.059-.011l1.312 1.312a.749.749 0 0 1-.01 1.059l-.646.645-2.36-2.36z"
            fill="#9D0511"
            fill-rule="evenodd"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );

  const data = [
    {
      id: 0,
      image: require("../images/agenda/image2.jpg"),
      title: "Enyinnaya Chinedu",
      desp: "Science, Technology & Engineering Our mission is to empower every person… ",
      isOnline: true,
      timing: "22m ago",
    },
    {
      id: 1,
      image: require("../images/agenda/image2.jpg"),
      title: "Chikelu & Obasea",
      desp: "Our mission is to empower every person.",
      isOnline: false,
      timing: "24m ago",
    },
    {
      id: 2,
      image: require("../images/agenda/image2.jpg"),
      title: "James & Eva +5",
      desp: "Our mission is to empower every person.",
      isOnline: true,
      timing: "25m ago",
    },
    {
      id: 3,
      image: require("../images/agenda/image2.jpg"),
      title: "Jioke Ugoorji",
      desp: "Science, Technology & Engineering Our mission is to empower every person…",
      isOnline: true,
      timing: "25m ago",
    },
    {
      id: 4,
      image: require("../images/agenda/image2.jpg"),
      title: "Enyinnaya Chinedu",
      desp: "Science, Technology & Engineering Our mission is to empower every person… ",
      isOnline: true,
      timing: "22m ago",
    },
    {
      id: 5,
      image: require("../images/agenda/image2.jpg"),
      title: "Chikelu & Obasea",
      desp: "Our mission is to empower every person.",
      isOnline: false,
      timing: "24m ago",
    },
    {
      id: 6,
      image: require("../images/agenda/image2.jpg"),
      title: "James & Eva +5",
      desp: "Our mission is to empower every person.",
      isOnline: true,
      timing: "25m ago",
    },
    {
      id: 7,
      image: require("../images/agenda/image2.jpg"),
      title: "Jioke Ugoorji",
      desp: "Science, Technology & Engineering Our mission is to empower every person…",
      isOnline: true,
      timing: "25m ago",
    },
  ];

  const uiItems = ({ item }) => (
    <View style={styles.accordian_inner} key={item.index}>
      <Image source={item.image} style={styles.user_image} />
      <View style={styles.accordian_content}>
        <View style={styles.userTitle}>
          <View
            style={
              item.isOnline
                ? [styles.active, { backgroundColor: "#2fcf00" }]
                : [styles.active, { backgroundColor: "#dfe3e7" }]
            }
          ></View>
          <Text style={styles.username}>{item.title}</Text>
          <Text style={styles.chatTime}>{item.timing}</Text>
        </View>
        <Text style={styles.accordian_desp}>{item.desp}</Text>
      </View>
      <View style={styles.accordian_icon}>
        <Svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M.6 10.6 2 12l6-6-6-6L.6 1.4 5.2 6z"
            fill="#DFE3E7"
            fill-rule="evenodd"
          />
        </Svg>
      </View>
    </View>
  );

  return (
    <View style={[styles.screenContainer]}>
      <StatusBar backgroundColor="rgba(0, 0, 0, .3)" translucent={true} />
      <Text style={styles.userName}>Profit Coaches</Text>
      <ActiveUnactiveUser />
      <Text style={[styles.userName, { marginBottom: 10 }]}>Group Chat</Text>
      <LiveProfile />
      <Text style={[styles.userName, { marginTop: 16, marginBottom: 12 }]}>
        Conversations
      </Text>
      <FlatList
        data={data}
        renderItem={uiItems}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.floatButton}>
        <Svg
          // style={{ paddingBottom: 30, backgroundColor : "green" }}
          width="40"
          height="30"
          viewBox="0 0 40 30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <G stroke="#FFF" fill="none" fill-rule="evenodd">
            <Path fill="#FFF" d="M1 28.845h38v-3.931H1z" />
            <Path d="M7.552 24.914h24.896v-2.62H7.552z" />
            <Path
              d="M2.31 22.293C2.31 12.162 9.868 3.948 20 3.948c10.132 0 17.69 8.214 17.69 18.345H2.31z"
              fill="#FFF"
            />
            <Path d="M20 3.948v-2.62M16.724 1.328h6.552" />
          </G>
        </Svg>
        <View style={styles.counter}>
          <Text style={styles.textCount}>12</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  customHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: height * 0.07,
    paddingHorizontal: width * 0.03,
    backgroundColor: "#fff",
    paddingBottom: 12,
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

  screenContainer: {
    // paddingHorizontal: width * 0.03,
    // paddingTop: height * 0.017,
    backgroundColor: "white",
    flex: 1,
  },

  userName: {
    fontSize: width * 0.043,
    fontFamily: "SFProDisplay",
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.5,
    color: "#333333",
    paddingHorizontal: width * 0.03,
  },

  accordian: {
    alignItems: "center",
    marginTop: 5,
    // backgroundColor : "blue"
  },

  accordian_inner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.03,
    borderBottomColor: "rgba(243, 243, 243, .7)",
    borderBottomWidth: 1,
    paddingVertical: 6,
    // backgroundColor : "black"
  },
  user_image: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: 100,
  },
  accordian_content: {
    flex: 1,
    paddingLeft: width * 0.001,
    alignItems: "flex-start",
  },
  accordian_title: {
    fontSize: width * 0.04,
    paddingLeft: width * 0.03,
    color: "white",
    fontFamily: "SFPro-regular",
  },
  accordian_desp: {
    // fontSize: width * 0.028,
    marginLeft: width * 0.035,
    color: "rgb(151, 151, 151)",
    fontSize: width * 0.032,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 14,
    letterSpacing: -0.07,
    color: "#979797",
    marginTop: 2,
    width: width * 0.65,
    // backgroundColor : "yellow"
  },
  userTitle: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: width * 0.035,
  },
  active: {
    height: 9,
    width: 9,
    borderRadius: 30,
    marginRight: width * 0.01,
    backgroundColor: "#2fcf00",
    position: "absolute",
    // left : -13,
    top: 2,
    // marginTop : width * 0.01
  },
  username: {
    fontSize: width * 0.044,
    fontFamily: "SFProDisplayMedium",
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: -0.5,
    lineHeight: width * 0.044,
    color: "#333333",
    // backgroundColor : "black"
  },
  chatTime: {
    // fontSize: width * 0.044,
    fontFamily: "SFProDisplayRegular",
    fontSize: width * 0.028,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0.29,
    textAlign: "right",
    color: "#b1babf",
    marginLeft: "auto",
    // backgroundColor : "black",
    flex: 1,
  },
  accordian_icon: {
    marginLeft: 10,
  },

  floatButton: {
    backgroundColor: "rgb( 157, 5, 17)",
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 15,
    right: 15,
    shadowColor: "rgba(131, 134, 163, 0.12)",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
  },

  counter: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgb( 157, 5, 17)",
    height: 19,
    width: 19,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
  },

  textCount: {
    fontFamily: "SFProDisplaySemibold",
    fontSize: 10,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0.11,
    textAlign: "center",
    color: "#f1f1f1",
    lineHeight: 19,
  },
});

// import React, { useLayoutEffect } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { Feather } from '@expo/vector-icons';
// import Screen from '../components/ui/Screen';
// import colors from '../constants/colors';
// import CustomHeader from '../components/common/CustomHeader';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import CoachesList from '../components/chat/CoachesList';
// import Conversations from '../components/chat/ChatSections';
// import routes from '../routes/routes';
// const Chat = ({ navigation }) => {

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerStyle: {
//         elevation: 0,
//         shadowOpacity: 0,
//       },
//       header: customHeaderComponent,
//     });
//   }, [navigation]);

//   const customHeaderComponent = () => (
//     <CustomHeader>
//       <View style={styles.customHeaderContainer}>
//         <Text style={styles.headerText}>CHAT</Text>
//         <TouchableOpacity
//           onPress={() => navigation.navigate(routes.NEW_CHAT_SCREEN)}
//         >
//           <Feather name="edit" size={24} color={colors.primary} />
//         </TouchableOpacity>
//       </View>
//     </CustomHeader>
//   );

//   return (
//     <Screen style={styles.screenContainer}>
//       <View style={styles.coachesListContainer}>
//         <CoachesList />
//       </View>
//       <View style={styles.conversationContainer} onStartShouldSetResponder={() => true}>
//         <Conversations/>
//       </View>
//     </Screen>
//   );
// };

// export default Chat;

// const styles = StyleSheet.create({
//   customHeaderContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   headerText: {
//     color: colors.primary,
//     fontSize: RFPercentage(2.5),
//     fontWeight: 'bold',
//   },

//   screenContainer: {
//     flex: 1,
//     backgroundColor: colors.white,
//     paddingHorizontal: '5%',
//   },

//   coachesListContainer: {
//     height: 120,
//   },
//   conversationContainer: {
//     // flex: 3,
//   },
// });
