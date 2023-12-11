import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import Slider from "../Common/slider";


let { width, height } = Dimensions.get('window');
var data = [
    {
        id: 0,
        Icon: require("../Images/services/catering&cooker.png"),
        name: "Catering & cooker"
    }
    , {
        id: 1,
        Icon: require("../Images/services/education.png"),
        name: "Education"

    }
    , {
        id: 2,
        Icon: require("../Images/services/engineer.png"),
        name: "Engineer"
    }
    , {
        id: 3,
        Icon: require("../Images/services/eventmanagement.png"),
        name: "Event Managment"
    }
    , {
        id: 4,
        Icon: require("../Images/services/Hardware.png"),
        name: "Hardware"
    }
    , {
        id: 6,
        Icon: require("../Images/services/health.png"),
        name: "Health"
    }
    , {
        id: 7,
        Icon: require("../Images/services/homemaintenance.png"),
        name: "Home Maintanance"
    }
    , {
        id: 8,
        Icon: require("../Images/services/informationtechnology.png"),
        name: "Information and Technology"
    }
    , {
        id: 9,
        Icon: require("../Images/services/interiordecorator.png"),
        name: "Interior Decorator"
    }
    , {
        id: 10,
        Icon: require("../Images/services/labour.png"),
        name: "Labour"
    }
    , {
        id: 11,
        Icon: require("../Images/services/legaladvisor.png"),
        name: "Legal Advisor"
    }
    , {
        id: 12,
        Icon: require("../Images/services/mainiconArt.png"),
        name: "Art"
    }
    , {
        id: 13,
        Icon: require("../Images/services/mainiconbeauty.png"),
        name: "Beuty"
    }
    , {
        id: 14,
        Icon: require("../Images/services/mainiconbutcher.png"),
        name: "Butcher"
    }
    , {
        id: 15,
        Icon: require("../Images/services/Mechanic.png"),
        name: "Mechanic"
    }
    , {
        id: 16,
        Icon: require("../Images/services/pick&drop.png"),
        name: "Pick and Drop"
    }
    , {
        id: 17,
        Icon: require("../Images/services/realestate.png"),
        name: "Real State"
    }
    , {
        id: 18,
        Icon: require("../Images/services/rentacar.png"),
        name: "Rent a Vehicle"
    }
    , {
        id: 19,
        Icon: require("../Images/services/sporttrainers.png"),
        name: "Sports and Trainer"
    }
    , {
        id: 20,
        Icon: require("../Images/services/stiching.png"),
        name: "Stiching"
    }
    , {
        id: 21,
        Icon: require("../Images/services/traveltourism.png"),
        name: "Travel & Tourism"
    }
    , {
        id: 22,
        Icon: require("../Images/services/washing&cleaning.png"),
        name: "Washing and Cleaning"
    }
    , {
        id: 23,
        Icon: require("../Images/services/Washing.png"),
        name: "Washing"
    }
    , 
]

const ServicesCat = ({ navigation }) => {
    const renderItem = ({ item }) => (

        <View
            style={
                {
                    // backgroundColor:"red",
                    alignContent: "center",
                    justifyContent: "center",
                    margin: 5,
                    padding: 3,
                }}

        >
            <TouchableOpacity
                style={styles.Card}

            >
                <Image style={styles.pic}
                    source={item.Icon}
                />
                <Text
                    style={styles.title}
                > {item.name}</Text>
                {/* <Text
                    style={styles.price}
                >  Price: Rs {item.Price}</Text>
                 <Text
                    style={styles.title}
                > Shop: {item.Brand}</Text>
                <Text>{item.description}...</Text> */}
            </TouchableOpacity>
        </View>



    );
    return (
        <SafeAreaView>
                 <View style={{
                    height: height * .08,
                    backgroundColor: "#ed1a23",
                    justifyContent: "center"

                }}>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 25,
                            fontWeight: "bold",
                            fontStyle: "italic",
                            alignSelf: "center",

                        }}
                    >
                        SERVICES
                    </Text>

                </View>
                <View>
                    <Slider
                        dotStyle={styles.dotStyle}
                        autoplay={true}
                        url1={"https://source.unsplash.com/1024x768/?nature"}
                        url2={"https://source.unsplash.com/1024x768/?water"}
                        url3={"https://source.unsplash.com/1024x768/?girl"}
                        url4={"https://source.unsplash.com/1024x768/?tree"}
                        ImageComponentStyle={styles.ImageComponentStyle}
                    />
                </View>
            <ScrollView>
           
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    scrollEnabled={true}
                    style={{marginBottom:height*.25}}



                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ServicesCat;
const styles = StyleSheet.create({


    ImageComponentStyle: {
        marginTop: height * 0.01,
        height: height * 0.2,
        width: width * 0.95,
        borderRadius: 15,
    },
    card: {
        alignItems: "center",


    },
    Categories: {
        width: width * 0.25,
        height: height * .125,
        alignSelf: "center",

    },
    cateView: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10
    },
    Card: {
        height: height * .2,
        width: width * .46,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 10,
        alignItems: "center"
    },
    pic: {
        height: height * .15,
        width: width * .4


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
    }
})