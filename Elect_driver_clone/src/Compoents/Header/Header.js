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
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { Socket_URL } from '../../config/config'
import { STATUS } from '../../redux/const/const'
import { useDispatch, useSelector } from 'react-redux'
import { CHAT_ID } from '../../redux/actions/driver.action'
let { width, height } = Dimensions.get("window")
const Header = (props) => {
    const [status, SetStatus] = useState(true)
    const dispatch = useDispatch()
    const ProfileData = useSelector((state) => state?.auth?.userInfo)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())

    useEffect(() => {
        dispatch({
            type: STATUS,
            payload: status,
        });
    }, [status])
    const MyStatus = useSelector((state) => state.auth.status)
    console.log("MyStatus", MyStatus)


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
            <TouchableOpacity
                onPress={() => { SetStatus(!status) }}
            >
                {
                    MyStatus == true ?
                        <View
                            style={[styles.stausCont, { backgroundColor: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme }]}
                        >
                            <Text
                                style={styles.text}
                            >
                                {Country == "UKRAINE" ? "Онлайн" : "Online"}
                            </Text>
                            <View
                                style={styles.CarCOnt}
                            >
                                <Image
                                    style={{ tintColor: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, resizeMode: "contain" }}
                                    source={require("../../assets/images/car.png")}
                                />
                            </View>
                        </View> : <View
                            style={[styles.stausCont2, { backgroundColor: Country == "UKRAINE" ? Colors.Yellow : Colors.Orange, }]}
                        >

                            <View
                                style={styles.CarCOnt2}
                            >
                                <Image
                                    style={{ tintColor: Country == "UKRAINE" ? Colors.Yellow : Colors.Orange, resizeMode: "contain" }}
                                    source={require("../../assets/images/car.png")}
                                />
                            </View>
                            <Text
                                style={styles.text2}
                            >
                                {Country == "UKRAINE" ? "Офлайн" : "Offline"}
                            </Text>
                        </View>
                }
            </TouchableOpacity>
            {/* {
                status == "OFFLINE" ?
                   : null
            } */}
            <TouchableOpacity
                disabled={true}
            // style={styles.searchcont}
            // onPress={() => {hitmyapi()}}
            >
                {/* <Image
                    style={{ resizeMode: "contain" }}
                    source={require("../../assets/images/search.png")}
                /> */}
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    profile: {
        // resizeMode: "contain",
        height: height * 0.045,
        width: width * 0.085,
        marginLeft: -width * 0.0525,
        backgroundColor: Colors.placeholder,
        resizeMode: "cover",
        borderRadius: 100
    },
    cont: {
        padding: width * 0.035
    },
    stausCont: {
        height: height * 0.058,
        width: width * 0.35,
        backgroundColor: Colors.theme,
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