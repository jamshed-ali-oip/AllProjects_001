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
import {connect} from 'react-redux';
import * as actions from '../store/Actions/index';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Walkthrough = ({navigation,is_walk_thorugh_seen}) => {
  const _onPressGetStarted = () => {
    is_walk_thorugh_seen().then(()=>{
      navigation.navigate('LogIn')
    })
  };
  return (
    <ImageBackground source={background_img} style={styles.image}>
      <Image resizeMode="contain" source={logo} style={styles.logo} />
        <View style={{marginVertical:height*0.2}}>
        <Button
            title="GET STARTED >"
            onBtnPress={() => _onPressGetStarted()}
            isBgColor={true}
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
    width: width,
    height: height,
    alignSelf: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6,
    height: height * 0.22,
    marginTop: height * 0.3,
  },
});

export default connect(null,actions)(Walkthrough);
