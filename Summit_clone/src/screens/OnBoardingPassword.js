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
import { Icon } from 'react-native-elements';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
});

const OnboardPassword = ({ navigation, route }) => {
  const { user } = route.params;
  const [iconName, setIconName] = useState('eye-off-outline');

  const changeIcon = () => {
    if (iconName === 'eye-outline') setIconName('eye-off-outline');
    else if (iconName === 'eye-off-outline') setIconName('eye-outline');
  };

  return (
    <Screen style={styles.root} containerStyle={styles.wrapper}>
      <View style={styles.topContainer}>
        <Text style={styles.middle_Text}>CREATE A{'\n'}PASSWORD</Text>
      </View>
      <Formik
        initialValues={{ password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) =>
          navigation.navigate(routes.ONBOARDING_ADDRESS_SCREEN, {
            user: {
              ...values,
              ...user,
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
              <TextInput
                value={values.password}
                placeholder={'Password'}
                placeholderTextColor={colors.placeholder}
                style={styles.input}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                onSubmitEditing={handleSubmit}
                secureTextEntry={iconName === 'eye-off-outline' ? true : false}
              />
              <View style={styles.iconContainer}>
                <Icon
                  onPress={changeIcon}
                  name={iconName}
                  type="material-community"
                  size={20}
                  color={colors.placeholder}
                />
              </View>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errMessage}>{errors.password}</Text>
            )}
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.arrowBack}
              >
                <Arrow name="left" color={colors.white} />
                <Text style={styles.backText}>BACK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.arrowForward}
                onPress={handleSubmit}
                disabled={values.password === ''}
              >
                <Text
                  style={[
                    styles.nextText,
                    {
                      color:
                        values.password === '' ? colors.darkGray : colors.white,
                    },
                  ]}
                >
                  NEXT
                </Text>
                <Arrow
                  name="right"
                  color={
                    values.password === '' ? colors.darkGray : colors.white
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

export default OnboardPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9d0510',
  },
  root: {
    flex: 1,
    backgroundColor: '#9d0510',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  topContainer: {
    paddingHorizontal: '5%',
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
    // width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowForward: {
    // padding: 13,
    borderRadius: 40,
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
  outerContainer: {
    backgroundColor: 'red',
  },
  bottomContainer: {
    backgroundColor: '#880711',
    width: '100%',
    flex: 2.5,
    paddingTop: 20,
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 5,
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
  errMessage: { color: colors.gray, marginTop: 4 ,paddingHorizontal:'7.5%'},
  wrapper: { backgroundColor: colors.primary },
});
