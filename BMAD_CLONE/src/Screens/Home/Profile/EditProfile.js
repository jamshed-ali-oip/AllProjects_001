import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,Dimensions,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient'
import AppText from '../../../Components/AppText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import backImage from './../../../Assets/Images/backimage1.png'
import { Avatar } from "react-native-elements";
import ImagePicker from "react-native-image-picker"
import ImagePickerMultiple from 'react-native-image-crop-picker';
import InAppTextFeild from './../../../Components/InAppTextFeild'
import IconImage from './../../../Components/Icons'
import InAppUnderline from './../../../Components/InAppUnderline'
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto  from 'react-native-vector-icons/Fontisto';
 const EditProfile = () => {
  useEffect(()=>{
        // console.log(navigation)
  },[])
    const [fullname, onChangeFullname] = React.useState("");
    const [bio, onChangeBio] = React.useState("");
    const [country, onChangeCountry] = React.useState("");
    const [gender, onChangeGender] = React.useState("");
    const [genderInterest, onChangeGenderInterest] = React.useState("");
    // const [interest, onChangeInterest] = React.useState("");
    // const [favourite, onChangeFavourite] = React.useState("");

    const [filePath, setFilePath] = useState(null);
    const [caption, onChangeCaption] = useState('');
    const [coverImage, setCoverImage] = useState(require('./../../../Assets/Images/backimage1.png'))
    const [dpImage, setDpImage] = useState(require('./../../../Assets/Images/dp.png'))

    const [tags, onChangeArrays] = useState(
      {
        tag: '',
        tagsArray: []
      }
    )
    const launchCamera = () => {
      var options = {
        title: 'Select Image',
        allowsEditing: true,
        quality: 0.9,
        maxWidth: 1200,
        maxHeight: 1200,
        mediaType: "photo",
        customButtons: [{
          name: 'customOptionKey',
          title: 'Choose Multiple Photos'
        }, ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        var ArraySingleImage = []
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = {
            uri: 'data:image/jpeg;base64,' + response.data
          };
          console.log(source)
          setCoverImage(source)
          ArraySingleImage.push(source)
          setFilePath(ArraySingleImage);
        }
      });
    };

     return(
       <ScrollView>
         <View style={styles.container}>
              <StatusBar translucent backgroundColor="transparent" />
              <View style={{ backgroundColor: 'black'}}>
              {/* <TouchableOpacity   onPress={launchCamera} > */}
                <View style={{}}>
                    <Image style={{ backgroundColor:'black', width: '100%', height: 200}} source={coverImage}    />
                    <TouchableOpacity style={{alignSelf:'flex-end', position:'absolute' }} onPress={launchCamera}>
                    <View style={{width: 40, height: 40, backgroundColor: '#B01125', borderRadius: 50, marginRight: 20, marginTop: 20, padding: 10, elevation: 10, zIndex: 10}}>
                                                        <Feather
                                                              name="edit-3"
                                                              color='white'
                                                              size={20}
                                                              style={{}}
                                                          />
                      
                      </View>
                      </TouchableOpacity>
                  </View>
              </View>
              <View style={{
                width: '92%',
                flexDirection:'column',
                elevation: 16,
                zIndex: 999,
                backgroundColor: 'white',
                borderRadius: 12,
                alignSelf:'center',
                flex: 2,
                marginTop: 10,
                padding: 10
              }}>
              <View style={{alignContent:'center', alignSelf:'center', }}>
                <Avatar
                  size="xlarge"
                  avatarStyle={{ borderColor: '#B01125', borderWidth: 2, borderRadius: 100}}
                  onPress={()=> console.log("Sd")}
                  rounded
                  icon={{name: 'user', type: 'font-awesome',}}
                  source={dpImage}
                />
              </View>
              <View style={{padding: 10}}>
                <View style={styles.textField}>
                          <FontAwesome
                                  name="user"
                                  color='#B01125'
                                  size={20}
                                  style={{top:6, right:5}}
                          />
                          <InAppTextFeild
                              placeholder="Full Name"
                              value={fullname}
                              onchange={onChangeFullname}
                              keyboardType='default'
                              secureTextEntry={true}
                              multi={false}
                          />
                </View>
                <InAppUnderline />
              </View>

              
              <View style={{padding: 10}}>
                <View style={styles.textField}>
                         
                        <MaterialIcons
                              name="title"
                              color='#B01125'
                              size={20}
                              style={{top:6, right:5}}
                        />
                              <InAppTextFeild
                                placeholder="Title"
                                value={bio}
                                onchange={onChangeBio}
                                keyboardType='default'
                                secureTextEntry={true}
                                multi={true}
                              />
                </View>
                <InAppUnderline />
              </View>

              <View style={{padding: 10}}>
                <View style={styles.textField}>
                          <Fontisto
                                  name="world"
                                  color='#B01125'
                                  size={20}
                                  style={{top:6, right:5}}
                          />
                          <InAppTextFeild
                              placeholder="Country"
                              value={country}
                              onchange={onChangeCountry}
                              keyboardType='default'
                              secureTextEntry={true}
                              multi={false}
                          />
                </View>
                <InAppUnderline />
              </View>
  
              <View style={{padding: 10}}>
                <View style={styles.textField}>
                       <Ionicons
                              name="ios-information-circle"
                              color='#B01125'
                              size={20}
                              style={{top:6, right:5}}
                        />
                          <InAppTextFeild
                              placeholder="Bio"
                              value={bio}
                              onchange={onChangeBio}
                              keyboardType='default'
                              secureTextEntry={true}
                              multi={true}
                          />
                </View>
                <InAppUnderline />
              </View>


              <View style={{padding: 10}}>
                <View style={styles.textField}>
                        <Ionicons
                              name="home"
                              color='#B01125'
                              size={20}
                              style={{top:6, right:5}}
                        />
                          <InAppTextFeild
                              placeholder="Lives"
                              value={bio}
                              onchange={onChangeBio}
                              keyboardType='default'
                              secureTextEntry={true}
                              multi={true}
                          />
                </View>
                <InAppUnderline />
              </View>


              <View style={{padding: 10}}>
                <View style={styles.textField}>
                         
                        <Ionicons
                              name="ios-heart-sharp"
                              color='#B01125'
                              size={20}
                              style={{top:6, right:5}}
                        />
                              <InAppTextFeild
                                placeholder="Relation"
                                value={bio}
                                onchange={onChangeBio}
                                keyboardType='default'
                                secureTextEntry={true}
                                multi={true}
                              />
                </View>
                <InAppUnderline />
              </View>

              <View style={{justifyContent:'center', alignItems:'center', marginTop: 20,}}>
                  <TouchableOpacity style={styles.touchableOpacity}> 
                  <AppText
                      nol={1}
                      textAlign="left"
                      family="Poppins-SemiBold"
                      size={hp("2%")}
                      color="white"
                      Label={"Post"}
                    />
                  </TouchableOpacity>
                </View>
       
              </View>
             {/* <Text>Edit Profile</Text> */}
           <View style={{marginBottom: 30}} />
            
        </View>
      </ScrollView>
     )
 }
 export default EditProfile;


 var styles = StyleSheet.create({
      textField: {
        width: wp('92%'),
        
        // justifyContent: 'center',
        flexDirection: 'row',
        // alignSelf:'center',
    },
    container: {
   
      flexDirection: 'column',
        justifyContent: "center",
        // height: hp('103%'),
        backgroundColor: 'white'
    },
    touchableOpacity:{
      backgroundColor: '#B01125',
      borderWidth: 0,
      borderColor: 'white',
      width: wp('60%'),
      height: hp('6%'),
      justifyContent: 'center',
      borderRadius: 25,
      alignItems:'center',
      zIndex: 1,
      elevation: 5,
  },

    container2: {
        flex: 1,
        marginVertical: 20,
      },
      item: {
        borderRadius:12,
   
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,

      },
      itemInvisible: {
        backgroundColor: 'transparent',
      },
      itemText: {
        color: '#fff',
      },
})