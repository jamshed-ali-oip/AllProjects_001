// import {
//     StyleSheet,
//     Text,
//     View,
//     Dimensions,
//     TouchableOpacity,
//     Image,
//     StatusBar,
//   } from 'react-native';
//   import React from 'react';
//   import Header from '../component/Header';
//   import OTPInputView from '@twotalltotems/react-native-otp-input';
//   import {useState} from 'react';
//   let {width, height} = Dimensions.get('window');
//   const CreateAcount = ({navigation}) => {
//     const [show, setshow] = useState(false);
//     const [Code, setCode] = useState(true);
//     return (
//      <>{Code=== true
//         ?
//         <View>
//         <StatusBar animated={true} backgroundColor="#383838" />
//         <Header title={'Retour'} />
//         <View style={{alignItems: 'center'}}>
        
//           <Image
//             style={{
//               width:width*15,
//               height:height*0.18,
//               resizeMode:'contain',
//               marginTop:height*0.07,
//               alignSelf:'center',
//             }}
//             source={require('../images/mailsend.png')}
//           />
//           <Text
//             style={{
//               width:width*0.59,
//               fontSize:width*0.038,
//               textAlign:'center',
//               fontWeight:'700',
//               color:'black',
//               marginTop:height*0.06,
//             }}>
//            Un code de validation vous a été envoyé par e-mail
//           </Text>
         
//           <Text
//             style={{
//               width:width*0.65,
//               textAlign:'center',
//               fontSize:width*0.035,
//               color:'black',
//               marginTop:height*0.025,
//             }}>
//             Saisissez le code ci-dessous pour continuer.
//           </Text>
//           <OTPInputView
//             style={{width:'65%', height:height*0.1,alignSelf:'center',marginTop:height*0.08}}
//             pinCount={4}
//             // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
//             // onCodeChanged = {code => { this.setState({code})}}
//             autoFocusOnLoad
//             codeInputFieldStyle={styles.underlineStyleBase}
//             codeInputHighlightStyle={styles.underlineStyleHighLighted}
//             onCodeFilled={code => {
//               console.log(`Code is ${code}, you are good to go!`);
//             }}
//           />
//           <TouchableOpacity
//             onPress={() => {
//               setshow(!show);
//             }}>
//             <Text
//               style={{
//                 color:'#C12F2F',
//                 textDecorationLine:'underline',
//                 fontSize:width*0.038,
//                 textDecorationColor:'#C12F2F',
//                 textDecorationStyle:'solid',
//                 // borderBottomColor: '#C12F2F',
//                 // borderBottomWidth: 1,
//                 marginTop:height*0.02,
//               }}>
//               Vous n’avez pas reçu de code ?
//             </Text>
//           </TouchableOpacity>
//           {show === true ? (
//             <View style={{position: 'absolute'}}>
//               <Image
//                 style={{
//                   width:width*0.9,
//                   height:height*1,
//                   resizeMode:'contain',
//                   marginTop:-height*0.14,
//                 }}
//                 source={require('../images/module.png')}
//               />
//               <Image
//                 style={{
//                   width:width*0.4,
//                   height:height*1,
//                   position:'absolute',
//                   resizeMode:'contain',
//                   marginTop:-height*0.37,
//                   alignSelf:'center',
//                 }}
//                 source={require('../images/recover.png')}
//               />
//               <View
//                 style={{
//                   alignSelf:'center',
//                   position:'absolute',
//                   marginTop:height*0.23,
//                   alignItems:'center',
//                 }}>
//                 <Text
//                   style={{
//                     fontSize:width*0.04,
//                     fontWeight:'800',
//                     color:'black',
//                     width:width*0.5,
//                     textAlign:'center',
//                   }}>
//                   Avez vous vérifié vos indésirables ?
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize:width*0.035,
//                     marginTop:height*0.015,
//                     color:'black',
//                     width:width*0.5,
//                     textAlign:'center',
//                   }}>
//                   Si le mail de confirmation ne s’y trouve pas :
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   flexDirection:'row',
//                   position:'absolute',
//                   justifyContent:'space-between',
//                   marginTop:height*0.41,
//                   alignSelf:'center',
//                 }}>
//                 <TouchableOpacity
//                   style={{
//                     height:height*0.2,
//                     width:width*0.42,
//                     backgroundColor:'white',
//                     margin:width*0.01,
//                     borderRadius:width*0.03,
//                     padding:width*0.01,
//                   }}
//                   onPress={() => {navigation.navigate("Resenscode")}}
//                   >
//                   <Image
//                     style={{
//                       width:width*0.13,
//                       height:height*1,
//                       position:'absolute',
//                       resizeMode:'contain',
//                       marginTop:-height*0.45,
//                       alignSelf:'center',
//                     }}
//                     source={require('../images/load.png')}
//                   />
//                   <View style={{alignSelf:'center',marginTop:height*0.09}}>
//                     <Text
//                       style={{
//                         color:'#C12F2F',
//                         textAlign:'center',
//                         fontWeight:'700',
//                         fontSize:width*0.038,
//                       }}>
//                       Renvoyer un code
//                     </Text>
//                     <Text
//                       style={{
//                         textAlign:'center',
//                       }}>
//                       Recevez un nouveau code de validation
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={{
//                     height:height*0.2,
//                     width:width*0.42,
//                     backgroundColor:'white',
//                     margin:width*0.01,
//                     borderRadius:width*0.03,
//                     padding:width*0.01,
//                   }}>
//                   <Image
//                     style={{
//                       width:width*0.1,
//                       height:height*1,
//                       position:'absolute',
//                       resizeMode:'contain',
//                       marginTop:-height*0.45,
//                       alignSelf:'center',
//                     }}
//                     source={require('../images/phone.png')}
//                   />
//                   <View style={{alignSelf:'center',marginTop:height*0.09}}>
//                     <Text
//                       style={{
//                         color:'#C12F2F',
//                         textAlign:'center',
//                         fontWeight:'700',
//                         fontSize:width*0.038,
//                       }}>
//                       Envoyer un SMS
//                     </Text>
//                     <Text
//                       style={{
//                         textAlign:'center',
//                       }}>
//                       Recevez un SMS contenant un code
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ) : null}
//         </View>
//       </View>
//         :
//        <View style={{
//         alignItems:"center",
//         alignContent:"center",
//         justifyContentl:"center",
//        }}>
//          <Text
//         style={{
//           fontSize:width*0.04,
//           fontWeight:'800',
//           color:'black',
//           width:width*0.5,
//           textAlign:'center',
//           justifyContent:"center",
//           alignSelf:"center",
//           marginTop:height*0.45
//       }}>
//         *Another code is sent*
//       </Text>
//        </View>
//      }</>
//     );
//   };
  
//   export default CreateAcount;
  
//   const styles = StyleSheet.create({
//     borderStyleBase: {
//       width:30,
//       height:45,
//       borderBottomWidth: 3,
//       borderBottomColor: 'red',
//       color: 'black',
//     },
  
//     borderStyleHighLighted: {
//       borderColor: 'red',
//       borderBottomWidth: 3,
//       borderBottomColor: 'red',
//     },
  
//     underlineStyleBase: {
//       width: 50,
//       height: 45,
//       // borderWidth: 0,
//       borderBottomWidth: 3,
//       color: 'black',
//       borderBottomColor: 'black',
//       borderTopColor: '#f2f2f2',
//       borderLeftWidth: 0,
//       borderRightWidth: 0,
//       borderBottomLeftRadius: 1,
//     },
  
//     underlineStyleHighLighted: {
//       // borderColor: "red",
//       // borderBottomColor: 'red',
//       // borderBottomWidth: 4,
//     },
//   });
  