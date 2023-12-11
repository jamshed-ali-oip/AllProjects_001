import {View, Text, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {useState} from 'react';
import {useAuth} from '@src/@core/contexts/AuthContext';
import InputField from '@src/@core/components/form/InputField';
import {useForm} from 'react-hook-form';

const Login = ({navigation}) => {
  const {handleLogin} = useAuth();
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const {control, handleSubmit, formState, reset} = useForm();

  const onSubmit = data => {
    handleLogin(data, navigation);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../../../public/images/Mananish.jpg')} />
      </View>
      <Text style={styles.heading}>Welcome Back!</Text>
      <Text style={styles.signUpText}>
        Don't have an account?
        <Text
          style={styles.signUpSpan}
          onPress={() => navigation.navigate('Signup')}>
          {' '}
          Sign up now!
        </Text>
      </Text>
      <View style={styles.emailInputContainer}>
        <Text style={styles.emailLabel}>Email</Text>
        <InputField
          name="email"
          label="email"
          placeholder="email"
          style={styles.emailInput}
          control={control}
        />
      </View>
      <View style={styles.passwordInputContainer}>
        <Text style={styles.passwordLabel}>Password</Text>
        <InputField
          name="password"
          label="password"
          placeholder="password"
          style={styles.passwordInput}
          control={control}
          secureTextEntry
        />
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkBox, isChecked && styles.checkBoxCheckedColor]}
          onPress={toggleCheckbox}>
          {isChecked && <Text style={styles.checkStyle}>&#10003;</Text>}
        </TouchableOpacity>
        <Text style={styles.rememberText}>Remember me</Text>
        <Text
          style={styles.forgotPassBtn}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password
        </Text>
      </View>
      <View style={styles.loginBtnContainer}>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
