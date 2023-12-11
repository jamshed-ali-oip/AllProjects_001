import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../assets/Colors/Colors'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { PrimaryButton } from '../../Compoents/Buttons/BTN';
import { useDispatch, useSelector } from 'react-redux';
import { PinReviews, Review } from '../../redux/actions/ride.action';
import { ScrollView } from 'react-native-gesture-handler';
import { Toast } from 'react-native-toast-message/lib/src/Toast'

let { width, height } = Dimensions.get("window")


const PaymentDone = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            setPage(false)
        }, 5000)
    }, [])
    const [page, setPage] = useState(true)
    const [rating, setRating] = useState(0)
    const [Feedback, setFeedback] = useState()
    const [Loading, setLoading] = useState(false)
    const [Pin, setPin] = useState()
    console.log("rating", rating)
    console.log("PINSS", Pin)
    const dispatch = useDispatch()
    const rider = useSelector((state) => state?.auth?.ride?.ride)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    console.log(" of my", rider)
    const Submit = () => {
        setLoading(true)
        const data = {
            rideId: rider.id,
            driverId: rider.driverId,
            rating: rating,
            comments: "good",
        }
        dispatch(Review(data, navigation, setPage, Toast, setLoading))
    }
    useEffect(() => {
        pinReview()
    }, [])
    const pinReview = async () => {
        const data = await dispatch(PinReviews())
        setPin(data?.data?.data)
    }
    const myjson = [
        {
            id: 1,
            comment: "good driving skills"
        },
        {
            id: 2,
            comment: "nice behavior"
        },
        {
            id: 3,
            comment: "Excellent service"
        },
        {
            id: 4,
            comment: "bad"
        },
        {
            id: 5,
            comment: "poor"
        },
        {
            id: 6,
            comment: "average"
        }
    ]

    return (
        <SafeAreaView style={{ backgroundColor: Colors.bg, flex: 1 }}>

            <ScrollView>
                {
                    page === true ?
                        <View style={{ flex: 1, backgroundColor: Colors.bg, alignItems: "center", justifyContent: "center" }}>
                            <Image
                                source={Country == "UKRAINE" ? require("../../assets/images/paymentdoneukr.png") : require("../../assets/images/psymentdone.png")}
                            />
                            <Text
                                style={{
                                    fontFamily: "Poppins-Bold",
                                    fontSize: width * 0.045,
                                    color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                                }}
                            >{Country == "UKRAINE" ? "Оплату успішно виконано!" : "Payment Successfully Done!"}</Text>
                        </View> :
                        <>
                            <View
                                style={{
                                    backgroundColor: Country == "UKRAINE" ? Colors.Yellow : Colors.theme,
                                    height: height * 0.116,
                                    borderBottomEndRadius: width * 0.045,
                                    borderBottomStartRadius: width * 0.045,
                                }}
                            >
                                <View
                                    style={{
                                        height: height * 0.11,
                                        backgroundColor: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                                        borderBottomEndRadius: width * 0.045,
                                        borderBottomStartRadius: width * 0.045,
                                        // flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center"

                                    }}
                                >

                                    <Text
                                        style={{
                                            fontFamily: "Poppins-Bold",
                                            fontSize: width * 0.04,
                                            color: Colors.white,
                                            alignSelf: "center"
                                            // marginLeft: width * 0.0145
                                        }}
                                    >{Country == "UKRAINE" ? "Рейтинг водія" : "Driver Rating"}</Text>

                                </View>


                            </View>
                            <Toast ref={(ref) => { Toast.setref(ref) }} />
                            <View
                                style={{ flexDirection: "row", alignSelf: "center", alignItems: "center", marginTop: height * 0.08 }}
                            >
                                <Image
                                    style={{
                                        resizeMode: "cover",
                                        alignSelf: "center",
                                        margin: width * 0.01,
                                        height: height * 0.08,
                                        width: width * 0.15,
                                        backgroundColor: Colors.placeholder,
                                        // resizeMode: "contain",
                                        borderRadius: 100
                                    }}
                                    source={{ uri: `${rider?.driver?.profile_picture}` }}
                                />
                                <View
                                    style={{ width: width * 0.6 }}
                                >

                                    <Text
                                        style={{
                                            fontSize: width * 0.03,
                                            fontFamily: "Poppins-Regular",
                                            color: Country == "UKRAINE" ? Colors.Yellow : Colors.theme,
                                        }}
                                    >{Country == "UKRAINE" ? "Водій" : "Driver"}</Text>
                                    <Text

                                        style={{
                                            fontSize: width * 0.04,
                                            fontFamily: "Poppins-Bold",
                                            color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                                            marginTop: -height * 0.008
                                        }}
                                    >{rider?.driver?.first_name} {" "}{rider?.driver?.last_name}</Text>
                                    <View
                                        style={{ flexDirection: "row", alignItems: "center" }}
                                    >
                                        <Image
                                            style={{ resizeMode: "contain", tintColor: Country == "UKRAINE" ? Colors?.Yellow : Colors?.theme }}
                                            source={require("../../assets/images/star.png")}
                                        />
                                        <Text
                                            style={{ fontSize: width * 0.0225, color: "black" }}
                                        >4.8</Text>
                                    </View>
                                </View>

                            </View>
                            <Text
                                style={{
                                    alignSelf: "center",
                                    fontSize: width * 0.027,
                                    color: Colors.placeholder,
                                    fontFamily: "Poppins-Regular",
                                    marginTop: height * 0.1
                                }}
                            >{Country == "UKRAINE" ? "Дайте оцінку" : "Give Rating"}</Text>
                            <Rating
                                type='star'
                                ratingCount={5}
                                imageSize={30}
                                onFinishRating={() => setRating}
                                showRating
                            />

                            <View
                                style={{
                                    marginTop: height * 0.035,
                                    flexDirection: "row",
                                    width: width * 0.7,
                                    flexWrap: "wrap",
                                    alignSelf: "center"
                                }}
                            >
                                {Pin.map((i) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setFeedback(i?.comments)
                                            }}
                                            style={{
                                                backgroundColor: Colors.theme,
                                                // width: width * 0.2,
                                                borderRadius: 10,
                                                height: height * 0.035,
                                                justifyContent: "center",
                                                margin: 5,
                                                paddingHorizontal: 10,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: "Poppins-Medium",
                                                    color: Colors.white
                                                }}
                                            >{i.comments}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                            <View
                                style={{
                                    borderWidth: 1,
                                    width: width * 0.7,
                                    alignSelf: "center",
                                    borderRadius: width * 0.025,
                                    borderColor: Colors.placeholder,
                                    marginBottom: height * 0.035,
                                    marginTop: height * 0.01,
                                    paddingLeft: width * 0.0245
                                }}
                            >
                                <TextInput
                                    style={{ width: width * 0.75, height: height * 0.06 }}
                                    placeholder={Country == "UKRAINE" ? "Зворотній зв'язок" : 'Feedback'}
                                    // keyboardType='number-pad'
                                    onChangeText={setFeedback}
                                    value={Feedback}
                                />
                            </View>
                            <PrimaryButton
                                onPress={() => { Submit() }}
                                title={Loading == true ? <ActivityIndicator size={"small"} color={Colors?.white} /> : Country == "UKRAINE" ? "Надіслати" : "Submit"}
                            />

                        </>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default PaymentDone

const styles = StyleSheet.create({})