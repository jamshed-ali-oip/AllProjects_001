import React from 'react';
import {Dimensions, Image} from 'react-native';
import Agenda from '../../Screens/Agenda';
import Attendees from '../../Screens/Attendees';
import Chat from '../../Screens/Chat';
import Notification from '../../Screens/Notification';
import Home from '../../Screens/Home';
import {View, Text} from 'react-native';
import Profile from '../../Screens/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AboutResturant from '../../Screens/AboutResturant';
// import Policy from '../../Screens/LegalNotice';
import LegalNotice from '../../Screens/LegalNotice';
import Debitinfo from '../../Screens/Debitinfo';
import Myorders from '../../Screens/Myorders';
import Informationscreen from '../../Screens/Informationscreen';
import Terms from '../../Screens/Terms';
let {width, height} = Dimensions.get('window');
const Stack = createNativeStackNavigator();
const HomeComponent = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Agenda" component={Agenda} />
      <Stack.Screen name="Attendees" component={Attendees} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="AboutResturant" component={AboutResturant} />
      <Stack.Screen name="LegalNotice" component={LegalNotice} />
      <Stack.Screen name="Debitinfo" component={Debitinfo} />
      <Stack.Screen name="Myorders" component={Myorders} />
      <Stack.Screen name="Informationscreen" component={Informationscreen} />
      <Stack.Screen name="Terms" component={Terms} />
      

    </Stack.Navigator>
  );
};
const AppNav = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        
        tabBarStyle: {
          height: height * 0.07,
          // paddingBottom: height * 0.009,
          
          paddingTop: height * 0.006,
          borderTopEndRadius: height * 0.02, 
          borderTopStartRadius: height * 0.02,
          elevation:10
        },
        
      }}>
      <Tab.Screen
        name="Home"
        
        component={HomeComponent}
        options={{
          tabBarActiveTintColor: '##e73d34',
          tabBarInactiveTintColor:"black",
          //    tabBarInactiveBackgroundColor:"#ed1a23",
          headerShown: false,
          tabBarLabel:"",
          tabBarIcon: ({color, size, tintColor}) => (
            <Image
              style={{
                height:height*0.05,
                width: width*0.07,
                tintColor: color,
                resizeMode: 'contain',
              }}
              source={require('../../images/home.png')}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Agenda"
        component={Agenda}
        options={{
          tabBarActiveTintColor: '#e73d34',
          tabBarInactiveTintColor:"black",
          headerShown: false,
          tabBarLabel:"",
          tabBarIcon: ({color, size}) => (
            <Image
              style={{
                height:height*0.05,
                width: width*0.07,
                tintColor: color,
                resizeMode: 'contain',
              }}
              source={require('../../images/agenda.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Attendees"
        component={Attendees}
        options={{
          tabBarLabel:"",
          tabBarActiveTintColor: '#e73d34',
          tabBarInactiveTintColor:"black",
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Image
              style={{
                height:height*0.085,
                width: width*0.085,
                tintColor: color,
                resizeMode: 'contain',
              }}
              source={require('../../images/Attandees.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel:"",
          tabBarActiveTintColor: '#e73d34',
          tabBarInactiveTintColor:"black",
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Image
              style={{
                height:height*0.05,
                width: width*0.07,
                tintColor: color,
                resizeMode: 'contain',
              }}
              source={require('../../images/chat.png')}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel:"",
          tabBarActiveTintColor: '#e73d34',
          tabBarInactiveTintColor:"black",
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Image
              style={{
                height:height*0.05,
                width: width*0.07,
                tintColor: color,
                resizeMode: 'contain',
              }}
              source={require('../../images/notification.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default AppNav;
