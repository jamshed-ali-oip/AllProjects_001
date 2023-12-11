import axios from "axios";
import { Alert } from "react-native";
import { base_URL, base_URL_Muhib } from "../../config/config";
import { LOG_IN, REGISTER, FORGET_PASSWORD, SEND_OTP, LOG_OUT, ID_CARD_IMAGE, FORGET_INNER_PASSWORD, GET_KIFFS_DATA, CONSULT_DATA, RELEVENT, DATA_EMPTY, SET_PAGE_ONE, SET_PAGE_TWO, SET_PAGE_THREE, SET_PAGE_FOUR, PROFILE_IMAGE, GET_EVENTS } from "../const/const";

// ***************************Auth Screen ************************************
export const userLogin = (data, setLoading, setError,refRBSheet) => async (dispatch) => {
  try {
    setLoading(true)
    const response = await axios.post(`${base_URL}/user/login`, data)
    // console.log(response)
    if (response?.data?.data?.success) {
      refRBSheet?refRBSheet.current.close():null
      setTimeout(()=>{
        setLoading(false)
        dispatch({
          type: LOG_IN,
          payload: response?.data?.data
        })
      },200)
    }
  }
  catch (error) {
    setLoading(false)
    setError(true)
    // console.log(error)
  }
};


export const registerUser = (data, setLoading2, setError2, refRBSheet, refRBSheet2,setReminder) => async (dispatch) => {
  //  console.log("register",data)
  try {
    setLoading2(true)
    const response = await axios.post(`${base_URL}/user/register`, data)
    // console.log("register", response.data)
    if (response?.data?.data?.success) {
      setTimeout(()=>{
        refRBSheet.current.open()
      },200)
      
      refRBSheet2.current.close()
      setLoading2(false)
      setTimeout(()=>{
        setReminder(true)
      },300)
    }
  }
  catch (error) {
    setLoading2(false)
    setError2(true)
    // console.log(error)
  }
};

export const forget_Password = (data, setM2, setM3) => async (dispatch) => {
  try {
    const response = await axios.post(`${base_URL}/user/sendotp`, data)
    // console.log(response.data,"khjgjhgkgkjgkg")
    if (response?.data?.data?.success) {
      setM2(false)
      setM3(true)
      dispatch({
        type: SEND_OTP,
        payload: data
      })
    }
  }
  catch (error) {
    // console.log(error)
  }
};

export const forget_Inner_Password = (data, setPage) => async (dispatch) => {
  try {
    const response = await axios.post(`${base_URL}/user/sendotp`, data)
    // console.log(response.data)
    if (response?.data?.data?.success) {
      setPage(4)
      dispatch({
        type: FORGET_INNER_PASSWORD,
        payload: data
      })
    }
  }
  catch (error) {
    console.log(error)
  }
};

export const userVerifyInfo = (data, setpasswordSet) => async () => {
  // console.log("canhbdkjbs csbkj xm ckjs sck b", data)
  try {
    const response = await axios.post(`${base_URL}/user/verfi`, data)
    // console.log(response.data)
    if (response?.data) {
      setpasswordSet(true)
    }
  }
  catch (error) {
    // console.log(error)
  }
};
export const Inner_userVerifyInfo = (data, setPage) => async () => {
  try {
    const response = await axios.post(`${base_URL}/user/verfi`, data)
    // console.log(response.data)
    if (response) {
      setPage(5)
    }
  }
  catch (error) {
    // console.log(error)
  }
};
export const password_Reset = (data, refRBSheet3) => async () => {
  // console.log("passwerd change", data)

  try {
    const response = await axios.post(`${base_URL}/user/confirmpass`, data)
    // console.log("messsg yahan dikha bhai chitooooo", response)
    if (response) {
      // console.log("SUCCESSS")
      // (response?.data?.data?.success)
      refRBSheet3.current.close()
    }
  }
  catch (error) {
    // console.log("erorrrrrrrrrrr", error)
  }
};
export const Inner_password_Reset = (data, setPage) => async () => {
  try {
    const response = await axios.post(`${base_URL}/user/confirmpass`, data)
    if (response?.data?.data?.success) {
      setPage(6)
    }
  }
  catch (error) {
    // console.log("erorrrrrrrrrrr", error)
  }
};

// ************************Profile Side screen ****************************************
export const imageUpload = (data,setReminder) => async (dispatch) => {

  var bodyFormData = new FormData();
  bodyFormData.append('filePush', {
    uri: data.uri,
    type: data.type,
    name: data.fileName

  });

  axios.post(`${base_URL}/uploadImage/?type=user`, bodyFormData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((response) => {
      // console.log(response)
      // setReminder(true)
      dispatch(
        {
          type: ID_CARD_IMAGE,
          payload: response.data
        }
      )
    })
    .catch(err => {
      // console.log("image error")
   
      setReminder(true)
    })

};
export const profileImage = (data) => async (dispatch) => {

  var bodyFormData = new FormData();
  bodyFormData.append('filePush', {
    uri: data.uri,
    type: data.type,
    name: data.fileName

  });

  axios.post(`${base_URL}/uploadImage/?type=user`, bodyFormData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((response) => {
      // console.log(response)
      dispatch(
        {
          type: PROFILE_IMAGE,
          payload: response.data
        }
      )
    })
    .catch(err => {
      // console.log("errr profile image", err.response)
    })

};

export const Delete_User = (id, token) => async (dispatch) => {

  try {
    const response = await axios.delete(`${base_URL}/user/${id}`

    )
    if (response?.data?.data?.success) {
      dispatch({
        type: LOG_OUT
      })

    }
  }
  catch (error) {
    // console.log("deleting", error)
  }
};


export const getKiffsData = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${base_URL}/kiff`)
    if (data?.data?.success) {
      dispatch({
        type: GET_KIFFS_DATA,
        payload: data?.data?.kiffData
      })
    }
  }
  catch (error) {
    // console.log("", error)
  }
};

export const profileUpdate = (data, userId, setPage) => async (dispatch) => {
  try {
    const response = await axios.put(`${base_URL}/user/${userId}`, data)
    // console.log("5data",response?.data?.data)
    // console.log(response)
    if (response?.data?.data) {
      setPage(1)
 
      dispatch({
        type: CONSULT_DATA,
        payload: response?.data?.data.data,
      })
    }
  }
  catch (error) {
    // console.log(error)

  }
};


export const update_First_Page = (userId, body, setPage) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${base_URL}/user/${userId}`, body)
    // console.log(data.data.data)
    if (data?.data?.success) {
      setPage(2)
      dispatch({
        type: SET_PAGE_ONE,
        payload: data.data.data,
      })
    }
  } catch (error) {
    // console.log(error);
  }
}

export const update_Second_Page = (userId, body, setPage) => async (dispatch) => {
  // console.log(body)
  try {
    const { data } = await axios.put(`${base_URL}/user/${userId}`, body)
    // console.log(data)
    if (data?.data?.success) {
      setPage(3)
      dispatch({
        type: SET_PAGE_TWO,
        payload: data.data.data,
      })
    }
  } catch (error) {
    // console.log(error);
  }
}

export const update_Third_Page = (userId, body, setPage) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${base_URL}/user/${userId}`, body)
    // console.log(data)
    if (data?.data?.success) {
      setPage(4)
      dispatch({
        type: SET_PAGE_THREE,
        payload: data.data.data,
      })
    }
  } catch (error) {
    // console.log(error);
  }
}

export const update_Fourth_Page = (userId, body, setPage) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${base_URL}/user/${userId}`, body)
    // console.log(data)
    if (data?.data?.success) {
      setPage(5)
      dispatch({
        type: SET_PAGE_FOUR,
        payload: data.data.data,
      })
    }
  } catch (error) {
    // console.log(error);
  }
}


export const relevant = () => async (dispatch) => {
  try {
    const response = await axios.get(`${base_URL}/revelateur`)
    // console.log("revelaothfklasgk ",response)
    return response
    // if (data?.data?.success){
    //   console.log(response)
    //    dispatch({
    //      type:RELEVENT,
    //     payload:data?.data?.relevant
    //    })
    // }
  }
  catch (error) {
    // console.log("", error)
  }
};

export const Download_verify = (data, setPage, set_Inco_Password) => async (dispatch) => {


  try {
    const response = await axios.post(`${base_URL}/user/consult`, data)
    // console.log(response)
    if (response?.data) {
      // console.log(response)
      setPage(9)

    }
  }
  catch (error) {
    // console.log("erorrrrrrrrrrr", error)
    set_Inco_Password(true)
  }
};

export const Send_link = (data, setPage) => async (dispatch) => {
  console.log("y data", data)
  try {
    const response = await axios.post(`${base_URL}/user/emaillink`, data)
    // console.log(response)
    if (response?.data) {
      // console.log("yahan aja andr", response)
      // setPage(1)
      Alert.alert(
        "Toutes nos félicitations",
        "E-mail envoyé avec succès",
        [
          {
            text: "D'accord",
            onPress: () => setPage(1),
            style: "cancel",
          },

        ],

      );
    }
  }
  catch (error) {
    // console.log("erorrrrrrrrrrr", error)
  }
};
export const ChangesPassword = (data, userId, setError,setmymodal) => async (dispatch) => {
  // console.log("change passweord datat on useraction",data,userId)
  try {
    const response = await axios.put(`${base_URL}/user/changepass/${userId}`, data)
    // console.log(response?.data?.success)

    if (response?.data?.success) {
      // console.log("ok hogya")
      setmymodal(true)
    }
  }
  catch (error) {
    // console.log(error)
    // console.log(error?.response?.data?.message)
    setError(error?.response?.data?.message)

  }
};
export const UserDetail = async (userId)  => {
  try {
    const {data} = await axios.get(`${base_URL}/user/${userId}`)
    // console.log("detaiilsss ",data)
    return data
    // if (data?.data?.success){
    //   console.log(response)
    //    dispatch({
    //      type:RELEVENT,
    //     payload:data?.data?.relevant
    //    })
    // }
  }
  catch (error) {
    // console.log("detailss", error)
  }
};
export const ProfilePictureSet = (userId, body) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${base_URL}/user/${userId}`, body)
    // console.log(data)
    if (data?.data?.success) {
   
   
    }
  } catch (error) {
    // console.log(error);
  }
}

// ******************************events section********************************* 

export const getEvents = () => async (dispatch) => {
  try {
    const response = await axios.get(`${base_URL}/auth/getEvents/?status=published`)
    // console.log("revelaothfklasgk ",response)
    return response
    // if (data?.data?.success){
    //   console.log(response)
    //    dispatch({
    //      type:RELEVENT,
    //     payload:data?.data?.relevant
    //    })
    // }
  }
  catch (error) {
    // console.log("hdfhh", error)
  }
};
export const getEventsByID = async (data) => {
  try {
    const response = await axios.get(`${base_URL}/auth/getEvent/${data}`)
    // console.log("event ka data ",response)
    return response
    // if (data?.data?.success){
    //   console.log(response)
    //    dispatch({
    //      type:RELEVENT,
    //     payload:data?.data?.relevant
    //    })
    // }
  }
  catch (error) {
    // console.log("nhi aya", error)
  }
};
export const Subscribe_Event = (data,userId,setRefetch,) => async (dispatch) => {
  
  // console.log("subscribe data", userId)
 
  try {
    const response = await axios.put(`${base_URL}/auth/subsribeEvent/${data}`,{userId})
    // console.log("subcribe okkk ",response)
    
    if (response?.data) {
      // console.log("yahan aja andr", response)
      
      
    }
  }
  catch (error) {
    // console.log("error for kifff==================", error)
  }
};
export const ProfileChecking = (userId,setPower,setBTN) => async (dispatch) => {
  // console.log(userId)
  try {
    const response = await axios.get(`${base_URL}/user/checkingSteps/${userId}`)
    // console.log("revelaothfklasgk ",response?.data?.success)
   
    if (response?.data?.success){
      setBTN(true)
      // console.log(response)
      
    }
  }
  catch (error) {
    setPower(true)
    // console.log("hdfhh", error)
  }
};
export const Un_Subscribe_Event = (data,userId) => async (dispatch) => {
  
  // console.log("subscribe data", userId)
 
  try {
    const response = await axios.put(`${base_URL}/auth/unSubscribeEvent/${data}`,{userId})
    // console.log("subcribe okkk ",response)
    // if (response?.data) {
    //   console.log("yahan aja andr", response)
      
      
    // }
  }
  catch (error) {
    // console.log("subcribe eerrrr", error)
  }
};    

export const ESPORTCHECK = async (userId)  => {

  try {
    const response = await axios.get(`${base_URL}/user/kiff/${userId}`)
    // console.log("esport response ",response?.data?.data?.isKiff)
    return response?.data?.data?.isKiff
   
  }
  catch (error) {
    // console.log("ESPORTS ERROR", error)
  }
};
// ****************************Home screen***************************** /////////

export const getSubscribedEvents = async (userId)  => {
  try {
    const response = await axios.get(`${base_URL}/auth/getSubscribeEvents/${userId}?status=published`)
    // console.log("revelaothfklasgk ",response)
    return response
    // if (data?.data?.success){
    //   console.log(response)
    //    dispatch({
    //      type:RELEVENT,
    //     payload:data?.data?.relevant
    //    })
    // }
  }
  catch (error) {
    // console.log("hdfhh", error)
  }
};
export const getHistoryofevent = async (userId)  => {
  try {
    const response = await axios.get(`${base_URL}/auth/getSubscribeEvents/${userId}?status=finished`)
    console.log("history  ",response)
    return response
    // if (data?.data?.success){
    //   console.log(response)
    //    
    // }
  }
  catch (error) {
    console.log("hdfhh", error)
  }
};
export const ageVerification = async (userId)  => {
  try {
    const response = await axios.get(`${base_URL}/user/age/${userId}`)
    // console.log("age verification res ",response)
    return response

  }
  catch (error) {
    // console.log("age verification eror ", error)
  }
};

// **********************PUSH NOTIFICATION API && INVITES*****************************

export const FCMUPDATE = (data, userId) => async (dispatch) => {
  try {
    const response = await axios.put(`${base_URL}/fcmTokenUpdate/${userId}`, data)
    // console.log("FCM DATA USER ACTION",response)
    
    if (response?.data?.data) {

    }
  }
  catch (error) {
    // console.log("FCM ERROR",error)

  }
}; 

export const MESINVITES = async (userId) => {
  try {
    const response = await axios.get(`${base_URL}/invitationUser/${userId}`)
    // console.log("MES INVITATION ACTION CLG",response)
    return response

  }
  catch (error) {
    // console.log("Error", error)
  }
};
export const StatusUpdate = (data, inviteId) => async (dispatch) => {
  try {
    const response = await axios.put(`${base_URL}/updateStatus/${inviteId}`, data)
    // console.log("updtae successss",response)
    
    if (response?.data?.data) {

    }
  }
  catch (error) {
    // console.log("uppdate fail",error)

  }
};
export const Stackprofile = (userId,setProfilStatus) => async (dispatch) => {
  // console.log(userId)
  try {
    const response = await axios.get(`${base_URL}/user/checkingSteps/${userId}`)
    // console.log("Stackprofile yahan aja ",response?.data?.success)
   
    if (response?.data?.success){
  
      // console.log("",response)
      setProfilStatus(response?.data)
      
    }
    // setProfilStatus({ ji: "jjjjjjj" })
    
  }
  catch (error) {
    // setPower(true)
    // console.log("Stackprofile", error)
    setProfilStatus(false)
  }
};

// ***********************RDV SCREENS*********************************************** 
export const PendingAppointment = async (userId)  => {
  try {
    const response = await axios.get(`${base_URL}/appointmentByUser/${userId}?status=pending`)
    console.log("PEndingAppointments",response)
    return response
    // if (data?.data?.success){
    //   console.log(response)
    //    
    // }
  }
  catch (error) {
    console.log("err", error)
  }
};
export const AcceptedAppointments = async (userId)  => {
  try {
    const response = await axios.get(`${base_URL}/appointmentByUser/${userId}?status=accepted`)
    console.log("acceptedAppointments",response)
    return response
    // if (data?.data?.success){
    //   console.log(response)
    //    
    // }
  }
  catch (error) {
    console.log("err", error)
  }
};
export const FinishedAppointments = async (userId)  => {
  try {
    const response = await axios.get(`${base_URL}/appointmentByUser/${userId}?status=finished`)
    console.log("finished",response)
    return response
    // if (data?.data?.success){
    //   console.log(response)
    //    
    // }
  }
  catch (error) {
    console.log("err", error)
  }
};
export const DeclineAppointments = async (userId)  => {
  try {
    const response = await axios.get(`${base_URL}/appointmentByUser/${userId}?status=declined`)
    console.log("declined",response)
    return response
    // if (data?.data?.success){
    //   console.log(response)
    //    
    // }
  }
  catch (error) {
    console.log("err", error)
  }
};
export const appointmentStatus = (AppID,data) => async (dispatch) => {
  console.log("AppID", AppID,"status",data)
  try {
    const response = await axios.put(`${base_URL}/appointment/${AppID}`,data)
    console.log("updtae successss",response)
    
    if (response?.data?.data) {

    }
  }
  catch (error) {
    console.log("uppdate fail",error)

  }
};
export const RevREq = (data,setsubmit ) => async (dispatch) => {

  try {
    const response = await axios.post(`${base_URL}/appointmentRequest`, data)
    console.log("requsttttttttttttttttttt",response)
    if (response?.data) {
      setsubmit(true)
    }
  }
  catch (error) {
    console.log("erorrrrrrrrrrr", error)
  }
};
