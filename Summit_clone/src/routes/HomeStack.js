import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Header } from "react-native-elements";
import AboutScaleUp from "../screens/AboutScaleUp";
import AboutSpeakerProfile from "../screens/AboutSpeakerProfile";
import GlobalLeadershipProgram from "../screens/GlobalLeadershipProgram";
import AttendeeDetailsScreen from "../screens/AttendeeDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import Preperation from "../screens/Preperation";
import Resources from "../screens/Resources";
import routes from "./routes";
import EventRecourcesEdit from "../screens/EventRecourcesEdit";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={routes.ABOUT_SCALE_UP} component={AboutScaleUp} options={{headerShown : false}} />
      <Stack.Screen name={routes.GLOBAL_LEADERSHIP_PROGRAM} component={GlobalLeadershipProgram} options={{headerShown : false}} />
      <Stack.Screen name={routes.ABOUT_SPEAKER_PROFILE} component={AboutSpeakerProfile} options={{headerShown : false}} />
      <Stack.Screen name={routes.RESOURCES} component={Resources} options={{headerShown : false}} />
      <Stack.Screen name={routes.PREPERATION} component={Preperation} options={{headerShown : false}} />
      <Stack.Screen name={routes.EVENT_RESOURCES_EDIT} component={EventRecourcesEdit} options={{headerShown : false}} />
    </Stack.Navigator>
  );
};

export default HomeStack;
