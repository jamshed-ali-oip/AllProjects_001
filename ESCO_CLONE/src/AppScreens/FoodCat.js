import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import Slider from "../Common/slider";


let { width, height } = Dimensions.get('window');
var data = [
    {
        id: 0,
        Icon: require("../Images/food/BakeryItems.png"),
        name: "Bakery Items",
        Shop:"Disco Backery",
        Address:"shop no 512 main road Gulshan e iqbal karachi",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWq04P-CaQC3hb1aLp25w1dcUgx-zapOp3qg&usqp=CAU",
        description:"our shop is located in gulshan e iqbal from last 50 yaars fhasfhkshf fsfjksa"

    }
    , {
        id: 1,
        Icon: require("../Images/food/ChineseFood.png"),
        name: "Chinese Food",
        Shop:"Disco Backery",
        Address:"shop no 512 main road Gulshan e iqbal karachi",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWq04P-CaQC3hb1aLp25w1dcUgx-zapOp3qg&usqp=CAU",
        description:"our shop is located in gulshan e iqbal from last 50 yaars fhasfhkshf fsfjksa"

    }
    , {
        id: 2,
        Icon: require("../Images/food/DesiFood.png"),
        name: "Desi Food",
        Shop:"Disco Backery",
        Address:"shop no 512 main road Gulshan e iqbal karachi",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWq04P-CaQC3hb1aLp25w1dcUgx-zapOp3qg&usqp=CAU",
        description:"our shop is located in gulshan e iqbal from last 50 yaars fhasfhkshf fsfjksa"
    }
    , {
        id: 3,
        Icon: require("../Images/food/DessertIcon.png"),
        name: "Dessert",
        Shop:"Disco Backery",
        Address:"shop no 512 main road Gulshan e iqbal karachi",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWq04P-CaQC3hb1aLp25w1dcUgx-zapOp3qg&usqp=CAU",
        description:"our shop is located in gulshan e iqbal from last 50 yaars fhasfhkshf fsfjksa"
    }
    , {
        id: 4,
        Icon: require("../Images/food/FastFood.png"),
        name: "Fast Food",
        Shop:"Disco Backery",
        Address:"shop no 512 main road Gulshan e iqbal karachi",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWq04P-CaQC3hb1aLp25w1dcUgx-zapOp3qg&usqp=CAU",
        description:"our shop is located in gulshan e iqbal from last 50 yaars fhasfhkshf fsfjksa"
    }
    , {
        id: 7,
        Icon: require("../Images/food/JuicesandBeverages.png"),
        name: "Juicesand Beverages",
        Shop:"Disco Backery",
        Address:"shop no 512 main road Gulshan e iqbal karachi",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWq04P-CaQC3hb1aLp25w1dcUgx-zapOp3qg&usqp=CAU",
        description:"our shop is located in gulshan e iqbal from last 50 yaars fhasfhkshf fsfjksa"
    }
    , {
        id: 8,
        Icon: require("../Images/food/Salad.png"),
        name: "Salad",
        Shop:"Disco Backery",
        Address:"shop no 512 main road Gulshan e iqbal karachi",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWq04P-CaQC3hb1aLp25w1dcUgx-zapOp3qg&usqp=CAU",
        description:"our shop is located in gulshan e iqbal from last 50 yaars fhasfhkshf fsfjksa"
    }
    , {
        id: 9,
        Icon: require("../Images/food/Seafood.png"),
        name: "Sea food",
        Shop:"Disco Backery",
        Address:"shop no 512 main road Gulshan e iqbal karachi",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWq04P-CaQC3hb1aLp25w1dcUgx-zapOp3qg&usqp=CAU",
        description:"our shop is located in gulshan e iqbal from last 50 yaars fhasfhkshf fsfjksa"
    }

]

const FoodCat = ({ navigation }) => {
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
                onPress={()=>{navigation.navigate("FoodScreen",{data:item})}}

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
                        FOODS
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

export default FoodCat;
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