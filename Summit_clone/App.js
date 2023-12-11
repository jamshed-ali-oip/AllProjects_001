import React, { useEffect } from 'react';
import { AuthProvider } from './src/context/Auth';
import { Router } from './src/routes/Router';
import { LogBox, Text, View } from 'react-native';
import  { useFonts } from 'expo-font';


import useNotifications from './src/hooks/useNotifications';
import { authService } from './src/services/authService';

const App = () => {
  // LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  // LogBox.ignoreAllLogs(); //Ignore all log notifications
  const { expoPushToken } = useNotifications();

  console.log('expoPushToken', { expoPushToken })
  
  useEffect(() => {
    authService.updatePushNotificationToken(expoPushToken)
  }, [expoPushToken])
  

  let [fontsLoaded] = useFonts({
    'SFProDisplay': require('./assets/fonts/SFProDisplay.ttf'),
    'SFProDisplaySemibold': require('./assets/fonts/SFProDisplaySemibold.ttf'),
    'SFProDisplayMedium': require('./assets/fonts/SFProDisplayMedium.ttf'),
    'SFProDisplayRegular': require('./assets/fonts/SFProDisplayRegular.ttf'),
    'SFProDisplayThin': require('./assets/fonts/SFProDisplayThin.ttf'),
    'SFProDisplayHeavy': require('./assets/fonts/SFProDisplayHeavy.ttf'),
  });



  if (!fontsLoaded) {
    return null;
  }


  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
    // <View style={{backgroundColor : "red", flex : 1, alignItems : "center", justifyContent : "center"}}>
    //   <Text style={{fontFamily : "SFProDisplayHeavy", color : "white"}}>Helllo World</Text>
    // </View>
  );
};

export default App;