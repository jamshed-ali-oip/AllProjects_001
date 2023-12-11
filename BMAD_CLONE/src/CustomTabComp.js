// @ts-nocheck
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HomeIcon from 'react-native-vector-icons/FontAwesome';
import BioIcon from 'react-native-vector-icons/FontAwesome';
import MenuIcon from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import Location from 'react-native-vector-icons/MaterialIcons';
import Notification from 'react-native-vector-icons/Ionicons';
import { colors } from './src/screens/drawer/constant';
import NotificationStack from './Screens/Notification/NotificationStack';
import { connect } from 'react-redux';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import Home from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ReportIcon from 'react-native-vector-icons/Feather';
import { useEffect } from 'react';
import { useState } from 'react';

function CustomTabBar({
  dataProps,
  state,
  descriptors,
  navigation,
  userReducer,
  notificationsReducer,
}) {
  console.log(notificationsReducer?.unreadNoti, '+++++++++');
  const [change, onChange] = useState(false);
  const [hasNewRequests, setHasNewRequests] = useState(false);

  useEffect(() => {
    console.log("______+_+_+_+", notificationsReducer?.unreadNoti)
    if (notificationsReducer?.unreadNoti > 0) {
      setHasNewRequests(true);
    } else {
      setHasNewRequests(false);
    }
  }, [notificationsReducer?.unreadNoti]);

  function renderIcon(route, isFocues) {
    // console.log(route, 'route');
    switch (route) {
      case 'HOME':
        return (
          <Octicons
            name="home"
            size={responsiveFontSize(2.75)}
            color={isFocues ? colors.themeblue : colors.lightGray}
          />
        );
      case 'nearme':
        return (
          <Location
            name="location-on"
            size={responsiveFontSize(2.75)}
            color={isFocues ? colors.themeblue : colors.lightGray}
          />
        );
      case 'newpost':
        return (
          <Home
            name="plus"
            size={responsiveFontSize(3.75)}
            color={isFocues ? colors.themeblue : colors.lightGray}
          />
        );
      case 'notification':
        return (
          <>
            {hasNewRequests && (
              <View
                style={{
                  width: responsiveFontSize(1.5),
                  height: responsiveFontSize(1.5),
                  backgroundColor: colors.themeblue,
                  borderRadius: responsiveFontSize(50),
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 10,
                  right: responsiveScreenFontSize(3.1),
                  zIndex: 9999,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    alignSelf: "center",
                    fontSize: 7,
                    fontWeight: "500"
                  }}
                >{notificationsReducer?.unreadNoti}</Text>
              </View>
            )}

            <Notification
              name="notifications-outline"
              size={responsiveFontSize(2.75)}
              color={isFocues ? colors.themeblue : colors.lightGray}
            />
          </>
        );

      case 'BMAD':
        return (
          <Notification
            name="fast-food-outline"
            size={responsiveFontSize(2.75)}
            color={isFocues ? colors.themeblue : colors.lightGray}
          />
        );

      default:
        break;
    }
  }

  useEffect(() => {
    if (state) {
      state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        if (route.name == 'Home') {
          if (isFocused) {
            onChange(true);
            // console.log('================================');
          } else {
            onChange(false);
          }
        }
      });
    }
  }, [state]);

  // alert("ASd")
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '95%',
        alignSelf: 'center',
        height: responsiveScreenFontSize(8),
        backgroundColor: '#e8e6e6',
        borderTopLeftRadius: responsiveFontSize(2),
        borderBottomRightRadius: responsiveFontSize(2),
        position: 'absolute',
        bottom: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      {state.routes.map((route, index) => {
        if (false) {
          return null;
        } else {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          var realName = '';

          if (label == 'HOME') {
            realName = 'Home';
          }
          if (label == 'nearme') {
            realName = 'Nearby Me';
          }
          if (label == 'newpost') {
            realName = 'New Post';
          }
          if (label == 'notification') {
            realName = 'Notification';
          }
          if (label == 'BMAD') {
            realName = 'Bmad';
          }

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!event.defaultPrevented) {
              if (route.name == 'HOME') {
                if (isFocused) {
                  navigation.navigate('HOME');
                } else {
                  navigation.navigate(route.name);
                }
              } else if (route.name == 'nearme') {
                if (isFocused) {
                  navigation.navigate(route.name);
                } else {
                  navigation.navigate(route.name);
                }
              } else if (route.name == 'newpost') {
                if (isFocused) {
                  navigation.navigate(route.name);
                } else {
                  navigation.navigate(route.name);
                }
              } else if (route.name == 'notification') {
                if (isFocused) {
                  navigation.navigate(route.name);
                } else {
                  navigation.navigate(route.name);
                }
              } else if (route.name == 'BMAD') {
                if (isFocused) {
                  navigation.navigate(route.name);
                } else {
                  navigation.navigate(route.name);
                }
              }
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: responsiveFontSize(0.5),
                backgroundColor: label == 'newpost' ? "white" : null,
                borderRadius: label == 'newpost' ? 100 : 0,
                marginTop: label == 'newpost' ? -30 : 0,
                marginBottom: label == 'newpost' ? 20 : 0,
                elevation: label == 'newpost' ? 15 : 0,
                shadowColor: label == 'newpost' ? "#b01125" : null,
                shadowOffset: label == 'newpost' ? {
                  width: 0,
                  height: 5,
                } : null,
                shadowOpacity: label == 'newpost' ? 0.36 : 0,
                shadowRadius: label == 'newpost' ? 6.68 : 0,


                // borderBottomColor: label == 'newpost' ? "black" : null,
                // borderBottomWidth: label == 'newpost' ? 2 : 0,
                // // borderTopColor: label == 'newpost' ? "black" : null,
                // // borderTopWidth: label == 'newpost' ? 2 : 0,
                // borderLeftColor: label == 'newpost' ? "black" : null,
                // borderLeftWidth: label == 'newpost' ? 2 : 0,
                // borderRightColor: label == 'newpost' ? "black" : null,
                // borderRightWidth: label == 'newpost' ? 2 : 0
              }}>
              {renderIcon(label, isFocused)}
              {
                label == 'newpost' ? null : <Text
                  style={{
                    color: isFocused ? colors.themeblue : 'grey',
                    fontSize: responsiveFontSize(1.2),
                  }}>
                  {realName}
                </Text>
              }
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
}
function mapStateToProps({ userReducer, notificationsReducer }) {
  return {
    userReducer,
    notificationsReducer,
  };
}

export default connect(mapStateToProps, null)(CustomTabBar);

{
  /* <TouchableOpacity
key={index}
accessibilityRole="button"
accessibilityState={isFocused ? { selected: true } : {}}
accessibilityLabel={options.tabBarAccessibilityLabel}
testID={options.tabBarTestID}
onPress={onPress}
onLongPress={onLongPress}
style={{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',

  padding: responsiveFontSize(0.5),
  // backgroundColor:isFocused ? "red" : "white"
}}
>
{renderIcon(label, isFocused)}
<Text style={{ color: isFocused ? '#000000' : colors.gray, fontSize: responsiveFontSize(tablet ? 0.65 : 1.3) }}>
  {label}
</Text>
</TouchableOpacity> */
}

{
  /* <Container
onPress={() => {
  ref.current.animateNextTransition();
  onPress();
}}>
<Background
  focused={isFocused}
  label={label}
  ref={ref}
  transition={transition}>
 {renderIcon(label, isFocused)}
  {isFocused && (
    <Label label={label}>
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </Label>
  )}
</Background>
</Container> */
}
