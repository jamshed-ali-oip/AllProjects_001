import { flexbox } from "native-base/lib/typescript/theme/styled-system";
import React, { useState } from "react"
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView, BackHandler, Modal, Pressable, TextInput } from "react-native";
// import Ratings from '../Common/Rating';
import { Rating, AirbnbRating } from 'react-native-ratings';

let { width, height } = Dimensions.get('window');

const V_ProductDetail = ({ navigation, route }) => {
    const data = route?.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = React.useState("");
    const [number, onChangeNumber] = React.useState("");
    const [Price, onChangePrice] = React.useState("");
    console.log("dataaaaa", data)
    return (
        <SafeAreaView>
            <ScrollView>
            <Modal
                    animationType="slide"
                    transparent={true}

                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                onPress={() => { alert("add image") }}
                            >
                                <Image
                                    style={{ height: height * .3, width: width * .7, backgroundColor: "#dcdcdc", borderRadius: 15, padding: 10 }}
                                    source={require('../Images/addimage.png')}
                                />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeText}
                                value={text}
                                placeholder="Name Of Product           "
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangePrice}
                                value={Price}
                                placeholder="Price            "
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={{
                                    height: 80,
                                    width: width * .7,
                                    margin: 12,
                                    borderWidth: 1,
                                    padding: 10,
                                }}
                                onChangeText={onChangeNumber}
                                value={number}
                                placeholder="Description                    "

                                multiline={true}
                                numberOfLines={4}

                            />



                            <View
                                style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}
                            >

                                <TouchableOpacity
                                    style={{
                                        height: height * .05,
                                        backgroundColor: "red",
                                        width: width * .3,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 10,
                                        marginRight: 20
                                    }}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text
                                        style={{ color: "white", fontWeight: "bold" }}
                                    >
                                        Discard
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        height: height * .05,
                                        backgroundColor: "#a0c43c",
                                        width: width * .3,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 10
                                    }}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={{ color: "white", fontWeight: "bold" }}>
                                        Post
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View
                    style={styles.Header}
                >
                    <Text style={styles.name}>
                        Product Detail
                    </Text>

                </View>
                <View
                    style={{
                        backgroundColor: "white",
                        width: width * .95,
                        alignSelf: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        marginTop: 20

                    }}
                >
                    <Image source={{ uri: data.data.url }} style={{ height: height * .26, width: width * .90, borderRadius: 10,marginTop:10 }} />
                    <View style={{
                        paddingHorizontal: 5,
                        marginBottom: 10
                    }} >
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "bold",

                            }}
                        >Shop Name:{data.data.Brand}</Text>
                        
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "600",
                                color: "black"
                            }}
                        >Product Name:{data.data.name}</Text>
                         <Rating
                            style={styles.starIcon}
                            type='star'


                            ratingCount={5}

                            imageSize={25}
                            onFinishRating={(a) => alert(a)}

                        />
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "600",
                                color: "green"

                            }}
                        >Price:Rs{data.data.Price}</Text>
                        <Text

                            style={{
                                fontSize: 15,
                                fontWeight: "700",
                                // color:"green"

                            }}>Description:{data.data.description}</Text>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "600",
                                // color:"green"
                                fontStyle: "italic",

                            }}
                        >Location:{data.data.location}</Text>
                       

                    </View>
                    <View
                    style={{flexDirection:"row",justifyContent:"space-around",marginBottom:25}}
                    >
                        <TouchableOpacity
                          onPress={() => setModalVisible(true)}
                        style={{
                            backgroundColor:"#a0c43c",
                            height:height*.06,
                            width:width*.3,
                            borderRadius:10,
                            justifyContent:"center",
                            alignItems:"center",
                            flexDirection:"row",
                            margin:5,
                            marginRight:35     
                        }}
                        >
                            <Image style={{height:25,width:25,tintColor:"white"}} source={require("../Images/edit.png")} />
                            <Text
                            style={{color:"white",fontSize:18}}
                            >Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{
                            backgroundColor:"red",
                            height:height*.06,
                            width:width*.3,
                            borderRadius:10,
                            justifyContent:"center",
                            alignItems:"center",
                            flexDirection:"row",
                            margin:5
                        }}
                        >
                            <Image style={{height:25,width:25,tintColor:"white"}} source={require("../Images/delete.png")} />
                            <Text
                            style={{color:"white",fontSize:18}}
                            >Delete</Text>
                        </TouchableOpacity>
                        
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>

    )

}
export default V_ProductDetail;
const styles = StyleSheet.create({

    starIcon: {
        color: 'gold',
        // borderWidth: 1
        // justifyContent:"flex-start"
        alignSelf: "flex-start",
        padding: .5,
        flexDirection: "row",
        justifyContent: "space-around"

    },

    rating: {
        // marginTop: height * 0.01,
    },
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

    },
    Addcard: {
        height: height * .28,
        width: width * .4,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 10,
        padding: 10,
        margin: 10


    }, centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        // margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        width: width * .8
    },
    //   button: {
    //     borderRadius: 20,
    //     padding: 10,
    //     elevation: 2
    //   },
    //   buttonOpen: {
    //     backgroundColor: "#F194FF",
    //   },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: width * .7,
        borderRadius: 10
    },
    ImageComponentStyle: {
        marginTop: height * 0.01,
        height: height * 0.2,
        width: width * 0.95,
        borderRadius: 15,
    },
    card: {
        alignItems: "center",


    },

    cateView: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10
    },
    Card: {
        height: height * .28,
        width: width * .46,
        backgroundColor: "white",
        // margin:5,
        borderRadius: 10,
        elevation: 10,
        padding: 10,


    },
    pic: {
        height: height * .12,
        borderRadius: 10,

    },
    title: {
        fontSize: 12,
        fontWeight: "900"
    },
    price: {
        fontWeight: "bold",
        color: "black"
    }
    ,
    des: {
        fontSize: 12,
        alignSelf: "center",
        justifyContent: "center",
        fontStyle: "italic"
    },
    VideoCard: {
        height: height * .2,
        width: width * .46,
        backgroundColor: "white",
        // margin:5,
        borderRadius: 10,
        elevation: 10,
        padding: 5,
        justifyContent: "center"


    },
    AddVideo: {
        height: height * .2,
        width: width * .4,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 10,
        padding: 10,
        margin: 10


    },



})