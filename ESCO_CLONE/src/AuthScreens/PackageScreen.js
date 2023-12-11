import React, { useState,useEffect } from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView, Linking } from "react-native";
import Header from "../Common/Header";
import dasgboardDummyData from "../DummyData"
import Slider from "../Common/slider";
import CustomeAlert from "../Common/Alert"
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Rating } from 'react-native-ratings';

import * as Animatable from 'react-native-animatable';

let { width, height } = Dimensions.get('window');
var Data = [
    {
        id: 1,
        images: 100,
        video: 28,
        feature: 18,
        simple: 32,
        featurevalidity: 3,
        packageExpiry: 365,
        name: "Premium Pro",
        imageslink: require("../Images/packages/premiumpro.png"),
        price: 4999

    },
    {
        id: 2,
        images: 20,
        video: 0,
        feature: 0,
        simple: 2,
        featurevalidity: 0,
        packageExpiry: 20,
        name: "Basic",
        imageslink: require("../Images/packages/basic.png"),
        price: 49

    },
    {
        id: 3,
        images: 15,
        video: 0,
        feature: 0,
        simple: 1,
        featurevalidity: 0,
        packageExpiry: 15,
        name: "Free ",
        imageslink: require("../Images/packages/free.png"),
        price: 0

    },
    {
        id: 4,
        images: 25,
        video: 1,
        feature: 0,
        simple: 3,
        featurevalidity: 0,
        packageExpiry: 30,
        name: "Starter",
        imageslink: require("../Images/packages/starter.png"),
        price: 149

    },
    {
        id: 5,
        images: 40,
        video: 7,
        feature: 3,
        simple: 8,
        featurevalidity: 3,
        packageExpiry: 45,
        name: "Advance",
        imageslink: require("../Images/packages/advance.png"),
        price: 499

    },
    {
        id: 6,
        images: 30,
        video: 4,
        feature: 1,
        simple: 5,
        featurevalidity: 3,
        packageExpiry: 40,
        name: "standard",
        imageslink: require("../Images/packages/standard.png"),
        price: 299

    },
    {
        id: 7,
        images: 50,
        video: 12,
        feature: 5,
        simple: 14,
        featurevalidity: 3,
        packageExpiry: 60,
        name: "Bronze",
        imageslink: require("../Images/packages/bronze.png"),
        price: 999

    },
    {
        id: 8,
        images: 70,
        video: 22,
        feature: 10,
        simple: 25,
        featurevalidity: 3,
        packageExpiry: 90,
        name: "Gold",
        imageslink: require("../Images/packages/gold.png"),
        price: 1999

    },
    {
        id: 9,
        images: 60,
        video: 18,
        feature: 8,
        simple: 20,
        featurevalidity: 3,
        packageExpiry: 75,
        name: "Silver",
        imageslink: require("../Images/packages/silver.png"),
        price: 1499

    },
    {
        id: 10,
        images: 80,
        video: 25,
        feature: 14,
        simple: 28,
        featurevalidity: 3,
        packageExpiry: 180,
        name: "Premium",
        imageslink: require("../Images/packages/premium.png"),
        price: 2999

    },


]
const PackageScreen = ({ navigation, route }) => {
    const [state, setState] = useState("")
    const [fade, setfade] = useState("")
    useEffect(() => {
        setState("zoomInDown"),
            setfade("fadeInUpBig")
    }, []);

    // const renderItem = ({ item }) => (


    //     <View style={{ margin: 5 }}>
    //         <TouchableOpacity    >
    //         <Image style={{ height: height * .65, width: width * .7 }} source={item.imageslink} />

    //     </TouchableOpacity>

    //    </View>



    // );
    const renderItem = ({ item }) => (


        <View style={{ margin: 5 }}>
            <View style={styles.card} >
                <Text style={styles.Name}>
                   {item.name}
                </Text>
                <View style={{flexDirection:"row",}}>


                <View style={styles.item}>
                        <Image style={styles.icon} source={require("../Images/photo.png")} />
                        <Text style={{fontWeight:"600",color:"black"}}>{item.images}</Text>
                        <Text style={{fontWeight:"600",color:"black"}} >Images</Text>
                    </View>
                    <View style={styles.item}>
                        <Image style={styles.icon} source={require("../Images/video.png")} />
                        <Text style={{fontWeight:"600",color:"black"}}> {item.video}</Text>
                        <Text style={{fontWeight:"600",color:"black"}} >Video</Text>
                    </View>
                    <View style={styles.item}>
                        <Image style={styles.icon} source={require("../Images/rocket.png")} />
                        <Text style={{fontWeight:"600",color:"black"}}> {item.simple}</Text>
                        <Text style={{fontWeight:"600",color:"black"}}>Boost</Text>
                    </View>
                    <View style={styles.item}>
                        <Image style={styles.icon} source={require("../Images/addd.png")} />
                        <Text style={{fontWeight:"600",color:"black"}}> {item.feature}</Text>
                        <Text style={{fontWeight:"600",color:"black"}}>Featured</Text>
                    </View>
                   


                </View>
                <View style={styles.line}>

                </View>
                <View style={{flexDirection:"row",marginTop:10,paddingLeft:10}}>
                    <View>
                        <Text style={styles.price}>
                            Rs {item.price}
                        </Text>
                        <Text >
                            Validity {item. packageExpiry} days
                        </Text>
                        <Text>
                            Feature add validity {item.featurevalidity} days
                        </Text>
                    </View>
                    <TouchableOpacity 
                    onPress={()=>{navigation.navigate("PaymentScreen")}}
                    style={styles.btn}>
                        <Text style={styles.btntext}>
                            Select
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>



    );
    
   
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Image
                style={styles.tinyLogo}
                source={require('../Images/bg.jpg')}
            />
            {/* <Text
                style={{
                    fontSize: 25,
                    textAlign: "center",
                    color: "black",
                    fontWeight: "350",


                }}
            >
                Select Your Desired Package
            </Text> */}

            <Animatable.View
            animation={state}
            style={{ margin: 5,paddingBottom:height*.3 }}>
                <FlatList
                    data={Data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    scrollEnabled={true}
                   

                />
            </Animatable.View>

        </SafeAreaView>
    )
}

export default PackageScreen;
const styles = StyleSheet.create({


    tinyLogo: {
        width: width * .97,
        height: height * .29,
        alignSelf: "center",
        // marginTop: height * .02,
        borderRadius:5
    },
    card: {
        height: height * .28,
        width: width * .94,
        elevation: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,


    },
    icon: {
        height: 25,
        width: 25,
        tintColor:"red"
    },
    item:{
        alignContent: "center",
        justifyContent: "center",
        marginLeft:13,
        alignItems:"center"
    },
    Name:{
        fontSize:18,
        fontWeight:"500",
        marginBottom:10,
        paddingLeft:10
    },
    line:{
        borderBottomColor:"grey",
        borderBottomWidth:0.5,
        marginTop:10
    },
    btn:{
        backgroundColor:"black",
        width:width*.35,
        borderRadius:30,
        height:height*.05,
        alignItems:"center",
        justifyContent: 'center',
        alignSelf:"center",
        marginLeft:15
    },
    price:{
        fontSize:17,
        fontWeight:"700"
    },
    btntext:{
        color:"white",
        fontSize:16,
        fontWeight:"900"
    }






})