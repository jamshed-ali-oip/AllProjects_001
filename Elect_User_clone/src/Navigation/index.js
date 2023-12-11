import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import AppNav from './AppNav';
import AuthNav from './AuthNav';
import SplashScreen from 'react-native-splash-screen'
import { useDispatch, useSelector } from 'react-redux';
import { CountryDetect } from '../redux/actions/user.action';
import { CurrentLocation, locationPermission } from '../config/LiveLocationHelper';


const MainNav = () => {
  const [Side, setSide] = useState(false)
  const [location, setlocation] = useState()
  const User_controller = useSelector((state) => state?.auth?.accesToken?.data?.user?.phone_status)
  console.log("Controller data ", User_controller)

  useEffect(() => {
    SplashScreen.hide()

  }, [])
  useEffect(() => {

    getCurrentLocation()

  }, [])
  const dispatch = useDispatch()
  const getCurrentLocation = async () => {
    const PermissionDenied = await locationPermission()
    console.log("location permission", PermissionDenied)
    if (PermissionDenied) {
      const res = await CurrentLocation()
      console.log("Response=========>>>>>>>", res)
      Locationverfication(res)
    }
  }
  // const linking = {
  //   prefixes: ["electUser://"],

  // };
  // )
  const Locationverfication = (res) => {
    const data = {
      latitude: `${res?.latitude}`,
      longitude: `${res?.longitude}`
      // latitude: "48.3794",
      // longitude: "31.1656"
    }
    console.log(data)
    dispatch(CountryDetect(data))
  }
  return (

    <NavigationContainer
    // linking={linking}
    >

      {User_controller == "VERIFIED" ? <AppNav /> : <AuthNav />}
    </NavigationContainer>

  )

}

export default MainNav

