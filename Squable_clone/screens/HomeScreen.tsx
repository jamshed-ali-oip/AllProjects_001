import { StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native';
import { useEffect } from 'react'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getBaners } from '../store/Slice/baners.slice';

const { height, width } = Dimensions.get('window');
import { SliderBox } from "react-native-image-slider-box";
import { getBanersAction } from '../store/Actions/baner.action';
import { getGeneralVideosAction, getTrendingVideosAction, getFollowingVideosAction } from "../store/Actions/videos.action"
import VideosSlide from '../components/Home/VideosSlide';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1fsdfb1-46c2-aed5-3ad53abb28ba',
    title: 'fourth Item',
  },
  {
    id: '3ac68afc-c605-4sadfas8d3-a4f8-fbd91aa97f63',
    title: 'fifth Item',
  },
  {
    id: '58694a0f-3da1-4asdsa71f-bd96-145571e29d72',
    title: 'sixth Item',
  },
];
const DATA2 = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1fsdfb1-46c2-aed5-3ad53abb28ba',
    title: 'Fourth Item',
  },
  {
    id: '3ac68afc-c605-4sadfas8d3-a4f8-fbd91aa97f63',
    title: 'fifth Item',
  },
  {
    id: '58694a0f-3da1-4asdsa71f-bd96-145571e29d72',
    title: 'sixth Item',
  },
];


const Item = ({ title }: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Item2 = ({ title }: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function TabOneScreen({ navigation }: RootTabScreenProps<'Home'>) {

  const state = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBanersAction());
    dispatch(getGeneralVideosAction())
    dispatch(getTrendingVideosAction())
    dispatch(getFollowingVideosAction())
  }, [dispatch])


  
  // console.log("+++++++REDUX++++++++++", JSON.stringify(state, null, 2))
  // const fff = state.baner.entities.map((item: any) => item.banner_image_path)
  // console.log("++++++++++++++++", JSON.stringify(fff, null, 2))


  const renderItem = ({ item }: any) => (
    <Item title={item.title} />
  );
  const renderItem2 = ({ item }: any) => (
    <Item title={item.title} />
  );

  return (
    <ScrollView>
      <View style={styles.container} >

        {/* Image Slider */}
        <SliderBox
          style={{ height: height * .4 }}
          dotColor="transparent"
          inactiveDotColor="transparent"
          images={state.baner.entities.map((item: any) => item.banner_image_path)}
        />

        <VideosSlide title='General Videos' videos={state.videos.general.entities} />
        <VideosSlide title='Trending Videos' videos={state.videos.trending.entities} />
        <VideosSlide title='Following Videos' videos={state.videos.following.entities} />

        {/* <Text style={styles.text}>
          Trending Videos
        </Text>
        <FlatList
          data={state.videos.general.entities}
          style={{ marginRight: 20, elevation: 20 }}
          renderItem={renderItem}
          keyExtractor={item => item.video_id}
          horizontal
        />

        <Text style={styles.text}>
          General Videos
        </Text>
        <FlatList
          data={state.videos.trending.entities}
          style={{ marginRight: 20, elevation: 20 }}
          renderItem={renderItem2}
          keyExtractor={item => item.video_id}
          horizontal
        /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0c0c",

  },
  item: {
    // backgroundColor: 'red',
    height: height * .28,
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
  }
});
