import React from "react";
import {Image,Dimensions} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from "../../AppScreens/Dashboard";
import Profile from "../../AppScreens/Profile";
import Details from "../../AppScreens/detail";
import { TabActions } from "@react-navigation/native";
// import { Dimensions } from "react-native";
import Header from "../../Common/Header";
import Icons from "../../Common/icons";
import ShopScreen from "../../AppScreens/ShopScreen";
import ServicesCat from "../../AppScreens/ServicesCat"
import FoodCat from "../../AppScreens/FoodCat"
import ProductCat from "../../AppScreens/ProductCat"
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FoodScreen from "../../AppScreens/Food/foodScreen"
import Aboutus from "../../AppScreens/aboutus"
import Contactus from "../../AppScreens/contactus"
import Faq from "../../AppScreens/faq"
import Privacypolicy from "../../AppScreens/privacypolicy"
import Password from "../../AppScreens/password"
import Videoshow from "../../AppScreens/Videoshow"

const Stack = createNativeStackNavigator();

let { width, height } = Dimensions.get('window');

const HomeComponent = () => {
    return (
        <Stack.Navigator
            initialRouteName="dashboard"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="dashboard" component={Dashboard} />
            <Stack.Screen name="details" component={Details} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="ShopScreen" component={ShopScreen} />
            <Stack.Screen name="ServicesCat" component={ServicesCat} />
            <Stack.Screen name="FoodCat" component={FoodCat} />
            <Stack.Screen name="ProductCat" component={ProductCat} />
            <Stack.Screen name="FoodScreen" component={FoodScreen}/>
            <Stack.Screen name="Aboutus" component={Aboutus} />
            <Stack.Screen name="Contactus" component={Contactus} />
            <Stack.Screen name="Faq" component={Faq} />
            <Stack.Screen name="Privacypolicy" component={Privacypolicy} />
            <Stack.Screen name="password" component={Password} />
            <Stack.Screen name="videoshow" component={Videoshow}/>
        </Stack.Navigator>
    )

}

const AppNav = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {
                    height: height * 0.088,
                    paddingBottom: height * 0.009,
                    paddingTop: height * 0.006,
                },
               

            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeComponent}
                options={{
                    tabBarLabel: 'Home',
                   tabBarActiveTintColor:"#ed1a23",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" size={30} color="#ed1a23" />
                      ),

                }}
            />

            <Tab.Screen
                name="Details"
                component={Details}
                options={{
                    tabBarLabel: 'Notification',
                    tabBarActiveTintColor:"#ed1a23",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="bell" size={30} color="#ed1a23" />
                      ),

                }}
            />


            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Setting',
                    tabBarActiveTintColor:"#ed1a23",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Image style={{height:35,width:30,tintColor:"#ed1a23"}} source={require("../../Images/setting.png")}/>
                      ),

                }}
            />

        </Tab.Navigator>
    )
}
export default AppNav;