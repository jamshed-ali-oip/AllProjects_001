import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Formik } from "formik";
import * as Yup from "yup";

import Screen from "../components/ui/Screen";
import routes from "../routes/routes";
import colors from "../constants/colors";
import data from "../constants/US_States_and_Cities.json";
import CustomModal from "../components/modal";
import Arrow from "../components/icons/Arrow";

const validationSchema = Yup.object().shape({
  address1: Yup.string().min(2, "Address Too Short").required("Required"),
  address2: Yup.string(),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zipCode: Yup.string()
    .required("Required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),
});

const OnboardingAddress = ({ navigation, route }) => {
  const { user } = route.params;
  const [states, setStates] = useState([]);
  const [showModal, setShowModal] = useState("");

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

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={styles.rootContainer}
    // >
    <Screen style={styles.root} containerStyle={styles.wrapper}>
      <View style={styles.topContainer}>
        <Text style={styles.middle_Text}>WHAT IS {"\n"}YOUR ADDRESS?</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Formik
          initialValues={{
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipCode: "",
          }}
          onSubmit={(values) =>
            navigation.navigate(routes.ONBOARDING_INFOREVIEW_SCREEN, {
              user: {
                ...user,
                ...values,
              },
            })
          }
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            touched,
            errors,
          }) => (
            <>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder={"Address Line 1"}
                  placeholderTextColor={colors.placeholder}
                  style={[styles.phone, { marginTop: "10%" }]}
                  onChangeText={handleChange("address1")}
                  onBlur={handleBlur("address1")}
                  value={values.address1}
                />
                {touched.address1 && errors.address1 && (
                  <Text style={{ color: colors.gray, marginTop: 4 }}>
                    {errors.address1}
                  </Text>
                )}

                <TextInput
                  placeholder={"Address Line 2"}
                  placeholderTextColor={colors.placeholder}
                  style={styles.phone}
                  onChangeText={handleChange("address2")}
                  onBlur={handleBlur("address2")}
                  value={values.address2}
                />

                {touched.address2 && errors.address2 && (
                  <Text style={{ color: colors.gray, marginTop: 4 }}>
                    {errors.address2}
                  </Text>
                )}

                <View style={{ width: "100%" }}>
                  {touched.state && errors.state && (
                    <Text style={{ color: colors.gray, marginTop: 4 }}>
                      {errors.state}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: "5%",
                    alignItems: "center",
                    justifyContent: "space-between",
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
                        height: 40,

                      }}
                    >
                      {values.state ? (
                        <Text
                          style={[
                            styles.phone,
                            {
                              borderBottomColor: "transparent",
                              borderBottomWidth: 0,
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
                    style={{ width: "25%" }}
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
                  </TouchableOpacity>

                  <View
                    style={{
                      width: "30%",
                      borderBottomColor: colors.lightPrimary,
                      borderBottomWidth: 1,
                      height: 40,
                    }}
                  >
                    <TextInput
                      value={values.zipCode}
                      placeholder={"Zip Code"}
                      placeholderTextColor={colors.placeholder}
                      style={[
                        styles.phone,
                        { borderBottomColor: "transparent" },
                      ]}
                      onChangeText={handleChange("zipCode")}
                      onBlur={handleBlur("zipCode")}
                      value={values.zipCode}
                      keyboardType="number-pad"
                      maxLength={5}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "2%",
                  }}
                >
                  <View style={{ width: "60%" }}>
                    {touched.city && errors.city && (
                      <Text style={{ color: colors.gray, marginTop: 4 }}>
                        {errors.city}
                      </Text>
                    )}
                  </View>

                  <View
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
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  paddingHorizontal: "5%",
                }}
              >
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
                  disabled={
                    values.address1 === "" ||
                    values.zipCode.length < 5 ||
                    values.city === "" ||
                    values.state === ""
                  }
                >
                  <Text
                    style={[
                      styles.nextText,
                      {
                        color:
                          values.address1 === "" ||
                          values.zipCode.length < 5 ||
                          values.city === "" ||
                          values.state === ""
                            ? colors.darkGray
                            : colors.white,
                      },
                    ]}
                  >
                    NEXT
                  </Text>
                  <Arrow
                    name="right"
                    color={
                      values.address1 === "" ||
                      values.zipCode.length < 5 ||
                      values.city === "" ||
                      values.state === ""
                        ? colors.darkGray
                        : colors.white
                    }
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </Screen>
    // </KeyboardAvoidingView>
  );
};

export default OnboardingAddress;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#9d0510",
  },
  root: {
    flex: 1,
    backgroundColor: "#9d0510",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  topContainer: {
    paddingHorizontal: "5%",
    paddingTop: "8%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  next: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: "10%",
    marginBottom: "3%",
  },
  back: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    // marginLeft: "4%",
    marginBottom: "3%",
  },
  bottomContainer: {
    backgroundColor: colors.darkPrimary,
    width: "100%",
    flex: 2,
    // alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
  },
  textInputContainer: {
    width: "100%",
    // alignItems: "center",
    justifyContent: "flex-start",
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
    marginBottom: 28,
    width: "25%",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -22,
  },
  arrowForward: {
    // padding: 13,
    // borderRadius: 40,
    marginTop: 20,
    marginBottom: 28,
    // marginRight: 20,
    // width: '25%',
    flexDirection: "row",
    alignItems: "center",
  },
  nextText: {
    fontFamily: "SFProDisplayRegular",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: -0.08,
    color: "#f1f1f1",
    marginRight: 5,
  },
  backText: {
    color: colors.white,
    fontSize: RFPercentage(1.73),
    marginLeft: 5,
  },
  phone: {
    marginTop: "7.5%",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightPrimary,
    fontFamily: "SFProDisplayRegular",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.09,
    color: "#ffffff",
    // paddingBottom: 2,
  },
  wrapper: {
    backgroundColor: colors.primary,
  },
});
