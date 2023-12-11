import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView,Linking } from "react-native";
let { width, height } = Dimensions.get('window');
const V_Detail=()=>{
    const Data = [
       {
           id:1,
           name:"Muhammad Aqeel",
           product:"Rice",
           url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7jm1xP9umcm2ZWXtxO2PeQQGudV85Qea5ug&usqp=CAU",
           day:"Today",

       }
       , {
        id:2,
        name:"Atif",
        product:"Maiz",
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVOdcMPayIw-ObUOfj4TyRCU-9tdM8ouRhsg&usqp=CAU",
        day:"Today",
        
    },
    {
        id:3,
        name:"user124",
        product:"Achar",
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpzMqWCZBwFXpYbHXrltG0h_H29vkNlw4eqg&usqp=CAU",
        day:"yesterday",
        
    }, {
        id:4,
        name:"Jamshed",
        product:"Apple Jam",
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDTfNxlGbmguRACvLwJ0-BBjafJp-Le_X_2g&usqp=CAU",
        day:"yesterday",
        
    },
    {
        id:5,
        name:"Tauseef",
        product:"Pepsi",
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQitVsk84O9VNJZuli2ScpRVmquwV2HfgqwgQ&usqp=CAU",
        day:"yesterday",
        
    },
    {
        id:6,
        name:"Amir",
        product:"biscuits",
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc8oPDv0BXwqB0t1YFxRO7AZ7A2gVbDAX6lw&usqp=CAU",
        day:"yesterday",
        
    },
    {
        id:7,
        name:"Muhammad Ali",
        product:"Tapal Tea",
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM37oOt44_1b_GNM2qdlMwe4LBOP8hG8T_sQ&usqp=CAU",
        day:"yesterday",
        
    }
    ]
    const renderItem = ({ item }) => (

        <View
            style={
                {
                   
                    alignContent: "center",
                    justifyContent: "center",
                 
                    alignSelf:"center"

                }}

        >
            <TouchableOpacity
                style={styles.Card}



            >
                <Image style={styles.pic} source={{ uri: item.url }} />
               <View style={{flexDirection:"column",paddingLeft:5}}>
               <Text
                    style={styles.title}
                > {item.name}</Text>
                 <Text
                    style={styles.tagline}
                >{item.product} is added to wishlist</Text>
                 <Text
                    style={styles.day}
                > {item.day}</Text>
              
               </View>
              
               
              
            </TouchableOpacity>
        </View>



    );
    

    return(
        <View>
             <View
                style={styles.Header}
            >
                <Text style={styles.name}>
                   Notifications
                </Text>

            </View>
           
                    <FlatList
                        data={Data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        scrollEnabled={true}
                        style={{marginBottom:60}}
                      


                    />
               
        </View>
    )

}
export default V_Detail;
const styles = StyleSheet.create({


    Header: {
        height: height * .08,
        width: width * 1,
        backgroundColor: "red",
        // alignItems:"center"
        justifyContent: "center",
        padding: 10
    },
    name: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",

    }
    , Card: {
        height: height * .12,
        width: width *.96,
        backgroundColor: "white",
        margin: 5,
        borderRadius: 10,
        elevation: 10,
        padding: 10,
        flexDirection:"row"


    },
    pic: {
        height: height * .1,
        width:width*.2,
        borderRadius: 100,

    },
    title: {
        fontSize: 15,
        fontWeight: "900"
    },
    tagline: {
        fontWeight: "",
        color: "black",
        width:width*.90
    },

    day:{
        fontStyle:"italic"
    }
   
   
    
})