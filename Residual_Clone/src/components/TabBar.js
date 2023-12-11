import React from "react"
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import Foundation from 'react-native-vector-icons/Foundation';
import LinearGradient from "react-native-linear-gradient";

function MyTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    function renderIcon(route, focused) {
        switch (route) {
            case 'Dashboard':
                return (
                    <MaterialCommunityIcons
                        name="view-dashboard-outline"
                        size={23}
                        color={focused ? "white" : '#A1A2AB'}
                        focused={focused}
                    />
                );
            case 'Products':
                return (
                    <Feather
                        name="box"
                        size={23}
                        color={focused ? "white" : '#A1A2AB'}
                        focused={focused}
                    />
                );
            case 'Promotions':
                return (
                    <Foundation
                        name="clipboard-notes"
                        size={23}
                        color={focused ? "white" : '#A1A2AB'}
                        focused={focused}
                    />
                );
            case 'Clients':
                return (
                    <FontAwesome
                        // onPress={() => {
                        //   if (UserReducer?.userData?.role_id !== 3) {
                        //     navigation.navigate('customers', {
                        //       screen: 'customers',
                        //       initial: false,
                        //     });
                        //   }
                        // }}
                        name="users"
                        size={23}
                        color={focused ? "white" : '#A1A2AB'}
                        focused={focused}
                    />
                );
            case 'Invoices':
                return (
                    <MaterialCommunityIcons
                        name="bell-outline"
                        size={23}
                        color={focused ? "white" : '#A1A2AB'}
                        focused={focused}
                    />
                );
            case 'Profile':
                return (
                    <FontAwesome
                        name="user-circle-o"
                        size={23}
                        color={focused ? "white" : '#A1A2AB'}
                        focused={focused}
                    />
                );
            default:
                break;
        }
    }

    return (
        <View style={{ flexDirection: 'row' ,padding:5}}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
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
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            width:responsiveWidth(isFocused?35:16.25)-3
                        }}
                    >
                        <LinearGradient
                            colors={isFocused ? ['#74B5E8', '#9974F2', '#E43DEC'] : ['#fff', '#fff']}
                            start={{ y: 0.0, x: 0.001 }}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius:20,
                                paddingVertical:7.5,
                                paddingHorizontal:5
                            }}
                            angleCenter={{ x: 5, y: 0 }}
                            end={{ y: 0.0, x: 1.1 }}
                        >
                            {isFocused ? (
                                <>
                                    {renderIcon(label, isFocused)}
                                    <Text style={{ color: isFocused ? 'white' : '#222' ,textTransform:'uppercase',marginLeft:5,fontSize:12,fontWeight:'bold'}}>
                                        {label}
                                    </Text>
                                </>
                            ) : (
                                <>
                                    {renderIcon(label, isFocused)}
                                </>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default MyTabBar;