import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import { base_URL } from '../../config/config';
// import {LOGIN, REGISTER} from '../const/const';
import * as types from '../const/const';
import instance from '../../config/httpservice';

// ***************************Auth Screen ************************************


export const registerUser = (data, navigation, setcode, setLoading) => async (dispatch) => {
  try {
    console.log(data);
    const response = await instance.post(`${base_URL}/auth/signup`, data);
    console.log('register api ', response);
    const token = response?.data?.data?.tokens?.accessToken
    console.log("tokennnnn+======>", token)
    await AsyncStorage.setItem("Token", token);

    if (response?.data) {
      setcode(response)
      setLoading(false)
      // alert("your code is" + response?.data?.data?.token?.shot_code)
      dispatch({
        type: types.REGISTER,
        payload: response?.data,
      });
      dispatch({
        type: types.USER,
        payload: response?.data?.data?.user,
      });
      navigation.navigate("OttpSignup")
    }
  } catch (error) {
    setLoading(false)
    console.log('registererror', error);
  }
};
//___________________login________________________________
export const LoginUser = (data, Toast, setLoading) => async (dispatch) => {
  try {
    console.log(data);
    const response = await instance.post(`/auth/signin`, data);
    const token = response?.data?.data?.tokens?.accessToken
    await AsyncStorage.setItem("Token", token);
    console.log('register loginapi ', response);
    if (response?.data) {
      setLoading(false)
      dispatch({
        type: types.REGISTER,
        payload: response?.data,
      });
      dispatch({
        type: types.USER,
        payload: response?.data?.data?.user,
      });
    }
  } catch (error) {
    setLoading(false)
    console.log('LoginEror', error.response.data);
    Toast.show({
      type: 'error',
      text1: error.response.data?.message,

    })
  }
};
//__________________________otp verification _________________________
export const OttpVerification = (data, navigation, token, setcode, setLoading) => async (dispatch) => {

  try {
    console.log(data);
    const response = await instance.post(`/auth/phone-verify`, data);
    console.log('=====> ', response);
    setcode(setcode)
    if (response?.data) {
      setLoading(false)
      dispatch({
        type: types.REGISTER,
        payload: response?.data,
      });
    }
  } catch (error) {
    setfalse("")
    console.log('+++++>', error);
  }
};
// __________________________________vehicle info add_____________________________
export const VehicleInfoAdd = (data, navigation) => async (dispatch) => {

  try {
    const response = await instance.post(`/vehicle`, data);
    console.log('ottp ', response);
    if (response?.data) {
      navigation.navigate("Scanner")
    }
  } catch (error) {
    console.log('ottp', error.response.data);
  }

};
//______________________________email verification___________________________

export const EmailVerification = (data, navigation, setLoading) => async (dispatch) => {
  try {
    console.log(data);
    const response = await instance.post(`/auth/forgot-password`, data);
    console.log('forget email ', response);
    if (response.data) {
      navigation.navigate("Ottp", { data: data })
      setLoading(false)
    }

  } catch (error) {
    setLoading(false)
    console.log('email', error);
  }
};
//_____________________________OTTP VERification Forget Password_______________
export const OttpForgetVerification = (data, navigation, setLoading) => async (dispatch) => {
  try {
    console.log(data);
    const response = await instance.post(`/auth/password-otp`, data);
    console.log('Ottp verifc res ', response);
    if (response.data) {
      setLoading(false)
      navigation.navigate("NewPass", { data: response?.data?.data?.user })
    }

  } catch (error) {
    setLoading(false)
    console.log('ottpverfication', error);
  }
};
//__________________________confirm password and New Password ___________________
export const NewPassword = (data, navigation, user, setLoading) => async (dispatch) => {
  try {
    console.log("i api", data, user);
    const response = await instance.post(`/auth/password-verify?user=${user}`, data);
    console.log('newpass res ', response);
    if (response.data) {
      navigation.navigate("Login")
      setLoading(false)
    }

  } catch (error) {
    console.log('new pass', error);
    setLoading(false)
  }
};
// *************************** Update Profile ************************************
export const UpdateProfile = (data, Toast,) => async (dispatch) => {
  console.log("profile", data)
  try {

    const response = await instance.put(`/auth/update/me`, data);
    console.log('update user', response);
    if (response) {
      // setLoading(false)
    }
    // setLoading(false)
    dispatch({
      type: types.USER,
      payload: response?.data?.data?.user,
    });
    Toast.show({
      type: 'success',
      text1: "Updated Succesfully!",
      // text2: 'New password and Confirm password does not match '
    })
  } catch (error) {
    // setLoading(false)
    console.log('Update user error', error);
  }
};
// *************************** Reset password ************************************
export const ResetPassword = (data, Toast, navigation, setLoading) => async (dispatch) => {
  try {

    const response = await instance.post(`/auth/reset-password`, data);
    console.log("reset pass", response)
    if (response) {
      // setmessage("SUCCESSS")
      setLoading(false)
      Toast.show({
        type: 'success',
        text1: "Successfull Changed",
        // text2: 'New password and Confirm password does not match '
      })
      setTimeout(function () {
        navigation.goBack()
      }, 2000);
      // navigation.goBack()
    }
  } catch (error) {
    console.log("reset error", error)
    setLoading(false)
    Toast.show({
      type: 'error',
      text1: error?.response?.data?.message,
      // text2: 'New password and Confirm password does not match '
    })
  }
};
// *************************** Wallet Detail  ************************************
export const WalletDetail = () => async (dispatch) => {
  try {

    const response = await instance.get(`/invoice/check-balance`);
    console.log('wallete user', response);

    return response
  } catch (error) {
    console.log('wallet user error', error);
  }
};
// *************************** Connect Wallet Url ************************************
export const WalletUrl = (navigation) => async (dispatch) => {
  try {

    const response = await instance.post(`/auth/account-link`);
    console.log('wallete URL', response);
    if (response?.data?.data?.accountLink) {
      navigation.navigate("Browser", { data: response?.data?.data?.accountLink?.url })
    }
    // return response
  } catch (error) {
    console.log('wallet URL error', error);
  }
};
// *************************** make card default Api ************************************
export const DefaultCard = (data, setLoading) => async (dispatch) => {
  // console.log("data", data)
  // setTimeout(() => {
  //   setLoading(false)
  // }, 1000);
  try {

    const response = await instance.post(`/invoice/update/card`, data);
    console.log('Defaut card URL', response);
    if (response) {
      setLoading(false)
    }
    // return response
    // alert("data on")
  } catch (error) {
    setLoading(false)
    // alert("fsmflsjfl")
    console.log('Default card URL error', error);
  }
};
// *************************** Aithdraw Api  ************************************
export const WithdrawAmount = (data, Toast, setLoading, navigation) => async (dispatch) => {
  try {

    const response = await instance.post(`/invoice/withdraw`, data);
    console.log('Withdraw amount', response);
    if (response) {
      setLoading(false)
      Toast.show({
        type: 'success',
        text1: "Success!",
        // text2: 'New password and Confirm password does not match '
      })
      setTimeout(() => {
        navigation.navigate("wallet")
      }, 1000);
    }
  } catch (error) {
    setLoading(false)
    console.log('withdraw error', error);
  }
};
// *************************** Deposite Api ************************************
export const DepositeAmount = (data, Toast, setLoading, navigation) => async (dispatch) => {
  try {

    const response = await instance.post(`/invoice/deposit`, data);
    console.log('Deposite amount', response);
    if (response) {
      setLoading(false)
      Toast.show({
        type: 'success',
        text1: "Deposite Successfully!",
        // text2: 'New password and Confirm password does not match '
      })
      setTimeout(() => {
        navigation.navigate("wallet")
      }, 1000);
    }
  } catch (error) {
    setLoading(false)
    console.log('depoite error', error);
  }
};
// ***************************  Profile Image Upload************************************
export const profileImage = (data, setpic) => async (dispatch) => {
  console.log("dadadada", data)
  var bodyFormData = new FormData();
  bodyFormData.append('file', {
    uri: data.uri,
    type: data.type,
    name: data.fileName

  });

  axios.post(`${base_URL}/file`, bodyFormData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((response) => {
      console.log("image upoadong", response)
      setpic(response)
    })
    .catch(err => {
      console.log("errr profile image", err.response)
    })

};
export const CountryDetect = (data) => async (dispatch) => {
  try {
    console.log("===================================", data)
    const response = await instance.post(`/auth/location`, data);
    console.log('CountryDetect', response);
    if (response) {
      dispatch({
        type: types.COUNTRY_DETECT,
        payload: response?.data?.data?.location?.country

      })
    }
  } catch (error) {

    console.log('Country Detect error', error);
  }
};
export const MylocationFinder = (data) => async (dispatch) => {
  try {
    console.log("===================================", data)
    const response = await instance.post(`/auth/location/track`, data);
    console.log('mylocation', response);
    if (response) {
      return response
    }
  } catch (error) {

    console.log('mylocation error', error);
  }
};
