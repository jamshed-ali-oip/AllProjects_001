import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import Header from "../Common/Header";
import dasgboardDummyData from "../DummyData"
import Slider from "../Common/slider";
import CustomeAlert from "../Common/Alert"
import { Rating } from 'react-native-ratings';
import VideoPlayer from "react-native-video-controls"
// impo

let { width, height } = Dimensions.get('window');
var Data = [
    {
        id: 5665,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTitzIMOwYdVg_eZmb3Ihie7NsQaZmK8ONU13F17d2UgXwr0YQ1juEOYqkCOvhA5k0sRno&usqp=CAU",
        description: "This is the best product of our karachi",
        Price: "8559",
        Color: "Black",
        Brand: "Tandori chai",
        name: "Samsumg galaxy",
        location: "Ayan gneral astore gulestane jauhar block 13 hno 578 plot 6 karachi"
    },
    {
        id: 56898,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTT0HOmr3Xh1P2Ep-Ck72dimq9663TGSbGyw&usqp=CAU",
        description: "This is the best product of our karachi",
        Price: "5694",
        Color: "Black",
        Brand: "Almira",
        name: "Samsumg galaxy notw 10",
        location: "Ayan gneral astore gulestane jauhar block 13 hno 578 plot 6 karachi"
    },
    {
        id: 3658,
        url: "https://i.pinimg.com/originals/3a/e8/a9/3ae8a90928f6ea793fda2b560dc2c481.jpg",
        description: "This is the best product of our karachi",
        Price: "8559",
        Color: "Black",
        Brand: "Honda Ybr",
        name: "Samsumg galaxy notw 10",
        location: "Ayan gneral astore gulestane jauhar block 13 hno 578 plot 6 karachi"
    },
    {
        id: 45598,
        url: "https://4.imimg.com/data4/AA/HC/MY-26596027/men-s-fancy-t-shirt-500x500.jpg",
        description: "This is the best product of our karachi",
        Price: "5694",
        Color: "Black",
        Brand: "man t shirt",
        name: "Samsumg galaxy notw 10",
        location: "Ayan gneral astore gulestane jauhar block 13 hno 578 plot 6 karachi"
    },
    {
        id: 55665,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9qu7q8RhFyr2mIQ_Go1hynnuro-Txeb3xVw&usqp=CAU",
        description: "This is the best product of our karachi",
        Price: "8559",
        Color: "Black",
        Brand: " Chicken Tikka",
        name: "Samsumg galaxy notw 10",
        location: "Ayan gneral astore gulestane jauhar block 13 hno 578 plot 6 karachi"
    },
    {
        id: 63565,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP44HJfE6AaHY53NS8USSiFcAvC54M641ocQ&usqp=CAU",
        description: "This is the best product of our karachi",
        Price: "5694",
        Color: "Black",
        Brand: "Mehran",
        name: "Samsumg galaxy notw 10",
        location: "Ayan gneral astore gulestane jauhar block 13 hno 578 plot 6 karachi"
    },
]
var Trending = [
    {
        id: 5665,
        url: require("../Images/product/BooksSports.png"),
        description: "Books and Sports",

    },
    {
        id: 56898,
        url: require("../Images/product/ElectronicHomeAppliances.png"),
        description: "ELectronic home apliace",
    },
    {
        id: 3658,
        url: require("../Images/product/BooksSports.png"),
        description: "Books and Sports",
    },
    {
        id: 45598,
        url: require("../Images/product/Cosmetics.png"),
        description: "cosmetic",

    },
    {
        id: 55665,
        url: require("../Images/product/BooksSports.png"),
        description: "Books and Sports",
    },
    {
        id: 63565,
        url: require("../Images/product/BooksSports.png"),
        description: "Books and Sports ",
    },
]
const Dashboard = ({ navigation }) => {
    // console.log("dataa///////////", categories)
    const renderItem = ({ item }) => (

        <View
            style={
                {
                    // backgroundColor:"red",
                    alignContent: "center",
                    justifyContent: "center",
                    margin: 5,
                    padding: 3
                }}

        >
            <TouchableOpacity
                style={styles.Card}
                onPress={() => { navigation.navigate("ShopScreen", { data: item }) }}

            >
                <Image style={styles.pic} source={{ uri: item.url }} />
                <Text
                    style={styles.title}
                > {item.name}</Text>
                <Text
                    style={styles.price}
                >  Price: Rs {item.Price}</Text>
                <Text
                    style={styles.title}
                > Shop: {item.Brand}</Text>
                <Rating
                    style={styles.starIcon}
                    type='star'


                    ratingCount={5}
                    imageSize={15}
                    onFinishRating={(a) => alert(a)}

                />
                <Text>{item.description}...</Text>
            </TouchableOpacity>
        </View>



    );
    const renderTrending = ({ item }) => (

        <View
            style={
                {
                    // backgroundColor:"red",
                    alignContent: "center",
                    justifyContent: "center",
                    marginVertical: 5,
                    padding: 3,
                    borderRadius: 40

                }}

        >
            <TouchableOpacity
                style={{ height: height * .05, borderRadius: 30, backgroundColor: "white", elevation: 10, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}
                onPress={() => {
                    alert("trending")
                }}

            >
                <Image style={{ height: 30, width: 30 }}
                    source={item.url}
                />
                <Text style={{ fontSize: 12, fontWeight: "600", color: "black", paddingRight: 10 }}>{item.description}</Text>

            </TouchableOpacity>
        </View>



    );
    return (

        <SafeAreaView style={styles.container}>
            <Header />
            <View>
                <Slider
                    dotStyle={styles.dotStyle}
                    autoplay={true}
                    url1={"https://scontent.fkhi11-1.fna.fbcdn.net/v/t39.30808-6/276129383_115427587755658_6140336697687327514_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeGSYTCpHFOsEzpahb8yRPPc00dkpOMXL9nTR2Sk4xcv2fvzFpyCkLNf7E-UMhClxO-ZhQyX7kGc2u2vumA9IDVT&_nc_ohc=3I9Y6jojiBQAX9WI7XQ&_nc_zt=23&_nc_ht=scontent.fkhi11-1.fna&oh=00_AT-yx6IvyL9CR26vA7QcDnG3aFj7uttKOjuvDZu7JOi2EQ&oe=6239DD31"}
                    url2={"https://scontent.fkhi11-1.fna.fbcdn.net/v/t39.30808-6/276046711_115422761089474_8376776597209481245_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeGYapz3iLtQB5cGNSYsSGRML90FSFZZ_fkv3QVIVln9-TmGOftt-XtwUGds2OP7OjdcIwXznrw7QW0ShQp_qNq0&_nc_ohc=FLToRJmqc28AX9-MtOg&tn=hREd35N36lFW8WNN&_nc_zt=23&_nc_ht=scontent.fkhi11-1.fna&oh=00_AT88xO1lG6zvbMM0U3PBpxulkIu5Hflu9knT6hVAYW6t4Q&oe=6239A3DD"}
                    url3={"https://source.unsplash.com/1024x768/?girl"}
                    url4={"https://source.unsplash.com/1024x768/?tree"}
                    ImageComponentStyle={styles.ImageComponentStyle}
                />
            </View>

            <ScrollView>
                <View style={styles.cateView}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("FoodCat") }}
                        style={styles.card1}
                    >
                        <Image
                            style={styles.Categories}
                            source={require('../Images/food.png')}
                        />
                        {/* <Text>
                        Food
                    </Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.card2}
                        onPress={() => { navigation.navigate("ProductCat") }}


                    >
                        <Image
                            style={styles.Categories}
                            source={require('../Images/product.png')}
                        />
                        {/* <Text>
                        Product
                    </Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("ServicesCat") }}
                        style={styles.card3}
                    >
                        <Image
                            style={styles.Categories}
                            source={require('../Images/services.png')}
                        />
                        {/* <Text>
                        Services
                    </Text> */}
                    </TouchableOpacity>
                    <View>

                    </View>
                </View>
                <Text style={{ fontSize: 18, color: "black", paddingLeft: 15, fontWeight: "600" }}>Trending Categories</Text>
                <FlatList
                    data={Trending}
                    renderItem={renderTrending}
                    keyExtractor={item => item.id}
                    horizontal
                />


                <FlatList
                    data={Data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    scrollEnabled={true}
                    sc


                />


                <View style={{
                    marginBottom: height * .35
                }}>

                </View>


            </ScrollView>
            <View style={{
                height: height * .08,
                marginTop: height * .92,
                backgroundColor: "white",
                width: width * 1,
                position: "absolute",
                borderTopWidth: 1,
                borderTopColor: "darkgrey",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                alignContent: "center"
            }}>
                <TouchableOpacity onPress={()=>{navigation.navigate("dashboard")}} style={{alignItems:"center"}}>
                    <Image style={{ height: 30, width: 30,tintColor:"red" }} source={require("../Images/home.png")} />
                    <Text style={{color:"red"}}>
                        Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate("details")}} style={{alignItems:"center"}}>
                    <Image style={{ height: 30, width: 30,tintColor:"darkgrey" }} source={require("../Images/notification.png")} />
                    <Text>
                        Notification
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:"center" }} onPress={()=>{navigation.navigate("profile")}}>
                    <Image style={{ height: 35, width: 35,tintColor:"darkgrey" }} source={require("../Images/setting.png")} />
                    <Text>
                       setting
                    </Text>
                </TouchableOpacity>
            
            </View>
        </SafeAreaView>
    );
};
export default Dashboard;
const styles = StyleSheet.create({


    ImageComponentStyle: {
        marginTop: height * 0.01,
        height: height * 0.2,
        width: width * 0.95,
        borderRadius: 15,
        resizeMode: "contain"
    },
    card1: {
        alignItems: "center",
        backgroundColor: "#f25822",
        borderRadius: 15,
        elevation: 10

    },
    card2: {
        alignItems: "center",
        backgroundColor: "#4f7dc2",
        borderRadius: 15,
        elevation: 10


    },
    card3: {
        alignItems: "center",
        backgroundColor: "#fdbd13",
        borderRadius: 15,
        elevation: 10


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
        height: height * .29,
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
    starIcon: {
        color: 'gold',
        // borderWidth: 1
        // justifyContent:"flex-start"
        alignSelf: "flex-start",
        padding: .5

    },

    rating: {
        // marginTop: height * 0.01,
    },

})