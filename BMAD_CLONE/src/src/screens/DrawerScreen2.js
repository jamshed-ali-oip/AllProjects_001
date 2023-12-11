import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { colors } from './drawer/constant';
import DrawerView from './drawer/DrawerView'

export default function DrawerScreen2({ route, navigation }) {
  return (
    <DrawerView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#B01125'} />
    </DrawerView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  }
})
