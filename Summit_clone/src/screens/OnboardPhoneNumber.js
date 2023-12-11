import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInputMask } from 'react-native-masked-text';

import Screen from '../components/ui/Screen';
import colors from '../constants/colors';
import routes from '../routes/routes';
import Arrow from '../components/icons/Arrow';

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .min(7, 'Phone number must be at least 7 characters')
    .required('Required'),
});

const OnboardPhoneNumber = ({ navigation, route }) => {
  const { user } = route.params;

  const onChangeText = (text) => {
    var cleaned = ('' + text).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '',
        number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join(
          ''
        );
      return number;
    }    
    return text;
  };

  return (
    <Screen style={styles.root} containerStyle={styles.wrapper}>
      <View style={styles.topContainer}>
        <Text style={styles.middle_Text}>WHAT IS YOUR{'\n'}PHONE NUMBER?</Text>
      </View>
      <Formik
        initialValues={{ phone: '' }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        
        onSubmit={(values) =>
          navigation.navigate(routes.ONBOARDING_EMAIL_SCREEN, {
            user: {
              ...user,
              ...values,
            },
          })
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
              <TextInputMask
              
                type={'custom'}
                placeholder="Mobile Phone Number"
                options={{
                  mask: '+9 (999) 999 9999',
                }}
                style={styles.input}
                placeholderTextColor={colors.placeholder}
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                onSubmitEditing={handleSubmit}
                keyboardType={'phone-pad'}
                maxLength={17}
              />
            {touched.phone && errors.phone && (
              <Text style={styles.errMessage}>{errors.phone}</Text>
            )}
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.arrowBack}
                disabled={values.phone === ''}
              >
                <Arrow name="left" color={colors.white} />
                <Text style={styles.backText}>BACK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.arrowForward}
                disabled={values.phone.length < 17 ? 'disabled': ''}
              >
                <Text
                  style={[
                    styles.nextText,
                    {
                      color:
                        values.phone.length < 17
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
                    values.phone.length < 17 ? colors.darkGray : colors.white
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

export default OnboardPhoneNumber;

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
    fontFamily: "SFProDisplayRegular",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: -0.08,
    color: "#f1f1f1",
    marginRight: 5,
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
  },
  errMessage: { color: colors.gray, marginTop: 5 },
  wrapper: {
    backgroundColor: colors.primary,
  },
});