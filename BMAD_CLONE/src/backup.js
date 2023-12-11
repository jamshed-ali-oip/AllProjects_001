// import { StyleSheet, Text, View, Platform, PermissionsAndroid, TouchableOpacity, FlatList, Image } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { CameraRoll } from '@react-native-camera-roll/camera-roll'

// const App = () => {
//   const [photos, setPhotos] = useState([])
//   useEffect(() => {
//     hasPermission();
//     setTimeout(() => {
//       getAllPhotos()
//     }, 200);
//   }, [])
//   const hasPermission = async () => {
//     const permission =
//       Platform?.Version >= 33
//         ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES :
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
//     const hasPermission = await PermissionsAndroid.check(permission);
//     if (hasPermission) {
//       return true;
//     }
//     const status = await PermissionsAndroid.request(permission);
//     return status === "granted"
//   }
//   const getAllPhotos = () => {
//     CameraRoll.getPhotos({
//       first: 20,
//       assetType: 'Photos',
//     })
//       .then(r => {
//         // this.setState({ photos: r.edges });
//         console.log(r.edges)
//         setPhotos(r?.edges)
//       })
//       .catch((err) => {
//         console.log(err)
//         //Error Loading Images
//       });

//   }
//   return (
//     <View>
//       <TouchableOpacity onPress={() => { }}>
//         <Text>App</Text>

//       </TouchableOpacity>
//       <View>
//         <FlatList
//           data={photos}
//           numColumns={3}
//           renderItem={({ item, index }) => {
//             console.log("itemmmm", item)
//             return (
//               <View
//                 style={{
//                   backgroundColor: "red",
//                   height: 100,
//                   width: 100,
//                   margin: 10
//                 }}
//               >
//                 <Image
//                   style={{
//                     height: 100,
//                     width: 100
//                   }}
//                   source={{ uri: item?.node?.image?.uri }}
//                 />
//               </View>
//             )
//           }}
//         />
//       </View>
//     </View>
//   )
// }

// export default App

// const styles = StyleSheet.create({})


