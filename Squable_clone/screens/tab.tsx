import { StatusBar, } from 'expo-status-bar';
import { Platform, StyleSheet, Button, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from "react";
import { Text, View } from '../components/Themed';
const { height, width } = Dimensions.get('window');


import { TabView, SceneMap } from 'react-native-tab-view';
const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function tab ({  }: any) {
  // const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  return (
    // <View style={styles.container}>
    //   <View style={{ flexDirection: "row",justifyContent:"space-evenly" }}>
    //     <View style={{ flexDirection: "row" }}>
    //       <Image
    //         style={styles.image}
    //         source={{
    //           uri: 'https://reactnative.dev/img/tiny_logo.png',
    //         }}
    //       />
    //       <Image
    //         style={styles.edit}
    //         source={{
    //           uri: 'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/79-512.png',
    //         }}
    //       />
    //     </View>
    //     <View style={{ alignItems:"center",width:width*.3}}>
    //         <Text style={{color:"white",fontSize:18}}>
    //           8
    //         </Text>
    //         <Text style={{color:"white",fontSize:18,fontWeight:"700"}}>
    //           Following
    //         </Text>
    //         <View style={{flexDirection:"row",marginTop:40}}>
    //         <Image
    //         style={[styles.icon,{marginRight:30,}]}
    //         source={{
    //           uri: "https://i.pinimg.com/originals/fc/26/50/fc26502254db62ce6b29debec1a56e80.png",
    //         }}
    //       />
    //        <Image
    //         style={styles.icon}
    //         source={{
    //           uri: "https://i.pinimg.com/originals/fc/26/50/fc26502254db62ce6b29debec1a56e80.png",
    //         }}
    //       />
    //     </View>
         
    //     </View>
    //     <View style={{ alignItems:"center",width:width*.3}}>
    //         <Text style={{color:"white",fontSize:18}}>
    //           8
    //         </Text>
    //         <Text style={{color:"white",fontSize:18,fontWeight:"700"}}>
    //           Followers
    //         </Text>
    //         <View style={{flexDirection:"row",marginTop:40}}>
    //         <Image
    //         style={[styles.icon,{marginRight:30,}]}
    //         source={{
    //           uri: "https://i.pinimg.com/originals/fc/26/50/fc26502254db62ce6b29debec1a56e80.png",
    //         }}
    //       />
    //        <Image
    //         style={styles.icon}
    //         source={{
    //           uri: "https://i.pinimg.com/originals/fc/26/50/fc26502254db62ce6b29debec1a56e80.png",
    //         }}
    //       />
    //     </View>
         
    //     </View>
    //   </View>
    //   <View style={{backgroundColor:"red",marginTop:50}}>
    //   <TabView
    //   navigationState={{ index, routes }}
    //   renderScene={renderScene}
    //   onIndexChange={setIndex}
    //   initialLayout={{ width:width}}
    // />
    //   </View>

    // </View>
    
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: width }}
    />
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    width: width * .32,
    height: height * .19,
    borderRadius: 100
  },
  edit: {
    width: 30,
    height: 30,
    position: "absolute",
    marginTop: height * .13,
    marginLeft: width * .26,
    borderRadius: 100
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth:1,
    borderColor:"white",
    tintColor:"white"
  }
});
