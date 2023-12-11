import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import routes from "./routes";
import Agenda from "../screens/Agenda";
import Notification from "../screens/Notification";
import { Icon } from "react-native-elements";
import colors from "../constants/colors";
import AttendeesStack from "./AttendeesStack";
import ChatStack from "./ChatStack";
import WelomeIfUser from "../screens/WelcomeIfUser";
import HeyUserScreen from "../screens/HeyUserScreen";
import VerifyInfoIfUser from "../screens/VerifyInfoIfUser";
import { Image } from "react-native"
import AboutScaleUp from "../screens/AboutScaleUp";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={routes.HOME_SCREEN}
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          headerShown : false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? require('../images/tabs/tabBarHomeIconon.png') : require('../images/tabs/tabBarHomeIcon.png')}
                style={{ width: 18, height: 18, resizeMode: "contain" }}
              />
            );
          },
          tabBarActiveTintColor: colors.primary,
        }}
      />
      <Tab.Screen
        name={routes.AGENDA_SCREEN}
        component={Agenda}
        options={{
          tabBarLabel: "Agenda",
          headerShown : false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? require('../images/tabs/tabBarCalendarIconon.png') : require('../images/tabs/tabBarCalendarIcon.png')}
                style={{ width: 18, height: 18, resizeMode: "contain" }}
              />
            );
          },
          tabBarActiveTintColor: colors.primary,
        }}
      />
      <Tab.Screen
        name={routes.ATTENDEES_SCREEN_TAB}
        component={AttendeesStack}
        options={{
          headerShown: false,
          tabBarLabel: "Attendees",
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? require('../images/tabs/tabBarAttendeesIconon.png') : require('../images/tabs/tabBarAttendeesIcon.png')}
                style={{ width: 18, height: 18, resizeMode: "contain" }}
              />
            );
          },
          tabBarActiveTintColor: colors.primary,
        }}
      />
      <Tab.Screen
        name={routes.CHAT_SCREEN_TAB}
        component={ChatStack}
        options={{
          headerShown: false,
          tabBarLabel: "Chat",
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? require('../images/tabs/tabBarChatIconon.png') : require('../images/tabs/tabBarChatIcon.png')}
                style={{ width: 18, height: 18, resizeMode: "contain" }}
              />
            );
          },
          tabBarActiveTintColor: colors.primary,
        }}
      />
      <Tab.Screen
        name={routes.NOTIFICATION_SCREEN}
        component={Notification}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? require('../images/tabs/tabBarNotificationIconon.png') : require('../images/tabs/tabBarNotificationIcon.png')}
                style={{ width: 18, height: 18, resizeMode: "contain" }}
              />
            );
          },
          tabBarActiveTintColor: colors.primary,
        }}
      />
    </Tab.Navigator>
  );
};

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {/* <Stack.Screen name={routes.WELCOME_IF_USER} component={WelomeIfUser} />
      <Stack.Screen name={routes.HEY_USER_SCREEN} component={HeyUserScreen} />
      <Stack.Screen name={routes.VERIFY_INFO_IF_USER} component={VerifyInfoIfUser} /> */}
      <Stack.Screen name={routes.HOME_SCREEN} component={TabStack} />
    </Stack.Navigator>
  );
};
