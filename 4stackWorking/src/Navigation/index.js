import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeReaView, ImageBackground, Dimensions, Image } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import RiderAppNav from './RiderSide/RiderAppNav';
import RiderAuthNav from './RiderSide/RiderAuthNav';
import UserAppNav from './UserSide/UserAppNav';
import UserAuthNav from './UserSide/UserAuthNav';
import SplashScreen from 'react-native-splash-screen'
import { LargeButton } from '../Compoents/Buttons/Butn';
const { height, width } = Dimensions.get('window');
const MainNav = () => {
  const [Side, setSide] = useState(true)
  const [ok, setok] = useState("STACK")
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <>
      {
        ok == "STACK" ?
          <View>
            {/* <LargeButton/>
  <TouchableOpacity
  onPress={()=>{
   setok("RIDER")
  }}
  >
  <Text>
     Rider
   </Text>
  </TouchableOpacity>
  <TouchableOpacity
    onPress={()=>{
     setok("USER")
    }}
  >
  <Text>
     User
   </Text>
  </TouchableOpacity> */}

            <Image
              style={{
                width: width * 0.75,
                height: height * 0.7,
                resizeMode: "contain",
                alignSelf: "flex-end",
                // backgroundColor:"red"
              }}
              source={require("../assets/images/background.png")}
            />
            <LargeButton />
            <LargeButton />

          </View>
          : null
      }

      {/* <ImageBackground
    resizeMode='contain'
    style={{height:height*0.8}}
    source={require("../assets/images/background.png")}
    >

    </ImageBackground> */}
      {/* <Image
    style={{
      width:width*0.75,
      height:height*0.7,
      resizeMode:"contain",
      alignSelf:"flex-end",
      // backgroundColor:"red"
    }}
    source={require("../assets/images/background.png")}
    /> */}

      {ok == "USER" ?
        <NavigationContainer>
          {/* {Side==true?<AppNav/>:<AuthNav/>} */}

          <UserAppNav />
          {/* <UserAuthNav/> */}
        </NavigationContainer>
        : null}
      {
        ok == "RIDER" ? <NavigationContainer>
          {/* {Side==true?<AppNav/>:<AuthNav/>} */}
          <RiderAppNav />
          {/* <RiderAuthNav/> */}

        </NavigationContainer> : null

      }
    </>
  )

}

export default MainNav

