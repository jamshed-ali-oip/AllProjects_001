import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  KeyboardAvoidingView
} from 'react-native';
import React, { useState, useEffect } from 'react';

import Inputs from '../../components/Inputs';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_PAGE_THREE } from '../../redux/const/const';
import { log } from 'console';
import { update_Third_Page, getKiffsData, UserDetail } from '../../redux/actions/user.action';
import { set } from 'immer/dist/internal';
import { base_URL_IMAGE } from '../../config/config';
import Colors from '../../components/Colors';
const { width, height } = Dimensions.get('window');



const Page3 = ({ setPage, profile }) => {
  // const Our_data = useSelector(state => state?.user?.getKiffsData);
  // console.log(thirdPageData,"thirdPageData");
  const data = [
    {
      id: 0,
      image: require('../../assets/images/sports.png'),
      isClosedButton: true,
      title: 'Sport',
      isSelected: true,
    },
    {
      id: 1,
      image: require('../../assets/images/rap.png'),
      title: 'Rap',
      isClosedButton: true,
      isSelected: false,
    },
    {
      id: 2,
      image: require('../../assets/images/influence.png'),
      title: 'Influence',
      isClosedButton: true,
      isSelected: false,
    },
    {
      id: 3,
      image: require('../../assets/images/esport.png'),
      title: 'E-Sport',
      isClosedButton: false,
      isSelected: false,
    },
  ];
  const [kiffs, setKiffs] = useState([]);

  const [myKiffs, setMyKiffs] = useState([]);
  const USER_DATA = useSelector((state) => state?.auth?.User)
  const refRBSheet = useRef();
  const [code, setCode] = useState();
  const [isRegexMatch, setIsRegexMatch] = useState(false)
  const [Data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState();
  const [detail, setDetail] = useState()
  const [Reminder, setReminder] = useState(false);
  useEffect(() => {
    UserInfo()
  }, [])
  const UserInfo = async () => {
    const {data}  = await UserDetail(userId)
    setDetail(data?.User)

  }
// console.log("details22",detail)
  const thirdPageData = useSelector((state) => state?.user?.getKiffsData)
  // console.log("thirdPageData", myKiffs)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKiffsData())
  }, [])



  useEffect(() => {
    if (thirdPageData.length > 0) {
      setMyKiffs(thirdPageData.map(it => ({ ...it, selected: false })))
    }
  }, [thirdPageData])


  useEffect(() => {
    if (profile?.kiffs?.length > 0) {
      const da = thirdPageData.map((it) => {
        const check = profile?.kiffs.filter(id => id == it._id).length
        if (check) {
          return {
            ...it,
            selected: true,
            isSelected: true
          }
        } else {
          return { ...it, selected: false }
        }
      })
      //  console.log("myyyyy",da)
      setMyKiffs(da)
    }
  }, [profile, thirdPageData,detail])
  // useEffect(() => {
  //   if (USER_DATA) {
  //     setCode(USER_DATA?.discordUserName)
  //   }
  // }, [USER_DATA])

  // console.log('====================================');
  // console.log(myKiffs.find((k) => k.id == 3));
  // console.log('====================================');

  let selectedKiffs = myKiffs.map((item) => item.id)
  // console.log('=======', kiffs);


  const savePageThreeData = dataa => dispatch => {
    dispatch({
      type: SET_PAGE_THREE,
      payload: { ...thirdPageData, ...dataa },
    });
  };
  const userId = useSelector((state) => state?.auth?.credential?.User?._id)


  const PageThreeData = () => {
    let dataa = {
      discordUserName: code,
      kiffs: myKiffs.filter(it => it.selected == true).map(it => it._id),
      progress:0.6
    };
    if (myKiffs.filter(it => it.selected == true).length === 0) {
       return setReminder(true)
    }
    else {
      dispatch(update_Third_Page(userId, { ...dataa }, setPage));
      // setPage(4)
    }
  }

  const Sheet = () => {
    return (
      <>
        <Text style={styles.heading}>aJOUTER DES KIFFS</Text>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: width * 0.03,
            // marginBottom: height * 0.17,
            width: width * 0.8,
            flexWrap: 'wrap',
            alignSelf: "center"
          }}>

          {(myKiffs.filter(it => it.selected == false) && myKiffs.filter(it => it.selected == false).length) ? myKiffs.filter(it => it.selected == false).map((item, i) => (

            <TouchableOpacity
              key={i}
              style=
              {{ margin: width * 0.02, justifyContent: "center" }}
              // activeOpacity={100}
              onPress={() => {
                const oldKiff = myKiffs.map(it => {
                  if (it._id == item._id) {
                    return {
                      ...it,
                      isSelected: !it.isSelected
                    }
                  } else {
                    return it
                  }
                })
                setMyKiffs(oldKiff)
              }}>
              <Image
                style={{
                  width: width * 0.3,
                  height: height * 0.16,
                  marginLeft: width * 0.025,
                  borderWidth: item.isSelected ? 4 : 0,
                  borderColor: '#ffbc16',
                }}
                resizeMode="cover"
                source={{ uri: `${base_URL_IMAGE + item.url}` }}
              />
              <Text
                style={{
                  color: Colors.ButtonBorder,
                  fontSize: width * 0.06,
                  position: "absolute",
                  fontFamily: "Bebas Neue Pro Bold",
                  alignSelf: "center",
                  marginTop: height * 0.025,
                  width: width * 0.25,
                  textAlign: "center"
                }}
              >{item?.name}</Text>
            </TouchableOpacity>
          )) : null}
        </View>
        <TouchableOpacity
          style={[
            styles.btn1,
            { backgroundColor: myKiffs.length == 0 ? '#c7c7c7' : "#ffbc15" }
          ]}
          onPress={() => {
            const oldKiff = myKiffs.map(it => {
              if (it.isSelected) {
                return {
                  ...it,
                  selected: true
                }
              } else {
                return it
              }
            })
            setMyKiffs(oldKiff)
            refRBSheet.current.close()
          }}>
          <Text style={styles.rbbtntext1}> Continuer </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { refRBSheet.current.close() }}
          style={styles.btn2}>
          <Text style={styles.rbbtntext2}> Annuler </Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderItem = ({ item }) => {
    // console.log("item", item)
    return (
      <View>
        <TouchableOpacity
          style={{ zIndex: 11 }}
          onPress={() => {
            const oldKiff = myKiffs.map(it => {
              if (it._id == item._id) {
                return {
                  ...it,
                  selected: false,
                  isSelected: false
                }
              } else {
                return it
              }
            })
            setMyKiffs(oldKiff)
          }}
        >
          <Image
            style={{
              marginLeft: width * 0.31,
              width: width * 0.09,
              height: height * 0.022,
              resizeMode: "contain",
              position: "absolute",

            }}
            source={require("../../assets/images/cancelbtn.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
        style={{justifyContent:"center"}}
        >
          <Image style={{
            width: width * 0.35,
            height: height * 0.15,
            margin: width * 0.013,
            alignItems: 'center',
            justifyContent: 'center',
            resizeMode: "contain",
            borderRadius: width * 0.03
          }} source={{ uri: `${base_URL_IMAGE + item.url}` }} />
          <Text
            style={{
              color: Colors.ButtonBorder,
              fontSize: width * 0.06,
              position: "absolute",
              fontFamily: "Bebas Neue Pro Bold",
              alignSelf: "center",
              marginTop: height * 0.025,
              width: width * 0.25,
              textAlign: "center"
            }}
          >{item?.name}</Text>
        </TouchableOpacity>


      </View>
    );
  };

  function checkSport() {
    var flag = false
    myKiffs.filter(it => it.selected == true).forEach(it => {
      if (it.name.toUpperCase() == "E-SPORT") {
        flag = true
      }
    })
    return flag
  }
  return (
    <>
      <Text style={styles.firsttext}>Séléctionne tes kiffs</Text>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}        >
     
      {/* <ScrollView
        horizontal={true}
        // scrollIndicatorInsets={false}
        showsHorizontalScrollIndicator={false}> */}
      <View
        style={{
          flexDirection: 'row',
        }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={myKiffs.filter(it => it.selected)}
          keyExtractor={item => item.id}
          renderItem={renderItem}

          ListFooterComponent={() => {
            return (
              <TouchableOpacity
                disabled={myKiffs.filter(it => it.selected).length == thirdPageData.length ? true : false}
                style={{
                  marginLeft: width * 0.035,
                  width: width * 0.35,
                  height: height * 0.15,
                }}
                onPress={() => refRBSheet.current.open()}>
                <Image

                  style={{
                    width: width * 0.35,
                    height: height * 0.15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    resizeMode: "contain",
                    marginBottom: height * 0.028
                  }}
                  source={require('../../assets/images/select.png')}></Image>
              </TouchableOpacity>
            )
          }}
        />
      </View>
      {/* </ScrollView> */}
      {
        checkSport() && (
          <>
            <View style={styles.secondview}>
              <Text style={styles.text}>Ton pseudo Discord</Text>
              <Inputs
                placeholder="Pseudo#XXXXX"
                height={height * 0.045}
                width={width * 0.57}
                widths={width * 0.57}
                heights={height * 0.05}
                defaultValue={detail?.discordUserName}
                setvalue={(e) => {
                  if (e.match(/[#]+[0-9]{4}[a-z A-Z]{0,50}$/g)) {
                    setIsRegexMatch(true)
                  } else {
                    setIsRegexMatch(false)
                  }
                  setCode(e)
                }}
                value={code}
              />

            </View>
            {
              !isRegexMatch && (
                <Text
                  style={{
                    color: "grey",
                    fontSize: width * 0.03,
                    // alignSelf:"",
                    marginLeft: width * 0.4,
                    marginTop: -height * 0.019
                  }}
                >*il doit inclure "#" et quatre chiffres</Text>
              )
            }

          </>
        )
      }
      <TouchableOpacity
        onPress={() => {
          if (myKiffs?.find((k) => k?.name.toUpperCase() == "E-SPORT" && k?.selected ==false )) {
            PageThreeData()
            // console.log(first)
            // console.log("not avial")
          }
          else if (myKiffs?.find((k) => k?.name.toUpperCase() == "E-SPORT" && k?.selected ==true) &&  isRegexMatch ) {
            PageThreeData()
            // console.log("avail")
          }else{
            // console.log("llll") 
          }
        }}
//         onPress={() => {
//           console.log(myKiffs,"lifsfnsdk")
//           if (myKiffs.find((k) => k.name == "E-sport"  && k.selected ==true)) {
// console.log("true")
//             // PageThreeData()
//           }
//           else {
//             console.log("false")
//           }
//         }}
        style={styles.touch}
      >
        <Text style={styles.text2}>Continuer</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          height={height * 0.65}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.24)',
            },
            draggableIcon: {
              backgroundColor: 'transparent',
            },
            container: {
              borderTopEndRadius: width * 0.045,
              borderTopStartRadius: width * 0.045,
            },
          }}>
          <Sheet />
        </RBSheet>
        
      </View>
      <View style={{
        height: 200
      }} />
      
      
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={Reminder}
        onRequestClose={() => {
         
          setReminder(!Reminder);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.rawBottomModalView}>
            <ImageBackground
              imageStyle={{ borderRadius: width * 0.08 }}
              style={styles.rawBottomModalImage}
              source={require('../../assets/images/Background2.png')}>

              <>
                <Text style={styles.attention}>ATTENTION! </Text>
                <Text style={styles.modalText}>
                 Tous les champs sont obligatoires
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
                    style={styles.rawBottomButons}>
                    <Text style={styles.btn}>D'accord</Text>
                  </TouchableOpacity>

                </View>
              </>

            </ImageBackground>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Page3;

const styles = StyleSheet.create({
  img: {
    width: width * 0.3,
    height: height * 0.16,
    borderRadius: width * 0.018,
    marginLeft: width * 0.025,
  },
  backgroundImage: {
    width: width * 0.38,
    height: height * 0.15,
    margin: width * 0.013,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: "contain"
  },
  btntext: {
    color: '#fcbe18',
    fontSize: width * 0.075,
  },
  secondview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.04,
    marginVertical: height * 0.02,
  },
  text: {
    color: 'black',
    fontSize: width * 0.046,
    fontWeight: '600',
    marginLeft: width * 0.002,
    fontFamily: 'Bebas Neue Pro Bold',
  },
  firsttext: {
    color: 'black',
    fontSize: width * 0.043,
    fontWeight: '600',
    marginLeft: width * 0.038,
    marginTop: height * 0.015,
  },
  btn1: {
    width: width * 0.85,
    height: height * 0.06,
    backgroundColor: '#c7c7c7',
    borderRadius: width * 0.015,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.016,
    alignSelf: 'center',
  },
  btn2: {
    width: width * 0.85,
    height: height * 0.06,
    borderWidth: 2,
    borderColor: '#fdbf18',
    borderRadius: width * 0.015,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.016,
    alignSelf: 'center',
  },
  rbbtntext1: {
    color: 'white',
    fontSize: width * 0.047,
    fontFamily: 'Bebas Neue Pro Bold',
  },
  rbbtntext2: {
    color: '#fdbf18',
    fontSize: width * 0.047,
    fontFamily: 'Bebas Neue Pro Bold',
  },
  bigButton: {
    width: width * 0.925,
    height: height * 0.07,
    alignSelf: 'center',
    marginTop: height * 0.015,
  },
  heading: {
    fontSize: width * 0.048,
    fontFamily: 'Bebas Neue Pro Bold',
    color: '#000000',
    textTransform: 'uppercase',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  text2: {
    color: '#fdbf18',
    fontSize: width * 0.035,
    fontWeight: '700',
  },
  touch: {
    height: height * 0.05,
    borderWidth: 2,
    borderColor: '#fdbf18',
    width: width * 0.65,
    marginTop: height * 0.02,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.009,
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
    borderRadius: width * 0.018,
    justifyContent: 'center',
    // padding:width*0.04
  }, btn: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: width * 0.04,
  },
  attention: {
    textAlign: 'center',
    fontSize: width * 0.085,
    color: '#081a4f',
    marginTop: height * 0.02,
    marginBottom: -height * 0.02,
    width: width * 0.65,
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontWeight: "bold",
    fontSize: width * 0.045,
  }
});
