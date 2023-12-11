import React, { useState,useEffect } from "react";
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput, SafeAreaView, ScrollViewBase, ScrollView } from "react-native";
import Header from "../Common/Header";
import validator from "../utils/validations"
// import  {showError,showSuccess} from "../utils/helperFunction"
import { showMessage } from "react-native-flash-message";
import actions from "../redux/actions"
import * as Animatable from 'react-native-animatable';

const showError = (message) => {
    showMessage({
        type: 'danger',
        icon: 'danger',
        message
    })
}
const showSuccess = (message) => {
    showMessage({
        type: 'success',
        icon: 'success',
        message
    })
}



let { width, height } = Dimensions.get('window');
const SelectFeild = ({ navigation }) => {

    
        const [state, setState] = useState("")
        const [fade, setfade] = useState("")
        useEffect(() => {
            setState("zoomInDown"),
                setfade("fadeInUpBig")
        }, []);
    return (
        <SafeAreaView>
            <ScrollView>
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
                                marginTop: 40,
                                // marginBottom:0
                            }}
                        >
                            Select Feild
                        </Text>



                        <TouchableOpacity
                            style={styles.Btn}
                            onPress={() => { navigation.navigate("ServiceForm") }}
                        >
                            <Image style={styles.pic} source={require("../Images/services.png")} />
                            <Text style={styles.text} >Services</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("FoodForm") }}
                            style={styles.Btn}
                        >
                            <Image style={styles.pic} source={require("../Images/food.png")} />
                            <Text style={styles.text} >Food</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("ProductForm") }}
                            style={styles.Btn}
                        >
                            <Image style={styles.pic} source={require("../Images/product.png")} />
                            <Text style={styles.text} >Product</Text>
                        </TouchableOpacity>


                    </Animatable.View>

                </View>
            </ScrollView>
        </SafeAreaView>


    )
}

export default SelectFeild;

const styles = StyleSheet.create({
    container: {

        height: height * .32,
        width: width * 1,
        paddingLeft: 10

    },
    containerdown: {
        backgroundColor: "#ed1a23",
        height: height * 1,
        width: width * 1,
        paddingLeft: 10,
        borderTopStartRadius: 100,
        borderBottomEndRadius: 100,
        elevation: 5

    },
    Btn: {
        backgroundColor: "white",
        height: height * .099,
        width: width * .68,
        // justifyContent: "center",
        alignSelf: "center", alignItems: "center",
        // marginRight:30 ,
        marginTop: height * .05,
        borderRadius: 40,
        elevation: 10,
        flexDirection: "row"
    },

    text: {
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold",
        color: "black",
        paddingLeft: 30
    },
    tinyLogo: {
        width: width * 0.6,
        height: height * .2,
        alignSelf: "center",
        marginTop: height * 0.1,
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 30,
        borderColor: "white",
        color: "white",
        backgroundColor: "#ca251b"
    },
    pic: {
        height: 72,
        width: 72,
        alignSelf: "center",
        elevation: 5,
    }
})