import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { IconButton, PrimaryButton } from '../../Compoents/Buttons/BTN'
import Colors from '../../assets/Colors/Colors';
let { height, width } = Dimensions.get("window")

const Scanner = ({ navigation }) => {
    const onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        );
    };
    return (
        <SafeAreaView
        style={{ backgroundColor:Colors.bg, flex: 1 }}
        >
            <View
                style={{ flexDirection: "row" }}
            >
                 <TouchableOpacity
                onPress={()=>{navigation.goBack()}}
                >
                <Image
                    style={styles.back}
                    source={require("../../assets/images/back.png")}
                />
                </TouchableOpacity>
                <Text
                    style={styles.welcome}
                >
                    Driver’s license scan
                </Text>
            </View>
            <View
                style={{
                    //   alignContent:"center",
                    //   alignSelf:"center",
                    // justifyContent:"center",
                    // backgroundColor:"red"
                }}
            >
                <QRCodeScanner
                    onRead={onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.torch}
                    // cameraContainerStyle={{
                    // //    borderRadius:200

                    // }}
                    cameraStyle={{
                        height: height * 0.55,
                        backgroundColor: "red",
                        width: width * 0.6,
                        marginLeft: width * 0.2,
                        marginTop: height * 0.05
                        // borderRadius:200
                    }}

                // topContent={
                //     <Text style={styles.centerText}>
                //         Go to{' '}
                //         <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                //         your computer and scan the QR code.
                //     </Text>
                // }
                // bottomContent={
                //     <TouchableOpacity style={styles.buttonTouchable}>
                //         <Text style={styles.buttonText}>OK. Got it!</Text>
                //     </TouchableOpacity>
                // }
                />
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    paddingHorizontal: width * 0.1,
                    marginTop: height * 0.65
                }}
            >
                <IconButton
                    source={require("../../assets/images/type.png")}
                    onPress={() => { navigation.navigate("Information") }}
                />
                <Text
                style={{
                    // backgroundColor:"red",
                    width:width*0.3,
                    textAlign:"center",
                    fontFamily:"Poppins-Medium",
                    color:Colors.text,
                    paddingTop:height*0.035
                }}
                >Must be 18+ with valid
                    license</Text>
                <IconButton
                    source={require("../../assets/images/torch.png")}
                    // onPress={() => { navigation.navigate("Scanner") }}
                />


            </View>
        </SafeAreaView>
    )
}

export default Scanner

const styles = StyleSheet.create({
    back: {
        resizeMode: "contain",
        height: height * 0.05,
        // backgroundColor:"red",
        width: width * 0.13,
        // alignSelf: "center",
        marginTop: height * 0.03,

    },
    welcome: {
        fontSize: width * 0.05,
        fontFamily: "Poppins-Bold",
        color: Colors.theme,
        marginTop: height * 0.036,
        marginLeft: width * 0.05,
        // backgroundColor:"red"
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
})