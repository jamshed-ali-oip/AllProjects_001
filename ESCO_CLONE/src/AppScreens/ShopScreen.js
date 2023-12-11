import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView, Linking } from "react-native";
import Header from "../Common/Header";
import dasgboardDummyData from "../DummyData"
import Slider from "../Common/slider";
import CustomeAlert from "../Common/Alert"
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Rating } from 'react-native-ratings';
import VideoPlayer from "react-native-video-controls"


let { width, height } = Dimensions.get('window');
var Data = [
    {
        id: 1,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTitzIMOwYdVg_eZmb3Ihie7NsQaZmK8ONU13F17d2UgXwr0YQ1juEOYqkCOvhA5k0sRno&usqp=CAU",
        description: "This is the best product of our karachi",
        Price: "8559",
        Color: "Black",
        Brand: "Tandori chai",
        name: "Samsumg galaxy"
    },
    {
        id: 2,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTT0HOmr3Xh1P2Ep-Ck72dimq9663TGSbGyw&usqp=CAU",
        description: "This is the best product of our karachi",
        Price: "5694",
        Color: "Black",
        Brand: "Almira",
        name: "Samsumg galaxy notw 10"
    },
    {
        id: 3,
        url: "https://i.pinimg.com/originals/3a/e8/a9/3ae8a90928f6ea793fda2b560dc2c481.jpg",
        description: "This is the best product of our karachi",
        Price: "8559",
        Color: "Black",
        Brand: "Honda Ybr",
        name: "Samsumg galaxy notw 10"
    },
    {
        id: 4,
        url: "https://4.imimg.com/data4/AA/HC/MY-26596027/men-s-fancy-t-shirt-500x500.jpg",
        description: "This is the best product of our karachi",
        Price: "5694",
        Color: "Black",
        Brand: "man t shirt",
        name: "Samsumg galaxy notw 10"
    },
    {
        id: 5,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9qu7q8RhFyr2mIQ_Go1hynnuro-Txeb3xVw&usqp=CAU",
        description: "This is the best product of our karachi",
        Price: "8559",
        Color: "Black",
        Brand: " Chicken Tikka",
        name: "Samsumg galaxy notw 10"
    },
    {
        id: 6,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP44HJfE6AaHY53NS8USSiFcAvC54M641ocQ&usqp=CAU",
        description: "This is the best product of our karachi",
        Price: "5694",
        Color: "Black",
        Brand: "Mehran",
        name: "Samsumg galaxy notw 10"
    },
    {
        id: 7,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTitzIMOwYdVg_eZmb3Ihie7NsQaZmK8ONU13F17d2UgXwr0YQ1juEOYqkCOvhA5k0sRno&usqp=CAU",
        description: "This is the best product of our karachi",
        Price: "8559",
        Color: "Black",
        Brand: "Tandori chai",
        name: "Samsumg galaxy"
    },
    {
        id: 8,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTT0HOmr3Xh1P2Ep-Ck72dimq9663TGSbGyw&usqp=CAU",
        description: "This is the best product of our karachi",
        Price: "5694",
        Color: "Black",
        Brand: "Almira",
        name: "Samsumg galaxy notw 10"
    },
    {
        id: 9,
        url: "https://i.pinimg.com/originals/3a/e8/a9/3ae8a90928f6ea793fda2b560dc2c481.jpg",
        description: "This is the best product of our karachi",
        Price: "8559",
        Color: "Black",
        Brand: "Honda Ybr",
        name: "Samsumg galaxy notw 10"
    },
    {
        id: 10,
        url: "https://4.imimg.com/data4/AA/HC/MY-26596027/men-s-fancy-t-shirt-500x500.jpg",
        description: "This is the best product of our karachi",
        Price: "5694",
        Color: "Black",
        Brand: "man t shirt",
        name: "Samsumg galaxy notw 10"
    },
    {
        id: 11,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9qu7q8RhFyr2mIQ_Go1hynnuro-Txeb3xVw&usqp=CAU",
        description: "This is the best product of our karachi",
        Price: "8559",
        Color: "Black",
        Brand: " Chicken Tikka",
        name: "Samsumg galaxy notw 10"
    },
    {
        id: 12,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP44HJfE6AaHY53NS8USSiFcAvC54M641ocQ&usqp=CAU",
        description: "This is the best product of our karachi",
        Price: "5694",
        Color: "Black",
        Brand: "Mehran",
        name: "Samsumg galaxy notw 10"
    },
]
var Video = [
    {
        id: 1,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReKD0Lppw9jf5uId8umuaCyrmzQjIRdEmGvg&usqp=CAU",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

    },
    {
        id: 2,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQDlHiyoyPDCjjXIHxEICY_vOSUBC4wcI7Rg&usqp=CAU",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
        id: 3,
        url: "https://www.techsmith.com/blog/wp-content/uploads/2021/02/TSC-thumbnail-example-1024x576.png",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
        id: 4,
        url: "https://i.ytimg.com/vi/r_2tsLb__-E/maxresdefault.jpg",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
        id: 5,
        url: "https://i.ytimg.com/vi/r_2tsLb__-E/maxresdefault.jpg",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
        id: 6,
        url: "https://i.ytimg.com/vi/r_2tsLb__-E/maxresdefault.jpg",
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },

]

const ShopScreen = ({ navigation, route }) => {
    const data = route?.params;
    console.log("dataaaaa", data.data.Brand)
    const phoneCall = () => {
        let number = '';
        if (Platform.OS === 'ios') {
            number = 'telprompt:${03162884887}';
        } else {
            number = 'tel:${03162884887}';
        }
        Linking.openURL(number);
    }

    const phoneSMS = () => {
        let number = '';
        if (Platform.OS === 'ios') {
            number = 'smsprompt:${03162884887}';
        } else {
            number = 'sms:${03162884887}';
        }
        Linking.openURL(number);
    }

    const whatsapp = () => {

        Linking.openURL("https://wa.me/+923162884887");
    }
    const renderItem = ({ item }) => (

        <View
            style={
                {
                    alignContent: "center",
                    justifyContent: "center",
                    margin: 3,

                }}

        >
            <TouchableOpacity
                style={styles.Card}


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
    const rendervideo = ({ item }) => (

        <View
            style={
                {
                    alignContent: "center",
                    justifyContent: "center",
                    margin: 3,

                }}

        >

            <TouchableOpacity onPress={() => { navigation.navigate("videoshow") }} style={styles.video}>
                <Image source={{ uri: item.url }} style={{ resizeMode: "contain", width: "100%", height: "100%" }} />
            </TouchableOpacity>


        </View>



    );
    return (
        <SafeAreaView style={{ flex: 1 }} >

            <View
                style={styles.Header}
            >
                <Text style={styles.name}>
                    {data.data.Brand}
                </Text>

            </View>
            <ScrollView>
                <View style={styles.Shop} >

                    <Image style={styles.shopimage} source={require("../Images/store.jpg")} />
                    <Text>
                        Name: {data.data.name}
                    </Text>
                    <Text>
                        Location :{data.data.location}
                    </Text>
                    <Rating
                        style={styles.starIcon}
                        type='star'


                        ratingCount={5}
                        imageSize={15}
                        onFinishRating={(a) => alert(a)}

                    />

                </View>
                <View style={styles.Product} >
                    <Image style={styles.image} source={{ uri: data.data.url }} />
                    <Text>
                        Name: {data.data.name}
                    </Text>
                    <Text>
                        Location :{data.data.location}
                    </Text>
                    <Rating
                        style={styles.starIcon}
                        type='star'


                        ratingCount={5}
                        imageSize={15}
                        onFinishRating={(a) => alert(a)}

                    />

                </View>
                <Text style={{fontSize:20,fontWeight:"700",paddingLeft:20}}>
                    Related Products
                </Text>

                <View style={
                    {
                        flexDirection: "row",
                        //  flexWrap:"wrap",
                        alignContent: "center",
                        justifyContent: "center",
                        // marginBottom: height * .2

                    }
                }>

                    <FlatList
                        data={Data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        scrollEnabled={true}
                        horizontal


                    />
                </View>
                <Text style={{fontSize:20,fontWeight:"700",paddingLeft:20}}>
                    Videos
                </Text>

                <View style={
                    {
                        flexDirection: "row",
                        alignContent: "center",
                        justifyContent: "center",
                     

                    }
                }>
                    <FlatList
                        data={Video}
                        renderItem={rendervideo}
                        keyExtractor={item => item.id}
                        scrollEnabled={true}
                        horizontal


                    />

                </View>



            </ScrollView>

            <View
                style={{
                    height: height * .08,
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    justifyContent: "space-around"
                }}
            >
                <TouchableOpacity
                    onPress={() => { Linking.openURL('tel:${03162884887}'); }}
                >
                    <Image
                        source={require("../Images/call.png")}
                        style={{ width: 60, height: 60 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { Linking.openURL('sms:${03162884887}'); }}
                >
                    <Image
                        source={require("../Images/message.png")}
                        style={{ width: 60, height: 60 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { Linking.openURL("https://wa.me/03451106418"); }}
                >
                    <Image
                        source={require("../Images/whatsapp.png")}
                        style={{ width: 60, height: 60 }}
                    />
                </TouchableOpacity>


            </View>

        </SafeAreaView>
    )
}

export default ShopScreen;
const styles = StyleSheet.create({


    ImageComponentStyle: {
        marginTop: height * 0.01,
        height: height * 0.15,
        width: width * 0.95,
        borderRadius: 15,
    },
    card: {
        alignItems: "center",


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

    }
    , Card: {
        height: height * .3,
        width: width * .46,
        backgroundColor: "white",
        margin: 5,
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
    Product: {
        height: height * .32,
        width: width * 1,
        backgroundColor: "white",
        alignSelf: "center",
        padding: 5,
        borderRadius: 10,
        elevation: 10,
        marginTop: 5
    },
    image: {
        height: height * .2,
        borderRadius: 5,

    },
    Shop: {
        height: height * .32,
        width: width * 1,
        backgroundColor: "white",
        alignSelf: "center",
        padding: 5,
        borderRadius: 10,
        elevation: 10,
        marginTop: 5
    },
    shopimage: {
        height: height * .2,
        borderRadius: 5,
        alignSelf: "center"

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
    video: {
        height: height * .2,
        width: width * .45,
        // backgroundColor: "red",
        borderRadius: 10,
        alignSelf: "center",
        backgroundColor: "white",
        elevation: 10,
        marginLeft:10
    }

})