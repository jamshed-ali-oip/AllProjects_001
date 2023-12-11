import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import { MESINVITES, StatusUpdate } from '../../redux/actions/user.action';
import moment from 'moment/min/moment-with-locales'
import { base_URL_IMAGE } from '../../config/config';
const { width, height } = Dimensions.get('window');
const Abcd = (props) => {
  const [Invitations, setInvitations] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [S_event, setS_event] = useState()
  const [Count, setCount] = useState();
  const [Status, setStatus] = useState();
  const [inviteId, setinviteId] = useState();
  const firstName = useSelector((state) => state?.auth?.credential?.User?.lastName)
  const dispatch = useDispatch()
  const userId = useSelector((state) => state?.auth?.credential?.User?._id)
  const refRBSheet2 = useRef();
  useEffect(() => {
    MESDATA()
  }, [])
  const MESDATA = async () => {
    const { data } = await MESINVITES(userId);
    setInvitations(data?.data?.invitation);
    setCount(data?.data?.invitationCount)

  };

  const RawBottomSheet = () => {
    const online = S_event?.eventId?.participationType[0]?.[0]?.distancielThumbnail
    const offline = S_event?.eventId?.participationType[0]?.[0]?.presentielThumbnail
    // console.log("S_eventS_event",S_event?.eventId?.participationType)
    // console.log("online=",online,"offline=", offline)
    return (
      <View
        style={{
          backgroundColor: 'white',
          height: height,
          borderTopRightRadius: width * 0.035,
          borderTopLeftRadius: width * 0.035,
        }}>
        <Image
          style={[
            styles.rawBottomImage,
            {
              borderTopLeftRadius: width * 0.035,
              borderTopRightRadius: width * 0.035,
            },
          ]}
          source={{
            uri: `${base_URL_IMAGE + S_event?.eventId?.eventImage}`,
          }}
        />
        <View
          style={{
            width: width * 0.15,
            height: height * 0.01,
            backgroundColor: 'white',
            borderRadius: width * 0.035,
            alignSelf: 'center',
            marginTop: height * 0.01,
            position: 'absolute',
          }}></View>
        <View style={styles.rawBottomFirstView}>
          <Text style={styles.rawBottomTitle}>{S_event?.eventId?.eventName + " "}</Text>
          <Text style={styles.rawBottomshortTitle}>avec{" " + S_event?.revelaturId?.firstName + " " + S_event?.revelaturId?.lastName}  </Text>
        </View>
        <View style={styles.rawBottomSecondView}>
          <Text style={styles.rawBottomdescription}>{S_event?.eventId?.category}</Text>
          <Text style={styles.rawBottomdateandtime}>
            {moment(S_event?.eventId?.beginAt).locale('fr').format('llll')}
            {/* de {S_event?.eventId?.startTime} à {S_event?.eventId?.endTime} */}
          </Text>
        </View>
        <View style={styles.rawBottomThirdView}>
          <Image
            style={styles.rawBottomtinyImage}
            source={require('../../assets/images/locLogo.png')}
          />
          <Text style={styles.rawBottomlocation}>

            {online == true ? "En ligne " : null}  {offline == true ? S_event?.eventId?.postalAddress + "," + " " + S_event?.eventId?.city + " " + S_event?.eventId?.zipCode : null}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={true}>
          <TouchableOpacity activeOpacity={1}>
            <Text style={styles.rawBottomMainDescription}>

              {S_event?.eventId?.description}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        {/* <TouchableOpacity
              style={styles.rawBottomButon}
              >
              <Text style={styles.rawBottomButtonText}>Je m’inscris !</Text>
            </TouchableOpacity> */}
      </View>
    );
  };
  const update = () => {
    var data = {
      status: Status,
      userId: userId

    }
    console.log(data.status, data.userId, inviteId);
    dispatch(StatusUpdate(data, inviteId)).then(() => {
      MESDATA()
    })
  }

  const INVITES = (item) => {
    //  console.log(item.item)
    return (
      <View style={[styles.selectedView, { backgroundColor: item?.item?.status == "pending" ? '#001d4f' : "#ffffff", }]}>
        <View style={styles.insideViewheading}>
          <Text style={[styles.mainheading2, { color: item?.item?.status == "pending" ? "#ffffff" : '#001d4f' }]}>
            {item?.item?.revelaturId?.firstName + " " + item?.item?.revelaturId?.lastName} t’invite à un événement ! {' '}
          </Text>
        </View>
        <Text style={[styles.flatlistheading2, { color: item?.item?.status == "pending" ? '#ffbc15' : '#001d4f' }]}>
          {item?.item?.eventId?.eventName + "-" + item?.item?.eventId?.city}
        </Text>
        <View
          style={{ flexDirection: 'row', marginBottom: height * 0.015 }}>
          <Text style={[styles.flatlistdescription2, { color: item?.item?.status == "pending" ? 'white' : '#ffbc15' }]}>
            {item?.item?.eventId?.category}
          </Text>
          <Text
            style={[
              styles.flatlistdate2,
              { color: item?.item?.status == "pending" ? '#ffbc15' : '#001d4f', fontFamily: 'Bebas Neue Pro Regular' },
            ]}>
            {moment(item?.item?.beginAt).locale('fr').format('ddd DD MMMM YYYY')}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => { setS_event(item?.item), refRBSheet2?.current?.open() }}
            style={[styles.yellowViewselected, { width: item?.item?.status == "pending" ? width * 0.31 : width * 0.45, }]}>
            <Text style={styles.yellowText}>Je consulte la fiche </Text>
          </TouchableOpacity>
          {item?.item?.status == "accepted" ?
            <TouchableOpacity
              activeOpacity={100}
              // onPress={() => { setStatus("accepted"), setinviteId(item?.item?._id), setModalVisible(true) }}
              style={[
                styles.acceptViewselected,
                { marginLeft: width * 0.0085 },
              ]}>
              <Text style={styles.acceptText}>Accepté</Text>
            </TouchableOpacity> : null
          }
          {
            item?.item?.status == "declined" ? <TouchableOpacity
              activeOpacity={100}
              // onPress={() => { setStatus("declined"), setinviteId(item?.item?._id), setModalVisible2(true) }}
              style={[
                styles.rejectViewselected,
                { marginLeft: width * 0.0085, borderColor: item?.item?.status == "pending" ? 'white' : 'red', },
              ]}>
              <Text style={[styles.rejectText, { color: item?.item?.status == "pending" ? 'white' : 'red' }]}>
                Refusé
              </Text>
            </TouchableOpacity> : null
          }

          {item?.item?.status == "pending" ? <>

            <TouchableOpacity
              onPress={() => { setStatus("accepted"), setinviteId(item?.item?._id), setModalVisible(true) }}
              style={[
                styles.acceptViewselected,
                { marginLeft: width * 0.0085 },
              ]}>
              <Text style={styles.acceptText}>J’accepte</Text>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => { setStatus("declined"), setinviteId(item?.item?._id), setModalVisible2(true) }}
              style={[
                styles.rejectViewselected,
                { marginLeft: width * 0.0085, borderColor: item?.item?.status == "pending" ? 'white' : 'red', },
              ]}>
              <Text style={[styles.rejectText, { color: item?.item?.status == "pending" ? 'white' : 'red' }]}>
                Je refuse
              </Text>
            </TouchableOpacity></> : null}

        </View>
      </View>
    )
  }
  return (

    <ImageBackground

      style={styles.background}
      source={require('../../assets/images/rbbg.png')}>
      <TouchableOpacity
        onPress={props.onPress}
      >
        <Image
          style={styles.circle}
          source={require('../../assets/images/prev.png')}
        />
      </TouchableOpacity>
      <Text style={styles.mainheading}>MES INVITATIONS</Text>
      {Invitations?.length !== 0 ? <FlatList
        // showsHorizontalScrollIndicator={true}
        style={{ marginTop: height * 0.02, marginBottom: height * 0.08 }}
        // scrollEnabled={true}
        data={Invitations}
        keyExtractor={item => item._id}
        renderItem={INVITES}
      /> :
        <Image
          style={{
            resizeMode: "contain",
            alignSelf: "center",
            marginTop: height * 0.06
          }}
          source={require("../../assets/images/noinvites.png")} />

      }
      <RBSheet
        ref={refRBSheet2}
        height={height * 0.95}
        closeOnDragDown={true}
        closeOnPressMask={false}
        // dragFromTopOnly={false}

        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          draggableIcon: {
            backgroundColor: 'transparent',
            paddingHorizontal: 25,
          },
          container: {
            borderTopLeftRadius: width * 0.08,
            borderTopRightRadius: width * 0.08,
            // position:'absolute',
            backgroundColor: 'transparent',
          },
        }}>
        <RawBottomSheet />
      </RBSheet>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.ModalView}>
            <ImageBackground
              imageStyle={{ borderRadius: width * 0.08 }}
              style={styles.ModalImage}
              source={require('../../assets/images/backgroundImage.png')}>
              <>
                <Text style={styles.modalText}>
                  <Text style={{ fontFamily: 'Bebas Neue Pro Bold' }}> {firstName}, </Text>
                  veux-tu vraiment
                  t’inscrire à cet événement ?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: width * 0.045,
                  }}>
                  <TouchableOpacity
                    onPress={() => { update(), setModalVisible(!modalVisible); }}
                    style={styles.Butons}>

                    <Text style={styles.btn}>Oui</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.Butons}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.btn}>Non</Text>
                  </TouchableOpacity>
                </View>
              </>
            </ImageBackground>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.ModalView}>
            <ImageBackground
              imageStyle={{ borderRadius: width * 0.08 }}
              style={styles.ModalImage}
              source={require('../../assets/images/Background2.png')}>
              <>
                <Text style={[styles.modalText, { marginTop: height * 0.015, marginBottom: -height * 0.015, }]}>
                  <Text style={{ fontFamily: 'Bebas Neue Pro Bold' }}> {firstName}, </Text>
                  veux-tu vraiment
                  refuser l’invitation
                  à cet événement ?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: width * 0.045,
                  }}>
                  <TouchableOpacity
                    onPress={() => { update(), setModalVisible2(!setModalVisible2) }}
                    style={styles.Butons}>
                    <Text style={styles.btn}>Oui</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.Butons}
                    onPress={() => {
                      setModalVisible2(!setModalVisible2);
                    }}>
                    <Text style={styles.btn}>Non</Text>
                  </TouchableOpacity>
                </View>
              </>
            </ImageBackground>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  )
}

export default Abcd

const styles = StyleSheet.create({
  background: {
    // width: width,
    // height: height * 1.04,
    flex: 1,
    resizeMode: 'contain',
  }, mainheading: {
    fontSize: width * 0.072,
    color: '#001d4f',
    // alignSelf:'center',
    marginLeft: width * 0.161,
    // fontWeight: 'bold',
    marginBottom: height * 0.045,
    // marginTop: height * 0.1,
    fontFamily: 'Bebas Neue Pro Bold',
  },

  circle: {
    width: Platform.OS == "ios" ? width * 0.089 : width * 0.11,
    height: height * 0.055,
    // backgroundColor: '#ffbc15',
    // borderRadius: width * 0.1,
    marginTop: Platform.OS == "ios" ? width * 0.11 : width * 0.13,
    marginLeft: width * 0.027,
    resizeMode: 'contain',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: width * 0.08,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // marginTop: 22
  },
  ModalView: {
    width: width * 0.8,
    height: height * 0.22,
    borderRadius: width * 0.08,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    // marginTop: height * 0.3,
    alignSelf: 'center',
  },
  ModalImage: {
    width: width * 0.8,
    height: height * 0.22,
    // borderRadius: width * 0.08,
    resizeMode: 'contain',
  },
  Butons: {
    width: width * 0.2,
    height: height * 0.065,
    backgroundColor: '#001d4f',
    marginTop: height * 0.028,
    marginLeft: width * 0.1,
    borderRadius: width * 0.012,
    alignSelf: 'center',
    justifyContent: 'center',
    // padding:width*0.04
  },
  btn: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: width * 0.04,
    fontFamily: 'Bebas Neue Pro Bold'
  },
  modalText: {
    textAlign: 'center',
    fontSize: width * 0.055,
    lineHeight: height * 0.035,
    // fontWeight: '400',
    color: '#081a4f',
    marginTop: height * 0.03,
    paddingHorizontal: width * 0.045,
    alignSelf: 'center',
    textTransform: 'uppercase',
    width: width * 0.65,
    letterSpacing: 0.5,
    fontFamily: 'Bebas Neue Pro Regular'
  },
  headerView: {
    // padding:width*0.02,
    // backgroundColor:'white',
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.11,
    borderRadius: width * 0.05,
    marginTop: height * 0.024,
    marginBottom: height * 0.008,
  },
  headerText: {
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.008,
    fontSize: width * 0.049,
    color: '#001d4f',
    backgroundColor: 'white',
    borderRadius: width * 0.1,
    fontFamily: 'Bebas Neue Pro Bold',
    letterSpacing: 0.3,
  },
  container: {
    marginTop: height * 0.1,
    marginBottom: height * 0.1,
  },
  background: {
    width: width * 1,
    height: height
    // borderTopLeftRadius:width*0.08,
    // borderRadius:10
  },
  img: {
    width: width * 0.09,
    height: height * 0.049,
    marginRight: width * 0.02,
  },
  mainText: {
    fontSize: width * 0.065,
    color: '#001d4f',
    textTransform: 'uppercase',
    fontFamily: 'Bebas Neue Pro Bold',
  },
  viewone: {
    // backgroundColor:'white',
    // width:width*0.7,
    // height:height*0.08,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width * 0.1,
    marginTop: height * 0.058,
  },
  simpleText: {
    fontSize: width * 0.048,
    color: '#000000',
    fontFamily: 'Bebas Neue Pro Regular',
    letterSpacing: 0.25,
  },
  viewtwo: {
    // backgroundColor:'white',
    // width:width*0.7,
    // height:height*0.08,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width * 0.21,
  },
  searcherView: {
    width: width * 0.82,
    alignSelf: 'center',
    height: height * 0.05,
    // backgroundColor:'white',
    borderWidth: 1,
    borderColor: '#001d4f',
    borderRadius: width * 0.05,
    marginTop: height * 0.02,
    justifyContent: 'center',
  },
  imgtwo: {
    width: width * 0.047,
    height: height * 0.055,
    resizeMode: 'contain',
    marginLeft: width * 0.028,
  },
  txtinput: {
    width: width * 0.6,
    height: height * 0.05,
    // borderWidth:1,
    // borderColor:'red',
    position: 'absolute',
    alignSelf: 'center',
  },
  // headerView: {
  //   // padding:width*0.02,
  //   // backgroundColor:'white',
  //   elevation: 8,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginLeft: width * 0.11,
  //   borderRadius: width * 0.05,
  //   marginTop: height * 0.024,
  //   marginBottom: height * 0.008,
  // },
  eventoneView: {
    width: width * 0.85,
    height: height * 0.325,
    backgroundColor: 'white',
    borderRadius: width * 0.1,
    alignSelf: 'center',
    marginTop: height * 0.03,
    elevation: 10,
  },

  flatlistimage: {
    width: width * 0.65,
    height: height * 0.18,
    resizeMode: 'contain',
    marginLeft: width * 0.1,
    borderRadius: width * 0.03,
    marginTop: width * 0.04,
  },
  flatlistView: {
    // backgroundColor:'red',
    // borderBottomLeftRadius:width*0.10
  },
  flatlistheading: {
    fontSize: width * 0.055,
    color: '#001d4f',
    marginLeft: width * 0.13,
    fontFamily: 'Bebas Neue Pro Bold',
    letterSpacing: 0.2,
    marginTop: height * 0.003,
  },
  flatlistdescription: {
    fontSize: width * 0.042,
    color: '#ffbc15',
    marginLeft: width * 0.14,
    fontFamily: 'Bebas Neue Pro Regular',
  },
  flatlistdate: {
    fontSize: width * 0.04,
    color: '#001d4f',
    marginLeft: width * 0.02,
    fontFamily: 'Bebas Neue Pro Regular',
    marginTop: height * 0.004,
  },
  headerText: {
    paddingHorizontal: width * 0.08,
    paddingVertical: height * 0.008,
    fontSize: width * 0.049,
    color: '#001d4f',
    backgroundColor: 'white',
    borderRadius: width * 0.1,
    fontFamily: 'Bebas Neue Pro Bold',
    letterSpacing: 0.3,
  },
  QRView: {
    backgroundColor: 'white',
    position: 'absolute',
    marginTop: height * 0.01,
    marginLeft: width * 0.015,
    borderRadius: width * 0.031,
  },
  QRText: {
    fontSize: width * 0.042,
    fontFamily: 'Bebas Neue Pro Bold',
    color: '#ffbc15',
    paddingHorizontal: width * 0.037,
    borderRadius: width * 0.1,
    paddingVertical: height * 0.0057,
  },


  selectedView: {
    width: width * 0.8,
    height: Platform.OS == "ios" ? height * 0.21 : height * 0.24,
    borderRadius: width * 0.06,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginVertical: height * 0.01,
    paddingBottom: height * 0.015
  },
  simpleView: {
    width: width * 0.8,
    height: height * 0.2,
    backgroundColor: 'white',
    borderRadius: width * 0.06,
    alignSelf: 'center',
    marginTop: height * 0.035,
    elevation: 10,
  },
  yellowView: {
    width: width * 0.47,
    height: height * 0.04,
    backgroundColor: '#ffbc15',
    borderRadius: width * 0.15,
    marginLeft: width * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptView: {
    width: width * 0.2,
    height: height * 0.04,
    backgroundColor: '#00b453',
    borderRadius: width * 0.15,
    marginLeft: width * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectView: {
    width: width * 0.2,
    height: height * 0.04,
    borderRadius: width * 0.15,
    marginLeft: width * 0.03,
    borderWidth: 1,
    borderColor: '#ef0b0b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yellowViewselected: {

    height: height * 0.04,
    backgroundColor: '#ffbc15',
    borderRadius: width * 0.15,
    marginLeft: width * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptViewselected: {
    width: width * 0.2,
    height: height * 0.04,
    backgroundColor: '#00b453',
    borderRadius: width * 0.15,
    marginLeft: width * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectViewselected: {
    width: width * 0.2,
    height: height * 0.04,
    borderRadius: width * 0.15,
    marginLeft: width * 0.03,
    borderWidth: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  mainheading2: {
    fontSize: width * 0.049,
    color: '#001d4f',
    fontFamily: 'Bebas Neue Pro Bold',
    letterSpacing: 0.2,
    marginLeft: width * 0.055,
    textTransform: 'uppercase',
  },
  insideViewheading: {
    marginVertical: height * 0.02,
  },
  flatlistheading2: {
    fontSize: width * 0.055,
    color: '#001d4f',
    marginLeft: width * 0.055,
    fontFamily: 'Bebas Neue Pro Bold',
    letterSpacing: 0.2,
    marginTop: height * 0.003,
  },
  flatlistdescription2: {
    fontSize: width * 0.042,
    color: '#ffbc15',
    marginLeft: width * 0.055,
    fontFamily: 'Bebas Neue Pro Regular',
  },
  flatlistdate2: {
    fontSize: width * 0.037,
    color: '#001d4f',
    marginLeft: width * 0.05,
    fontFamily: 'Bebas Neue Pro Regular',
    // marginTop: height * 0.004,
  },
  yellowText: {
    fontSize: width * 0.035,
    color: 'white',
    fontFamily: 'Bebas Neue Pro Bold',
  },
  acceptText: {
    fontSize: width * 0.035,
    fontFamily: 'Bebas Neue Pro Bold',
    color: 'white',
  },
  rejectText: {
    fontSize: width * 0.035,
    color: '#ef0b0b',
    fontFamily: 'Bebas Neue Pro Bold',
  },
  tag: {
    position: 'absolute',
    backgroundColor: '#ffbc15',
    padding: width * 0.003,
    width: width * 0.055,
    borderRadius: Platform.OS === 'ios' ? 50 : width * 0.045,
    textAlign: 'center',
    fontSize: width * 0.035,
    fontWeight: '800',
    marginLeft: width * 0.039,
    marginTop: height * 0.015,
    color: 'black',
    alignSelf: 'flex-end',
  }, rawBottomImage: {
    width: width * 1,
    height: height * 0.4,
  },
  rawBottomTitle: {
    // fontSize: width * 0.06,
    color: '#081a4f',
    // fontWeight: 'bold',
    marginTop: height * 0.012,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.06,
    // paddingHorizontal:width*0.017,
    textAlign: 'center',
    letterSpacing: 0.4,
  },
  rawBottomshortTitle: {
    // fontSize: width * 0.05,
    color: '#081a4f',
    marginTop: 10,
    // fontStyle: 'italic',
    fontFamily: 'Bebas Neue Pro Italic',
    fontSize: width * 0.058,
  },
  rawBottomFirstView: {
    flexDirection: 'row',
    // justifyContent:'space-around',
    // paddingHorizontal: width*0.01,
    // justifyContent: 'center',
    marginLeft: width * 0.05,
  },
  rawBottomdescription: {
    color: '#fdd76e',
    // fontSize: width * 0.037,
    fontSize: width * 0.048,
    fontFamily: 'Bebas Neue Pro Regular',
  },
  rawBottomdateandtime: {
    color: '#42547b',
    fontSize: width * 0.04,
    // paddingHorizontal: 3,
    fontSize: width * 0.05,
    fontFamily: 'Bebas Neue Pro Regular',
    marginLeft: width * 0.012,
  },
  rawBottomSecondView: {
    flexDirection: 'row',
    marginLeft: width * 0.05,
  },
  rawBottomlocation: {
    color: '#fdd460',
    // fontSize: width * 0.045,
    // fontWeight: 'bold',
    // fontStyle: 'italic',
    // paddingHorizontal: 10,
    fontSize: width * 0.05,
    fontFamily: 'Bebas Neue Pro Bold Italic',
    marginLeft: width * 0.015,
  },
  rawBottomtinyImage: {
    width: width * 0.05,
    height: height * 0.03,
    resizeMode: 'contain',
  },
  rawBottomThirdView: {
    flexDirection: 'row',
    // paddingHorizontal: 8,
    marginVertical: height * 0.015,
    marginLeft: width * 0.05,
  },
  rawBottomMainDescription: {
    color: '#9f9f9f',
    // paddingHorizontal: 8,
    fontSize: width * 0.052,
    fontFamily: 'Bebas Neue Pro Book',
    marginLeft: width * 0.05,
    letterSpacing: 0.25,
    marginRight: width * 0.07,
  },
  rawBottomButon: {
    backgroundColor: '#081a4f',
    alignContent: 'center',
    justifyContent: 'center',
    width: width * 0.6,
    borderRadius: width * 0.028,
    alignSelf: 'center',
    // margin: width * 0.22,
    marginBottom: height * 0.115,
    marginTop: height * 0.005,
    height: height * 0.06,
    // height:height*0.0,
  },
  rawBottomButtonText: {
    color: 'white',
    // padding: 14,
    fontSize: width * 0.048,
    letterSpacing: 0.15,
    textAlign: 'center',
    fontFamily: 'Bebas Neue Pro Bold',
  },
})