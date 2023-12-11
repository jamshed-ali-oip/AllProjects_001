import React, { useState, useEffect } from "react";
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image } from "react-native";
import Header from "../Common/Header";
import * as Animatable from 'react-native-animatable';

let { width, height } = Dimensions.get('window');
const SplitScreen = ({ navigation }) => {
    const [state, setState] = useState("")
    const [fade, setfade] = useState("")
    useEffect(() => {
        setState("zoomInDown"),
            setfade("fadeInUpBig")
    }, []);
    return (
        <View
            style={{ backgroundColor: "white", flex: 1 }}
        >
            <Animatable.View
                animation={state}
                style={styles.container}
            >
                <Image
                    style={styles.tinyLogo}
                    source={require('../Images/logo.png')}
                />


            </Animatable.View>
            <Animatable.View
            animation={fade}
                style={styles.containerdown}
            >
                <Text
                    style={{
                        color: "white",
                        justifyContent: "center",
                        alignSelf: "center",
                        fontSize: 25,
                        fontStyle: "italic",
                        marginTop: 50,
                        // marginBottom:0
                    }}
                >
                    You are Buyer Or Seller?
                </Text>

                <TouchableOpacity
                    style={styles.Btn}
                    onPress={() => { navigation.navigate("LoginVendor") }} >
                    <Text style={styles.text}>
                        Seller
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.Btn2}
                    onPress={() => { navigation.navigate("LoginUser") }} >
                    <Text style={styles.text}>
                        Buyer
                    </Text>
                </TouchableOpacity>
                {/* <Text
                style={{
                    color:"white",
                    fontWeight:"bold",
                    fontSize:15
                }}
                >
                    There We Go..
                </Text> */}

            </Animatable.View>

        </View>


    )
}

export default SplitScreen;
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
        marginTop: height * .05,
        borderRadius: 30,
        elevation: 10,
    },
    Btn2: {
        backgroundColor: "white",
        height: height * .09,
        width: width * .7,
        justifyContent: "center",
        alignSelf: "center",
        // marginRight:30 ,
        marginTop: height * .02,
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
