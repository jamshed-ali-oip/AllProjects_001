import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');

const Redirect = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={styles.backImage}
          source={require('../../assets/images/backImage.png')}
        >
          <TouchableOpacity style={styles.backcontainer}
          onPress={()=>{navigation.navigate("EventsScreens")}}
          >
            <Image
              style={styles.gobackImage}
              source={require('../../assets/images/prev.png')}
            />
          </TouchableOpacity>
          <View style={styles.downContainer}>
            <Image
              resizeMode='contain'
              style={styles.logo}
              source={require('../../assets/images/askipLogo.png')}
            />
            <Text style={styles.description}>
              Pour pouvoir t’inscrire
              à nos événements,
              il faut que tu complètes
              ton profil à 100% !
            </Text>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate("ProfileScreens")}}
            style={styles.btn}>
              <Text style={styles.txt}>
                J’y fonce !
              </Text>
            </TouchableOpacity>
          </View>


        </ImageBackground>
      </View>
    </SafeAreaView>
  )
}

export default Redirect

const styles = StyleSheet.create({
  backImage: {
    width: width * 1,
    height: width * 2,
    flex: 1,
  },
  backcontainer: {
    width: width * 0.16,
    height: height * 0.08,
    backgroundColor: '#fdbf18',
    borderRadius: width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: width * 0.045
  },
  gobackImage: {
    width: width * 0.04,
    height: height * 0.04,
  },
  downContainer: {
    width: width * 0.7,
    height: height * 0.7,
    // backgroundColor: 'red',
    alignSelf: 'center'
  },
  btn: {
    width: width * 0.55,
    height: height * 0.06,
    backgroundColor: '#081a4f',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: width * 0.03,
  },
  txt: {
    color: 'white',
    fontWeight: '500'
  },
  logo: {
    width: width * 0.6,
    height: height * 0.23,
    alignSelf: 'center',
    marginTop: height * 0.05
  },
  description: {
    color: '#081a4f',
    textAlign: 'center',
    width: width * 0.72,
    textTransform: 'uppercase',
    paddingHorizontal: width * 0.04,
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.058, 
  }
})