import { StyleSheet, Button } from 'react-native';
import react, { useState, useRef, useEffect } from 'react';
import { ColorSchemeName, Pressable, Dimensions, FlatList, Image, Touchable } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Easing } from 'react-native';
import { Menu, Divider, Provider } from 'react-native-paper';
import { RootTabScreenProps } from '../types';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack';

import Profile from "./ProfileScreen";
import Gift from "./GiftScreen";
import Colors from '../constants/Colors';
import { FontAwesome, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
const { height, width } = Dimensions.get('window');
import { Video, AVPlaybackStatus, AVPlaybackStatusSuccess, AVPlaybackStatusError } from 'expo-av'

// import PagerView from 'react-native-pager-view';
import PagerView from 'react-native-pager-view';
// import VideosSlide from '../components/VideoPlayer';

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

// const Item = ({ title }: any) => (
//   <View style={{borderBottomColor:"white",borderWidth:1,backgroundColor:"red",flex:1}}>
//     <Image
//         style={styles.item}
//         source={{
//           uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
//         }}
//       />
//       </View>

// );
export default function VideosScreen({ navigation }: RootTabScreenProps<'Videos'>) {

  // console.log(navigation);
  // const Stack = createNativeStackNavigator<any>();
  const Stack = createStackNavigator();

  const [visible, setVisible] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatusSuccess[]>([])

  const videoRef = useRef<any>([]);
  const playPauseIcon = useRef<any>(null)

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    }
  }

  const closeConfig = {
    animation: 'timing',
    config: {
      duration: 200,
      easing: Easing.linear,
    }
  }

  // const renderItem = ({ item }: any) => (
  //   <Item title={item.title} />
  // );

  const videos = [
    {
      "video_id": "1087",
      "video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1614149275testvideo.m3u8",
      "user_id": "146",
      "video_thumbnail": "https://d12z3avrqemmfm.cloudfront.net/video_1614149275thumb.0000001.jpg",
      "video_thumbnail_new": "https://d12z3avrqemmfm.cloudfront.net/video_1614149275thumb.0000001.jpg",
      "video_text": "RWxib3cgaGFuZyB0cmlja3Mh",
      "video_text_without_encoded": "Elbow hang tricks!",
      "is_posted": "0",
      "is_save_to_gallery": "1",
      "created_at": "1614149280",
      "updated_at": "1614149293",
      "status": "A",
      "job_id": "1614149280100-3jebzo",
      "tagged_user": [],
      "aws_video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1614149275testvideo.m3u8",
      "user_image": "https://devsytes.com/assets/uploads/images/a472b0ad1e6095056b8b0d098c7f980d.jpg",
      "user_name": "Sarah Leick",
      "username": "Sarahstylesblog",
      "is_voted": 0,
      "is_following": 1,
      "request_status": "1",
      "primary_key_follow_id": "358",
      "is_reported": 0,
      "setting": "2",
      "views_count": "8",
      "votes_count": "2",
      "video_share_count": "1"
    },
    {
      "video_id": "841",
      "video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1612923095testvideo.m3u8",
      "user_id": "128",
      "video_thumbnail": "https://d12z3avrqemmfm.cloudfront.net/video_1612923095thumb.0000001.jpg",
      "video_thumbnail_new": "https://d12z3avrqemmfm.cloudfront.net/video_1612923095thumb.0000001.jpg",
      "video_text": "I2h1bGFob29waW5nY2hhbGxlbmdl",
      "video_text_without_encoded": "#hulahoopingchallenge",
      "is_posted": "0",
      "is_save_to_gallery": "1",
      "created_at": "1612923104",
      "updated_at": "1612923130",
      "status": "A",
      "job_id": "1612923104031-q7zms8",
      "tagged_user": [],
      "aws_video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1612923095testvideo.m3u8",
      "user_image": "https://devsytes.com/assets/uploads/images/89655f76a999cefc58a405b21616703d.jpg",
      "user_name": "Angel Hoskins",
      "username": "angel_hoopskins",
      "is_voted": 0,
      "is_following": 1,
      "request_status": "1",
      "primary_key_follow_id": "364",
      "is_reported": 0,
      "setting": "2",
      "views_count": "18",
      "votes_count": "8",
      "video_share_count": "0"
    },
    {
      "video_id": "878",
      "video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1613146324testvideo.m3u8",
      "user_id": "127",
      "video_thumbnail": "https://d12z3avrqemmfm.cloudfront.net/video_1613146324thumb.0000001.jpg",
      "video_thumbnail_new": "https://d12z3avrqemmfm.cloudfront.net/video_1613146324thumb.0000001.jpg",
      "video_text": "Q2xvdWQgcHJlc3Mtb25zIPCfpbo=",
      "video_text_without_encoded": "Cloud press-ons ?",
      "is_posted": "0",
      "is_save_to_gallery": "1",
      "created_at": "1613146334",
      "updated_at": "1613354558",
      "status": "A",
      "job_id": "1613146334632-21ft5j",
      "tagged_user": [],
      "aws_video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1613146324testvideo.m3u8",
      "user_image": "https://devsytes.com/assets/uploads/images/9a1e029671ac748ffe65f974d6caeba8.jpg",
      "user_name": "Hilary Droke",
      "username": "Hilarydro",
      "is_voted": 0,
      "is_following": 0,
      "request_status": "0",
      "primary_key_follow_id": "382",
      "is_reported": 0,
      "setting": "2",
      "views_count": "19",
      "votes_count": "0",
      "video_share_count": "0"
    },
    {
      "video_id": "400",
      "video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1608181029testvideo.m3u8",
      "user_id": "100",
      "video_thumbnail": "https://d12z3avrqemmfm.cloudfront.net/video_1608181029thumb.0000001.jpg",
      "video_thumbnail_new": "https://d12z3avrqemmfm.cloudfront.net/video_1608181029thumb.0000001.jpg",
      "video_text": "I0dvZHppbGxhQ2hhbGxlbmdl",
      "video_text_without_encoded": "#GodzillaChallenge",
      "is_posted": "0",
      "is_save_to_gallery": "1",
      "created_at": "1608181034",
      "updated_at": "1613795515",
      "status": "A",
      "job_id": "1608181034050-g1ll88",
      "tagged_user": [],
      "aws_video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1608181029testvideo.m3u8",
      "user_image": "https://devsytes.com/assets/uploads/images/8223c61a676fbe96a02b596625a1fca7.jpg",
      "user_name": "Lilly W",
      "username": "LillyKW",
      "is_voted": 0,
      "is_following": 0,
      "request_status": "0",
      "primary_key_follow_id": "374",
      "is_reported": 0,
      "setting": "1",
      "views_count": "22",
      "votes_count": "3",
      "video_share_count": "6"
    },
    {
      "video_id": "1151",
      "video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1614388985testvideo.m3u8",
      "user_id": "152",
      "video_thumbnail": "https://d12z3avrqemmfm.cloudfront.net/video_1614388985thumb.0000001.jpg",
      "video_thumbnail_new": "https://d12z3avrqemmfm.cloudfront.net/video_1614388985thumb.0000001.jpg",
      "video_text": "TWUgQCBUaGUgQmVhY2g6IEEgQ29tZWR5",
      "video_text_without_encoded": "Me @ The Beach: A Comedy",
      "is_posted": "0",
      "is_save_to_gallery": "1",
      "created_at": "1614388990",
      "updated_at": "1614389011",
      "status": "A",
      "job_id": "1614388989896-5qfaq0",
      "tagged_user": [],
      "aws_video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1614388985testvideo.m3u8",
      "user_image": "https://devsytes.com/assets/uploads/images/ae99c3a451282559bdd0566fe6fcb936.jpg",
      "user_name": "Brittney Bertier",
      "username": "brittneybertier",
      "is_voted": 0,
      "is_following": 1,
      "request_status": "1",
      "primary_key_follow_id": "371",
      "is_reported": 0,
      "setting": "2",
      "views_count": "7",
      "votes_count": "3",
      "video_share_count": "0"
    },
    {
      "video_id": "742",
      "video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1611898675testvideo.m3u8",
      "user_id": "87",
      "video_thumbnail": "https://d12z3avrqemmfm.cloudfront.net/video_1611898675thumb.0000001.jpg",
      "video_thumbnail_new": "https://d12z3avrqemmfm.cloudfront.net/video_1611898675thumb.0000001.jpg",
      "video_text": "Q2hhbGxlbmdlIG1lZGlhLiBJdOKAmXMgbW9yZSB0aGFuIGEgZ2FtZS4gI2NoYWxsZW5nZXNjY2VwdGVkIEBtaWtlZ3JuNzE=",
      "video_text_without_encoded": "Challenge media. It’s more than a game. #challengesccepted @mikegrn71",
      "is_posted": "0",
      "is_save_to_gallery": "1",
      "created_at": "1611898686",
      "updated_at": "1611898737",
      "status": "A",
      "job_id": "1611898685820-dagplo",
      "tagged_user": [
        {
          "user_id": "82",
          "username": "mikegrn71"
        }
      ],
      "aws_video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1611898675testvideo.m3u8",
      "user_image": "https://devsytes.com/assets/uploads/images/6956abeff016a87b47ebbf332ccd37f5.jpg",
      "user_name": "Taylor Wong",
      "username": "twong04",
      "is_voted": 0,
      "is_following": 0,
      "request_status": "0",
      "primary_key_follow_id": "355",
      "is_reported": 0,
      "setting": "2",
      "views_count": "18",
      "votes_count": "3",
      "video_share_count": "0"
    },
    {
      "video_id": "876",
      "video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1613143923testvideo.m3u8",
      "user_id": "128",
      "video_thumbnail": "https://d12z3avrqemmfm.cloudfront.net/video_1613143923thumb.0000001.jpg",
      "video_thumbnail_new": "https://d12z3avrqemmfm.cloudfront.net/video_1613143923thumb.0000001.jpg",
      "video_text": "I2h1bGFob29waW5nY2hhbGxlbmdl",
      "video_text_without_encoded": "#hulahoopingchallenge",
      "is_posted": "0",
      "is_save_to_gallery": "1",
      "created_at": "1613143933",
      "updated_at": "1613268412",
      "status": "A",
      "job_id": "1613143933519-ygtrwa",
      "tagged_user": [],
      "aws_video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1613143923testvideo.m3u8",
      "user_image": "https://devsytes.com/assets/uploads/images/89655f76a999cefc58a405b21616703d.jpg",
      "user_name": "Angel Hoskins",
      "username": "angel_hoopskins",
      "is_voted": 1,
      "is_following": 1,
      "request_status": "1",
      "primary_key_follow_id": "364",
      "is_reported": 0,
      "setting": "2",
      "views_count": "16",
      "votes_count": "3",
      "video_share_count": "0"
    },
    {
      "video_id": "981",
      "video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1613614407testvideo.m3u8",
      "user_id": "142",
      "video_thumbnail": "https://d12z3avrqemmfm.cloudfront.net/video_1613614407thumb.0000001.jpg",
      "video_thumbnail_new": "https://d12z3avrqemmfm.cloudfront.net/video_1613614407thumb.0000001.jpg",
      "video_text": "I2Nvc3BsYXljaGFsbGVuZ2UgI3BpeGFyY2hhbGxlbmdlICNkYWlseWNoYWxsZW5nZSAjbW9uc3RlcnNpbmMg8J+Smg==",
      "video_text_without_encoded": "#cosplaychallenge #pixarchallenge #dailychallenge #monstersinc ?",
      "is_posted": "0",
      "is_save_to_gallery": "1",
      "created_at": "1613614411",
      "updated_at": "1613614476",
      "status": "A",
      "job_id": "1613614411150-8zrqb2",
      "tagged_user": [],
      "aws_video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1613614407testvideo.m3u8",
      "user_image": "https://devsytes.com/assets/uploads/images/4d9c8f1c9cac0f169af5714052ee8864.jpg",
      "user_name": "Trisha Fuerte",
      "username": "fuertetrisha",
      "is_voted": 0,
      "is_following": 0,
      "request_status": "0",
      "primary_key_follow_id": "368",
      "is_reported": 0,
      "setting": "2",
      "views_count": "9",
      "votes_count": "2",
      "video_share_count": "0"
    },
    {
      "video_id": "750",
      "video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1611899829testvideo.m3u8",
      "user_id": "87",
      "video_thumbnail": "https://d12z3avrqemmfm.cloudfront.net/video_1611899829thumb.0000001.jpg",
      "video_thumbnail_new": "https://d12z3avrqemmfm.cloudfront.net/video_1611899829thumb.0000001.jpg",
      "video_text": "SGFwcHkgU3QuIFBhdHJpY2vigJlzIERheSEg8J+NgCNjb29rb2ZmY2hhbGxlbmdl",
      "video_text_without_encoded": "Happy St. Patrick’s Day! ?#cookoffchallenge",
      "is_posted": "0",
      "is_save_to_gallery": "1",
      "created_at": "1611899834",
      "updated_at": "1611899902",
      "status": "A",
      "job_id": "1611899834594-rbje2r",
      "tagged_user": [],
      "aws_video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1611899829testvideo.m3u8",
      "user_image": "https://devsytes.com/assets/uploads/images/6956abeff016a87b47ebbf332ccd37f5.jpg",
      "user_name": "Taylor Wong",
      "username": "twong04",
      "is_voted": 1,
      "is_following": 0,
      "request_status": "0",
      "primary_key_follow_id": "355",
      "is_reported": 1,
      "setting": "2",
      "views_count": "19",
      "votes_count": "5",
      "video_share_count": "0"
    },
    {
      "video_id": "1043",
      "video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1614013972testvideo.m3u8",
      "user_id": "148",
      "video_thumbnail": "https://d12z3avrqemmfm.cloudfront.net/video_1614013972thumb.0000001.jpg",
      "video_thumbnail_new": "https://d12z3avrqemmfm.cloudfront.net/video_1614013972thumb.0000001.jpg",
      "video_text": "bmV3IFByYWRhIHNob2VzISAjZmFzaGlvbiAjc3R5bGU=",
      "video_text_without_encoded": "new Prada shoes! #fashion #style",
      "is_posted": "0",
      "is_save_to_gallery": "1",
      "created_at": "1614013978",
      "updated_at": "1614014024",
      "status": "A",
      "job_id": "1614013978303-vunfpp",
      "tagged_user": [],
      "aws_video_path": "https://d12z3avrqemmfm.cloudfront.net/video_1614013972testvideo.m3u8",
      "user_image": "https://devsytes.com/assets/uploads/images/be343ee62c6673f9b394d5590b9bcfa7.jpg",
      "user_name": "Stassie P",
      "username": "stassie",
      "is_voted": 1,
      "is_following": 1,
      "request_status": "1",
      "primary_key_follow_id": "357",
      "is_reported": 0,
      "setting": "2",
      "views_count": "9",
      "votes_count": "1",
      "video_share_count": "0"
    }
  ]

  const [status, setStatus] = useState<any>([]);

  // console.log("++++++++++++++++ZZZZZZZZZZZ", 5, videoRef.current.length, videos.length, videoRef.current[5].playAsync());
  // console.log("Video")

  const stopAllVideos = () => {
    for (let i = 0; i < videoRef.current.length; i++) {
      if (playbackStatus[i] && playbackStatus[i].isLoaded) {
        videoRef.current[i].stopAsync();
        playbackStatus[i].isPlaying = false;
      }
    }
  }

  useEffect(() => {
    console.log("mounting");
    return () => {
      console.log("Unmounting");
      stopAllVideos()
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <PagerView
        style={styles.viewPager} orientation="vertical" initialPage={0}
        onPageSelected={(e: any) => {
          if (playbackStatus && playbackStatus.length) {
            stopAllVideos()
            if (playbackStatus[e.nativeEvent.position].isPlaying) {
              videoRef.current[e.nativeEvent.position].pauseAsync();
              playbackStatus[e.nativeEvent.position].isPlaying = false;
            } else {
              videoRef.current[e.nativeEvent.position].playAsync();
              playbackStatus[e.nativeEvent.position].isPlaying = true;
            }
          }
        }}
      >
        {
          videos.map((video, index) => {
            return (
              <View
                key={video.video_id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pressable
                  onPress={() => {
                    console.log(playPauseIcon.current)
                    if (playbackStatus[index].isPlaying) {
                      videoRef.current[index].pauseAsync();
                      playbackStatus[index].isPlaying = false;
                      // playPauseIcon.current.props.name = "pause"
                    } else {
                      videoRef.current[index].playAsync();
                      playbackStatus[index].isPlaying = true;
                      // playPauseIcon.current.props.name = "play"
                    }
                  }}
                  style={{
                    width: 200,
                    height: 200,
                    position: "absolute",
                    top: height / 2 - 50,
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <FontAwesome5
                    name="pause"
                    size={38}
                    color={Colors["dark"].text}
                    style={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      padding: 20,
                      borderRadius: 50,
                      textAlign: "center",
                      width: 80,
                      height: 80,
                    }}
                    ref={playPauseIcon}
                  />
                  {/* {
                    playbackStatus[index].isPlaying ? (
                      <FontAwesome5
                        name="pause"
                        size={38}
                        color={Colors["dark"].text}
                        style={{
                          backgroundColor: "rgba(0,0,0,0.5)",
                          padding: 20,
                          borderRadius: 50,
                          textAlign: "center",
                          width: 80,
                          height: 80,
                        }}
                      />
                    ) : (
                      <FontAwesome5
                        name="play"
                        size={38}
                        color={Colors["dark"].text}
                        style={{
                          backgroundColor: "rgba(0,0,0,0.5)",
                          padding: 20,
                          borderRadius: 50,
                          textAlign: "center",
                          width: 80,
                          height: 80,
                        }}
                        ref={playPauseIcon}
                      />
                    )
                  } */}
                </Pressable>


                <Video
                  ref={ele => videoRef.current[index] = ele}
                  useNativeControls={true}
                  isLooping
                  resizeMode='cover'
                  isMuted={false}
                  onPlaybackStatusUpdate={(status: AVPlaybackStatusSuccess | AVPlaybackStatusError) => {
                    if (!status.isLoaded) {
                      console.log("Video is not loaded yet", status.error);
                    } else {
                      playbackStatus[index] = status;
                    }
                  }}
                  posterSource={{
                    uri: `${video.video_thumbnail}`
                  }}
                  source={{
                    uri: `${video.video_path}`
                  }}
                  style={{
                    width,
                    height,
                    backgroundColor: "green",
                    alignSelf: "center",
                  }}
                />
              </View>
            )
          })
        }
      </PagerView>
    </View>

    // <Stack.Navigator
    //   initialRouteName='UserProfile'
    //   screenOptions={{
    //     headerShown: false,
    //     gestureEnabled: true,
    //     gestureDirection: 'horizontal',
    //   }}
    // >
    //   <Stack.Screen
    //     name="UserProfile"
    //     component={Profile}
    //     options={{
    //       title: '',
    //       headerShown: true,
    //       gestureEnabled: true,
    //       transitionSpec: {
    //         open: {
    //           animation: 'spring',
    //           config: {
    //             stiffness: 1000,
    //             damping: 50,
    //             mass: 3,
    //             overshootClamping: false,
    //             restDisplacementThreshold: 0.01,
    //             restSpeedThreshold: 0.01,
    //           }
    //         },
    //         close: {
    //           animation: 'timing',
    //           config: {
    //             duration: 200,
    //             easing: Easing.linear,
    //           }
    //         },
    //       },
    //       cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

    //       // transitionSpec: {
    //       //   open: config,
    //       //   close: config,
    //       // },

    //       headerTitle: () => (
    //         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
    //           <Menu
    //             visible={visible}
    //             onDismiss={closeMenu}
    //             anchor={<Button onPress={openMenu}>Show menu</Button>}>
    //             <Menu.Item onPress={() => { }} title="Item 1" />
    //             <Menu.Item onPress={() => { }} title="Item 2" />
    //             <Divider />
    //             <Menu.Item onPress={() => { }} title="Item 3" />
    //           </Menu>
    //         </View>
    //       ),

    //       headerTitleAlign: 'center',
    //       headerTitleStyle: {
    //         fontSize: 20,
    //         color: Colors["dark"].text,
    //       },
    //       headerStyle: {
    //         backgroundColor: "#1B1A17",
    //       },

    //       headerRight: () => (
    //         <Pressable
    //           onPress={() => console.log("dd")}
    //           style={({ pressed }) => ({
    //             opacity: pressed ? 0.5 : 1,
    //           })}
    //         >
    //           <MaterialCommunityIcons
    //             name="dots-vertical"
    //             size={25}
    //             color={Colors["dark"].text}
    //             style={{ marginRight: 15 }}
    //           />
    //         </Pressable>
    //       ),

    //       headerLeft: () => (
    //         <Pressable
    //           onPress={() => navigation.goBack()}
    //           style={({ pressed }) => ({
    //             opacity: pressed ? 0.5 : 1,
    //           })}
    //         >
    //           <FontAwesome
    //             name="angle-left"
    //             size={25}
    //             color={Colors["dark"].text}
    //           />
    //         </Pressable>
    //       ),

    //     }}
    //   />

    //   <Stack.Screen
    //     name="Gift"
    //     component={Gift}
    //     options={{
    //       title: '',
    //       headerShown: true,

    //       gestureEnabled: true,
    //       transitionSpec: {
    //         open: {
    //           animation: 'spring',
    //           config: {
    //             stiffness: 1000,
    //             damping: 50,
    //             mass: 3,
    //             overshootClamping: false,
    //             restDisplacementThreshold: 0.01,
    //             restSpeedThreshold: 0.01,
    //           }
    //         },
    //         close: {
    //           animation: 'timing',
    //           config: {
    //             duration: 200,
    //             easing: Easing.linear,
    //           }
    //         },
    //       },
    //       cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

    //       headerTitle: () => (
    //         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
    //           <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors["dark"].text }}>Gift</Text>
    //         </View>
    //       ),

    //       headerTitleAlign: 'center',
    //       headerTitleStyle: {
    //         fontSize: 20,
    //         color: Colors["dark"].text,
    //       },
    //       // headerStyle: {
    //       //   backgroundColor: "#1B1A17",
    //       // },

    //     }}
    //   />

    // </Stack.Navigator>
    // <SafeAreaView>

    //   <FlatList
    //       data={DATA}
    //       // style={{ marginRight: 20, elevation: 20 }}
    //       renderItem={renderItem}
    //       keyExtractor={item => item.title}
    //       showsVerticalScrollIndicator={false}
    //       snapToInterval={Dimensions.get('window').width}
    //       snapToAlignment="start"
    //       decelerationRate={"fast"}
    //     />
    //     </SafeAreaView>
    //   <VideosSlide
    //   key={index}
    //   index={index}
    //   // isPlay={item.video_id === "1087"}
    //   isPlay={true}
    //   poster={item.video_thumbnail}
    //   video={item.video_path}
    //   playbackStatus={status[index]}
    //   onPlaybackStatusUpdate={(index, newStatus) => {
    //     setStatus([...status, newStatus])
    //     // console.log("??????????????????????????", JSON.stringify(status, null, 2))
    //   }}
    // />
  );
}
const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
