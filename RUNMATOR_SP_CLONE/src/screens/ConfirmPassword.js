import React, {useState} from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import background_img from '../assets/backgroung-image.png';
import Inputbox from '../components/Inputbox';

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
const ConfirmPassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [c_password, setC_Password] = useState('');
  const _onPress = () => {
    if (password === '' || c_password === '') {
      alert('Empty Field');
    } else if (password != c_password) {
      alert('Password does not match ');
    } else {
      navigation.navigate('LogIn');
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground source={background_img} style={styles.image}>
        <Heading title="CONFIRM PASSWORD"  fontType="extra-bold"
          passedStyle={styles.heading}/>

        <View style={styles.inputBoxes}>
        <Inputbox
            value={password}
            setTextValue={setPassword}
            placeholderTilte="Password"
            isSecure={true}
            placeHolderColor="grey"
          />
          <Inputbox
            value={c_password}
            setTextValue={setC_Password}
            placeholderTilte="Confirm Password"
            isSecure={true}
            placeHolderColor="grey"
          />
        </View>

        <Button title="Change Password" onBtnPress={() => _onPress()} />
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalLinePosition: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: width * 0.5,
  },
  heading: {
    color: colors.themeBlue,
    fontSize: width * 0.1,
    paddingHorizontal: width * 0.1,
    textAlign: 'center',
    lineHeight: height * 0.07,
  },
  image: {
    justifyContent: 'center',
    width: width,
    height: height,
    alignSelf: 'center',
    alignItems: 'center',
  },
  scrollview: {
    height: height,
  },
  inputBoxes: {
    marginTop: height * 0.02,
  },
});

export default ConfirmPassword;
