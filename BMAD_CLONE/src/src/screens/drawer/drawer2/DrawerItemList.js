import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../constant';
import Icon from '../../../components/Icons';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';
import {CommonActions} from '@react-navigation/native';
const DrawerItem = ({
  label,
  onPress,
  tabBarTestID,
  type,
  name,
  notification,
  activeItemColor,
  color,
  styles,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      testID={tabBarTestID}
      accessibilityRole="button"
      style={[styles.drawerItem]}>
      <View style={styles.row}>
        <Icon type={type} name={name} color={'white'} />
        <Text style={[styles.label, {fontSize: responsiveScreenFontSize(2.4)}]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const DrawerItemList = ({state, descriptors, navigation, styles}) => {
  return (
    <View style={styles.view}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const {options} = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!event.defaultPrevented) {
            if (route.name == 'home') {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{name: 'home'}],
                }),
              );
            } else if(route.name == 'profile'){
              console.log(route.name, "route.name========================================================================");
              navigation.navigate(route.name);
            } else {
              navigation.navigate(route.name);
            }

            // if (route.name == 'home') {
            //   navigation.dispatch(
            //     CommonActions.reset({
            //       index: 1,
            //       routes: [{name: 'home'}],
            //     }),
            //   );
            // } else {
            //   navigation.navigate(route.name);
            // }

          }
        };
        {
          /* console.log(options) */
        }

        const drawerItem = options.item;
        const color = isFocused ? colors.dark : colors.darkGray;
        const activeItemColor = isFocused ? colors.primary : null;

        if (route.name != 'ProceedToPay' && route.name != "Chats") {
          return (
            <DrawerItem
              key={index}
              label={drawerItem.label}
              tabBarTestID={options.tabBarTestID}
              onPress={onPress}
              name={drawerItem.icon}
              type={drawerItem.type}
              notification={drawerItem.notification}
              color={color}
              activeItemColor={activeItemColor}
              styles={styles}
            />
          );
        }
      })}
    </View>
  );
};

export default DrawerItemList;
