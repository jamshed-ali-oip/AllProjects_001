import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native'
import React from 'react'

export default function Loader({color}) {
  return (
    <View style={styles.con}>
      <ActivityIndicator size={30} color={color ? color :"rgb(7, 13, 46)"}/>
    </View>
  )
}

const styles = StyleSheet.create({
    con:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})