import {AuthProvider} from '@src/@core/contexts/AuthContext';
import AuthGuard from '@src/@core/Guards/AuthGuard';
import GuestGuard from '@src/@core/Guards/GuestGuard';
import {StatusBar} from 'react-native';
import ChangePassword from '@src/Pages/ChangePassword';
import Layout from '@src/@core/SidebarLayout';
import {SidebarProvider} from '@src/@core/contexts/SidebarToggle';
import CloseSidebar from '@src/@core/SidebarLayout/CloseSidebar';
import Login from '@src/Pages/Login';
import Signup from '@src/Pages/Signup';
import ForgotPassword from '@src/Pages/ForgotPassword';
import Home from '@src/Pages/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SidebarProvider>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            showHideTransition="slide"
            backgroundColor="#F5F9FF"
            translucent={true}
          />
          <Stack.Navigator>
            <Stack.Screen name="Login" options={{headerShown: false}}>
              {props => (
                <GuestGuard navigation={props.navigation}>
                  <Login navigation={props.navigation} />
                </GuestGuard>
              )}
            </Stack.Screen>
            <Stack.Screen name="Signup" options={{headerShown: false}}>
              {props => (
                <GuestGuard navigation={props.navigation}>
                  <Signup navigation={props.navigation} />
                </GuestGuard>
              )}
            </Stack.Screen>
            <Stack.Screen name="ChangePassword" options={{headerShown: false}}>
              {props => (
                <GuestGuard navigation={props.navigation}>
                  <ChangePassword navigation={props.navigation} />
                </GuestGuard>
              )}
            </Stack.Screen>
            <Stack.Screen name="ForgotPassword" options={{headerShown: false}}>
              {props => (
                <GuestGuard navigation={props.navigation}>
                  <ForgotPassword navigation={props.navigation} />
                </GuestGuard>
              )}
            </Stack.Screen>
            <Stack.Screen name="Home" options={{headerShown: false}}>
              {props => (
                <AuthGuard navigation={props.navigation}>
                  <Layout>
                    <CloseSidebar>
                      <Home navigation={props.navigation} />
                    </CloseSidebar>
                  </Layout>
                </AuthGuard>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </SidebarProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default Navigation;
