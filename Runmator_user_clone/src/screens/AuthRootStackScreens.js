import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './Home';
import LogIn from './LogIn';
import SignUp from './SignUp';
import BankCardDetails from './BankCardDetails';
import Otp from './Otp';
import ForgotPassword from './ForgotPassword';
import ConfirmPassword from './ConfirmPassword';
import HistoryScreen from './HistoryScreen';
import Walkthrough from './Walkthrough';
import AllServices from './AllServices';
import Wallet from './Wallet';
import RateUs from './RateUs';
import Profile from './Profile';
import Map from './Map';
import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';

const Stack = createNativeStackNavigator();

function AuthRootStackScreens({UserReducer}) {
  return (
    <Stack.Navigator
      initialRouteName={UserReducer.isWalkThroughSeen ? "LogIn" : "Walkthrough"}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Walkthrough" component={Walkthrough} />

      <Stack.Screen name="LogIn" component={LogIn} />

      <Stack.Screen name="SignUp" component={SignUp} />

      <Stack.Screen name="BankCardDetails" component={BankCardDetails} />

      <Stack.Screen name="Otp" component={Otp} />

      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

      <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
    </Stack.Navigator>
  );
}

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, null)(AuthRootStackScreens);
