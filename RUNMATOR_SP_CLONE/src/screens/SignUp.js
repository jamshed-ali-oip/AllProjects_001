import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import Button from '../components/Button';
import Inputbox from '../components/Inputbox';
import background_img from '../assets/backgroung-image.png';
import logo from '../assets/run-matter-logo.png';
import Heading from '../components/Heading';
import colors from '../assets/colors';
import DocumentPicker from 'react-native-document-picker';
import {
  CardField,
  useStripe,
  StripeProvider,
} from '@stripe/stripe-react-native';
import IconComp from '../components/IconComp';
import { connect, useSelector } from 'react-redux';
import * as actions from '../store/Actions';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import Header from '../components/Header';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function ValidateEmail(mail) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(mail).toLowerCase());
}

const SignUp = ({ navigation, signUp, getAllServices }) => {
  // Sign Up States
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_no, setPhone_no] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_Password] = useState('');
  const [auth, setauth] = useState(false);

  // Card Details States
  const { createToken } = useStripe();
  const [cardDetails, setCardDetails] = useState(null);
  // Document Details
  const [drivingLicense, setDrivingLicense] = useState([]);
  const [proofOfInsurance, setProofOfInsurance] = useState([]);
  const [dotNum, setDotNum] = useState('');
  const [taxNum, setTaxNum] = useState('');
  const [loading, setLoading] = useState(false);
  const [referring_email, set_referring_email] = useState('');
  const stripeRef = useRef(null);
  const [connection, setConnection] = useState(true);
  const [item1, setitem1] = useState(1);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setConnection(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    getAllServices();
  }, []);
  const listingData = [
    {
      name: 'Truck Tower',
      id: 1,
    },
    {
      name: 'Mechanic',
      id: 2,
    },
  ];
  const ServicesIwillprovide = useSelector(state => state?.allServices);
  console.log('myyyy datatatattat', ServicesIwillprovide);
  useEffect(() => {
    if (stripeRef?.current) {
      stripeRef?.current.clear();
    }
  }, [connection]);
  console.log(
    'ServicesIwillprovideServicesIwillprovideServicesIwillprovide',
    item1,
  );

  const _onPressNext = () => {
    if (connection) {
      if (step === 1) {
        if (
          email === '' ||
          password === '' ||
          c_password === '' ||
          username === '' ||
          phone_no === ''
        ) {
          Toast.show({ type: 'error', text1: 'All fields required' });
        } else if (password != c_password) {
          Toast.show({ type: 'error', text1: 'Password does not match ' });
        } else if (!(password.length > 7) && !(c_password.length > 7)) {
          Toast.show({ type: 'error', text1: 'Password must be 8 characters' });
        } else if (!(phone_no.length > 9)) {
          Toast.show({ type: 'error', text1: 'Phone No must be 10 digit' });
        } else if (referring_email ? !ValidateEmail(referring_email) : false) {
          Toast.show({ type: 'error', text1: 'Invalid reference email' });
        } else {
          setStep(step => step + 2);
        }
      } else if (step === 2) {
        if (cardDetails === null) {
          Toast.show({ type: 'error', text1: 'Please enter card details.' });
        } else {
          setStep(step => step + 1);
        }
      } else {
        if (
          // drivingLicense.length == 0 ||
          // proofOfInsurance.length == 0 ||
          // dotNum == '' ||
          item1 == 13 &&
          taxNum === ''
        ) {
          Toast.show({ type: 'error', text1: 'PLease Enter Details' });
        } else {
          // else if (dotNum?.length > 15) {
          //   Toast.show({ type: 'error', text1: "The dot number must not be greater than 15 characters" })
          // }
          // else if (taxNum?.length > 15) {
          //   Toast.show({ type: 'error', text1: "The tax number must not be greater than 15 characters" })
          // }
          // else {

          setLoading(true);
          const file1 = {
            uri: drivingLicense[0]?.uri,
            name: drivingLicense[0]?.name,
            type: drivingLicense[0]?.type,
          };

          const file2 = {
            uri: proofOfInsurance[0]?.uri,
            name: proofOfInsurance[0]?.name,
            type: proofOfInsurance[0]?.type,
          };
          // const bodyForm = new FormData();
          // bodyForm.append('email', email)
          // bodyForm.append('password', password)
          // bodyForm.append('role_id', 3)
          // bodyForm.append('lat', 34)
          // bodyForm.append('lng', 35)
          // bodyForm.append('phone', phone_no)
          // bodyForm.append('custoken', cardDetails)
          // bodyForm.append('service_id', 1)
          // bodyForm.append('dot_number', dotNum)
          // bodyForm.append('tax_number', taxNum)
          // bodyForm.append('driver_license_file', file1 ? file1 : null)
          // bodyForm.append('proof_of_Insurance_file', file2 ? file2 : null)
          // bodyForm.append('name', username)
          // bodyForm.append('referring_email', referring_email)

          const data = {
            email: email,
            password: password,
            role_id: 3,
            lat: 34,
            lng: 35,
            phone: phone_no,
            // custoken: cardDetails,
            service_id: 1,
            dot_number: dotNum,
            tax_number: taxNum,
            driver_license_file: file1,
            proof_of_Insurance_file: file2,
            name: username,
          };
          signUp(data, () => setLoading(false), password);
        }
      }
    }
    // } else {
    //   Toast.show({ type: "error", text1: "please check your connection" })
    // }
  };

  const _onPresslogin = () => {
    navigation.navigate('LogIn');
  };

  const _onPressUploadLicense = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setDrivingLicense(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const _onPressUploadInsurance = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      setProofOfInsurance(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  const listing = i => {
    console.log('first', i);
    return (
      <TouchableOpacity
        onPress={() => {
          setitem1(i?.item?.id);
        }}
        style={{
          // backgroundColor: i?.item?.id == item1 ? '#0756a3' : null,
          marginLeft: width * 0.0125,
          flexDirection: "row",
          alignItems: "center"
        }}>
        <Image
          style={{
            resizeMode: "contain",
            width: width * 0.0454,
            height: height * 0.045,
            // backgroundColor: "red",
            marginVertical: height * 0.0025
          }}
          source={i?.item?.id == item1 ? require("../assets/Images/radio.png") : require("../assets/Images/radioUn.png")}
        />
        <Text
          style={{
            color: i?.item?.id == item1 ? '#0756a3' : '#808080',
            marginLeft: width * 0.0125,
            fontSize: width * 0.0345,
            fontFamily: 'Montserrat-Bold',
          }}>
          {i?.item?.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={{ flex: 1 }}>
        {step != 1 ? (
          <Header
            showBack={true}
            navigation={navigation}
            call={() => {
              if (step == 2) {
                setStep(1);
              } else if (step == 3) {
                setStep(1);
              }
            }}
            iconName="arrow-back"
            iconSize={25}
          />
        ) : null}
        <StatusBar translucent={false} barStyle="light-content" />
        <ImageBackground
          source={background_img}
          // resizeMode="cover"
          style={{ width: width, flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ height: height * 1.25 }}>
            <View style={styles.outerView}>
              <View style={styles.innerView}>
                {step == 1 ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      height: height - 100,
                      alignItems: 'center',
                      marginVertical: height * 0.05,
                    }}>
                    <Image
                      resizeMode="contain"
                      source={logo}
                      style={styles.logo}
                    />

                    <View style={styles.inputBoxes}>
                      <Inputbox
                        value={username}
                        setTextValue={setUsername}
                        placeholderTilte="Username"
                        placeHolderColor="grey"
                      />
                      <Inputbox
                        value={email}
                        setTextValue={setEmail}
                        placeholderTilte="Email"
                        placeHolderColor="grey"
                      />
                      <Inputbox
                        value={phone_no}
                        setTextValue={setPhone_no}
                        placeholderTilte="Phone #"
                        keyboardType={'numeric'}
                        placeHolderColor="grey"
                      />
                      <Inputbox
                        value={referring_email}
                        setTextValue={set_referring_email}
                        placeHolderColor="grey"
                        placeholderTilte="Reference email "
                      />
                      <Inputbox
                        value={password}
                        setTextValue={setPassword}
                        placeholderTilte="Password"
                        isSecure={true}
                        placeHolderColor="grey"
                      />
                      <Inputbox
                        value={c_password}
                        setTextValue={setC_Password}
                        placeholderTilte="Confirm Password"
                        isSecure={true}
                        placeHolderColor="grey"
                      />
                    </View>

                    <Button
                      title="Next "
                      onBtnPress={() => _onPressNext()}
                      isBgColor={false}
                      btnStyle={styles.btnStyle}
                      btnTextStyle={styles.btnTextStyle}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                        justifyContent: 'center',
                      }}>
                      <Heading
                        title="Already have an account?"
                        fontType="medium"
                        passedStyle={styles.alreadyLabel}
                      />
                      <TouchableOpacity onPress={() => _onPresslogin()}>
                        <Heading
                          title="Login"
                          fontType="bold"
                          passedStyle={styles.loginLabel}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : step == 2 ? (
                  <View
                    style={{ justifyContent: 'center', height: height - 100 }}>
                    <Heading
                      title="BANK CARD DETAILS"
                      fontType="extra-bold"
                      passedStyle={styles.heading}
                    />

                    <View style={styles.cardView}>
                      <StripeProvider publishableKey="pk_test_51KGO3iKlWkdJ4bgh5grKADwksoKZs0ujZHe1e4a99YcebRUFBtAIpbfbhzQA7yBJu5amHVJvUHIxlqsf7081alVa00wUvk9W2q">
                        <CardField
                          postalCodeEnabled={false}
                          autofocus={true}
                          placeholder={{
                            number: '4242 4242 4242 4242',
                          }}
                          ref={stripeRef}
                          cardStyle={{
                            color: '#000000',
                            fontSize: 14,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 30,
                          }}
                          style={{
                            width: '90%',
                            height: 60,
                            marginVertical: 30,
                          }}
                          onCardChange={cardDetails => {
                            if (cardDetails.complete) {
                              console.log(cardDetails);
                              createToken({ ...cardDetails, type: 'Card' }).then(
                                res => {
                                  console.log(res);
                                  if (res.token) {
                                    console.log('SDafsadfsdaf', res.token.id);
                                    setCardDetails(res.token.id);
                                  }
                                },
                              );
                            }
                          }}
                          onFocus={focusedField => {
                            console.log('focusField', focusedField);
                          }}
                        />
                      </StripeProvider>
                      {!connection ? (
                        <Text
                          style={{
                            color: 'red',
                            fontSize: 11,
                            textAlign: 'center',
                            marginVertical: 10,
                          }}>
                          Please check your internet connection
                        </Text>
                      ) : null}
                    </View>
                    <Button
                      title="Next"
                      onBtnPress={() => _onPressNext()}
                      isBgColor={false}
                      btnStyle={styles.btnStyle}
                      btnTextStyle={styles.btnTextStyle}
                    />
                    {/* </ImageBackground> */}
                  </View>
                ) : (
                  <View style={{
                    // justifyContent: 'center',
                    // height: height - 50,
                    marginTop: height * 0.2,
                    alignItems: 'center',
                    // marginVertical: height * 0.05,
                  }}>
                    <Heading
                      title="DOCUMENT DETAILS"
                      passedStyle={styles.heading}
                      fontType="extra-bold"
                    />
                    <View
                      style={{
                        height: height * 0.12,
                        backgroundColor: 'rgba(7, 85, 163, 0.21)',
                        borderRadius: width * 0.015,
                        paddingTop: height * 0.0125,
                        paddingLeft: width * 0.05,
                        width: width * 0.85
                        // justifyContent: "center",
                        // alignItems: "center",
                      }}>
                      <FlatList
                        data={listingData}
                        renderItem={listing}
                        keyExtractor={item => item.id}
                      />
                    </View>

                    <View style={styles.inputBoxes}>
                      <View style={styles.rowView}>
                        <Inputbox
                          isEditable={'false'}
                          value={drivingLicense[0]?.name}
                          setTextValue={setDrivingLicense}
                          placeholderTilte={
                            item1 == 1 ? 'Driving License' : 'Buiseness License'
                          }
                          placeHolderColor="grey"
                          viewStyle={{ width: width * 0.52 }}
                          textInputStyle={{ width: width * 0.52 }}
                        />

                        <TouchableOpacity
                          style={styles.rowUpperView}
                          activeOpacity={0.8}
                          onPress={() => _onPressUploadLicense()}>
                          <IconComp
                            type="Feather"
                            iconName="upload"
                            passedStyle={styles.iconUploadStyle}
                          />
                          <Heading
                            title="Upload"
                            fontType="semi-bold"
                            passedStyle={styles.uploadText}
                          />
                        </TouchableOpacity>
                      </View>
                      {item1 == 1 ? (
                        <View style={styles.rowView}>
                          <Inputbox
                            isEditable={'false'}
                            value={proofOfInsurance[0]?.name}
                            setTextValue={setProofOfInsurance}
                            placeholderTilte="Proof insurance"
                            placeHolderColor="grey"
                            viewStyle={{ width: width * 0.52 }}
                            textInputStyle={{ width: width * 0.52 }}
                          />

                          <TouchableOpacity
                            style={styles.rowUpperView}
                            activeOpacity={0.8}
                            onPress={() => _onPressUploadInsurance()}>
                            <IconComp
                              type="Feather"
                              iconName="upload"
                              passedStyle={styles.iconUploadStyle}
                            />
                            <Heading
                              title="Upload"
                              fontType="semi-bold"
                              passedStyle={styles.uploadText}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : null}
                      {item1 == 1 ? (
                        <Inputbox
                          value={dotNum}
                          setTextValue={setDotNum}
                          placeholderTilte="DOT number"
                          keyboardType={'numeric'}
                          placeHolderColor="grey"
                        />
                      ) : null}
                      <Inputbox
                        value={taxNum}
                        setTextValue={setTaxNum}
                        placeholderTilte="EIN number/Tax number"
                        placeHolderColor="grey"
                        keyboardType={'number-pad'}
                      />
                    </View>

                    <Button
                      disabled={false}
                      title="Sign Up"
                      disa
                      onBtnPress={() => _onPressNext()}
                      isBgColor={false}
                      loader={loading}
                      btnStyle={styles.btnStyle}
                      btnTextStyle={styles.btnTextStyle}
                    />
                  </View>
                )}
              </View>

              <View style={styles.circlesView}>
                <View
                  style={[
                    styles.circleGrey,
                    step === 1 && { backgroundColor: colors.themeBlue },
                  ]}
                />
                {/* <View
                  style={[
                    styles.circleGrey,
                    step === 2 && { backgroundColor: colors.themeBlue },
                  ]}
                /> */}
                <View
                  style={[
                    styles.circleGrey,
                    step === 3 && { backgroundColor: colors.themeBlue },
                  ]}
                />
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </>
  );
};

export default connect(null, actions)(SignUp);

const styles = StyleSheet.create({
  uploadText: {
    fontSize: width * 0.045,
    color: colors.themeBlue,
    marginLeft: width * 0.02,
  },
  iconUploadStyle: {
    color: colors.themeBlue,
    fontSize: width * 0.05,
  },
  rowUpperView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.05,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circlesView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 10,
    height: 100,
    // position:'absolute', bottom: 0, left: 0, right: 0
  },
  cardCustomStyle: {
    width: '90%',
    height: 50,
    marginVertical: 30,
  },
  cardStyle: {
    color: '#000000',
    borderRadius: 30,
    fontSize: 14,
  },
  cardView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerView: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  outerView: {
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: '100%',
    width: '95%',
  },
  heading: {
    color: colors.themeBlue,
    textAlign: 'center',
    fontSize: width * 0.075,
  },
  alreadyLabel: {
    fontSize: width * 0.034,
    color: 'rgba(0,0,0,.8)',
  },
  btnStyle: {
    backgroundColor: colors.themeBlue,
    borderRadius: width * 0.8,
    width: width * 0.8,
  },
  btnTextStyle: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
  loginLabel: {
    fontSize: width * 0.034,
    color: colors.themeBlue,
    paddingLeft: width * 0.015,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: width * 0.5,
  },

  logo: {
    margin: 18,
    width: width * 0.4,
    height: height * 0.14,
    // backgroundColor: 'red',
  },

  image: {
    // flex: 1,
    // resizeMode: 'stretch',
    justifyContent: 'center',
    width: width,
    height: height,
    // backgroundColor:'red',
    alignSelf: 'center',
    alignItems: 'center',
  },
  scrollview: {
    // height: height,
  },
  inputBoxes: {
    marginTop: height * 0.02,
    // height: height * 0.5,
    // backgroundColor: "red"
  },
  circleGrey: {
    borderRadius: 50,
    backgroundColor: 'grey',
    width: width * 0.02,
    height: width * 0.02,
    marginHorizontal: width * 0.01,
  },
});
