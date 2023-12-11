import React from 'react'
import { FlatList, StyleSheet, Dimensions,Image } from 'react-native'
import { View, Text, } from '../Themed'
const { height, width } = Dimensions.get('window');
import { Video } from '../../store/Slice/videos.slice';

const Item = ({ video }: any) => (
    // console.log(video.video_thumbnail),
    
    <View style={styles.item}>
          <Image
        style={styles.scroll}
        source={{
          uri: `${video.video_thumbnail}`
        }}
      />
    </View>
);

const renderItem = ({ item }: any) => (
    <Item video={item} />
);

const VideosSlide = ({ videos, title }: { videos: Video[], title: string }) => {
    return (
        <View>
            {
                videos.length > 0 ? (
                    <>
                        <Text style={styles.text}>{title}</Text>
                        <FlatList
                            data={videos}
                            style={{ marginRight: 20, elevation: 20 }}
                            renderItem={renderItem}
                            keyExtractor={item => item.video_id}
                            horizontal
                        />
                    </>
                ) : null
            }
        </View>
    )
}

export default VideosSlide;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0d0c0c",

    },
    item: {
        // backgroundColor: 'red',
        height: height * .30,
        width: width * .28,
        padding: 5,
        margin: 5,
        borderRadius: 10
    },
    title: {
        fontSize: 15,
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        paddingLeft: 5
    },
    scroll:{
        // backgroundColor: 'red',
        height: height * .28,
        width: width * .28,
        padding: 5,
        margin: 5,
        borderRadius: 10
    }
});
