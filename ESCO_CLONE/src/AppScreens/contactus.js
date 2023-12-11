import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView, Linking, TextInput, TouchableHighlightBase } from "react-native";
let { width, height } = Dimensions.get('window');
const Contactus = () => {



    const [Oldpass, onChangeOldpass] = React.useState("");
    const [Newpass, onChangeNewpass] = React.useState("");
    const [Repass, onChangeRepass] = React.useState("");

    return (
        <SafeAreaView>
            <ScrollView>

                <View
                    style={styles.Header}
                >
                    <Text style={styles.name}>
                        Contact Us
                    </Text>

                </View>
                <View style={styles.Card}>
                    <Text style={styles.optionsText}>
                        Contact our support guys or make appointment with our consultants
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeOldpass}
                        value={Oldpass}
                        keyboardType="numeric"
                        placeholder="Full Name"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNewpass}
                        value={Newpass}
                        placeholder="Email"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input1}
                        onChangeText={onChangeRepass}
                        value={Repass}
                        placeholder="Write message"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={{
                        height: height * .06,
                        width: width * .5,
                        backgroundColor: "red",
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                    }} >
                        <Text style={{ fontSize: 18, color: "white", }}>
                            Save
                        </Text>
                    </TouchableOpacity>
                    <View style={{ borderBottomColor: "lightgrey", width: width * .8, borderWidth: 0.5, alignSelf: "center", marginTop: 20 }}>

                    </View>

                    <Text style={{ fontSize: 20, alignSelf: "center", margin: 10, fontStyle: "italic" }}>
                        Locate us on Social Media

                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                        <TouchableOpacity
                            onPress={() => { Linking.openURL("https://web.facebook.com/iatdoor/") }}
                        >
                            <Image style={{ height: 50, width: 50, }} source={require("../Images/facebook.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { Linking.openURL("https://www.instagram.com/iatdoor/") }}
                        >
                            <Image style={{ height: 50, width: 50, }} source={require("../Images/insta.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { Linking.openURL("https://twitter.com/iatdoor1") }}
                        >
                            <Image style={{ height: 50, width: 50, }} source={require("../Images/twitter.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { Linking.openURL("https://www.youtube.com/channel/UCmlfb67yFkdMXqCmZXYlPOg") }}
                        >
                            <Image style={{ height: 50, width: 50, }} source={require("../Images/youtube.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { Linking.openURL("https://www.linkedin.com/company/i-at-door") }}
                        >
                            <Image style={{ height: 50, width: 50, }} source={require("../Images/linkdin.png")} />
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )


}
export default Contactus;
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
        height: height * .75,
        width: width * .95,
        backgroundColor: "white",
        margin: 5,
        borderRadius: 10,
        elevation: 10,
        padding: 15,
        alignSelf: "center",
    },
    optionsText: {
        fontSize: 25,
        alignSelf: "center",
        paddingLeft: 10,
        textAlign: "center",
        color: "black"


    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    input1: {
        height: 70,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },



})