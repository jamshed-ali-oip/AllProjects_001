import React, {useEffect, useState,useRef} from 'react';
import {
   TouchableOpacity, View,Text,ImageBackground,StyleSheet,StatusBar,SafeAreaView,FlatList,
   Image,KeyboardAvoidingView,LayoutAnimation,Platform,UIManager,Animated,TouchableHighlight,TextInput,ScrollView
 } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import AppText from '../../../Components/AppText';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SplashScreen from  "react-native-splash-screen";
import TouchableOpacityBtn from '../../../Components/TouchableOpacity';

import DateTimePicker from '@react-native-community/datetimepicker';
// import { CreditCardInput, LiteCreditCardInput } from "react-native-input-credit-card";
import CreditCardDisplay from 'react-native-credit-card-display';
import TextFieldCard from '../../../Components/TextFieldCard';
const AddCardStepTwo = ({navigation}) => {
    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState(null);
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
                <View style={{justifyContent:'flex-start', flexDirection:'column',  alignItems:'flex-start', padding: 25, alignContent:'flex-start',alignSelf:'flex-start', left: 5}}>
                    <AppText  nol={1}  textAlign="left"  family="Poppins-SemiBold" size={hp("4%")} color="black" Label={"Add credit card"} />
                    <AppText  nol={1}  textAlign="left"  family="Poppins-Regular" size={hp("2%")} color="black" Label={"Enter your credit card details"} />
                </View>
                <View style={{alignItems:'center'}}>
                <CreditCardDisplay
                    backImage={require('./../../../Assets/Images/back1.png')}
                    frontImage={require('./../../../Assets/Images/creditcard.png')}
                    number={cardNumber}
                    cvc={cvv}
                    expiration={expiration}
                    name={name}
                    // since="2004"
                    cardStyles={styles.card}
                    width={360}
                    fontColor='white'
                  
                />
                </View>
                <View style={{padding: 10, width: '90%', alignContent:'center', alignSelf:'center'}}>
                <TextFieldCard
                    placeholder="CardHolder Name"
                    value={name}
                    onchange={setName}
                    keyboardType='default'
                    secureTextEntry={true}
                    max={16}
                />
                 <TextFieldCard
                    placeholder="Card Number"
                    value={cardNumber}
                    onchange={setCardNumber}
                    keyboardType='numeric'
                    secureTextEntry={true}
                    max={16}
                />
                </View>
                <View style={{flexDirection:'row', alignContent:'center', alignSelf:'center', paddingLeft: 10}}>
                <View style={{width: '45%'}}>
             
                    <TextFieldCard
                        placeholder="Expiry date"
                        value={expiration}
                        onchange={setExpiration}
                        keyboardType='numbers-and-punctuation'
                        secureTextEntry={true}
                        max={5}
                    />
                </View>
                <View style={{width: '45%'}}>
                    <TextFieldCard
                        placeholder="CVV/CVC"
                        value={cvv}
                        onchange={setCvv}
                        keyboardType='numeric'
                        secureTextEntry={true}
                        max={3}
                    /> 
                </View>
                </View>
                {/* <CreditCardInput 
                cardImageFront={require('./../../../Assets/Images/creditcard.png')}
                cardImageBack={require('./../../../Assets/Images/back.png')}
                inputStyle={styles.inputFontStyle}
                cardScale={1.2}
                autoFocus={true}
                
                onChange={(e)=> CardValues(e)} /> */}
                {/* <View style={{height: 250}}/> */}
                    <View style={{justifyContent:'center', alignItems:'center', alignContent:'center',alignSelf:'center', bottom: 0, position: 'absolute', marginBottom: 20}}>
                    <TouchableOpacityBtn  
                        // onPress={()=> CardValues()}
                                    onPress={()=> navigation.navigate('stepThree')}
                                    title="Continue"
                        />
                    </View>
                     <View style={{height: 150}}/>
                    </ScrollView>
                </SafeAreaView>
    )
}

export default AddCardStepTwo



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
    },

  })