import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Chat from '../screens/Chat';
import Chat1on1 from '../screens/Chat1on1';
import ChatOneOnOne from '../screens/ChatOneOnOne';
import NewChatScreen from '../screens/NewChatScreen';
import routes from './routes';

const Stack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.CHAT_SCREEN} component={Chat} />
      <Stack.Screen name={routes.NEW_CHAT_SCREEN} component={NewChatScreen} />
      <Stack.Screen name={routes.CHAT_SCREEN_DETAILS} component={Chat1on1} />
      <Stack.Screen name={routes.CHAT_ONE_ON_ONE_SCREEN_DETAILS}  component={ChatOneOnOne} />
    </Stack.Navigator>
  );
};

export default ChatStack;
