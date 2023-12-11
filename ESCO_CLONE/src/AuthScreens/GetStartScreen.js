import React from "react";
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image } from "react-native";
import Header from "../Common/Header";
import * as Animatable from 'react-native-animatable';

let { width, height } = Dimensions.get('window');
const GetStatedScreen = ({ navigation }) => {
   
       
    return (
        <View
            style={{ backgroundColor: "white", flex: 1 }}
        >
            <Animatable.View
                animation="zoomIn"

            >
                <View
                    style={styles.container}
                >
                    <Image
                        style={styles.tinyLogo}
                        source={require('../Images/logo.png')}
                    />


                </View>
            </Animatable.View>
            <View
                style={styles.containerdown}
            >

                <Animatable.View animation="zoomInDown">
                    <TouchableOpacity
                        style={styles.Btn}
                        onPress={() => { navigation.navigate("Home") }} >
                        <Text style={styles.text}>
                            Get Started
                        </Text>
                    </TouchableOpacity>
                </Animatable.View>

            </View>

        </View>


    )
}

export default GetStatedScreen;
const styles = StyleSheet.create({
    container: {
        // backgroundColor: "white",
        height: height * .5,
        width: width * 1,
        paddingLeft: 10

    },
    containerdown: {
        backgroundColor: "#ed1a23",
        height: height * .5,
        width: width * 1,
        paddingLeft: 10,
        borderTopStartRadius: 100,
        borderBottomEndRadius: 100,
        elevation: 5

    },
    Btn: {
        backgroundColor: "white",
        height: height * .09,
        width: width * .7,
        justifyContent: "center",
        alignSelf: "center",
        // marginRight:30 ,
        marginTop: height * .2,
        borderRadius: 30,
        elevation: 10,
    },
    text: {
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black"
    },
    tinyLogo: {
        width: width * 0.8,
        height: height * .3,
        alignSelf: "center",
        marginTop: height * 0.1,
    }
})
