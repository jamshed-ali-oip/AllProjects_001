import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Formik, setFieldError } from "formik";
import Arrow from "../components/icons/Arrow";
import Screen from "../components/ui/Screen";
import colors from "../constants/colors";
import routes from "../routes/routes";
import { useAuth } from "../context/Auth";
import SubmitButton from "../components/ui/SubmitButton";
import { Ionicons } from "@expo/vector-icons";
import * as Yup from "yup";



const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const signInvalidationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegex, "Must be a valid email")
      .required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });



const SignInScreen = ({ navigation }) => {
  const {
    signIn,
    loginCredentials: { loginError, email, password }
  } = useAuth();

  const [iconName, setIconName] = useState("eye-off-outline");

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const changeIcon = () => {
    if (iconName === "eye-off-outline") setIconName("eye-outline");
    else if (iconName === "eye-outline") setIconName("eye-off-outline");
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSignIn = async (user) => {
    const res = await signIn(user.email, user.password);
    if (res.emailError) {
      setFieldError({ email: res.emailError });
    }
  };

  return (
    <Screen style={styles.root} containerStyle={styles.wrapper}>
      <View style={styles.topContainer}>
        <Text style={styles.middle_Text}>SIGN IN</Text>
      </View>
      <Formik
        initialValues={{ email: email, password: password }}
        validationSchema={signInvalidationSchema}
        onSubmit={handleSignIn}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched
        }) => (
          <View style={styles.bottomContainer}>
            <View style={styles.inputBox}>
              <TextInput
                placeholder={"Email"}
                placeholderTextColor={colors.placeholder}
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                autoCapitalize="none"
              />
            </View>
            {touched.email && errors.email && (
              <Text style={styles.errMessage}>{errors.email}</Text>
            )}
            <View style={styles.inputBox}>
              <TextInput
                placeholder={"Password"}
                placeholderTextColor={colors.placeholder}
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                onSubmitEditing={handleSubmit}
                secureTextEntry={iconName === "eye-off-outline" ? true : false}
              />
              <View style={styles.iconContainer}>
                <Ionicons
                  onPress={changeIcon}
                  name={iconName}
                  size={20}
                  color={colors.placeholder}
                />
              </View>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errMessage}>{errors.password}</Text>
            )}

            {console.log(values)}

            <View style={styles.submitButtonContainer}>
              <SubmitButton
                title="SIGN IN"
                onPress={handleSubmit}
                disabled={values.password === "" || values.email === ""}
              />
              <TouchableOpacity style={styles.alreadyMemberButton}>
                <Text style={styles.alreadyMemberText}>
                  FORGOT PASSWORD? RESET
                </Text>
                <Arrow name="right" color="#a9535a" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      {!isKeyboardVisible && loginError ? (
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              if (loginError) {
                navigation.navigate(routes.ONBOARDING_ORGANIC_SCREEN);
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: routes.ONBOARDING_ORGANIC_SCREEN }]
                });
              }
            }}
            style={styles.arrowBack}
          >
            <Arrow name="left" color={colors.white} />
            <Text style={styles.backText}>BACK</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </Screen>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  root: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  topContainer: {
    paddingLeft: 36,
    flex: 1.5,
    justifyContent: "center"
  },
  inputBox: {
    width: "90%",
    borderBottomWidth: 0.6,
    borderBottomColor: colors.lightPrimary,
    marginTop: 50,
    position: "relative"
  },
  input: {
    color: colors.white,
    borderBottomWidth: 0.1,
    fontSize: 16,
    borderBottomColor: colors.white,
    borderStyle: "solid",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.09,
    fontFamily: "SFProDisplayRegular"
  },
  bottomContainer: {
    backgroundColor: colors.darkPrimary,
    width: "100%",
    flex: 2.5,
    paddingTop: 20,
    paddingLeft: 36
  },
  welcomText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: RFPercentage(3)
  },
  middle_Text: {
    color: colors.white,
    fontFamily: "SFProDisplaySemibold",
    fontSize: 36,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 45,
    letterSpacing: 0
  },
  SalesText: {
    color: colors.lightGray,
    fontWeight: "400",
    marginTop: -8,
    fontSize: RFPercentage(2)
  },
  newUserText: {
    color: colors.white,
    fontWeight: "600",
    textAlign: "right",
    fontSize: RFPercentage(2.2)
  },
  learnMoreText: {
    textAlign: "center",
    fontSize: RFPercentage(2),
    fontWeight: "600"
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
    color: colors.white
  },
  learnMoreButton: {
    backgroundColor: "white",
    padding: 13,
    borderRadius: 40,
    marginTop: 20,
    marginBottom: 10,
    width: "80%"
  },
  alreadyMemberButton: {
    color: "lightgray",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "6%",
    marginRight: 15
  },
  errMessage: {
    marginTop: 5,
    color: colors.white
  },
  wrapper: {
    backgroundColor: colors.primary
  },
  submitButtonContainer: {
    marginTop: "15%"
  },
  iconContainer: {
    position: "absolute",
    right: 0,
    bottom: 5
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    position: "absolute",
    bottom: 20,
    alignSelf: "center"
  },
  backText: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: "SFProDisplayRegular",
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: -0.08,
    color: "#f1f1f1"
  },
  arrow: {
    height: 13,
    width: 13
  },
  arrowBack: {
    // padding: 13,
    borderRadius: 40,
    marginTop: 20,
    marginBottom: 10,
    width: "25%",
    flexDirection: "row",
    alignItems: "center"
  }
});
