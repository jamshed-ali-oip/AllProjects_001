import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Colors from '../../assets/Colors/Colors'
import { useSelector } from 'react-redux'
import { color } from 'react-native-reanimated'
let { width, height } = Dimensions.get("window")
const SecondayButton = (props) => {
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.secondarybtn, { backgroundColor: Country == "UKRAINE" ? Colors.Yellow : Colors.Orange }]}
        >
            <Text
                style={[styles.secondarytext, { color: Country == "UKRAINE" ? Colors.blackish : Colors.white }]}
            >{props.title} </Text>
        </TouchableOpacity>
    )
}


const PrimaryButton = (props) => {
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.PrimaryButton, { backgroundColor: Country == "UKRAINE" ? Colors.Yellow : Colors.Orange }]}
        >
            <Text
                style={[styles.Primarytext, { color: Country == "UKRAINE" ? Colors.blackish : Colors.white }]}
            >{props.title} </Text>
        </TouchableOpacity>
    )
}
const PrimaryWhite = (props) => {
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.Primarywhite}
        >
            <Text
                style={styles.Primarywhitetext}
            >{props.title} </Text>
        </TouchableOpacity>
    )
}
const IconButton = (props) => {
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.IConButton, { backgroundColor: Country == "UKRAINE" ? Colors.Yellow : Colors.Orange }]}
        >
            {/* <Text
            style={styles.Primarytext}
            >{props.title} </Text> */}

            <Image
                style={styles.Icon}
                source={props.source}
            />
        </TouchableOpacity>
    )
}
const OutlineButtton = (props) => {
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.OutlineButtton, { borderColor: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme }]}
        >
            <Text
                style={[styles.outlinebuttontext, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme }]}
            >{props.title} </Text>
        </TouchableOpacity>
    )
}
const SmallBtn = (props) => {
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.SmallButton, { backgroundColor: Country == "UKRAINE" ? Colors.Yellow : Colors.Orange }]}
        >
            <Text
                style={[styles.smallbuttontext, { color: Country == "UKRAINE" ? Colors.blackish : Colors.white }]}
            >{props.title} </Text>

        </TouchableOpacity>
    )
}

export { PrimaryButton, SecondayButton, IconButton, OutlineButtton, SmallBtn, PrimaryWhite }

const styles = StyleSheet.create({
    secondarybtn: {
        height: height * 0.059,
        backgroundColor: Colors.Orange,
        width: width * 0.8,
        alignSelf: "center",
        borderRadius: width * 0.055,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        marginTop: height * 0.015
    },
    secondarytext: {
        fontSize: width * 0.037,
        color: Colors.white,
        fontFamily: "Poppins-Medium",
        textAlign: "center",
        textAlignVertical: "center"
    },
    PrimaryButton: {
        height: height * 0.059,
        backgroundColor: Colors.Orange,
        width: width * 0.55,
        alignSelf: "center",
        borderRadius: width * 0.055,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        marginTop: height * 0.015
    },
    Primarywhite: {
        height: height * 0.059,
        backgroundColor: Colors.white,
        width: width * 0.55,
        alignSelf: "center",
        borderRadius: width * 0.055,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        marginTop: height * 0.015
    },
    Primarytext: {
        fontSize: width * 0.037,
        color: Colors.white,
        fontFamily: "Poppins-Medium",
        textAlign: "center",
        textAlignVertical: "center"
    },
    Primarywhitetext: {
        fontSize: width * 0.037,
        color: Colors.blackish,
        fontFamily: "Poppins-Medium",
        textAlign: "center",
        textAlignVertical: "center"
    },
    IConButton: {
        height: height * 0.07,
        backgroundColor: Colors.Orange,
        width: width * 0.145,
        alignSelf: "center",
        borderRadius: width * 0.1,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        marginTop: height * 0.015
    },
    Icon: {
        resizeMode: "contain"
    },
    OutlineButtton: {
        height: height * 0.059,
        borderWidth: 1,
        borderColor: Colors.theme,
        width: width * 0.38,
        alignSelf: "center",
        borderRadius: width * 0.055,
        alignItems: "center",
        justifyContent: "center",
        marginTop: height * 0.015
    },
    outlinebuttontext: {
        fontSize: width * 0.037,
        color: Colors.theme,
        fontFamily: "Poppins-Medium",
        textAlign: "center",
        textAlignVertical: "center"
    },

    SmallButton: {
        height: height * 0.059,
        backgroundColor: Colors.Orange,
        width: width * 0.38,
        alignSelf: "center",
        borderRadius: width * 0.055,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        marginTop: height * 0.015
    },
    smallbuttontext: {
        fontSize: width * 0.037,
        color: Colors.white,
        fontFamily: "Poppins-Medium",
        textAlign: "center",
        textAlignVertical: "center"
    },
})