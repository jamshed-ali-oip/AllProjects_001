import React from "react";
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
import { Formik } from "formik";
import * as Yup from "yup";

import Screen from "../components/ui/Screen";
import colors from "../constants/colors";
import routes from "../routes/routes";
import Arrow from "../components/icons/Arrow";

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(1, "Firstname too short")
    .required("Required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
  lastname: Yup.string()
    .min(1, "Lastname too short")
    .required("Required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
});

const OnboardNameScreen = ({ navigation }) => {
  return (
    <Screen style={styles.root} containerStyle={styles.wrapper}>
      <View style={styles.topContainer}>
        <Text style={styles.middle_Text}>WHAT IS{"\n"}YOUR NAME?</Text>
      </View>
      <Formik
        initialValues={{ firstname: "", lastname: "" }}
        validationSchema={validationSchema}
        onSubmit={(user) =>
          navigation.navigate(routes.ONBOARDING_PHONENUMBER_SCREEN, { user })
        }
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.bottomContainer}>
            <View style={styles.inputBox}>
              <TextInput
                placeholder={"First"}
                placeholderTextColor={colors.placeholder}
                style={styles.input}
                onChangeText={handleChange("firstname")}
                onBlur={handleBlur("firstname")}
                value={values.firstname}
              />
            {touched.firstname && errors.firstname && (
              <Text style={styles.errMessage}>{errors.firstname}</Text>
            )}
            </View>
            <View style={styles.inputBox}>
              <TextInput
                placeholder={"Last"}
                placeholderTextColor={colors.placeholder}
                style={styles.input}
                onChangeText={handleChange("lastname")}
                onBlur={handleBlur("lastname")}
                value={values.lastname}
                onSubmitEditing={handleSubmit}
              />
            {touched.lastname && errors.lastname && (
              <Text style={styles.errMessage}>{errors.lastname}</Text>
            )}
            </View>

            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.arrowBack}
              >
                <Arrow name="left" color={colors.white} />
                <Text style={styles.backText}>BACK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.arrowForward}
                disabled={values.firstname === "" || values.lastname === ""}
              >
                <Text
                  style={[
                    styles.nextText,
                    {
                      color:
                        values.firstname !== "" && values.lastname !== ""
                          ? colors.white
                          : colors.darkGray,
                    },
                  ]}
                >
                  NEXT
                </Text>
                <Arrow
                  name="right"
                  color={
                    values.firstname !== "" && values.lastname !== ""
                      ? colors.white
                      : colors.darkGray
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </Screen>
  );
};

export default OnboardNameScreen;

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
    paddingLeft: "5%",
    flex: 2,
    justifyContent: "center",
  },
  inputBox: {
    width: '85%',
    marginTop: 50,
    alignSelf:"center"
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPrimary,
    fontFamily: "SFProDisplayRegular",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.09,
    color: "#ffffff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  backText: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: "SFProDisplayRegular",
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: -0.08,
    color: "#f1f1f1",
  },
  arrow: {
    height: 13,
    width: 13,
  },
  arrowBack: {
    // padding: 13,
    borderRadius: 40,
    marginTop: 20,
    marginBottom: 10,
    width: "25%",
    flexDirection: "row",
    alignItems: "center",
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
    marginRight: 5,
    fontFamily: "SFProDisplayRegular",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: -0.08,
    color: "#f1f1f1",
  },
  bottomContainer: {
    backgroundColor: colors.darkPrimary,
    width: "100%",
    flex: 2.5,
    paddingTop: 20,
  },
  welcomText: {
    color: colors.white,
    fontWeight: "400",
    fontSize: RFPercentage(3),
  },
  middle_Text: {
    fontSize: 36,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 45,
    letterSpacing: 0,
    color: "#ffffff",
    fontFamily: "SFProDisplaySemibold",
  },
  SalesText: {
    color: colors.lightGray,
    fontWeight: "400",
    marginTop: -8,
    fontSize: RFPercentage(2),
  },
  newUserText: {
    color: colors.white,
    fontWeight: "600",
    textAlign: "right",
    fontSize: RFPercentage(2.2),
  },
  learnMoreText: {
    textAlign: "center",
    fontSize: RFPercentage(2),
    fontWeight: "600",
  },
  alreadyMemberText: {
    fontSize: RFPercentage(1.8),
    fontWeight: "bold",
    color: "#ad5960",
  },
  learnMoreButton: {
    backgroundColor: "white",
    padding: 13,
    borderRadius: 40,
    marginTop: 20,
    marginBottom: 10,
    width: "80%",
  },
  alreadyMemberButton: {
    color: "lightgray",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  errMessage: {
    marginTop: 5,
    color: colors.white,
  },
  wrapper: {
    backgroundColor: colors.primary,
  },
});
