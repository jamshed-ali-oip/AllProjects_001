import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  PermissionsAndroid,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Dimensions,
  UIManager,
  Animated,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import ImagePicker from 'react-native-image-crop-picker';
import { showMessage, hideMessage } from 'react-native-flash-message';
import ImagePickerMultiple from 'react-native-image-crop-picker';
import AppText from '../../Components/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import TagInput from 'react-native-tags-input';
import * as actions from '../../Store/Actions';
import { encode, decode } from 'base-64';
import { connect } from 'react-redux';
import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { colors } from '../../src/screens/drawer/constant';

const { width, height } = Dimensions.get('window');

const NewPostScreen = ({
  navigation,
  userReducer,
  getFeedData,
  getNotifications,
  postAction,
}) => {
  const isIOS = Platform.OS === 'ios';

  useEffect(() => {
    CheckPermission();
  }, []);

  const CheckPermission = () => {
    if (Platform.OS == 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(response => {
        // console.log(response)
      });
    }
  };

  const [filePath, setFilePath] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [caption, onChangeCaption] = useState('');
  const [step, setStep] = useState(1);
  const [tags, onChangeArrays] = useState({
    tag: '',
    tagsArray: [],
  });
  const [photos, setPhotos] = useState([]);
  const [CamPic, setCamPic] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  // const handlePress = (item) => {
  //   // Check if the item is already in the selectedItems array
  //   if (!images?.some((images) => images === item)) {
  //     // If it's not in the array, add it to the selectedItems
  //     setImages([...images, item]);
  //   } else {
  //     // If it's already in the array, remove it from selectedItems
  //     const updatedSelectedItems = images.filter(
  //       (images) => images !== item
  //     );
  //     setImages(updatedSelectedItems);
  //   }
  // };
  console.log("arraysss", filePath)
  const handlePress = (item) => {
    // Check if the item is already in the selectedItems array
    if (!selectedItems.some((selectedItem) => selectedItem === item)) {
      // If it's not in the array, add it to the selectedItems
      setSelectedItems([...selectedItems, item]);
    } else {
      // If it's already in the array, remove it from selectedItems
      const updatedSelectedItems = selectedItems.filter(
        (selectedItem) => selectedItem !== item
      );
      setSelectedItems(updatedSelectedItems);
    }
  };
  const openPicket = (item) => {

    ImagePicker.openCropper({
      path: `${item?.path}`,
      width: 300,
      height: 400
    }).then(image => {
      setFilePath((arr) => {
        const modifiedImage = {
          uri: item?.uri,
          path: image.path,
          type: image?.mime
        }
        const e = structuredClone(arr);
        const index = e.findIndex((i) => {
          return i.path === item.path

        })
        if (index !== -1) {
          e[index] = modifiedImage
        }
        return e
      })
      console.log("kshdlkahsk", image);
      // setImage(image?.path)
    });
  }
  console.log("7777777777777777777777777", selectedItems)
  console.log("Cam pic", CamPic)
  const SelectCamera = () => {
    // setModalVisible(!modalVisible)
    ImagePickerMultiple.openCamera({
      multiple: true,
      width: 300,
      height: 400,
      selectionLimit: 3,
      mediaType: 'photo',
      cropping: true,
      includeBase64: true,
    })

      .then(response => {
        console.log("nshdfkjlhkjh", response);
        var ImageArray = [];
        let showImage = {
          uri: 'data:image/jpeg;base64,' + response?.data,
          path: response?.path,
          type: response?.mime,
        };
        ImageArray.push(showImage);
        // }
        setFilePath(ImageArray);
        setStep(2),
          setCamPic(response)

      })
      .catch(err => {
        console.log(err);
      });
  };
  // const SelectMultipleImage = () => {
  //   ImagePickerMultiple.openPicker({
  //     multiple: true,
  //     width: 300,
  //     height: 400,
  //     selectionLimit: 3,
  //     mediaType: 'photo',
  //     // cropping: true,
  //     includeBase64: true,
  //   })

  //     .then(response => {
  //       console.log("jjkgkjgkjg", response);
  //       var ImageArray = [];
  //       for (var i = 0; i < response.length; i++) {
  //         // console.log(response[i].size, 'SIZE');
  //         let showImage = {
  //           uri: 'data:image/jpeg;base64,' + response[i].data,
  //           path: response[i].path,
  //           type: response[i].mime,
  //         };
  //         ImageArray.push(showImage);
  //       }
  //       setFilePath(ImageArray);

  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };


  // console.log("base64", base64Encoded);
  const setposting = () => {
    var ImageArray = [];
    for (var i = 0; i < selectedItems.length; i++) {
      const jsonString = JSON?.stringify(selectedItems[i])
      // const base64Encoded = btoa(jsonString);
      const base64Encoded = encode(jsonString);
      let showImage = {
        uri: 'data:image/jpeg;base64,' + base64Encoded,
        path: selectedItems[i]?.node?.image?.uri,
        type: selectedItems[i]?.node?.type,
      };
      ImageArray.push(showImage);
    }

    setFilePath(ImageArray);
    setStep(2)
  }
  console.log("filePath", filePath)
  // console.log("photos", images)
  const updateTagState = tag => {
    onChangeArrays(tag);
  };

  const newPost = async () => {
    if (caption.length > 0) {
      if (caption && filePath) {
        setLoading(true);
        await postAction(
          // tags,
          caption,
          filePath,
          userReducer?.data?.user_id,
          navigation,
          clearAllStates,
          _onPostFailed,
        );
      } else {
        showMessage({
          message: 'Please select the image',
          // description: '',
          danger: 'error',
        });
      }
    } else {
      showMessage({
        message: 'Description require',
        // description: '',
        danger: 'error',
      });
    }
    // getNotifications(7)
  };

  const clearAllStates = () => {
    setLoading(false);
    getFeedData(userReducer?.data?.user_id);
    setFilePath(null);
    onChangeCaption('');
    onChangeArrays({
      tag: '',
      tagsArray: [],
    });
    setStep(1)
    navigation.navigate('HOME');
    setSelectedItems([])
  };

  const _onPostFailed = () => {
    setLoading(false);
  };
  useEffect(() => {
    getAllPhotos();
  }, []);
  const getAllPhotos = () => {
    CameraRoll.getPhotos({
      first: 1000,
      assetType: 'Photos',
    })
      .then(r => {
        // this.setState({ photos: r.edges });
        console.log(r.edges);
        setPhotos(r?.edges);
        setImages(r?.edges[0])
      })
      .catch(err => {
        console.log(err);
        //Error Loading Images
      });
  };
  return (
    <>
      {step == 1 ?
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <TouchableOpacity
            onPress={() => { setposting() }}
            style={{
              position: "absolute",
              zIndex: 100,
              height: height * 0.05,
              backgroundColor: "rgba(247, 247, 247, 0.76)",
              width: width * 0.2,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
              marginTop: height * 0.01,
              alignSelf: 'flex-end',
            }}
          >
            <Text
              style={{
                color: colors.themeblue,
                fontFamily: "Poppins-Bold"
              }}
            >Next</Text>
          </TouchableOpacity>
          <View style={{ height: height * 0.35, backgroundColor: '#e8e6e6', justifyContent: "center" }}>
            {selectedItems[0]?.node?.image?.uri ? <Image
              style={{ height: height * 0.35, width: width * 1, resizeMode: "cover" }}
              source={{ uri: selectedItems[0]?.node?.image?.uri }}
            /> : <Text style={{ color: "grey", alignSelf: "center", textAlign: "center", fontFamily: "Poppins-Bold" }}> Select Image</Text>}
          </View>
          <View
            style={{
              height: height * 0.057,
              backgroundColor: colors.themeblue,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: width * 0.034
            }}>
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                color: "white",
                fontSize: width * 0.045
              }}
            >Gallery Photos</Text>
            <TouchableOpacity
              onPress={() => { SelectCamera() }}
              style={{
                // alignSelf:"flex-end",
                // marginRight:width*0.06,
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.21)",
                padding: 4,
                borderRadius: 100,
                width: width * 0.1,
                height: height * 0.05,
                justifyContent: "center",
                // marginTop:height*0.0045
              }}>
              <Image
                style={{
                  height: height * 0.03,
                  width: width * 0.05,
                  resizeMode: 'contain',
                  tintColor: "white",

                }}
                source={require('../../Assets/Images/camera.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              marginBottom: height * 0.32,

            }}
          >
            <FlatList
              data={photos}
              numColumns={3}
              style={{ alignSelf: "center", marginBottom: height * 0.22 }}
              renderItem={({ item, index }) => {
                console.log('itemmmm', item);
                return (
                  <TouchableOpacity
                    // onLongPress={() => { handlePress(item) }}
                    onPress={() => { handlePress(item) }}
                    style={{
                      backgroundColor: colors.themeblue,
                      height: height * 0.17,
                      width: width * 0.3,
                      margin: 5,
                      flexWrap: "wrap",
                      alignSelf: "center",

                    }}>
                    <Image
                      style={{
                        height: height * 0.17,
                        width: width * 0.3,
                        opacity: selectedItems.some((i, inx) => i.node?.image?.uri === item?.node?.image?.uri) ? 0.3 : 1,
                        resizeMode: "cover"

                      }}
                      source={{ uri: item?.node?.image?.uri }}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View> :
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <TouchableOpacity
            onPress={() => { newPost() }}
            style={{
              position: "absolute",
              zIndex: 100,
              height: height * 0.05,
              backgroundColor: "rgba(247, 247, 247, 0.76)",
              width: width * 0.2,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
              marginTop: height * 0.01,
              alignSelf: 'flex-end',
            }}
          >
            <Text
              style={{
                color: colors.themeblue,
                fontFamily: "Poppins-Bold"
              }}
            >Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { setStep(1) }}
            style={{
              position: "absolute",
              zIndex: 100,
              height: height * 0.05,
              backgroundColor: "rgba(247, 247, 247, 0.76)",
              width: width * 0.2,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
              marginTop: height * 0.01,
              alignSelf: 'flex-start',
            }}
          >
            <Text
              style={{
                color: colors.themeblue,
                fontFamily: "Poppins-Bold"
              }}
            >Back</Text>
          </TouchableOpacity>
          <View style={{ height: height * 0.4, backgroundColor: '#b01125', justifyContent: "center" }}>
            <FlatList
              data={filePath}
              style={{ alignSelf: "center" }}
              horizontal
              renderItem={({ item, index }) => (
                <>
                  <Image
                    style={{ height: height * 0.3, width: filePath.length !== 1 ? width * 0.8 : width * 1, borderRadius: 10, marginHorizontal: filePath.length !== 1 ? 5 : 0 }}
                    source={{ uri: item?.path }}
                  />
                  <TouchableOpacity
                    onPress={() => { openPicket(item) }}
                    style={{
                      position: "absolute",
                      zIndex: 100,
                      height: height * 0.045,
                      backgroundColor: "rgba(247, 247, 247, 0.76)",
                      width: width * 0.2,
                      borderRadius: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: height * 0.23,
                      alignSelf: 'flex-start',
                      marginLeft: width * 0.03,
                      flexDirection: "row"
                    }}
                  >
                    <Image
                      style={{
                        // height
                        resizeMode: "contain",
                        height: 100,
                        width: 20,
                        tintColor: "#b01125"
                      }}
                      source={require("../../Assets/Images/crop.png")} />
                    <Text
                      style={{
                        color: colors.themeblue,
                        fontFamily: "Poppins-Bold"
                      }}
                    >Crop</Text>
                  </TouchableOpacity>
                </>

              )}
            />

          </View>
          <View style={styles.postDescribeContainer}>
            <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
              <View
                style={{
                  padding: 20,
                }}>
                <AppText
                  nol={2}
                  textAlign="left"
                  family="Poppins-SemiBold"
                  size={responsiveScreenFontSize(1.8)}
                  color="white"
                  Label={'Write a short description about your post:'}
                />
                <TextInput
                  placeholder="Your text here..."
                  value={caption}
                  placeholderTextColor="white"
                  keyboardType="default"
                  onChange={event => onChangeCaption(event.nativeEvent.text)}
                  onSubmitEditing={event => onChangeCaption(event.nativeEvent.text)}
                  multiline={true}
                  maxLength={250}
                  numberOfLines={4}
                  textAlignVertical="top"
                  style={styles.textFieldStyle}
                />

                {/* {!loading ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 50,
                }}>
                <TouchableOpacity
                  onPress={newPost}
                  style={styles.touchableOpacity}>
                  <AppText
                    nol={1}
                    textAlign="left"
                    family="Poppins-SemiBold"
                    size={hp('2%')}
                    color="black"
                    Label={'Post'}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <LottieView
                style={{
                  position: 'absolute',
                  top: isIOS ? height*0.035 : height * 0.05,
                  left: isIOS ? width*0.1 : width * 0.15,
                  // backgroundColor:'white',
                  width: width * 0.4,
                  height: height * 0.3,
                }}
                source={require('../../Assets/Lottie/white-loader.json')}
                autoPlay
                loop
              />
            )} */}
                {/* <View style={{ height: 100 }}></View> */}
              </View>
            </ScrollView>
          </View>
        </View>
      }
    </>
  );
};

function mapStateToProps({ userReducer }) {
  return { userReducer };
}

export default connect(mapStateToProps, actions)(NewPostScreen);

var styles = StyleSheet.create({
  postDescribeContainer: {
    backgroundColor: '#B01125',
    borderTopRightRadius: 20,
    width: '100%',
    height: height * 0.61,
    bottom: 0,
    marginTop: -60
    // marginTop: 15
    // position: 'absolute',
  }, textFieldStyle: {
    width: width * 0.9,
    backgroundColor: '#D19F9F',
    borderRadius: 6,
    top: 10,
    padding: width * 0.02,
    color: 'white',
    height: responsiveHeight(20),
    fontSize: width * 0.04,
  },
});
