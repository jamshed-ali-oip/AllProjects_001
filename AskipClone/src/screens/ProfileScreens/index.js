import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  LayoutAnimation,
  Platform,
} from 'react-native';
import React, { useState,useEffect  } from 'react';
import TopTab from '../../components/TopTab';
import Colors from '../../assets/colors/Colors';
// import SimpleGradientProgressbarView from 'react-native-simple-gradient-progressbar-view';
import Progressbar from '../../components/Progressbar';
import { ImagePicker, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT } from '../../redux/const/const';
import ProfileImage from './ProfileImage';
import Cmodal from '../../components/Cmodal';
import { UserDetail } from '../../redux/actions/user.action';


const { height, width } = Dimensions.get('window');
const ProfileScreens = ({navigation}) => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state?.auth?.credential?.User?._id)
  const [detail, setDetail] = useState()
  useEffect(() => {
    UserInfo()
  }, [])
  const UserInfo = async () => {
    const { data } = await UserDetail(userId)
    setDetail(data?.User)

  }
//  console.log("progress details",detail)
  const kiffs=useSelector(state => state?.auth?.credential?.User?.kiffs)
  const [modalVisible, setModalVisible] = useState(false);
  // console.log("modalVisible",modalVisible)
  const [image, setImage] = useState();
  // console.log("tasweer",image)
  const test = async () =>{
    await dispatch({
      type:LOG_OUT
    })
  }
  const closeModal=async()=>{
    await setModalVisible(false);
    test()
  }
  const signOut =async () => {
    // console.log('====================================');

    await closeModal()
    // console.log(modalVisible);
    // console.log('====================================');
    // LayoutAnimation.easeInEaseOut();
    // dispatch({
    //   type: LOG_OUT
    // })

  }

  const onFromPickerImage = () => {
    var options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    launchImageLibrary(options, (response) => {
      // Same code as in above section!

      // console.log(("image================",response.assets))
      if (response) {
      
      }else{
        // console.log("not selected")
      }
     
    });
  }


 
  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ImageBackground
          style={{
            height: height * 0.3,
            padding: width * 0.03,
            marginBottom: height * 0.05,
          }}
          source={require('../../assets/images/Header.png')}>
          <TouchableOpacity
          style={{marginTop: Platform.OS == 'ios' ? 0 :  20}}
            onPress={() => {
              setModalVisible(true);
              UserInfo()
         
            }}>
            <Image
              style={{ alignSelf: 'flex-end',marginTop:Platform.OS=="ios"?height*0.05:null }}
              source={require('../../assets/images/signout.png')}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.box}>
          <ProfileImage/>
          
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                height: height * 0.045,
                width: width * 0.055,
                resizeMode: 'contain',
                marginRight: width * 0.015,
              }}
              source={require('../../assets/images/trophies.png')}
            />
            <Text
              style={{
        
                color: Colors.ButtonBorder,
                fontFamily: 'Bebas Neue Pro Regular',
                fontSize: width * 0.05,
              }}>
            0 Points
            </Text>
          </View>
          {/* <Text
            style={{
              fontSize: width * 0.037,
              color: 'black',
              // fontWeight: '700',
              alignSelf: 'center',
              marginTop: height * 0.001,
              fontFamily: 'Bebas Neue Pro Regular',
              fontSize: width * 0.046,
              letterSpacing: 0.3,
            }}>{kiffs==null?"TON PROFIL EST INCOMPLET !":"TON PROFIL EST COMPLET !"}
            
          </Text> */}
          <View >
        
            <Progressbar progress={1} />
          </View>
        </View>
        {/* tabsection */}

        <TopTab />
      </View>
      <View>
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
                    <Text style={{ fontWeight: 'bold' }}>{detail?.firstName}, </Text>
                    veux-tu vraiment te déconnecter ?
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: width * 0.045,
                      marginTop:-height*0.02
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        // signout();
                        signOut()
                        // console.log("logout here...")
                      }}
                      style={styles.Butons}>
                      <Text style={styles.btn}>Oui</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.Butons}
                      onPress={() => {
                        setModalVisible(false);
                      }}>
                      <Text style={styles.btn}>Non</Text>
                    </TouchableOpacity>
                  </View>
                </>
              </ImageBackground>
            </View>
          </View>
        </Modal>
        <Cmodal
        onPress={()=>{navigation.navigate("HomeScreens")}}
        onPress2={()=>{navigation.navigate("EventsScreens")}}
        />
      </View>
    </>
  );
};

export default ProfileScreens;

const styles = StyleSheet.create({
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
    backgroundColor: '#fdbf18',
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
    // fontWeight: '600',
    fontSize: width * 0.048,
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
  }, box: {
    backgroundColor: Colors.whitetext,
    height: height * 0.25,
    width: width * 0.85,
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: width * 0.05,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 12,
    marginTop: Platform.OS=="ios"?height * 0.09:height * 0.08,
  },
  profile: {
    backgroundColor: Colors.whitetext,
    height: height * 0.12,
    width: width * 0.22,
    alignSelf: 'center',
    borderRadius: width * 0.8,
    marginTop: -height * 0.05,
    elevation: 5,
    justifyContent: 'center',
  },
});
