import RunMatter from '../../config/runMatter';
import { BankAcount, GET_ALL_BOOKING, GET_ALL_SERVICES, GET_CURRENT_BOOKING, GET_DASHBOARD, GET_HELP_TEXT, GET_SERVICES, GET_WALLET, LOG_IN, UPDATE_NAME, UPDATE_PASSWORD } from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';

export const login = ({ password, email }) => async dispatch => {
  try {
    const res = await RunMatter.post('/login', {
      email,
      password,
      roll_id: 3
    });

    await AsyncStorage.setItem('id', JSON.stringify({ ...res.data.data, password }));
    // RunMatter.defaults.headers.common['Authorization'] =
    //   'Bearer ' + res.data.data.token;
    // console.log('login', res.data.data.token);
    dispatch({
      type: LOG_IN,
      payload: res.data,
    });
  } catch (err) {
    if (err?.response?.data) {
      Toast.show({ type: 'error', text1: "Invalid Credentials" })
    } else {
      Toast.show({ type: 'error', text1: "No internet connection" })
    }
    dispatch({
      type: LOG_IN,
      payload: { status: false },
    });
  }
};

export const signUp = (data, cb, password) => async dispatch => {
  try {
    const res = await RunMatter.post('/register', data, { headers: { "Content-Type": "multipart/form-data" }, });
    cb();
    await AsyncStorage.setItem('id', JSON.stringify({ ...res.data.data, password }));
    // konnect.defaults.headers.common['Authorization'] =
    //   'Bearer ' + res.data.data.token;
    dispatch({
      type: LOG_IN,
      payload: res.data,
    });
  } catch (err) {
    console.log("err=====================", err)
    if (err?.response?.data?.message) {
      Toast.show({ type: 'error', text1: JSON.stringify(err?.response?.data?.message) })
    } else {
      Toast.show({ type: 'error', text1: "No internet connection" })
    }
    console.log("eeeeeeeeeeeeeeeeeeee", err?.response?.data)
    console.log("eeeeeeeeeeeeeeeeeeee2", err)
    console.log("eeeeeeeeeeeeeeeeeeee3", err?.response)


    cb();
    dispatch({
      type: LOG_IN,
      payload: { status: false },
    });
  }
};

export const setUser = (cb, loadingOff, showMessage) => async dispatch => {
  RunMatter.interceptors.response.use(
    response => {
      if (response.status === 200) {
        return response;
      }
    },
    error => {
      if (error.response && error.response.status === 401) {
        showMessage();
        cb();
      }
      return Promise.reject(error);
    },
  );

  const id = await AsyncStorage.getItem('id');

  if (id) {
    // RunMatter.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const user = JSON.parse(id)
    return RunMatter
      .post('/login', { email: user.email, password: user.password, roll_id: 3 })
      .then(res => {
        console.log('myres', res.data);
        dispatch({
          type: LOG_IN,
          payload: { ...res.data, data: { ...res.data.data, password: user.password } }
        });
        loadingOff();
      })
      .catch(err => {
        console.log(err.response.data)
        loadingOff();
      })
  } else {
    loadingOff();
  }
};


export const logOut = () => async dispatch => {
  AsyncStorage.removeItem('id');
  dispatch({
    type: LOG_IN,
    payload: {},
  });
};


export const getServices = (id) => async dispatch => {
  try {
    const res = await RunMatter.get(`/admin/services/show/${id}`, {
      headers: {
        Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
        Accept: 'application/json',
      },
    });
    console.log("myDate", res.data)
    dispatch({
      type: GET_SERVICES,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SERVICES,
      payload: [],
    });
  }
};

export const getAllServices = () => async dispatch => {
  try {
    const res = await RunMatter.get(`/admin/services`, {
      headers: {
        Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
        Accept: 'application/json',
      },
    });
    console.log("ressss", res)
    dispatch({
      type: GET_ALL_SERVICES,
      payload: res.data.data,
    });
  } catch (err) {
    console.log("errr", err)
    dispatch({
      type: GET_ALL_SERVICES,
      payload: [],
    });
  }
};


export const addService = (data) => async dispatch => {
  console.log(data)
  return RunMatter.post(`/user/add_provider_service`, data)
};

export const setAval = (data) => async dispatch => {
  try {
    RunMatter.post(`/admin/availability`, data)
    dispatch({
      type: "change_aval",
      payload: data.availability == "false" ? "off" : "on"
    });
  } catch (err) {
    console.log(err)
  }
};


export const updateProfile = (data, type) => async dispatch => {
  console.log(data)
  try {
    await RunMatter.post(`/admin/profile_update`, data)
    dispatch({
      type: type == "name" ? UPDATE_NAME : UPDATE_PASSWORD,
      payload: type == "name" ? data.name : data.password
    })
  } catch (err) {
    console.log(err)
    dispatch({});
  }
};

export const getDashboard = (id) => async dispatch => {
  try {
    await RunMatter.get(`/admin/all_rating/${id}`)
      .then(res => {
        dispatch({
          type: GET_DASHBOARD,
          payload: res.data.data
        });
      })
  } catch (err) {
    console.log(err)
  }
};

export const uploadImage = (data) => async dispatch => {
  return RunMatter.post(`/admin/profile_img_update`, data, { headers: { "Content-Type": "multipart/form-data" }, })
};
export const deleteService = (data) => async dispatch => {
  return RunMatter.post(`/user/delete_provider_service`, data)
};

export const saveLocation = (data) => async dispatch => {
  return RunMatter.post(`/admin/update_latlog`, data)
};

export const getCurrentBooking = (id) => async dispatch => {
  try {
    await RunMatter.post(`/admin/current_bookings`, { user_id: id })
      .then(res => {
        dispatch({
          type: GET_CURRENT_BOOKING,
          payload: res.data.data
        });
      })
  } catch (err) {
    console.log(err)
  }
};

export const cancelBooking = data => async dispatch => {
  return RunMatter.post(
    `/admin/delete_current_bookings`,
    data,
    {
      headers: {
        Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
        Accept: 'application/json',
      },
    },
  )
};

export const acceptRequest = (data) => async dispatch => {
  return RunMatter.post(`/admin/accept_booking`, data)
};

export const sendNotification = (data) => async dispatch => {
  console.log(data)
  return axios.post('https://fcm.googleapis.com/fcm/send', {
    notification: {
      title: data.title,
      body: data.body
    },
    to: `/topics/${data.id}c`
  }, {
    headers: {
      "Authorization": "key=AAAARbywfVg:APA91bGd_t3A4X5BBoKJ0k2LN4wJz1yIO04YnVCw4Q1deDgV0B0prSruTK3p7y92_Lg9-wr35JTnKff5zbYaMArvhPlfPSlKbkWoTrLUrPRTmdvxcXQ793HkKKevpM_E1LAuB1jZUZJ9",
      "content-Type": "application/json"
    }
  }).then(res => console.log(res.data))
};

export const getWallet = (id) => async dispatch => {
  try {
    await RunMatter.post(`/admin/show_balance`, { user_id: id })
      .then(res => {
        dispatch({
          type: GET_WALLET,
          payload: res.data.data
        });
      })
  } catch (err) {
    console.log(err)
  }
};

export const getAllBooking = (data) => async dispatch => {
  try {
    await RunMatter.post(`/admin/all_bookings`, data)
      .then(res => {
        dispatch({
          type: GET_ALL_BOOKING,
          payload: res.data
        });
      })
  } catch (err) {
    console.log(err)
  }
};


export const buyCredits = (data, token) => async dispatch => {
  console.log(data);
  try {
    const response = await RunMatter.post(`/admin/wallet`, data)
    console.log("dfasdf", response.data)
    dispatch({
      type: "addWallet",
      payload: data?.credit,
    });
  } catch (err) {
    console.log('Buying Credits Failed! ', err);
  }
};

export const getHelpText = () => async dispatch => {
  try {
    const response = await RunMatter.post(`/help`, { role: 3 })
    dispatch({
      type: GET_HELP_TEXT,
      payload: response.data?.data[0]
    });
  } catch (err) {
    console.log('Buying Credits Failed! ', err);
  }
};

export const resetPassword = (data) => async dispatch => {
  return RunMatter.post(`/forgetPassword`, data)
};

export const deleteAccount = (id) => async dispatch => {
  return RunMatter.post(`/user/destroy/${id}`)
};
export const getCard = (id) => async dispatch => {

  try {
    const response = RunMatter.get(`/get_strip_info/${id}`)
    dispatch({
      type: types.GET_CARD,
      payload: response.data
    })
  } catch (error) {
    console.log("errrorrrr", error)
  }
};
export const saveBankDetail = (data, setLoader, navigation, Toast) => async dispatch => {
  console.log(data)
  try {
    const response = await RunMatter.post(`/provider_info`, data)
    console.log(data)
    console.log("bank detail", response)
    Toast.show({
      type: 'success',
      text1: 'Congartulations',
      text2: 'Bank Details Saved Successfully'
    });
    dispatch({
      type: BankAcount,
      payload: response?.data?.data
    })
    setTimeout(() => {
      navigation.navigate("Home")
    }, 2000);

    setLoader(false)
  } catch (error) {
    setLoader(false)
    console.log("errrorrrr", error)
  }
};
export const saveCard = (user_id, custoken) => async dispatch => {

  try {
    const response = RunMatter.post(`/stripe_info_save`, { user_id, custoken, description: "test" })
    dispatch({
      type: types.GET_CARD,
      payload: response.data
    })
  } catch (error) {
    console.log("errrorrrr", error)
  }
};







// export const getCard = (id) => async dispatch => {
//   try {
//     const response = await axios.get(
//       `${apiUrl}/get_strip_info/${id}`,
//       {
//         headers: {
//           Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
//           Accept: 'application/json',
//         },
//       },
//     );
//     dispatch({
//       type: types.GET_CARD,
//       payload: response.data
//     });
//   } catch (error) {
//     // dispatch({})
//     console.log('Fetching Current Bookings Failed: ' + error);
//   }
// };
// export const saveCard = (user_id, custoken) => async dispatch => {
//   return axios.post(`${apiUrl}/stripe_info_save`
//     , { user_id, custoken, description: "test" },
//     {
//       headers: {
//         Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
//         Accept: 'application/json',
//       },
//     })
// };