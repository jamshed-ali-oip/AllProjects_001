import React,{useState,useEffect,useContext,useMemo} from "react";
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput, SafeAreaView, ScrollViewBase, ScrollView } from "react-native";
import Header from "../Common/Header";
import validator from "../utils/validations"
// import  {showError,showSuccess} from "../utils/helperFunction"
import {showMessage} from "react-native-flash-message";
import actions from "../redux/actions"
import * as Animatable from 'react-native-animatable';
import { AuthContext } from "../components/context";
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
const LoginVendor = ({ navigation }) => {
    const [email, onChangeemail] = React.useState("");
    const [password, onChangepassword] = React.useState("");
    const [state, setState] = useState("")
    const [fade, setfade] = useState("")
    const {signIn} =React.useContext(AuthContext)
    useEffect(() => {
        setState("zoomInDown"),
            setfade("fadeInUpBig")
    }, []);
   
    const isValidData = () => {
        const error = validator({
            email,
            password
        })
        if (error) {
            showError(error)
            return false
        }
        return true
    }

    const onLogin = async () => {
       
        const checkValid = isValidData()
        
    }
    const loginHandle=(email,password)=>{
        signIn(email,password)
    }
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
                        SignIn As User
                    </Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeemail}
                        value={email}
                        textContentType="emailAddress"
                        placeholder="Email"
                        placeholderTextColor="white"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangepassword}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor="white"
                        textContentType="Password"

                    />

                    <TouchableOpacity
                        style={styles.Btn}
                    onPress={()=>{loginHandle(email,password)}}
                    >
                        <Text style={styles.text}>
                            SignIn
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.Btn2}
                        onPress={() => { navigation.navigate("SelectFeild") }}
                    >
                        <Text style={styles.text}>
                            SignUp
                        </Text>
                    </TouchableOpacity>

                </Animatable.View>

            </View>
            </ScrollView>
        </SafeAreaView>


    )
}

export default LoginVendor;

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
        borderRadius: 30,
        borderColor: "white",
        color: "white",
        backgroundColor: "#ca251b"
    },
})