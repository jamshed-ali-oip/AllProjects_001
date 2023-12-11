import React, {useEffect} from 'react';
import {useAuth} from '@src/@core/contexts/AuthContext';

const GuestGuard = ({navigation, children}) => {
  const {user} = useAuth();

  useEffect(() => {
    if (user) {
      navigation.replace('Home');
    }
  }, [user, navigation]);

  if (user) {
    return null;
  }

  return <>{children}</>;
};

export default GuestGuard;
