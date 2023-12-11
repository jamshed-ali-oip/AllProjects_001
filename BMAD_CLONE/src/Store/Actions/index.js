// @ts-nocheck
import axios from 'axios';
import { api } from '../../Config/Apis.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as types from './actionType';
import { showMessage, hideMessage } from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';

export const postAction =
  (caption, images, id, navigation, clearAllStates, _onPostFailed) =>
    async dispatch => {
      // console.log({
      //   id,
      // });
      var bodyFormData = new FormData();

      if (images) {
        images.forEach((item, i) => {
          bodyFormData.append('post_file', {
            uri: item.path,
            type: item.type,
            name: item.filename || `filename.jpg`,
          });
        });
      }

      // bodyFormData.append('post_file', null)

      bodyFormData.append('user_id', id);
      bodyFormData.append('post_desc', caption);
      bodyFormData.append('post_title', 'Test Title');

      let url = `${api}/api/post/createpost`;
      // console.log(url, "URL");
      fetch(url, {
        method: 'POST',
        body: bodyFormData,
        headers: {
          Accept: 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(res => res.json())
        .then(res => {
          console.log(res, '===============================');
          if (res.success) {
            showMessage({
              message: 'Posted!',
              description: '',
              type: 'success',
            });
            clearAllStates();
          } else {
            _onPostFailed();
            showMessage({
              message: res?.msg,
              description: '',
              danger: 'error',
            });
          }
          // clearAllStates()
        })
        .catch(err => {
          console.log(err, 'ERROR');
          _onPostFailed();
        });

      // axios({
      //   method: 'POST',
      //   url: `https://e95c-110-93-244-255.ngrok-free.app/api/post/createpost`,
      //   data: bodyFormData,
      //   headers: {
      //     Accept: 'application/json, application/xml, text/plain, text/html, *.*',
      //     'Content-Type': 'multipart/form-data',
      //   },
      // })
      //   .then(res => {
      //     console.log(res.data);
      //     if (res.data.success) {
      //       clearAllStates();

      //       showMessage({
      //         message: 'Posted!',
      //         description: '',
      //         type: 'success',
      //       });
      //     } else {
      //       showMessage({
      //         message: 'Failed to Post!',
      //         description: '',
      //         type: 'success',
      //       });
      //       _onPostFailed();
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err, 'ERROR');
      //     _onPostFailed();
      //   });

      // try {

      //   const response = await axios({
      //     method: 'post',
      //     url: `${api}/api/post/createpost`,
      //     data: bodyFormData,
      //     headers: {

      //       Accept: 'application/json',
      //     },
      //   });
      //   console.log(response.data, "response.dataresponse.data");
      //   if (response.data.success) {
      //     clearAllStates();

      //     showMessage({
      //       message: 'Posted!',
      //       description: '',
      //       type: 'success',
      //     });
      //   } else {
      //     showMessage({
      //       message: 'Failed to Post!',
      //       description: '',
      //       type: 'success',
      //     });
      //     _onPostFailed();
      //   }
      // } catch (err) {
      //   _onPostFailed();
      //   console.log('Cannot Post Now, Something went wrong.');
      //   console.log(err.message, "MESSAGE");
      //   // console.log(err.response.data);
      // }
    };

export const nearMeUsers = (latitude, longitude, userId) => async dispatch => {
  // console.log('FETCHING NEAR ME USERS !!!!!!!!!!!!!!!!!!!!!!');
  // console.log(latitude, longitude, userId);
  try {
    const URL = `${api}/api/post/nearMe?kilometers=0.1&user_latitude=${latitude}&user_longitude=${longitude}&user_id=${userId}`;
    // console.log(URL);
    const response = await axios.get(URL);

    // console.log('Total Near Me Users: ', response.data.data.length);
    if (response.data.data.length > 0) {


      // console.log('Near Me Users Fetched!');
      dispatch({
        type: types.NEAR_ME_USERS,
        payload: response.data.data,
      });
    } else {
      // showMessage({
      //   message: 'Oh Snaps!',
      //   description: 'No Users Near You!',
      //   danger: 'error',
      // });
      console.log('No Near Me Users Found!');
      dispatch({
        type: types.NO_NEAR_ME_USERS,
        payload: [],
      });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error',
      // description: '',
      danger: 'error',
    });
    console.log(err.message, 'Failed Fetching Near Me Users.');
  }
};

export const loginUser = (email, password, onLoginFailed) => async dispatch => {
  // console.log(email, password);
  try {
    // console.log(`${api}/api/auth/login`);
    const response = await axios.post(`${api}/api/auth/login`, {
      email: email,
      password: password,
    });
    if (response.data.success) {
      dispatch({
        type: types.USER_GET_INFO,
        payload: {
          token: response.data.token,
          data: response.data.data,
          isLogin: true,
        },
      });
    } else {
      onLoginFailed();
      showMessage({
        message: 'Error',
        description: 'Invalid Credentials!',
        danger: 'error',
      });
      console.log('fail');
    }
  } catch (error) {
    onLoginFailed();

    showMessage({
      message: 'Error',
      description: 'Network Error!',
      danger: 'error',
    });
    console.log('Login Failed', error);
    // console.log('Login Failed', error.message);
  }
};

export const forgotPassword = (data, onSuccess) => async dispatch => {
  try {
    const URL = `${api}/api/auth/forgotpassword`;
    // console.log(URL, data);
    const response = await axios.post(URL, data);
    // console.log(response.data, '==========');
    if (response.data.success) {
      showMessage({
        message: 'Success!',
        description:
          'A reset password verification code has been sent this email.',
        type: 'success',
      });
      onSuccess();
    } else {
      showMessage({
        message: 'Oh Snaps!',
        description: response.data.msg || response.data.message,
        danger: 'error',
      });
    }
  } catch (err) {
    console.log(err);
    showMessage({
      message: 'Oh Snaps!',
      description: 'Network Error',
      danger: 'error',
    });
  }
};

export const verfifyForgotCode = (data, onSuccess) => async dispatch => {
  try {
    const URL = `${api}/api/auth/verifyToken`;
    // console.log(URL, data);
    const response = await axios.post(URL, data);
    // console.log(response.data, '==========');

    if (response.data.success) {
      showMessage({
        message: 'Success!',
        description: 'Code Verified!',
        type: 'success',
      });
      onSuccess();
    } else {
      showMessage({
        message: 'Verification Failed!',
        description: 'Code is not valid.',
        danger: 'error',
      });
    }
  } catch (err) {
    showMessage({
      message: 'Oh Snaps!',
      description: 'Network Error',
      danger: 'error',
    });
    console.log(err);
  }
};

export const resetPassword = (data, onSuccess) => async dispatch => {
  try {
    const URL = `${api}/api/auth/resetPassword`;
    // console.log(URL, data);
    const response = await axios.post(URL, data);

    if (response.data.status || response.data.success) {
      showMessage({
        message: 'Success!',
        description: 'Password has been reset!',
        type: 'success',
      });
      onSuccess();
    } else {
      showMessage({
        message: 'Oh Snaps!',
        description: response?.data?.msg || response?.data?.message,
        danger: 'error',
      });
    }
  } catch (err) {
    showMessage({
      message: 'Oh Snaps!',
      description: 'Network Error',
      danger: 'error',
    });
    console.log(err);
  }
};

export const Otp = (otp, number, fadeChange) => async dispatch => {
  try {
    // console.log(otp)
    if (otp != null) {
      const responseVerify = await axios.get(`${api}/api/auth/verify`, {
        params: {
          phonenumber: number,
          code: otp,
        },
      });
      // console.log(responseVerify.data)
      if (responseVerify.data.message === 'User is Verified!!') {
        dispatch({
          type: types.AUTH_OTP_VERIFY,
          payload: responseVerify.data,
        });
        fadeChange();
      } else {
        showMessage({
          message: 'Error',
          description: 'Wrong OTP',
          danger: 'error',
        });
        // alert("error")
      }
    } else {
      // console.log(number, 'ACTION');
      // let payload = { phonenumber: number, channel: 'sms' };
      const response = await axios.get(`${api}/api/auth/otp`, {
        params: {
          phonenumber: number,
          channel: 'sms',
        },
      });
      // console.log('OTP API RESPONSE');
      if (response.data.message === 'Verification is sent!!') {
        // console.log(response.data.message)
        fadeChange();
        dispatch({
          type: types.AUTH_OTP,
          payload: response.data,
        });
      } else {
        showMessage({
          message: 'Error',
          description: 'Verification Failed',
          danger: 'error',
        });
        // alert("error")
      }
    }
  } catch (err) {
    console.log(err, 'ERROR OTP');
  }
};

export const SignUpStepOne =
  (
    username,
    email,
    phoneNumber,
    password,
    obj,
    gender,
    otp,
    navigation,
    lat,
    long,
    CName,
    CCode
  ) =>
    async dispatch => {
      // console.log(
      //   'From Actions :::: ',
      //   username,
      //   email,
      //   phoneNumber,
      //   password,
      //   obj,
      //   gender,
      //   otp,
      //   'lat:',
      //   lat,
      //   'long:',
      //   long,
      // );
      try {
        const data = {
          user_name: username,
          user_email: email,
          user_password: password,
          user_contact: phoneNumber,
          user_reg_verify_code: otp,
          user_gender: gender,
          user_gender_interest: obj,
          user_latitude: lat,
          user_longitude: long,
          user_lives: CName,
          country_code: CCode
        };

        navigation.navigate('YourInterests');
        dispatch({
          type: types.AUTH_SIGNUP,
          payload: data,
        });
      } catch (error) {
        showMessage({
          message: 'Error',
          description: 'Failed',
          danger: 'error',
        });
        console.log(error);
      }
    };

export const SignOut = id => async dispatch => {
  try {
    messaging()
      .unsubscribeFromTopic('bmad' + id)
      .then(() => {
        console.log('NOTIFICATIONS UNSUBSCRIBED & LOGGING OUT!');
      });
    dispatch({
      type: types.USER_GET_INFO,
      payload: {
        token: null,
        data: null,
        isLogin: false,
      },
    });
    dispatch({
      type: types.RESER_CONNECTIONS,
    });
    dispatch({
      type: types.RESET_MESSAGES,
    });
    dispatch({
      type: types.RESET_NEARME,
    });
    dispatch({
      type: types.RESET_NOTIFICATIONS,
    });
    dispatch({
      type: types.RESET_POSTS,
    });
    // await AsyncStorage.removeItem('token')
    // await AsyncStorage.removeItem('userData')
  } catch (error) {
    console.log(error);
  }
};

export const showNotificationsBadge = () => async dispatch => {
  try {
    dispatch({
      type: types.SHOW_TAB_NOTIFICATIONS_BADGE,
      // payload: totalUnread,
    });
  } catch (err) {
    console.log(err);
  }
};

export const showDrawerConnectionsBadge = showBadge => async dispatch => {
  try {
    dispatch({
      type: types.SHOW_DRAWER_CONNECTIONS_BADGE,
      payload: showBadge,
    });
  } catch (err) {
    console.log(err);
  }
};

export const Interest = interest => async dispatch => {
  try {
    // console.log(interest, "--int--")
    dispatch({
      type: types.USER_INTEREST,
      payload: interest,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Favourite = favourite => async dispatch => {
  try {
    // console.log(favourite, "--fav--")
    dispatch({
      type: types.USER_FAVOURITE,
      payload: favourite,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFeedData = userId => async dispatch => {
  try {
    const response = await axios.get(`${api}/api/post/getfeed?id=${userId}`);
    // console.log(response.data);
    if (response?.data?.success) {
      dispatch({
        type: types.GET_ALL_FEED_DATA,
        payload: response.data.data,
      });
    }
  } catch (err) {
    console.log('Failed Fetching Feed Data!!! ', err);
  }
};

export const coords = (lat, long) => async dispatch => {
  // console.log(lat, long, 'coords  getting new coords ');
  dispatch({
    type: types.USER_COORDS,
    payload: {
      lat: lat,
      long: long,
    },
  });
};

export const SignupAll =
  (userSignup, userFavourite, userInterest, _onSignUpFailed) =>
    async dispatch => {
      try {
        const apiData = {
          user_name: userSignup?.user_name,
          user_email: userSignup?.user_email,
          user_password: userSignup?.user_password,
          user_contact: userSignup?.user_contact,
          user_latitude: userSignup.user_latitude?.toString(),
          user_longitude: userSignup.user_longitude?.toString(),
          country_code: userSignup?.country_code,
          user_lives: userSignup?.user_lives,
          // user_reg_verify_code: userSignup.user_reg_verify_code,
          user_gender: [userSignup?.user_gender],
          user_gender_interest: userSignup?.user_gender_interest?.filter(
            e => e !== '',
          ),
          user_interest: userInterest,
          user_favorite: userFavourite,
          social_login: 'USER_AUTH',
        };
        const URL = `${api}/api/auth/register`;
        // console.log(URL);
        const response = await axios.post(URL, apiData);
        if (response.data.success) {
          dispatch({
            type: types.USER_GET_INFO,
            payload: {
              isLogin: true,
              data: response.data.data,
            },
          });
        } else {
          _onSignUpFailed();
          showMessage({
            message: 'Signup Failed',
            description: response.data.msg,
            danger: 'error',
          });
        }
        // dispatch({
        //   type: types.USER_FAVOURITE,
        //   payload: favourite,
        // });
      } catch (error) {
        _onSignUpFailed();
        showMessage({
          message: 'Signup Failed',
          description: 'Network Error.',
          danger: 'error',
        });
        console.log(error);
        console.log(error.message);
        console.log(error.response.data);
      }
    };

export const likePost = data => async dispatch => {
  try {
    const response = await axios.post(`${api}/api/post/like`, data);
    if (response.data.status) {
      // console.log(response.data);
      dispatch({
        type: types.LIKE_UNLIKE_POST,
        payload: {
          totalLikes: response.data.data.likes,
          post_id: data?.post_id,
        },
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not like post, try again.',
        danger: 'error',
      });
      console.log('fail');
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Something went wrong!',
      danger: 'error',
    });
    console.log('FAILED LIKING POST', error.response.data.message);
  }
};

export const likePostFromScreen = data => async dispatch => {

  try {
    const response = await axios.post(`${api}/api/post/like`, data);
    if (response.data.success) {
      // console.log(response.data, 'Liked from Screeen!!!');
      dispatch({
        type: types.LIKE_POST_FROM_SCREEN,
        payload: {
          totalLikes: response.data.data.likes,
          post_id: data?.post_id,
        },
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not like post, try again.',
        danger: 'error',
      });
      // console.log('fail');
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Something went wrong!',
      danger: 'error',
    });
    console.log('FAILED LIKING POST', error);
  }
};

export const commentOnPost = (data, onSuccess) => async dispatch => {
  try {
    const response = await axios.post(`${api}/api/post/createcomment`, data);
    if (response.data.status) {
      onSuccess();
      showMessage({
        message: 'Comment Posted!',
        // description: 'Something went wrong!',
        type: 'success',
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not comment on post, try again.',
        danger: 'error',
      });
      console.log('fail');
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Something went wrong!',
      danger: 'error',
    });
    console.log('FAILED COMMENTING POST', error);
  }
};

export const getAllCommentsOfPost = postId => async dispatch => {
  try {
    const response = await axios.get(
      `${api}/api/post/comments?post_id=${postId}`,
    );
    if (response.data.status) {
      console.log("________________+++++", response)
      dispatch({
        type: types.GET_POST_COMMENTS,
        payload: response.data.data,
      });
      return response.data.data.reverse()
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not fetch comment of post, swipe down to refresh.',
        danger: 'error',
      });
      console.log('fail');
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not fetch comment of post, swipe down to refresh.',
      danger: 'error',
    });
    console.log('FAILED COMMENTING POST', error);
  }
};

export const saveSocketRef = socketRef => dispatch => {
  dispatch({
    type: types.SAVE_SOCKET_REF,
    payload: socketRef,
  });
};

export const getUserData = (userId, friendId) => async dispatch => {
  try {
    const url = `${api}/api/post/friendData?user_id=${userId}&friend_id=${friendId}`;
    // console.log(url);
    // const url = `${api}/api/auth/userInfo?user_id=${id}`;

    const response = await axios.get(url);

    // console.log(response?.data, 'Response of user data ');
    if (response?.data?.success === true) {
      dispatch({
        type: types.SAVE_NEAR_ME_USER_DATA,
        payload: {
          ...response.data.data,
          // status: response.data.data.status,
        },
      });
    } else {
      console.log('fail');
    }
  } catch (error) {
    console.log('FAILED Getting Bmad User', error?.response?.data);
  }
};

// send request to drink buddy
export const connectUser =
  (data, onSuccess, profileData, _onRequestFialed) => async dispatch => {
    try {
      const response = await axios.post(
        `${api}/api/friends/friendRequest`,
        data,
      );
      // console.log(response.data, 'Response of sending request');
      if (response?.data?.success === true) {
        // console.log('Request Sent');
        showMessage({
          message: 'Offer requested, Wait for your friend to approve.',
          type: 'success',
        });
        onSuccess();
        dispatch({
          type: types.AFTER_SENDING_REQ_FROM_PROFILE,
          payload: profileData,
        });
      } else {
        console.log('Request Sent Not Error in Else');

        showMessage({
          message: 'Ohhh Snap!',
          // description: 'Cann not offer drink at the moment, try again.',
          description: 'Cann not offer drink .You already offered the drink!.',
          danger: 'error',
        });
        console.log('fail');
        _onRequestFialed();
      }
    } catch (error) {
      console.log('Request Sent Not Error in Catch');

      showMessage({
        message: 'Oh Snap!',
        description: 'Can not offer drink at the moment, try again.',
        danger: 'error',
      });
      _onRequestFialed();
      console.log(
        'FAILED CONNECTING USER',
        error?.response?.data,
        error?.response?.data?.message,
      );
    }
  };

export const deductDrinksAfterRequestSent = () => dispatch => {
  dispatch({
    type: types.DEDUCT_DRINK,
  });
};
export const getAllConnections = userId => async dispatch => {
  try {
    const URL = `${api}/api/friends/friendList/${userId}`;
    // console.log(URL);
    const response = await axios.get(URL);
    if (response.data.success) {
      console.log('Connnections Retrieved!!!');
      // console.log('Total Connections: ', response.data.data.length);
      dispatch({
        type: types.GET_ALL_CONNECTIONS,
        payload: response.data.data,
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not fetch connections, swipe down to refresh.',
        danger: 'error',
      });
      console.log('fail');
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not fetch connections, swipe down to refresh.',
      danger: 'error',
    });
    console.log('FAILED Fetching Connections', error);
  }
};

// export const testFunc = userId => async dispatch => {
//   // try {
//   //   const res = await axios.get(`${api}/api/friends/friendList/${userId}`);
//   //   console.log(res.data.data.length, "Length");
//   //   dispatch({
//   //     type: types.TEST,
//   //     pyaload: [],
//   //   });
//   //   console.log("ttetetetettetetete==================================")
//   // } catch (err) {
//   //   console.log(err);
//   // }

//   try {
//     const response = await axios.get(
//       `${api}/api/friends/friendList/${userId}`,
//     );
//     if (response.data.success) {
//       console.log(response.data.status, 'Connections Retrieved!!!');
//       console.log('Total Connections: ', response.data.data);
//       dispatch({
//         type: types.GET_ALL_CONNECTIONS,
//         payload: response.data.data,
//       });
//     } else {
//       showMessage({
//         message: 'Oh Snap!',
//         description: 'Can not fetch Connections, swipe down to refresh.',
//         danger: 'error',
//       });
//     }
//   } catch (error) {
//     showMessage({
//       message: 'Oh Snap!',
//       description: 'Can not fetch Connections, swipe down to refresh.',
//       danger: 'error',
//     });
//     console.log('FAILED Fetching Connections', error.response.data.msg);
//   }

// };
export const getInvites = userId => async dispatch => {
  try {
    const response = await axios.get(
      `${api}/api/friends/pendingList/${userId}`,
    );
    // console.log(response.data);
    if (response.data.success) {
      // console.log(response.data.status, 'Invitations Retrieved!!!');
      // console.log('Total Invitations: ', response.data.data);
      dispatch({
        type: types.GET_INVITATIONS,
        payload: response.data.data,
      });
    } else {
      showMessage({
        message: 'Ohhh Snap!',
        description: 'Can not fetch Invitations, swipe down to refresh.',
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not fetch Invitations, swipe down to refresh.',
      danger: 'error',
    });
    console.log('FAILED Fetching Invitations', error);
  }
};

export const acceptInvite = data => async dispatch => {
  try {
    const response = await axios.post(`${api}/api/friends/acceptFriend`, data);
    console.log("acceptor ", data)
    // console.log(response.data);
    if (response.data.success) {
      // console.log(response.data);
      dispatch({
        type: types.ACCEPT_FRIEND,
        payload: data,
      });
      showMessage({
        message: 'Accepted! now available in your connections.',
        type: 'success',
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not accept connection at the moment, try again!',
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not accept connection at the moment, try again.',
      danger: 'error',
    });
    console.log('FAILED ACCEPTING ', error);
  }
};

export const ignoreInvite = data => async dispatch => {
  try {
    const response = await axios.post(`${api}/api/friends/rejectFriend`, data);
    if (response.data.status) {
      // console.log(response.data);
      dispatch({
        type: types.REJECT_FRIEND,
        payload: data,
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not reject connection at the moment, try again.',
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not reject connection at the moment, try again.',
      danger: 'error',
    });
    console.log('FAILED REJECTING ', error);
  }
};

export const unfriendUserFromProfile =
  (data, _onSuccessOfAction) => async dispatch => {
    // console.log(data, ' api data of unfriend');
    try {
      const response = await axios.post(`${api}/api/friends/unFriend`, data);
      if (response.data.status) {
        // console.log(response.data);
        // dispatch({
        //   type: types.CANCEL_OFFER_FROM_PROFILE,
        //   payload: data,
        // });
        _onSuccessOfAction();
      } else {
        showMessage({
          message: 'Oh Snap!',
          description: 'Can not unfriend connection at the moment, try again.',
          danger: 'error',
        });
      }
    } catch (err) {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not unfriend connection at the moment, try again.',
        danger: 'error',
      });
      console.log('Unable to remove friend from profile');
    }
  };
export const unfriendUser = data => async dispatch => {
  try {
    const response = await axios.post(`${api}/api/friends/unFriend`, data);
    if (response.data.status) {
      // console.log(response.data);
      dispatch({
        type: types.UNFRIEND,
        payload: data,
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not unfriend connection at the moment, try again.',
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not unfriend connection at the moment, try again.',
      danger: 'error',
    });
    console.log('FAILED UNFRIEND', error);
  }
};

export const cancelOfferFromProfile =
  (data, _onSuccessOfAction) => async dispatch => {
    // console.log(data);
    try {
      const response = await axios.post(
        `${api}/api/friends/cancelRequest`,
        data,
      );
      if (response.data.status) {
        showMessage({
          message: 'Offer requested now has been cancelled.',
          // description: 'Offer requested, Wait for his/her approval.',
          type: 'success',
        });
        // dispatch({
        //   type: types.CANCEL_OFFER_FROM_PROFILE,
        // });
        _onSuccessOfAction();
      } else {
        showMessage({
          message: 'Oh Snap!',
          description: 'Can not cancel request at the moment, try again.',
          danger: 'error',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not cancel request at the moment, try again.',
        danger: 'error',
      });
      console.log('FAILED CANCELLING MY REQUEST', error);
    }
  };

export const cancelMyRequestSent = data => async dispatch => {
  try {
    const response = await axios.post(`${api}/api/friends/cancelRequest`, data);
    if (response.data.status) {
      // console.log(response.data);
      dispatch({
        type: types.CANCEL_REQUEST_SENT,
        payload: data,
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not cancel request at the moment, try again.',
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not cancel request at the moment, try again.',
      danger: 'error',
    });
    console.log('FAILED CANCELLING MY REQUEST', error);
  }
};

export const buyMoreDrinks = (data, _closeStripeModal) => async dispatch => {
  try {
    const response = await axios.post(`${api}/api/checout/create`, data);
    // console.log(response);
    if (response.data.success) {
      // console.log(response.data, 'Bought Drinks!!!!!!!');
      dispatch({
        type: types.BUY_DRINKS,
        payload: data.coins,
      });
      showMessage({
        message: 'You buy a drink',
        // description: 'Offer requested, Wait for his/her approval.',
        type: 'success',
      });
      _closeStripeModal();
    } else {
      _closeStripeModal();
      showMessage({
        message: 'Oh Snap!',
        description:
          response.data.msg ||
          response.data.message ||
          'Can not buy drinks at the moment, try again.',
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Failed Buying Drinks!',
      description: 'Network Error',
      error: 'danger',
    });
    console.log('FAILED BUYING DRINKS', error);
    _closeStripeModal();
  }
};

export const saveNearmeUserData = data => async dispatch => {
  try {
    dispatch({
      type: types.SAVE_NEAR_ME_USER_DATA,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getNotifications = userId => async dispatch => {
  try {
    const response = await axios.get(
      `${api}/api/post/getNotification?user_id=${userId}`,
    );
    if (response.data.status) {
      // console.log(response.data.status, 'Notifications Retrieved!!!');
      // console.log('Total Notifications: ', response.data.data.length);
      dispatch({
        type: types.GET_NOTIFICATIONS,
        payload: response.data.data,
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not fetch notifications, swipe down to refresh.',
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not fetch notifications, swipe down to refresh.',
      danger: 'error',
    });
    console.log('FAILED Fetching notifications', error.response.data.msg);
  }
};

export const getPostById = (postId, userId) => async dispatch => {
  try {
    const response = await axios.get(
      `${api}/api/post/getPostById?post_id=${postId}&user_id=${userId}`,
    );
    // console.log(JSON.stringify(response.data,null,2));
    if (response.data.success) {
      // console.log(response.data, 'Post Retrieved!!!');

      dispatch({
        type: types.GET_POST,
        payload: response.data.data,
      });
    } else {
      showMessage({
        message: 'Ohhh Snap!',
        description: 'Can not fetch Post, swipe down to refresh.',
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not fetch Post, swipe down to refresh.',
      danger: 'error',
    });
    console.log('FAILED Fetching Post', error);
  }
};

export const sendMessage = (message, onSuccess) => async dispatch => {
  const url = `${api}/api/messages/addMessage`;
  const response = await axios.post(url, message);
  // console.log(response.data);
  try {
    if (response.data.success) {
      console.log('Messages Sent!!!');

      // dispatch({
      //   type: types.SEND_MESSAGE,
      //   payload: response.data.data,
      // });
      onSuccess(response.data?.data.insertId);
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not send message.',
        danger: 'error',
      });
      console.log('fail');
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not send messagess.',
      danger: 'error',
    });
    console.log('FAILED Sending Messages', error);
  }
};

export const saveCurrentChatObject = currentChatObject => async dispatch => {
  try {
    dispatch({
      type: types.SAVE_CURRENT_CHAT_OBJ,
      payload: {
        // conversationId: currentChatObject?.lastMessage?.conversationId,
        chatPerson: currentChatObject,
        // chatPerson: currentChatObject?.receiver,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getMessages = (data, currentChat) => async dispatch => {
  const url = `${api}/api/messages/${data.sender}/${data.receiver}`;
  // const url = `${api}/api/messages/${messageId}`;
  // console.log(url, ':url');
  const response = await axios.get(url);
  // console.log('Messages Retrieved!!!', response.data.data.length);
  try {
    if (response.data.success) {
      dispatch({
        type: types.GET_ALL_MESSAGES,
        payload: {
          messages: response.data.data.reverse(),
          currentChat: currentChat,
        },
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not fetch messages.',
        danger: 'error',
      });
      console.log('fail');
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not fetch messages.',
      danger: 'error',
    });
    console.log('FAILED Fetching Messages', error);
  }
};

export const getAllConversations = userId => async dispatch => {
  try {
    const URL = `${api}/api/conversation/${userId}`;
    // console.log(URL);
    const response = await axios.get(URL);
    if (response.data.success) {
      console.log('Conversations Retrieved!!!');
      console.log('Total Conversations: ', response.data.data.length);
      dispatch({
        type: types.GET_ALL_CONVERSATIONS,
        payload: response.data.data.map(ele => ({
          ...ele.friend,
          messageId: ele.messageId,
        })),
      });
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not fetch conversations, swipe down to refresh.',
        danger: 'error',
      });
      console.log('fail');
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not fetch conversations, swipe down to refresh.',
      danger: 'error',
    });
    console.log('FAILED Fetching Conversation', error);
  }
};

export const createConversation =
  (apiData, chatPerson, _onSuccess) => async dispatch => {
    const url = `${api}/api/conversation/addConversation`;
    const response = await axios.post(url, apiData);
    try {
      if (response.data.success) {
        dispatch({
          type: types.CONVERSATION_CREATED,
          payload: {
            conversationId: response.data.data.insertId,
            chatPerson: chatPerson,
          },
        });
        // console.log('Conversation created!!!');
        _onSuccess();
      } else {
        showMessage({
          message: 'Oh Snaps!',
          description: 'Can not open conversation at the moment.',
          danger: 'error',
        });
        console.log('fail');
      }
    } catch (error) {
      showMessage({
        message: 'Oh Snaps!',
        description: 'Can not open conversation at the moment.',
        danger: 'error',
      });
      console.log('Can not open conversation at the moment.', error);
    }
  };

export const updateProfile = (data, onSuccess, _onFailed) => async dispatch => {
  try {
    // console.log(data.imageObj, 'data.imageObjdata.imageObjdata.imageObj');
    var formData = new FormData();
    if (data?.imageObj !== null) {
      data.imageObj.map(images => {
        formData.append('post_file', {
          uri: images.path,
          name: images.filename || `filename.jpg`,
          type: images.mime,
        });
        // return {
        //   uri: images.path,
        //   name: images.filename || `filename.jpg`,
        //   type: images.mime,
        // }
      })
      // formData.append('post_file', {
      //   uri: data.imageObj[0].path,
      //   name: data.imageObj[0].filename || `filename.jpg`,
      //   type: data.imageObj[0].mime,
      // });
    } else {
      // console.log('Old image going in api');
    }

    formData.append('user_id', data.user_id);
    formData.append('user_name', data.user_name);
    formData.append('user_contact', data.user_contact);
    formData.append('user_lives', data.user_lives);
    formData.append('country_code', data.country_code);
    formData.append('user_bio', data.user_bio);
    formData.append('user_email', data.user_email);

    console.log("kaduuuuu", formData)
    const URL = `${api}/api/post/editProfile`;
    fetch(URL, {
      method: 'PUT',
      body: formData,
      headers: {
        Accept: 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(res => {
        console.log("looooooooooooooog", res?.data?.User_Images)
        if (res.status) {
          // alert("hogya")
          dispatch({
            type: types.UPDATE_PROFILE,
            payload: {
              user_image:
                res?.data?.User_Images?.length > 0
                  ? res?.data?.User_Images
                  : data.user_image,
              user_contact: data.phone_no,
              user_lives: data.user_lives,
              user_id: data.user_id,
              user_name: data.user_name,
              user_contact: data.user_contact,
              country_code: data.country_code,
              user_phoneCountryCode: data.user_phoneCountryCode,
              user_bio: data.user_bio,
              user_email: data?.user_email
            },
          });
          showMessage({
            message: 'Profile Updated!',
            description: '',
            type: 'success',
          });
          onSuccess();
        } else {
          _onFailed();
          showMessage({
            message: 'Failed to update!',
            danger: 'error',
          });
        }
      })
      .catch(err => {
        console.log(err, 'ERROR');
        _onFailed();
        showMessage({
          message: 'Failed to update!',
          danger: 'error',
        });
      });

    // const URL = `${api}/api/post/editProfile`;
    // const response = await axios.put(URL, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data;',
    //   },
    // });
    // console.log(response, '==========response===========');
    // if (response.data.status === true) {
    //   showMessage({
    //     message: 'Updated Successfully!',
    //     type: 'success',
    //   });

    //   dispatch({
    //     type: types.UPDATE_PROFILE,
    //     payload: {
    //       user_image:
    //         response?.data?.data?.User_Images?.length > 0
    //           ? response?.data?.data?.User_Images[0]
    //           : data.user_image,
    //       user_contact: data.phone_no,
    //       user_lives: data.user_lives,
    //       user_id: data.user_id,
    //       user_name: data.user_name,
    //       user_contact: data.user_contact,
    //       country_code: data.country_code,
    //       user_phoneCountryCode: data.user_phoneCountryCode,
    //     },
    //   });
    //   onSuccess();
    // } else {
    //   _onFailed();
    //   showMessage({
    //     message: 'Failed to update!',
    //     danger: 'error',
    //   });
    // }
  } catch (error) {
    // console.log(error, 'error');
    _onFailed();
    showMessage({
      message: 'Failed to update!, Network Error',
      danger: 'error',
    });
    console.log('Network Error', error.message);
    // console.log('Network Error', error.response.data);
  }
};

export const changePassword = (data, _closeStripeModal) => async dispatch => {
  try {
    const response = await axios.put(`${api}/api/auth/changePassword`, data);
    if (response.data.success) {
      showMessage({
        message: 'Password Changed!',
        type: 'success',
        // description: 'Can not change password at the moment, try again.',
        // danger: 'error',
      });

      _closeStripeModal();
    } else {
      showMessage({
        message: 'Oh Snap!',
        description: response.data.msg,
        danger: 'error',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not change password at the moment, try again.',
      danger: 'error',
    });
    console.log('FAILED Changin Password.', error?.response?.data?.msg);
  }
};

export const updateLocation = apiData => async dispatch => {
  const url = `${api}/api/auth/updateLocation`;
  const response = await axios.put(url, apiData);
  try {
    if (response.data.status || response.data.success) {
      dispatch({
        type: types.USER_COORDS,
        payload: {
          lat: apiData?.user_latitude,
          long: apiData?.user_longitude,
        },
      });
      // console.log('Lcation Updated!!!');
      // _onSuccess();
    } else {
      // showMessage({
      //   message: 'Oh Snaps!',
      //   description: 'Can not update location at the moment.',
      //   danger: 'error',
      // });
      console.log('fail');
    }
  } catch (error) {
    // showMessage({
    //   message: 'Oh Snaps!',
    //   description: 'Can not update location at the moment.',
    //   danger: 'error',
    // });
    console.log(
      'Can not update location at the moment.',
      error?.response?.data,
    );
  }
};

export const acceptInviteFromProfile =
  (data, _onSuccessOfAction) => async dispatch => {
    try {
      const response = await axios.post(
        `${api}/api/friends/acceptFriend`,
        data,
      );
      if (response.data.success) {
        _onSuccessOfAction();
        showMessage({
          message: 'Accepted! now available in your connections.',
          type: 'success',
        });
      } else {
        showMessage({
          message: 'Oh Snap!',
          description: 'Can not accept connection at the moment, try again.',
          danger: 'error',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not accept connection at the moment, try again.',
        danger: 'error',
      });
      console.log('FAILED ACCEPTING ', error);
    }
  };

export const ignoreInviteFromProfile =
  (data, _onSuccessOfAction) => async dispatch => {
    try {
      const response = await axios.post(
        `${api}/api/friends/rejectFriend`,
        data,
      );
      if (response.data.status) {
        showMessage({
          message: 'Friend removed from your connections.',
          type: 'success',
        });
        _onSuccessOfAction();
      } else {
        showMessage({
          message: 'Oh Snap!',
          description: 'Can not reject connection at the moment, try again.',
          danger: 'error',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Oh Snap!',
        description: 'Can not reject connection at the moment, try again.',
        danger: 'error',
      });
      console.log('FAILED REJECTING ', error);
    }
  };

export const appendDataToNotifications = notiData => dispatch => {
  try {
    dispatch({
      type: types.APPEND_DATA_TO_NOTIFICATIONS,
      payload: notiData,
    });
  } catch (err) {
    console.log(err);
  }
};

export const resetTotalUnreadNotificationsCount = () => dispatch => {
  try {
    dispatch({
      type: types.RESET_UNREAD_COUNT,
      payload: 0,
    });
  } catch (err) {
    console.log(err);
  }
};
