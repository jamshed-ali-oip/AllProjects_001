import { StyleSheet, Text, View, Dimensions, TouchableOpacity,Modal,  ImageBackground } from 'react-native';
import React, { useState } from 'react';
import Inputs from '../../components/Inputs';
import Colors from '../../assets/colors/Colors';
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react';
import { SET_PAGE_ONE } from '../../redux/const/const';
import { update_First_Page, UserDetail } from '../../redux/actions/user.action';

let { width, height } = Dimensions.get('window');
const Page1 = ({ setPage, profile }) => {
  const USER_DATA = useSelector((state) => state?.auth?.User)
  const prefilledData = useSelector((state) => state?.auth?.credential?.User)
  const userId = useSelector((state) => state?.auth?.credential?.User?._id)
  const [firstName, setFirstName] = useState()
  const [lastName, setlastName] = useState()
  const [phone, setPhone] = useState()
  const [detail, setDetail] = useState()
  const [Reminder, setReminder] = useState(false);
  const dispatch = useDispatch()
  // console.log("0+detail?.phone?.slice(2)",0+detail?.phone?.slice(2))
  useEffect(() => {

    UserInfo()

  }, [])
  const UserInfo = async () => {
    const {data}  = await UserDetail(userId)
    setDetail(data?.User)

  }
// console.log(detail)
  useEffect(() => {
    var number = 0 + detail?.phone?.slice(2)
    if (detail) {
      setFirstName(detail?.firstName)
      setlastName(detail?.lastName)
      setPhone(number)
    }
  }, [detail,profile])
  // useEffect(() => {
  //   if (USER_DATA) {
  //     setFirstName(USER_DATA?.firstName)
  //     setlastName(USER_DATA?.lastName)
  //     setPhone(0 + USER_DATA?.phone)
  //   } else {
  //     setFirstName()
  //     setlastName()
  //     setPhone()
  //   }

  // }, [USER_DATA])

  // const USER_DATA=useSelector((state)=>state?.auth?.User?.data)
  // console.log("USER_DATAUSER_DATAUSER_DATAUSER_DATA",USER_DATA)
  const setPageOneData = () => {
    let data = {
      firstName,
      lastName,
      phone: phone?.slice(1),
      progress:0.2
    }
    if (firstName === undefined || lastName === undefined || phone === undefined) {
       return setReminder(true)
    }
    else {
      dispatch(update_First_Page(userId, data, setPage))
    }
  }
  return (
    <View style={{ marginTop: height * 0.015 }}>
      <Text style={styles.text}>Ton prénom</Text>
      <Inputs
        placeholder="Laurent"
        height={height * 0.055}
        width={width * 0.79}
        widths={width * 0.79}
        setvalue={setFirstName}
        value={firstName}
        // defaultValue={detail?.firstName}
      />
      <Text style={styles.text}>Ton nom</Text>
      <Inputs
        placeholder="Durant"
        height={height * 0.055}
        width={width * 0.79}
        widths={width * 0.79}
        setvalue={setlastName}
        value={lastName}
        // defaultValue={detail?.lastName}
      />
      <Text style={styles.text}>Ton num’</Text>
     
      <Inputs
        placeholder="06.06.06.06.06"
        height={height * 0.055}
        width={width * 0.79}
        widths={width * 0.79}
        type="numeric"
        setvalue={setPhone}
        value={phone}
        maxletter={11}
        // defaultValue={0+detail?.phone.slice(2)}
      
/>
      <TouchableOpacity

        onPress={() => setPageOneData()}

        style={styles.touch}>
        <Text style={styles.text2}>Continuer</Text>
      </TouchableOpacity>

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
    </View>

  );
};

export default Page1;

const styles = StyleSheet.create({
  text: {
    fontSize: width * 0.045,
    // fontWeight: '700',
    color: 'black',
    marginLeft: width * 0.1,
    marginVertical: height * 0.005,
    fontFamily: 'Bebas Neue Pro Bold',
  }, text2: {
    color: '#fdbf18',
    fontSize: width * 0.035,
    fontWeight: '700',
  }, touch: {
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
