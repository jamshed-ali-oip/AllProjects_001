import {View, StyleSheet, LogBox, Text, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {themeRed} from './Assets/Colors/Colors';
import Home from 'react-native-vector-icons/Feather';
import ProfileStack from './Screens/Home/Profile/ProfileStack';
import Location from 'react-native-vector-icons/MaterialIcons';
import Notification from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStack from './Screens/Home/HomeStack';
import NewPostStack from './Screens/NewPost/NewPostStack';
import NotificationStack from './Screens/Notification/NotificationStack';
import NearMeStack from './Screens/NearMe/NearMeStack';
import MessageStack from './Screens/Messages/MessageStack';
import * as actions from './Store/Actions';
import {useRoute} from '@react-navigation/native';
import {connect} from 'react-redux';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import BmadStack from './Screens/BMAD/BmadStack';
import CustomTabBar from  './CustomTabComp'

import {heightPercentageToDP} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');

const MyTabs = ({
  userReducer,
  notificationsReducer,
  showNotificationsBadge,
  resetTotalUnreadNotificationsCount,
}) => {
  const route = useRoute();

  const Tab = createBottomTabNavigator();
  const [hasNewRequests, setHasNewRequests] = useState(false);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName, 'sdsadsasadsadssdadas');
  useEffect(() => {
    if (notificationsReducer?.unreadNoti > 0) {
      setHasNewRequests(true);
    } else {
      setHasNewRequests(false);
    }
  }, [notificationsReducer?.unreadNoti]);

  return (
    <Tab.Navigator
    tabBar={props => <CustomTabBar
      dataProps={props}
      {...props}
    />}
      screenOptions={({route}) => ({
        headerShown: false,
        // tabBarLabel: ({focused, color, position}) => {
        //   if (route.name == 'HOME') {
        //     return (
        //       <Text
        //         style={
        //           focused
        //             ? [
        //                 styles.textStyle,
        //                 {color: '#B01125', fontSize: heightPercentageToDP(1.5)},
        //               ]
        //             : styles.textStyle
        //         }>
        //         Home
        //       </Text>
        //     );
        //   }

        //   if (route.name == 'nearme') {
        //     return (
        //       <Text
        //         style={
        //           focused
        //             ? [
        //                 styles.textStyle,
        //                 {color: '#B01125', fontSize: heightPercentageToDP(1.5)},
        //               ]
        //             : styles.textStyle
        //         }>
        //         Nearby Me
        //       </Text>
        //     );
        //   }

        //   if (route.name == 'newpost') {
        //     return (
        //       <Text
        //         style={
        //           focused
        //             ? [
        //                 styles.textStyle,
        //                 {color: '#B01125', fontSize: heightPercentageToDP(1.5)},
        //               ]
        //             : styles.textStyle
        //         }>
        //         New Post
        //       </Text>
        //     );
        //   }

        //   if (route.name == 'notification') {
        //     return (
        //       <Text
        //         style={
        //           focused
        //             ? [
        //                 styles.textStyle,
        //                 {color: '#B01125', fontSize: heightPercentageToDP(1.5)},
        //               ]
        //             : styles.textStyle
        //         }>
        //         Notification
        //       </Text>
        //     );
        //   }

        //   if (route.name == 'BMAD') {
        //     return (
        //       <Text
        //         style={
        //           focused
        //             ? [
        //                 styles.textStyle,
        //                 {color: '#B01125', fontSize: heightPercentageToDP(1.5)},
        //               ]
        //             : styles.textStyle
        //         }>
        //         Bmad
        //       </Text>
        //     );
        //   }
        // },

        // tabBarIcon: ({focused, color, size}) => {
        //   if (route.name == 'HOME') {
        //     return (
        //       <Home
        //         name="home"
        //         style={{}}
        //         size={heightPercentageToDP(focused? 2.7: 2.3)}
        //         color={color}
        //       />
        //     );
        //   }

        //   if (route.name == 'nearme') {
        //     return (
        //       <Location
        //         name="location-on"
        //         style={{}}
        //         size={heightPercentageToDP(focused? 2.7: 2.3)}
        //         color={color}
        //       />
        //     );
        //   }

        //   if (route.name == 'newpost') {
        //     return (
        //       <Home
        //         name="plus-square"
        //         style={{}}
        //         size={heightPercentageToDP(focused? 2.7: 2.3)}
        //         color={color}
        //       />
        //     );
        //   }

        //   if (route.name == 'notification') {
        //     return (
        //       <Notification
        //         name="notifications-outline"
        //         style={{}}
        //         size={heightPercentageToDP(focused? 2.7: 2.3)}
        //         color={color}
        //       />
        //     );
        //   }

        //   if (route.name == 'BMAD') {
        //     return (
        //       <Notification
        //         name="fast-food-outline"
        //         style={{}}
        //         size={heightPercentageToDP(focused? 2.7: 2.3)}
        //         color={color}
        //       />
        //     );
        //   }
        // },
        tabBarActiveTintColor: '#B01125',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="HOME" component={HomeStack} />
      <Tab.Screen name="nearme" component={NearMeStack} />
      <Tab.Screen name="newpost" component={NewPostStack} />
      <Tab.Screen name="notification" component={NotificationStack} />
      <Tab.Screen name="BMAD" component={ProfileStack} />
    </Tab.Navigator>
  );
};
const mapStateToProps = ({userReducer, notificationsReducer}) => {
  return {userReducer, notificationsReducer};
};

export default connect(mapStateToProps, actions)(MyTabs);

const styles = StyleSheet.create({
  textStyle: {
    color: '#c4c4c4',
    fontSize: heightPercentageToDP(1.3),
    fontWeight: '700',
  },
});
