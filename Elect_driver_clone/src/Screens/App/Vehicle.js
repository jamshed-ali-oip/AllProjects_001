// import { StyleSheet, Text, View } from 'react-native'

import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { InfoInput } from '../../Compoents/Inputs/Inputs'
import { IconButton, PrimaryButton } from '../../Compoents/Buttons/BTN'
import Colors from '../../assets/Colors/Colors'
import DatePicker from 'react-native-date-picker'
import moment from 'moment/moment'
import { VehicleInfoAdd } from '../../redux/actions/driver.action'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native'
let { height, width } = Dimensions.get("window")
import { Toast } from 'react-native-toast-message/lib/src/Toast'

const Vehicle = ({ navigation }) => {
  const [open, setOpen] = useState(false)
  const [open2, setopen2] = useState(false)
  const [make, setmake] = useState()
  const [model, setmodel] = useState()
  const [year, setyear] = useState()
  const [body_type, setbody_type] = useState()
  const [color, setcolor] = useState()
  const [Rnumber, setRnumber] = useState()
  const [driver_license, setdriver_license] = useState()
  const [Loading, setLoading] = useState(false)
  const [start_date, setstart_date] = useState(new Date())
  const [end_date, setend_date] = useState(new Date())
  console.log("dattadtadtdattad", start_date)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth?.accesToken?.accessToken)
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

  // console.log("my tokensss", token)
  const SubmitVehicle = () => {
    setLoading(true)
    var data = {
      make: make,
      year: Number(year),
      model: model,
      body_type: body_type,
      driver_license: Number(driver_license),
      start_date: new Date(start_date),
      color: color,
      vehicle_number: Rnumber,
      // moment(start_date).format("YYYY-MM-DDTHH:mm:ssZ"),
      end_date: new Date(end_date),
      // moment(end_date).format("YYYY-MM-DDDDTHH:mm:ssZ")
    }
    console.log(data)
    dispatch(VehicleInfoAdd(data, navigation, setLoading, Toast))
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.bg, flex: 1 }}
    >
      <View
        style={{ flexDirection: "row" }}
      >
        <TouchableOpacity
          activeOpacity={100}
        // onPress={() => { navigation.goBack() }}
        >
          <Image
            style={styles.back}
            source={require("../../assets/images/back.png")}
          />
        </TouchableOpacity>
        <Text
          style={[styles.welcome, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme }]}
        >
          {Country == "UKRAINE" ? "Деталь транспортного засобу" : "Vehicle detail"}
        </Text>
      </View>
      <Toast ref={(ref) => { Toast.setref(ref) }} />
      <ScrollView >
        <View
          style={{
            marginTop: height * 0.055
          }}
        >
          <InfoInput
            placeholder={Country == "UKRAINE" ? "зробити" : "Make"}
            source={require("../../assets/images/car.png")}
            onChangeText={setmake}
            value={make}
          />
          <InfoInput
            placeholder={Country == "UKRAINE" ? "рік" : "Year"}
            source={require("../../assets/images/date.png")}
            onChangeText={setyear}
            value={year}
          />
          <InfoInput
            placeholder={Country == "UKRAINE" ? "Модель" : "Model"}
            source={require("../../assets/images/car.png")}
            onChangeText={setmodel}
            value={model}
          />
          <InfoInput
            placeholder={Country == "UKRAINE" ? "Статура" : "Body type"}
            source={require("../../assets/images/body.png")}
            onChangeText={setbody_type}
            value={body_type}
          />
          <InfoInput
            placeholder={Country == "UKRAINE" ? "Номер водійського посвідчення" : "Driver's lisence number"}
            source={require("../../assets/images/card.png")}
            onChangeText={setdriver_license}
            value={driver_license}
          />
          <InfoInput
            placeholder={Country == "UKRAINE" ? "Колір автомобіля" : "Car Color"}
            source={require("../../assets/images/card.png")}
            onChangeText={setcolor}
            value={color}
          />
          <InfoInput
            placeholder={Country == "UKRAINE" ? "Номер дисплея автомобіля" : "Car Display Number"}
            source={require("../../assets/images/card.png")}
            onChangeText={setRnumber}
            value={Rnumber}
          />
          <DatePicker
            modal
            open={open}
            date={start_date}
            mode="date"
            onConfirm={(date) => {
              setOpen(false)
              setstart_date(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
          <DatePicker
            modal
            open={open2}
            date={end_date}
            mode="date"
            onConfirm={(date) => {
              setopen2(false)
              setend_date(date)
            }}
            onCancel={() => {
              setopen2(false)
            }}
          />

          <TouchableOpacity
            onPress={() => { setOpen(true) }}
            style={styles.box}
          >
            <Text
              style={styles.text}
            >
              {/* State of issue */}
              {moment(start_date).format("DD/MM/YYYY")}
            </Text>
            <Image
              source={require("../../assets/images/date.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { setopen2(true) }}

            style={styles.box}
          >
            <Text
              style={styles.text}
            >
              {/* Expiration date */}
              {moment(end_date).format("DD/MM/YYYY")}
            </Text>
            <Image
              source={require("../../assets/images/date.png")}
              style={styles.icon}
            />
          </TouchableOpacity>



        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingHorizontal: width * 0.1,
            marginTop: height * 0.06,
            marginBottom: height * 0.035
          }}
        >
          {/* <IconButton
          source={require("../../assets/images/scan.png")}
          onPress={() => { navigation.navigate("Scanner") }}

        /> */}
          <PrimaryButton
            title={Country == "UKRAINE" ? "Надіслати" : "Submit"}
            // onPress={() => { navigation.navigate("Scanner") }}
            onPress={() => { SubmitVehicle() }}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Vehicle

const styles = StyleSheet.create({
  back: {
    resizeMode: "contain",
    height: height * 0.05,
    // backgroundColor:"red",
    width: width * 0.13,
    // alignSelf: "center",
    marginTop: height * 0.03,

  },
  welcome: {
    fontSize: width * 0.05,
    fontFamily: "Poppins-Bold",
    color: Colors.theme,
    marginTop: height * 0.036,
    marginLeft: width * 0.05,
    // backgroundColor:"red"
  },
  box: {
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
})