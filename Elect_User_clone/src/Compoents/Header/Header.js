import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import Colors from '../../assets/Colors/Colors'
import { useSelector } from 'react-redux'

let { width, height } = Dimensions.get("window")
const Header = (props) => {
    const [status, SetStatus] = useState("OFFLINE")
    const ProfileData = useSelector((state) => state?.auth?.userInfo)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    return (
        <View
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}
        >
            <TouchableOpacity
                onPress={props.onPress}
                style={styles.cont}>
                <Image
                    style={styles.profile}
                    source={{ uri: `${ProfileData?.profile_picture}` }}
                />
            </TouchableOpacity>

            <Image
                style={{
                    height: height * 0.04,
                    resizeMode: "contain",
                    marginLeft: -width * 0.08,
                    // backgroundColor:"red"

                }}
                source={Country == "UKRAINE" ? require("../../assets/images/logoukr.png") : require("../../assets/images/logo.png")} />
            <View
                style={{}}
            >

            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    profile: {
        resizeMode: "contain",
        height: height * 0.045,
        width: width * 0.085,
        marginLeft: -width * 0.045,
        backgroundColor: Colors.placeholder,
        resizeMode: "cover",
        borderRadius: 100
    },
    cont: {
        padding: width * 0.035,
        borderRadius: 100
    },
    stausCont: {
        height: height * 0.058,
        width: width * 0.35,
        backgroundColor: Colors.theme,
        borderRadius: width * 0.065,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        // paddingHorizontal: width * 0.04,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    CarCOnt: {
        backgroundColor: Colors.white,
        height: height * .045,
        width: width * 0.085,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: width * 0.045
    },
    text: {
        fontSize: width * 0.035,
        color: Colors.white,
        fontFamily: "Poppins-Regular"
    },
    stausCont2: {
        height: height * 0.058,
        width: width * 0.35,
        backgroundColor: Colors.Orange,
        borderRadius: width * 0.065,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: width * 0.04,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    CarCOnt2: {
        backgroundColor: Colors.white,
        height: height * .045,
        width: width * 0.085,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: width * 0.045
    },
    text2: {
        fontSize: width * 0.035,
        color: Colors.white,
        fontFamily: "Poppins-Regular"
    },
    searchcont: {
        backgroundColor: Colors.white,
        height: height * 0.045,
        width: width * 0.085,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: width * 0.35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,

    }
})