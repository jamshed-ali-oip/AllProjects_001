import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ImageBackground

} from 'react-native';
import React, { useState,useEffect } from 'react';
import Inputs from '../../components/Inputs';
import FormInput from '../../components/Forminput';
import { SignupBtn, Loginbtn } from '../../components/BTNS';
import { useSelector, useDispatch } from 'react-redux';
import { ChangesPassword, Delete_User, UserDetail } from "../../redux/actions/user.action"
import { SceneMap } from 'react-native-tab-view';

const { height, width } = Dimensions.get('window');

const CPage1 = ({ page, setPage, navigationState }) => {
  const [eye, seteye] = useState(true);
  const [eye2, seteye2] = useState(true);
  const [eye3, seteye3] = useState(true);
  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confNewPass, setConfNewPass] = useState();
  const [detail, setDetail] = useState()
  const id = useSelector(state => state?.auth?.credential?.User?._id);
  const token = useSelector(state => state?.auth?.credential?.token);
  const credentialemail = useSelector(state => state?.auth?.credential?.User?.email)
  const email = useSelector(state => state?.auth?.User?.data?.email)
  const userData = useSelector(state => state?.auth?.User)
  const [error, setError] = useState("")
  const [mymodal, setmymodal] = useState(false);
  const dispatch = useDispatch()
  const delete_User = () => {
    dispatch(Delete_User(id, token))
  }
  
  useEffect(() => {

    UserInfo()

  }, [])
  const UserInfo = async () => {
    const {data}  = await UserDetail(id)
    setDetail(data?.User)

  }
  // console.log("page1 email",detail?.email)
  // console.log(page)
  const consultdata = () => {
    if (detail?.email) {
      setPage(7)
    } else {
      Alert.alert(
        "Attention",
        "L'e-mail n'existe pas, mettez d'abord à jour votre profil",
        [
          {
            text: "d'accord",
            onPress: () => setPage(1),
            style: "cancel",
          },

        ],

      );
    }
  }
  const Delete_data = () => {
    if (detail?.email) {
      setPage(10)
    } else {
      Alert.alert(
        "Attention",
        "L'e-mail n'existe pas, mettez d'abord à jour votre profil",
        [
          {
            text: "d'accord",
            onPress: () => setPage(1),
            style: "cancel",
          },

        ],

      );
    }
  }
  const changePassword = () => {
    let data = {
      oldPassword: oldPass,
      newPassword: newPass,
      confirmPassword: confNewPass,
    }

    if (data?.oldPassword == undefined || data?.newPassword == undefined || data?.confirmPassword == undefined) {
      alert("fill all")
    } else {
      dispatch(ChangesPassword(data, id, setError,setmymodal,))
    }



  }
  return (

    <View style={{
      marginBottom: height * 0.01
    }}>

      <Text style={styles.heading}>
        Votre mot de passe doit contenir 4 chiffres
      </Text>
      <Text style={styles.changeError}>
        {error}
      </Text>
      <View style={{}}>
        <FormInput
          title="Mot de passe actuel"
          placeholder="****"
          type="numeric"
          contentype={'password'}
          security={eye}
          maxletter={4}
          setvalue={setOldPass}
          value={oldPass}
        />
        <TouchableOpacity
          style={styles.eye}
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
        <TouchableOpacity
          onPress={() => {
            setPage(2)
          }}>
          <Text style={styles.textline}>
            Mot de passe oublié ? Je le réinitialise
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <FormInput
          title="Nouveau mot de passe "
          placeholder="****"
          type="numeric"
          contentype={'password'}
          security={eye2}
          maxletter={4}
          setvalue={setNewPass}
          value={newPass}
        />
        <TouchableOpacity
          style={styles.eye}
          onPress={() => {
            seteye2(!eye2);
          }}>
          <Image
            source={
              eye2 == true
                ? require('../../assets/images/Eyeoff.png')
                : require('../../assets/images/openeye.png')
            }
          />
        </TouchableOpacity>
      </View>
      <View>
        <FormInput
          title="Confirmation du nouveau mot de passe "
          placeholder="****"
          type="numeric"
          contentype={'password'}
          security={eye3}
          maxletter={4}
          setvalue={setConfNewPass}
          value={confNewPass}
        />
        <TouchableOpacity
          style={styles.eye}
          onPress={() => {
            seteye3(!eye3);
          }}>
          <Image
            source={
              eye3 == true
                ? require('../../assets/images/Eyeoff.png')
                : require('../../assets/images/openeye.png')
            }
          />
        </TouchableOpacity>
      </View>
      {/* changePassword() */}
      <Loginbtn link={() =>  changePassword()} title={'Confirmer'} />
      <SignupBtn link={() =>{ consultdata(),UserInfo()}} title={'Télécharger mes données'} />
      <SignupBtn
        // link={()=>{delete_User()}}
        link={() => {Delete_data(),UserInfo()}}
        title={'Supprimer mon compte'} />
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
                    <Text style={{  fontSize: width * 0.048 }}>  </Text>
                    Ton mot de passe a été modifié avec succès !
                  </Text>
             
                  
                    <TouchableOpacity
                      style={styles.rawBottomButons}
                      onPress={() => {
                        setmymodal(false),
                        setConfNewPass(""),
                        setNewPass(''),
                        setOldPass("")

                      
                      }}>
                      <Text style={styles.btn}>D'accord</Text>
                    </TouchableOpacity>
              
                </>

              </ImageBackground>
            </View>
          </View>
        </Modal>
    </View>
  );
};

export default CPage1;

const styles = StyleSheet.create({
  textline: {
    // fontSize: width * 0.032,
    textDecorationLine: 'underline',
    marginTop: height * 0.01,
    marginLeft: width * 0.12,
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.035,
    color: "#afafaf"
  },
  heading: {
    // fontSize: width * 0.035,
    textAlign: 'center',
    marginTop: height * 0.015,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.043,
    marginBottom: height * 0.015,
  },
  eye: {
    position: 'absolute',
    marginTop: height * 0.065,
    marginLeft: width * 0.8,
    // alignItems:"center"
  },
  changeError: {
    fontWeight: '600',
    color: 'red',
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.04,
    marginLeft: width * 0.12
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
    // marginLeft: width * 0.1,
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
