import {useAuth} from '@src/@core/contexts/AuthContext';
import {useEffect} from 'react';

const AuthGuard = ({navigation, children}) => {
  const {user} = useAuth();

  useEffect(() => {
    if (!user) {
      navigation.replace('Login');
    }
  }, [user, navigation]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
