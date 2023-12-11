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
    marginTop: '7%',
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
  emailLabel: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#BCBCBD',
  },
  emailContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailInput: {
    height: 40,
    borderBottomColor: '#D6D6D6',
    borderBottomWidth: 1,
    marginTop: 5,
    width: '100%',
  },
  loginBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
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
