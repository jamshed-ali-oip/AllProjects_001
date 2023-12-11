import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

const ForgotPassword = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../../../public/images/Mananish.jpg')} />
      </View>
      <View>
        <Icon
          name="chevron-back"
          size={50}
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
      <Text style={styles.heading}>Forgot Password</Text>
      <Text style={styles.signUpText}>Enter your email</Text>
      <View style={styles.emailInputContainer}>
        <Text style={styles.emailLabel}>Email</Text>
        <View style={styles.emailContainer}>
          <TextInput style={styles.emailInput} placeholder="email" />
        </View>
      </View>
      <View style={styles.loginBtnContainer}>
        <TouchableOpacity style={styles.btnStyle}>
          <Text
            style={styles.btnText}
            onPress={() => navigation.navigate('ChangePassword')}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
