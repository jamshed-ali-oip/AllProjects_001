import { StatusBar, } from 'expo-status-bar';
import { Platform, StyleSheet, Button, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from "react";
import { Text, View } from '../components/Themed';
const { height, width } = Dimensions.get('window');



import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import { ScrollView } from 'react-native-gesture-handler';
const FirstRoute = () => (
 
   <ScrollView>
    <View style={{  backgroundColor: "black",flexDirection:"row",justifyContent:"space-evenly",paddingTop:10 }} >
    <Image
        style={{height:height*.25,width:width*.45}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
       <Image
        style={{height:height*.25,width:width*.45}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      
    
   </View>
   <View style={{  backgroundColor: "black",flexDirection:"row",justifyContent:"space-evenly",paddingTop:10 }} >
    <Image
        style={{height:height*.25,width:width*.45}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
       <Image
        style={{height:height*.25,width:width*.45}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      
    
   </View>
   <View style={{  backgroundColor: "black",flexDirection:"row",justifyContent:"space-evenly",paddingTop:10 }} >
    <Image
        style={{height:height*.25,width:width*.45}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
       <Image
        style={{height:height*.25,width:width*.45}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      
    
   </View>
   <View style={{  backgroundColor: "black",flexDirection:"row",justifyContent:"space-evenly",paddingTop:10 }} >
    <Image
        style={{height:height*.25,width:width*.45}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
       <Image
        style={{height:height*.25,width:width*.45}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      
    
   </View>
   </ScrollView>
    

);

const SecondRoute = () => (
  <ScrollView>
  <View style={{  backgroundColor: "black",flexDirection:"row",justifyContent:"space-evenly",paddingTop:10 }} >
  <Image
      style={{height:height*.25,width:width*.45}}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
    />
     <Image
      style={{height:height*.25,width:width*.45}}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
    />
    
  
 </View>
 <View style={{  backgroundColor: "black",flexDirection:"row",justifyContent:"space-evenly",paddingTop:10 }} >
  <Image
      style={{height:height*.25,width:width*.45}}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
    />
     <Image
      style={{height:height*.25,width:width*.45}}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
    />
    
  
 </View>
 <View style={{  backgroundColor: "black",flexDirection:"row",justifyContent:"space-evenly",paddingTop:10 }} >
  <Image
      style={{height:height*.25,width:width*.45}}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
    />
     <Image
      style={{height:height*.25,width:width*.45}}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
    />
    
  
 </View>
 <View style={{  backgroundColor: "black",flexDirection:"row",justifyContent:"space-evenly",paddingTop:10 }} >
  <Image
      style={{height:height*.25,width:width*.45}}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
    />
     <Image
      style={{height:height*.25,width:width*.45}}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
    />
    
  
 </View>
 </ScrollView>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function Screen({ navigation }: any) {
  // const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    
    { key: 'first', title: 'Gallery' },
    { key: 'second', title: 'Trophy Room' },
  ]);

  return ( <>
    <View style={styles.container}>
      <View style={{ flexDirection: "row",justifyContent:"space-evenly" }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
          <Image
            style={styles.edit}
            source={{
              uri: 'https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/79-512.png',
            }}
          />
        </View>
        <View style={{ alignItems:"center",width:width*.3}}>
            <Text style={{color:"white",fontSize:18}}>
              8
            </Text>
            <Text style={{color:"white",fontSize:18,fontWeight:"700"}}>
              Following
            </Text>
            <View style={{flexDirection:"row",marginTop:40}}>
            <Image
            style={[styles.icon,{marginRight:30,}]}
            source={{
              uri: "https://i.pinimg.com/originals/fc/26/50/fc26502254db62ce6b29debec1a56e80.png",
            }}
          />
           <Image
            style={styles.icon}
            source={{
              uri: "https://i.pinimg.com/originals/fc/26/50/fc26502254db62ce6b29debec1a56e80.png",
            }}
          />
        </View>
         
        </View>
        <View style={{ alignItems:"center",width:width*.3}}>
            <Text style={{color:"white",fontSize:18}}>
              8
            </Text>
            <Text style={{color:"white",fontSize:18,fontWeight:"700"}}>
              Followers
            </Text>
            <View style={{flexDirection:"row",marginTop:40}}>
            <Image
            style={[styles.icon,{marginRight:30,}]}
            source={{
              uri: "https://i.pinimg.com/originals/fc/26/50/fc26502254db62ce6b29debec1a56e80.png",
            }}
          />
           <Image
            style={styles.icon}
            source={{
              uri: "https://i.pinimg.com/originals/fc/26/50/fc26502254db62ce6b29debec1a56e80.png",
            }}
          />
        </View>
         
        </View>
      </View>
      <View style={{backgroundColor:"red",marginTop:50}}>
      <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width:width}}
    />
      </View>

    </View>
    <TabView

    style={styles.tab}
    
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: width }}
      renderTabBar={props => <TabBar
        indicatorStyle={{backgroundColor:"white"}}
        {...props} style={{backgroundColor: 'black'}}/>}
    />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
  },
  tab:{
    // marginBottom:50
    // height:
 
    
  }
});
