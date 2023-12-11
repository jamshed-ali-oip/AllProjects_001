import * as types from './actionType';
import axios from 'axios';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {apiUrl} from '../../config/config';

// Auth Action

export const userLogin =
  (email, password, _onLoginFailed) => async dispatch => {
    try {
      let data = {
        email: email,
        password: password,
      };
      // console.log('data: ', data);
      const URL = `${apiUrl}/login`;
      console.log(URL);
      const response = await axios.post(URL, data);
      // console.log('-----------', response?.data);
      if (response.data.success) {
        // console.log('....');
        dispatch({
          type: types.USER_LOGIN,
          payload: {
            userData: response?.data?.data,
            accessToken: response.data?.data.token,
          },
        });
      } else {
        showMessage({
          message: 'Login Failed!',
          description: 'Invalid Credentials.',
          danger: 'error',
        });
        _onLoginFailed();
      }
    } catch (error) {
      // _onLoginFailed();
      showMessage({
        message: 'Network Failure!',
        description: 'Check Internet Connection.',
        danger: 'error',
      });
      console.log('Network Error', error.message);
      _onLoginFailed();
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
    });
  } catch (error) {
    console.log('Network Error');
  }
};

export const is_walk_thorugh_seen = () => async dispatch => {
  try {
    dispatch({
      type: types.SEEN_WALK_THROUGH,
      payload: {isWalkThroughSeen: true},
    });
  } catch (error) {
    console.log('Network Error');
  }
};

export const getTotalInvestmentAndEarning = (data, token) => async dispatch => {
  try {
    const URL = `${apiUrl}/count`;
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    if (res.data.success) {
      dispatch({
        type: types.GET_INVEST_EARN,
        payload: res.data.data,
      });
    }
  } catch (error) {
    console.log('Investments and Earnings Fetching Failed: ' + error.message);
    console.log('Investments and Earnings Fetching Failed: ' + error);
  }
};

export const getSubscriptionRequests =
  (accessToken, pageNo) => async dispatch => {
    try {
      // const URL = `${apiUrl}/getAllSubscribeCustomer`;
      const response = await axios.get(
        `${apiUrl}/getAllSubscribeCustomer?page=${pageNo}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data.success) {
        const arrayy = response.data.data.data;
        // console.log(JSON.stringify(arrayy[0], null, 2));
        // console.log(response.data.data.last_page, 'last page');
        dispatch({
          type: types.GET_SUBSCRIPTION_REQUESTS,
          payload: {
            array: arrayy,
            last_page: response?.data?.data?.last_page,
          },
        });
      } else {
        showMessage({
          message: 'No Subscription Requests Found!',
          danger: 'error',
        });
      }
    } catch (err) {
      showMessage({
        message: 'Network Failure!',
        danger: 'error',
      });

      console.log('Subscription Requests Fetching Failed: ' + err.message);
      console.log('Subscription Requests Fetching Failed: ' + err);
    }
  };

export const getUserInvoices = (data, token, page) => async dispatch => {
  try {
    const URL = `${apiUrl}/getCustomerInvoice?page=${page}`;
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (res.data.success) {
      const arrayy = res?.data?.data?.data;
      console.log(arrayy.length, 'length');
      console.log(
        res?.data?.data?.current_page,
        'Api Page ',
        page,
        ' my sent page',
      );
      dispatch({
        type: types.GET_INVOICES,
        payload: {
          array: arrayy,
          last_page: res?.data?.data?.last_page,
        },
      });
      // alert(res?.data?.data?.last_page)
    }
  } catch (error) {
    console.log('Invoices Fetching Failed: ' + error.message);
  }
};

export const getAdminInvoices = (data, token, pageNo) => async dispatch => {
  try {
    const URL = `${apiUrl}/getInvoice?page=${pageNo}`;
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (res.data.success) {
      const arrayy = res?.data?.data?.data;
      dispatch({
        type: types.GET_INVOICES,
        payload: {
          array: arrayy,
          last_page: res?.data?.data?.last_page,
        },
      });
    }
  } catch (error) {
    console.log('Invoices Fetching Failed: ' + error.message);
  }
};

export const getInvoicesByEmail = (data, token) => async dispatch => {
  try {
    const URL = `${apiUrl}/getInvoiceEmail`;
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      dispatch({
        type: types.GET_INVOICES,
        payload: {
          array: res.data.data,
          invoiceLastPage: 0,
        },
      });
    } else {
      console.log('=====================');
      showMessage({
        message: 'No Record Found!',
        // description: 'Invalid Cre÷dentials.',
        danger: 'error',
      });
      dispatch({
        type: types.GET_INVOICES,
        payload: [],
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_INVOICES,
      payload: [],
    });
    showMessage({
      message: 'Network Failure!',
      // description: 'Invalid Cre÷dentials.',
      danger: 'error',
    });
    console.log('Invoices Fetching Failed By Email: ' + error.message);
    console.log('Invoices Fetching Failed By Email: ' + error);
  }
};

export const getInvoicesByDate = (data, token) => async dispatch => {
  try {
    const URL = `${apiUrl}/getInvoiceFilter`;
    // alert(JSON.stringify(data))
    const res = await axios.post(
      URL,
      {date: data.start, end: data.end},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    );
    // alert(JSON.stringify(res.data))
    if (res.data.success) {
      dispatch({
        type: types.GET_INVOICES,
        payload: {
          array: res.data.data,
          invoiceLastPage: 0,
        },
      });
    } else {
      showMessage({
        message: 'No Record Found!',
        danger: 'error',
      });
      dispatch({
        type: types.GET_INVOICES,
        payload: [],
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_INVOICES,
      payload: [],
    });
    showMessage({
      message: 'Something went wrong.',
      // description: 'Invalid Cre÷dentials.',
      danger: 'error',
    });
    console.log(
      'Invoices Fetching of Events Failed Catcedddddd: ' + error.message,
    );
  }
};

export const getInvoicesByType = (data, token) => async dispatch => {
  try {
    const URL = `${apiUrl}/getInvoiceType`;
    // console.log(URL);
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (res.data.success) {
      dispatch({
        type: types.GET_INVOICES,
        payload: res.data.data,
      });
    } else {
      console.log('=====================');
      showMessage({
        message: 'No Record Found!',
        danger: 'error',
      });
      dispatch({
        type: types.GET_INVOICES,
        payload: [],
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_INVOICES,
      payload: [],
    });
    showMessage({
      message: 'Network Failure!',
      // description: 'Invalid Cre÷dentials.',
      danger: 'error',
    });
    console.log('Invoices Fetching of Type Failed: ' + error.message);
  }
};

export const getUserProductsArray = (data, token) => async dispatch => {
  try {
    const URL = `${apiUrl}/getUserAgainstType`;
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    if (res.data.success) {
      dispatch({
        type: types.GET_USER_PRODUCT_ARRAY,
        payload: res.data.data?.length > 0 ? res.data.data : [],
      });
    } else {
      showMessage({
        message: 'No Record Found!',
        danger: 'error',
      });
      dispatch({
        type: types.GET_USER_PRODUCT_ARRAY,
        payload: [],
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_USER_PRODUCT_ARRAY,
      payload: [],
    });
    showMessage({
      message: 'Network Failure!',
      // description: 'Invalid Cre÷dentials.',
      danger: 'error',
    });
    console.log('Products array Fetching Failed: ' + error.message);
  }
};

export const getUserProducts = (data, token) => async dispatch => {
  try {
    const URL = `${apiUrl}/getUserAgainstEmail`;
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    // console.log(res.data.data)
    if (res.data.success) {
      dispatch({
        type: types.GET_USER_PRODUCTS,
        payload: res.data.data,
      });
    } else {
      showMessage({
        message: 'No Record Found!',
        danger: 'error',
      });
      dispatch({
        type: types.GET_USER_PRODUCTS,
        payload: [],
      });
    }
  } catch (error) {
    dispatch({
      type: types.GET_USER_PRODUCTS,
      payload: [],
    });
    showMessage({
      message: 'Network Failure!',
      danger: 'error',
    });
    console.log('Products Fetching Failed: ' + error.message);
  }
};

export const updateProfile =
  (data, id, token, onSuccess, _onFailed) => async dispatch => {
    // console.log(data.first_name)
    // console.log(data.last_name)
    // console.log(data.phone)
    // console.log(token);
    try {
      // const FormData = require('form-data');
      // let formData = new FormData();

      // formData.append('first_name', 'Super');
      // formData.append('last_name', 'Admin');
      // formData.append('phone', '+9853843747373');
      // formData.append('status', '1');
      // formData.append('image', {
      //   type: 'image/jpeg',
      //   name: 'profilePicture.jpeg',
      //   uri: data.image.path,
      // });
      const apiData = {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        status: '1',
        image: data.image,
      };

      const URL = `${apiUrl}/update/${id}`;
      const response = await axios.post(URL, apiData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          // 'Content-Type':
          //   'multipart/form-data; boundary=<calculated when request is sent>',
        },
      });
      console.log(apiData, 'apiData');
      console.log(response.data);
      if (response.data.success) {
        showMessage({
          message: 'Updated Successfully!',
          type: 'success',
        });
        dispatch({
          type: types.UPDATE_PROFILE,
          payload: {
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            profile_image: data.image,
          },
        });
        onSuccess();
      } else {
        _onFailed();
        showMessage({
          message: 'Failed to update!',
          danger: 'error',
        });
      }
    } catch (error) {
      // _onLoginFailed();
      _onFailed();
      showMessage({
        message: 'Something went wrong.',
        danger: 'error',
      });
      console.log('Network Error', error.message);
      console.log('Network Error', error.response.data);
    }
  };

export const getCustomers = token => async dispatch => {
  try {
    const URL = `${apiUrl}/getCustomersForReactNative`;
    const res = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    if (res.data.success) {
      console.log('fetched');

      dispatch({
        type: types.GET_CUSTOMERS,
        // payload: res.data.data.filter(ele => {
        //   console.log(ele.role_id,": role_id")
        //   ele?.role_id == 3;
        // }),
        payload: res.data.data,
      });
    }
  } catch (error) {
    console.log('Customers Fetching Failed: ' + error.message);
  }
};

export const changePassword =
  (data, onSuccess, accessToken) => async dispatch => {
    try {
      const response = await axios.post(`${apiUrl}/password-change`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data,"====");
      if (response.data.success) {
        showMessage({
          message:
            response?.data?.message ||
            response?.data?.msg ||
            'Password Changed!',
          type: 'success',
          // description: 'Can not change password at the moment, try again.',
          // danger: 'error',
        });

        onSuccess();
      } else {
        showMessage({
          message: 'Oh Snap!',
          description:
            response?.data?.message ||
            response?.data?.msg ||
            'Can not change password at the moment, try again.',
          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Oh Snap!',
        description:
          error?.response?.data?.message ||
          error?.response?.data?.msg ||
          'Can not change password at the moment, try again.',
        type: 'danger',
      });
      console.log('FAILED Changin Password.', error.response.data);
    }
  };

export const getCredentials = (data, token) => async dispatch => {
  try {
    const URL = `${apiUrl}/userCredentials`;
    const res = await axios.post(URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    // console.log(res.data);
    if (res.data.success) {
      dispatch({
        type: types.GET_CREDENTIALS,
        payload: res.data.data,
      });
    } else {
      showMessage({
        message: 'No Credentials Found!',
        danger: 'error',
      });
      dispatch({
        type: types.GET_CREDENTIALS,
        payload: null,
      });
    }
  } catch (error) {
    showMessage({
      message: 'Network Failure!',
      danger: 'error',
    });

    console.log('Credentials Fetching Failed: ' + error.message);
    console.log('Credentials Fetching Failed: ' + error);
  }
};

export const subscribeProduct = (data, accessToken) => async dispatch => {
  // console.log(data, accessToken);
  try {
    const response = await axios.post(`${apiUrl}/addSubscription`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data.message);

    if (response.data.success === true) {
      console.log(response.data.message, 's========');
      if (response?.data?.message?.localeCompare('Already Subscribe.') === 0) {
        // alert("Test")
        showMessage({
          message: response?.data?.message,
          type: 'danger',
        });
      }
    } else {
      // alert("Test 2")
      showMessage({
        message: response?.data?.message,
        type: 'success',
      });
    }
  } catch (error) {
    showMessage({
      message: 'Oh Snap!',
      description: 'Can not subscribe product at the moment, try again.',
      type: 'danger',
    });
    console.log('FAILED subscribing product.', error.response.data);
  }
};

export const rejectSubscription =
  (data, accessToken, onSuccess) => async dispatch => {
    // console.log(data, accessToken);
    try {
      const response = await axios.post(`${apiUrl}/rejectSubscriber`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.success === true) {
        showMessage({
          message: response?.data?.message || response?.data?.msg,
          type: 'success',
        });
        onSuccess();
      } else {
        showMessage({
          message: response?.data?.message || response?.data?.msg,

          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Oh Snap!',
        description:
          error.response.data.msg ||
          error.response.dat.message ||
          'Network Error',
        type: 'danger',
      });
      console.log('FAILED rejecting product.', error.response.data);
    }
  };

export const acceptSubscription =
  (data, accessToken, onSuccess) => async dispatch => {
    try {
      const response = await axios.post(`${apiUrl}/approveSubscriber`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.success === true) {
        showMessage({
          message: response?.data?.message || response?.data?.msg,
          type: 'success',
        });
        onSuccess();
      } else {
        showMessage({
          message: response?.data?.message || response?.data?.msg,

          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Oh Snap!',
        description:
          error.response.data.msg ||
          error.response.dat.message ||
          'Network Error',
        type: 'danger',
      });
      console.log('FAILED accepting product.', error.response.data);
    }
  };
