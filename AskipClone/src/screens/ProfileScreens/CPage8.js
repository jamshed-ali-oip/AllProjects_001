import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React,{useState,useEffect} from 'react';
import Forminput from '../../components/Forminput';
import { useDispatch, useSelector } from 'react-redux';
import { Download_verify, UserDetail } from '../../redux/actions/user.action';
const {width, height} = Dimensions.get('window');

const CPage8 = ({setPage}) => {
  const [password,setPassword]=useState()
  const [inco_Password,set_Inco_Password]=useState(false)
  const [detail, setDetail] = useState()
  const userId = useSelector((state) => state?.auth?.credential?.User?._id)
  useEffect(() => {

    UserInfo()

  }, [])
  const UserInfo = async () => {
    const {data}  = await UserDetail(userId)
    setDetail(data?.User)

  }
  const dispatch=useDispatch()
  const Verify=()=>{
    let data={
      email:detail?.email,
      password:password
    }
    if(data.email ==null || password ==undefined){
      alert("password not found")
    }else{
      dispatch(Download_verify(data,setPage,set_Inco_Password))
     
    }
  }

  return (
    <>
    <View style={styles.mainView}>
      <Text style={styles.heading}>télécharger mes données</Text>

      <Text style={styles.description}>
      Confirme ton mot de passe avant de pouvoir télécharger tes données :
      </Text>
      <Text style={styles.title}> 
      Mot de passe
      </Text>
     
      <Forminput
      type="numeric"
      // maxletter={4}
      placeholder="********** "
      setvalue={setPassword}
      value={password}
      />
       
    </View>
    {
      inco_Password==true?<Text
      style={{
        marginLeft: width * 0.12,
        color:"red",
        fontSize:width * 0.03
      }}
      >*Mot de passe incorrect</Text>:null
    }
    <TouchableOpacity 
    onPress={()=>setPage(2)}
    >
    <Text style={styles.underline}> 
    Mot de passe oublié ? Je le réinitialise
    </Text>
    </TouchableOpacity>
    <TouchableOpacity
        onPress={() =>Verify()}
        style={styles.Connnection}>
        <Text style={styles.C_btntext}>Suivant</Text>
      </TouchableOpacity> 
    </>
  );
};

export default CPage8;

const styles = StyleSheet.create({
  underline: {
    fontSize:width*0.036, 
    // letterSpacing: -0.75, 
    paddingHorizontal:width*0.115, 
    marginTop:height*0.015,
    textDecorationLine:'underline', 
    color:'#081a4f',
    fontFamily:'Bebas Neue Pro Regular' 
  },
  title:{
    color:"#000000", 
    marginLeft:-width*0.555, 
    marginBottom:Platform.OS ==='ios'?-height*0.02:-height*0.035 , 
    marginTop:height*0.03, 
  },
  image: {
    width:width*0.1,
    height:height*0.024,
    resizeMode:'contain',
    marginTop:height*0.015,   
  },
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
  confirmation: 
  {
    fontSize:width*0.035,
    color:'#000000', 
    fontWeight:'500', 
    marginTop:height*0.025
  }, 
  email: 
  {
    fontSize:width*0.037,
    color:'#000000', 
    marginTop:height*0.018, 
    textAlign:'center', 
  }, mainView: 
  {
    alignItems:'center'
  }, 
  view:
  {
    flexDirection:'row', 
    alignItems:'center',
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
