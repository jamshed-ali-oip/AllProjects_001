import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Modal,
  ActivityIndicator,
  Linking,
  Platform,
  FlatList
} from 'react-native';
import { React, useRef, useState, useEffect } from 'react';
import { Loginbtn, SignupBtn, Connnection } from '../../components/BTNS';
import Colors from '../../assets/colors/Colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import Forminput from '../../components/Forminput';
import {
  userLogin,
  registerUser,
  forget_Password,
  userVerifyInfo,
  password_Reset,
} from '../../redux/actions/user.action';
import { useDispatch, useSelector } from 'react-redux';

import MaskInput from 'react-native-mask-input';
import Inputs from '../../components/Inputs';
import axios from 'axios';
const { height, width } = Dimensions.get('window');

const Selectscreen = ({ navigation }) => {
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const [forget, setForget] = useState(false);
  const [eye, seteye] = useState(false);
  const [RP, setRP] = useState(false);
  const [phone, setPhone] = useState();
  const [password, setpassword] = useState();
  const [remember, setremember] = useState(false);
  const [M1, setM1] = useState(true);
  const [M2, setM2] = useState(false);
  const [M3, setM3] = useState(false);
  const [Data, setData] = useState(1);
  const [error, setError] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setlastName] = useState();
  const [phoneNumber, setphoneNumber] = useState();
  const [error2, setError2] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [Ottp, setOttp] = useState('');
  const [number, setnumber] = useState('');
  const [passwordSet, setpasswordSet] = useState(false);
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [Verifyemail, setVerifyemail] = useState("")
  const [color, setcolor] = useState(false)
  const [color2, setcolor2] = useState(false)
  const [Reminder, setReminder] = useState(false);
  const [location, setlocation] = useState();
  const [loc, setloc] = useState();
  const [myloc, setmyloc] = useState();


  useEffect(() => {
    if (phoneNumber) {
      setPhone(phoneNumber)
    }
  }, [phone, phoneNumber])
  const data2 = [
    {
      type: 'email',
      name: 'Par mail',
      id: 1,
    },
    {
      type: 'phone',
      name: 'Par SMS',
      id: 2,
    },
  ];
  // console.log("location", location)
  const data = [
    {
      name: 'Lyon',
      id: 1,
    },
    {
      name: 'Marseille',
      id: 2,
    },
  ];

  useEffect(() => {

    if (password?.length === 0 || phone?.length === 0) {
      setcolor(false)
    } else if (password === undefined || phone === undefined) { setcolor(false) } else { setcolor(true) }
  }, [phone, password])
  useEffect(() => {
    if (firstName?.length == 0 || lastName?.length == 0 || phoneNumber?.length == 0) {
      setcolor2(false)
    } else if (firstName == undefined || lastName == undefined || phoneNumber == undefined) { setcolor2(false) } else { setcolor2(true) }
  }, [firstName, lastName, phoneNumber])
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const login = () => {
    let data = {
      phone: phone?.replace(/ /g, '').slice(1),
      password,
    };
    // console.log(data)
    if (data.phone == undefined || data.password == undefined) {
      setError(true)
    } else {
      // console.log("hhda", data)
      dispatch(userLogin(data, setLoading, setError, refRBSheet));
    }

  };

  const registerUser_hit = () => {

    let data = {
      firstName: firstName,
      lastName: lastName,
      phone: phoneNumber?.replace(/ /g, '').slice(1),
      location: location,
      region: myloc?.context,
      zipCode: myloc?.postcode
    };
    // console.log("================================",data)
    if (data.firstName === undefined || data.lastName === undefined || data.phone === undefined) {
      setError2(true)

    } else {
      dispatch(registerUser(data, setLoading2, setError2, refRBSheet, refRBSheet2, setReminder))
      setError2(false)
    }

  };
  const Ottp_Code = () => {
    let data = {
      email: Verifyemail || null,
      phone: number.slice(1) || null
    };
    // console.log(data)
    dispatch(forget_Password(data, setM2, setM3));
  };

  const confirmOtpData_email = useSelector(state => state?.auth?.credential?.email);
  const confirmOtpData_phone = useSelector(state => state?.auth?.credential?.phone);
  // console.log(confirmOtpData_email, confirmOtpData_phone, "confirmOtpData");

  const userConfirmation = () => {
    let userVerify = {
      phone: confirmOtpData_phone || null,
      email: confirmOtpData_email || null,
      otpCode: Ottp,
    };
    dispatch(userVerifyInfo(userVerify, setpasswordSet));
  };

  const resetPassword = () => {
    let data = {
      phone: confirmOtpData_phone || null,
      email: confirmOtpData_email || null,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    // console.log('------------------------', data);
    dispatch(password_Reset(data, refRBSheet3));
  };
  const MYdata = (item) => {
    const handle = () => {
      setmyloc(item?.item?.properties);
      setlocation(item?.item?.properties?.city)
    }
    return (
      <TouchableOpacity
        onPress={() => handle()}
      >
        <Text
          style={{
            // backgroundColor:"red",
            color: "#a3a3a3",
            width: width * 0.78,
            alignSelf: "center",
            borderWidth: 1,
            height: height * 0.038,
            paddingLeft: width * 0.03,
            textAlignVertical: "center",
            borderColor: "#a3a3a3"

          }}
        >

          {item?.item?.properties?.city}
        </Text>
      </TouchableOpacity>
    )
  }
  // console.log("locatiomn", myloc)
  useEffect(() => {
    fetchhData()
    // setmyloc()
  }, [location])

  const fetchhData = async () => {


    try {
      const data = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${location}&type=municipality&autocomplete=1`, {
        headers: {
          "accept": "application/json, text/plain"
        }
      })
      // console.log("dsakjgk", data)

      setloc(data?.data?.features)

    }
    catch (error) {
      // console.log("", error)
    }
  }
  // console.log("loc", loc)
  return (
    <View style={style.container}>
      <ImageBackground
        style={style.BgVideo}
        source={require('../../assets/images/vid.gif')}>
        <Image
          style={style.logo}
          source={require('../../assets/images/logo.png')}
        />

        <Image
          style={{
            resizeMode: 'contain',
            alignSelf: 'center',
            height: height * 0.2,
            width: width * 0.7,
            marginTop: height * 0.05,
          }}
          source={require('../../assets/images/logintag.png')}
        />
      </ImageBackground>
      <ImageBackground
        style={style.wave}
        source={require('../../assets/images/wave.png')}>
        <View style={style.box}>
          <Loginbtn
            link={() => {
              refRBSheet.current.open();
            }}
            title="Se connecter"
          />
          <SignupBtn
            link={() => {
              refRBSheet2.current.open();
            }}
            title="Se créer un compte"
          />

        </View>
      </ImageBackground>

      {/* signin */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopEndRadius: width * 0.055,
            borderTopStartRadius: width * 0.055,
            height: height * 0.65,
            backgroundColor: 'transparent',
          },
          wrapper: {
            backgroundColor: Colors.blackOpacity,
          },
          draggableIcon: {
            backgroundColor: 'white',
            width: width * 0.15,
          },
        }}>
        <View
          style={{
            backgroundColor: 'white',
            height: height,
            borderTopEndRadius: width * 0.05,
            borderTopStartRadius: width * 0.05,
          }}>
          <Text style={style.head}>Connexion</Text>
          {error ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: width * 0.13,
                marginVertical: height * 0.015,
              }}>
              <Image
                style={{ marginRight: width * 0.01, resizeMode: 'contain' }}
                source={require('../../assets/images/warningg.png')}
              />
              <Text
                style={{
                  color: 'red',
                  fontFamily: 'Bebas Neue Pro Regular',
                  fontSize: width * 0.037,
                }}>
                Numéro de téléphone et/ou mot de passe erroné
              </Text>
            </View>
          ) : null}
          <Text
            style={style.tage}
          >Numéro de téléphone</Text>

          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#606469',
              width: width * 0.78,
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: width * 0.01,
              paddingLeft: width * 0.04,
            }}>
            <MaskInput
              value={phone}
              placeholder="06.06.06.06.06"
              placeholderTextColor="#afafaf"
              style={{ color: "black", height: height * 0.065,width:width*0.73 }}
              onChangeText={(masked, unmasked) => {
                setPhone(masked);
              }}
              maxLength={18}
              keyboardType="numeric"
              mask={[
                /\d/,
                /\d/,
                ' ',
                ' ',
                /\d/,
                /\d/,
                ' ',
                ' ',
                /\d/,
                /\d/,
                ' ',
                ' ',
                /\d/,
                /\d/,
                ' ',
                ' ',
                /\d/,
                /\d/,
              ]}
            />
          </View>
          <View>
            <Forminput
              title="Ton mot de passe"
              placeholder="****************"
              setvalue={setpassword}
              value={password}
              // type="numeric"
              // maxletter={5}
              security={eye}
            />
            <TouchableOpacity
              style={style.eye}
              onPress={() => {
                seteye(!eye);
              }}>
              <Image
                source={
                  eye == true
                    ? require('../../assets/images/Eyeoff.png')
                    : require('../../assets/images/openeye.png')
                }
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('Forget');
              refRBSheet.current.close();
              setTimeout(() => {
                setForget(true);
              }, 200)
            }}>
            <Text style={style.forget}>
              Mot de passe oublié ? Je le réinitialise
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: width * 0.12,
              marginTop: height * 0.02,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setRP(!RP);
              }}>
              <Image
                source={
                  RP == true
                    ? require('../../assets/images/tick.png')
                    : require('../../assets/images/round.png')
                }
              />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: width * 0.02,
                // fontSize: width * 0.037,
                // fontWeight: 'bold',
                color: 'black',
                fontFamily: 'Bebas Neue Pro Bold',
                fontSize: width * 0.043,
                letterSpacing: 0.25,
              }}>
              Se souvenir de moi
            </Text>
          </View>

          <Connnection
            color={color == false ? Colors.grey : Colors.ButtonBorder}
            title={
              loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                'Connexion'
              )
            }
            link={() => login()}
          />

          <SignupBtn
            link={() => {
              refRBSheet.current.close();
              setTimeout(() => {
                refRBSheet2.current.open();
              }, 200)
            }}
            title="Se créer un compte"
          />
          <TouchableOpacity
            onPress={() => { Linking.openURL('https://askip-app.fr/mentions-legales') }}
            style={{
              // backgroundColor:"red",
              width: width * 0.5,
              alignSelf: "center",
              alignItems: "center",
              marginTop: height * 0.025
            }}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                textDecorationColor: "black",
                fontFamily: 'Bebas Neue Pro Regular',
                color: "black",
                fontSize: width * 0.038
              }}
            >Mentions légales</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      {/* ottp screen  */}
      <RBSheet
        ref={refRBSheet3}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopEndRadius: width * 0.055,
            borderTopStartRadius: width * 0.055,
            height: height * 0.65,
            backgroundColor: 'transparent',
          },
          wrapper: {
            backgroundColor: Colors.blackOpacity,
          },
          draggableIcon: {
            backgroundColor: 'white',
            width: width * 0.15,
          },
        }}>
        <View
          style={{
            backgroundColor: 'white',
            height: height,
            borderTopEndRadius: width * 0.05,
            borderTopStartRadius: width * 0.05,
          }}>
          <Text style={style.head}>CRÉER MON COMPTE</Text>

          <View
            style={{
              flexDirection: 'row',
              width: width * 0.78,
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: width * 0.01,
              paddingLeft: width * 0.02,
            }}>
            {passwordSet == false ? (
              <View>
                <Forminput
                  title="Renseigne le code que tu as reçu par SMS :"
                  placeholder="1234"
                  setvalue={setOttp}
                  value={Ottp}
                  type="numeric"
                />
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: width * 0.035,
                      // textDecorationLine:"underline"
                      borderBottomColor: '#afafaf',
                      borderBottomWidth: 1,
                      width: width * 0.55,
                      marginLeft: width * 0.025,
                      marginTop: height * 0.005,
                    }}>
                    Code non reçu ? Renvoyer un code
                  </Text>
                </TouchableOpacity>

                <View style={{ marginTop: height * 0.12 }}>
                  <Connnection
                    color="#afafaf"
                    link={() => userConfirmation()}
                    title="Créer mon compte"
                  />

                  <SignupBtn
                    link={() => refRBSheet3.current.close()}
                    title="Retour"
                  />
                </View>
              </View>
            ) : (
              <View>
                <Forminput
                  title="nouveau mot de passe"
                  placeholder="1234"
                  setvalue={setnewPassword}
                  value={newPassword}
                  type="numeric"
                />
                <Forminput
                  title="confirmer le nouveau mot de passe"
                  placeholder="1234"
                  setvalue={setconfirmPassword}
                  value={confirmPassword}
                  type="numeric"
                />
                <View style={{ marginTop: height * 0.12 }}>
                  <Connnection color="#afafaf" link={() => resetPassword()} title="Confirmer" />
                </View>
              </View>
            )}
          </View>
        </View>
      </RBSheet>

      {/* signup */}
      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopEndRadius: width * 0.055,
            borderTopStartRadius: width * 0.055,
            height: height * 0.86,
            backgroundColor: 'transparent',
          },
          wrapper: {
            backgroundColor: Colors.blackOpacity,
          },
          draggableIcon: {
            backgroundColor: 'white',
            width: width * 0.15,
          },
        }}>
        {/* <YourOwnComponent /> */}

        <View
          style={{
            backgroundColor: 'white',
            height: height,
            borderRadius: width * 0.05,
          }}>
          <Text style={style.head2}>CRÉER MON COMPTE</Text>
          {
            error2 == true ? <Text
              style={{
                fontSize: width * 0.039,
                fontFamily: 'Bebas Neue Pro Regular',
                color: 'black',
                marginLeft: width * 0.1,
              }}>
              *Tous les champs sont obligatoires
            </Text> : null
          }
          <Forminput
            value={lastName}
            setvalue={setlastName}
            title="Nom*"
            placeholder="Durant"
          />
          <View>
            <Forminput

              value={firstName}
              setvalue={setFirstName}
              title="Prénom*"
              placeholder="Laurent"
            />
          </View>
          <Text
            style={style.tage}
          >Numéro de téléphone*</Text>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#606469',
              width: width * 0.78,
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: width * 0.01,
              paddingLeft: width * 0.04,
            }}>
            <MaskInput
              value={phoneNumber}
              placeholder="06.06.06.06.06"
              placeholderTextColor="#afafaf"
              style={{ color: "black", height: height * 0.065,width:width*0.734 }}
              onChangeText={(masked, unmasked) => {
                setphoneNumber(masked);
              }}
              maxLength={18}
              keyboardType="numeric"
              mask={[
                /\d/,
                /\d/,
                ' ',
                ' ',
                /\d/,
                /\d/,
                ' ',
                ' ',
                /\d/,
                /\d/,
                ' ',
                ' ',
                /\d/,
                /\d/,
                ' ',
                ' ',
                /\d/,
                /\d/,
              ]}
            />
          </View>
          {/* <Forminput
            value={phoneNumber}
            setvalue={setphoneNumber}
            type="numeric"
            title="Numéro de téléphone*"
            placeholder="00.00.06.06.06"
            maxletter={10}
          /> */}
          <Forminput
            value={location}
            setvalue={setlocation}
            title="Localisation*"
            placeholder="Renseigne ta ville"
          // maxletter={10}
          />
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={loc}
              keyExtractor={item => item.id}
              renderItem={MYdata}
            />
          </View>
          <View
            style={{
              // flexDirection: 'row',
              marginLeft: width * 0.12,
              marginTop: height * 0.02,
              // alignItems: 'center',
            }}>
            {/* <Text
              style={{
                fontFamily: 'Bebas Neue Pro Bold',
                fontSize: width * 0.045,
                color: 'black',
              }}>
              Localisation*
            </Text> */}

            <View
              style={{
                flexDirection: 'row',
                marginVertical: height * 0.005,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setremember(!remember);
                }}>
                <Image
                  style={{
                    resizeMode: 'contain',
                  }}
                  source={
                    remember == true
                      ? require('../../assets/images/tick.png')
                      : require('../../assets/images/round.png')
                  }
                />
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    marginLeft: width * 0.02,

                    color: 'black',
                    fontFamily: 'Bebas Neue Pro Regular',
                    fontSize: width * 0.043,
                    letterSpacing: 0.25,

                  }}>
                  {/* {item.name} */}
                  En cliquant ici, tu acceptes les{' '}



                </Text>
                <TouchableOpacity

                  onPress={() => { Linking.openURL('https://askip-app.fr/conditions-generales-utilisations') }}
                >
                  <Text style={{
                    textDecorationLine: 'underline',
                    color: "black",
                    fontFamily: 'Bebas Neue Pro Regular',
                    fontSize: width * 0.043,
                    letterSpacing: 0.25,
                    marginLeft:width*0.02
                  }}>
                    d'utilisation
                  </Text></TouchableOpacity>
              </View>
              <TouchableOpacity

                onPress={() => { Linking.openURL('https://askip-app.fr/conditions-generales-utilisations') }}
              >
                <Text style={{
                  textDecorationLine: 'underline',
                  color: "black",
                  fontFamily: 'Bebas Neue Pro Regular',
                  fontSize: width * 0.043,
                  letterSpacing: 0.25,
                  // marginTop:height*0.025
                }}>
                  Conditions générales
                  {/* d'utilisation */}
                </Text>
              </TouchableOpacity>
            </View>
            {/* <Image
              style={{ resizeMode: 'contain', marginTop: -height * 0.036, height: height * 0.032 }}
              source={require('../../assets/images/twist.png')}
            /> */}
          </View>
          <Connnection color={color2 == false ? Colors.grey : Colors.ButtonBorder} link={() => registerUser_hit()}

            title={
              loading2 ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                'Suivant'
              )
            }

          />
          <SignupBtn
            link={() => {
              refRBSheet2.current.close();
              setTimeout(() => {
                refRBSheet.current.open();
              }, 200);
            }}
            title="Se connecter"
          />
          <TouchableOpacity
            onPress={() => { Linking.openURL('https://askip-app.fr/mentions-legales') }}
            style={{
              // backgroundColor:"red",
              width: width * 0.5,
              alignSelf: "center",
              alignItems: "center",
              marginTop: height * 0.025
            }}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                textDecorationColor: "black",
                fontFamily: 'Bebas Neue Pro Regular',
                color: "black",
                fontSize: width * 0.038
              }}
            >Mentions légales</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
      <>
        <Modal
          animationType="fade"
          transparent={true}
          visible={forget}
          onRequestClose={() => {
            setForget(!forget);
          }}>
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <View
                style={{
                  height: height * 0.045,
                  backgroundColor: '#001d4f',
                  width: width * 0.8,
                  borderRadius: width * 0.035,
                  // marginTop:4
                }}></View>
              <ImageBackground
                style={{
                  tintColor: Colors.theme_color,
                  height: height * 0.235,
                  alignSelf: 'center',
                  width: width * 0.81,
                  resizeMode: 'contain',
                  // borderTopEndRadius:100
                  marginTop: -height * 0.035,
                }}
                source={require('../../assets/images/wave2.png')}>
                <TouchableOpacity
                  onPress={() => {
                    setForget(false);
                    setM1(true);
                    setM2(false);
                    setM3(false);
                    setnumber('');
                  }}
                  style={{ padding: width * 0.02 }}>
                  <Image source={require('../../assets/images/crs.png')} />
                </TouchableOpacity>
                <Image
                  style={{
                    alignSelf: 'center',
                    height: height * 0.06,
                    width: width * 0.1,
                    resizeMode: 'contain',
                    marginBottom: height * 0.01,
                  }}
                  source={require('../../assets/images/oppsl.png')}
                />
                <Text style={style.modaltext}>Oops...</Text>
                <Text style={style.modaltext}>
                  tu as oublié ton mot de passe ?
                </Text>
              </ImageBackground>

              {/* material */}
              {M1 == true ? (
                <View>
                  <Text
                    style={{
                      width: width * 0.45,
                      // fontSize: width * 0.035,
                      textAlign: 'center',
                      // fontWeight: '600',
                      color: 'black',
                      marginTop: height * 0.03,
                      fontFamily: 'Bebas Neue Pro Bold',
                      fontSize: width * 0.045,
                      marginLeft: width * 0.1,
                    }}>
                    Comment souhaites-tu recevoir un mot de passe temporaire ?
                  </Text>
                  {data2.map(item => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginLeft: width * 0.05,
                          marginTop: height * 0.02,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setData(item.id);
                          }}>
                          <Image
                            source={
                              Data == item.id
                                ? require('../../assets/images/selectedcircle.png')
                                : require('../../assets/images/round.png')
                            }
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            // fontSize: width * 0.038,
                            color: '#939393',
                            marginLeft: width * 0.038,
                            fontFamily: 'Bebas Neue Pro Regular',
                            fontSize: width * 0.05,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    );
                  })}

                  <TouchableOpacity
                    onPress={() => (setM1(false), setM2(true))}
                    style={style.Connnection}>
                    <Text style={style.C_btntext}>Envoyer</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              {M2 == true ? (
                <View style={{ alignItems: 'center', marginTop: height * 0.05 }}>
                  {Data == 1 ? (
                    <Inputs
                      width={width * 0.6}
                      widths={width * 0.6}
                      height={height * 0.065}
                      heights={height * 0.065}
                      setvalue={setVerifyemail}
                      value={Verifyemail}
                      placeholder="e-mail"
                    />
                  ) : (
                    <Inputs
                      width={width * 0.6}
                      widths={width * 0.6}
                      setvalue={setnumber}
                      value={number}
                      height={height * 0.065}
                      heights={height * 0.065}
                      placeholder="numéro de téléphone"
                      type="numeric"
                      maxletter={10}
                    />
                  )}

                  <TouchableOpacity
                    onPress={() => (setM1(false), Ottp_Code())}
                    style={[
                      style.Connnection,
                      { backgroundColor: Colors.ButtonBorder },
                    ]}>
                    <Text style={style.C_btntext}>Continuer</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              {M3 == true ? (
                <View style={{ alignItems: 'center', marginTop: height * 0.05 }}>
                  <Text style={style.disc}>
                    Consulte{' '}
                    <Text>{Data == 1 ? 'ta boîte mail' : 'ton téléphone'}</Text>{' '}
                    ! Un mot de passe
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={style.text}> temporaire de</Text>
                    <Text style={style.text2}> 20 minutes</Text>
                    <Text style={style.text}> t’as été envoyé.</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={style.text}> N’hésite pas à le</Text>
                    <Text style={style.text2}> réinitialiser</Text>
                    <Text style={style.text}> quand tu seras</Text>
                  </View>
                  <Text style={style.text}> connecté !</Text>

                  <TouchableOpacity
                    onPress={() => (
                      setM1(true),
                      setM2(false),
                      setM3(false),
                      setForget(false),
                      setTimeout(() => {
                        refRBSheet3.current.open()
                      }, 200)
                    )}
                    style={[
                      style.Connnection,
                      { backgroundColor: Colors.ButtonBorder },
                    ]}>
                    <Text style={style.C_btntext}>Continuer</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={Reminder}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setReminder(!Reminder);
          }}
        >
          <View style={style.centeredView}>
            <View style={style.rawBottomModalView}>
              <ImageBackground
                imageStyle={{ borderRadius: width * 0.08 }}
                style={style.rawBottomModalImage}
                source={require('../../assets/images/backgroundImage.png')}>

                <>
                  <Text style={style.modalText}>
                    <Text style={{ fontFamily: 'Bebas Neue Pro Bold', fontSize: width * 0.048 }}> </Text>
                    Vous recevrez sous peu un mot de passe à 4 chiffres sur votre téléphone
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: width * 0.045,
                      // alignItems:"center"
                      justifyContent: "center"

                    }}>
                    <TouchableOpacity
                      onPress={() => setReminder(!Reminder)}
                      style={style.rawBottomButons}>
                      <Text style={style.btn}>D'accord</Text>
                    </TouchableOpacity>

                  </View>
                </>

              </ImageBackground>
            </View>
          </View>
        </Modal>

      </>
    </View>
  );
};

export default Selectscreen;

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#50617f',
  },
  container: {
    flex: 1,
  },
  BgVideo: {
    height: height * 0.8,
    alignSelf: 'center',
    width: width * 1,
    marginTop: 0,
  },
  logo: {
    height: height * 0.2,
    width: width * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: width * 0.078,
    // fontWeight: 'bold',
    color: Colors.whitetext,
    width: width * 0.68,
    textTransform: 'uppercase',
    alignSelf: 'center',
    lineHeight: height * 0.042,
    marginLeft: width * 0.07,
    marginTop: height * 0.07,
    // fontFamily: 'Bebas Neue Pro Italic'
    fontFamily: 'Bebas Neue Pro Bold',
  },
  wave: {
    position: 'absolute',
    // marginBottom:0,
    resizeMode: 'contain',
    height: Platform.OS == "ios" ? height * 0.3 : height * 0.4,
    width: width * 1,
    marginTop: height * 0.7,
  },
  box: {
    marginTop: Platform.OS == "ios" ? height * 0.04 : height * 0.085,
  },
  head: {
    // fontSize: width * 0.055,
    // fontWeight: '800',
    color: Colors.ButtonBorder,
    width: width * 0.68,
    textTransform: 'uppercase',
    alignSelf: 'center',
    lineHeight: height * 0.042,
    marginLeft: width * 0.5,
    marginTop: height * 0.03,
    letterSpacing: 0,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.053,
  },
  head2: {
    // fontSize: width * 0.055,
    // fontWeight: '800',
    color: Colors.ButtonBorder,
    width: width * 0.68,
    textTransform: 'uppercase',
    alignSelf: 'center',
    lineHeight: height * 0.042,
    marginLeft: width * 0.36,
    marginTop: height * 0.01,
    letterSpacing: 0,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.053,
  },
  eye: {
    position: 'absolute',
    marginTop: height * 0.07,
    marginLeft: width * 0.8,
  },
  forget: {
    fontSize: width * 0.035,
    letterSpacing: 0.25,
    textDecorationLine: 'underline',
    marginLeft: width * 0.12,
    marginTop: height * 0.01,
    fontFamily: 'Bebas Neue Pro Bold',
    // fontSize:width *0.053,
    color: '#d0d0d0',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: width * 0.04,
    alignItems: 'center',
    shadowColor: '#000',
    width: width * 0.8,
    height: height * 0.6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
    // marginTop: height * 0.15,
  },
  container: {
    backgroundColor: Colors.blurtheme,
    flex: 1,
  },
  disc: {
    width: width * 0.7,
    // fontSize: width * 0.035,a
    textAlign: 'center',
    // fontWeight: '600',
    color: 'black',
    marginTop: height * 0.03,
    marginLeft: width * 0.035,
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.045,
  },

  modaltext: {
    textAlign: 'center',
    // fontSize: width * 0.045,
    // fontWeight: '800',
    // letterSpacing: -0.8,
    color: Colors.whitetext,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.053,
  },
  Connnection: {
    height: height * 0.06,
    width: width * 0.6,
    borderRadius: width * 0.02,
    // alignItems:"center",
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: height * 0.015,
    // borderWidth:1,
    backgroundColor: Colors.grey,
    marginTop: height * 0.04,
    // borderColor:Colors.ButtonBorder
  },
  C_btntext: {
    textAlign: 'center',
    // fontSize: width * 0.045,
    // fontWeight: '800',
    color: Colors.whitetext,
    letterSpacing: 0,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.053,
  },
  text: {
    // fontSize: width * 0.035,
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.045,
    textAlign: 'center',
    fontWeight: '600',
    color: 'black',
  },
  text2: {
    // fontSize: width * 0.035,
    textAlign: 'center',
    // fontWeight: '600',
    color: Colors.ButtonBorder,
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.045,
  },
  tage: {
    marginLeft: width * 0.12,
    marginTop: width * 0.012,
    paddingBottom: height * 0.01,
    color: "black",
    fontWeight: "600",
    // fontSize:width*0.035,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.0415,
    // marginBottom:-height*0.01,

  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: width * 0.08,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // marginTop: 22
  }, rawBottomModalView: {
    width: width * 0.8,
    height: height * 0.22,
    borderRadius: width * 0.08,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    // marginTop: height * 0.3,
    alignSelf: 'center',
  }, rawBottomModalImage: {
    width: width * 0.8,
    height: height * 0.22,
    // borderRadius: width * 0.08,
    resizeMode: 'contain',
  }, modalText: {
    textAlign: 'center',
    // fontSize: width * 0.045,
    // fontWeight: '400',
    color: '#081a4f',
    marginTop: height * 0.02,
    width: width * 0.65,
    // paddingHorizontal: width * 0.045,
    alignSelf: 'center',
    textTransform: 'uppercase',
    width: width * 0.7,
    // letterSpacing: -1,
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.045,
  }, rawBottomButons: {
    width: width * 0.22,
    height: height * 0.065,
    backgroundColor: '#081a4f',
    marginTop: height * 0.025,
    // marginLeft: width * 0.1,
    borderRadius: width * 0.018,
    // alignSelf: 'center',
    justifyContent: 'center',
    // padding:width*0.04
  }, btn: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: width * 0.04,
  },
});
