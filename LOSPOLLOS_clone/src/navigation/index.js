import React,{useEffect} from "react";
import AppNav from "./Appnav";
import {View,Text,ActivityIndicator} from "react-native";
import { AuthContext } from '../component/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNav from './AuthNav';
const Stack = createNativeStackNavigator();

import { NavigationContainer } from '@react-navigation/native';
const Navigator=()=>{
    
    const initialLoginState={
        isLoading:true,
        email:null,
        userToken:null
      }
      const loginReducer = (prevState, action) => {
        switch( action.type ) {
          case 'RETRIEVE_TOKEN': 
            return {
              ...prevState,
              userToken: action.token,
              isLoading: false,
            };
          case 'LOGIN': 
            return {
              ...prevState,
              email: action.id,
              userToken: action.token,
              isLoading: false,
            };
          case 'LOGOUT': 
            return {
              ...prevState,
              email: null,
              userToken: null,
              isLoading: false,
            };
          case 'REGISTER': 
            return {
              ...prevState,
              email: action.id,
              userToken: action.token,
              isLoading: false,
            };
        }
      };
      const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
    
      const authContext = React.useMemo(() => ({
        signIn:async(email,password) => {
          // setUserToken('fgkj');
          // setIsLoading(false);
         let userToken;
         userToken=null;
         if(email === "admin" && password === "admin"){
          
          
           try{
            userToken="kdskdhksh";
            await AsyncStorage.setItem("userToken",userToken)
          }catch(e){
            console.log(e)
          }
         }
         dispatch({type:"LOGIN",id:email,token:userToken});
        },
        signOut:async() => {
          // setUserToken(null);
          // setIsLoading(false);
          try{
            
            await AsyncStorage.removeItem("userToken")
          }catch(e){
            console.log(e)
          }
          dispatch({type:"LOGOUT"})
       
        }
      }), []);
     
      useEffect(() => {
        setTimeout(async() => {
          // setIsLoading(false);
          let userToken;
          userToken = null;
          try {
            userToken = await AsyncStorage.getItem('userToken');
          } catch(e) {
            console.log(e);
          }
          // console.log('user token: ', userToken);
          dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }, 1000);
      }, []);
      if (loginState.isLoading){
        return(
          <View style={{flex:1,justifyContent:"center",alignItems: 'center',}}>
            <ActivityIndicator size="large" />
          </View>
        )
      }
    return(
        <AuthContext.Provider value={authContext}>      
        <NavigationContainer>
           <Stack.Navigator 
            screenOptions={{
             headerShown: false
           }}>
             {loginState.userToken !== null?
            <Stack.Screen name="AppNav" component={AppNav} />:
            <Stack.Screen name="AuthNav" component={AuthNav}/>
           }
             
             {/* <Stack.Screen name="App" component={AppNav} /> */}
            
             
           </Stack.Navigator>
         </NavigationContainer>
         </AuthContext.Provider>
   
    )
}
export default Navigator;