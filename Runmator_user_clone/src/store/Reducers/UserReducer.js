import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_SIGNUP,
  UPDATE_USER_DATA,
  SEEN_WALK_THROUGH,
  ERROR_MODAL,
  WALLET_BALANCE,
  GET_CURRENT_LOC,
} from '../Actions/actionType';

const INITIAL_STATE = {
  coords: null,
  isUserLogin: false,
  isWalkThroughSeen: false,
  userData: null,
  myWallet: '',
  accessToken: '',
  errorModal: {
    status: false,
    title: '',
    msg: '',
    onPress: () => {},
    showLoader: false,
  },
};

export function UserReducer(state = INITIAL_STATE, action) {
  // console.log("=============--=-==--=-=-==-=--=-=-")
  switch (action.type) {
    case GET_CURRENT_LOC:
      return {
        ...state,
        coords: action.payload,
      };

    case USER_SIGNUP:
      return {
        ...state,
        userData: action.payload,
        accessToken: action.payload.token,
        isUserLogin: true,
      };

    case USER_LOGIN:
      return {
        ...state,
        isUserLogin: true,
        ...action.payload,
      };

    case USER_LOGOUT:
      return {
        ...state,
        ...action.payload,
      };

    case SEEN_WALK_THROUGH:
      return {
        ...state,
        ...action.payload,
      };

    case UPDATE_USER_DATA:
      console.log("---------------------------")
      console.log(action.payload)
      return {
        ...state,
        userData: {...action.payload},
      };

    case ERROR_MODAL:
      return {
        ...state,
        errorModal: action.payload,
      };

    case WALLET_BALANCE:
      console.log(action.payload, 'action.payload');
      return {
        ...state,
        myWallet: action.payload,
      };

    default:
      return state;
  }
}
