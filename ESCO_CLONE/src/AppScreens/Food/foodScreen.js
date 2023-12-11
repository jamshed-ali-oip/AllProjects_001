import React from "react";
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import Slider from "../../Common/slider";
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

const FoodScreen =({navigation,route})=>{
    const data = route?.params;
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
                <Text>{item.description}...</Text>
            </TouchableOpacity>
        </View>



    );
    console.log(".///////////////////////",data.data)
    return(
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
                       {data.data.name}
                    </Text>

                </View>
       <ScrollView>

      
               <View style={{alignItems:"center",margin:5}}>
               <FlatList
                    data={Data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    scrollEnabled={true}
                    sc


                />
               </View>
       </ScrollView>
   </SafeAreaView>
)
}

export default FoodScreen;

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
        height: height * .32,
        width: width * .45,
        backgroundColor: "white",
        // margin: .5,
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
        height: height * .3,
        width: width * 1,
        backgroundColor: "white",
        alignSelf: "center",
        padding: 5
    },
    image: {
        height: height * .2,
        borderRadius: 5,

    }
})