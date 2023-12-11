import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  ImageBackground
} from 'react-native';
import React, { useState } from 'react';
import Inputs from '../../components/Inputs';
import Selector from '../../components/Selector';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Colors from '../../components/Colors';
const { height, width } = Dimensions.get('window');
import { Gender, Austre } from '../../assets/dummydata/Questions.json';
import { useDispatch, useSelector } from 'react-redux';
import { SET_PAGE_TWO } from '../../redux/const/const';
import { update_Second_Page, UserDetail } from '../../redux/actions/user.action';
import { useEffect } from 'react';
import axios from 'axios';
import { base_URL } from '../../config/config';

const Page2 = ({ setPage, profile }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [Select, setSelect] = useState('');
  const [Austre1, setAustre1] = useState('');
  const [email, setemail] = useState();
  const [postal, setpostal] = useState();
  const [Address, setAddress] = useState();
  const [color, setColor] = useState(false);
  const [Reminder, setReminder] = useState(false);
  const dispatch = useDispatch()
  const secondPageData = useSelector((state) => state?.user?.data)
  const USER_DATA = useSelector((state) => state?.auth?.User)
  const [validEmail, setValidEmail] = useState(false)
  const [emailMesage, setEmailMessage] = useState("")
  const [detail, setDetail] = useState()
  useEffect(() => {
    UserInfo()
  }, [])
  const UserInfo = async () => {
    const { data } = await UserDetail(userId)
    setDetail(data?.User)

  }
  // console.log("details22", detail)


  useEffect(() => {
    if (detail) {
      setemail(detail?.email)
      setDate(new Date(detail?.birthDate))
      setAddress(detail?.postalAddress)
      setpostal(detail?.zipCode)
      if (detail?.gender == "Homme") {
        setSelect({
          "id": 1,
          "name": "Homme"
        })
      }
      if (detail?.gender == "Femme") {
        setSelect({
          "id": 2,
          "name": "Femme"
        })
      }
      if (detail?.gender == "Autre") {
        setSelect({
          "id": 3,
          "name": "Autre"
        })
        setAustre1({
          "id": 3,
          "name": "Autre"
        })
      }
      if (detail?.gender == "Non précisé") {
        setSelect({
          "id": 4,
          "name": "Non précisé"
        })
      }
    }
  }, [detail, profile])


  const userId = useSelector((state) => state?.auth?.credential?.User?._id)
  const userEmail = useSelector((state) => state?.auth?.credential?.User?.email)



  const setPageTwoData = () => {
    let data = {
      birthDate: date,
      gender: Austre1 ? Austre1.name : Select.name,
      email,
      zipCode: Number(postal),
      postalAddress: Address,
      progress:0.4
    }


    if (data?.postalAddress === undefined || data?.email === undefined || data?.gender === undefined || data?.zipCode === undefined) {
       return setReminder(true)
    }
    else {
      // console.log(data, userId)
      dispatch(update_Second_Page(userId, { ...secondPageData, ...data }, setPage));
      // setPage(3)
    }
  }
  // useEffect(()=>{
  //   console.log(detail?.birthDate,"detail?.birthDate")
  //   if(detail?.birthDate==null||undefined){
  //     setColor(false)
  //   }else{
  //     setColor(true)
  //   }
  // },[])

  function onEmail() {
    if (email) {
      axios.put(`${base_URL}/user/${userId}`, {
        email,
        userEmail,
        userId
      })
        .then((res) => {
          setValidEmail("valid")
          setEmailMessage(res.data?.message)
        })
        .catch((err) => {
          setValidEmail("invalid")
          // console.log(err.response.data)
          setEmailMessage(err.response?.data?.error)
        })
    }
  }

  return (
    <ScrollView>
      <View style={{ marginTop: height * 0.025 }}>
        <View style={Styles.barline}>
          <Text style={Styles.text}>Ton genre</Text>
          <View>
            <Selector
              boxheight={height * 0.045}
              boxwidth={width * 0.5}
              dropdownwidth={width * 0.5}
              placeholder={Select.name ? <Text
                style={{ color: "black" }}
              >{Select.name}</Text> : <Text> Sélécteur de genre</Text>}
              data={Gender}
              customFunction={value => setSelect(value)}
            />
            {Select.id == 3 ? (
              <View style={{ marginTop: height * 0.005 }}>
                <Selector
                  boxheight={height * 0.045}
                  boxwidth={width * 0.5}
                  dropdownwidth={width * 0.5}
                  placeholder={Austre1.name ? <Text
                    style={{ color: "black" }}
                  >{Austre1.name}</Text> : <Text style={{ color: "#afafaf" }} > Sélécteur de genre</Text>}
                  data={Austre}
                  customFunction={value => setAustre1(value)}
                />
              </View>
            ) : null}
          </View>

        </View>
        <View style={Styles.barline}>
          <Text style={Styles.text}>Ton mail</Text>
          <Inputs
            placeholder="Tapez votre mail ici"
            height={height * 0.045}
            width={width * 0.5}
            widths={width * 0.5}
            heights={height * 0.05}
            setvalue={setemail}
            value={email}
            blur={onEmail}
            validEmail={validEmail}
            emailMesage={emailMesage}
            defaultValue={detail?.email}
          // onFocus={()=>{alert("email")}}jamshed
          />
        </View>
        <View style={Styles.barline}>
          <Text style={Styles.text}>Ta date de naissance</Text>

          <TouchableOpacity
            style={{
              height: height * 0.05,
              width: width * 0.5,
              borderWidth: 2,
              borderColor: '#e3e6eb',
              borderRadius: width * 0.015,
              padding: width * 0.014,
              justifyContent:'center',
              alignItems:'flex-start'
            }}
            onPress={() => {
              setOpen(true);
            }}>
          
            <Text style={{ fontSize: width * 0.035, color: color ? "black" : '#b0b0b0' }}>
               {moment(date).format('DD/MM/YYYY')}
            </Text>
            {/* <Text style={{ fontSize: width * 0.035, color: color ? "black" : '#b0b0b0',marginLeft:width*0.02 }}>
              {!color ? moment(detail?.birthDate).format('DD/MM/YYYY') : moment(date).format('DD/MM/YYYY')}
            </Text> */}
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={date}
            locale={'fr'}
          
            // minimumDate={new Date(1990, 1, 1)}
            maximumDate={new Date(2006, 12, 1)}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setColor(true)
            }}
            confirmText="Confirmer"
            cancelText="Annuler"
            mode="date"
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View style={Styles.barline}>
          <Text style={Styles.text}>Ton adresse</Text>
          <Inputs
            placeholder="Rue et numéro"
            height={height * 0.045}
            width={width * 0.5}
            heights={height * 0.05}
            setvalue={setAddress}
            value={Address}
            widths={width * 0.5}
            defaultValue={detail?.postalAddress}
          />
        </View>
        <View style={Styles.barline}>
          <Text style={[Styles.text, { marginLeft: -width * 0.325 }]}>
            Ton code postal
          </Text>
          <Inputs
            placeholder="69000"
            height={height * 0.045}
            width={width * 0.17}
            heights={height * 0.05}
            type="numeric"
            maxletter={5}
            setvalue={setpostal}
            value={postal}
            widths={width * 0.5}
            defaultValue={detail?.zipCode}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => setPageTwoData()}

        style={Styles.touch}>
        <Text style={Styles.text2}>Continuer</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={Reminder}
        onRequestClose={() => {

          setReminder(!Reminder);
        }}
      >
        <View style={Styles.centeredView}>
          <View style={Styles.rawBottomModalView}>
            <ImageBackground
              imageStyle={{ borderRadius: width * 0.08 }}
              style={Styles.rawBottomModalImage}
              source={require('../../assets/images/Background2.png')}>

              <>
                <Text style={Styles.attention}>ATTENTION! </Text>
                <Text style={Styles.modalText}>
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
                    style={Styles.rawBottomButons}>
                    <Text style={Styles.btn}>D'accord</Text>
                  </TouchableOpacity>

                </View>
              </>

            </ImageBackground>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Page2;

const Styles = StyleSheet.create({
  barline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.005,
  },
  text: {
    fontSize: width * 0.046,
    color: 'black',
    width: width * 0.4,
    marginLeft: width * 0.001,
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
