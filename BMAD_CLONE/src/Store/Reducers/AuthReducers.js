import {VERIFY_OTP} from '../actions/type';
import {
  AUTH_LOGGED_IN,
  AUTH_LOGOUT,
  AUTH_SIGNUP,
  AUTH_OTP,
  USER_INTEREST,
  USER_FAVOURITE,
  AUTH_ALL_SIGNUP,
  USER_GET_INFO,
} from '../Actions/actionType';
const initialState = {
  isLogin: false,
};
const signupInitialState = null;
const initialInterestState = null;
const initialFavoriteState = null;
const initialStateOfUser = {
  token: null,
  data: null,
};

export function userLogin(state = initialState, action) {
  // console.log("USER LOGIN REDUCER RUNNING")

  switch (action.type) {
    case AUTH_LOGGED_IN:
      return {
        ...action.payload,
        isLogin: true,
      };
    case AUTH_LOGOUT:
      return action.payload;
    default:
      return state;
  }
}

// For Signup Data Get to 3 steps
export function userSignup(state = signupInitialState, action) {
  // console.log("USER SIGNUP REDUCER RUNNING")

  switch (action.type) {
    case AUTH_SIGNUP:
      return action.payload;
    default:
      return state;
  }
}

export function userOtp(state = initialState, action) {
  // console.log("OTP REDUCER RUNNING")
  switch (action.type) {
    case AUTH_OTP:
      return action.payload;
    default:
      return state;
  }
}

export function userOtpVerify(state = initialState, action) {
  // console.log("USER OTP VERIFY REDUCER RUNNING")

  switch (action.type) {
    case AUTH_OTP_VERIFY:
      return action.payload;
    default:
      return state;
  }
}

export function userInterest(state = initialInterestState, action) {
  // console.log("USER INTEREST REDUCER RUNNING")

  switch (action.type) {
    case USER_INTEREST:
      return action.payload;
    default:
      return state;
  }
}

export function userFavourite(state = initialFavoriteState, action) {
  // console.log("USER FAVORITE REDUCER RUNNING")

  switch (action.type) {
    case USER_FAVOURITE:
      return action.payload;
    default:
      return state;
  }
}

export function userAuthSignUp(state = initialStateOfUser, action) {
  // console.log("USER AUTH SIGNUP REDUCER RUNNING")

  switch (action.type) {
    case AUTH_ALL_SIGNUP:
      return action.payload;
    case AUTH_LOGOUT:
      return action.payload;
    default:
      return state;
  }
}
