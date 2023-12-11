import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from 'react-native';
import Header from '../components/Header';
import HistoryModal from '../components/HistoryModal';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
import colors from '../assets/colors';
import Loader from '../components/Loader';
import * as actions from "../store/Actions"
import { connect, useDispatch, useSelector } from 'react-redux';
import BuyCreditsModal from '../components/BuyCreditsModal';
import Button from '../components/Button';
import Toast from "react-native-toast-message"
// import { TextInput } from 'react-native-gesture-handler';
// import {  } from 'react-native';


const { width, height } = Dimensions.get('window');

const HistoryScreen = (props) => {
  // let amount = '1000.00';
  // const [loading,setLoading]=useState(false)
  // const [showCreditModal, setShowCreditModal] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [credits, setCredits] = useState('');
  const data = useSelector((state) => state?.wallet?.bankDetail)
  console.log("object", data)
  const [title, setTitle] = useState(data?.account_title);
  const [accountNumber, setAccountNumber] = useState(data?.account_number);
  const [branchCode, setBranchCode] = useState(data?.branch_code);
  const [branchName, setBranchName] = useState(data?.branch_name);
  const [Error, setError] = useState('');
  const [loader, setLoader] = useState(false);



  const dispatch = useDispatch()

  // useEffect(()=>{
  //   const unsubscribe = props.navigation.addListener('focus', () => {
  //     setLoading(true)
  //     props.getWallet({id:props.user?.data?.id}).then(()=>setLoading(false))
  //   });

  //   return unsubscribe;
  // },[])

  // useEffect(()=>{
  //   if(props.wallet){
  //     // setCredits(props.wallet)
  //   }
  // },[props.wallet])

  // const _onPressBuyCredits = () => {
  //   console.log('cc',credits)
  //   if(credits>0){
  //     setIsLoading(true);
  //   // let formData = new FormData();
  //   // formData.append('user_id', UserReducer?.userData?.id);
  //   // formData.append('credit', credits);
  //   // formData.append('token', UserReducer?.userData?.token);
  //   const data = {
  //     credit: credits,
  //     user_id: props?.user?.data?.id,
  //     // token: UserReducer?.userData?.token,
  //   };
  //   props.buyCredits(data).then(() => {
  //     setCredits("")
  //     setIsLoading(false);
  //     setShowCreditModal(false);
  //   });
  //   }
  // };

  // if (loading) {
  //   return <Loader />
  // }

  const handleSave = () => {
    const data = {
      provider_id: props.user?.data?.id,
      account_title: title,
      account_number: accountNumber,
      branch_code: branchCode,
      branch_name: branchName
    }
    if (data?.account_title == "") {
      setError("Enter Account Title")
    } else if (data?.accountNumber == "") {
      setError("Enter Account Number")
    } else if (data?.branch_code == "") {
      setError("Enter Branch Code")
    }
    else if (data?.branch_name == "") {
      setError("Enter Branch Name")
    } else {
      setError("")
      setLoader(true)
      dispatch(actions.saveBankDetail(data, setLoader, props.navigation, Toast))
    }
  }
  return (
    <>
      <View style={styles.container}>
        <Header
          showBack={true}
          navigation={props.navigation}
          iconName="arrow-back"
        />
        {/* <Toast /> */}
        <Text
          style={{
            fontSize: width * 0.054,
            color: "#0756a3",
            fontWeight: "800",
            alignSelf: "center",
            marginTop: height * 0.0125
          }}
        >
          Bank Details
        </Text>

        <Text
          style={{
            color: "red",
            fontSize: width * 0.038,
            alignSelf: "center",
            fontStyle: "italic"
          }}
        >
          {Error ? "*" : null}{Error}
        </Text>

        <Text
          style={{
            color: "gray",
            fontSize: width * 0.038,
            marginLeft: width * 0.13,
            marginTop: height * 0.018
            // alignSelf: "center",
            // fontStyle: "italic"
          }}
        >
          Account Title
        </Text>

        <View
          style={{
            width: width * 0.8,
            borderWidth: 1,
            borderColor: "gray",
            height: height * 0.07,
            justifyContent: "center",
            borderRadius: 10,
            alignSelf: "center",
            paddingLeft: width * 0.025,
            // marginTop: height * 0.018
          }}
        >
          <TextInput
            placeholder="Acoount Title"
            keyboardType='default'
            onChangeText={setTitle}
            value={title}
            style={{
              color: "black"
            }}
          />
        </View>
        <Text
          style={{
            color: "gray",
            fontSize: width * 0.038,
            marginLeft: width * 0.13,
            marginTop: height * 0.018
            // alignSelf: "center",
            // fontStyle: "italic"
          }}
        >
          Account Number
        </Text>
        <View
          style={{
            width: width * 0.8,
            borderWidth: 1,
            borderColor: "gray",
            height: height * 0.07,
            justifyContent: "center",
            borderRadius: 10,
            alignSelf: "center",
            paddingLeft: width * 0.025,
            // marginTop: height * 0.018
          }}
        >
          <TextInput
            placeholder="Acoount Number"
            onChangeText={setAccountNumber}
            value={accountNumber}
            keyboardType='number-pad'
            style={{
              color: "black"
            }}
          />
        </View>
        <Text
          style={{
            color: "gray",
            fontSize: width * 0.038,
            marginLeft: width * 0.13,
            marginTop: height * 0.018
            // alignSelf: "center",
            // fontStyle: "italic"
          }}
        >
          Branch Code
        </Text>
        <View
          style={{
            width: width * 0.8,
            borderWidth: 1,
            borderColor: "gray",
            height: height * 0.07,
            justifyContent: "center",
            borderRadius: 10,
            alignSelf: "center",
            paddingLeft: width * 0.025,
            // marginTop: height * 0.018
          }}
        >
          <TextInput
            placeholder="Branch Code"
            onChangeText={setBranchCode}
            value={branchCode}
            keyboardType='number-pad'
            style={{
              color: "black"
            }}
          />
        </View>
        <Text
          style={{
            color: "gray",
            fontSize: width * 0.038,
            marginLeft: width * 0.13,
            marginTop: height * 0.018
            // alignSelf: "center",
            // fontStyle: "italic"
          }}
        >
          Branch Name
        </Text>
        <View
          style={{
            width: width * 0.8,
            borderWidth: 1,
            borderColor: "gray",
            height: height * 0.07,
            justifyContent: "center",
            borderRadius: 10,
            alignSelf: "center",
            paddingLeft: width * 0.025,

          }}
        >
          <TextInput
            placeholder="Branch Name"
            onChangeText={setBranchName}
            value={branchName}
            style={{
              color: "black"
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => { handleSave() }}
          style={{
            width: width * 0.5,
            backgroundColor: "#0756a3",
            height: height * 0.06,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            alignSelf: "center",
            marginTop: height * 0.02
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: width * 0.045,
              fontWeight: "500"
            }}
          >{loader == true ? <ActivityIndicator size={"small"} color={"white"} /> : "Save"}</Text>
        </TouchableOpacity>

        {/* <View style={{flexDirection: 'row'}}>
          <Heading
            title="Wallet"
            passedStyle={styles.heading}
            fontType="bold"
          />
        </View>
        <Heading
          passedStyle={styles.totalAmountInAcc}
          title="Total amount in account"
          fontType="medium"
        />
        <Heading
          passedStyle={styles.amount}
          title={`$${props.wallet}`}
          fontType="bold"
        />
        <View style={{flex:1,justifyContent:'flex-end'}}>
        <Button
              title="Buy Credits ($)"
              onBtnPress={() => setShowCreditModal(true)}
              isBgColor={true}
              btnStyle={{alignSelf: 'center', marginBottom: 60}}
            />
        </View> */}
        {/* {showCreditModal && (
          <BuyCreditsModal
            title={"Credit Details"}
            onPress={_onPressBuyCredits}
            isModalVisible={showCreditModal}
            setIsModalVisible={setShowCreditModal}
            showLoader={isLoading}
            credits={props.wallet}
            buttonText="Buy"
            setCredits={setCredits}
          />
        )} */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    marginLeft: width * 0.08,
    marginTop: height * 0.04,
  },
  totalAmountInAcc: {
    marginLeft: width * 0.08,
    marginTop: height * 0.03,
    color: 'rgba(0,0,0,0.7)',
    fontSize: width * 0.05,
  },
  amount: {
    color: colors.themeBlue,
    fontSize: height * 0.05,
    marginLeft: width * 0.08,
  },
});

function mapStateToProps({ wallet, user }) {
  return { wallet, user }
}
export default connect(mapStateToProps, actions)(HistoryScreen);
