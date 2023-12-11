import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import Map from '../screens/Map';
import AllServices from './AllServices';

const HomeStack = createNativeStackNavigator();
const HomeScreensStack = props => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <HomeStack.Screen name="Home" component={Home} {...props.navigation} />
      <HomeStack.Screen
        name="AllServices"
        component={AllServices}
        {...props.navigation}
      />
      <HomeStack.Screen name="Map" component={Map} {...props.navigation} />
    </HomeStack.Navigator>
  );
};

export default HomeScreensStack;
