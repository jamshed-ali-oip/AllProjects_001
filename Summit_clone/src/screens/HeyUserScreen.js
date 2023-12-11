import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Screen from "../components/ui/Screen";
import colors from "../constants/colors";
import routes from "../routes/routes";
import Arrow from "../components/icons/Arrow";
import { auth } from "../firebase";
import { useAuth, loadStorageData } from "../context/Auth";

const HeyUserScreen = ({ navigation }) => {
  const { authData, loading } = useAuth();

  console.log(authData);

  function handleSubmit() {
    navigation.navigate(routes.VERIFY_INFO_IF_USER, {
      user: authData.user,
    });
  }
  return (
    <Screen style={styles.root} containerStyle={styles.wrapper}>
      <View style={styles.topContainer}>
        <Text style={styles.middle_Text}>
          HEY, {"\n"}
          {authData && authData.user.firstName.toUpperCase()}!{" "}
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.arrowBack}
          ></TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.arrowForward}>
            <Text style={styles.nextText}>NEXT</Text>
            <Arrow name="right" color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

export default HeyUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  root: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  topContainer: {
    paddingLeft: 36,
    flex: 1.5,
    justifyContent: "flex-end",
    paddingBottom: "10%",
  },
  inputBox: {
    width: "90%",
    marginTop: 50,
  },
  input: {
    color: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPrimary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },

  arrow: {
    height: 13,
    width: 13,
  },

  arrowForward: {
    // padding: 13,
    // borderRadius: 40,
    marginTop: 20,
    marginBottom: 10,
    // width: '25%',
    flexDirection: "row",
    alignItems: "center",
  },
  nextText: {
    color: colors.white,
    marginRight: 5,
  },
  bottomContainer: {
    backgroundColor: colors.darkPrimary,
    width: "100%",
    flex: 1.5,
    paddingTop: 20,
    paddingLeft: "5%",
  },
  welcomText: {
    color: colors.white,
    fontWeight: "400",
    fontSize: RFPercentage(3),
  },
  middle_Text: {
    fontFamily: "SFProDisplayHeavy",
  fontSize: 54,
  fontWeight: "900",
  fontStyle: "normal",
  lineHeight: 54,
  letterSpacing: 0,
  color: "#ffffff",
  textAlign:"left"
    // fontSize: RFPercentage(7),
  },

  wrapper: {
    backgroundColor: colors.primary,
  },
});
