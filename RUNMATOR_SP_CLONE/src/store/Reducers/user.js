import {LOG_IN, UPDATE_NAME, UPDATE_PASSWORD} from '../Actions/type';

const initialState = {date:{}};

export default function authRed(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      // console.log(action.payload,"authred")
      return action.payload;
    case "change_aval":
      return {...state,data:{...state.data,availability:action.payload}}
      case UPDATE_PASSWORD:
        return {...state,data:{...state.data,password:action.payload}}
        case UPDATE_NAME:
          return {...state,data:{...state.data,name:action.payload}}
        case "uploadImage":
          return {...state,data:{...state.data,profile_image:action.payload}}
    default:
      return state;
  }
}
