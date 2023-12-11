import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native'
import React,{useState,useEffect} from 'react'
import SimpleGradientProgressbarView from "react-native-simple-gradient-progressbar-view";
import Colors from './Colors';
import { useSelector } from 'react-redux';
import { UserDetail } from '../redux/actions/user.action';
const { height, width } = Dimensions.get('window');
const Progressbar = (props) => {
  const userId = useSelector((state) => state?.auth?.credential?.User?._id)
  const [detail, setDetail] = useState()
  useEffect(() => {
    UserInfo()
  }, [detail])
  const UserInfo = async () => {
    const { data } = await UserDetail(userId)
    setDetail(data?.User?.progress)

  }
//  console.log("progress details",detail)
  const ok = useSelector(state => state?.auth?.progress)
  const percent = useSelector(state => state?.auth?.percent)
  // console.log("ok",ok)
  const yes =ok==undefined?detail:ok


  return (
<>
<Text
        style={{
          fontSize: width * 0.037,
          color: 'black',
          // fontWeight: '700',
          alignSelf: 'center',
          // marginTop: height * 0.001,
          fontFamily: 'Bebas Neue Pro Regular',
          fontSize: width * 0.046,
          letterSpacing: 0.3,
        }}>{yes == 1 ? "TON PROFIL EST COMPLET !" : "TON PROFIL EST INCOMPLET !"}

      </Text>
      <View style={{ marginTop: height * 0.03 }}></View>
    
    <View>
   
      <View style={styles.container}>

        <SimpleGradientProgressbarView
          style={styles.box}
          toColor="#FFBC15"
          fromColor="#001D4F"
          progress={yes}
          maskedCorners={[1, 1, 1, 1]}
          cornerRadius={Platform.OS == 'ios' ? width * 0.03 : width * 0.045}

        />


      </View>
      <Text
        style={{
          position: "absolute",
          zIndex: 10,
          color: 'white',
          fontWeight: 'bold',
          fontSize: width * 0.035,
          top:-8,
          // marginTop: -height * 0.012,
          textAlign:'center',textAlignVertical:'center',
          marginLeft: width * yes / 1.5 || 0
        }}
      >{yes * 100}%</Text></View>
      
</>
  )
}

export default Progressbar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: width * 0.73,
    height: height * 0.03,
    marginVertical: width * 0.025,
    borderColor: '#000000',
    // borderWidth: 1,
    // borderRadius:width* 7.0,
  },
})