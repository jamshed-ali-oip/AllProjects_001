import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Screen from "../components/ui/Screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import colors from "../constants/colors";
import routes from "../routes/routes";
import { useAuth } from "../context/Auth";
import Arrow from "../components/icons/Arrow";

const OnboardOrganic = ({ navigation }) => {
  const { signOut } = useAuth();

  return (
    <Screen style={styles.root} containerStyle={styles.wrapper}>
      <View style={styles.topContainer}>
        <Text style={styles.welcomeText}>&nbsp;WELCOME TO</Text>
        <Text style={styles.middle_Text}>SCALE UP</Text>
        <Text style={styles.SalesText}>3-DAY EVENT</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.threeLines}>
          <Text style={styles.newUserText}>LOOKS LIKE YOU'RE NEW HERE</Text>
          <Text style={styles.newUserText}>CLICK BELOW TO FIND OUT MORE</Text>
          <Text style={styles.newUserText}>ABOUT OUR EVENT AND REGISTER</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={styles.learnMoreBtn}
            onPress={() => navigation.navigate(routes.ONBOARDING_NAME_SCREEN)}
          >
            <Text style={styles.learnMoreTxt}>LEARN MORE</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.alreadyMemberButton}
          onPress={() => navigation.navigate(routes.SIGN_IN_SCREEN)}
        >
          <Text style={styles.alreadyMemberText}>
            ALREADY A MEMBER? SIGN IN
          </Text>
          <Arrow name="right" color="#a9535a" />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default OnboardOrganic;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#9d0510",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  topContainer: {
    paddingLeft: 36,
    flex: 2,
    justifyContent: "center",
  },
  threeLines: {
    marginRight: 15,
  },
  bottomContainer: {
    backgroundColor: colors.darkPrimary,
    width: "100%",
    flex: 1,
    // alignItems: 'center',
    justifyContent: "center",
    paddingHorizontal: "5%",
  },
  welcomeText: {
    fontFamily: "SFProDisplayMedium",
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#b0b0b2",
    marginVertical: 4,
  },
  middle_Text: {
    fontFamily: "SFProDisplaySemibold",
    fontSize: 54,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 54,
    letterSpacing: 0,
    color: "#ffffff",
    marginVertical: 2,
  },
  SalesText: {
    color: colors.white,
    marginTop: -5,
    fontFamily: "SFProDisplayThin",
    fontSize: 39,
  },
  text: {
    fontSize: RFPercentage(4),
    color: colors.lightGray,
    fontStyle: "normal",
    letterSpacing: 2,
    fontWeight: "100",
  },
  salesText: {
    color: colors.white,
    fontWeight: "bold",
    marginTop: -8,
    fontSize: RFPercentage(2),
  },
  newUserText: {
    fontFamily: "SFProDisplayMedium",
    fontSize: 19,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 30,
    letterSpacing: 0,
    textAlign: "right",
    color: "#ffffff",
    marginBottom: 5,
  },
  learnMoreTxt: {
    fontFamily: "SFProDisplaySemibold",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: -0.09,
    textAlign: "center",
    color: "#131415",
  },
  alreadyMemberText: {
    opacity: 0.53,
    fontFamily: "SFProDisplayRegular",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: -0.08,
    textAlign: "right",
    color: "#f1f1f1",
  },
  learnMoreBtn: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 24,
    marginTop: 20,
    marginBottom: 10,
    width: "90%",
  },
  alreadyMemberButton: {
    color: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  wrapper: {
    backgroundColor: colors.primary,
  },
});
