import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView, Linking } from "react-native";
let { width, height } = Dimensions.get('window');
const Detail = ({navigation}) => {
    const Data = [
        {
            id: 1,
            name: "Utilix Shop",
            product: "Rice",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7jm1xP9umcm2ZWXtxO2PeQQGudV85Qea5ug&usqp=CAU",
            day: "Today",

        }
        , {
            id: 2,
            name: "Bin Hashim",
            product: "Maiz",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVOdcMPayIw-ObUOfj4TyRCU-9tdM8ouRhsg&usqp=CAU",
            day: "Today",

        },
        {
            id: 3,
            name: "Sandrio store",
            product: "Achar",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpzMqWCZBwFXpYbHXrltG0h_H29vkNlw4eqg&usqp=CAU",
            day: "yesterday",

        }, {
            id: 4,
            name: "Al Macca Dhaba",
            product: "Chicken Karahi",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS35Cu5YzPcFu5ULYBI5BgmONq8Hj4c3Ca5Ow&usqp=CAU",
            day: "yesterday",

        },
        {
            id: 5,
            name: "Sarim and Brothers",
            product: "Pepsi",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQitVsk84O9VNJZuli2ScpRVmquwV2HfgqwgQ&usqp=CAU",
            day: "yesterday",

        },
        {
            id: 6,
            name: "Micro Finance",
            product: "Financial Advisor",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVy_LqnlF03HKcJ_njDkWTPPLw8SZn-hK8Pw&usqp=CAU",
            day: "yesterday",

        },
        {
            id: 7,
            name: "Safder Tea Stall",
            product: "Tapal Tea",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM37oOt44_1b_GNM2qdlMwe4LBOP8hG8T_sQ&usqp=CAU",
            day: "yesterday",

        }
    ]
    const renderItem = ({ item }) => (

        <View
            style={
                {

                    alignContent: "center",
                    justifyContent: "center",

                    alignSelf: "center"

                }}

        >
            <TouchableOpacity
                style={styles.Card}



            >
                <Image style={styles.pic} source={{ uri: item.url }} />
                <View style={{ flexDirection: "column", paddingLeft: 5 }}>
                    <Text
                        style={styles.title}
                    > {item.name}</Text>
                    <Text
                        style={styles.tagline}
                    >{item.product} is available now </Text>
                    <Text
                        style={styles.day}
                    > {item.day}</Text>

                </View>



            </TouchableOpacity>
        </View>



    );


    return (
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
                style={{ marginBottom:height*.16 }}



            />
              <View style={{
                height: height * .08,
                marginTop: height * .92,
                backgroundColor: "white",
                width: width * 1,
                position: "absolute",
                borderTopWidth: 1,
                borderTopColor: "darkgrey",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                alignContent: "center"
            }}>
                <TouchableOpacity onPress={()=>{navigation.navigate("dashboard")}} style={{alignItems:"center"}}>
                    <Image style={{ height: 30, width: 30,tintColor:"grey" }} source={require("../Images/home.png")} />
                    <Text >
                        Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate("details")}} style={{alignItems:"center"}}>
                    <Image style={{ height: 30, width: 30,tintColor:"red" }} source={require("../Images/notification.png")} />
                    <Text style={{color:"red"}}>
                        Notification
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate("profile")}} style={{alignItems:"center"}}>
                    <Image style={{ height: 35, width: 35,tintColor:"darkgrey" }} source={require("../Images/setting.png")} />
                    <Text>
                       setting
                    </Text>
                </TouchableOpacity>
            
            </View>

        </View>
    )

}
export default Detail;
const styles = StyleSheet.create({


    Header: {
        height: height * .08,
        width: width * 1,
        backgroundColor: "red",
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
        width: width * .96,
        backgroundColor: "white",
        margin: 5,
        borderRadius: 10,
        elevation: 10,
        padding: 10,
        flexDirection: "row"
    },
    pic: {
        height: height * .1,
        width: width * .2,
        borderRadius: 100,

    },
    title: {
        fontSize: 15,
        fontWeight: "900"
    },
    tagline: {
        fontWeight: "",
        color: "black",
        width: width * .90
    },

    day: {
        fontStyle: "italic"
    }



})