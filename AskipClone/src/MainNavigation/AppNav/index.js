import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StatusBar } from 'react-native';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AnimatedTabBarNavigator,
  TabButtonLayout,
} from 'react-native-animated-nav-tab-bar';
import HomeScreens from '../../screens/HomeScreens';
import EventsScreens from '../../screens/EventsScreens';
import WalletScreens from '../../screens/Walletscreens';
import ProfileScreens from '../../screens/ProfileScreens';
import Colors from '../../assets/colors/Colors';
import Connexion from '../../screens/ProfileScreens/Connexion';
import { Svg, Path } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { Stackprofile } from '../../redux/actions/user.action';
import deviceInfo from 'react-native-device-info'
const tablet = deviceInfo.isTablet()
let { width, height } = Dimensions.get('window');

const Stack = createNativeStackNavigator();

// const HomeComponent = () => {
//   const [ProfilStatus,setProfilStatus]=useState(false)
//   const userId = useSelector((state) => state?.auth?.credential?.User?._id)
//   useEffect(()=>{
//     StackChanges()
//   },[])
//   const StackChanges = async () => {
//     const { data } = await dispatch(Stackprofile(userId,setProfilStatus));
//     console.log("============================================================")
//     console.log("StackChanges",data)
//     console.log("============================================================")

//   }
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarHideOnKeyboard: true,
//       }}
//       initialRouteName="HomeScreens">
//       <Stack.Screen name="HomeScreens" component={HomeScreens} />
//       <Stack.Screen name="EventsScreens" component={EventsScreens} />
//       <Stack.Screen name="WalletScreens" component={WalletScreens} />
//       <Stack.Screen name="ProfileScreens" component={ProfileScreens} />



//     </Stack.Navigator>
//   );
// };
function TabBar() {

  const Tab = AnimatedTabBarNavigator();
  return (
    <Tab.Navigator

      initialRouteName="HomeScreens"
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        backgroundColor: 'blue',

      tabStyle: tablet ? {height: 120, paddingBottom: 30} :{}


      }}
      
      appearance={{
        activeTabBackgrounds: '#b3baca',
        tabBarBackground: Colors.theme_color,
        dotCornerRadius: width * 0.035,
        
      }}>

      <Tab.Screen
        name="HomeScreens"
        component={HomeScreens}
        options={{
          tabBarActiveTintColor: '#e73d34',
          tabBarInactiveTintColor: 'red',
          tabBarInactiveBackgroundColor: '#ed1a23',

          headerShown: false,
          tabBarLabel: 'Accueil',

          tabBarIcon: ({ focused, color, size }) => (
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="21"
              viewBox="0 0 23 21"
              fill="none">
              <Path
                d="M22.2084 10.836L12.0845 0.45739C11.6582 0.0194118 10.8393 0.0194118 10.4129 0.45739L0.289074 10.836C0.143354 10.985 0.0477042 11.1699 0.013755 11.3682C-0.0201941 11.5664 0.00902008 11.7695 0.0978457 11.9527C0.277826 12.3274 0.680531 12.5682 1.12486 12.5682H3.3746V19.8332C3.3746 20.1085 3.49312 20.3725 3.70407 20.5671C3.91503 20.7617 4.20114 20.8711 4.49948 20.8711H7.8741C8.17244 20.8711 8.45855 20.7617 8.66951 20.5671C8.88046 20.3725 8.99898 20.1085 8.99898 19.8332V15.6818H13.4985V19.8332C13.4985 20.1085 13.617 20.3725 13.8279 20.5671C14.0389 20.7617 14.325 20.8711 14.6233 20.8711H17.998C18.2963 20.8711 18.5824 20.7617 18.7934 20.5671C19.0043 20.3725 19.1228 20.1085 19.1228 19.8332V12.5682H21.3726C21.5904 12.5691 21.8039 12.5114 21.9868 12.4023C22.1698 12.2932 22.3144 12.1373 22.403 11.9537C22.4916 11.77 22.5203 11.5666 22.4858 11.3681C22.4512 11.1697 22.3548 10.9848 22.2084 10.836Z"
                fill="white"
              />
            </Svg>
          ),
        }}
      />

      <Tab.Screen
        name="EventsScreens"
        component={EventsScreens}
        options={{
          tabBarActiveTintColor: '#e73d34',
          tabBarInactiveTintColor: 'black',
          headerShown: false,
          tabBarLabel: 'Événements',
          tabBarIcon: ({ color, size }) => (
            // <Image
            //   style={{
            //     height: height * 0.04,
            //     width: width * 0.05,
            //     tintColor: color,
            //     resizeMode: 'contain',
            //   }}
            //   source={require('../../assets/images/agenda.png')}
            // />
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="20"
              viewBox="0 0 23 19"
              fill="none">
              <Path
                d="M11.5833 0.128906L14.109 7.29516H22.2826L15.6701 11.7241L18.1958 18.8904L11.5833 14.4614L4.97067 18.8904L7.49645 11.7241L0.883866 7.29516H9.05747L11.5833 0.128906Z"
                fill="white"
              />
            </Svg>
          ),
        }}
      />
      <Tab.Screen
        name="WalletScreens"
        component={WalletScreens}
        options={{
          tabBarLabel: 'Rendez-vous',
          tabBarActiveTintColor: '#e73d34',
          tabBarInactiveTintColor: 'black',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            // <Image
            //   style={{
            //     height: height * 0.04,
            //     width: width * 0.05,
            //     tintColor: color,
            //     resizeMode: 'contain',
            //   }}
            //   source={require('../../assets/images/Attandees.png')}
            // />
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="21"
              viewBox="0 0 23 21"
              fill="none">
              <Path
                d="M0.171776 17.7414C0.16886 19.5027 1.6269 20.8509 3.53649 20.8528L19.2625 20.8679C21.1721 20.8697 22.6346 19.5243 22.6375 17.763L22.6512 9.47475L0.185494 9.45319L0.171776 17.7414ZM19.2933 2.21929L17.0468 2.21714L17.0485 1.18111C17.0495 0.559488 16.6009 0.144644 15.9269 0.143997C15.2529 0.14335 14.8029 0.557332 14.8019 1.17895L14.8002 2.21498L8.06049 2.20851L8.06221 1.17248C8.06324 0.550864 7.61461 0.136021 6.94064 0.135374C6.26667 0.134727 5.81667 0.548708 5.81564 1.17033L5.81392 2.20636L3.56735 2.2042C1.65777 2.20237 0.195269 3.54781 0.192354 5.30906L0.188924 7.38113L22.6546 7.40268L22.6581 5.33062C22.661 3.56937 21.2029 2.22113 19.2933 2.21929Z"
                fill="white"
              />
            </Svg>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreens"
        component={ProfileScreens}
        options={{
          tabBarLabel: 'Profil',
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'black',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            // <Image
            //   style={{
            //     height: height * 0.04,
            //     width: width * 0.05,
            //     tintColor: color,
            //     resizeMode: 'contain',
            //   }}
            //   source={require('../../assets/images/chat.png')}
            // />
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="21"
              viewBox="0 0 23 21"
              fill="none">
              <Path
                d="M11.25 11.6523C2.925 11.6523 0 15.1094 0 17.414V20.8711H22.5V17.414C22.5 15.1094 19.575 11.6523 11.25 11.6523Z"
                fill="white"
              />
              <Path
                d="M11.25 10.5C14.7449 10.5 17.5781 8.17833 17.5781 5.31444C17.5781 2.45055 14.7449 0.128906 11.25 0.128906C7.75507 0.128906 4.92188 2.45055 4.92188 5.31444C4.92188 8.17833 7.75507 10.5 11.25 10.5Z"
                fill="white"
              />
            </Svg>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
