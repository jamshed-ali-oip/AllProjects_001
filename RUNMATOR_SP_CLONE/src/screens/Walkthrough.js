import React from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import background_img from '../assets/backgroung-image.png';
import logo from '../assets/run-matter-logo.png';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import colors from '../assets/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Walkthrough = ({navigation}) => {
  const _onPressSignUp = () => {
    navigation.navigate('LogIn');
  };
  return (
    <ImageBackground source={background_img} style={styles.image}>
      <Image resizeMode="contain" source={logo} style={styles.logo} />
        <View style={{marginVertical:height*0.2}}>
        <Button
            title="GET STARTED >"
            onBtnPress={() => _onPressSignUp()}
            isBgColor={false}
            btnStyle={styles.btnStyle}
            btnTextStyle={styles.btnTextStyle}
        />
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  btnStyle:{
    backgroundColor:colors.themeBlue,
    borderRadius:width * 0.8,
    width : width * 0.7
  },
  btnTextStyle: {
    color:'white',
    fontFamily:"Montserrat-SemiBold"
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6,
    height: height * 0.22,
    marginTop: height * 0.3,
  },
});

export default Walkthrough;
