import {Dimensions, Image, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React,{useEffect,useState} from 'react';
import Forminput from '../../components/Forminput';
import { useSelector,useDispatch } from 'react-redux';
import { Send_link, UserDetail } from '../../redux/actions/user.action';

const {width, height} = Dimensions.get('window');


const CPage9 = ({setPage}) => {
  const dispatch=useDispatch()
  const [detail, setDetail] = useState()
  const userId = useSelector((state) => state?.auth?.credential?.User?._id)
  useEffect(() => {

    UserInfo()

  }, [])
  const UserInfo = async () => {
    const {data}  = await UserDetail(userId)
    setDetail(data?.User)

  }
  const userData=useSelector(state => state?.auth?.User) 
  const USER_DATA = useSelector((state) => state?.auth?.User)
  // const all_Data=useSelector(state => state?.user?.data)
  // console.log("TOU dekhle bhai",USER_DATA)
  const sendData=()=>{
    let data={
      email:detail?.email,
      data:USER_DATA?.data

    }
    // console.log(data)
    dispatch(Send_link(data,setPage))
    setPage(1)
  }
  return (
    <View style={styles.mainView}>
      <Text style={styles.heading}>télécharger mes données</Text>

      <Text style={styles.description}>
        Nous avons commencé à créer un fichier avec ce que tu as partagé sur
        ASKIP et nous enverrons un lien à abcd@gmail.com. La collecte et l’envoi
        des données peuvent prendre jusqu’à 14 jours. N’oublie pas de vérifier
        tes messages indésirables.
      </Text>
      <TouchableOpacity
        onPress={() =>sendData()}
        style={styles.Connnection}>
        <Text style={styles.C_btntext}>Confirmer</Text>
      </TouchableOpacity> 
    </View>
  );
};

export default CPage9;

const styles = StyleSheet.create({
 
 
  
  heading: {
    // fontSize: width * 0.04,
    textAlign:'center',
    marginTop:height*0.03, 
    marginVertical:height*0.02,
    // fontWeight: '700',
    color:'black',
    fontFamily:'Bebas Neue Pro Bold',
    fontSize:width*0.055,
    textTransform:'uppercase',
  },
  description: {
    // fontSize: width * 0.035,
    color:'#000000',
    textAlign:'center', 
    width:width*0.85, 
    marginVertical:height*0.0125, 
    fontFamily:'Bebas Neue Pro Regular',
    fontSize:width*0.045,
  },
  mainView: {
    alignItems:'center',
    marginBottom:height*0.185, 
  },Connnection: {
    height: height * 0.06,
    width: width * 0.65,
    borderRadius: width * 0.02,
    // alignItems:"center",
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: height * 0.015,
    // borderWidth:1,
    backgroundColor: Colors.grey,
    marginTop: height * 0.04,
    // borderColor:Colors.ButtonBorder
  },
  C_btntext: {
    textAlign: 'center',
    // fontSize: width * 0.045,
    // fontWeight: '800',
    color: Colors.whitetext,
    letterSpacing: 0,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.053,
  },
 
});
