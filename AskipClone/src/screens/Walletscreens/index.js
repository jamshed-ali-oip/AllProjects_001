
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Touchable,
  ScrollView
} from 'react-native'
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../components/Colors';
import Accepted from './Accepted';
import Rejected from './Rejected';
import History from './History';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useEffect } from 'react';
import { appointmentStatus, PendingAppointment, RevREq, UserDetail } from '../../redux/actions/user.action';
import moment from 'moment/min/moment-with-locales'
const { height, width } = Dimensions.get('window');

const WalletScreens = () => {
  const [screen, setscreen] = useState(0)
  const [test, settest] = useState(true)
  const [locat, setlocat] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const [submit, setsubmit] = useState(false);
  const [oui, setoui] = useState(false)
  const [Non, setNon] = useState(false)
  const [PendingApp, setPendingApp] = useState()
  const [Value, setValue] = useState()
  const [Status, setStatus] = useState()
  const [AppID, setAppID] = useState()
  const [detail, setDetail] = useState()

console.log("details ",detail)

  const Array = [
    {
      _id: 1,
      name: "Mes RDV à venir"
    },
    {
      _id: 2,
      name: "Mes RDV passés"
    },
    {
      _id: 3,
      name: "Mes RDV annulés"
    },


  ]
 const dispatch=useDispatch()
const userId = useSelector((state) => state?.auth?.credential?.User?._id)
useEffect(()=>{
  fetchappointment()
},[Value])
const fetchappointment=async()=>{
  const { data } = await PendingAppointment(userId)
  setPendingApp(data)
  // console.log("apoitment data on page",data)
}
useEffect(() => {

  UserInfo()

}, [])
const UserInfo = async () => {
  const {data}  = await UserDetail(userId)
  setDetail(data?.User)

}
const hit=()=>{
 let data={
    status:Status
  }
 dispatch(appointmentStatus(AppID,data)).then(fetchappointment()),
 setoui(false)
}
const RequestRevelator=()=>{
  let data={
    talentId: detail._id,
    revelateurId: detail?.relatedRevelateur?._id
  }
  dispatch(RevREq(data,setsubmit))
}  
const Capsules = (item) => {
    return (
      <TouchableOpacity
        onPress={() => setscreen(item?.item?._id)}
        style={styles.Capsules}
      >
        <Text
          style={styles.caplsuleText}
        >
          {item?.item?.name}
        </Text>
      </TouchableOpacity>
    )
  }
  const Appointments = (item) => {
    return (
      <View
        style={styles.appointments}
      >
        <Text
          style={styles.appointmentHeader}
        >
          {/* uppercase main karna hai jab api lagaonga  */}

          {item?.item?.createdBy?.firstName?.toUpperCase()}  {item?.item?.createdBy?.lastName?.toUpperCase()} TE PROPOSE UN RENDEZ-VOUS !
        </Text>
        <View
          style={{ flexDirection: "row" }}
        >
          <View
            style={styles.doccont}
          >
            <View
              style={{ flexDirection: "row" }}
            >
              <Text
                style={styles.eventname}
              >
                {item?.item?.subject}
              </Text>
              <Image
                style={{
                  resizeMode: "contain",
                  marginLeft: width * 0.012,
                  height: height * 0.022,
                  width: width * 0.05
                }}
                source={
                 item?.item?.type.toUpperCase()=="ONSITE"?
                    require("../../assets/images/oflinepoint.png") :
                    require("../../assets/images/onlinepoint.png")

                } />
            </View>

           {item?.item?.type.toUpperCase()=="ONSITE"? <Text
              style={styles.location}
            >
              {item?.item?.postalAddress}, {item?.item?.zipCode} {item?.item?.city}
            </Text>:
            <Text
              style={styles.location}
            >
             En ligne
            </Text>}
            {/* <Image
                style={{
                  resizeMode: "contain",
                  marginLeft: width * 0.012,
                  height: height * 0.022,
                  width: width * 0.05
                }}
                source={
                  locat == false ?
                    require("../../assets/images/oflinepoint.png") :
                    require("../../assets/images/onlinepoint.png")

                } /> */}

          </View>
          <View
            style={styles.dateCOntainer}
          >
            <Text
              style={styles.date}
            >
             {moment(item?.item?.time).locale('fr').format('ddd DD MMMM ')}
            </Text>
            <Text
              style={styles.date}
            >
              à {moment(item?.item?.time).locale('fr').format('LT')}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: height * 0.012,
            paddingHorizontal: width * 0.022
          }}
        >
          <TouchableOpacity
            onPress={() => {refRBSheet2.current.open(),setValue(item)}}
            style={styles.consult}
          >
            <Text
              style={styles.btn}
            >
              Plus d’infos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.accept}
            onPress={()=>{setoui(true),setStatus("accepted"),setAppID(item?.item?._id)}}
          >

            <Text
              style={styles.btn}
            >
              J’accepte
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>{setNon(true),setStatus("declined"),setAppID(item?.item?._id)}}
            style={styles.reject}
          >
            <Text
              style={styles.btn}
            >
              Je refuse
            </Text>
          </TouchableOpacity>


        </View>
      </View>
    )
  }
  const RawBottomSheet = () => {
    return (
      <>
        <Text
          style={{
            color: "#ffffff",
            // textAlign: "center",
            fontFamily: "Bebas Neue Pro Bold",
            fontSize: width * 0.055,
            marginLeft:width*0.05
          }}
        >{Value?.item?.createdBy?.firstName?.toUpperCase()} {Value.item.createdBy.lastName.toUpperCase()} TE PROPOSE UN RENDEZ-VOUS !</Text>
        <View
          style={{ flexDirection: 'row', alignSelf: "center", marginTop: height * 0.02 }}
        >
          <View style={{ width: width * 0.65 }} >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Bebas Neue Pro Bold",
                  color: "#ffa913",
                  fontSize: width * 0.045
                }}
              >{Value.item?.subject}</Text>
              <Image
                style={{ resizeMode: "contain", marginLeft: width * 0.01 }}
                source={ Value?.item?.type.toUpperCase()=="ONSITE"?
                require("../../assets/images/oflinepoint.png") :
                require("../../assets/images/onlinepoint.png")} />
            </View>
            {/* <Text
              style={{
                fontFamily: "bebas-neue-pro-regular",
                color: "#ffffff",
                fontSize: width * 0.042,
              }}
            >Enligne</Text> */}
              {Value?.item?.type.toUpperCase()=="ONSITE"? <Text
            style={{
              fontFamily: "bebas-neue-pro-regular",
              color: "#ffffff",
              fontSize: width * 0.042,
            }}
            >
              {Value?.item?.postalAddress}, {Value?.item?.zipCode} {Value?.item?.city}
            </Text>:
            <Text
            style={{
              fontFamily: "bebas-neue-pro-regular",
              color: "#ffffff",
              fontSize: width * 0.042,
            }}
            >
             En ligne
            </Text>}
          </View >
          <View  >
            <Text
              style={{
                fontFamily: "bebas-neue-pro-regular",
                color: "#bf9423",
                fontSize: width * 0.042,
              }}
            >{moment(Value?.item?.time).locale('fr').format('ddd DD MMMM ')}</Text>
            <Text
              style={{
                fontFamily: "bebas-neue-pro-regular",
                color: "#bf9423",
                fontSize: width * 0.042,
              }}
            >à {moment(Value?.item?.time).locale('fr').format('LT')}</Text>
          </View >
        </View>
        <ScrollView
          style={{ height: height * 0.25 }}
        >
          <Text
            style={{
              fontFamily: "bebas-neue-pro-regular",
              color: "#ffffff",
              fontSize: width * 0.04,
              textAlign: "justify",
              width: width * 0.9,
              alignSelf: "center",
              marginTop: height * 0.015
            }}
          >
            {Value?.item?.additionallnfos}
          </Text>
        </ScrollView>
        <View style={{
          flexDirection: "row",
          height: height * 0.055,
          // backgroundColor: "yellow",
          justifyContent: "space-around",
          paddingHorizontal: width * 0.095
        }}>
          <TouchableOpacity
            onPress={()=>{setoui(true),setStatus("accepted",setAppID(item?.item?._id))}}
            style={{
              backgroundColor: "#00b453",
              height: height * 0.038,
              width: width * 0.23,
              borderRadius: width * 0.035,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontFamily: "Bebas Neue Pro Bold",
                fontSize: width * 0.034
              }}
            >
              J’accepte
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>{setNon(true),setStatus("declined"),setAppID(item?.item?._id)}}
            style={{
              borderWidth: 1,
              height: height * 0.038,
              width: width * 0.23,
              borderRadius: width * 0.035,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#ffffff"
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontFamily: "Bebas Neue Pro Bold",
                fontSize: width * 0.034
              }}
            >
              Je refuse
            </Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }
  const refRBSheet2 = useRef();
  return (
    <SafeAreaView>
      {
        screen == 0 ? <ImageBackground
          style={{ height: height }}
          source={require('../../assets/images/rbbg.png')}
        >
          <View style={{backgroundColor:"transparent"}}>
            <FlatList
              data={Array}
              renderItem={Capsules}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <Image
            style={{
              resizeMode: "contain",
              margin: width * 0.05,
              height: height * 0.033,
              width: width * 0.43

            }}
            source={require("../../assets/images/main.png")}
          />
          {/* no appontments*/}
          <>
            {test == false ?
              <Image
                style={{ alignSelf: "center", marginTop: height * 0.15, resizeMode: "contain" }}
                source={require("../../assets/images/noappointment.png")}
              /> :
             <View 
            //  style={}
             >
               <FlatList
                data={PendingApp?.data}
                renderItem={Appointments}
                keyExtractor={item => item.id}
                scrollEnabled={true}
                // showsVerticalScrollIndicator={true}
                style={{ marginBottom: height * 0.0754 }}
              />
             </View>
            }

          </>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              position: "absolute",
              alignSelf: "flex-end",
              marginTop: height * 0.83,
              // backgroundColor:"red"
              zIndex:10000
            }}
          >
            <Image
              style={{

                resizeMode: "contain",
                marginRight: width * 0.05

              }}
              source={require("../../assets/images/addwidget.png")}
            />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              {

                submit == false ?
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Demander un rendez-vous avec mon révélateur</Text>
                    <View
                      style={{ flexDirection: "row", marginTop: height * 0.012 }}
                    >
                      <TouchableOpacity
                        onPress={() => RequestRevelator()}
                        style={{
                          backgroundColor: "#00b453",
                          height: height * 0.039,
                          width: width * 0.39,
                          justifyContent: "center",
                          alignItems: "center",
                          // marginLeft: width * 0.03,
                          borderRadius: width * 0.035

                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Bebas Neue Pro Bold",
                            fontSize: width * 0.043,
                            color: "white"
                          }}
                        >
                          Oui, je confirme
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={{
                          // backgroundColor: "green",
                          height: height * 0.039,
                          width: width * 0.39,
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: width * 0.03,
                          borderRadius: width * 0.035,
                          borderWidth: 2,
                          borderColor: "#081a4f"
                        }}>
                        <Text
                          style={{
                            fontFamily: "Bebas Neue Pro Bold",
                            fontSize: width * 0.04,
                            color: "#081a4f"
                          }}
                        >
                          Non, pas maintenant
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  : <TouchableOpacity
                    activeOpacity={100}
                    onPress={() => { setModalVisible(false), setsubmit(false) }}

                  // timer lagega api lkay wqt ispr 
                  >
                    <Image
                      style={{
                        resizeMode: "contain"
                      }}
                      source={require("../../assets/images/submited.png")}
                    />
                  </TouchableOpacity>

              }
            </View>
          </Modal>
          <View>
            <RBSheet
              ref={refRBSheet2}
              height={height * 0.65}
              closeOnDragDown={true}
              closeOnPressMask={false}
              // dragFromTopOnly={false}

              customStyles={{
                wrapper: {
                  backgroundColor: 'transparent',
                },
                draggableIcon: {
                  backgroundColor: 'transparent',
                  paddingHorizontal: 25,
                },
                container: {
                  borderTopLeftRadius: width * 0.08,
                  borderTopRightRadius: width * 0.08,
                  // position:'absolute',
                  backgroundColor: '#081a4f',
                },
              }}>
              <RawBottomSheet />
              {/* <View><Text>home</Text></View> */}
            </RBSheet>
          </View>
          {/* accept pop up  */}
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={oui}

            >
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                // borderRadius: width * 0.08,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              }}>
                <View style={{
                  width: width * 0.8,
                  height: height * 0.22,
                  borderRadius: width * 0.08,
                  alignContent: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  // marginTop: height * 0.3,
                  alignSelf: 'center',
                }}>
                  <ImageBackground
                    imageStyle={{ borderRadius: width * 0.08 }}
                    style={{
                      width: width * 0.8,
                      height: height * 0.22,
                      // borderRadius: width * 0.08,
                      resizeMode: 'contain'
                    }}
                    source={require('../../assets/images/backgroundImage.png')}>

                    <>
                      <Text style={{
                        textAlign: 'center',

                        color: '#081a4f',
                        marginTop: height * 0.02,
                        width: width * 0.65,
                        alignSelf: 'center',
                        textTransform: 'uppercase',
                        width: width * 0.6,
                        fontFamily: 'bebas-neue-pro-regular',
                        fontSize: width * 0.055,
                      }}>
                        <Text style={{ fontSize: width * 0.055,fontWeight:"900" }}>PreNome, </Text>
                        VEUX-TU VRAIMENT ACCEPTER CE RDV
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: width * 0.045,
                        }}>
                        <TouchableOpacity
                          onPress={() => {hit(), setoui(false)}}
                          style={{
                            width: width * 0.18,
                            height: height * 0.055,
                            backgroundColor: '#081a4f',
                            marginTop: height * 0.025,
                            marginLeft: width * 0.1,
                            borderRadius: width * 0.018,
                            alignSelf: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: width * 0.04,
                          }}>Oui </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            width: width * 0.18,
                            height: height * 0.055,
                            backgroundColor: '#081a4f',
                            marginTop: height * 0.025,
                            marginLeft: width * 0.1,
                            borderRadius: width * 0.018,
                            alignSelf: 'center',
                            justifyContent: 'center',
                          }}
                          onPress={() =>setoui(false)}>
                          <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: width * 0.04,
                          }}>Non </Text>
                        </TouchableOpacity>
                      </View>
                    </>

                  </ImageBackground>
                </View>
              </View>
            </Modal>

          </View>
             {/* reject pop up  */}
             <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={Non}

            >
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                // borderRadius: width * 0.08,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              }}>
                <View style={{
                  width: width * 0.8,
                  height: height * 0.22,
                  borderRadius: width * 0.08,
                  alignContent: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  // marginTop: height * 0.3,
                  alignSelf: 'center',
                }}>
                  <ImageBackground
                    imageStyle={{ borderRadius: width * 0.08 }}
                    style={{
                      width: width * 0.8,
                      height: height * 0.22,
                      // borderRadius: width * 0.08,
                      resizeMode: 'contain'
                    }}
                    source={require('../../assets/images/Background2.png')}>

                    <>
                      <Text style={{
                        textAlign: 'center',

                        color: '#081a4f',
                        marginTop: height * 0.02,
                        width: width * 0.65,
                        alignSelf: 'center',
                        textTransform: 'uppercase',
                        width: width * 0.6,
                        fontFamily: 'bebas-neue-pro-regular',
                        fontSize: width * 0.055,
                      }}>
                        <Text style={{ fontSize: width * 0.055,fontWeight:"900" }}>PreNome, </Text>
                        VEUX-TU VRAIMENT REFUSER CE RDV
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: width * 0.045,
                        }}>
                        <TouchableOpacity
                          onPress={() => {hit(),setNon(false)}}
                          style={{
                            width: width * 0.18,
                            height: height * 0.055,
                            backgroundColor: '#081a4f',
                            marginTop: height * 0.025,
                            marginLeft: width * 0.1,
                            borderRadius: width * 0.018,
                            alignSelf: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: width * 0.04,
                          }}>Oui </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            width: width * 0.18,
                            height: height * 0.055,
                            backgroundColor: '#081a4f',
                            marginTop: height * 0.025,
                            marginLeft: width * 0.1,
                            borderRadius: width * 0.018,
                            alignSelf: 'center',
                            justifyContent: 'center',
                          }}
                          onPress={() => setNon(false)}>
                          <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: width * 0.04,
                          }}>Non </Text>
                        </TouchableOpacity>
                      </View>
                    </>

                  </ImageBackground>
                </View>
              </View>
            </Modal>

          </View>

        </ImageBackground> : null
      }
      {screen == 1 ? <Accepted setscreen={setscreen} /> : null}
      {screen == 2 ? <History setscreen={setscreen} /> : null}
      {screen == 3 ? <Rejected setscreen={setscreen} /> : null}
    </SafeAreaView>
  )
}

export default WalletScreens

const styles = StyleSheet.create({
  Capsules: {
    height: height * 0.04,
    width: width * 0.35,
    backgroundColor: "#081a4f",
    margin: width * 0.012,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: width * 0.038,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    marginTop: height * 0.045
  },
  caplsuleText: {
    color: "#ffffff",
    fontFamily: "Bebas Neue Pro Bold",
    fontSize: width * 0.045
  },

  // conytaine 
  appointments: {
    height: height * 0.22,
    backgroundColor: "#081a4f",
    width: width * 0.85,
    margin: width * 0.018,
    alignSelf: "center",
    borderRadius: width * 0.059,

  },
  appointmentHeader: {
    color: "white",
    fontFamily: "Bebas Neue Pro Bold",
    fontSize: width * 0.05,
    margin: width * 0.045,
    marginLeft: width * 0.05
  },
  eventname: {
    fontFamily: "Bebas Neue Pro Bold",
    color: "#ffa913",
    fontSize: width * 0.045,

  },
  location: {
    fontFamily: "bebas-neue-pro-regular",
    color: "#ffffff",
    fontSize: width * 0.042,
    marginLeft: -width * 0.003

  },
  date: {
    fontFamily: "bebas-neue-pro-regular",
    color: "#bf9423",
    fontSize: width * 0.042,
  },
  dateCOntainer: {
    paddingLeft: width * 0.03,
    marginTop: height * 0.004
  },
  doccont: {
    // backgroundColor:"red",
    width: width * 0.6,
    paddingLeft: width * 0.05
  },
  reject: {
    borderWidth: 1,
    height: height * 0.035,
    width: width * 0.18,
    borderRadius: width * 0.035,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ffffff"
  },
  accept: {
    backgroundColor: "#00b453",
    height: height * 0.035,
    width: width * 0.18,
    borderRadius: width * 0.035,
    justifyContent: "center",
    alignItems: "center",

  },
  consult: {
    backgroundColor: "#fcba15",
    height: height * 0.035,
    width: width * 0.28,
    borderRadius: width * 0.035,
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    color: "#ffffff",
    fontFamily: "Bebas Neue Pro Bold",
    fontSize: width * 0.034
  },

  // modal 
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.16)"
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: width * 0.045,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: "Bebas Neue Pro Bold",
    color: "#081a4f",
    fontSize: width * 0.045
  },
})