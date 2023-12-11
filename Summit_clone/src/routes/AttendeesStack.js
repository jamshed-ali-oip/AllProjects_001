import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AttendeeDetailsScreen from '../screens/AttendeeDetailsScreen';
import Attendees from '../screens/Attendees';
import routes from './routes';

const Stack = createNativeStackNavigator();

const AttendeesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.ATTENDEES_SCREEN} component={Attendees} />

      <Stack.Screen
        name={routes.ATTENDEES_DETAILS_SCREEN}
        component={AttendeeDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default AttendeesStack;
