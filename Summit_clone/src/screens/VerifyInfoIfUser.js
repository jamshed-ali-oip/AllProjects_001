import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Input } from "react-native-elements/dist/input/Input";
import { TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as Device from "expo-device";

import { useAuth } from "../context/Auth";
import colors from "../constants/colors";
import Screen from "../components/ui/Screen";
import data from "../constants/US_States_and_Cities.json";
import CustomModal from "../components/modal";
import routes from "../routes/routes";

const VerifyInfoIfUser = ({ navigation, route }) => {
  const { user } = route.params;
  const { register } = useAuth();
  const [states, setStates] = useState([]);
  const [showModal, setShowModal] = useState("");

  const [iconName, setIconName] = useState("eye-off");

  useEffect(() => {
    var temp = [];
    let x = 0;
    for (const [key, value] of Object.entries(data)) {
      temp.push({
        id: `${key}`,
        name: `${key}`,
        cities: value,
      });
      x++;
    }
    setStates(temp);
  }, []);

  const handleShowModal = (bool) => {
    setShowModal(bool ? showModal : "");
  };

  const changeIcon = () => {
    if (iconName === "eye") setIconName("eye-off");
    else if (iconName === "eye-off") setIconName("eye");
  };

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().min(1, "Firstname too short").required("Required"),
    lastname: Yup.string().min(1, "Lastname too short").required("Required"),
    email: Yup.string()
      .matches(emailRegex, "Must be a valid email")
      .required("Required"),
    phone: Yup.string()
      .min(17, "Phone number must be at least 7 characters")
      .required("Required"),
    address1: Yup.string().min(2, "Address Too Short").required("Required"),
    address2: Yup.string(),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zipCode: Yup.string().max(5, "Upto 5 characters only"),
  });

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={styles.rootContainer}
    // >
    <Screen style={styles.root} containerStyle={styles.wrapper}>
      <View style={styles.topContainer}>
        <Text style={styles.middle_Text}>VERIFY INFO</Text>
      </View>
      <Formik
        initialValues={{
          firstname: user.firstName,
          email: user.email,
          lastname: user.lastName,
          phone: user.phone,
          password: user.password,
          address1: user.addressLine1,
          address2: user.addressLine2,
          city: user.city,
          state: user.state,
          zipCode: user.zip,
        }}
        validationSchema={validationSchema}
        onSubmit={() => {
          navigation.navigate(routes.HOME_SCREEN);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.bottomContainer}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <TextInput
                placeholder={"First"}
                placeholderTextColor={colors.placeholder}
                style={styles.phone}
                onChangeText={handleChange("firstname")}
                onBlur={handleBlur("firstname")}
                value={values.firstname}
              />
              {touched.firstname && errors.firstname && (
                <Text style={styles.errMessage}>{errors.firstname}</Text>
              )}

              <TextInput
                placeholder={"Last"}
                placeholderTextColor={colors.placeholder}
                style={styles.phone}
                onChangeText={handleChange("lastname")}
                onBlur={handleBlur("lastname")}
                value={values.lastname}
              />
              {touched.lastname && errors.lastname && (
                <Text style={styles.errMessage}>{errors.lastname}</Text>
              )}
              <TextInput
                placeholder={"Mobile phone number"}
                placeholderTextColor={colors.placeholder}
                maxLength={20}
                keyboardType={"numeric"}
                style={styles.phone}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
              />
              {touched.phone && errors.phone && (
                <Text style={styles.errMessage}>{errors.phone}</Text>
              )}
              <TextInput
                placeholder={"Your best email"}
                placeholderTextColor={colors.placeholder}
                textContentType={"emailAddress"}
                style={styles.phone}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.errMessage}>{errors.email}</Text>
              )}

              {/* <TextInput
                placeholder={"Address Line 1"}
                placeholderTextColor={colors.placeholder}
                style={[styles.phone, { marginTop: "0%" }]}
                onChangeText={handleChange("address1")}
                onBlur={handleBlur("address1")}
                value={values.address1}
              />
              {touched.address1 && errors.address1 && (
                <Text style={styles.errMessage}>{errors.address1}</Text>
              )} */}

              <TextInput
                placeholder={"Address Line 2"}
                placeholderTextColor={colors.placeholder}
                style={styles.phone}
                onChangeText={handleChange("address2")}
                onBlur={handleBlur("address2")}
                value={values.address2}
              />
              {touched.address2 && errors.address2 && (
                <Text style={styles.errMessage}>{errors.address2}</Text>
              )}

              <View style={{ width: "100%" }}>
                {touched.state && errors.state && (
                  <Text style={{ color: colors.gray, marginTop: 4 }}>
                    {errors.state}
                  </Text>
                )}
              </View>

              {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "5%",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{ width: "25%", zIndex: 10 }}
                  onPress={() => setShowModal("states")}
                >
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: colors.lightPrimary,
                    }}
                  >
                    {values.state ? (
                      <Text
                        style={[
                          styles.phone,
                          {
                            borderBottomColor: "transparent",
                            borderBottomWidth: 0,
                            height: 35,
                          },
                        ]}
                        numberOfLines={1}
                      >
                        {values.state}
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.phone,
                          {
                            paddingBottom: 0,
                            color: colors.placeholder,
                            borderBottomColor: "transparent",
                            borderBottomWidth: 0,
                          },
                        ]}
                        numberOfLines={1}
                      >
                        State
                      </Text>
                    )}

                    <CustomModal
                      modalVisible={showModal === "states" ? true : false}
                      setModalVisible={handleShowModal}
                      data={states}
                      selectItem={(state) => {
                        setFieldValue("state", state);
                        setFieldValue("city", "");
                      }}
                      placeholder="Select state..."
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: "30%" }}
                  onPress={() =>
                    values.state !== ""
                      ? setShowModal("city")
                      : alert("Please select state first.")
                  }
                >
                  <View
                    style={{
                      borderBottomColor: colors.lightPrimary,
                      borderBottomWidth: 1,
                      height: 40,
                    }}
                  >
                    {values.city ? (
                      <Text
                        style={[
                          styles.phone,
                          {
                            borderBottomColor: "transparent",
                            borderBottomWidth: 0,
                            marginTop: "4%",
                          },
                        ]}
                        numberOfLines={1}
                      >
                        {values.city}
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.phone,
                          {
                            color: colors.placeholder,
                            borderBottomColor: "transparent",
                            borderBottomWidth: 0,
                            marginTop: "4%",
                          },
                        ]}
                        numberOfLines={1}
                      >
                        City
                      </Text>
                    )}

                    <CustomModal
                      modalVisible={showModal === "city" ? true : false}
                      setModalVisible={handleShowModal}
                      data={states
                        .find((item) => item.name === values.state)
                        ?.cities.map((item) => ({
                          name: item,
                        }))}
                      selectItem={handleChange("city")}
                      placeholder="Select city..."
                    />
                  </View>
                </TouchableOpacity> */}

              {/* <View
                  style={{
                    width: "35%",
                    borderBottomColor: colors.lightPrimary,
                    borderBottomWidth: 1,
                    height: 40,
                  }}
                >
                  <TextInput
                    value={values.zipCode}
                    placeholder={"Zip Code"}
                    placeholderTextColor={colors.placeholder}
                    style={[styles.phone, { borderBottomColor: "transparent" }]}
                    onChangeText={handleChange("zipCode")}
                    onBlur={handleBlur("zipCode")}
                    value={values.zipCode}
                    keyboardType="number-pad"
                    maxLength={5}
                  />
                </View> */}
              {/* </View> */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "2%",
                }}
              >
                {/* <View style={{ width: "60%" }}>
                  {touched.city && errors.city && (
                    <Text style={{ color: colors.gray, marginTop: 4 }}>
                      {errors.city}
                    </Text>
                  )}
                </View> */}

                {/* <View
                  style={{
                    width: "35%",
                  }}
                >
                  {touched.zipCode && errors.zipCode && (
                    <Text
                      style={{
                        color: colors.gray,
                        marginTop: 4,
                        width: "100%",
                      }}
                    >
                      {errors.zipCode}
                    </Text>
                  )}
                </View> */}
              </View>

              <View style={styles.addressInfoContainer}>
                <View style={{ width: "30%" }}>
                  {touched.city && errors.city && (
                    <Text style={[styles.errMessage, { marginLeft: 10 }]}>
                      {errors.city}
                    </Text>
                  )}
                </View>
                <View style={{ width: "30%" }}>
                  {touched.state && errors.state && (
                    <Text style={[styles.errMessage, { marginLeft: 10 }]}>
                      {errors.state}
                    </Text>
                  )}
                </View>
                <View style={{ width: "30%" }}>
                  {touched.zipCode && errors.zipCode && (
                    <Text style={[styles.errMessage, { marginLeft: 10 }]}>
                      {errors.zipCode}
                    </Text>
                  )}
                </View>
              </View>

              <View style={{ position: "absolute", width: "100%", bottom: 30 }}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>SUBMIT</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
      </Formik>
    </Screen>
    // </KeyboardAvoidingView>
  );
};

export default VerifyInfoIfUser;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  topContainer: {
    paddingHorizontal: "5%",
    paddingBottom: "10%",
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
  },
  textInputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  contentContainer: {
    height: "100%",
  },
  inputContainerStyle: {
    width: "106%",
    marginLeft: "-3%",
    borderBottomColor: colors.lightPrimary,
  },
  bottomContainer: {
    backgroundColor: colors.darkPrimary,
    width: "100%",
    flex: 5,
    paddingHorizontal: "6%",
  },
  addressInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  middle_Text: {
    textAlign: "left",
    fontSize: 36,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 45,
    letterSpacing: 0,
    color: "#ffffff",
    marginTop: 10,
  },
  nextText: {
    color: "white",
    fontSize: RFPercentage(1.73),
  },
  backText: {
    color: "#ad5960",
    fontSize: RFPercentage(1.73),
  },
  submitButton: {
    backgroundColor: colors.white,
    padding: "5%",
    borderRadius: 24,
    marginTop: 20,
    width: "100%",
  },
  submitButtonText: {
    fontFamily: "SFProDisplaySemibold",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: -0.09,
    textAlign: "center",
    color: "#131415",
  },
  phone: {
    fontSize: RFPercentage(2.6),
    marginTop: "7%",
    borderBottomColor: colors.lightPrimary,
    borderBottomWidth: 1,
    paddingBottom: 2,
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.09,
    color: "#ffffff",
    fontFamily:"SFProDisplayRegular"
  },
  errMessage: { color: colors.gray, marginTop: 4 },
  wrapper: {
    backgroundColor: colors.primary,
  },
});
