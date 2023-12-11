/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import react, { useState } from 'react';
import { ColorSchemeName, Pressable, Text } from 'react-native';
import { View, SectionList } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SearchScreen from '../screens/SearchScreen';
import TrophyScreen from '../screens/TrophyScreen';
import WalletScreen from '../screens/WalletScreen';
import MessageScreen from '../screens/MessageScreen';
import SettingScreen from '../screens/SettingScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import VideosScreen from '../screens/VideosScreen';
import UploadScreen from '../screens/UploadScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import Myrewards from '../screens/Myrewards';
import Badges from '../screens/Badges';
import BlockedUser from '../screens/BlockedUser';
import Privacy from '../screens/Privacy';
import ShareApp from '../screens/ShareApp';
import Suggestion from '../screens/Suggestion';
import ReportProblem from '../screens/ReportProblem';
import Tutorials from '../screens/Tutorial';
import TermsAndCondition from '../screens/TermsandCondition';
import ChangePassword from '../screens/ChangePassword';



import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal', headerShown: true }}>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Trophy" component={TrophyScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Message" component={MessageScreen} />
        <Stack.Screen name="Setting" component={SettingScreen}  options={{ headerShown:false }} />
        <Stack.Screen name="MyReward" component={Myrewards}  options={{ headerShown:false }} />
        <Stack.Screen name="Badges" component={Badges}  options={{ headerShown:false }} />
        <Stack.Screen name="BlockedUser" component={BlockedUser}  options={{ headerShown:false }} />
        <Stack.Screen name="Privacy" component={Privacy}  options={{ headerShown:false }} />
        <Stack.Screen name="ShareApp" component={ShareApp}  options={{ headerShown:false }} />
        <Stack.Screen name="Suggestion" component={Suggestion}  options={{ headerShown:false }} />
        <Stack.Screen name="ReportProblem" component={ReportProblem}  options={{ headerShown:false }} />
        <Stack.Screen name="Tutorials" component={Tutorials}  options={{ headerShown:false }} />
        <Stack.Screen name="TermsAndCondition" component={TermsAndCondition}  options={{ headerShown:false }} />
        <Stack.Screen name="ChangePassword" component={ChangePassword}  options={{ headerShown:false }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

  const colorScheme = useColorScheme();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#d73b35',
        tabBarActiveBackgroundColor: "#000",
        tabBarInactiveTintColor: '#fff',
        tabBarInactiveBackgroundColor: '#000',
        tabBarHideOnKeyboard: true,
        tabBarStyle:{
          borderTopColor:"#000",
          backgroundColor:"#000",
          padding:3
        }
      }}>


      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('Search')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="search"
                size={20}
                color={Colors["dark"].text}
                style={{ marginLeft: 15 }}
              />
            </Pressable>
          ),

          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Trophy')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="trophy"
                size={25}
                color={Colors["dark"].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),

          headerStyle: {
            backgroundColor: "#000",
          },

        })}
      />

      <BottomTab.Screen
        name="Videos"
        component={VideosScreen}

        options={({ navigation }: RootTabScreenProps<'Videos'>) => ({
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="play-circle" color={color} />,
          headerShown: false,

          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<Button onPress={openMenu}>Show menu</Button>}>
                <Menu.Item onPress={() => { }} title="Item 1" />
                <Menu.Item onPress={() => { }} title="Item 2" />
                <Divider />
                <Menu.Item onPress={() => { }} title="Item 3" />
              </Menu>
            </View>
          ),

          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors["dark"].text,
            backgroundColor: "red",
          },
          headerStyle: {
            backgroundColor: "#000",
          },
          tabBarStyle: {
            display: 'none',
          },

          headerRight: () => (
            <Pressable
              onPress={() => console.log("dd")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginRight: 20,
              })}
            >
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors["dark"].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),

          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginLeft: 20,
              })}
            >
              <FontAwesome
                name="angle-left"
                size={25}
                color={Colors["dark"].text}
              />
            </Pressable>
          ),

        })}

      />

      <BottomTab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-square" color={color} />,
          headerStyle: {
            backgroundColor: "#000",
          },
        }}
      />

      <BottomTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
          headerStyle: {
            backgroundColor: "#000",
          },

          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: Colors["dark"].text, marginRight: 10 }}>
                Notifications
              </Text>
            </View>
          ),

          headerRight: () => (
            <Pressable
              onPress={() => console.log("dd")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginRight: 20,
              })}
            >
              <FontAwesome5
                name="bell"
                size={22}
                color={Colors["dark"].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),


        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}

        options={({ navigation }: RootTabScreenProps<'Profile'>) => ({
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="user-circle" color={color} />,
          headerStyle: {
            backgroundColor: "#000",
          },

          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('Wallet')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginLeft: 20,
              })}
            >
              <FontAwesome5
                name="wallet"
                size={22}
                color={Colors["dark"].text}
              />
            </Pressable>
          ),

          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {/* Account Name */}
              <Text style={{ fontSize: 16, color: Colors["dark"].text }}>
                Account Name
              </Text>
            </View>
          ),

          headerRight: () => (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginRight: 20,
            }}
            >

              <Pressable
                onPress={() => navigation.navigate('Message')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                  // marginRight: 20,
                })}
              >
                <FontAwesome5
                  name="telegram-plane"
                  size={22}
                  color={Colors["dark"].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate('Setting')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="gear"
                  size={22}
                  color={Colors["dark"].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            </View>
          ),


          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors["dark"].text,
            backgroundColor: "red",
          },

        })}

      />

    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} {...props} />;
}
