import React, { createContext, useState, useContext, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthData, authService } from '../services/authService';
import { logAxiosError } from '../helpers/axios';
import { hashPassword } from '../helpers/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState();
  const [loading, setLoading] = useState(true);
  const [loginCredentials, setLoginCredentials] = useState({loginError:null, email:"", password:""})

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData() {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        const _authData = JSON.parse(authDataSerialized);

        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  // sign up
  const register = async (user) => {
    setLoading(true);
    authService
      .register(user)
      .then((response) => {
        setAuthData(response);
        // console.log("This is the response ", response)
        AsyncStorage.setItem('@AuthData', JSON.stringify(response));
      })
      .catch((error) => logAxiosError(error))
      .finally(() => setLoading(false));
  };

  // sign in
  const signIn = async (email, password) => {
    setLoading(true);
    await authService
      .signIn(email, password)
      .then((response) => {
        // console.log("This is the response ",response)
        setLoginCredentials({loginError:null, email:"", password:""})   
        setAuthData(response);
        AsyncStorage.setItem('@AuthData', JSON.stringify(response));
      })
      .catch((error) => {
      setLoginCredentials({loginError:error, email, password})   
      alert(error.message)
      logAxiosError(error)
      })
      .finally(() => setLoading(false));
  };

  // sign out
  const signOut = async () => {
    auth.signOut().then(async () => {
      setAuthData(undefined);
      await AsyncStorage.removeItem('@AuthData');
      await AsyncStorage.removeItem('@ConversationUsersIds');
    }).catch((error) => logAxiosError(error))
  };


  return (
    <AuthContext.Provider
      value={{ authData, loading, loginCredentials, register, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth }