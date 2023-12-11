//       {/* {data.map(item => {
//               return (
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     marginVertical: height * 0.005,
//                   }}>
//                   <TouchableOpacity
//                     onPress={() => {
//                       setRP(item);
//                     }}>
//                     <Image
//                       style={{
//                         resizeMode: 'contain',
//                       }}
//                       source={
//                         RP.id == item.id
//                           ? require('../../assets/images/tick.png')
//                           : require('../../assets/images/round.png')
//                       }
//                     />
//                   </TouchableOpacity>
//                   <Text
//                     style={{
//                       marginLeft: width * 0.02,
//                       // fontSize: width * 0.037,
//                       // fontWeight: 'bold',
//                       color: 'black',
//                       fontFamily:
//                         RP.id == item.id
//                           ? 'Bebas Neue Pro Bold'
//                           : 'Bebas Neue Pro Regular',
//                       fontSize: width * 0.043,
//                       letterSpacing: 0.25,
//                     }}>
//                     {item.name}
//                   </Text>
//                 </View>
//               );
//             })} */}

            
// import { 
//   StyleSheet, 
//   Text, 
//   View,
//   Image,
//   Dimensions,
//   SafeAreaView,
//   StatusBar
// } from 'react-native'
// import React from 'react'
// import { useSelector } from 'react-redux';
// import Colors from '../../components/Colors';
// const {height, width} = Dimensions.get('window');

// const WalletScreens = () => {

//   const userId = useSelector((state) => state?.auth?.credential?.User?._id)
//  console.log("real oid",userId)
//   return (
    
//     <SafeAreaView
//     style={styles.container}>
   
//       <View
//     style={styles.container}
//     >
//       <Image
//       style={styles.coming}
//       source={require("../../assets/images/comingsoon.png")}
//       />      
//     </View>
//     </SafeAreaView>
//   )
// }

// export default WalletScreens

// const styles = StyleSheet.create({
//   coming:{
//     height:height*0.45,
//     resizeMode:"contain"
//   },
//   container:{
//     flex:1,
//     alignItems:"center",
//     justifyContent:"center"
//   }
// })