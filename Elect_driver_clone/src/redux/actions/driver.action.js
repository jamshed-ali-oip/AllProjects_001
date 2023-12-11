import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import { base_URL } from '../../config/config';
// import {LOGIN, REGISTER} from '../const/const';
import * as types from '../const/const';
import instance from '../../config/httpservice';
// *************************** Vehicle Information ************************************
export const VehicleInfoAdd = (data, navigation, setLoading, Toast) => async (dispatch) => {

    try {
        const response = await instance.post(`/vehicle`, data);
        // console.log('error ', response);
        if (response?.data) {
            setLoading(false)
            dispatch({
                type: types.VEHICLE,
                payload: response?.data?.data,
            });
        }
    } catch (error) {
        Toast.show({
            type: 'error',

            text1: error?.response?.data?.message
        })
        setLoading(false)
        console.log('vehilcle info eror', error);
    }

};
// *************************** Vehicle Detail ************************************
export const VehicleCheck = (data) => async (dispatch) => {

    try {
        const response = await instance.get(`/vehicle/verify/detail`, data);
        // console.log('vehicle detail ', response);
        if (response?.data) {
            dispatch({
                type: types.VEHICLE,
                payload: response?.data?.data,
            });
        }
    } catch (error) {
        console.log('vehilcle check info eror', error);
    }

};
// ***************************  Requested Ride************************************
export const RideRequests = async () => {

    try {
        const response = await instance.get(`/ride/requested/ride?status=pending`);
        console.log('Ride Request data ', response);
        return response
    } catch (error) {
        console.log('ride requests eror eror', error);
    }

};
// *************************** request Accept Api ************************************
export const RequestAccept = (data, navigation, setRequest, setLoading) => async (dispatch) => {
    console.log("data", data)
    try {
        const response = await instance.put(`/ride/accepted/${data}`);
        console.log('AcceptRequestData ', response);
        if (response?.data) {
            setLoading(false)
            dispatch({
                type: types.RIDE,
                payload: response?.data?.data,
            });
            navigation.navigate("TrackingUser")
            setRides([])
        }

    } catch (error) {
        setLoading(false)
        console.log('accept Request error', error);
    }

};
// *************************** Arrive Request Api ************************************
export const ArriveRequest = (data, navigation, setLoading) => async (dispatch) => {
    console.log("data", data)

    try {
        const response = await instance.put(`/ride/arrived/${data}`);
        console.log('ArriveRequestData ', response);
        if (response?.data) {
            setLoading(false)
            dispatch({
                type: types.RIDE,
                payload: response?.data?.data,
            });
            navigation.navigate("RideStart")
        }
    } catch (error) {
        setLoading(false)
        console.log('Arrive Request error', error);
    }

};
// *************************** Ride start api ************************************
export const RideStarting = (data, navigation, setLoading) => async (dispatch) => {
    console.log("data", data)
    try {
        const response = await instance.put(`/ride/ridestart/${data}`);
        console.log('RideStartRequestData ', response);
        if (response?.data) {
            setLoading(false)
            dispatch({
                type: types.RIDE,
                payload: response?.data?.data,
            });
            navigation.navigate("RideEnd")
        }
    } catch (error) {
        setLoading(false)
        console.log('RideStart Request error', error);
    }

};
// *************************** Ride End ************************************
export const RideEnding = (data, navigation, setLoading) => async (dispatch) => {
    console.log("data", data)
    try {
        const response = await instance.put(`/ride/rideend/${data}`);
        console.log('RideStartRequestData ', response);
        if (response?.data) {
            setLoading(false)
            dispatch({
                type: types.RIDE,
                payload: response?.data?.data,
            });
            // alert("Ride Ended")
            navigation.navigate("WaitingForPayment")
        }
    } catch (error) {
        setLoading(false)
        console.log('RideStart Request error', error);
    }

};
// *************************** Referal List ************************************
export const ReferenceList = () => async (dispatch) => {

    try {

        const response = await instance.get(`/auth/refer/list`);
        console.log("refence list", response)
        return response

    } catch (error) {
        console.log('referrnce list error', error);
    }
};
// *************************** Chat ID ************************************
export const CHAT_ID = () => async (dispatch) => {

    try {

        const response = await instance.get(`/conversation`);
        console.log("CHatID", response)
        if (response?.data) {
            dispatch({
                type: types.COVERSATION,
                payload: response?.data?.data,
            });
        }
    } catch (error) {
        console.log('CHATID error', error);
    }
};
// *************************** Send Message Api ************************************
export const SendMessage = (data, msg) => async (dispatch) => {
    console.log("SENDMESSAGE", data, msg)
    try {

        const response = await instance.post(`/conversation/message/${data}`, msg);
        console.log("SENDMESSAGE", response)


    } catch (error) {
        console.log('SEND MESSAGE ERROR', error);
    }
};
// *************************** Receive Message api ************************************
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
// *************************** Accheivement Api ************************************
export const Acheivements = () => async (dispatch) => {

    try {

        const response = await instance.get(`/achievements`);
        console.log("Accehvements", response)
        return response

    } catch (error) {
        console.log('achievements  ERROR', error);
    }
};
// *************************** Compliments Api ************************************
export const Compliments = () => async (dispatch) => {

    try {

        const response = await instance.get(`/compliment`);
        console.log("compliment", response)
        return response

    } catch (error) {
        console.log('compliment  ERROR', error);
    }
};
// *************************** Ride Cancel Api ************************************
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
// *************************** Save Cards APi ************************************
export const SavedCards = () => async (dispatch) => {

    try {

        const response = await instance.get(`/invoice/payment-method`);
        console.log("REsponse of card", response)
        return response

    } catch (error) {
        console.log('error of card', error);
    }
};
// *************************** Delete Card Api ************************************
export const DeleteCard = (data) => async (dispatch) => {
    // console.log("RECEIVEMESSAGE", data)
    try {

        const response = await instance.delete(`/invoice/source-delete/${data}`);
        console.log("Card Delete", response)


    } catch (error) {
        console.log('error of card delete', error);
    }
};
// *************************** Wallet Detail Api ************************************
export const WalletDetail = () => async (dispatch) => {
    try {

        const response = await instance.get(`/invoice/check-balance`);
        console.log('wallete user', response);

        return response
    } catch (error) {
        console.log('wallet user error', error);
    }
};
// *************************** Connect Wallet Url ************************************
export const WalletUrl = (navigation) => async (dispatch) => {
    try {

        const response = await instance.post(`/auth/account-link`);
        console.log('wallete URL', response);
        if (response?.data?.data?.accountLink) {
            navigation.navigate("Browser", { data: response?.data?.data?.accountLink?.url })
        }
        // return response
    } catch (error) {
        console.log('wallet URL error', error);
    }
};
// *************************** set default api ************************************
export const DefaultCard = (data, setLoading) => async (dispatch) => {
    // console.log("data", data)
    // setTimeout(() => {
    //   setLoading(false)
    // }, 1000);
    try {

        const response = await instance.post(`/invoice/update/card`, data);
        console.log('Defaut card URL', response);
        if (response) {
            setLoading(false)
        }
        // return response
        // alert("data on")
    } catch (error) {
        setLoading(false)
        // alert("fsmflsjfl")
        console.log('Default card URL error', error);
    }
};
// *************************** Add New card api ************************************
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
// *************************** Ride edit Api ************************************
export const RideEdit = (id, body, navigation, settoggle) => async (dispatch) => {
    // console.log("Donatipn card", data)
    try {

        const response = await instance.put(`/ride/driverstatus/${id}`, body);
        //  alert("okkk")
        if (response) {
            // alert(JSON?.stringify(response?.data?.data?.ride?.status))
            if (response?.data?.data?.ride?.status == "ACCEPTED") {
                settoggle(false)
            } else {
                navigation?.navigate("Home")
            }
            console.log("Response message ***************************************", response)
        }

    } catch (error) {
        alert("nhi hua")
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', error);
    }
};
// *************************** Packages Api ************************************
export const Packages = () => async (dispatch) => {

    try {

        const response = await instance.get(`/subscription`);

        return response?.data?.data
    } catch (error) {

        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', error);
    }
};
export const SubscribedPackages = () => async (dispatch) => {

    try {

        const response = await instance.get(`/subscription/user`);

        return response?.data?.data
    } catch (error) {

        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', error);
    }
};
// *************************** Subcribe Packages Api ************************************
export const Subscribe = (id, Toast) => async (dispatch) => {

    try {

        const response = await instance.post(`/subscription/subscribe/${id}`);
        console.log("Subcribed!!!!!!!!!!!!!!!!!!!!!!!!!!", response?.data)
        Toast.show({
            type: 'success',
            text1: "Package Successfully Subscribed",
            text2: ""
        })
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: error?.response?.data?.message,
            text2: "You have ALready Subscribe to one package"
        })
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', error);
    }
};
export const SubscribePaymentIntent = (id, Toast) => async (dispatch) => {

    try {

        const response = await instance.post(`/invoice/payment_intents`, id);
        console.log("Subcribed!!!!!!!!!!!!!!!!!!!!!!!!!!", response?.data)

    } catch (error) {

        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^', error);
    }
};