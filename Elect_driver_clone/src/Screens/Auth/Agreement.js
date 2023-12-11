import { StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { InfoInput, VerInput } from '../../Compoents/Inputs/Inputs'
import { IconButton, OutlineButtton, PrimaryButton, SmallBtn } from '../../Compoents/Buttons/BTN'
import Colors from '../../assets/Colors/Colors'

let { height, width } = Dimensions.get("window")

const Information = ({ navigation }) => {
    return (
        <SafeAreaView
            style={{ backgroundColor:Colors.bg, flex: 1 }}
        >
            <View
                style={{ flexDirection: "row" }}
            >
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                >
                    <Image
                        style={styles.back}
                        source={require("../../assets/images/back.png")}
                    />
                </TouchableOpacity>
            </View>

            <Text
                style={{
                    fontFamily: "Poppins-Medium",
                    fontSize: width * 0.1,
                    width: width * 0.53,
                    marginLeft: width * 0.08,
                    marginTop: height * 0.05,
                    color: Colors.theme
                }}
            >
                Let's Get Started
            </Text>
            <Image
                style={{
                    resizeMode: "contain",
                    alignSelf: "center",
                    width: width * 0.9,
                    height: height * 0.23,
                    // backgroundColor:"red"

                }}
                source={require("../../assets/images/carigraphy.png")}
            />
            <Text
                style={{
                    fontFamily: "Poppins-Medium",
                    fontSize: width * 0.042,
                    // width: width * 0.53,
                    marginLeft: width * 0.08,
                    // marginTop: height * 0.05,
                    color: Colors.Orange
                }}
            >
                Car Info:
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: width * 0.045,
                    marginTop: height * 0.015
                }}
            >
                <TouchableOpacity>
                    <Image
                        style={{
                            resizeMode: "contain",
                            height: height * 0.055,
                            width: width * 0.15,
                            // backgroundColor:"red"
                        }}
                        source={require("../../assets/images/add.png")}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        marginTop: -height * 0.01,
                        fontFamily: "Poppins-Medium",
                        color: Colors.text,
                        fontSize: width * 0.038
                    }}
                >Service requirments</Text>
                <Image
                    style={{
                        resizeMode: "contain",
                        marginLeft: width * 0.285,
                        marginTop: -height * 0.01,
                    }}
                    source={require("../../assets/images/next.png")}
                />
            </View>

            <View
                style={{
                    borderBottomWidth: 1,
                    width: width * 0.8,
                    borderBottomColor: Colors.placeholder,
                    alignSelf: "center"

                }}
            ></View>
            <View
                style={styles.Cont_agree}
            >
                <Image
                    style={styles.agreeIcon}
                    source={require("../../assets/images/ag1.png")}
                />
                <Text
                    style={styles.agree}
                >
                    You must be physically present and with your car at the time of service.
                </Text>
            </View>
            <View
                style={styles.Cont_agree}
            >
                <Image
                    style={styles.agreeIcon}
                    source={require("../../assets/images/ag2.png")}
                />
                <Text
                    style={styles.agree}
                >
                    As proof of ownership, you must have your car keys on hand.
                </Text>
            </View>
            <View
            style={{flexDirection:"row",justifyContent:"space-around",paddingHorizontal:width*0.08}}
            >
              
                <OutlineButtton
                title="Cancel"
                />
                  <SmallBtn
                title="Agree"
                />
            </View>
        </SafeAreaView>
    )
}

export default Information

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
    agree: {
        fontFamily: "Poppins-Regular",
        width: width * 0.7,
        fontSize: width * 0.035,
        color: Colors.text
    },
    Cont_agree: {
        flexDirection: "row",
        margin: width * 0.015,
        marginLeft: width * 0.065,
        marginTop: height * 0.015
    }, agreeIcon: {
        resizeMode: "contain",
        height: height * 0.065,
        width: width * 0.16
    }
})