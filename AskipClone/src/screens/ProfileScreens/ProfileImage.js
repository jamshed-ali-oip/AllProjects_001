import { StyleSheet, Text, View,TouchableOpacity,Image,Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { profileImage, ProfilePictureSet, UserDetail } from '../../redux/actions/user.action';
import { useDispatch, useSelector } from 'react-redux';
import { ImagePicker, launchImageLibrary } from 'react-native-image-picker';
import { base_URL_IMAGE } from '../../config/config';
import { stat } from 'fs';
const { height, width } = Dimensions.get('window');

const ProfileImage = () => {
  const [pic,setpic]=useState()
  const userId = useSelector((state) => state?.auth?.credential?.User?._id)
  const [detail, setDetail] = useState()
  const Picture =useSelector((state)=>state?.auth?.Tasweer?.data)
  const ok = useSelector(state => state?.auth?.progress)
   const dispatch=useDispatch()
   useEffect(() => {

    UserInfo()
// console.log("fjsdlkh nsfjgs 48578451")
  }, [Picture,pic,ok])
  const UserInfo = async () => {
    const {data}  = await UserDetail(userId)
    setDetail(data?.User)

  }
// console.log("profiledata",detail?.photo)

   useEffect(()=>{
    var body={
      photo:Picture
    }
    if(body?.photo){
      dispatch(ProfilePictureSet(userId,body))
    }
   },[Picture,pic])

  //  const Picture =useSelector((state)=>state?.auth?.Tasweer?.data)
  // console.log("sjkldguksgkj")
  //  console.log("tasweer  dpp ",Picture)
    const onFromPickerImage = () => {
        var options = {
          title: 'Select Avatar',
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
        };
        launchImageLibrary(options, (response) => {
    
          if (response) {
            dispatch(profileImage(response.assets?.[0]||null))
            // console.log("datadtadtatta", response)
            setpic(response.assets)
          }
        });
      }
    
    return (

<>

<View style={styles.profile}>
            <TouchableOpacity
              onPress={() =>onFromPickerImage()}
            >
              <Image
                style={{
                  height: height * 0.11,
                  width: width * 0.21,
                  resizeMode: 'contain',
                  borderRadius: width * 200,
                  alignSelf: 'center',
                }}
                source={{ uri:Picture!==undefined?`${base_URL_IMAGE+Picture}`:`${base_URL_IMAGE+detail?.photo}`}}
                // source={{ uri: Picture?`${base_URL_IMAGE+Picture}`:"https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"}}
              />
            </TouchableOpacity>
            
          </View>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop:Platform.OS=="ios"?height*0.009:null
          }}>
          <Text
            style={{
              color: Colors.theme_color,
              // fontSize: width * 0.05,
              fontFamily: 'Bebas Neue Pro Book',
              fontSize: width * 0.063,
              letterSpacing: 0.3,
            }}>
            SALUT
          </Text>
          <Text
            style={{
              color: Colors.theme_color,
              // fontSize: width * 0.05,
              // fontWeight: '800',\
              fontFamily: 'Bebas Neue Pro Bold',
              fontSize: width * 0.065,
              letterSpacing: 0.3,
              paddingHorizontal: width * 0.01,
            }}>
           {detail?.firstName} !
          </Text>
        </View>
</>

          
  )
}

export default ProfileImage

const styles = StyleSheet.create({ profile: {
    backgroundColor: Colors.whitetext,
    height: width * 0.23,
    width: width * 0.23,
    alignSelf: 'center',
    borderRadius: 100,
    marginTop: Platform.OS === "ios"?-height * 0.03:-height * 0.05,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    
    elevation: 8,
    justifyContent: 'center',
  },})