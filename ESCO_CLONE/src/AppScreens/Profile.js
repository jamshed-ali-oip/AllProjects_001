import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView, Linking } from "react-native";
let { width, height } = Dimensions.get('window');
const Profile = ({ navigation }) => {



    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <View
                        style={styles.Header}
                    >
                        <Text style={styles.name}>
                            Setting
                        </Text>

                    </View>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("password") }}
                        style={styles.Card}>
                        <Image style={{ height: 35, width: 30, tintColor: "#ed1a23" }} source={require("../Images/password.png")} />
                        <Text
                            style={styles.optionsText}
                        >Password</Text>
                    </TouchableOpacity >
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("Contactus") }}
                        style={styles.Card}>
                        <Image style={{ height: 35, width: 30, tintColor: "#ed1a23" }} source={require("../Images/contactus.png")} />
                        <Text
                            style={styles.optionsText}
                        >Contact Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("Privacypolicy") }}
                        style={styles.Card}>
                        <Image style={{ height: 35, width: 30, tintColor: "#ed1a23" }} source={require("../Images/privacypolicy.png")} />
                        <Text
                            style={styles.optionsText}
                        >Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("Faq") }}
                        style={styles.Card}>
                        <Image style={{ height: 35, width: 30, tintColor: "#ed1a23" }} source={require("../Images/faq.png")} />
                        <Text
                            style={styles.optionsText}
                        >
                            FAQ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("Aboutus") }}
                        style={styles.Card}>
                        <Image style={{ height: 35, width: 30, tintColor: "#ed1a23" }} source={require("../Images/aboutus.png")} />
                        <Text
                            style={styles.optionsText}
                        >About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("") }}
                        style={styles.Card}>
                        <Image style={{ height: 35, width: 30, tintColor: "#ed1a23" }} source={require("../Images/logout.png")} />
                        <Text
                            style={styles.optionsText}
                        >Logout</Text>
                    </TouchableOpacity>



                </View>
            </ScrollView>
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
                    <Image style={{ height: 30, width: 30,tintColor:"grey" }} source={require("../Images/notification.png")} />
                    <Text >
                        Notification
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate("profile")}} style={{alignItems:"center"}}>
                    <Image style={{ height: 35, width: 35,tintColor:"red" }} source={require("../Images/setting.png")} />
                    <Text style={{color:"red"}}>
                       setting
                    </Text>
                </TouchableOpacity>
            
            </View>
        </SafeAreaView>
    )

}
export default Profile;
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
        height: height * .090,
        width: width * .95,
        backgroundColor: "white",
        margin: 5,
        borderRadius: 10,
        elevation: 10,
        padding: 15,
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",



    },
    optionsText: {
        fontSize: 18,
        alignSelf: "center",
        paddingLeft: 10

    }



})