import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView, Linking ,TextInput} from "react-native";
let { width, height } = Dimensions.get('window');
const Password = () => {
    const [Oldpass, onChangeOldpass] = React.useState("");
    const [Newpass, onChangeNewpass] = React.useState("");
    const [Repass, onChangeRepass] = React.useState("");
    
    return (
        <SafeAreaView>
            <ScrollView>

                <View
                    style={styles.Header}
                >
                    <Text style={styles.name}>
                        Password
                    </Text>

                </View>
                <View style={styles.Card}>
                    <Text style={styles.optionsText}>
                        Change Password
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeOldpass}
                        value={Oldpass}
                        keyboardType="numeric"
                        placeholder="Type Old Password"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNewpass}
                        value={Newpass}
                        placeholder="Enter New Password"
                        keyboardType="numeric"
                    />
                     <TextInput
                        style={styles.input}
                        onChangeText={onChangeRepass}
                        value={Repass}
                        placeholder="Re-Enter New Password"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={{
                        height:height*.06,
                        width:width*.5,
                        backgroundColor:"red",
                        borderRadius:20,
                        alignItems:"center",
                        justifyContent:"center",
                        alignSelf:"center",
                    }} >
                        <Text style={{fontSize:18,color:"white",}}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )

}
export default Password;
const styles = StyleSheet.create({


    Header: {
        height: height * .08,
        width: width * 1,
        backgroundColor: "red",
        // alignItems:"center"
        justifyContent: "center",
        padding: 10
    },
    name: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",

    }
    , Card: {
        height: height * .5,
        width: width * .95,
        backgroundColor: "white",
        margin: 5,
        borderRadius: 10,
        elevation: 10,
        padding: 15,
        alignSelf: "center",
    },
    optionsText: {
        fontSize: 25,
        alignSelf: "center",
        paddingLeft: 10,


    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius:10
      },



})