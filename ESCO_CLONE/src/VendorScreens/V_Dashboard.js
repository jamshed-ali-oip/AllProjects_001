import React, { useState } from "react"
import { Text, View, Dimensions, StyleSheet, FlatList, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView, BackHandler, Modal, Pressable, TextInput } from "react-native";
// import Ratings from '../Common/Rating';
import { Rating, AirbnbRating } from 'react-native-ratings';

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
var data = [
    {
        id: 5665,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhrf1gRLfwV1yp1G4mZybifY7zeI_5aiRV7iwqW5PnOd0VHEjn70xADoPAc1V-T88wR2w&usqp=CAU",

    },
    {
        id: 56898,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhrf1gRLfwV1yp1G4mZybifY7zeI_5aiRV7iwqW5PnOd0VHEjn70xADoPAc1V-T88wR2w&usqp=CAU",


    },
    {
        id: 3658,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhrf1gRLfwV1yp1G4mZybifY7zeI_5aiRV7iwqW5PnOd0VHEjn70xADoPAc1V-T88wR2w&usqp=CAU",


    },
    {
        id: 45598,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhrf1gRLfwV1yp1G4mZybifY7zeI_5aiRV7iwqW5PnOd0VHEjn70xADoPAc1V-T88wR2w&usqp=CAU",


    },
    {
        id: 55665,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhrf1gRLfwV1yp1G4mZybifY7zeI_5aiRV7iwqW5PnOd0VHEjn70xADoPAc1V-T88wR2w&usqp=CAU",

    },
    {
        id: 63565,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhrf1gRLfwV1yp1G4mZybifY7zeI_5aiRV7iwqW5PnOd0VHEjn70xADoPAc1V-T88wR2w&usqp=CAU",


    },
]

const V_Dashboard = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = React.useState("");
    const [number, onChangeNumber] = React.useState("");
    const [Price, onChangePrice] = React.useState("");
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
                onPress={() => { navigation.navigate("V_ProductDetail", { data: item }) }}


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
    const renderIt = ({ item }) => (

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
                style={styles.VideoCard}

            >
                <Image style={{
                    height: height * .18,
                    borderRadius: 10
                }} source={{ uri: item.url }} />

            </TouchableOpacity>
        </View>



    );
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
                    style={{
                        backgroundColor: "white",
                        // height:height*.25,
                        width: width * 1,
                        alignSelf: "center",
                        elevation: 10,
                        padding: 10
                    }}
                >
                    <Image
                        style={{ height: height * .2, width: width * .92, backgroundColor: "#dcdcdc", borderRadius: 15, padding: 10, alignSelf: "center" }}
                        source={require('../Images/store.jpg')}
                    />
                    <View style={{
                        justifyContent: "flex-start"
                    }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",

                            }}
                        >
                            Ayan General Store
                        </Text>

                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "bold",

                            }}
                        >
                            Product Vendor
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                // fontStyle:'italic'

                            }}
                        >
                            I am located at Gulestan e jauhar block 12 near the Bin Hashim Shopping Centre
                        </Text>

                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", padding: 5 }}
                    >
                        <TouchableOpacity
                            style={{ alignItems: "center" }}
                        >
                            <Image
                                style={{
                                    height: 40, width: 40, tintColor: "red"
                                }}
                                source={require('../Images/boost.png')}
                            />
                            <Text>
                                Boost
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: "center" }}
                        >
                            <Image
                                style={{
                                    height: 40, width: 40, tintColor: "red"
                                }}
                                source={require('../Images/featured.png')}
                            />
                            <Text>
                                Featured
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("V_Edit") }}
                            style={{ alignItems: "center" }}
                        >
                            <Image
                                style={{
                                    height: 40, width: 40, tintColor: "red"
                                }}
                                source={require('../Images/edit.png')}
                            />
                            <Text>
                                Edit
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        paddingLeft: 15
                    }}
                >
                    Videos

                </Text>
                <ScrollView horizontal={true} endFillColor="red" onScrollAnimationEnd={true} color="red"  >
                    <View
                        style={{ flexDirection: "row" }}
                    >
                        <TouchableOpacity
                            style={styles.AddVideo}
                            onPress={() => alert("add video")}
                        >
                            <View style={styles.centeredView}>

                                <View
                                    style={{ alignItems: "center" }}

                                >
                                    <Text
                                        style={{ fontSize: 20, alignContent: "center", textAlign: "center", fontWeight: "bold", color: "#dcdcdc" }}
                                    >
                                        ADD VIDEO
                                    </Text>
                                    <Image
                                        style={{
                                            height: 100, width: 100, tintColor: "#dcdcdc"
                                        }}
                                        source={require('../Images/videoadd.png')}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <FlatList
                            data={data}
                            renderItem={renderIt}
                            keyExtractor={item => item.id}

                            scrollEnabled={true}
                            horizontal={true}


                        />
                    </View>
                </ScrollView>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        paddingLeft: 15
                    }}
                >
                    Product

                </Text>
                <ScrollView horizontal={true}>
                    <View
                        style={{ flexDirection: "row" }}
                    >
                        <TouchableOpacity
                            style={styles.Addcard}
                            onPress={() => setModalVisible(true)}
                        >
                            <View style={styles.centeredView}>

                                <View
                                    style={{ alignItems: "center" }}

                                >
                                    <Text
                                        style={{ fontSize: 20, alignContent: "center", textAlign: "center", fontWeight: "bold", color: "#dcdcdc", }}
                                    >
                                        ADD PRODUCT
                                    </Text>
                                    <Image
                                        style={{ height: 70, width: 70 }}
                                        source={require('../Images/addicon.png')}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <FlatList
                            data={Data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}

                            scrollEnabled={true}
                            horizontal={true}


                        />
                    </View>
                </ScrollView>

            </ScrollView>

        </SafeAreaView>
    )

}
export default V_Dashboard;
const styles = StyleSheet.create({

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