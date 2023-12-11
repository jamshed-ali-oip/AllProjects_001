import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 5
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image
        resizeMode='cover'
        source={item.image}
        style={styles.image}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    borderRadius: 8,
    justifyContent:'center',
    // width: '100%',
    backgroundColor:'white'
  },
  image: {
    width: '125%',
    height: 250,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center'
  },
})

export default CarouselCardItem