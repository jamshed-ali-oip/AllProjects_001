// import React, {useEffect, useState,useRef} from 'react';
// import {
//    TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,
//    Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
//  } from 'react-native';
// import Home from 'react-native-vector-icons/Feather';
// import SplashScreen from  "react-native-splash-screen";
// import Location from 'react-native-vector-icons/MaterialIcons';
// import Notification from 'react-native-vector-icons/Ionicons';
// import HomeStack  from './Home/HomeStack';
// import BmadStack from './BMAD/BmadStack';
// import NewPostStack from './NewPost/NewPostStack';
// import NotificationStack from './Notification/NotificationStack';
// import NearMeStack from './NearMe/NearMeStack';
// import MessageStack from './Messages/MessageStack';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();


// function MyTabs() {
    

//     return (
   
//       <Tab.Navigator
//       initialRouteName="home"
      
//       tabBarOptions={{
//         keyboardHidesTabBar: true,
//         tabStyle:{
//           borderBottomLeftRadius:15,
//           borderTopRightRadius: 15,
//         },
        
//         activeBackgroundColor: '#F8F8F8',
//         activeTintColor: '#B01125',
//         style:{
//               position: 'absolute',
//               bottom: 25,
//               left: 20,
//               right: 20,
//               borderBottomLeftRadius:14,
//               borderTopRightRadius: 14,
//               height: 70, 
              
//         },
//         iconStyle:{
//               marginTop:0
//         },
//         labelStyle:{
//               marginBottom:0,
//               paddingBottom:7
//         },
//       }}
//       >
//         <Tab.Screen
//           name="home"
//           component={HomeStack}
//           options={{    
//             tabBarLabel: "Home",
//             tabBarIcon: ({ color,size }) => ( 
//               <Home name="home"  style={{}} size={size} color={color}  />
//             )
//           }}
//         />
//         <Tab.Screen
//           name="nearme"
//           component={NearMeStack}
//           options={{
//             tabBarLabel: 'Nearby Me',
//             tabBarIcon: ({ color,size }) => (
//                 <Location name="location-on" style={{}} size={size} color={color} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="newpost"
//           component={NewPostStack}
          
//           options={{ 
            
//             tabBarLabel: 'New Post',
//             tabBarIcon: ({ color,size }) => (
//                <Home name="plus-square" style={{}} size={size} color={color} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="notification"
//           component={NotificationStack}
//           options={{ 
//             tabBarLabel: 'Notification',
//             tabBarIcon: ({ color, size }) => (
//                <Notification name="notifications-outline" style={{}} size={size} color={color} />
//             ),
//           }}
//         />
//          <Tab.Screen
//           name="bmad"
//           component={BmadStack}
//           options={{
//             tabBarLabel: 'BMAD',
//             tabBarIcon: ({ color, size }) => (
//               <Notification name="fast-food-outline" style={{}} size={size} color={color} />
//             ),
//           }}
//         />
//          <Tab.Screen
//           name="message"
          
//           component={MessageStack}
//           options={{
            
//             tabBarVisible: true,
//             tabBarIcon: ()=> null,
//             tabBarLabel: '',
//             tabBarAccessibilityLabel: '',
//             tabBarVisibilityAnimationConfig: ()=> null,
//             tabBarButton: ()=> null
//           }}
//         />
        
//       </Tab.Navigator>
  
//     );
//   }


//  const BottomTab = ({navigation}) => {
     
//     useEffect(() => {
//         SplashScreen.hide();
      
//        },[]);
//     return(
//         <MyTabs />
//     )
//  }

//  export default BottomTab;