

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
import RBSheet from 'react-native-raw-bottom-sheet';
import React, { useState, useRef, useEffect } from 'react'
import moment from 'moment/min/moment-with-locales'
import { useSelector } from 'react-redux';
import { FinishedAppointments } from '../../redux/actions/user.action';
const { height, width } = Dimensions.get('window');
const History = ({ setscreen }) => {
  const [test, settest] = useState(true)
  const [locat, setlocat] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const [submit, setsubmit] = useState(false);
  const [past, setpast] = useState("")
  const [Value, setValue] = useState()
  const [Status, setStatus] = useState()
  const refRBSheet2 = useRef();
  const userId = useSelector((state) => state?.auth?.credential?.User?._id)
 useEffect(()=>{
    fetch_passed_Appointment()
  },[])
  const fetch_passed_Appointment=async()=>{
    const { data } = await FinishedAppointments(userId)
    setpast(data)
    console.log(" past apoitment data on page",data)
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
            // flexDirection: "row",
            justifyContent: "space-around",
            marginTop: height * 0.012,
            paddingHorizontal: width * 0.055
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
          {/* <TouchableOpacity
          default={true}
            style={styles.reject}
          >
            <Text
              style={styles.btn}
            >
             J’annule
            </Text>
          </TouchableOpacity> */}


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
            marginLeft: width * 0.05,
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
                require("../../assets/images/onlinepoint.png")}  />
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

      </>
    )
  }

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
          source={require("../../assets/images/past.png")}
        />
      <View>
      <FlatList
          data={past?.data}
          renderItem={Appointments}
          keyExtractor={item => item.id}
          scrollEnabled={true}
          // showsVerticalScrollIndicator={true}
          style={{ marginBottom: height * 0.0754 }}
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
      </ImageBackground>
    </SafeAreaView>
  )
}

export default History

const styles = StyleSheet.create({
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

})