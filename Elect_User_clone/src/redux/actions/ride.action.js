import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import { base_URL } from '../../config/config';
// import {LOGIN, REGISTER} from '../const/const';
import * as types from '../const/const';
import instance from '../../config/httpservice';


// *************************** Car Recomaendation ************************************
export const carRecommendations = () => async (dispatch) => {
    try {

        const response = await instance.get(`/recommendation`);
        console.log('car REcommendation', response);
        if (response) {
            return response
        }
    } catch (error) {
        console.log('Car Error', error);
    }
};
// *************************** Request Confirm Ride ************************************
export const confirmRideRequest = (data, navigation, setLoading) => async (dispatch) => {
    try {
        console.log(data);
        const response = await instance.post(`/ride`, data);
        console.log('request ride  response', response);
        if (response.data) {
            setLoading(false)
            dispatch({
                type: types.RIDE,
                payload: response?.data?.data,
            });
            navigation.navigate("WaitingforRider")
        }
    } catch (error) {
        setLoading(false);
        console.log('request ride eroor', error.response.data);
    }
};
// *************************** Secret ID ************************************
export const secretId = (data) => async (dispatch) => {
    try {
        console.log(data);
        const response = await instance.post(`/invoice/payment_intents`, data);
        console.log('secret ride  response', response);
        return response
        // if (response.data) {

        // }
    } catch (error) {
        console.log('secret ride eroor', error);
    }
};
// *************************** Ride information ************************************
export const RideDetail = (data) => async (dispatch) => {
    try {
        console.log("ride idddd ", data);
        const response = await instance.get(`/ride/${data}`);
        console.log("My data world", response)
        if (response.data) {
            dispatch({
                type: types.RIDE,
                payload: response?.data?.data,
            });

        }

    } catch (error) {
        console.log('deatil ride eroor', error);
    }
};
// *************************** Pending Rides ************************************
export const PendingRides = () => async (dispatch) => {
    try {

        const response = await instance.get(`/ride/requested/ride?status=pending`);
        console.log("PendingRides", response)
        return response

    } catch (error) {
        console.log('Pending ride eroor', error);
    }
};
// *************************** Complete Rides ************************************
export const CompletedRides = () => async (dispatch) => {
    try {

        const response = await instance.get(`/ride/requested/ride?status=complete`);
        console.log("complete", response)
        return response

    } catch (error) {
        console.log('complete ride eroor', error);
    }
};
// *************************** Tip APi ************************************
export const TipApi = (data, rideid, navigation, setLoading) => async (dispatch) => {
    try {

        const response = await instance.put(`/ride/tippaid/${rideid}`, data);
        console.log("tip done", response)

        if (response) {
            setLoading(false)
            navigation.navigate("PaymentMthod")
        }

    } catch (error) {
        setLoading(false)
        console.log('tip  eroor', error);
    }
};
// *************************** Feedback api ************************************
export const Review = (data, navigation, setPage, Toast, setLoading) => async (dispatch) => {
    try {

        const response = await instance.post(`/ride/review`, data);
        console.log("Feedback done", response)

        if (response) {
            setLoading(false)
            Toast.show({
                type: 'success',
                text1: 'Thank You for your feedback',
                // text2: 'Please Enter Valid Card Details'
            })
            setTimeout(function () {
                navigation.navigate("Home");
                setPage(true)
            }, 2000);


        }

    } catch (error) {
        setLoading(false)
        console.log('Feedback', error);
    }
};
// *************************** Recent Location ************************************
export const Recentlocation = (data) => async (dispatch) => {
    console.log("data ", data)
    try {

        const response = await instance.post(`/location`, data);
        console.log("Hitting recent location", response)


    } catch (error) {
        console.log('Hitting recent locationeror', error);
    }
};
// *************************** Saved Location ************************************
export const GettingRecentlocation = (data) => async (dispatch) => {
    console.log("data ", data)
    try {

        const response = await instance.get(`/location/my/save`, data);
        console.log("Getting location save", response)
        return response

    } catch (error) {
        console.log('GEtting save Recent location eror', error);
    }
};
// *************************** Fav location ************************************
export const GettingFavlocation = () => async (dispatch) => {
    // console.log("data ", data)
    try {

        const response = await instance.get(`/location/favorite/my`);
        console.log("Getting Fav location", response)
        return response

    } catch (error) {
        console.log('GEtting fav Recent location eror', error);
    }
};
// *************************** Set location fav ************************************
export const StatusUpdateLocation = (data, status) => async (dispatch) => {
    // console.log("data ", data)
    try {

        const response = await instance.put(`/location/${data}`, status);
        console.log("Getting updateFav location", response)
        // return response

    } catch (error) {
        console.log('GEtting fav update location eror', error);
    }
};
// *************************** list of referals ************************************
export const ReferenceList = () => async (dispatch) => {

    try {

        const response = await instance.get(`/auth/refer/list`);
        console.log("refence list", response)
        return response

    } catch (error) {
        console.log('referrnce list error', error);
    }
};
// *************************** CHat ID************************************
export const ChatIDAPI = (data) => async (dispatch) => {
    console.log("dataaaaa", data)
    try {

        const response = await instance.post(`/conversation`, data);
        console.log("CHatID", response)
        if (response?.data?.data) {
            dispatch({
                type: types.COVERSATION,
                payload: response?.data?.data,
            });
        }

    } catch (error) {
        console.log('CHat ID Error', error);
    }
};
// ***************************SEnd Message api ************************************
export const SendMessage = (data, msg) => async (dispatch) => {
    console.log("SENDMESSAGE", data, msg)
    try {

        const response = await instance.post(`/conversation/message/${data}`, msg);
        console.log("SENDMESSAGE", response)


    } catch (error) {
        console.log('SEND MESSAGE ERROR', error);
    }
};
// ***************************Receive Message  ************************************
export const RECEIVE_MESSAGES = (data) => async (dispatch) => {
    console.log("RECEIVEMESSAGE", data)
    try {

        const response = await instance.get(`/conversation/message/${data}`);
        console.log("RECEIVE", response)
        return response

    } catch (error) {
        console.log('RECEIVE MESSAGE ERROR', error);
    }
};

// *************************** Saved cards ************************************
export const SavedCards = () => async (dispatch) => {

    try {

        const response = await instance.get(`/invoice/payment-method`);
        console.log("REsponse of card", response)
        return response

    } catch (error) {
        console.log('error of card', error);
    }
};
// *************************** Delete Cards ************************************
export const DeleteCard = (data) => async (dispatch) => {
    // console.log("RECEIVEMESSAGE", data)
    try {

        const response = await instance.delete(`/invoice/source-delete/${data}`);
        console.log("Card Delete", response)


    } catch (error) {
        console.log('error of card delete', error);
    }
};
// ***************************Add New Card  ************************************
export const AddNewCard = (data, navigation, setLoading) => async (dispatch) => {
    console.log("new card data", data)
    try {
        setLoading
        const response = await instance.post(`/invoice/save-card`, data);
        console.log("add new Card ", response)

        if (response?.data?.data) {
            setLoading(false)
            navigation.navigate("wallet")
        }
    } catch (error) {
        setLoading(false)
        console.log('error of card bnew', error);
    }
};
// *************************** Cancel Ride ************************************
export const RideCancel = (data, navigation) => async (dispatch) => {
    console.log("ride cancel", data)
    try {

        const response = await instance.put(`/ride/cancelled/${data}`);
        console.log("add new Card ", response)
        if (response.data?.data) {
            navigation.navigate("Home")
        }

    } catch (error) {
        console.log('error of ride cancel', error);
    }
};
// *************************** Fund Donation Api ************************************
export const FundDonation = (data, navigation, setdone) => async (dispatch) => {
    console.log("Donatipn card", data)
    try {
        setdone(true)
        const response = await instance.post(`/invoice/fund-donation`, data);
        console.log("Donation ", response)
        if (response.data?.data) {
            setdone(true)
        }

    } catch (error) {
        console.log('error of Donation', error);
    }
};
// *************************** Invoice ************************************
export const PaymentInfo = (data) => async (dispatch) => {
    console.log("Payment", data)
    try {

        const response = await instance.get(`/ride/payment/${data}`);
        console.log("Payment ", response)
        return response

    } catch (error) {
        console.log('error of payment', error);
    }
};
// *************************** Estimated Fare ************************************
export const CaculateFare = (data) => async (dispatch) => {
    console.log("CaculateFare", data)
    try {

        const response = await instance.post(`/ride/calculate/fare`, data);
        console.log("CaculateFare bfg", response)
        if (response?.data?.data) {
            dispatch({
                type: types.CALCULATED_FARE,
                payload: response?.data,
            });
        }

    } catch (error) {
        console.log('error of CaculateFare', error);
    }
};
export const PinReviews = () => async (dispatch) => {
    try {

        const response = await instance.get(`/ride/pin/comments`);
        console.log("pin review", response)
        return response

    } catch (error) {
        console.log('pin review', error);
    }
};
export const Locationupdate = (id, body, setedittoggle) => async (dispatch) => {
    try {

        const response = await instance.put(`/ride/${id}`, body, setedittoggle);
        console.log("updatelocation", response)
        if (response) {
            dispatch({
                type: types.RIDE,
                payload: response?.data?.data,
            });
            // setedittoggle(false)
        }
        return response

    } catch (error) {
        console.log('updatelocation err', error);
    }
};
export const RideDetail2 = (data) => async (dispatch) => {
    try {
        console.log("ride idddd ", data);
        const response = await instance.get(`/ride/${data}`);
        console.log("My data world", response)
        if (response.data) {
            dispatch({
                type: types.RIDE,
                payload: response?.data?.data,
            });

        }
        return response?.data?.data?.ride?.status
    } catch (error) {
        console.log('deatil ride eroor', error);
    }
};