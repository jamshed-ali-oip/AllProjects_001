import * as types from './actionType';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import RunMatter from "../../configurations/runMatter"
import Toast from 'react-native-toast-message';
import { apiUrl } from '../../configurations/config';


// Auth Action
export const userSignup = (data, _onSignUpFailed) => async dispatch => {
  console.log('data: ', data);
  if (!data.lat) {
    data.lat = 24.840
    data.lng = 67.124
  }
  try {
    const response = await axios.post(`${apiUrl}/register`, data);
    console.log(response, 'response');
    if (response?.data?.status) {
      dispatch({
        type: types.USER_SIGNUP,
        payload: response?.data?.data,
      });
      console.log('Signuppp Success!!!');
    } else {
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          msg:
            response?.data?.errors?.email[0] ||
            response?.data?.errors?.phone[0] ||
            'Something went wrong.',
          status: true,
          title: 'Sign-Up Failed!',
        },
      });
      _onSignUpFailed();
    }
  } catch (error) {
    console.log("ee", error)
    console.log(
      'CATCH ERROR RESPONSE STATUS: ',
      JSON.stringify(error.response, null, 2),
    );
    _onSignUpFailed();
    if (error.response.data) {
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          msg: 'email or phone no already exist',
          status: true,
          title: 'Sign-Up Failed!',
        },
      });
    } else {
      Toast.show({ type: "error", text1: "No internet connection" })
    }
    // console.log(error?.response?.data?.errors?.email[0])
  }
};

export const userLogin = (data, _onLoginFailed) => async dispatch => {
  console.log("dsbhg", data)
  try {
    console.log('data: ', data);
    const URL = `${apiUrl}/login`;
    const response = await axios.post(URL, data, {
      headers: {
        Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
        Accept: 'application/json',
      }
      // timeout: 10000000
    });
    console.log('-----------', response?.data);
    console.log("**********************", response)
    if (response.data.status) {

      if (response?.data?.data?.role_id == 2) {
        dispatch({
          type: types.USER_LOGIN,
          payload: {
            userData: response?.data?.data,
            accessToken: response.data?.data.token,
          },
        });
      } else {
        dispatch({
          type: types.ERROR_MODAL,
          payload: {
            title: 'Login Failed',
            msg: "Email doesn't match to any client.",
            status: true,
          },
        });
        _onLoginFailed();
      }
    }

    // if (response.data?.data === undefined) {
    //   _onLoginFailed();
    //   dispatch({
    //     type: types.ERROR_MODAL,
    //     payload: {
    //       msg: response.data.msg,
    //       title: 'Login Failed',
    //       status: true,
    //     },
    //   });
    // }
  } catch (error) {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", JSON.stringify(error));
    _onLoginFailed();
    if (error.response.data) {
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          status: true,
          msg: 'Invalid Credentials',
          title: 'Login Failed',
        },
      });
    } else {
      Toast.show({ type: "error", text1: "No internet connection" })
    }

    console.log('Network Error', JSON.stringify(error.message, null, 2));
  }
};

export const setErrorModal = () => dispatch => {
  try {
    dispatch({
      type: types.ERROR_MODAL,
      payload: {
        msg: '',
        title: '',
        status: false,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const user_logout = () => async dispatch => {
  try {
    dispatch({
      type: types.USER_LOGOUT,
      payload: { isUserLogin: false },
    });
  } catch (error) {
    console.log('Network Error');
  }
};

export const is_walk_thorugh_seen = () => async dispatch => {
  try {
    dispatch({
      type: types.SEEN_WALK_THROUGH,
      payload: { isWalkThroughSeen: true },
    });
  } catch (error) {
    console.log('Network Error');
  }
};

// export const updateUserData = userData => async dispatch => {
//   // console.log(userData.username,"----ACtions")
//   try {
//     dispatch({
//       type: types.UPDATE_USER_DATA,
//       payload: {
//         userData: userData,
//       },
//     });
//   } catch (error) {
//     console.log('Failed to update data.');
//   }
// };

export const getAllServices = token => async dispatch => {
  try {
    const res = await axios.get(`${apiUrl}/admin/services`, {
      headers: {
        Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
        Accept: 'application/json',
      },
    });

    if (res?.data?.status) {
      // console.log(JSON.stringify(res.data.data, null, 2), ' services data');
      dispatch({
        type: types.GET_SERVICES,
        payload: res.data.data.filter(ele => ele.services_status === 1),
      });
    }
  } catch (error) {
    console.log('Services Fetching Failed: ' + error.response);
  }
};

export const getUserWalletBalance = (data, token) => async dispatch => {
  try {
    const URL = `https://runmater.com/runmaterAPIs/public/api/public/api/admin/show_balance`;
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
        Accept: 'application/json',
      },
    });
    console.log('1!!!!!1!!!   ', res.data.data);
    if (res.data.status) {
      dispatch({
        type: types.WALLET_BALANCE,
        payload: res.data.data,
      });
    }
  } catch (error) {
    console.log('Wallet Balance Fetching Failed: ' + error.response);
  }
};

export const buyCredits = (data, token) => async dispatch => {
  console.log(data);
  try {
    const response = await axios.post(`${apiUrl}/admin/wallet`, data, {
      headers: {
        Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
        Accept: 'application/json',
      },
    });

    console.log(response.data);
    if (response?.data?.status) {
      dispatch({
        type: types.WALLET_BALANCE,
        payload: data?.credit,
      });
    }
  } catch (err) {
    console.log('Buying Credits Failed! ', err.response.data);
  }
};

export const getCurrentLocation = () => async dispatch => {
  try {
    Geolocation.getCurrentPosition(
      position => {
        // console.log('=====', position);
        dispatch({
          type: types.GET_CURRENT_LOC,
          payload: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  } catch (err) {
    console.log(err);
  }
};

export const requestForService =
  (data, token, _onFailed, _onPressModalSuccessButton) => async dispatch => {
    console.log('DATAAAAAAAAA ', JSON.stringify(data, null, 2));
    // const test = {
    //   lat: 37.4220047,
    //   long: -122.0839995,
    //   radius: 10,
    //   service_id: 11,
    //   user_id: 40,
    // };
    try {
      const response = await axios.post(
        // `${apiUrl}/api/admin/request_for_service`,
        'https://runmater.com/runmaterAPIs/public/api/public/api/admin/request_for_service',
        data,
        {
          headers: {
            Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
            Accept: 'application/json',
          },
        },
      );
      console.log('-------------BOOOKED SERVICE@@@@@@@@@', response, '0000');
      if (response?.data?.status === true) {
        console.log('IF CASE K ANDR AGAYA HAY');
        dispatch({
          type: types.ERROR_MODAL,
          payload: {
            title: 'Service Requested!',
            msg: "Your service request has been initiated, you'll be informed with a notification.",
            status: true,
            onPress: _onPressModalSuccessButton,
          },
        });
      } else {
        console.log(response.data, 'ELSE CASE K ANDR HEYYYYYYYYYYY');
        _onFailed();
        dispatch({
          type: types.ERROR_MODAL,
          payload: {
            title: 'Service Providers Unavailable!',
            msg: "Your desired service has no providers around this location.",
            status: true,
            // onPress: _onPressModalSuccessButton,
          },
        });
      }
    } catch (err) {
      _onFailed();
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          title: 'Request Failed!',
          msg: 'Something went wrong.',
          status: true,
        },
      });
      console.log('Cant Book Service ', err.response.data);
      console.log('Cant Book Service ', err.response.data.message);
    }
  };

export const updateProfile = (data, token, _onFailed, isUpdatingImage) => async dispatch => {
  // console.log(data, '~~~~~~~~~~~~~~~~~~~~~~~'.isUpdatingImage);
  console.log("..................", isUpdatingImage)

  // if (data.image !== undefined && data.image !== null && data.image !== '') {
  //   formData.append('image', {
  //     uri: data.image.uri,
  //     name: data.image.fileName,
  //     type: data.image.type,
  //   });

  // }

  // var formData = new FormData();
  // formData.append('id', data.id);
  // formData.append('name', data.name);
  // formData.append('image', {
  //   // uri: data.image.uri,
  //   uri: 'data:image/jpeg;base64,' + data.image.base64,
  //   name: data.image.fileName,
  //   type: data.image.type,
  // });
  // console.log(data.image.base64)

  // const userData = {
  //   id: data?.id,
  //   image: data.image,
  //   // image: isUpdatingImage ? 'data:image/jpeg;base64,' + data.image.base64 : data.image,

  //   // {
  //   //   name: data.image.name,
  //   //   type: data.image.type,
  //   //   uri: 'data:image/jpeg;base64,' + data.image.base64,
  //   // },
  //   name: data?.name,
  // };
  // formData.append('name',data?.name)
  try {
    // const response = await axios({
    //   method: 'post',
    //   url: `${apiUrl}/admin/profile_img_update`,
    //   data: formData,
    //   headers: {
    //     Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
    //     "Content-Type": "multipart/form-data"
    //   },
    // });

    const formData = new FormData()
    formData.append('user_id', data.id)
    if (isUpdatingImage) {
      formData.append('profile_image', data.file)
    }
    formData.append('name', data.name)

    const data1 = formData
    const response = await RunMatter.post(`/admin/profile_img_update`, data1, { headers: { "Content-Type": "multipart/form-data" }, })

    console.log(
      'RESPONSE =====================',
      JSON.stringify(response?.data.data, null, 2),
    );
    if (response?.data.status) {
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          title: 'Profile Updated!',
          msg: response?.data?.msg,
          status: true,
        },
      });
      console.log('=======', response.data.data);
      dispatch({
        type: types.UPDATE_USER_DATA,
        payload: response.data.data,
      });
    }
    if (!response?.data.status) {
      _onFailed();
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          title: 'Profile Update Failed!',
          msg: 'Something went wrong.',
          status: true,
        },
      });
    }
  } catch (err) {
    _onFailed();
    dispatch({
      type: types.ERROR_MODAL,
      payload: {
        title: 'Profile Update Failed!',
        msg: 'Something went wrong.',
        status: true,
      },
    });
    console.log('Failed Profile Update ', err?.response?.data);
  }
};

export const changePasswordRequest =
  (data, token, _onSuccessChanged, cb) => async dispatch => {
    console.log(data, "Passwords DAta")
    try {
      const URL = `${apiUrl}/admin/profile_update`;
      const authHeader = {
        headers: {
          Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
          Accept: 'application/json',
        },
      };
      console.log(data, './././');
      const response = await axios.post(URL, data, authHeader);
      if (response?.data.status) {
        cb()
        dispatch({
          type: types.ERROR_MODAL,
          payload: {
            title: 'Password Changed Success!',
            msg: response?.data?.msg,
            status: true,
          },
        });
        _onSuccessChanged();
      }
      if (!response?.data.status) {
        cb()
        dispatch({
          type: types.ERROR_MODAL,
          payload: {
            title: 'Password Change Failed!',
            msg: 'Something went wrong.',
            status: true,
          },
        });
      }
    } catch (err) {
      console.log(err.response.data);
      cb()
      dispatch({
        type: types.ERROR_MODAL,
        payload: {
          title: 'Password Change Failed!',
          msg: 'Something went wrong.',
          status: true,
        },
      });
    }
  };

export const getCurrentBookings = data => async dispatch => {
  try {
    const response = await axios.post(
      `${apiUrl}/admin/current_bookings`,
      data,
      {
        headers: {
          Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
          Accept: 'application/json',
        },
      },
    );
    console.log(response.data.data);
    if (response.data.status) {
      dispatch({
        type: types.GET_CURRENT_BOOKINGS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    console.log('Fetching Current Bookings Failed admin: ' + error);
  }
};

export const saveLocation = data => async dispatch => {
  return axios.post(
    `${apiUrl}/admin/update_latlog`,
    data,
    {
      headers: {
        Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
        Accept: 'application/json',
      },
    },
  )
};



export const getMechanics = data => async dispatch => {
  console.log("my body", data)
  try {
    const response = await axios.post(
      `${apiUrl}/admin/request_for_service`,
      data,
      {
        headers: {
          Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
          Accept: 'application/json',
        },
      },
    );
    if (response.data.status) {
      console.log("koi masla araha ", response)
      dispatch({
        type: types.GET_MECHANICS,
        payload: response.data.data,
      });
    }
  } catch (error) {
    // dispatch({})
    console.log('Fetching Current Bookings Failed mechanic: ' + JSON.stringify(error));
  }
};


export const sendRequest = data => async dispatch => {
  return axios.post(
    `${apiUrl}/admin/send_request_service`,
    data,
    {
      headers: {
        Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
        Accept: 'application/json',
      },
    },
  )
};


export const getCurrentBooking = data => async dispatch => {
  try {
    const response = await axios.post(
      `${apiUrl}/admin/current_bookings`,
      data,
      {
        headers: {
          Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
          Accept: 'application/json',
        },
      },
    );
    if (response.data.status) {
      dispatch({
        type: types.GET_CURRENT_BOOKING,
        payload: response.data.data,
      });
    }
  } catch (error) {
    // dispatch({})
    console.log('Fetching Current Bookings Failed curent: ' + error);
  }
};

export const cancelBooking = data => async dispatch => {
  return axios.post(
    `${apiUrl}/admin/delete_current_bookings`,
    data,
    {
      headers: {
        Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
        Accept: 'application/json',
      },
    },
  )
};

export const completeBooking = data => async dispatch => {
  return axios.post(
    `${apiUrl}/admin/complete_booking`,
    data,
    {
      headers: {
        Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
        Accept: 'application/json',
      },
    },
  )
};
export const sendNotification = (data) => async dispatch => {
  console.log('ddd', data)
  return axios.post('https://fcm.googleapis.com/fcm/send', {
    "notification": {
      "title": data.title,
      "body": data.body
    },
    "to": `/topics/${data.id}p`
  }, {
    headers: {
      "Authorization": "key=AAAARbywfVg:APA91bGd_t3A4X5BBoKJ0k2LN4wJz1yIO04YnVCw4Q1deDgV0B0prSruTK3p7y92_Lg9-wr35JTnKff5zbYaMArvhPlfPSlKbkWoTrLUrPRTmdvxcXQ793HkKKevpM_E1LAuB1jZUZJ9"
    }
  })
};


export const getAllBooking = data => async dispatch => {
  try {
    const response = await axios.post(
      `${apiUrl}/admin/all_bookings`,
      data,
      {
        headers: {
          Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
          Accept: 'application/json',
        },
      },
    );
    dispatch({
      type: types.GET_ALL_BOOKING,
      payload: response.data,
    });
  } catch (error) {
    // dispatch({})
    console.log('Fetching Current Bookings Failed all booking: ' + error);
  }
};


export const submitRating = data => async dispatch => {
  return axios.post(
    `${apiUrl}/booking_rating`,
    data,
    {
      headers: {
        Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
        Accept: 'application/json',
      },
    },
  )
};

export const getHelpText = () => async dispatch => {
  try {
    const response = await axios.post(
      `${apiUrl}/help`,
      { role: 2 },
      {
        headers: {
          Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
          Accept: 'application/json',
        },
      },
    );
    dispatch({
      type: types.GET_HELP_TEXT,
      payload: response.data?.data[0],
    });
  } catch (error) {
    // dispatch({})
    console.log('Fetching Current Bookings Failed get help: ' + error);
  }
};

export const resetPassword = (data) => async dispatch => {
  console.log("reset password", data)
  try {
    return axios.post(
      `${apiUrl}/forgetPassword`,
      data,
      {
        headers: {
          Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
          Accept: 'application/json',
        },
      },

    )


  } catch (error) {
    console.log("error: ", error)
  }
};
export const deleteAccount = (id) => async dispatch => {
  return RunMatter.post(`/user/destroy/${id}`)
};
export const saveCard = (user_id, custoken) => async dispatch => {
  return axios.post(`${apiUrl}/stripe_info_save`
    , { user_id, custoken, description: "test" },
    {
      headers: {
        Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
        Accept: 'application/json',
      },
    })
};

export const getCard = (id) => async dispatch => {
  try {
    const response = await axios.get(
      `${apiUrl}/get_strip_info/${id}`,
      {
        headers: {
          Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
          Accept: 'application/json',
        },
      },
    );
    dispatch({
      type: types.GET_CARD,
      payload: response.data
    });
  } catch (error) {
    // dispatch({})
    console.log('Fetching Current Bookings Failed get card: ' + error);
  }
};
export const RequestPayment = (data, setPaymentDone, setModalVisible) => async dispatch => {

  console.log("body showing", data)
  try {
    const response = await axios.post(
      `${apiUrl}/admin/payment_request`, data,

      {
        headers: {
          Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
          Accept: 'application/json',
        },
      },
    );
    console.log("response of payment", response)
    if (response?.data?.data) {
      setModalVisible(false),
        setPaymentDone(true)
    }
  } catch (error) {

    console.log('Fetching payment Failed request Payment: ' + JSON.stringify(error));
  }
};
