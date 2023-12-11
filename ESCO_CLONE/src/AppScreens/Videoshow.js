import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import VideoPlayer from "react-native-video-controls";
let { width, height } = Dimensions.get('window');
const Videoshow = ({navigation}) => {
    return (

        <View style={{ height: height * .9, width:width * 15, backgroundColor: "red" }}>
            <VideoPlayer
            tapAnywhereToPause={true}
                source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                style={{ height: "50%",width:width*1 }}
               
            />
        </View>
    )
}
export default Videoshow;