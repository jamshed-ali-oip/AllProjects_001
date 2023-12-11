import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ImageBackground
} from 'react-native';
import React from 'react';
import Inputs from '../../components/Inputs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_PAGE_FIVE } from '../../redux/const/const';
import { ImagePicker, launchImageLibrary } from 'react-native-image-picker';
const { width, height } = Dimensions.get('window');
import { imageUpload, profileUpdate, UserDetail } from "../../redux/actions/user.action"
import { useEffect } from 'react';

const Page5 = ({ setPage, profile }) => {

  const [IdCardNo, setIdCardNo] = useState();
  const [imagename, setimageName] = useState("")
  const [detail, setDetail] = useState()
  const [Reminder, setReminder] = useState(false);
  const userId = useSelector((state) => state?.auth?.credential?.User?._id)
  useEffect(() => {
    UserInfo()
  }, [])
  const UserInfo = async () => {
    const { data } = await UserDetail(userId)
    setDetail(data?.User)

  }
  // console.log("details22", detail)
  const profileData = useSelector((state) => state?.auth?.profileData?.data)
  const profileData2 = useSelector((state) => state?.auth?.profileData?.data)
  // console.log("lll", profileData);
  const USER_DATA = useSelector((state) => state?.auth?.User)
  // useEffect(()=>{
  // if(USER_DATA){
  //   setIdCardNo(USER_DATA?.identityCardNumber)
  // }else{
  //   setIdCardNo()
  // }
  // },[USER_DATA])

  useEffect(() => {
    if (profile?.identityCardNumber !== null) {
      setIdCardNo(profile?.identityCardNumber)
    }
  }, [profile])
  const dispatch = useDispatch()

  // const fivePageData = useSelector((state) => state?.auth?.User)
  const fivePageData = useSelector((state) => state?.user?.data)

  // console.log(fivePageData, "fivePageData fivePageData fivePageData")



  const SavePageFivedata = () => {
    let idcard = 'id card aiga';
    let data = {
      identityCardNumber: IdCardNo,
      identityCard: profileData,
      progress:1
    };

    let allProfileData = {
      ...fivePageData,
      ...data,

    }
    delete allProfileData._id
    dispatch(profileUpdate(allProfileData, userId, setPage))

  };
  const onFromPickerImage = () => {
    var options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    launchImageLibrary(options, (response) => {

      if (response) {
        dispatch(imageUpload(response.assets?.[0],setReminder))
        // console.log("func", imageUpload)
        setimageName(response.assets?.[0].type)
        // console.log("datadtadtatta", response)

      }
    });
  }

  return (
    <View>
      <View style={styles.mainview}>
        <Text style={styles.txt}>Importe ta carte d’identité juste ici :</Text>
        <TouchableOpacity
          onPress={() => onFromPickerImage()}
          style={styles.imagebutton}>
          <Text style={styles.text}> {profileData2 ? "Image" + profileData2 : "Importer un fichier..."}</Text>
          <Image
            style={styles.img}
            source={require('../../assets/images/download.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.mainview}>
        <Text style={styles.txt}>
          ...ou bien rentre manuellement ton numéro d’identité juste là !
        </Text>
        <Inputs
          placeholder="Numéro de carte d'identité"
          height={height * 0.045}
          width={width * 0.925}
          widths={width * 0.925}
          heights={height * 0.05}
          setvalue={setIdCardNo}
          value={IdCardNo}
          defaultValue={detail?.identityCardNumber}
        />
      </View>
      <TouchableOpacity
        onPress={() => SavePageFivedata()}
        style={styles.touch}>
        <Text style={styles.text2}>Enregistrer mon profil</Text>
      </TouchableOpacity>
      <View style={{ height: height * 0.096 }}></View>
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
                  Le fichier est trop volumineux (Max:  5 Mo)
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
    </View>
  );
};

export default Page5;

const styles = StyleSheet.create({
  txt: {
    color: 'black',
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.006,
    fontSize: width * 0.043,
    fontFamily: 'Bebas Neue Pro Bold',
    letterSpacing: 0.1,
  },
  mainview: {
    marginTop: height * 0.026,
  },
  imagebutton: {
    width: width * 0.925,
    height: height * 0.045,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: width * 0.011,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.01,
    alignItems: 'center',
    borderColor: '#bfc5d2',
  },
  img: {
    width: width * 0.035,
    height: height * 0.035,
    resizeMode: 'contain',
    tintColor: '#909090',
  },
  text: {
    color: '#909090',
    fontSize: width * 0.035,
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
  }, centeredView: {
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
