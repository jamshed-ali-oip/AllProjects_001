import { CONSULT_DATA, FORGET_INNER_PASSWORD, ID_CARD_IMAGE, LOG_IN, LOG_OUT, PROFILE_IMAGE, REGISTER, SEND_OTP, SET_PAGE_FOUR, SET_PAGE_ONE, SET_PAGE_THREE, SET_PAGE_TWO } from '../const/const';




const InitialState = {
  credential: {},
  profileData: [],
  forgetInnerPassData: [],
  consultData: [],
  userInfo: [],
  progress:0.1,
  Tasweer:[],
  Test:false

};

const authReducer = (state = InitialState, action) => {
  // console.log("here",action.type)
  switch (action.type) {
    case LOG_IN:
      console.log(action.payload);
      return {
        ...state,
        credential: action.payload,
      };
    case LOG_OUT:
      console.log(action.payload);
      return {
        credential: {},
      };
    case REGISTER:
      console.log(action.payload);
      return {
        credential: action.payload
      };
    case SEND_OTP:
      console.log(action.payload)
      return {
        ...state,
        credential: action.payload
      }
    case ID_CARD_IMAGE:
      console.log(action.payload)
      return {
        ...state,
        profileData: action.payload
      }
    case FORGET_INNER_PASSWORD:
      console.log(action.payload)
      return {
        ...state,
        forgetInnerPassData: action.payload
      }
    case SET_PAGE_ONE:
      console.log(action.payload);
      return {
        ...state,
        // data: action.payload,
        User: action.payload,
        progress:0.2,
     
      };
    case SET_PAGE_TWO:
      // console.log(action.payload);
      return {
        ...state,
        // data: action.payload,
        User: action.payload,
        progress:0.4,
     
      };
    case SET_PAGE_THREE:
      // console.log(action.payload);
      return {
        ...state,
        // data: action.payload,
        User: action.payload,
        progress:0.6,
   
      };
    case SET_PAGE_FOUR:
      // console.log(action.payload);
      return {
        ...state,
        // data: action.payload,
        User: action.payload,
        progress:0.8,
  
      };
    case CONSULT_DATA:
      return {
        ...state,
        User: action.payload,
        progress:1,
        Test:true

     
      }
      case PROFILE_IMAGE:
        // console.log(action.payload)
        return {
          ...state,
          Tasweer: action.payload
        }
        case "CLOSE":
          return{
            ...state,
            Test:false
          }

    default:
      return state;
  }
};

export default authReducer;
