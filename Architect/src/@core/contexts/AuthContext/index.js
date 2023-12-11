import AsyncStorage from '@react-native-async-storage/async-storage';
import {Services} from '@src/@core/Services/AuthServices';
import Toast from '@src/@core/components/helper/Toast';
import {createContext, useContext, useEffect, useState} from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    init();
  }, []);

  const handleLogin = async (body, navigation) => {
    try {
      const {data} = await Services.login(body);
      if (data?.success) {
        navigation.navigate('Home');
        setUser(data?.data);
        AsyncStorage.setItem(
          'accessToken',
          JSON.stringify(data?.data?.accessToken),
        );
        AsyncStorage.setItem('userData', JSON.stringify(data?.data));
        return data;
      }
    } catch (error) {
      Toast(error?.response?.data?.message);
    }
  };

  const handleLogout = navigation => {
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('userData');
    AsyncStorage.clear();
    setUser(null);
    navigation.navigate('Login');
  };

  const values = {
    handleLogin,
    user,
    handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
