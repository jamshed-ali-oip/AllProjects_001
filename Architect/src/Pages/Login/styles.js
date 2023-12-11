import { StyleSheet } from 'react-native';

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
  signUpSpan: {
    color: '#F4662F',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  emailInputContainer: {
    marginTop: 30,
    paddingRight: 20,
    paddingLeft: 20,
  },
  emailLabel: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#BCBCBD',
  },
  emailInput: {
    height: 40,
    borderBottomColor: '#D6D6D6',
    borderBottomWidth: 1,
    marginTop: 5,
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
  passwordInput: {
    height: 40,
    borderBottomColor: '#D6D6D6',
    borderBottomWidth: 1,
    marginTop: 5,
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D6D6D6',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxCheckedColor: {
    backgroundColor: '#D6D6D6',
  },
  checkStyle: {
    color: '#126D6A',
    fontSize: 12,
  },
  rememberText: {
    paddingLeft: 10,
    color: '#BCBCBD',
  },
  forgotPassBtn: {
    color: '#F4662F',
    fontWeight: 'normal',
    textDecorationLine: 'underline',
    marginLeft: 'auto',
  },
  loginBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    elevation: 10,
  },
  btnStyle: {
    backgroundColor: '#F4662F',
    width: '75%',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 10,
    shadowColor: '#F4662F',
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    padding: 10,
  },
});
