import {combineReducers} from 'redux';
import {UserReducer} from './UserReducer';
import {ServicesReducer} from './ServicesReducer';
import {BookingsReducer} from './BookingsReducer';
import { mechanics } from './mechanics';
import { currentBooking } from './currentBooking';
import { allBooking } from './allBooking';
import { helpText } from './helpText';
import {card} from "./card"

const rootReducer = combineReducers({UserReducer, ServicesReducer,BookingsReducer,mechanics,currentBooking,allBooking,helpText,card});

export default rootReducer;
