import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Searcher from '../../components/Searcher';
import RBSheet from 'react-native-raw-bottom-sheet';
import QRCode from 'react-native-qrcode-svg';
import Topselector from './Topselector';
import { useSelector, useDispatch } from 'react-redux';
import { getHistoryofevent, getSubscribedEvents, MESINVITES, Stackprofile, UserDetail } from '../../redux/actions/user.action';
import { base_URL_IMAGE } from '../../config/config';
// import moment from 'moment';
import moment from 'moment/min/moment-with-locales'
import Colors from '../../components/Colors';
import MyStatusBar from '../../components/Statusbar';
const { width, height } = Dimensions.get('window');
import Abcd from './Abcd';


const HomeScreens = ({ navigation }) => {
  // const [textInput, setTextInput] = useState('');


  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const dekhnaData = useSelector((state) => state)
  const [getSubEv, setgetSubEv] = useState()
  const [eventhistory, seteventhistory] = useState()
  const [getSub, setgetSub] = useState()
  const [EventID, setEventID] = useState()
  const [ProfilStatus, setProfilStatus] = useState(false)
  const firstName = useSelector(state => state?.auth?.User?.data?.lastName)
  const Revelator = useSelector(state => state?.auth?.User?.relatedRevelateur)
  const RID = useSelector(state => state?.auth?.credential?.User?.relatedRevelateur)
  const Fname = useSelector(state => state?.auth?.User?.data?.firstName)
  const userdataFname = useSelector(state => state?.auth?.credential?.User?.lastName)
  const UserFirstName = useSelector(state => state?.auth?.credential?.User?.firstName)
  const userId = useSelector((state) => state?.auth?.credential?.User?._id)
  const dispatch = useDispatch()
  const ok = useSelector(state => state?.auth?.progress)
  const [detail, setDetail] = useState()
  const [Count, setCount] = useState();
  const [lstNa,setlstName]=useState()
  const [twister, settwister] = useState(true)
  
  useEffect(() => {
    dispatch(Stackprofile(userId, (data) => {
      // console.log("my lord ",data.success)
      if (data.success == false) {
        navigation.navigate("ProfileScreens")
      }
    }));
  }, [])
  useEffect(() => {
    UserInfo()
  }, [detail,ok])
  const UserInfo = async () => {
    const { data } = await UserDetail(userId)
    setDetail(data?.User?.progress)
    setlstName(data?.User?.firstName)

  }
//  console.log("home details",lstNa)

 const yes =ok==undefined?detail:ok
  useEffect(() => {
    fetchData();
    fetchhisory();
  }, [])
  useEffect(() => {
    MESDATA()
  }, [Count])
  const MESDATA = async () => {
  
    const { data } = await MESINVITES(userId);
   
    setCount(data?.data?.invitationCount)
   
    
  };
   

  const fetchData = async () => {
    const { data } = await getSubscribedEvents(userId)
    setgetSubEv(data)
    console.log("jlksahdflkhaslkfhsah",data)
  };
  const fetchhisory = async () => {
    const { data } = await getHistoryofevent(userId)
    seteventhistory(data)
    console.log("histuiy  hdsakjdb",data)
  };

  const eventtwo = [
    {
      id: 1,
      title: 'Nom de l’événement - Lieu',
      description: 'Catégorie de l’événement',
      date: 'Lun 23 Septembre',
      image: require('../../assets/images/backgroundImage.png'),
    },
    {
      id: 2,
      title: 'Nom de l’événement - Lieu',
      description: 'Catégorie de l’événement',
      date: 'Lun 23 Septembre',
      image: require('../../assets/images/backgroundImage.png'),
    },
    {
      id: 3,
      title: 'Nom de l’événement - Lieu',
      description: 'Catégorie de l’événement',
      date: 'Lun 23 Septembre',
      image: require('../../assets/images/backgroundImage.png'),
    },
    {
      id: 4,
      title: 'Nom de l’événement - Lieu',
      description: 'Catégorie de l’événement',
      date: 'Lun 23 Septembre',
      image: require('../../assets/images/backgroundImage.png'),
    },
    {
      id: 5,
      title: 'Nom de l’événement - Lieu',
      description: 'Catégorie de l’événement',
      date: 'Lun 23 Septembre',
      image: require('../../assets/images/backgroundImage.png'),
    },
  ];

  const RawBottomSheet = () => {

    let b = getSub?.item?.subsIdAdminAndRevelature?.filter((i) => i._id === Revelator || RID);
    let c = b?.[0]?.firstName + " " + b?.[0]?.lastName
    let d = null
    if (getSub?.item?.subsIdAdminAndRevelature[0]?.firstName && getSub?.item?.subsIdAdminAndRevelature[0]?.lastName) {
      d = getSub?.item?.subsIdAdminAndRevelature[0]?.firstName + " " + getSub?.item?.subsIdAdminAndRevelature[0]?.lastName
    }
    const online=getSub?.item?.participationType[0]?.[0]?.distancielThumbnail
    const offline=getSub?.item?.participationType[0]?.[0]?.presentielThumbnail
    
//     console.log(online,offline )
// console.log("detailigof ext",getSub?.item)
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
            uri: `${base_URL_IMAGE + getSub?.item?.eventImage}`,
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
          <Text style={styles.rawBottomTitle}>{getSub?.item?.eventName}{' '}</Text>
          {
            d != null ?
              <Text style={styles.rawBottomshortTitle}>avec {d} </Text> : null
          }
        </View>
        <View style={styles.rawBottomSecondView}>
          <Text style={styles.rawBottomdescription}>{getSub?.item?.category}</Text>
          <Text style={styles.rawBottomdateandtime}>
            {moment(getSub?.item?.beginAt).locale('fr').format('DD/MM/yyyy')} de {getSub?.item?.startTime} à {getSub?.item?.endTime}
          </Text>
        </View>
        <View style={styles.rawBottomThirdView}>
          <Image
            style={styles.rawBottomtinyImage}
            source={require('../../assets/images/locLogo.png')}
          />
          <Text style={styles.rawBottomlocation}>
          {online==true?"En ligne ":null} {offline==true?getSub?.item?.postalAddress+","+" "+getSub?.item?.city+" "+getSub?.item?.zipCode:null}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={true}>
          <TouchableOpacity activeOpacity={1}>
            <Text style={styles.rawBottomMainDescription}>
              {getSub?.item?.description}
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

  const eventonefunc = item => {
    return (
      <>
        <View style={styles.flatlistView}>
          <ImageBackground
            imageStyle={{ borderRadius: width * 0.03, borderWidth:0.4, borderColor:"#b9b9b9" }}
            style={styles.flatlistimage}
            source={{ uri: `${base_URL_IMAGE + item?.item?.eventImage}` }}>
            <TouchableOpacity
              style={styles.QRView}
              onPress={() => {
                setEventID(item?.item?._id)
                setModalVisible(true);
              }}>
              <Text style={styles.QRText}>Mon QR Code</Text>
            </TouchableOpacity>
          </ImageBackground>
          <View style={{ flexDirection: 'column', justifyContent: 'space-around', width: '98%', alignSelf: 'center', height: 50, marginVertical: 10 }}>
            <TouchableOpacity
              onPress={() => {
                setgetSub(item)
                refRBSheet2.current.open();
              }}>
              <Text style={styles.flatlistheading}> {item.item.eventName}-{item?.item?.city} </Text>

              <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingRight: width * 0.02, alignItems: "center" }}>
                <Text style={styles.flatlistdescription}>
                  {item?.item?.category}
                </Text>
                <Text style={styles.flatlistdate}> {moment(item?.item?.beginAt).locale('fr').format('ddd DD MMMM ')} </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible(false);
          }}>
          <TouchableOpacity
            onPress={() => { setModalVisible(false); }}
            style={styles.QRModalView}>
            <View style={styles.QRModalInnerView}>
              <TouchableOpacity
                onPress={() => {
                  // setModalVisible(false);
                }}>
                <QRCode size={170} value={JSON.stringify({ userId: userId, eventId: EventID, lastName: firstName || userdataFname, firstName: Fname || UserFirstName })} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    );
  };
  const eventtwofunc = (item) => {
    console.log("itemssssss",item)
    console.table(item?.item)
    
    return (
      <>
        <View style={styles.flatlistView}>
          <ImageBackground
            imageStyle={{ borderRadius: width * 0.03, borderWidth:0.4, borderColor:"#b9b9b9" }}
            style={styles.flatlistimage}
            source={{ uri: `${base_URL_IMAGE + item?.item?.eventImage}` }}>
            <TouchableOpacity
              style={styles.QRView}
              onPress={() => {
                setEventID(item?.item?._id)
                setModalVisible(true);
              }}>
              <Text style={styles.QRText}>Mon QR Code</Text>
            </TouchableOpacity>
          </ImageBackground>
          <View style={{ flexDirection: 'column', justifyContent: 'space-around', width: '98%', alignSelf: 'center', height: 50, marginVertical: 10 }}>
            <TouchableOpacity
              onPress={() => {
                setgetSub(item)
                refRBSheet2.current.open();
              }}>
              <Text style={styles.flatlistheading}> {item.item.eventName}-{item?.item?.city} </Text>

              <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingRight: width * 0.02, alignItems: "center" }}>
                <Text style={styles.flatlistdescription}>
                  {item?.item?.category}
                </Text>
                <Text style={styles.flatlistdate}> {moment(item?.item?.beginAt).locale('fr').format('ddd DD MMMM ')} </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible(false);
          }}>
          <TouchableOpacity
            onPress={() => { setModalVisible2(false); }}
            style={styles.QRModalView}>
            <View style={styles.QRModalInnerView}>
              <TouchableOpacity
                onPress={() => {
                  // setModalVisible(false);
                }}>
                <QRCode size={170} value={JSON.stringify({ userId: userId, eventId: EventID, lastName: firstName || userdataFname, firstName: Fname || UserFirstName })} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    );
  };
  const headerdata = [
    {
      id: 1,
      name: 'Mes invitations',
      notification: 1,
    },
    {
      id: 2,
      name: 'Les prochains événements',
      notification: 2,
    },
    {


      id: 3,
      name: 'Mes événements favoris',
      notification: 0,
    },
  ];
  // console.log(Count,"counts")
  const header = (item, index) => {
    return (
      <>
        {
          item?.item?.id == 1 && Count >0 ? (
            <View
            style={{
              position: "absolute",
              backgroundColor: "#ffbc15",
              borderRadius: width * 0.05/2,
              height: width * 0.05,
              width: width * 0.05,
              // alignSelf:"flex-end",
              // marginBottom:height*0.1,
              // padding:width*0.01,
              marginLeft: width * 0.29,
              marginBottom: -height * 0.05,
              zIndex: 9999,
              marginTop: height * 0.01,
            }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: width * 0.035,
                  fontWeight: "bold"
                }}
              >{Count}</Text>
            </View>
          ) : null

        }
        <TouchableOpacity
          onPress={() => { item?.item?.id == 1 ? settwister(false) : null,MESDATA() }}
          style={{
            height: height * 0.05,
            backgroundColor: "white",
            marginHorizontal: width * 0.02,
            justifyContent: "center",
            borderRadius: width * 0.05,
            paddingHorizontal: width * 0.04,
            elevation: 10,
            marginTop: height * 0.02,
            marginBottom: height * 0.01,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

          }}
        >

          <Text
            style={{
              fontSize: width * 0.049,
              color: '#001d4f',
              fontFamily: 'Bebas Neue Pro Bold',
            }}
          >
            {item.item.name}
          </Text>


        </TouchableOpacity></>
    );
  };
  return (
    <>
      {
        twister == true ? <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar barStyle='default' backgroundColor='transparent' />
          <ImageBackground
            source={require('../../assets/images/homebg.png')}
            style={styles.background}>
            <View style={styles.viewone}>
              <Image
                style={styles.img}
                source={require('../../assets/images/hifi.png')}
              />
              <Text style={styles.mainText}>Bienvenue, {lstNa}!</Text>
            </View>
            <View style={styles.viewtwo}>
              {
                yes == 1 ? <Text
                  style={{
                    color: Colors.theme_color,
                    fontFamily: 'Bebas Neue Pro Bold',
                    fontSize: Platform.OS == "ios" ? width * 0.045 : width * 0.035,
                    fontStyle: "italic"
                  }}
                >
                  {/* Fais entendre ta voie ! */}
                  FAIS ENTENDRE TA VOIE !
                </Text> : 
               <TouchableOpacity
               onPress={()=>{navigation.navigate("ProfileScreens")}}
               >
                 <Text style={styles.simpleText}>
                  N’oublie pas de
                  <Text> </Text>
                  <Text
                    style={{
                      color: '#ffbc15',
                      fontFamily: 'Bebas Neue Pro Bold',
                      letterSpacing: 0.8,
                    }}>
                    compléter ton profil
                  </Text>
                  <Text> </Text>!
                </Text>
               </TouchableOpacity>
              }
            </View>
            {/* {/ seracher  /} */}
            <Searcher />

            {/* <Topselector mes={()=>settwister(false)}/> */}
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={headerdata}
              keyExtractor={item => item.id}
              renderItem={header}
            />
            <View style={styles.eventoneView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: 'center',
                  height: Platform.OS == "ios" ? height * 0.05 : height * 0.04
                }}
              >
                <Text style={styles.mainHeading}> Mes billets d'événements</Text>
                <TouchableOpacity
                  onPress={() => fetchData()}
                  style={{
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignSelf: "center",
                    marginRight: width * 0.05,
                    // padding:width*0.00,
                    width: width * 0.18,
                    elevation: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    borderRadius: width * 0.02,
                    height: height * 0.025,
                    alignItems: "center",
                    // marginBottom:-height*0.01
                  }}
                >
                  <Text
                    style={{
                      color: Colors.theme_color,
                      fontSize: width * 0.03
                    }}
                  >Rafraîchir</Text>
                </TouchableOpacity>
              </View>
              {getSubEv?.data?.length == 0 ?
                <Text
                  style={{
                    fontSize: width * 0.055,
                    alignSelf: "center",
                    textAlign: "center",
                    marginTop: height * 0.085,
                    fontFamily: "Bebas Neue Pro Bold",
                    width: width * 0.5,
                    color: "#afafaf"
                  }}
                >
                  Inscris-toi à un événement pour le retrouver ici
                </Text> :
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={getSubEv?.data}
                  keyExtractor={item => item.id}
                  renderItem={eventonefunc}
                />}
            </View>
            <View style={styles.EVENtTwo}>
              <Text style={[styles.mainHeading, { paddingTop: 10 }]}>Mon historique d’événements</Text>
              {eventhistory?.data?.length==0?
                
                <Text
                  style={{
                    fontSize: width * 0.055,
                    alignSelf: "center",
                    textAlign: "center",
                    marginTop: height * 0.085,
                    fontFamily: "Bebas Neue Pro Bold",
                    width: width * 0.5,
                    color: "#afafaf"
                  }}
                >
                  Tu retrouveras ici les événements terminés auxquels tu as participé 
                </Text> :
                <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={eventhistory?.data}
                keyExtractor={item => item.id}
                renderItem={eventtwofunc}
              />}
             
            </View>
          </ImageBackground>
          <View>
            <RBSheet
              ref={refRBSheet2}
              height={height * 0.95}
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
                  backgroundColor: 'transparent',
                },
              }}>
              <RawBottomSheet />
            </RBSheet>
          </View>

        </ScrollView> : <Abcd
          onPress={() => { settwister(true) }}
        />
      }
    </>
  );
};

export default HomeScreens;

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.1,
    marginBottom: height * 0.1,
  },
  background: {
    width: width,
    height: height * 1.04,
    resizeMode: 'contain',
  },
  img: {
    width: width * 0.09,
    height: height * 0.049,
    marginRight: width * 0.02,
    resizeMode: "contain"
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
  headerView: {
    // padding:width*0.02,
    // backgroundColor:'white',
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.11,
    borderRadius: width * 0.05,
    marginTop: height * 0.024,
    marginBottom: height * 0.008,
  },
  eventoneView: {
    width: width * 0.85,
    height: height * 0.325,
    backgroundColor: 'white',
    borderRadius: width * 0.1,
    alignSelf: 'center',
    marginTop: height * 0.02,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    paddingHorizontal: width * 0.035,
  },
  EVENtTwo: {
    width: width * 0.85,
    height: height * 0.325,
    backgroundColor: 'white',
    borderRadius: width * 0.1,
    alignSelf: 'center',
    marginTop: height * 0.02,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    paddingHorizontal: width * 0.035,
    marginBottom:height*0.035
  },
  mainHeading: {
    fontSize: width * 0.056,
    color: '#001d4f',
    marginLeft: width * 0.025,
    // marginTop: height * 0.01,
    fontFamily: 'Bebas Neue Pro Bold',
    
  },
  flatlistimage: {
    width: width * 0.65,
    height: height * 0.18,
    resizeMode: 'contain',
    marginLeft: width * 0.037,
    borderRadius: width * 0.03,
    marginTop: width * 0.04,
  },
  flatlistView: {
    marginTop:-height*0.015
    // height:100
    // backgroundColor:'red',
    // borderBottomLeftRadius:width*0.10
    // paddingHorizontal:width*0.01
    // width:width*0.75,
  },
  flatlistheading: {
    fontSize: width * 0.055,
    color: '#001d4f',
    marginLeft: width * 0.065,
    fontFamily: 'Bebas Neue Pro Bold',
    letterSpacing: 0.2,
    marginTop: height * 0.003,
  },
  flatlistdescription: {
    fontSize: width * 0.042,
    color: '#ffbc15',
    marginLeft: width * 0.075,
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
    backgroundColor: '#f9f9f9',
    position: 'absolute',
    marginTop: height * 0.01,
    marginLeft: width * 0.015,
    borderRadius: width * 0.031,
    borderWidth:0.4,
    borderColor:'#b9b9b9'
  },
  QRText: {
    fontSize: width * 0.042,
    fontFamily: 'Bebas Neue Pro Bold',
    color: '#ffbc15',
    paddingHorizontal: width * 0.037,
    borderRadius: width * 0.1,
    paddingVertical: height * 0.0057,
  },
  circle: {
    width: width * 0.125,
    height: height * 0.065,
    // backgroundColor: '#ffbc15',
    // borderRadius: width * 0.1,
    marginTop: width * 0.037,
    marginLeft: width * 0.027,
  },
  mainheading: {
    fontSize: width * 0.072,
    color: '#001d4f',
    // alignSelf:'center',
    marginLeft: width * 0.161,
    // fontWeight: 'bold',
    marginBottom: height * 0.045,
    marginTop: height * 0.013,
    fontFamily: 'Bebas Neue Pro Bold',
  },
  selectedView: {
    width: width * 0.8,
    height: height * 0.215,
    backgroundColor: '#001d4f',
    borderRadius: width * 0.06,
    alignSelf: 'center',
    elevation: 10,
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
    width: width * 0.3,
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
    borderColor: 'white',
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
    marginTop: height * 0.004,
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
  QRModalView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
  },
  QRModalInnerView: {
    width: width * 0.5,
    height: height * 0.25,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rawBottomImage: {
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
});
