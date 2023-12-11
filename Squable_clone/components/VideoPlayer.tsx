import React from 'react'
import { StyleSheet, View, Image, Dimensions, Text, Button } from 'react-native';
import { Video } from 'expo-av'
const { height, width } = Dimensions.get('window');

interface Props {
    video: string
    poster: string
    isPlay: boolean
    index: number
    onPlaybackStatusUpdate: (index: number, status: any) => void
    playbackStatus: any
}

const VideoPlayer = ({
    video,
    poster,
    isPlay,
    index,
    onPlaybackStatusUpdate,
    playbackStatus
}: Props) => {

    // const videoRef = React.useRef<any>([]);
    // console.log("PlayBackStatus", index, JSON.stringify(playbackStatus, null, 2));

    return isPlay ? (
        <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "red" }}>
            <Text style={{ color: "#000", fontSize: 30 }} >Video Player</Text>
            <Text style={{ color: "#000", fontSize: 18 }} >{video}</Text>
            <Button
                // title={playbackStatus[index].isPlaying ? 'Pause' : 'Play'}
                title={'Play'}
                onPress={() => {
                    console.log("Hhhhhhhhh")
                    // if (playbackStatus[index].isPlaying) {
                    //     videoRef.current[index].pauseAsync();
                    // } else {
                    //     videoRef.current[index].playAsync();
                    // }
                }}
            />
            <Video
                // ref={ele => videoRef.current = ele}
                useNativeControls
                isLooping
                // resizeMode='cover'
                // resizeMode="contain"
                onPlaybackStatusUpdate={(status) => onPlaybackStatusUpdate(index, status)}
                // onPlaybackStatusUpdate={status => {
                //     if (status) {
                //          videoRef.current?.unloadAsync();
                //          videoRef.current?.loadAsync({ uri: `${video}` });
                //     }
                // }}

                posterSource={{
                    uri: `${poster}`
                }}
                source={{
                    uri: `${video}`
                }}
            />
        </View>
    ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
                style={{
                    width: width,
                    height: height,
                }}
                source={{
                    uri: `${poster}`,
                }}
            />
        </View>
    )

}

const styles = StyleSheet.create({
});

export default VideoPlayer
