import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
const { height, width } = Dimensions.get("window");
export default function TrophyScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerContainer}
        >
          <Entypo name="chevron-small-left" size={width * 0.07} color="white" />
          <Text style={styles.headerTitle}>Setting</Text>
        </TouchableOpacity>
        <View style={{ marginTop: height * 0.1 }}>
          <TouchableOpacity onPress={()=>{navigation.navigate("MyReward")}} style={styles.box}>
            <Text style={{ color: "white", fontSize: 18 }}>My Rewards</Text>
            <Entypo
              name="chevron-small-right"
              size={width * 0.07}
              color="white"
              style={{ alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>{navigation.navigate("Badges")}} style={styles.box}>
            <Text style={{ color: "white", fontSize: 18 }}>Badges</Text>
            <Entypo
              name="chevron-small-right"
              size={width * 0.07}
              color="white"
              style={{ alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>{navigation.navigate("BlockedUser")}} style={styles.box}>
            <Text style={{ color: "white", fontSize: 18 }}>Blocked User</Text>
            <Entypo
              name="chevron-small-right"
              size={width * 0.07}
              color="white"
              style={{ alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate("Privacy")}} style={styles.box}>
            <Text style={{ color: "white", fontSize: 18 }}>Privacy</Text>
            <Entypo
              name="chevron-small-right"
              size={width * 0.07}
              color="white"
              style={{ alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate("ShareApp")}} style={styles.box}>
            <Text style={{ color: "white", fontSize: 18 }}>Share App</Text>
            <Entypo
              name="chevron-small-right"
              size={width * 0.07}
              color="white"
              style={{ alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate("Suggestion")}} style={styles.box}>
            <Text style={{ color: "white", fontSize: 18 }}>Suggestion</Text>
            <Entypo
              name="chevron-small-right"
              size={width * 0.07}
              color="white"
              style={{ alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate("ReportProblem")}} style={styles.box}>
            <Text style={{ color: "white", fontSize: 18 }}>Report Problem</Text>
            <Entypo
              name="chevron-small-right"
              size={width * 0.07}
              color="white"
              style={{ alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate("Tutorials")}} style={styles.box}>
            <Text style={{ color: "white", fontSize: 18 }}>Tutorial</Text>
            <Entypo 
              name="chevron-small-right"
              size={width * 0.07}
              color="white"
              style={{ alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate("TermsAndCondition")}} style={styles.box}>
            <Text style={{ color: "white", fontSize: 18 }}>Term and Condition</Text>
            <Entypo
              name="chevron-small-right"
              size={width * 0.07}
              color="white"
              style={{ alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate("ChangePassword")}} style={styles.box}>
            <Text style={{ color: "white", fontSize: 18 }}>Change Password</Text>
            <Entypo
              name="chevron-small-right"
              size={width * 0.07}
              color="white"
              style={{ alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{}} style={styles.box}>
            <Text style={{ color: "white", fontSize: 18 }}>Sign Out</Text>
            <Entypo
              name="chevron-small-right"
              size={width * 0.07}
              color="white"
              style={{ alignSelf: "flex-end" }}
            />
          </TouchableOpacity>
          
          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  headerContainer: {
    position: "relative",
    // paddingHorizontal: width * 0.010,
    // marginTop: 60,
    top: 30,
    left: 0,
    flexDirection: "row",
    // alignItems: "center",
    zIndex: 99,
    //  backgroundColor: "yellow",
    width: width * 0.25,
    justifyContent:"space-between"
    // backgroundColor: "yellow",
  },
  headerTitle: {
    fontSize: width * 0.05,
  
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff",

    alignSelf: "center",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    justifyContent: "space-between",
    marginRight: 10,
    marginVertical:10
  },
});
