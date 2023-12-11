import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import AppText from '../../../Components/AppText';
import RoundedCheckbox from "react-native-rounded-checkbox";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SplashScreen from  "react-native-splash-screen";
import TouchableOpacityBtn from '../../../Components/TouchableOpacity';
import CreditCardDisplay from 'react-native-credit-card-display';
import TextFieldCard from '../../../Components/TextFieldCard';
import Icon from 'react-native-vector-icons/Ionicons';
const AddCardStepThree = ({navigation}) => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  useEffect(() => {
    SplashScreen.hide();
   },[]);
   const CardValues = (e) => {
    console.log(e)
   }
    return(
      <SafeAreaView style={styles.container}>
        <ScrollView scrollEnabled showsVerticalScrollIndicator={false} >
            <StatusBar translucent backgroundColor="transparent" />
     
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <CreditCardDisplay
                backImage={require('./../../../Assets/Images/back1.png')}
                frontImage={require('./../../../Assets/Images/creditcard.png')}
                number={4242424242424242}
                cvc={123}
                expiration="04/21"
                name={"Ahsan Muneer"}
                // since="2004"
        
                width={360}
              />
             {/* <TextFieldCard
                placeholder="CardHolder Name"
                value={name}
                onchange={setName}
                keyboardType='default'
                secureTextEntry={true}
              />
            */}
        </View>
        <View style={{ width:'85%', justifyContent:'flex-start', flexDirection:'column',  alignItems:'flex-start', padding: 10,alignSelf:'center', top: 10}}>
        <AppText  nol={2}  textAlign="left"  family="Poppins-SemiBold" size={hp("4%")} color="black" Label={"My payment methods"} />
        
        <View style={{ alignItems:'center', flexDirection:'row', alignSelf:'flex-start', padding: 0, justifyContent:'space-between', alignContent:'space-between', marginTop:10,}}> 
            <View style={{}}>
             <RoundedCheckbox 
             innerSize={30}
             outerSize={35}
             checkedColor='#34C47C'
             component={<Icon name="checkmark-outline" size={15} color="white" />}
             onPress={(checked) => console.log("Checked: ", checked)} />
            </View>
             <View style={{justifyContent:'flex-start', alignContent:'flex-start', flexDirection:'column', alignSelf:'flex-start', alignItems:'flex-start', marginLeft: 30}}>
             <AppText  nol={1}  textAlign="left"  family="Poppins-Bold" size={hp("2%")} color="black" Label={"**** **** **** 4561"} />
             <AppText  nol={1}  textAlign="left"  family="Poppins-Regular" size={hp("1.8%")} color="grey" Label={"Visa - 08/22"} />
             </View>
             <View style={{justifyContent:'flex-end', alignContent:'flex-end', flexDirection:'row', alignSelf:'center', alignItems:'flex-end'}}>
            <TouchableOpacity style={{marginLeft: 40}}>
             <AppText  nol={1}  textAlign="left"  family="Poppins-Bold" size={hp("2.2%")} color="#B01125" Label={"Delete"} />
            </TouchableOpacity>
             </View>
        </View>
        <View style={{ alignItems:'center', flexDirection:'row', alignSelf:'flex-start', padding: 0, justifyContent:'space-between', alignContent:'space-between', marginTop:10,}}> 
            <View style={{}}>
             <RoundedCheckbox 
             innerSize={30}
             outerSize={35}
             checkedColor='#34C47C'
             component={<Icon name="checkmark-outline" size={15} color="white" />}
             onPress={(checked) => console.log("Checked: ", checked)} />
            </View>
             <View style={{justifyContent:'flex-start', alignContent:'flex-start', flexDirection:'column', alignSelf:'flex-start', alignItems:'flex-start', marginLeft: 30}}>
             <AppText  nol={1}  textAlign="left"  family="Poppins-Bold" size={hp("2%")} color="black" Label={"**** **** **** 4561"} />
             <AppText  nol={1}  textAlign="left"  family="Poppins-Regular" size={hp("1.8%")} color="grey" Label={"Visa - 08/22"} />
             </View>
             <View style={{justifyContent:'flex-end', alignContent:'flex-end', flexDirection:'row', alignSelf:'center', alignItems:'flex-end'}}>
            <TouchableOpacity style={{marginLeft: 40}}>
             <AppText  nol={1}  textAlign="left"  family="Poppins-Bold" size={hp("2.2%")} color="#B01125" Label={"Delete"} />
            </TouchableOpacity>
             </View>
        </View>
        <View style={{ alignItems:'center', flexDirection:'row', alignSelf:'flex-start', padding: 0, justifyContent:'space-between', alignContent:'space-between', marginTop:10,}}> 
            <View style={{}}>
             <RoundedCheckbox 
             innerSize={30}
             outerSize={35}
             checkedColor='#34C47C'
             component={<Icon name="checkmark-outline" size={15} color="white" />}
             onPress={(checked) => console.log("Checked: ", checked)} />
            </View>
             <View style={{justifyContent:'flex-start', alignContent:'flex-start', flexDirection:'column', alignSelf:'flex-start', alignItems:'flex-start', marginLeft: 30}}>
             <AppText  nol={1}  textAlign="left"  family="Poppins-Bold" size={hp("2%")} color="black" Label={"**** **** **** 4561"} />
             <AppText  nol={1}  textAlign="left"  family="Poppins-Regular" size={hp("1.8%")} color="grey" Label={"Visa - 08/22"} />
             </View>
             <View style={{justifyContent:'flex-end', alignContent:'flex-end', flexDirection:'row', alignSelf:'center', alignItems:'flex-end'}}>
            <TouchableOpacity style={{marginLeft: 40}}>
             <AppText  nol={1}  textAlign="left"  family="Poppins-Bold" size={hp("2.2%")} color="#B01125" Label={"Delete"} />
            </TouchableOpacity>
             </View>
        </View>
        </View>
        {/* <View style={{height: 250}}/> */}
            <View style={{justifyContent:'center', alignItems:'center', alignContent:'center',alignSelf:'center', bottom: 0, position: 'absolute', marginBottom: 20}}>
                      <TouchableOpacityBtn  
                                  onPress={()=> alert('Proceed to pay')}
                                  title="Proceed to Pay"
                        />
            </View>
            <View style={{height: 150}}/>
            </ScrollView>
      </SafeAreaView>
    )
}

export default AddCardStepThree



var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
//   flex: 1,
//   justifyContent: "center",
  height: '100%',
  backgroundColor: 'white',
//   alignItems:'center'
},
inputFontStyle:{
    fontFamily: 'Poppins-Regular' 
}

  })