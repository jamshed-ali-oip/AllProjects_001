import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import Header from '../components/Header';
import HistoryModal from '../components/HistoryModal';
import Heading from '../components/Heading';
import IconComp from '../components/IconComp';
import colors from '../assets/colors';
import smile from '../assets/Images/Smile.png';
import RatingComp from '../components/RatingComp';
const {width, height} = Dimensions.get('window');

const RateUs = props => {
  const [rateValue, setRateValue] = useState(0);

  const _onPressRating = rating => {
    console.log(rating);
    setRateValue(rating);
  };

  return (
    <>
      <View style={styles.container}>
        <Header
          showBack={true}
          navigation={props.navigation}
          iconName="arrow-back"
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={smile} style={styles.imageSmile} />
          <View style={styles.ratingContainer}>
            <RatingComp
              rateValue={rateValue}
              onPress={_onPressRating}
            />
          </View>
          <Heading
            title={'Thanks for Rating'.toUpperCase()}
            passedStyle={styles.heading}
            fontType="black"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: width * 0.017,
  },
  ratingContainer: {
    marginTop: height * 0.05,
    borderRadius: width * 0.03,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    paddingVertical: height * 0.07,
    backgroundColor: 'white',
    paddingHorizontal: width * 0.1,
  },
  imageSmile: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.1,
    width: width * 0.5,
    height: height * 0.14,
  },
  heading: {
    color: colors.themeBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.03,
    textAlign: 'center',
  },
});
export default RateUs;
