import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  ImageBackground,
  StatusBar,
  Platform
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import DatePicker from 'react-native-modern-datepicker';
import { it } from 'node:test';
import D_Apicker from './DatePicker';
import Inputs from "../../components/Inputs"
import { useDispatch, useSelector } from 'react-redux';
import { ageVerification, ESPORTCHECK, getEvents, getEventsByID, ProfileChecking, Subscribe_Event, Un_Subscribe_Event, UserDetail } from '../../redux/actions/user.action';
import { base_URL, base_URL_IMAGE } from '../../config/config';
import moment from 'moment/min/moment-with-locales'
import Colors from '../../components/Colors';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const EventsScreens = ({ navigation }) => {
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const [data, setdata] = useState();
  const [data2, setdata2] = useState(1);
  const [input, SetInput] = useState('');
  const [ShowModal, SetShowModal] = useState(false);
  const [mymodal, setmymodal] = useState(false);
  const [kiffver, setkiffver] = useState(false);
  const [unsubmodal, setunsubmodal] = useState(false);
  const [modalsec, Setmodalsec] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState()
  const [eventsDetail, setEventsDetail] = useState()
  const [Power, setPower] = useState(false)
  const [BTN, setBTN] = useState(false)
  const [ageVer, setAgeVer] = useState()
  const [detail, setDetail] = useState()
  const [ECHECK, setECHECK] = useState()
  
  // console.log("umar ", ageVer)
  const userId = useSelector((state) => state?.auth?.credential?.User?._id)
  const Name = useSelector((state) => state?.auth?.credential?.User?.lastName)

  useEffect(() => {
    UserInfo()
  }, [])
  const UserInfo = async () => {
    const { data } = await UserDetail(userId)
    setDetail(data?.User)

  }
  // console.log("progress details", detail)
  const DOB = useSelector((state) => state?.auth?.credential?.User?.birthDate)
  const dispatch = useDispatch()
  const Revelator = useSelector(state => state?.auth?.User?.relatedRevelateur)
  const RID = useSelector(state => state?.auth?.credential?.User?.relatedRevelateur)
  useEffect(() => {
    event_by_Id()
  }, [data])

  useEffect(() => {
    fetchData();
  }, [])


  const fetchData = async () => {
    const { data } = await dispatch(getEvents());

    setEvents(data)
  };
  // console.log("eventsss",events?.data?.length)
  const Profile_Checking = async () => {
    const { data } = await dispatch(ProfileChecking(userId, setPower, setBTN));

  }
  const Esport=async()=>{
   
    const  Mydata  = await ESPORTCHECK(userId) 
    // console.log("bhai yahan bhi aja ",Mydata)
    setECHECK(Mydata)
    
  }
  // console.log("Poyon OIl",ECHECK)
 
  const EKIFFCHECK=()=>{
    if(ECHECK==true){
      SubscribeEvent();
      refRBSheet.current.close(),
      setmymodal(false)
    }else{
      setTimeout(() => {
        setkiffver(true)
      }, 200)
    
      setmymodal(false)
    }
 }
  const event_by_Id = async () => {

    const EventByID = await getEventsByID(data)

    setEventsDetail(EventByID)
  }

  const SubscribeEvent = () => {
    dispatch(Subscribe_Event(data, userId)).then(() => {
      fetchData()
      event_by_Id()
    })
  }
  const UnSubscribe = () => {
    dispatch(Un_Subscribe_Event(data, userId)).then(() => {
      fetchData()
      event_by_Id()
    })
  }

  const Age = async () => {
    const { data } = await ageVerification(userId)
    setAgeVer(data?.data?.eighteenAbove)
  };

  const AgeHandle = () => {
    SubscribeEvent();
    SetShowModal(false);
    refRBSheet.current.close()
    // if (ageVer === false) {
    //   Setmodalsec(true)
    // } else {
    //   SubscribeEvent();
    //   SetShowModal(false);
    //   refRBSheet.current.close()
    // }
  }
  const Okhandle = () => {
    Setmodalsec(false);
    SetShowModal(false);
    refRBSheet.current.close();
    SubscribeEvent();
  }





  const localisationData = [
    {
      id: 1,
      name: 'Lyon',
    },
    {
      id: 2,
      name: 'Marseille',
    },
  ];
  const Upperdata = [
    {
      id: 1,
      heading: ' E-sport',
    },
    {
      id: 2,
      heading: ' Expression de soi',
    },
    {
      id: 3,
      heading: 'Sport',
    },
    {
      id: 4,
      heading: 'Masterclass influence',
    },
  ];

  const Filter = () => {
    const [items, setitems] = useState(1);
    return (
      <View>
        <Text style={styles.heading}>Filtres</Text>
        <Text style={styles.rbdate}> Date </Text>
        <View style={styles.pickerview}>
          <D_Apicker />

        </View>
        <Text style={styles.rbtext}> LOCALISATION</Text>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: width * 0.12,
            marginVertical: height * 0.015,
          }}>
          {localisationData.map(item => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: width * 0.1,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setitems(item.id);
                  }}>
                  <Image
                    style={styles.img}
                    source={
                      item.id == items
                        ? require('../../assets/images/selectedcircle.png')
                        : require('../../assets/images/circle.png')
                    }
                  />
                </TouchableOpacity>
                <Text style={styles.buttontext}>{item.name}</Text>
              </View>
            );
          })}
        </View>
        <TouchableOpacity style={styles.rbbtn}>
          <Text style={styles.rbtntext}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const RawBottomSheet = () => {
    let a = (eventsDetail?.data?.data?.subscriptionIds)?.some((i) => i == userId);
    let b = eventsDetail?.data?.data?.subsIdAdminAndRevelature?.filter((i) => i._id === Revelator || RID);
    let c = b?.[0]?.firstName + " " + b?.[0]?.lastName
    let d = null
    if (eventsDetail?.data?.data?.subsIdAdminAndRevelature[0]?.firstName && eventsDetail?.data?.data?.subsIdAdminAndRevelature[0]?.lastName) {
      d = eventsDetail?.data?.data?.subsIdAdminAndRevelature[0]?.firstName + " " + eventsDetail?.data?.data?.subsIdAdminAndRevelature[0]?.lastName
    }

    // console.log("eventsDetail?.data?.dataeventsDetail?.data?.dataeventsDetail?.data?.data")
    // console.log(eventsDetail?.data?.data?.participationType[0]?.[0])
    // console.log("eventsDetail?.data?.dataeventsDetail?.data?.dataeventsDetail?.data?.data")
    const online = eventsDetail?.data?.data?.participationType[0]?.[0]?.distancielThumbnail
    const offline = eventsDetail?.data?.data?.participationType[0]?.[0]?.presentielThumbnail
    // console.log("detailss of the box", eventsDetail?.data)
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
          source={{ uri: `${base_URL_IMAGE + eventsDetail?.data?.data?.eventImage}` }}
        />

        {
          a == true ? <Image
            style={{
              resizeMode: "contain",
              // position:"absolute"
              marginTop: -height * 0.06,
              height: height * 0.05,
              width: width * 0.3

            }}
            source={require("../../assets/images/subcribe.png")}
          /> : null
        }
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
          <Text style={styles.rawBottomTitle}>
            {eventsDetail?.data?.data?.eventName}  {''}

          </Text>
          {
            d != null ?
              <Text style={styles.rawBottomshortTitle}>

                avec {d}
              </Text> : null
          }

        </View>
        <View style={styles.rawBottomSecondView}>
          <Text style={styles.rawBottomdescription}>

            {eventsDetail?.data?.data?.category}
          </Text>
          <Text style={styles.rawBottomdateandtime}>
            {moment(eventsDetail?.data?.data?.beginAt).locale('fr').format('DD/MM/YYYY')} de {eventsDetail?.data?.data?.startTime} à {eventsDetail?.data?.data?.endTime}

          </Text>
        </View>
        <View style={styles.rawBottomThirdView}>
          <Image
            style={styles.rawBottomtinyImage}
            source={require('../../assets/images/locLogo.png')}
          />
          <Text style={styles.rawBottomlocation}>

            {online == true ? "En ligne " : null}{offline == true ? eventsDetail?.data?.data?.postalAddress + "," +" "+ eventsDetail?.data?.data?.city +" "+eventsDetail?.data?.data?.zipCode : null}
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
          <TouchableOpacity
          activeOpacity={100}
            // onPress={() => setkiffver(true)}
          >
            <Text style={styles.rawBottomMainDescription}>
              {eventsDetail?.data?.data?.description}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* datoooo  */}


        {/* hsatooo  */}
        {
          a == true ?
            <TouchableOpacity
              style={[styles.rawBottomButon, { backgroundColor: Colors.ButtonBorder }]}
              onPress={() => {
                setTimeout(() => {
                  setunsubmodal(true)
                }, 200)

                UserInfo()
              }
              }>
              <Text style={styles.rawBottomButtonText}>Je me désinscris !</Text>
            </TouchableOpacity>
            : <>
              {BTN == false ? <TouchableOpacity
                style={styles.rawBottomButon}
                onPress={() =>
                  Profile_Checking()
                }>
                <Text style={styles.rawBottomButtonText}>Je m’inscris !</Text>
              </TouchableOpacity> : null}
              {/* buttons  */}
              {BTN == true ?
                <View
                  style={{ marginBottom: height * 0.1111, flexDirection: "row", justifyContent: "space-around" }}
                >
                  {offline == true ?
                    <TouchableOpacity
                      onPress={() => {
                        // Age(),
                        SetShowModal(true)
                      }
                      }
                      style={{
                        backgroundColor: "#081a4f",
                        height: height * 0.05,
                        justifyContent: "center",
                        width: width * 0.42,
                        borderRadius: width * 0.03
                      }}
                    >
                      <Text style={styles.rawBottomButtonText}>Je participe en présentiel</Text>
                    </TouchableOpacity> : null}
                  {online == true ?
                    <TouchableOpacity
                      onPress={() => {
                        Esport();
                        setTimeout(()=>{
                          setmymodal(true)
                         
                        },200)
                        
                      }}
                      style={{
                        backgroundColor: "#081a4f",
                        height: height * 0.05,
                        justifyContent: "center",
                        width: width * 0.42,
                        borderRadius: width * 0.03
                      }}
                    >
                      <Text style={styles.rawBottomButtonText}>Je participe en ligne</Text>
                    </TouchableOpacity> : null
                  }

                </View>
                : null}
            </>
        }
        <Modal
          animationType="fade"
          transparent={true}
          visible={ShowModal}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.rawBottomModalView}>
              <ImageBackground
                imageStyle={{ borderRadius: width * 0.08 }}
                style={styles.rawBottomModalImage}
                source={
                  modalsec == false
                    ? require('../../assets/images/backgroundImage.png')
                    : require('../../assets/images/Background2.png')
                }>
                {modalsec == false ? (
                  <>
                    <Text style={styles.modalText}>
                      <Text style={{ fontFamily: 'Bebas Neue Pro Bold', fontSize: width * 0.048 }}> {detail?.lastName}, </Text>
                      veux-tu vraiment t’inscrire a cet événement en présentiel
                      ?
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: width * 0.045,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          AgeHandle();
                        }}
                        style={styles.rawBottomButons}>
                        <Text style={styles.btn}>Oui</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.rawBottomButons}
                        onPress={() => {
                          SetShowModal(false);
                        }}>
                        <Text style={styles.btn}>Non</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={styles.scndmodalimage}
                        source={require('../../assets/images/alert.png')}
                      />
                      <Text style={styles.scndmodaltext2}>
                        ATTENTION,
                        <Text> </Text>
                        <Text
                          style={[styles.scndmodaltext2, { fontFamily: 'Bebas Neue Pro Bold' }]}>
                          {detail?.lastName} !
                        </Text>
                      </Text>
                    </View>
                    <Text style={styles.scndmodaltext}>
                      n’oublie pas de venir avec une
                      <Text> </Text>
                      <Text
                        style={{
                          fontFamily: 'Bebas Neue Pro Bold',
                          fontSize: width * 0.043,
                        }}>
                        autorisation parentale manuscrite
                      </Text>
                      <Text> </Text>
                      le jour de l’événement. ELLE TE SERA DEMANDée lors de ton
                      arrivée.
                    </Text>
                    <TouchableOpacity
                      style={styles.scndmodalbtn}
                      onPress={() => {
                        Okhandle()

                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          fontFamily: 'Bebas Neue Pro Bold',
                          fontSize: width * 0.038,
                        }}>
                        {' '}
                        Ok !{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </ImageBackground>
            </View>
          </View>
        </Modal>

        {/* online //////////////////// */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={mymodal}
          onRequestClose={() => {
            setmymodal(!mymodal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.rawBottomModalView}>
              <ImageBackground
                imageStyle={{ borderRadius: width * 0.08 }}
                style={styles.rawBottomModalImage}
                source={require('../../assets/images/backgroundImage.png')}>

                <>
                  <Text style={styles.modalText}>
                    <Text style={{ fontFamily: 'Bebas Neue Pro Bold', fontSize: width * 0.048 }}> {detail?.lastName}, </Text>
                    veux-tu vraiment
                    t’inscrire a cet événement
                    en LIGNE ?
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: width * 0.045,
                    }}>
                    <TouchableOpacity
                    onPress={()=>{EKIFFCHECK()}}
                      // onPress={() => { SubscribeEvent(), setmymodal(false), refRBSheet.current.close() }}
                      style={styles.rawBottomButons}>
                      <Text style={styles.btn}>Oui</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rawBottomButons}
                      onPress={() => {
                        setmymodal(false)
                      }}>
                      <Text style={styles.btn}>Non</Text>
                    </TouchableOpacity>
                  </View>
                </>

              </ImageBackground>
            </View>
          </View>
        </Modal>
        {/* unsubscuribe modal  */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={unsubmodal}
          onRequestClose={() => {
            setunsubmodal(!unsubmodal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.rawBottomModalView}>
              <ImageBackground
                imageStyle={{ borderRadius: width * 0.08 }}
                style={styles.rawBottomModalImage}
                source={require('../../assets/images/Background2.png')}>

                <>
                  <Text style={styles.modalText}>
                    <Text style={{ fontFamily: 'Bebas Neue Pro Bold', fontSize: width * 0.048 }}> {detail?.lastName}, </Text>
                    veux-tu vraiment
                    te désinscrire de cet événement ?
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: width * 0.045,
                    }}>
                    <TouchableOpacity
                      onPress={() => { UnSubscribe(), setunsubmodal(false), refRBSheet.current.close() }}
                      style={styles.rawBottomButons}>
                      <Text style={styles.btn}>Oui</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rawBottomButons}
                      onPress={() => {
                        setunsubmodal(false)
                      }}>
                      <Text style={styles.btn}>Non</Text>
                    </TouchableOpacity>
                  </View>
                </>

              </ImageBackground>
            </View>
          </View>
        </Modal>
        {/* kiff errors  */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={kiffver}
          onRequestClose={() => {
            setkiffver(!kiffver)
          }}>
          <View style={styles.centeredView}>
            <View style={styles.rawBottomModalView}>
              <ImageBackground
                imageStyle={{ borderRadius: width * 0.08 }}
                style={styles.rawBottomModalImage}
                source={require('../../assets/images/backgroundImage.png')}>

                <>
                  <Text style={styles.modalText}>
                    {/* <Text style={{ fontFamily: 'Bebas Neue Pro Bold', fontSize: width * 0.048 }}> {detail?.lastName}, </Text> */}
                    Pour t'inscrire à cet événement "E-sport",
                    ajoute le kiff "E-sport" et renseigne ton pseudo discord.
                  </Text>
                  <View
                    style={{
                      // flexDirection: 'row',
                      // paddingHorizontal: width * 0.045,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                       
                        navigation.navigate("ProfileScreens"),
                       
                        setTimeout(()=>{
                          setkiffver(false),
                          refRBSheet.current.close() 
                        },200)
                        //  refRBSheet.current.close() 
                      }}
                      style={{
                        width: width * 0.25,
                        height: height * 0.065,
                        backgroundColor: '#081a4f',
                        marginTop: height * 0.02,
                        // marginLeft: width * 0.1,
                        borderRadius: width * 0.018,
                        alignSelf: 'center',
                        justifyContent: 'center'
                      }}>
                      <Text style={styles.btn}>Je fonce !</Text>
                    </TouchableOpacity>

                  </View>
                </>

              </ImageBackground>
            </View>
          </View>
        </Modal>
      </View>
    );
  };


  const LowerRender = item => {
    let a = (item?.item?.subscriptionIds)?.some((i) => i == userId);
    return (
      <TouchableOpacity
        activeOpacity={0.5}

        onPress={() => {
          setdata(item?.item?._id)
          // event_by_Id();
          refRBSheet.current.open()

        }}>
        <ImageBackground
          imageStyle={{ borderRadius: width * 0.04, borderWidth: 0.5, borderColor: '#b9b9b9' }}
          style={styles.LowerRenderimage}
          source={{ uri: `${base_URL_IMAGE + item.item.eventImage}` }}>
          <View style={styles.LowerRenderfirstview}>
            <Text style={styles.participanttext}>
              {item?.item?.subscriptionIds.length || 0} participants
            </Text>
          </View>
          {
            a == true ? <Image
              style={{ alignSelf: "flex-end", height: height * 0.06, resizeMode: "contain", margin: width * 0.02 }}
              source={require("../../assets/images/subcribe.png")} /> : null
          }
          <View style={styles.LowerRendersecondview}>
            <Text style={styles.flatlistheading} numberOfLines={1}>{item?.item?.eventName}-{item?.item?.city}.. </Text>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingRight: width * 0.02, alignItems: "center" }}>
              <Text style={styles.flatlistdescription}>
                {item?.item?.category}
              </Text>
              <Text style={styles.flatlistdate}>{moment(item?.item?.beginAt).locale('fr').format('ddd DD MMMM ')} </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const UpperRender = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          setdata2(item.item.id);
        }}
        style={[
          styles.UpperRenderView,
          {
            backgroundColor: item.item.id == data2 ? '#081a4f' : 'transparent',
          },
        ]}>
        <Text
          style={[
            styles.UpperRenderText,
            { color: item.item.id == data2 ? 'white' : '#081a4f' },
          ]}>
          {item.item.heading}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: 'white' }}>
      <StatusBar barStyle='default' backgroundColor='transparent' />
      {Power == false ?
        <>
          <View>
            <ImageBackground
              style={styles.upperViewMainImage}
              source={require('../../assets/images/backgroundImage.png')}
            >


              <View
                style={{
                  borderWidth: 2,
                  height: height * 0.05,
                  width: width * 0.8,
                  alignSelf: "center",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: width * 0.05,
                  marginTop: height * 0.06,
                  // backgroundColor:"red"
                  borderColor: "#081a4f"

                }}
              >
                <Image
                  style={styles.tinyimages}
                  source={require('../../assets/images/searchlogo.png')}
                />
                <TextInput
                  placeholder='Rechercher'
                  placeholderTextColor="#081a4f"
                  style={{
                    // backgroundColor: "red", 
                    height: height * 0.048,
                    width: width * 0.58,
                    alignSelf: "center"

                  }}
                />
                <TouchableOpacity
                  onPress={() => { refRBSheet2.current.open() }}>
                  <Image
                    style={styles.tinyimages}
                    source={require('../../assets/images/filterLogo.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{}}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={Upperdata}
                  keyExtractor={item => item.id}
                  renderItem={UpperRender}
                />
              </View>
            </ImageBackground>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000',
              }}>
              <RBSheet
                ref={refRBSheet2}
                height={height * 0.85}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                  wrapper: {
                    backgroundColor: 'rgba(0, 0, 0, 0.24)',
                  },
                  draggableIcon: {
                    backgroundColor: '#000',
                  },
                  container: {
                    borderTopEndRadius: width * 0.035,
                    borderTopStartRadius: width * 0.035,
                  },
                }}>
                <Filter />
              </RBSheet>
            </View>


          </View>
          <View style={{backgroundColor:"#ffffff",height:height}}>
            {events?.data?.length !== 0 ?
              <View style={{ marginBottom: height * 0.25 }}>
                <FlatList
                  scrollEnabled={true}
                  data={events?.data}
                  keyExtractor={item => item.id}
                  renderItem={LowerRender}
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={
                    <View style={{ height: 300 }}></View>
                  }
                />
                {/* <View style={{height: 100}}  /> */}
              </View>
              :

              <Image
                style={{ alignSelf: "center", resizeMode: "contain", marginTop: height * 0.08 }}
                source={require("../../assets/images/noevent.png")} />}
          </View>
          <View>
            <RBSheet
              ref={refRBSheet}
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
        </> : <>
          <View>
            <ImageBackground
              style={styles.backImage}
              source={require('../../assets/images/backImage.png')}
            >
              <TouchableOpacity style={styles.backcontainer}
                onPress={() => setPower(false)}
              >
                <Image
                  style={{
                    width: width * 0.04,
                    height: height * 0.04,
                  }}
                  source={require('../../assets/images/prev.png')}
                />
              </TouchableOpacity>
              <View style={styles.downContainer}>
                <Image
                  resizeMode='contain'
                  style={styles.logo}
                  source={require('../../assets/images/askipLogo.png')}
                />
                <Text style={{
                  color: '#081a4f',
                  textAlign: 'center',
                  width: width * 0.72,
                  textTransform: 'uppercase',
                  paddingHorizontal: width * 0.04,
                  fontSize: width * 0.05,
                  fontWeight: 'bold',
                  marginBottom: height * 0.058,
                }}>
                  Pour pouvoir t’inscrire
                  à nos événements,
                  il faut que tu complètes
                  ton profil à 100% !
                </Text>
                <TouchableOpacity
                  onPress={() => { navigation.navigate("ProfileScreens") }}
                  style={{
                    width: width * 0.55,
                    height: height * 0.06,
                    backgroundColor: '#081a4f',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderRadius: width * 0.03,
                  }}>
                  <Text style={{
                    color: 'white',
                    fontWeight: '500'
                  }}>
                    J’y fonce !
                  </Text>
                </TouchableOpacity>
              </View>


            </ImageBackground>
          </View>
        </>}
    </View>

  );
};

export default EventsScreens;

const styles = StyleSheet.create({
  buttontext: {
    fontSize: width * 0.05,
    fontFamily: 'Bebas Neue Pro Bold',
    color: '#081a4f',
    marginLeft: width * 0.01,
  },
  img: {
    width: width * 0.069,
    height: height * 0.035,
    resizeMode: 'contain',

    borderRadius: 100,
  },
  rbtntext: {
    fontSize: width * 0.035,
    color: 'white',
  },
  pickerview: {
    height: height * 0.45,
  },
  rbbtn: {
    width: width * 0.75,
    height: height * 0.05,
    backgroundColor: '#081a4f',
    alignSelf: 'center',
    borderRadius: width * 0.04,
    marginTop: height * 0.017,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rbdate: {
    color: '#081a4f',
    fontSize: width * 0.06,
    textTransform: 'uppercase',
    marginLeft: width * 0.052,
    // fontWeight: 'bold',
    marginBottom: height * 0.017,
    fontFamily: 'Bebas Neue Pro Bold',
    marginVertical: height * 0.015,
  }, backImage: {
    width: width * 1,
    height: width * 2,
    flex: 1,
  },
  backcontainer: {
    width: width * 0.16,
    height: height * 0.08,
    backgroundColor: '#fdbf18',
    borderRadius: width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: width * 0.045
  },
  gobackImage: {
    width: width * 0.04,
    height: height * 0.04,
  },
  downContainer: {
    width: width * 0.7,
    height: height * 0.7,
    // backgroundColor: 'red',
    alignSelf: 'center'
  },
  btn: {
    width: width * 0.55,
    height: height * 0.06,
    backgroundColor: '#081a4f',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: width * 0.03,
  },
  txt: {
    color: 'white',
    fontWeight: '500'
  },
  logo: {
    width: width * 0.6,
    height: height * 0.23,
    alignSelf: 'center',
    marginTop: height * 0.05
  },
  description: {
    color: '#081a4f',
    textAlign: 'center',
    width: width * 0.72,
    textTransform: 'uppercase',
    paddingHorizontal: width * 0.04,
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.058,
  },
  rbtext: {
    color: '#081a4f',
    fontSize: width * 0.06,
    textTransform: 'uppercase',
    marginLeft: width * 0.052,
    // fontWeight: 'bold',
    fontFamily: 'Bebas Neue Pro Bold',
  },
  datepicker: {
    borderRadius: width * 0.03,
    width: width * 0.68,
    height: height * 0.32,
    alignSelf: 'center',
    // marginTop: height * 0.05,
  },
  opacity: {
    opacity: 0.5,
  },
  upperViewMainImage: {
    width: width * 1,
    height: height * 0.28,
    // paddingTop: height * 0.05
    // opacity: 0.7,
  },
  firstView: {
    width: width * 0.85,
    height: height * 0.06,
    borderWidth: 1,
    borderRadius: width * 0.055,
    alignSelf: 'center',
    marginTop: height * 0.06,
    marginHorizontal: width * 0.025,
    // backgroundColor:'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    alignContent: 'center',
    paddingRight: width * 0.035,
    // justifyContent:'center'
  },
  txtinput: {
    width: width * 0.6,
    height: height * 0.06,
    margin: -12,
    color: 'black',
  },
  UpperRenderView: {
    width: width / 2,
    height: height * 0.065,
    borderWidth: 1,
    borderRadius: 25,
    marginHorizontal: width * 0.025,
    marginVertical: height * 0.065,
    alignContent: 'center',
    justifyContent: 'center',

    // backgroundColor:colorView ? 'blue': null,
    // position:'absolute',
  },
  UpperRenderText: {
    // fontSize: width * 0.055,
    textAlign: 'center',
    // justifyContent:'center'
    color: '#1b2c5d',
    // fontWeight: 'bold',
    alignContent: 'center',
    alignItems: 'center',
    padding: 8,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.055,
    // fontFamily:'Bebas Neue Pro Italic'
  },
  LowerRenderimage: {
    width: width * 0.85,
    height: height * 0.34,
    alignSelf: 'center',
    margin: width * 0.05,
    borderRadius: width * 0.04,
    resizeMode: 'stretch',
    backgroundColor: '#f0f0f0'
    // elevation: 20,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 12,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: 16.00,

  },
  LowerRenderfirstview: {
    // width: width * 0.4,
    // height: height * 0.05,
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: width * 0.04,
    marginLeft: width * 0.07,
    marginTop: height * 0.015,
    justifyContent: 'center',
    padding: width * 0.02,
  },
  tinyimages: {
    width: width * 0.05,
    height: height * 0.025,
    // justifyContent: 'center',
    // alignSelf:'center',
    // flex:1
  },
  LowerRendersecondview: {
    width: width * 0.725,
    // height: height * 0.08,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'white',
    // marginTop: height * 0.247,
    alignSelf: 'center',
    borderRadius: width * 0.039,
  },
  heading: {
    // fontSize: width * 0.055,
    color: '#081a4f',
    paddingHorizontal: width * 0.028,
    // fontWeight: 'bold',
    marginTop: height * 0.01,
    textAlign: 'center',
    textTransform: 'uppercase',
    // marginBottom: height * 0.02,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.064,
  },
  description: {
    // fontSize: width * 0.042,
    color: '#fdd668',
    paddingHorizontal: 10,
    // fontFamily: 'Bebas Neue Pro Bold'
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.048,
  },
  date: {
    // fontSize: width * 0.04,
    color: '#aab4c4',
    paddingHorizontal: width * 0.01,
    paddingTop: height * 0.01,
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.048,
  },
  UpperRenderViewSet: {
    position: 'absolute',
    padding: 15,
    marginTop: 50,
  },
  participanttext: {
    // fontWeight: 'bold',
    color: '#1b2c5d',
    textAlign: 'center',
    // fontSize: width * 0.035,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.035,
  },
  onTouchViewColor: {
    width: width * 0.42,
    height: height * 0.08,
    borderWidth: 1,
    borderRadius: 25,
    margin: 8,
    backgroundColor: '#1b2c5d',
    // position:'absolute',
  },
  onTouchTextColor: {
    fontSize: width * 0.08,
    textAlign: 'center',
    // justifyContent:'center'
    color: 'white',
    fontWeight: 'bold',
    padding: 8,
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
    fontSize: width * 0.05,
    fontFamily: 'Bebas Neue Pro Bold Italic',
    marginLeft: width * 0.015,
  },
  rawBottomtinyImage: {
    width: width * 0.05,
    height: height * 0.03,
    resizeMode: 'contain',
    marginTop: Platform.OS == "ios" ? -height * 0.005 : null
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
  SelectBUTt: {
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
    paddingHorizontal: width * 0.025,
    fontSize: width * 0.045,
    letterSpacing: 0.15,
    textAlign: 'center',
    fontFamily: 'Bebas Neue Pro Bold',
  },
  rawBottomModalImage: {
    width: width * 0.8,
    height: height * 0.22,
    // borderRadius: width * 0.08,
    resizeMode: 'contain',
  },
  rawBottomModalView: {
    width: width * 0.8,
    height: height * 0.22,
    borderRadius: width * 0.08,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    // marginTop: height * 0.3,
    alignSelf: 'center',
  },
  rawBottomButons: {
    width: width * 0.2,
    height: height * 0.065,
    backgroundColor: '#081a4f',
    marginTop: height * 0.025,
    marginLeft: width * 0.1,
    borderRadius: width * 0.018,
    alignSelf: 'center',
    justifyContent: 'center',
    // padding:width*0.04
  },
  btn: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: width * 0.04,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: width * 0.08,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // marginTop: 22
  },
  modalText: {
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
  },
  scndmodalbtn: {
    width: width * 0.15,
    height: height * 0.05,
    backgroundColor: '#081a4f',
    borderRadius: width * 0.02,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.01,
  },
  scndmodalimage: {
    width: width * 0.073,
    height: height * 0.052,
    marginRight: -width * 0.02,
  },
  scndmodaltext: {
    fontSize: width * 0.045,
    textTransform: 'uppercase',
    // paddingHorizontal: width * 0.01,
    width: width * 0.7,
    alignSelf: 'center',
    // marginBottom: height * 0.0,
    color: '#081a4f',
    textAlign: 'center',
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.048,
    lineHeight: height * 0.03
  },
  scndmodaltext2: {
    textTransform: 'uppercase',
    color: '#081a4f',
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.052,
    marginTop: height * 0.01,
  },
  flatlistheading: {
    marginTop: height * 0.05,
    fontSize: width * 0.055,
    color: '#001d4f',
    marginLeft: width * 0.022,
    fontFamily: 'Bebas Neue Pro Bold',
    letterSpacing: 0.2,
    marginTop: height * 0.007,
  },
  flatlistdescription: {
    fontSize: width * 0.042,
    color: '#ffbc15',
    marginLeft: width * 0.0325,
    fontFamily: 'Bebas Neue Pro Regular',
  },
  flatlistdate: {
    fontSize: width * 0.04,
    color: '#001d4f',
    marginLeft: width * 0.02,
    fontFamily: 'Bebas Neue Pro Regular',
    // marginTop: height * 0.0005,
  },
});