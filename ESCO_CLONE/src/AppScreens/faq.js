import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView, Linking } from "react-native";
let { width, height } = Dimensions.get('window');
const Faq = () => {



    return (
        <SafeAreaView>
            <ScrollView>

                <View
                    style={styles.Header}
                >
                    <Text style={styles.name}>
                        FAQ
                    </Text>


                </View>
                <View style={styles.container}>
                    <Text style={styles.mainheading}>
                        Learn from our FAQ
                    </Text>
                    <Text style={styles.title}>
                        1. How can we register in this App?
                    </Text>
                    <Text style={styles.text}>
                        You can download and install our app in your mobile and you can create your account simply by registering with a form.
                    </Text>
                    <Text style={styles.title}>
                        2. How can we install this app?
                    </Text>
                    <Text style={styles.text}>
                    Download the app from the play store or app store and simply click install and you are good to use the IATDOOR App.
                    </Text>
                    <Text style={styles.title}>
                        3. How can we send request to developer?
                    </Text>
                    <Text style={styles.text}>
                    You can contact us on our email at suppor@iatdoor.com and we will revert back you with the support as soon as possible.
                    </Text>

                </View>

            </ScrollView>
        </SafeAreaView>
    )

}
export default Faq;
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

    },
    mainheading: {
        fontSize: 25,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black",
        margin: 5
    },
    title: {
        fontSize: 20,
        fontWeight: "400",
        color: "black",
        margin: 5

    },
    text: {
        fontSize: 15,
        fontWeight: "400",
        // color:"black"

    },
    container: {
        padding: 10,
        backgroundColor:"white",
        height:height

    }




})