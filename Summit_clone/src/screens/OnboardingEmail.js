import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Screen from '../components/ui/Screen';
import colors from '../constants/colors';
import routes from '../routes/routes';
import Arrow from '../components/icons/Arrow';
import { authService } from '../services/authService';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, 'Must be a valid email')
    .required('Required'),
});

const OnboardingEmail = ({ navigation, route }) => {
  const { user } = route.params;
  return (
    <Screen style={styles.root} containerStyle={styles.wrapper}>
      <View style={styles.topContainer}>
        <Text style={styles.middle_Text}>WHAT IS YOUR{'\n'}EMAIL ADDRESS?</Text>
      </View>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={async (values) => {
         const emailAvailable = await authService.isEmailAvailable(values.email)
         console.log("This is the emailAvailable ", emailAvailable)
         if(emailAvailable){
              navigation.navigate(routes.ONBOARDING_PASSWORD_SCREEN, {
                  user: {
                    ...user,
                    ...values,
                  },
                });
         }
         else {
            alert('An account with the same email already exists.');
         }
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <View style={styles.bottomContainer}>
            <View style={styles.inputBox}>
              <TextInput
                value={values.email}
                placeholder={'Your Best Email'}
                placeholderTextColor={colors.placeholder}
                style={styles.input}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                onSubmitEditing={handleSubmit}
                autoCapitalize="none"
              />
            {touched.email && errors.email && (
              <Text style={styles.errMessage}>{errors.email}</Text>
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
                disabled={values.email === ''}
              >
                <Text
                  style={[
                    styles.nextText,
                    {
                      color:
                        values.email === '' ? colors.darkGray : colors.white,
                    },
                  ]}
                >
                  NEXT
                </Text>
                <Arrow
                  name="right"
                  color={values.email === '' ? colors.darkGray : colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </Screen>
  );
};

export default OnboardingEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  root: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  topContainer: {
    paddingLeft: '5%',
    flex: 2,
    justifyContent: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
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
    width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowForward: {
    // padding: 13,
    // borderRadius: 40,
    marginTop: 20,
    marginBottom: 10,
    // width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
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
    width: '100%',
    flex: 2.5,
    paddingTop: 20,
  },
  middle_Text: {
    fontSize: 36,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 45,
    letterSpacing: 0,
    color: "#ffffff",
    fontFamily: "SFProDisplaySemibold",
    textAlign:"left"
  },
  errMessage: { color: colors.gray, marginTop: 4 },
  wrapper: {
    backgroundColor: colors.primary,
  },
});
