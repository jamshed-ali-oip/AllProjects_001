import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import { base_URL } from '../../config/config';
// import {LOGIN, REGISTER} from '../const/const';
import * as types from '../const/const';
import instance from '../../config/httpservice';

// ***************************Auth Screen ************************************

export const registerUser = (data, navigation, setLoading) => async (dispatch) => {
  try {
    console.log(data);
    const response = await instance.post(`${base_URL}/auth/driver/signup`, data);
    console.log('register api ', response);
    const token = response?.data?.data?.tokens?.accessToken
    await AsyncStorage.setItem("Token", token);
    if (response?.data) {
      setLoading(false)
      dispatch({
        type: types.REGISTER,
        payload: response?.data?.data,
      });
      dispatch({
        type: types.USER,
        payload: response?.data?.data?.user,
      });
      navigation.navigate('Ottp')
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
        payload: response?.data?.data,
      });
      dispatch({
        type: types.USER,
        payload: response?.data?.data?.user,
      });
    }
  } catch (error) {
    setLoading(false)
    console.log('LoginEror', error);
    Toast.show({
      type: 'error',

      text1: error?.response?.data?.message
    })
  }
};
//__________________________otp verification _________________________
export const OttpVerification = (body, setLoading) => async (dispatch) => {

  try {
    const response = await instance.post(`/auth/phone-verify`, body);
    console.log('ottp ', response);
    if (response?.data) {
      setLoading(false)
      dispatch({
        type: types.REGISTER,
        payload: response?.data?.data,
      });
    }
  } catch (error) {
    setLoading(false)
    console.log('ottp', error);
  }

};
// __________________________________vehicle info add_____________________________

//______________________________email verification___________________________

export const EmailVerification = (data, navigation, setLoading) => async (dispatch) => {
  try {
    console.log(data);
    const response = await instance.post(`/auth/forgot-password`, data);
    console.log('email res ', response);
    if (response.data) {
      setLoading(false)
      navigation.navigate("OttpSignup", { data: data })
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
    setLoading(false)
    console.log('new pass', error);
  }
};
// *************************** Update Profile ************************************
export const UpdateProfile = (data, Toast) => async (dispatch) => {
  try {

    const response = await instance.put(`/auth/update/me`, data);
    console.log('update user', response);
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
    console.log('Update user error', error);
  }
};
// *************************** Withdraw Amount ************************************
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
// *************************** Deposite Amount ************************************
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
// *************************** Reset Password ************************************
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
    Toast.show({
      type: 'error',
      text1: error?.response?.data?.message,
      // text2: 'New password and Confirm password does not match '
    })
  }
};
// *************************** Detect Country Api ************************************
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
