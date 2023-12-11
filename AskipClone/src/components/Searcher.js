import { StyleSheet, Text, View,TextInput,Dimensions,Image } from 'react-native'
import React from 'react'
const {width, height} = Dimensions.get('window');
const Searcher = () => {
  return (
    <View style={styles.searcherView}>
    <Image
      style={styles.imgtwo}
      source={require('../assets/images/searchlogo.png')}
    />
    <TextInput
      style={styles.txtinput}
    //   value={textInput}
    //   onChangeText={setTextInput}
      placeholder="Rechercher dans Askip’..."
      placeholderTextColor="#001d4f"
      
    />
  </View>
  )
}

export default Searcher

const styles = StyleSheet.create({
    searcherView: {
        width: width * 0.82,
        alignSelf: 'center',
        height: height * 0.05,
        // backgroundColor:'white',
        borderWidth: 1,
        borderColor: '#001d4f',
        borderRadius: width * 0.05,
        marginTop: height * 0.02,
        justifyContent: 'center',
      },
      imgtwo: {
        width: width * 0.047,
        height: height * 0.055,
        resizeMode: 'contain',
        marginLeft: width * 0.028,
      },
      txtinput: {
        width: width * 0.6,
        height: height * 0.05,
        color:"black",
        // borderWidth:1,
        // borderColor:'red',
        position: 'absolute',
        alignSelf: 'center',
      },
})