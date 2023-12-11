import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Home from '../../Screens/App/Home';
import Screen1 from '../../Screens/App/Screen1';
import Screen2 from '../../Screens/App/Screen2';
import Colors from '../../assets/Colors/Colors';
import Inbox from '../../Screens/App/DrawerScreens/Inbox';
import Opportunities from '../../Screens/App/DrawerScreens/Opportunities';
import Earning from '../../Screens/App/DrawerScreens/Earning';
// import Electpro from '../../Screens/App/DrawerScreens/RideStatus';
import RideStatus from '../../Screens/App/DrawerScreens/RideStatus';
import Account from '../../Screens/App/DrawerScreens/Account';
import Help from '../../Screens/App/DrawerScreens/Help';
import Learning from '../../Screens/App/DrawerScreens/Learning';
import Wallet from '../../Screens/App/DrawerScreens/Wallet';
import SelectLocation from '../../Screens/App/SelectLocation';
import CarSelection from '../../Screens/App/CarSelection';
import TrackRide from '../../Screens/App/TrackRide';
import TrackingRiderLocation from '../../Screens/App/TrackingRiderLocation';
import PaymentMthod from '../../Screens/App/PaymentMthod';
import CardPayment from '../../Screens/App/CardPayment';
import RideStart from '../../Screens/App/RideStart';
import RideEnd from '../../Screens/App/RideEnd';
import CashPayment from '../../Screens/App/CashPayment';
import PaymentDone from '../../Screens/App/PaymentDone';
import TipScreen from '../../Screens/App/TipScreen';
import ReferalHistory from '../../Screens/App/DrawerScreens/ReferalHistory';
import ChatScreen from '../../Screens/App/ChatScreen';
import OnWay from '../../Screens/App/OnWay';
import WaitingforRider from '../../Screens/App/WaitingforRider';
import AddWallet from '../../Screens/App/DrawerScreens/AddWallet';
import Profile from '../../Screens/App/DrawerScreens/Profile';
import Browser from '../../Screens/App/Browser';
import HomeLocation from '../../Screens/App/DrawerScreens/HomeLocation';
import Officelocation from '../../Screens/App/DrawerScreens/Officelocation';
import DefaultTip from '../../Screens/App/DrawerScreens/DefaultTip';
import { LOG_OUT } from '../../redux/const/const';


import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';
import Withdraw from '../../Screens/App/DrawerScreens/Withdraw';
import Deposite from '../../Screens/App/DrawerScreens/Deposite';

let { width, height } = Dimensions.get("window")

const OK = () => {
  const Stack = createNativeStackNavigator();
  const ProfileData = useSelector((state) => state?.auth?.accesToken?.data?.user)
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
  return (
    <>
      <Stack.Navigator
        // initialRouteName='TipScreen'
        screenOptions={{
          headerShown: false
        }}
      >

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="inbox" component={Inbox} />
        <Stack.Screen name="opportunities" component={Opportunities} />
        <Stack.Screen name="earnings" component={Earning} />
        <Stack.Screen name="RideStatus" component={RideStatus} />
        <Stack.Screen name="wallet" component={Wallet} />
        <Stack.Screen name="account" component={Account} />
        <Stack.Screen name="help" component={Help} />
        <Stack.Screen name="learning" component={Learning} />
        <Stack.Screen name="SelectLocation" component={SelectLocation} />
        <Stack.Screen name="CarSelection" component={CarSelection} />
        <Stack.Screen name="TrackRide" component={TrackRide} />
        <Stack.Screen name="TrackingRiderLocation" component={TrackingRiderLocation} />
        <Stack.Screen name="PaymentMthod" component={PaymentMthod} />
        <Stack.Screen name="CardPayment" component={CardPayment} />
        <Stack.Screen name="RideStart" component={RideStart} />
        <Stack.Screen name="RideEnd" component={RideEnd} />
        <Stack.Screen name="CashPayment" component={CashPayment} />
        <Stack.Screen name="PaymentDone" component={PaymentDone} />
        <Stack.Screen name="TipScreen" component={TipScreen} />
        <Stack.Screen name="OnWay" component={OnWay} />
        <Stack.Screen name="WaitingforRider" component={WaitingforRider} />
        <Stack.Screen name="ReferalHistory" component={ReferalHistory} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="AddWallet" component={AddWallet} />
        <Stack.Screen name="Browser" component={Browser} />
        <Stack.Screen name="Withdraw" component={Withdraw} />
        <Stack.Screen name="Deposite" component={Deposite} />
        <Stack.Screen name="HomeLocation" component={HomeLocation} />
        <Stack.Screen name="Officelocation" component={Officelocation} />
        <Stack.Screen name="DefaultTip" component={DefaultTip} />


      </Stack.Navigator>
    </>
  )
}
const AppNav = (props) => {
  const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
  const Menu = [
    {
      label: Country == "UKRAINE" ? "Вхідні" : "Inbox",
      name: "inbox",
      icon: require("../../assets/images/DrawerIcon/inbox.png")
    },
    {
      label: Country == "UKRAINE" ? "Конфіденційність і безпека" : "Privacy & Security",
      name: "opportunities",
      icon: require("../../assets/images/DrawerIcon/account.png")
    },
    {
      label: Country == "UKRAINE" ? "Платежі" : "Payments",
      name: "earnings",
      icon: require("../../assets/images/DrawerIcon/earning.png")
    },
    {
      label: Country == "UKRAINE" ? "Статус поїздки" : "Ride Status",
      name: "RideStatus",
      icon: require("../../assets/images/DrawerIcon/electpro.png")
    },
    {
      label: Country == "UKRAINE" ? "Гаманець" : "Wallet",
      name: "wallet",
      icon: require("../../assets/images/DrawerIcon/wallet.png")
    },
    {
      label: Country == "UKRAINE" ? "Пожертвування" : "Donation",
      name: "account",
      icon: require("../../assets/images/DrawerIcon/account.png")
    },
    {
      label: Country == "UKRAINE" ? "Довідка" : "Help",
      name: "help",
      icon: require("../../assets/images/DrawerIcon/help.png")
    },
    {
      label: Country == "UKRAINE" ? "Налаштування" : "Setting",
      name: "learning",
      icon: require("../../assets/images/DrawerIcon/settings.png")
    },
  ]
  const CustomeDrawer = ({ navigation }) => {
    const ProfileData = useSelector((state) => state?.auth?.userInfo)
    const Country = useSelector((state) => state?.auth?.Country?.toUpperCase())
    const dispatch = useDispatch()
    const Logout = async () => {
      await dispatch({
        type: LOG_OUT
      })
    }
    return (
      <>
        <TouchableOpacity
          onPress={() => { navigation.navigate("Profile") }}
        >
          <View
            style={{ flexDirection: "row", padding: width * 0.035, marginTop: Platform.OS == "ios" ? height * 0.07 : height * 0.015 }}
          >
            <Image
              style={{
                margin: width * 0.01,
                height: height * 0.08,
                width: width * 0.15,
                backgroundColor: Colors.placeholder,
                resizeMode: "cover",
                borderRadius: 100
              }}
              source={{ uri: `${ProfileData?.profile_picture}` }}
            />
            <View
              style={{ padding: width * 0.02 }}
            >
              <Text
                style={{
                  fontSize: width * 0.042,
                  fontFamily: "Poppins-Medium",
                  color: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme
                }}
              >
                {ProfileData?.first_name?.slice(0, 10)}
                {/* 00000000001233544 */}
              </Text>
              <View
                style={{ flexDirection: "row" }}
              >
                <Image
                  style={{
                    marginTop: height * 0.008,
                    tintColor: Country == "UKRAINE" ? Colors?.Yellow : Colors?.theme
                  }}
                  source={require("../../assets/images/star.png")} />
                <Text
                  style={{
                    fontSize: width * 0.032,
                    color: "#000000",
                    fontFamily: "Poppins-Bold",

                  }}
                >4.8</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{ borderBottomColor: Colors.placeholder, borderBottomWidth: 1, marginTop: height * 0.02 }}
        ></View>
        {
          Menu.map((i) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  padding: width * 0.035,
                  marginLeft: width * 0.035,
                  alignItems: "center"
                }}
                onPress={() => navigation.navigate(i.name)}
              >
                <Image
                  style={{ resizeMode: "contain", tintColor: Country == "UKRAINE" ? Colors?.Bluetheme : Colors?.theme }}
                  source={i.icon}
                />
                <Text
                  style={{
                    marginLeft: width * 0.0425,
                    fontFamily: "Poppins-Medium",
                    color: "#383838"
                  }}
                >{i.label}</Text>
              </TouchableOpacity>
            )
          })
        }
        <View
          style={{ borderBottomColor: Colors.placeholder, borderBottomWidth: 1, marginTop: height * 0.069 }}
        ></View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            padding: width * 0.035,
            marginLeft: width * 0.035,
            alignItems: "center",
            marginTop: height * 0.035
          }}
          onPress={() => {
            Logout()
          }}
        >
          <Image
            style={{ resizeMode: "contain", tintColor: Country == "UKRAINE" ? Colors?.Yellow : Colors?.Orange }}
            source={require("../../assets/images/DrawerIcon/logout.png")}
          />
          <Text
            style={{
              marginLeft: width * 0.0425,
              fontFamily: "Poppins-Medium",
              color: "#383838"
            }}
          >{Country == "UKRAINE" ? "Вийти" : "Logout"}</Text>
        </TouchableOpacity>

      </>
    )
  }
  const { socket } = useContext(AuthContext)
  useEffect(() => {
    // const socket = io(Socket_URL);
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    // alert("dskanjkdfgsadf")
  }, [])

  const Drawer = createDrawerNavigator();
  return (
    // stackbnavigationcodeher
    <>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerHideStatusBarOnOpen: false,
          drawerStyle: {
            backgroundColor: '#ffffff', //Set Drawer background
            width: width * 0.6, //Set Drawer width
            borderTopRightRadius: width * 0.045,
            shadowColor: Colors.theme,
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,

            elevation: 24,

          },
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          }
        }}
        drawerContent={(props) => (<CustomeDrawer {...props} />)}
      >
        <Drawer.Screen
          name="FirstPage"
          options={{
            drawerLabel: 'First page Option',
            title: 'First Stack'
          }}
          component={OK} />
        <Drawer.Screen
          name="SecondPage"
          options={{
            drawerLabel: 'Second page Option',
            title: 'Second Stack'
          }}
          component={Screen2} />
      </Drawer.Navigator>
      {/* <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >

        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator> */}
    </>
  )
}



export default AppNav

