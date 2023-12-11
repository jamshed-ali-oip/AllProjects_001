// import React, { Component, useEffect, useState } from "react";
// import {Dimensions,Text,View,TouchableOpacity,Image} from "react-native"
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import FavoriteDScreen from './FavoriteDScreen'
// import InterestScreen from './InterestScreen'
// import SignupScreen from './SignupScreen'
// import Icon from 'react-native-vector-icons/Ionicons';
// import RNCheckboxCard from "react-native-checkbox-card";
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// const CompleteProfile = ({navigation}) => {
//     const [stepTwo, onChangestepTwo] = React.useState(true);
//     const Stack=createStackNavigator();
//     return(
//         <NavigationContainer independent={true}>
//             <Stack.Navigator initialRouteName="Signup">
//                 <Stack.Screen 
//                     name="Signup" 
//                     options={({ navigation, route }) => ({
//                         headerTitle: props => null,
//                         headerTransparent: true,
//                         headerLeft: ()=> null,
//                       })}
//                     component={SignupScreen}
//                 />
//                 <Stack.Screen 
                    
//                     name="YourInterests" 
//                     options={({ navigation, route }) => ({
//                         headerTitle: props => <Text style={{textAlign:'center', fontSize: 18, color:'black', fontFamily: 'Poppins-SemiBold'}}>Your Interests</Text>,
//                         headerTransparent: false,
//                         headerLeft: ()=>        <View style={{left: 20}}><TouchableOpacity onPress={()=> navigation.goBack()}><Icon name="arrow-back" size={25} color="#B01125" /></TouchableOpacity></View>,
//                         headerRight: ()=>   
//                                         <View style={{right: 20}}>
//                                             <TouchableOpacity onPress={()=>   navigation.navigate('FavoriteDrinks')}>
//                                                 <View  style={{backgroundColor: '#B01125', width: 30, height: 30, borderRadius: 50, borderColor:'white', borderWidth:1}}>
//                                                                                 <Image 
//                                                                                     resizeMode='contain' 
//                                                                                     source={require('./../../Assets/Images/Check.png')} 
//                                                                                     style={{width: 20, height: 20, margin: 4,}} 
//                                                                                 />
//                                                 </View>
//                                             </TouchableOpacity> 
//                                         </View>  
//                                  })}
                                                    
//                     component={InterestScreen}
//                 /> 
//                  <Stack.Screen 
//                     name="FavoriteDrinks" 
//                     options={({ navigation, route }) => ({
//                         headerTitle: props => <Text style={{textAlign:'center', fontSize: 18, color:'black', fontFamily: 'Poppins-SemiBold'}}>Favorite Drinks</Text>,
//                         headerTransparent: false,
//                         headerLeft: ()=>        <View style={{left: 20}}><TouchableOpacity onPress={()=> navigation.goBack()}><Icon name="arrow-back" size={25} color="#B01125" /></TouchableOpacity></View>,
//                         headerRight: ()=>      
//                                         <View style={{right: 20}}>
//                                             <TouchableOpacity onPress={()=>    navigation.navigate('home')}>
//                                                 <View  style={{backgroundColor: '#B01125', width: 30, height: 30, borderRadius: 50, borderColor:'white', borderWidth:1}}>
//                                                                                 <Image 
//                                                                                     resizeMode='contain' 
//                                                                                     source={require('./../../Assets/Images/Check.png')} 
//                                                                                     style={{width: 20, height: 20, margin: 4,}} 
//                                                                                 />
//                                                 </View>
//                                             </TouchableOpacity> 
//                                         </View>   
//                                     })}
                                                    
                  
               
//                     component={FavoriteDScreen}
//                 /> 
               
                
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }

// export default CompleteProfile






// // <TouchableOpacity onPress={()=>   navigation.navigate('FavoriteDrinks')}>
// //     <View  style={{backgroundColor: '#B01125', width: 30, height: 30, borderRadius: 50, borderColor:'white', borderWidth:1}}>
// //                                     <Image 
// //                                         resizeMode='contain' 
// //                                         source={require('./../Assets/Images/Check.png')} 
// //                                         style={{width: 20, height: 20, margin: 4,}} 
// //                                     />
// //      </View>
// // </TouchableOpacity>