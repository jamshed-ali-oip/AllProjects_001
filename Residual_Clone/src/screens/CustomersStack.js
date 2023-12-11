import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Customers from './Customers';
import CustomerDetails from './CustomerDetails';

const CustomerStack = createNativeStackNavigator();
const CustomersStack = props => {
  return (
    <CustomerStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="customers">
      <CustomerStack.Screen
        name="customers"
        component={Customers}
        {...props.navigation}
      />

      <CustomerStack.Screen
        name="customerDetail"
        component={CustomerDetails}
        {...props.navigation}
      />
    </CustomerStack.Navigator>
  );
};

export default CustomersStack;
