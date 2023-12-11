import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../assets/Colors/Colors'
import { InfoInput } from '../../../Compoents/Inputs/Inputs'
import { PrimaryButton } from '../../../Compoents/Buttons/BTN'
import { useDispatch, useSelector } from 'react-redux'
import { ResetPassword } from '../../../redux/actions/user.action'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
const { height, width } = Dimensions.get("window")
const Opportunities = ({ navigation }) => {
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
  const [edit, setedit] = useState(false)
  const [oldPass, setoldPass] = useState()
  const [newPass, setnewPass] = useState()
  const [cNewPass, setcNewPass] = useState()
  const [message, setmessage] = useState(null)
  const [show, setshow] = useState(true)
  const [Loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const ChangePassword = () => {
    setLoading(true)
    const data = {
      oldPassword: oldPass,
      password: newPass,
    }
    if (newPass !== cNewPass) {
      Toast.show({
        type: 'error',
        text1: Country == "UKRAINE" ? "пароль не збігається" : 'password not match',
        text2: Country == "UKRAINE" ? "Новий пароль і пароль підтвердження не збігаються" : 'New password and Confirm password does not match '
      })
      setLoading(false)
    } else if (newPass?.length < 8 && cNewPass?.length < 8) {
      Toast.show({
        type: 'error',
        text1: Country == "UKRAINE" ? "Пароль не збігається" : 'Password not matched',
        text2: Country == "UKRAINE" ? "Новий пароль і пароль підтвердження не збігаються" : 'New password and Confirm password does not match '
      })
      setLoading(false)
    } else {
      dispatch(ResetPassword(data, Toast, navigation, setLoading))
    }
  }



  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.bg }}
    >

      <View
        style={{ flexDirection: "row", alignItems: "center", padding: width * 0.0325 }}
      >
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}
        >
          <Image
            style={{ resizeMode: "contain" }}
            source={require("../../../assets/images/back.png")}
          />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "Poppins-Bold", color: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme, fontSize: width * 0.045, marginLeft: width * 0.025, width: width * 0.7 }}
        >
          {Country == "UKRAINE" ? "Конфіденційність і безпека" : "Privacy & Security"}
        </Text>
        <TouchableOpacity
          disabled={edit == false ? false : true}
          onPress={() => { setedit(true) }}
        >
          <Image
            style={{ resizeMode: "contain", tintColor: edit == true ? Colors.placeholder : null }}
            source={Country == "UKRAINE" ? require("../../../assets/images/DrawerIcon/editukr.png") : require("../../../assets/images/DrawerIcon/edit.png")}
          // source={require("../../../assets/images/DrawerIcon/editukr.png")}
          />
        </TouchableOpacity>
      </View>
      <Toast ref={(ref) => { Toast.setref(ref) }} />
      <ScrollView>
        <View
          style={{ marginTop: height * 0.04657 }}
        >

          <InfoInput
            value={oldPass}
            // source={require("../../../assets/images/profile.png")}
            editable={edit}
            onChangeText={setoldPass}
            placeholder={Country == "UKRAINE" ? "Старий пароль" : "Old Password"}
            secureTextEntry={show}
          />
          <InfoInput
            value={newPass}
            // source={require("../../../assets/images/profile.png")}
            editable={edit}
            onChangeText={setnewPass}
            secureTextEntry={show}
            placeholder={Country == "UKRAINE" ? "Новий пароль" : "New Password"}
          />
          <InfoInput
            value={cNewPass}
            // source={require("../../../assets/images/profile.png")}
            editable={edit}
            placeholder={Country == "UKRAINE" ? "Підтвердити новий пароль" : "Confirm New Password"}
            secureTextEntry={show}
            onChangeText={setcNewPass}
          />
          <TouchableOpacity
            onPress={() => { setshow(!show) }}
          >

            <Text
              style={{
                color: Colors.text,
                borderBottomColor: Colors.text,
                borderBottomWidth: 1,
                width: Country == "UKRAINE" ? width * 0.32 : width * 0.29,
                marginLeft: width * 0.088,
                marginTop: height * 0.0125,
                fontFamily: "Poppins-Medium"
              }}
            >{show === true ? Country == "UKRAINE" ? "Показати пароль" : "Show Password" : Country == "UKRAINE" ? "Приховати пароль" : "Hide Password"}</Text>
          </TouchableOpacity>
          {/* <InfoInput
    value={"fkljsdgfkjgsa"}
    source={require("../../../assets/images/profile.png")}
    editable={edit}
/> */}
          {
            edit == true ? <PrimaryButton
              onPress={() => { ChangePassword() }}
              title={Loading == true ? <ActivityIndicator size={'small'} color={"#ffffff"} /> : Country == "UKRAINE" ? "зберегти" : "Save"} /> : null
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Opportunities

const styles = StyleSheet.create({})