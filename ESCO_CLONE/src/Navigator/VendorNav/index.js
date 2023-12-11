import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import V_Dashboard from "../../VendorScreens/V_Dashboard"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import V_Detail from "../../VendorScreens/V_Detail";
import V_Profile from "../../VendorScreens/V_Profile";
import { Dimensions, Image } from "react-native";
import FoodForm from "../../VendorScreens/FoodForm"
import V_ProductDetail from "../../VendorScreens/V_ProductDetail"
import V_Edit from "../../VendorScreens/V_Edit"
import V_Aboutus from "../../VendorScreens/V_aboutus"
import V_Contactus from "../../VendorScreens/V_contactus"
import V_Faq from "../../VendorScreens/V_faq"
import V_Privacypolicy from "../../VendorScreens/V_privacypolicy"
import V_password from "../../VendorScreens/V_password"
let { width, height } = Dimensions.get('window');


const Stack = createNativeStackNavigator();
const HomeComponent = () => {
    return (
        <Stack.Navigator
            initialRouteName="GetStarted"
            screenOptions={
                {
                    headerShown: false
                }
            }
        >
            <Stack.Screen name="V_Dashboard" component={V_Dashboard} />
            <Stack.Screen name="V_Detail" component={V_Detail} />
            <Stack.Screen name="V_Profile" component={V_Profile} />
            <Stack.Screen name="FoodForm" component={FoodForm} />
            <Stack.Screen name="V_ProductDetail" component={V_ProductDetail} />
            <Stack.Screen name="V_Edit" component={V_Edit} />
            <Stack.Screen name="V_Aboutus" component={V_Aboutus} />
            <Stack.Screen name="V_Contactus" component={V_Contactus} />
            <Stack.Screen name="V_Faq" component={V_Faq} />
            <Stack.Screen name="V_Privacypolicy" component={V_Privacypolicy} />
            <Stack.Screen name="V_password" component={V_password} />
            

        </Stack.Navigator>
    )
}

const VendorNav = () => {
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
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" size={30} color="#ed1a23" />
                    ),

                }}
            />

            <Tab.Screen
                name="Details"
                component={V_Detail}
                options={{
                    tabBarLabel: 'Notification',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="bell" size={28} color="#ed1a23" />
                    ),

                }}
            />
 

            <Tab.Screen
                name="Profile"
                component={V_Profile}
                options={{
                    tabBarLabel: 'Setting',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Image style={{height:35,width:30,tintColor:"#ed1a23"}} source={require("../../Images/setting.png")}/>
                    ),

                }}
            />

        </Tab.Navigator>
    )
}
export default VendorNav;