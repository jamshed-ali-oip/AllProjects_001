import { SafeAreaView, StyleSheet, Text, View, Dimensions, Button, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { StripeProvider, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PaymentInfo, SavedCards, secretId } from '../../redux/actions/ride.action';
import { AuthContext } from '../../context/AuthContext';
import Colors from '../../assets/Colors/Colors';
import { PrimaryButton, SecondayButton } from '../../Compoents/Buttons/BTN';

// import { CardField, useStripe } from '@stripe/stripe-react-native';
let { width, height } = Dimensions.get("window")


const CardPayment = ({ navigation }) => {

    const { confirmPayment, loading } = useConfirmPayment();
    const dispatch = useDispatch()
    const rideDetail = useSelector((state) => state?.auth?.ride?.ride)
    const [clientSectret, setClientSecret] = useState()
    const [Loading, setLoading] = useState(false)
    const [payment, setpayment] = useState()
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    const { socket } = useContext(AuthContext)
    console.log("ride detail", rideDetail)

    const Secret = async () => {
        const flag = {
            rideId: rideDetail?.id,
            driverId: rideDetail?.driverId

        }
        console.log("flag", flag)
        const data = await dispatch(secretId(flag))
        console.log("client secret", data)
        setClientSecret(data?.data?.data)
    }
    useEffect(() => {
        Secret()
    }, [])
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const initializePaymentSheet = async () => {

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            customerId: clientSectret?.payment?.customer,
            customerEphemeralKeySecret: clientSectret?.ephemeralKey,
            paymentIntentClientSecret: clientSectret?.payment?.client_secret,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });
        if (!error) {
            setLoading(true);
            navigation.navigate("PaymentDone")
            const eventData = {
                userId: rideDetail?.user?.id,
                rideId: rideDetail?.id,
                riderId: rideDetail?.driver?.id
            };
            console.log("EventCashPAyment", eventData)
            const eventName = 'PAYMENT_DONE';
            // Emit the event to the server
            socket.emit(eventName, JSON.stringify(eventData));
        }
    };
    const [cardDetail, setCardsDetail] = useState()
    useEffect(() => {
        cardData()
        paymentInformation()
    }, [])
    const cardData = async () => {
        const data = await dispatch(SavedCards())
        console.log("my catd dtaada", data?.data?.data?.paymentMethod?.data)
        setCardsDetail(data?.data?.data?.paymentMethod?.data)
    }
    const handlePayPress = async () => {
        // Gather the customer's billing information (for example, email)
        const billingDetails = {
            email: 'jenny.rosen@example.com',
        };

        // Fetch the intent client secret from the backend
        // const clientSecret = await fetchPaymentIntentClientSecret();

        // Confirm the payment with the card details
        const { paymentIntent, error } = await confirmPayment(clientSectret, {
            paymentMethodType: 'Card',
            paymentMethodData: {
                billingDetails,
            },
        });

        if (error) {
            console.log('Payment confirmation error', error);
        } else if (paymentIntent) {
            console.log('Success from promise', paymentIntent);
            navigation.navigate("PaymentDone")
            const eventData = {
                userId: rideDetail?.user?.id,
                rideId: rideDetail?.id,
                riderId: rideDetail?.driver?.id
            };
            console.log("EventCashPAyment", eventData)
            const eventName = 'PAYMENT_DONE';
            // Emit the event to the server
            socket.emit(eventName, JSON.stringify(eventData));
        }
    };
    const paymentInformation = async () => {
        const data = await dispatch(PaymentInfo(rideDetail?.id))
        console.log("PAmentDEtauks++++++++++++++++", data?.data?.data)
        setpayment(data?.data?.data)
    }
    return (
        <SafeAreaView>
            <StripeProvider
                publishableKey="pk_test_51Lc8HiKuANEC8G8JnyEVmTrI32B9N8tQaSENdwz4yamiL2SrE2iCl4M5dJYzovq8mu2Db6rm8VLtCBEaB77jhDDx003MjKkjdV"
            // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
            >
                <View
                    style={{
                        height: height * height,
                        backgroundColor: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                    }}
                >
                    <View
                        style={{ flexDirection: "row", alignItems: "center", padding: width * 0.0225 }}
                    >
                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}
                        >
                            <Image
                                style=
                                {{ resizeMode: "contain", height: height * 0.055 }}
                                source={require("../../assets/images/back.png")}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{ fontFamily: "Poppins-Bold", color: Colors.white, marginLeft: width * 0.0125 }}
                        >{Country == "UKRAINE" ? "Оплата" : "Payment"}</Text>
                    </View>
                    <Image
                        style={{ alignSelf: "center", marginTop: height * 0.035 }}
                        source={Country == "UKRAINE" ? require("../../assets/images/1ukr.png") : require("../../assets/images/1.png")}

                    />
                    <Text
                        style={{ fontFamily: "Poppins-Bold", color: Colors.white, alignSelf: "center", fontSize: width * 0.035 }}
                    >
                        {Country == "UKRAINE" ? "Картка/кредитна картка" : " Card/Credit Card"}
                    </Text>
                    <View
                        style={{
                            height: height * height,
                            backgroundColor: Colors.white,
                            marginBottom: 0,
                            borderRadius: width * 0.035,
                            marginTop: height * 0.035

                        }}
                    >
                        <Text
                            style={{ fontFamily: "Poppins-Bold", color: Colors.theme, alignSelf: "center", fontSize: width * 0.04, marginTop: height * 0.055 }}
                        >
                            {/* Card/Credit Card */}
                        </Text>
                        {/* <View
                            style={{
                                borderWidth: 1,
                                width: width * 0.8,
                                alignSelf: "center",
                                borderRadius: width * 0.025,
                                borderColor: Colors.placeholder,
                                marginBottom: height * 0.035, marginTop: height * 0.05
                            }}
                        >
                            <CardField
                                postalCodeEnabled={true}
                                placeholders={{
                                    number: '4242 4242 4242 4242',
                                }}
                                cardStyle={{
                                    backgroundColor: '#FFFFFF',
                                    textColor: '#000000',

                                }}
                                style={{
                                    width: "100%",
                                    height: 30,
                                    marginVertical: height * 0.01,
                                    borderWidth: 1,
                                    backgroundColor: "red"
                                }}
                                onCardChange={(cardDetails) => {
                                    console.log('cardDetails', cardDetails);
                                }}
                                onFocus={(focusedField) => {
                                    console.log('focusField', focusedField);
                                }}
                            />


                        </View> */}
                        {/* {
                            cardDetail?.map((i) => {
                                return (
                                    <View
                                        style={{
                                            width: width * 0.8,
                                            height: height * 0.0835,
                                            backgroundColor: "white",
                                            alignSelf: "center",
                                            borderRadius: width * 0.035,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 6,
                                            },
                                            shadowOpacity: 0.39,
                                            shadowRadius: 8.30,

                                            elevation: 10,
                                            // alignContent: "center",
                                            // justifyContent: "center",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            margin: width * 0.008
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                height: height * 0.035,
                                                width: width * 0.15,
                                                // backgroundColor: "red"

                                            }}
                                            source={i?.card?.brand == "visa" ? require("../../assets/images/DrawerIcon/visa.png") : require("../../assets/images/DrawerIcon/bank.png")}
                                        />
                                        <View
                                            style={{ width: width * 0.54 }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: width * 0.035,
                                                    color: Colors.blackish,
                                                    fontFamily: "Poppins-Regular"
                                                }}
                                            >{i?.type == "card" ? i?.card?.brand + `****${i?.card?.last4}` : i?.us_bank_account?.bank_name + `****${i?.us_bank_account?.last4}`}</Text>
                                            <Text
                                                style={{
                                                    fontSize: width * 0.035,
                                                    color: Colors.blackish,
                                                    fontFamily: "Poppins-Regular"
                                                }}
                                            > {i?.type == "card" ? "Expires " + i?.card?.exp_month + "/" + i?.card?.exp_year : "USD"}</Text>
                                        </View>
                                    
                                    </View>
                                )
                            })
                        } */}
                        <View
                            style={styles.invoices}
                        >
                            <Text
                                style={{
                                    fontFamily: "Poppins-Bold",
                                    fontSize: width * 0.045,
                                    color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme,
                                    alignSelf: "center",
                                    marginTop: height * 0.0125
                                }}
                            >{Country == "UKRAINE" ? "Рахунок-фактура" : "Ride Invoice"}</Text>
                            <View
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}
                            >
                                <Text
                                    style={[styles.titlepice, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, }]}
                                >{Country == "UKRAINE" ? "Вартість проїзду" : "Ride Fare"}</Text>
                                <Text
                                    style={[styles.amount, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, }]}
                                >{"$ " + payment?.price / 100}</Text>
                            </View>
                            <View
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}
                            >
                                <Text
                                    style={[styles.titlepice, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, }]}
                                >{Country == "UKRAINE" ? "Порада" : "Tip"}</Text>
                                <Text
                                    style={[styles.amount, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, }]}>
                                    {Country == "UKRAINE" ? "₴" : "$ " + payment?.tip}</Text>
                            </View>
                            <View
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}
                            >
                                <Text
                                    style={[styles.titlepice, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, }]}
                                >{Country == "UKRAINE" ? "податок" : "Tax"}</Text>
                                <Text
                                    style={[styles.amount, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, }]}>{payment?.tax == null ? "$ 0" : payment?.tax}</Text>
                            </View>
                            <View
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}
                            >
                                <Text
                                    style={[styles.titlepice, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, }]}
                                >{Country == "UKRAINE" ? "Плата за очікування" : "Waiting Charges"}</Text>
                                <Text
                                    style={[styles.amount, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, }]}>{Country == "UKRAINE" ? "₴" : "$ " + payment?.waiting_fee}</Text>
                            </View>
                            <View
                                style={styles.line}
                            ></View>
                            <View
                                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}
                            >
                                <Text
                                    style={[styles.titlepice, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, }]}
                                >{Country == "UKRAINE" ? "Всього" : "Total Amount"}</Text>
                                <Text
                                    style={[styles.amount, { color: Country == "UKRAINE" ? Colors.Bluetheme : Colors.theme, }]}>{Country == "UKRAINE" ? "₴" : "$ " + payment?.total / 100}</Text>
                            </View>
                        </View>
                        <SecondayButton
                            onPress={() => { initializePaymentSheet() }}
                            title={loading ? <ActivityIndicator size={20} color={Colors.white} /> : Country == "UKRAINE" ? "Продовжити оплату" : "Proceed Payment"}
                        />
                    </View>

                </View>

            </StripeProvider>
        </SafeAreaView>
    )
}

export default CardPayment

const styles = StyleSheet.create({
    titlepice: {
        fontFamily: "Poppins-Medium",
        fontSize: width * 0.035,
        color: Colors?.theme,
        alignSelf: "flex-start",
        marginTop: height * 0.0125,
        // backgroundColor: "red",
        width: width * 0.3
        // textAlignVertical: "center"
    },
    amount: {
        fontFamily: "Poppins-Medium",
        fontSize: width * 0.035,
        color: Colors?.theme,
        alignSelf: "flex-start",
        // alignSelf: "center",
        marginTop: height * 0.0125,
        width: width * 0.3

        // textAlignVertical: "center"
    },
    invoices: {
        height: height * 0.315,
        width: width * 0.8,
        backgroundColor: Colors?.white,
        alignSelf: "center",
        borderRadius: width * 0.035,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    line: {
        borderBottomColor: Colors.placeholder,
        borderBottomWidth: 1,
        // width: width
    }
})