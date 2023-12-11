import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#F5F9FF',
    marginTop: 30,
  },
  logo: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    marginTop: '10%',
    paddingLeft: 20,
    color: '#126D6A',
    textAlign: 'left',
    fontWeight: '700',
  },
  signUpText: {
    color: '#50565A',
    paddingLeft: 20,
    fontSize: 14,
    fontWeight: 'normal',
    marginTop: 5,
  },
  emailInputContainer: {
    marginTop: 30,
    paddingRight: 20,
    paddingLeft: 20,
  },
  passwordInputContainer: {
    marginTop: 30,
    paddingRight: 20,
    paddingLeft: 20,
  },
  passwordLabel: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#BCBCBD',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    height: 40,
    borderBottomColor: '#D6D6D6',
    borderBottomWidth: 1,
    marginTop: 5,
    width: '100%',
  },
  eyeIcon: {
    marginLeft: 'auto',
  },
  loginBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  btnStyle: {
    backgroundColor: '#F4662F',
    width: '75%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    padding: 10,
  },
});
