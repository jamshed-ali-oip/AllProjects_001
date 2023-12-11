import {
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {themeRed} from '../../../Assets/Colors/Colors';
import IconComp from '../../../Components/IconComp';
import AppText from '../../../Components/AppText';
const {width, height} = Dimensions.get('window');

const BMAD = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../../Assets/Images/beer-glass.jpg')}
      resizeMode="cover"
      style={{width: width, height: height,flex:1,paddingTop:10,}}>
      <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />

        {/* Images Container  */}
        <View style={styles.imagesContainer}>
          <Image
            resizeMode="contain"
            source={require('../../../Assets/Images/brand.png')}
            style={styles.bmadLogo}
          />
          {/* <Image
            resizeMode="contain"
            source={require('../../../Assets/Images/bmad.png')}
            style={styles.bmadTextLogo}
          /> */}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnWrapper}
          onPress={() => navigation.navigate('MyProfile')}>
          <AppText
            nol={2}
            textAlign="center"
            family="Poppins-SemiBold"
            size={height * 0.022}
            color="white"
            Label={`My Profile`}
          />
          <IconComp
            type={'FontAwesome'}
            iconName="user-circle-o"
            passedStyle={{color: 'white', fontSize: width * 0.05}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnWrapper}
          onPress={() => navigation.navigate('Drinks')}>
          <AppText
            nol={2}
            textAlign="center"
            family="Poppins-SemiBold"
            size={height * 0.022}
            color="white"
            Label={`Buy Drinks`}
          />
          <IconComp
            type={'Entypo'}
            iconName="drink"
            passedStyle={{color: 'white', fontSize: width * 0.05}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnWrapper}
          onPress={() => navigation.navigate('PasswordChange')}>
          <AppText
            nol={2}
            textAlign="center"
            family="Poppins-SemiBold"
            size={height * 0.022}
            color="white"
            Label={`Change Password`}
          />
          <IconComp
            type={'MaterialCommunityIcons'}
            iconName="form-textbox-password"
            passedStyle={{color: 'white', fontSize: width * 0.05}}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default BMAD;

const styles = StyleSheet.create({
  btnWrapper: {
    width: width * 0.9,
    marginVertical: height * 0.01,
    paddingVertical: height * 0.02,
    borderRadius: width*0.1,
    backgroundColor: themeRed,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    alignSelf: 'center',
    height: height * 0.075
  },
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  imagesContainer: {
    justifyContent: 'center',
    marginTop: height * 0.02,
    alignItems: 'center',
    marginBottom: height * 0.02,
    flexDirection: 'row',
  },
  bmadLogo: {
    width: width * 0.4,
    height: height * 0.15,
  },

  bmadTextLogo: {
    width: width * 0.38,
    height: height * 0.1,
  },
});
