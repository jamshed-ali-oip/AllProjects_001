import React, { useState } from "react"
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView, ImageBackground, BackHandler, Modal, Pressable, TextInput, ImageBackgroundBase } from "react-native";
// import Ratings from '../Common/Rating';
import { Rating, AirbnbRating } from 'react-native-ratings';

let { width, height } = Dimensions.get('window');

const V_Edit = () => {
    const [name, onChangename] = React.useState("");
    const [email, onChangeemail] = React.useState("");
    const [cnic, onChangecnic] = React.useState("");
    const [WhatsApp, onChangeWhatsApp] = React.useState("");
    const [address, onChangeaddress] = React.useState("");
    const [city, onChangecity] = React.useState("");
    const [description, onChangedescription] = React.useState("");

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ alignContent: "center", alignItems: "center", backgroundColor: "white" }}>
                    <TouchableOpacity onPress={() => { alert("select image") }}>
                        <ImageBackground style={{ height: height * .25, width: width * .95, alignItems: "center", marginTop: 5, borderRadius: 100 }} source={require("../Images/store.jpg")} >

                            <Image style={{ height: "100%", width: "100%", alignSelf: "center", opacity: .4 }} source={require("../Images/cover.jpg")} />
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={{}}>
                        <Text>Shop Name:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangename}
                            value={name}
                            placeholder="Shop Name"
                        />
                        <Text>Email:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeemail}
                            value={email}
                            placeholder="Email"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                        />
                       
                        <Text>WhatsApp Number:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeWhatsApp}
                            value={WhatsApp}
                            placeholder="WhatsApp Number"
                            keyboardType="numeric"
                        />
                        <Text>Address:</Text>
                        <TextInput
                            style={styles.input2}
                            onChangeText={onChangeaddress}
                            value={address}
                            placeholder="Address"
                        // keyboardType="numeric"
                        />
                        <Text>City:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangecity}
                            value={city}
                            placeholder="City"

                        />
                        <Text>Description About Shop:</Text>
                        <TextInput
                            style={styles.input2}
                            onChangeText={onChangedescription}
                            value={description}
                            placeholder="Description About Shop"
                        // keyboardType="numeric"
                        />
                        <TouchableOpacity
                            style={{ backgroundColor: "red", height: height * .07, width: width * .5, borderRadius: 20, justifyContent: "center", alignItems: "center", alignSelf: "center", marginBottom: 40 }}
                        >
                            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                                Save Changes
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>)

}
export default V_Edit;
const styles = StyleSheet.create({
    input: {
        height: 40,
        width: width * .90,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    input2: {
        height: 80,
        width: width * .90,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
});
