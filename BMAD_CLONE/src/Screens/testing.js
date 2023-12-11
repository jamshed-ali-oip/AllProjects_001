import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image  } from "react-native";
import Pic from '../Assets/Images/post2.png';
import { color } from 'react-native-elements/dist/helpers';
const Data = [
    {title: 'name'},
    {title: 'name'},
    {title: 'name'},
    {title: 'name'},
    {title: 'name'},
    {title: 'name'},
]

// https://gorest.co.in/public/v2/users
const SampleTesting =() => {
    const [data, setData] = useState([])
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const result = await axios.get('https://gorest.co.in/public/v2/users')
        if(result.status === 200){
            setData(result.data)
        }
    }
    const renderItemDet = (text) =>{
        console.log(text.item, 'texßt')
        return(
            <View style={styles.container}>
                <View style={styles.imagecontainer}>
                    <Image source={Pic} resizeMode={'cover'} style={styles.imagesStyle} />
                </View>
                <View>

                <View style={styles.deatilSection}>
                    <Text style={styles.LabelText}>
                        Email:
                    </Text>
                    <Text style={styles.LabelText} numberOfLines={1}>
                       {" "} {text.item.email}
                    </Text>
                </View>
                    <View style={styles.deatilSection}>
                    <Text style={styles.LabelText}>
                        Gender:
                    </Text>
                        <Text style={styles.LabelText}>
                        {" "}
                        {text.item.gender}
                        </Text>
                    </View>
                    <View style={styles.deatilSection}>
                    <Text style={styles.LabelText}>
                        Id:
                    </Text>
                        <Text style={styles.LabelText}>
                        {" "}
                        {text.item.id}
                        </Text>
                    </View>
                    <View style={styles.deatilSection}>
                    <Text style={styles.LabelText}>
                        name:
                    </Text>
                        <Text style={styles.LabelText}>
                        {" "}
                        {text.item.name}
                        </Text>
                    </View>
                    <View style={styles.deatilSection}>
                    <Text style={styles.LabelText}>
                        Status:
                    </Text>
                        <Text style={styles.LabelTextstatus(text.item.status)}>
                        {" "}
                        {text.item.status}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    return(
        <View style={{flex: 1}}>
            <FlatList 
                data={data}
                renderItem={(text) => renderItemDet(text)}
            />
        </View>
    )
}
export default SampleTesting;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10
    },
    imagesStyle: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    imagecontainer: {
        marginRight: 10
    },
    deatilSection: {
        flexDirection: "row"
    },
    LabelText: {
        fontSize: 12,
        fontWeight: "bold"
    },
    LabelTextstatus: (co) => ({
        color: co === 'active' ? 'green': 'red'
    })
})