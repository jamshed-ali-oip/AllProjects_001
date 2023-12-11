import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import EyeIcon from 'react-native-vector-icons/Entypo';
import {useState} from 'react';

const ChangePassword = ({navigation}) => {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../../../public/images/Mananish.jpg')} />
      </View>
      <View style={{marginTop: 0}}>
        <Icon
          name="chevron-back"
          size={50}
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
      <Text style={styles.heading}>New Password</Text>
      <Text style={styles.signUpText}>Enter your new password</Text>
      <View style={styles.passwordInputContainer}>
        <Text style={styles.passwordLabel}>New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="password"
            secureTextEntry={!show ? true : false}
          />
          <EyeIcon
            style={styles.eyeIcon}
            name={show ? 'eye' : 'eye-with-line'}
            size={20}
            onPress={() => setShow(!show)}
          />
        </View>
      </View>
      <View style={styles.passwordInputContainer}>
        <Text style={styles.passwordLabel}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="confirm password"
            secureTextEntry={!show ? true : false}
          />
          <EyeIcon
            style={styles.eyeIcon}
            name={show ? 'eye' : 'eye-with-line'}
            size={20}
            onPress={() => setShow(!show)}
          />
        </View>
      </View>
      <View style={styles.loginBtnContainer}>
        <TouchableOpacity style={styles.btnStyle}>
          <Text
            style={styles.btnText}
            onPress={() => navigation.navigate('Login')}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;
