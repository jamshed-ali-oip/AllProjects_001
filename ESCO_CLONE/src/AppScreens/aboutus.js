import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView, Linking } from "react-native";
let { width, height } = Dimensions.get('window');
const Aboutus = () => {



    return (
        <SafeAreaView>
            <ScrollView>

                <View
                    style={styles.Header}
                >
                    <Text style={styles.name}>
                       About Us
                    </Text>


                </View>
                <View style={styles.container}>
                    <Text style={styles.mainheading}>
                        What is IATDOOR
                    </Text>
                    <Text style={styles.text}>
                        During the peak of the COVID-19 pandemic, markets were shut down and shops were shuttered. This had a devastating impact on micro and small businesses whose survival became threatened. At the same time, Pakistan witnessed a huge growth in e-commerce, among the fastest in the world. Unfortunately, joining the e-commerce revolution was beyond the financial and technical means of small businesses.

                        IATDOOR is a trusted marketplace for people and businesses to outsource their tasks, whether you are looking for work, selling your products, have restaurant or working from home. Everything is in one App.
                    </Text>

                </View>

            </ScrollView>
        </SafeAreaView>
    )

}
export default Aboutus;
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
        textAlign:"center"

    },
    container: {
        padding: 10,
        backgroundColor:"white",
        height:height
    }



})