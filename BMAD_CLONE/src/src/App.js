/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
// import AnimTab1 from './bottomTab/AnimTab1';
// import AnimTab2 from './bottomTab/AnimTab2';
// import AnimTab3 from './bottomTab/AnimTab3';
import Home from './screens/Home';
// import Tab4 from './bottomTab/Tab4';
// import Tab5 from './bottomTab/Tab5';
import Colors from './constants/Colors';
// import ContactList from './screens/ContactList';
// import ListScreen from './screens/ListScreen';
import { Provider } from 'react-native-paper';
// import Screen from './screens/Screen';
// import ProductsList from './screens/shop/ProductsList';
// import DetailsScreen from './screens/shop/DetailsScreen';
// import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Fab from './screens/fab/Fab';
import DrawerNav1 from './screens/drawer/drawer1/DrawerNav1';
import DrawerNav2 from './screens/drawer/drawer2/DrawerNav2';
import { colors } from './screens/drawer/constant';

const App = () => {

 React.useEffect(()=>{
  SplashScreen.hide()
 },[])
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  return (
    <Provider>
      {/* <SafeAreaView style={backgroundStyle}> */}
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={colors.sceneBg} />
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      {/* </SafeAreaView> */}
    </Provider>
  );
};

const options = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
}

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="Home" component={Home}
        options={{ title: 'React-Native Ui', headerShown: true }} />
      {/* <Stack.Screen name="Tab1" component={AnimTab1} /> */}
      {/* <Stack.Screen name="Tab2" component={AnimTab2} />
      <Stack.Screen name="Tab3" component={AnimTab3} />
      <Stack.Screen name="Tab4" component={Tab4} />
      <Stack.Screen name="Tab5" component={Tab5} /> */}
      {/* <Stack.Screen name="Contacts" component={ContactList} />
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Screen" component={Screen} />
      <Stack.Screen name="Products" component={ProductsList} /> */}
      {/* <Stack.Screen name="Fab" component={Fab} /> */}
      <Stack.Screen name="Drawer1" component={DrawerNav1} />
      <Stack.Screen name="Drawer2" component={DrawerNav2} />
    </Stack.Navigator>
  )
}

export default App;
