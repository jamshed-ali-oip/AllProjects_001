import React, { useEffect, useState } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView,BackHandler } from "react-native";
import Header from "../Common/Header";
import dasgboardDummyData from "../DummyData"
import Slider from "../Common/slider";
import CustomeAlert from "../Common/Alert"
import ScrollViewCommands from "react-native/Libraries/Components/ScrollView/ScrollViewCommands";
import * as Animatable from 'react-native-animatable';
import { Rating } from 'react-native-ratings';

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
const Home = ({ navigation }) => {


    const [state, setState] = useState("")
    const [fade, setfade] = useState("")
    
    // useEffect(() => {
    //    dta()
    //     // // setState("fadeInUpBig"),
    //     // //     setfade("fadeInUpBig")
    // }, []);
    // const dta =()=>{
    //     BackHandler.addEventListener("hardwareBackPress", DisableBackButton);
    
    //     return () =>
    //       BackHandler.removeEventListener("hardwareBackPress", DisableBackButton);
    // }
    // const DisableBackButton=()=>{
    //     Alert.alert("Hold on!", "Are you sure you want to go back?", [
    //         {
    //           text: "Cancel",
    //           onPress: () => null,
    //           style: "cancel"
    //         },
    //         { text: "YES", onPress: () => BackHandler.exitApp() }
    //       ]);
    //       return true;
       
    // }
    // useEffect(() => {
    //     BackHandler.addEventListener("hardwareBackPress", backAction);
    
    //     return () =>
    //       BackHandler.removeEventListener("hardwareBackPress", backAction);
    //   }, []);
    
     
    // const backAction = () => {
    //     Alert.alert("Hold on!", "Are you sure you want to go back?", [
    //       {
    //         text: "Cancel",
    //         onPress: () => null,
    //         style: "cancel"
    //       },
    //       { text: "YES", onPress: () => BackHandler.exitApp() }
    //     ]);
    //     return true;
    //   };

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
                onPress={() => {
                    Alert.alert(

                        "Sign In",
                        "Please SignIn or Sigup before performing any action",
                        [
                            {
                                text: "Login or signup",
                                onPress: () => (navigation.navigate("SplitScreen")),
                                style: "cancel"
                            },
                            { text: "Not Now", onPress: () => console.log("") }
                        ]
                    )
                }}

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
                    marginVertical:5,
                    padding: 3,
                    borderRadius:40

                }}

        >
            <TouchableOpacity
                style={{height:height*.05,borderRadius:30,backgroundColor:"white",elevation:10,flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}
                onPress={() => {
                    Alert.alert(

                        "Sign In",
                        "Please SignIn or Sigup before performing any action",
                        [
                            {
                                text: "Login or signup",
                                onPress: () => (navigation.navigate("SplitScreen")),
                                style: "cancel"
                            },
                            { text: "Not Now", onPress: () => console.log("") }
                        ]
                    )
                }}

            >
                <Image style={{height:30,width:30}}
                    source={item.url}
                />
                <Text style={{fontSize:12,fontWeight:"600",color:"black",paddingRight:10}}>{item.description}</Text>
                
            </TouchableOpacity>
        </View>



    );
    return (

        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView>
                <View>
                    <Slider
                        dotStyle={styles.dotStyle}
                        autoplay={true}
                        url1={"https://scontent.fkhi11-1.fna.fbcdn.net/v/t39.30808-6/277529993_119652113999872_8466125097108633532_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeH9zKW-9fhIcMuErruNx3D797wijcuMqJj3vCKNy4yomIAFY-LQE3OYQQlwDV3uaP8nzfgnAJkvzMA3pP0q6-MD&_nc_ohc=2kTqjvsl7YYAX8cvihM&_nc_zt=23&_nc_ht=scontent.fkhi11-1.fna&oh=00_AT8w5D-4l3OAr_2A4SGeVZLC3b9zBZ1Gy4rsoG3bX2prgw&oe=624AE23D"}
                        url2={"https://scontent.fkhi11-1.fna.fbcdn.net/v/t39.30808-6/277581011_119648197333597_6176088970192493112_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeHlAcyn8qsGItsynvccu_z61WaKkbsFkTrVZoqRuwWROsmDtg5V8vQ5IJHS8WkqG-Wyz_SFvb4XT6X7Az6bOD3S&_nc_ohc=l3kLW618l_cAX8rhGy4&_nc_zt=23&_nc_ht=scontent.fkhi11-1.fna&oh=00_AT-wa1DalRkRmqD-sTlbNc9YdEvYudVnEmdBDvOT2W3Ezw&oe=624B0A03"}
                        url3={"https://scontent.fkhi6-1.fna.fbcdn.net/v/t39.30808-6/277564878_119923833972700_73975831344505595_n.jpg?stp=dst-jpg_s960x960&_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeHzKiz8dvP8GvinMx4ciGZXqVcBF0okejmpVwEXSiR6OfwjOrCYPdkzExy5F3nAr5K6xkWM3V3TWUNd3cge04qo&_nc_ohc=UsPge9mSDigAX8c0xOI&_nc_zt=23&_nc_ht=scontent.fkhi6-1.fna&oh=00_AT_JLzxcLOwztZaQEIWLMmUfvsQigrt3FIkTtfQkzjRiBQ&oe=624AFC77"}
                        url4={"https://scontent.fkhi6-2.fna.fbcdn.net/v/t39.30808-6/277735862_119973033967780_3712286793470373146_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeHy67I5Z7wNT8kfPsLBGd6cl_egtljiXsqX96C2WOJeyq7L6FlQIx9kYz1U-SHvyqHvHHUgX5ZotZQYZtZAswlM&_nc_ohc=3Bt9b1lWjqkAX9LQsld&_nc_zt=23&_nc_ht=scontent.fkhi6-2.fna&oh=00_AT8IWFWccgflJtBqw9vxBK6X84ndQN3vbiTqjTEINwG5qA&oe=624BC226"}
                        ImageComponentStyle={styles.ImageComponentStyle}
                    />
                </View>


                <Animatable.View
                    animation={fade}

                    style={styles.cateView}>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(

                                "Sign In",
                                "Please SignIn or Sigup before performing any action",
                                [
                                    {
                                        text: "Login or signup",
                                        onPress: () => (navigation.navigate("SplitScreen")),
                                        style: "cancel"
                                    },
                                    { text: "Not Now", onPress: () => console.log("") }
                                ]
                            )
                        }}
                        style={styles.card1}
                    >
                        <Image
                            style={styles.Categories}
                            source={require('../Images/food.png')}
                        />

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.card2}
                        onPress={() => {
                            Alert.alert(
                                "Sign In",
                                "Please SignIn or Sigup before performing any action",
                                [
                                    {
                                        text: "Login or signup",
                                        onPress: () => (navigation.navigate("SplitScreen")),
                                        style: "cancel"
                                    },
                                    { text: "Not Now", onPress: () => console.log("") }
                                ]
                            )
                        }}

                    >
                        <Image
                            style={styles.Categories}
                            source={require('../Images/product.png')}
                        />

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                "Sign In",
                                "Please SignIn or Sigup before performing any action",
                                [
                                    {
                                        text: "Login or signup",
                                        onPress: () => (navigation.navigate("SplitScreen")),
                                        style: "cancel"
                                    },
                                    { text: "Not Now", onPress: () => console.log("") }
                                ]
                            )
                        }}
                        style={styles.card3}
                    >
                        <Image
                            style={styles.Categories}
                            source={require('../Images/services.png')}
                        />

                    </TouchableOpacity>
                    <View>

                    </View>
                </Animatable.View>
                <View>

                </View>
                <Text style={{fontSize:18,color:"black",paddingLeft:15,fontWeight:"600"}}>Trending Categories</Text>
                <FlatList
                        data={Trending}
                        renderItem={renderTrending}
                        keyExtractor={item => item.id}
                        horizontal
                    />

                <View style={
                    {
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignContent: "center",
                        justifyContent: "center",
                        marginBottom: height * .1
                    }
                }>
                   
                    <FlatList
                        data={Data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        scrollEnabled={true}



                    />



                </View>

            </ScrollView>
            <View style={{
                height: 50,
                width: 100,
                backgroundColor: "red"
            }}>

            </View>

        </SafeAreaView>
    );
};
export default Home;
const styles = StyleSheet.create({


    ImageComponentStyle: {
        marginTop: height * 0.01,
        height: height * 0.2,
        width: width * 0.95,
        borderRadius: 15,
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
        width: width * 0.3,
        height: height * .16,
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