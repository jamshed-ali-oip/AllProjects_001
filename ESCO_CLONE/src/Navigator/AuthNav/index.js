import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React,{useEffect} from "react";
import Home from "../../AuthScreens/Home";
import GetStatedScreen from "../../AuthScreens/GetStartScreen";
import SplitScreen from "../../AuthScreens/SplitScreen";
import CustomeAlert from "../../Common/Alert";
import SignUpUser from "../../AuthScreens/SignupUser";
import SignUpVendor from "../../AuthScreens/SignupVendor";
import LoginUser from "../../AuthScreens/LoginUser";
import LoginVendor from "../../AuthScreens/LoginVendor";
import SelectFeild from "../../AuthScreens/SelectFeild"
import FoodForm from "../../AuthScreens/FoodForm";
import ServiceForm from "../../AuthScreens/ServicesForm";
import ProductForm from "../../AuthScreens/ProductForm";
import PackageScreen from "../../AuthScreens/PackageScreen"
import PaymentScreen from "../../AuthScreens/Paymentscreen"
import { GoogleSignin } from '@react-native-google-signin/google-signin';
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
const AuthNAv = () => {
     useEffect(async() => {
    GoogleSignin.configure({
      webClientId: '280579602525-lumu44h3cbnre201tgi346orjujnshlg.apps.googleusercontent.com',
    
    });
   
  },[]);
    return (
        <Stack.Navigator
            initialRouteName="GetStarted"
            screenOptions={
                {
                    headerShown: false
                }
            }
        >
            <Stack.Screen name="GetStarted" component={GetStatedScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SplitScreen" component={SplitScreen} />
            <Stack.Screen name="Alert" component={CustomeAlert} />
            <Stack.Screen name="LoginUser" component={LoginUser} />
            <Stack.Screen name="LoginVendor" component={LoginVendor} />
            <Stack.Screen name="SignUpUser" component={SignUpUser} />
            <Stack.Screen name="SignUpVendor" component={SignUpVendor} />
            <Stack.Screen name="SelectFeild" component={SelectFeild}/>
            <Stack.Screen name="ProductForm" component={ProductForm} />
            <Stack.Screen name="ServiceForm" component={ServiceForm} />
            <Stack.Screen name="FoodForm" component={FoodForm}/>
            <Stack.Screen name="PackageScreen" component={PackageScreen}/>
            <Stack.Screen name="PaymentScreen" component={PaymentScreen}/>
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
export default AuthNAv;