import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { ScreensArray2 } from '../arrays';
import CustomDrawer2 from './CustomDrawer2';
import { colors } from '../constant';

const Drawer = createDrawerNavigator();

const DrawerNav2 = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: styles.drawerStyles,
        drawerType: 'slide',
        overlayColor: 'transparent',
        swipeEdgeWidth: Platform.OS === 'android' && 180,
        sceneContainerStyle: styles.sceneStyles,
        headerShown: false
      }}
      drawerContent={(props) => <CustomDrawer2 {...props} />}
    >
      {ScreensArray2.map((_, i) => (
        <Drawer.Screen key={i} name={_.route} component={_.component}
          options={{
            item: _,
          }}
        />
      ))}
    </Drawer.Navigator>
  )
}

export default DrawerNav2

const styles = StyleSheet.create({
  drawerStyles: {
    width: 260,
    backgroundColor: '#B01125',
    paddingTop: 40

  },
  sceneStyles:{
    backgroundColor: '#B01125',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white'
  },
})