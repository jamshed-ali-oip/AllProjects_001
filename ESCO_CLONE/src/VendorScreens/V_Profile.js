import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView, Linking } from "react-native";
import { AuthContext } from "../components/context";
let { width, height } = Dimensions.get('window');
const V_Profile = ({navigation}) => {
    const {signOut} =React.useContext(AuthContext)


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
            onPress={()=>{navigation.navigate("V_password")}}
            style={styles.Card}>
                <Image style={{ height: 35, width: 30, tintColor: "#ed1a23" }} source={require("../Images/password.png")} />
                <Text
                    style={styles.optionsText}
                >Password</Text>
            </TouchableOpacity >
            <TouchableOpacity 
            onPress={()=>{navigation.navigate("V_Contactus")}}
            style={styles.Card}>
                <Image style={{ height: 35, width: 30, tintColor: "#ed1a23" }} source={require("../Images/contactus.png")} />
                <Text
                    style={styles.optionsText}
                >Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity  
            onPress={()=>{navigation.navigate("V_Privacypolicy")}}
            style={styles.Card}>
                <Image style={{ height: 35, width: 30, tintColor: "#ed1a23" }} source={require("../Images/privacypolicy.png")} />
                <Text
                    style={styles.optionsText}
                >Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{navigation.navigate("V_Faq")}}
            style={styles.Card}>
                <Image style={{ height: 35, width: 30, tintColor: "#ed1a23" }} source={require("../Images/faq.png")} />
                <Text
                    style={styles.optionsText}
                >
                    FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate("V_Aboutus")}}
            style={styles.Card}>
                <Image style={{ height: 35, width: 30, tintColor: "#ed1a23" }} source={require("../Images/aboutus.png")} />
                <Text
                    style={styles.optionsText}
                >About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{signOut()}}
            style={styles.Card}>
                <Image style={{ height: 35, width: 30, tintColor: "#ed1a23" }} source={require("../Images/logout.png")} />
                <Text
                    style={styles.optionsText}
                >Logout</Text>
            </TouchableOpacity>



        </View>
           </ScrollView>
       </SafeAreaView>
    )

}
export default V_Profile;
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