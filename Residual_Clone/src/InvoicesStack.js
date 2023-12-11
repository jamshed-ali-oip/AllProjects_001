import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Invoices from './screens/Invoices';
import InvoiceDetail from './screens/InvoiceDetail';

const Invoice_Stack = createNativeStackNavigator();
const InvoicesStack = props => {
  return (
    <Invoice_Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Invoices">
      <Invoice_Stack.Screen name="Invoices" component={Invoices} {...props.navigation} />
      <Invoice_Stack.Screen name="InvoiceDetail" component={InvoiceDetail} {...props.navigation} />
    </Invoice_Stack.Navigator>
  );
};

export default InvoicesStack;
