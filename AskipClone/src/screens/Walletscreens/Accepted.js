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
  Touchable, ScrollView, TextInput
} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet';
import React, { useState, useRef,useEffect } from 'react'
import { AcceptedAppointments } from '../../redux/actions/user.action';
import moment from 'moment/min/moment-with-locales'
import { useSelector } from 'react-redux';
const { height, width } = Dimensions.get('window');
const Accepted = ({ setscreen }) => {
  const [test, settest] = useState(true)
  const [locat, setlocat] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const [submit, setsubmit] = useState(false);
  const [Non, setNon] = useState(false)
  const [justi, setjusti] = useState(false)
  const [message, setmessage] = useState("")
  const [accepted, setaccepted] = useState("")
  const [Value, setValue] = useState()
  const [Status, setStatus] = useState()
  const Array2 = [
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
    {
      _id: 4,
      name: "Mes RDV annulés"
    },

  ]
const userId = useSelector((state) => state?.auth?.credential?.User?._id)

  useEffect(()=>{
    fetch_Accepted_Appointment()
  },[])
  const fetch_Accepted_Appointment=async()=>{
    const { data } = await AcceptedAppointments(userId)
    setaccepted(data)
    console.log(" accopet apoitment data on page",data)
  }
  const Appointments = (item) => {
    return (
      <View
        style={styles.appointments}
      >
        <Text
          style={styles.appointmentHeader}
        >
      
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
                  item?.item?.type?.toUpperCase()=="ONSITE"?
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
              style={styles.btn2}
            >
              Plus d’infos
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.accept}
          >

            <Text
              style={styles.btn}
            >
              J’accepte
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={()=>{setNon(true),setStatus("declined")}}
            style={styles.reject}
          >
            <Text
              style={styles.btn}
            >
              J’annule
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
            marginLeft:width*0.05,
            // textAlign: "center",
            fontFamily: "Bebas Neue Pro Bold",
            fontSize: width * 0.055,
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
          height: height * 0.065,
          // backgroundColor: "yellow",
          justifyContent: "space-around",
          paddingHorizontal: width * 0.095
        }}>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={()=>{setNon(true),setStatus("declined")}}
            style={{
              borderWidth: 1,
              height: height * 0.039,
              width: width * 0.45,
              borderRadius: width * 0.035,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#ffffff",
              marginTop: height * 0.01
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontFamily: "Bebas Neue Pro Bold",
                fontSize: width * 0.034
              }}
            >
              J’annule
            </Text>
          </TouchableOpacity>
        </View>
      </>
    )
  }
  const refRBSheet2 = useRef();
  return (
    <SafeAreaView>
      <ImageBackground
        style={{
          height: height
        }}
        source={require("../../assets/images/rbbg2.png")}
      >
        <TouchableOpacity
          style=
          {{ marginTop: height * 0.045, marginLeft: width * 0.03 }}
          onPress={() => setscreen(0)}
        >
          <Image
            style={{
              height: height * 0.045,
              width: width * 0.1,
              resizeMode: "contain"
            }}
            source={require("../../assets/images/prev.png")}
          />
        </TouchableOpacity>
        <Image
          style={{
            height: height * 0.049, width: width * 0.7, resizeMode: "contain"
          }}
          source={require("../../assets/images/incoming.png")}
        />

        <View
         style={{ marginBottom: height * 0.14 }}
        >
        <FlatList
          data={accepted?.data}
          renderItem={Appointments}
          keyExtractor={item => item.id}
          scrollEnabled={true}
          // showsVerticalScrollIndicator={true}
         
        />
        </View>
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
                {justi == true ?
                  <View >
                    <Text
                      style={{
                        marginLeft: width * 0.048,
                        fontSize: width * 0.042,
                        fontFamily: "Bebas Neue Pro Bold",
                        color: "#081a4f"
                      }}
                    >Justifie ton annulation :</Text>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        height: height * 0.085,
                        width: width * 0.7,
                        alignSelf: "center",
                        textAlignVertical: "top",
                        borderRadius:width*0.012,
                        color:"#000000",
                        fontWeight:"700"
                      }}
                      multiline={true}
                      onChangeText={setmessage}
                      value={message}
                      placeholder="Justification"
                    // keyboardType="numeric"
                    />
                    <View
                    style={{flexDirection:"row",justifyContent:"space-around",paddingHorizontal:width*0.045,marginTop:height*0.015}}
                    >
                      <TouchableOpacity
                      style={styles.confirm}
                      >
                        <Text
                        style={styles.btn2}
                        >
                          Confirm
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={()=>{
                        setjusti(false),setNon(false)
                      }}
                      style={styles.Annuler}
                      >
                        <Text
                        style={styles.blackColor}
                        >
                          Annuler
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  :
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
                        <Text style={{ fontSize: width * 0.055, fontWeight: "900" }}>PreNome, </Text>
                        VEUX-TU VRAIMENT ANNULER CE RDV
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingHorizontal: width * 0.045,
                        }}>
                        <TouchableOpacity
                          onPress={() => setjusti(true)}
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

                  </ImageBackground>}
              </View>
            </View>
          </Modal>

        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Accepted

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.16)"
  },
  appointments: {
    height: height * 0.22,
    backgroundColor: "#ffffff",
    width: width * 0.85,
    margin: width * 0.018,
    alignSelf: "center",
    borderRadius: width * 0.059,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,

    elevation: 23,
  },
  appointmentHeader: {
    color: "#081a4f",
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
    color: "#081a4f",
    fontSize: width * 0.042,
    marginLeft: -width * 0.003

  },
  date: {
    fontFamily: "bebas-neue-pro-regular",
    color: "#ffa913",
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
    width: width * 0.35,
    borderRadius: width * 0.035,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#081a4f"
  },
  accept: {
    backgroundColor: "#081a4f",
    height: height * 0.035,
    width: width * 0.18,
    borderRadius: width * 0.035,
    justifyContent: "center",
    alignItems: "center",

  },
  consult: {
    backgroundColor: "#fcba15",
    height: height * 0.035,
    width: width * 0.35,
    borderRadius: width * 0.035,
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    color: "#081a4f",
    fontFamily: "Bebas Neue Pro Bold",
    fontSize: width * 0.034
  },
  btn2: {
    color: "#ffffff",
    fontFamily: "Bebas Neue Pro Bold",
    fontSize: width * 0.034
  },
 confirm: {
    backgroundColor: "#2e9c47",
    height: height * 0.039,
    width: width * 0.28,
    borderRadius: width * 0.035,
    justifyContent: "center",
    alignItems: "center",

  },
  Annuler: {
    borderWidth: 1,
    height: height * 0.039,
    width: width * 0.28,
    borderRadius: width * 0.035,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000000"
  },
  blackColor: {
    color: "#000000",
    fontFamily: "Bebas Neue Pro Bold",
    fontSize: width * 0.034
  },

})