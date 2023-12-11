// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from '../configs/auth'

import AuthServices from '../services/AuthServices'

const steps = [
  {
    title: 'Create Account',
    subtitle: 'Add Persnol Details'
  },
  {
    title: 'Create Company',
    subtitle: 'Add Company Details'
  },
  {
    title: 'Subscriptions',
    subtitle: 'Pick a plan that works best for you'
  }
]

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve(),
  createAccount: () => Promise.resolve(),
  profileUpdate: () => Promise.resolve(),
  createCompany(body, errorCallback) { },
  // Signup related
  activeStep: 0,
  steps,
  handleBack: () => Promise.resolve(),
  handleNext: () => Promise.resolve(),
  handleReset: () => Promise.resolve(),

  // API status
  status: 'idle',
  // @ts-ignore
  setStatus: () => ''
}

const AuthContext = createContext(defaultProvider)


const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [userTmp, setUserTmp] = useState(defaultProvider.user)
  const [accessTokenTmp, setAccessTokenTmp] = useState('')
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [status, setStatus] = useState('idle')
  const [isInitialized, setIsInitialized] = useState(defaultProvider.isInitialized)
  const [activeStep, setActiveStep] = useState(defaultProvider.activeStep) // signup step form

  // ** Hooks
  // const router = useRouter()

  // useEffect(() => {
  //   const initAuth = async () => {
  //     setLoading(true)

  //     // const ddd = window.localStorage.getItem(authConfig.storageTokenKeyName)
  //     // console.log('====================================');
  //     // console.log("initAuth", ddd);
  //     // console.log('====================================');
  //     // AuthServices.me()
  //     //   .then((data) => {
  //     //     console.log('====================================');
  //     //     console.log("initAuth", data);
  //     //     console.log('====================================');
  //     //   })
  //     //   .catch((error) => {
  //     //     console.log('====================================');
  //     //     console.log("initAuth", error.response);
  //     //     console.log('====================================');
  //     //   })

  //     setIsInitialized(true)

  //     const accessToken = AsyncStorage.getItem(authConfig.storageTokenKeyName)
  //     const refreshToken = AsyncStorage.getItem(authConfig.refreshTokenKeyName)
  //     const user = JSON.parse(AsyncStorage.getItem('userData') || '{}')

  //     // console.log('====================================');
  //     // console.log(user);
  //     // console.log('====================================');
  //     // console.log(accessToken);
  //     // console.log('====================================');
  //     // console.log(refreshToken);
  //     // console.log('====================================');

  //     if (accessToken && refreshToken && user) {
  //       saveLogin({ accessToken, refreshToken, user })
  //     }

  //     //   if (storedToken) {
  //     //     setLoading(true)
  //     //     await axios
  //     //       .get(authConfig.meEndpoint, {
  //     //         headers: {
  //     //           Authorization: storedToken
  //     //         }
  //     //       })
  //     //       .then(async response => {
  //     //         setLoading(false)
  //     //         setUser({ ...response.data.userData })
  //     //       })
  //     //       .catch(() => {
  //     //         localStorage.removeItem('userData')
  //     //         localStorage.removeItem('refreshToken')
  //     //         localStorage.removeItem('accessToken')
  //     //         setUser(null)
  //     //         setLoading(false)
  //     //       })
  //     //   } else {
  //     //   }
  //     setLoading(false)
  //   }
  //   initAuth()
  // }, [])

  // const handleLogin = (params, errorCallback) => {
  //   setStatus('pending')
  //   AuthServices.login(params)
  //     .then(async ({ data: response }) => {
  //       // console.log('==========Login data================')
  //       // console.log(response)
  //       // console.log('====================================')

  //       saveLogin({
  //         accessToken: response.data.tokens.accessToken || '',
  //         refreshToken: response.data.tokens.refreshToken || '',
  //         user: response.data.user
  //       })
  //       setStatus('success')
  //     })
  //     .catch(error => {
  //       setStatus('error')
  //       if (errorCallback) errorCallback(error.response?.data)
  //     })
  // }

  // const handleProfileUpdate = (id, body, errorCallback) => {
  //   setStatus('pending')
  //   AuthServices.profileUpdate(id, body)
  //     .then(async ({ data: response }) => {
  //       console.log('==========Profile data================')
  //       console.log(response)
  //       console.log('====================================')

  //       // saveLogin({
  //       //   accessToken: response.data.tokens.accessToken || '',
  //       //   refreshToken: response.data.tokens.refreshToken || '',
  //       //   user: response.data.user
  //       // })
  //       setStatus('success')
  //     })
  //     .catch(error => {
  //       setStatus('error')
  //       if (errorCallback) errorCallback(error.response?.data)
  //     })
  // }

  // const handleLogout = () => {
  //   setUser(null)
  //   setIsInitialized(false)
  //   window.localStorage.removeItem('userData')
  //   window.localStorage.removeItem(authConfig.storageTokenKeyName)
  //   window.localStorage.removeItem(authConfig.refreshTokenKeyName)
  //   // router.push('/login')
  // }

  // const handleRegister = (params, errorCallback) => {
  //   axios
  //     .post(authConfig.registerEndpoint, params)
  //     .then(res => {
  //       if (res.data.error) {
  //         if (errorCallback) errorCallback(res.data.error)
  //       } else {
  //         handleLogin({ email: params.email, password: params.password })
  //       }
  //     })
  //     .catch((err) => (errorCallback ? errorCallback(err) : null))
  // }

  // const handleCreateAccount = async (body, errorCallback) => {
  //   setStatus('pending')
  //   delete body.confirm_password
  //   delete body.API_ERROR
  //   try {
  //     const { data } = await AuthServices.signup(body)

  //     setUserTmp(data.data.user)
  //     setAccessTokenTmp(data.data.tokens.accessToken)

  //     window.localStorage.setItem(authConfig.storageTokenKeyName, data.data.tokens.accessToken)

  //     setStatus('success')
  //     handleNext()
  //   } catch (error) {
  //     setStatus('error')
  //     toast.error(error?.response?.data?.message || 'Something went wrong!')
  //     if (errorCallback) errorCallback(error?.response?.data)
  //   }
  // }

  // const handleCreateCompany = async (body, errorCallback) => {
  //   delete body.API_ERROR
  //   setStatus('pending')
  //   try {
  //     const { data } = await CompanyServices.add(body, {
  //       Authorization: `Bearer ${accessTokenTmp}`
  //     })
  //     // console.log('====================================')
  //     // console.log(accessTokenTmp)
  //     // console.log(data.data.company)
  //     // console.log('====================================')

  //     // saveLogin({
  //     //   accessToken: accessTokenTmp || "",
  //     //   refreshToken: accessTokenTmp || "",
  //     //   user: userTmp
  //     // })
  //     setStatus('success')
  //     handleNext()
  //   } catch (error) {
  //     setStatus('error')
  //     toast.error(error?.response?.data?.message || 'Something went wrong!')
  //     if (errorCallback) errorCallback(error?.response?.data)
  //   }
  // }

  // // Handle Stepper Back
  // const handleBack = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep - 1)
  // }

  // // Handle Stepper Next
  // const handleNext = () => {
  //   setActiveStep(prevActiveStep => prevActiveStep + 1)
  //   if (activeStep === steps.length - 1) {
  //     toast.success('Form Submitted')
  //   }
  // }

  // // Handle Stepper Reset all process
  // const handleReset = () => {
  //   setActiveStep(0)
  // }

  // const saveLogin = ({ accessToken, refreshToken, user }) => {
  //   // save token in localStorage
  //   window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
  //   window.localStorage.setItem(authConfig.refreshTokenKeyName, refreshToken)

  //   // const returnUrl = router.query.returnUrl

  //   setUser(user)
  //   window.localStorage.setItem('userData', JSON.stringify(user))

  //   // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : router.asPath

  //   // router.replace(redirectURL)
  // }

  const values = {
    user,
    loading,
    // activeStep,
    steps,
    // setUser,
    // setLoading,
    isInitialized,
    // setIsInitialized,
    // login: handleLogin,
    // logout: handleLogout,
    // register: handleRegister,
    // createAccount: handleCreateAccount,
    // createCompany: handleCreateCompany,
    // profileUpdate: handleProfileUpdate,
    // handleBack,
    // handleNext,
    // handleReset,
    status,
    // setStatus
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default { AuthContext, AuthProvider }
