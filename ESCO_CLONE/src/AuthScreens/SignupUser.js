import React from "react";
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput,SafeAreaView } from "react-native";
import Header from "../Common/Header";

let { width, height } = Dimensions.get('window');
const SignUpUser = ({ navigation }) => {
    const [text, onChangeText] = React.useState("");
    const [number, onChangeNumber] = React.useState("");
    const [Name, onChangeName] = React.useState("");
    return (
        <SafeAreaView>
        <View
            style={{ backgroundColor: "white", flex: 1 }}
        >
            <View
                style={styles.container}
            >
                <Image
                    style={styles.tinyLogo}
                    source={require('../Images/logo.png')}
                />


            </View>
            <View
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
                       
                    }}
                >
                    SignUp As User
                </Text>

                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    textContentType="emailAddress"
                    placeholder="Email and Password"
                    placeholderTextColor="white"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeName}
                    value={Name}
                    placeholder="User Name"
                    placeholderTextColor="white"
                    textContentType="Password"
                    
                />
                 <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="Password"
                    placeholderTextColor="white"
                    textContentType="Password"
                    
                />
               
                <TouchableOpacity
                    style={styles.Btn}
                    // onPress={() => { navigation.navigate("LoginVendor") }}
                     >
                    <Text style={styles.text}>
                        SignUp
                    </Text>
                </TouchableOpacity>
               

            </View>

        </View>
        </SafeAreaView>


    )
}

export default SignUpUser;

const styles = StyleSheet.create({
    container: {

        height: height * .32,
        width: width * 1,
        paddingLeft: 10

    },
    containerdown: {
        backgroundColor: "#ed1a23",
        height: height * .8,
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
        borderRadius:30,
        borderColor:"white",
        color:"white",
        backgroundColor:"#ca251b"
      },
})
