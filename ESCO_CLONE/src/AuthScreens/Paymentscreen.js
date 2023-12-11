import React from "react";
import { Text, View, Dimensions, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { View } from "react-native-animatable";
let { width, height } = Dimensions.get('window');
const PaymentScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor:"white",
          height: height * .08,
          width: width * 1,
          // backgroundColor:"red",
          borderBottomWidth: 0.3,
          borderBottomColor: "darkgrey",
          flexDirection:"row",
          justifyContent:"space-between",
          paddingRight:20
        }}>
        <Image source={require("../Images/paymentopt/TNZSFd.png")} style={{ height: height * .08, width: width * .4 }} />
        <Image source={require("../Images/paymentopt/HSNUAw.png")} style={{ height: height * .06, width: width * .44,alignSelf:"center" }} />

      </View>
      <ScrollView>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap",backgroundColor:"white" }}
      >
        <View
         style={{ height: height * .3, width: width * .45, backgroundColor: "white",elevation:10,borderRadius:10,justifyContent:"center",alignItems:"center",margin:5 }}


        >
           <Image source={require("../Images/paymentopt/bank-account.png")} style={{ height: height * .2, width: width * .4 }} />
           <Text style={{fontSize:18,fontWeight:"400"}}>Bank Transfer</Text>
        </View>
        <View
          style={{ height: height * .3, width: width * .45, backgroundColor: "white",elevation:10,borderRadius:10,justifyContent:"center",alignItems:"center",margin:5 }}


        >
           <Image source={require("../Images/paymentopt/mobile-wallet.png")} style={{ height: height * .2, width: width * .4 }} />
           <Text style={{fontSize:18,fontWeight:"400"}}>Mobile Wallet</Text>
        </View>
        <View
          style={{ height: height * .3, width: width * .45, backgroundColor: "white",elevation:10,borderRadius:10,justifyContent:"center",alignItems:"center",margin:5 }}


        >
           <Image source={require("../Images/paymentopt/paypak.png")} style={{ height: height * .2, width: width * .4 }} />
           <Text style={{fontSize:18,fontWeight:"400"}}>Card Payment</Text>
        </View>
        <View
          style={{ height: height * .3, width: width * .45, backgroundColor: "white",elevation:10,borderRadius:10,justifyContent:"center",alignItems:"center",margin:5 }}

        >
           <Image source={require("../Images/paymentopt/unionpay.png")} style={{ height: height * .2, width: width * .4 }} />
           <Text style={{fontSize:18,fontWeight:"400"}}>Pay Union</Text>
        </View>

        

      </View>
      <View style={{padding:15,backgroundColor:"white"}}>
        <Text style={{fontSize:15,fontWeight:"700"}}>
          Bank
        </Text>
        <TextInput
        style={{borderRadius:10,borderWidth:.5}}
        placeholder="Your Bank Name"
        />
       
        <Text style={{fontSize:15,fontWeight:"700"}}>
          Account Number 
        </Text>
        <TextInput
        style={{borderRadius:10,borderWidth:.5}}
        placeholder="Account Number"
        />
        <Text style={{fontSize:15,fontWeight:"700"}}>
          CNIC Number
        </Text>
        <TextInput
         style={{borderRadius:10,borderWidth:.5}}
        placeholder="CNIC Number"
        />
        <TouchableOpacity
        onPress={()=>{navigation.goBack()}}
        style={{height:height*.08,margin:20,marginBottom:100,backgroundColor:"#ffd626",borderRadius:10,justifyContent:"center"}}>
          <Text style={{textAlign:"center",justifyContent:"center",fontSize:15,color:"black"}}>Make Payment</Text>
        </TouchableOpacity>
      </View>
     </ScrollView>

    </SafeAreaView>
  )
}
export default PaymentScreen;