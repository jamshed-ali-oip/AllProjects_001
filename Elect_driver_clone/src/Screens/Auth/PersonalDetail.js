import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { InfoInput } from '../../Compoents/Inputs/Inputs';
import { IconButton, PrimaryButton } from '../../Compoents/Buttons/BTN';
import Colors from '../../assets/Colors/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../redux/actions/user.action';
import moment from 'moment/moment';
import DatePicker from 'react-native-date-picker'
import { ActivityIndicator } from 'react-native';
let { height, width } = Dimensions.get('window');

const PersonalDetail = ({ navigation }) => {
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

  const [phone, setPhone] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [first_name, setfirst_name] = useState("")
  const [last_name, setlast_name] = useState("")
  const [gender, setgender] = useState("")
  const [dateOfBirth, setdateOfBirth] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [Loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const signup = () => {
    // const date = new Date('2023-02-25');
    setLoading(true)
    var data = {
      phone: '+1' + phone,
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      gender: gender?.toUpperCase(),
      dateOfBirth: new Date(dateOfBirth),
    };
    console.log(data)
    dispatch(registerUser(data, navigation, setLoading));
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.bg, flex: 1 }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={styles.back}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={[styles.welcome, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme }]}>{Country == "UKRAINE" ? "Особиста деталь" : "Personal detail"}</Text>
      </View>
      <View
        style={{
          marginTop: height * 0.055,
        }}>
        <InfoInput
          placeholder={Country == "UKRAINE" ? "Ім'я" : "First Name"}
          source={require('../../assets/images/profile.png')}
          onChangeText={setfirst_name}
          value={first_name}
        />
        <InfoInput
          placeholder={Country == "UKRAINE" ? "Прізвище" : "Last Name"}
          source={require('../../assets/images/profile.png')}
          onChangeText={setlast_name}
          value={last_name}
        />
        <DatePicker
          modal
          open={open}
          date={dateOfBirth}
          mode="date"
          onConfirm={(date) => {
            setOpen(false)
            setdateOfBirth(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />
        {/* <InfoInput
          placeholder="Date Of Birth"
          source={require('../../assets/images/date.png')}

        /> */}
        <TouchableOpacity
          onPress={() => { setOpen(true) }}
          style={styles.box}
        >
          <Text
            style={styles.text}
          >
            {/* State of issue */}
            {moment(dateOfBirth).format("DD/MM/YYYY")}
          </Text>
          <Image
            source={require("../../assets/images/date.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <InfoInput
          placeholder={Country == "UKRAINE" ? "Адреса електронної пошти" : "Email Address"}
          source={require('../../assets/images/email.png')}
          onChangeText={setemail}
          value={email}
        />
        <InfoInput
          placeholder={Country == "UKRAINE" ? "Пароль" : "Password"}
          source={require('../../assets/images/profile.png')}
          onChangeText={setpassword}
          value={password}
          secureTextEntry={true}
        // maxLength={10}
        />
        <InfoInput
          placeholder={Country == "UKRAINE" ? "Номер телефону" : "Phone Number"}
          source={require('../../assets/images/phone.png')}
          onChangeText={setPhone}
          value={phone}
          maxLength={10}
        />

        <InfoInput
          placeholder={Country == "UKRAINE" ? "Стать" : "Gender"}
          source={require('../../assets/images/profile.png')}
          onChangeText={setgender}
          value={gender}
          maxLength={10}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingHorizontal: width * 0.1,
          marginTop: height * 0.11,
        }}>
        <IconButton
          source={require('../../assets/images/scan.png')}
        // onPress={()=>{navigation.navigate("Scanner")}}
        />
        <PrimaryButton
          title={Loading == true ? <ActivityIndicator size={"small"} color={Colors.white} /> : Country == "UKRAINE" ? "Надіслати" : "Submit"}
          onPress={() => {
            // navigation.navigate('Ottp');
            signup();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PersonalDetail;

const styles = StyleSheet.create({
  back: {
    resizeMode: 'contain',
    height: height * 0.05,
    // backgroundColor:"red",
    width: width * 0.13,
    // alignSelf: "center",
    marginTop: height * 0.03,
  },
  welcome: {
    fontSize: width * 0.05,
    fontFamily: 'Poppins-Bold',
    color: Colors.theme,
    marginTop: height * 0.036,
    marginLeft: width * 0.05,
    // backgroundColor:"red"
  }, box: {
    // backgroundColor: "red",
    height: height * 0.07,
    // margin: width*0.0325,
    // borderWidth: 1,
    borderColor: Colors.placeholder,
    padding: width * 0.0135,
    borderWidth: 1,
    alignSelf: 'center',
    width: width * 0.85,
    // backgroundColor:"red"
    color: '#000000',
    fontFamily: 'Poppins-Regular',
    borderRadius: width * 0.015,
    paddingLeft: width * 0.035,
    justifyContent: "center", marginTop: height * 0.02
  },
  icon: {
    resizeMode: 'contain',
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingRight: width * 0.12,
    marginTop: height * 0.022,
    tintColor: '#ababac',
    // backgroundColor:"red"

  },
  text: {
    color: Colors.text,
    fontSize: width * 0.035,
    fontFamily: 'Poppins-Regular',

  }
});
