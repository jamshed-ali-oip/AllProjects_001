import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';

const Signup = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../../../public/images/Mananish.jpg')} />
      </View>
      <Text style={styles.heading}>Create Account</Text>
      <Text style={styles.signUpText}>
        Already have an account?
        <Text
          style={styles.signUpSpan}
          onPress={() => navigation.navigate('Login')}>
          {' '}
          Sign in!
        </Text>
      </Text>
      <View style={styles.emailInputContainer}>
        <Text style={styles.emailLabel}>Email</Text>
        <TextInput style={styles.emailInput} placeholder="Enter your email" />
      </View>
      <View style={styles.passwordInputContainer}>
        <Text style={styles.passwordLabel}>Password</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder="password"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.passwordInputContainer}>
        <Text style={styles.passwordLabel}>Confirm Password</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder="password"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.loginBtnContainer}>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
