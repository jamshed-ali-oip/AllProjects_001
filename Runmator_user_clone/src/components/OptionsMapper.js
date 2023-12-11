import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import {imageUrl} from '../configurations/config';
import Heading from './Heading';
import NO_IMAGE from '../assets/tools.jpg';
import IconComp from './IconComp';
import LottieView from 'lottie-react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const OptionsMapper = ({item, index, onPress, isLoading}) => {
  console.log(`${imageUrl}/${item?.services_icon}/${item?.services_icon}`)
  return (
    <TouchableOpacity
      style={styles.container}
      key={index}
      activeOpacity={0.9}
      onPress={() => {
        if (isLoading) {
          return;
        }
        onPress(item, index);
      }}>
      <View style={styles.boxContainer}>
        {isLoading ? (
          <LottieView
            speed={1}
            style={styles.lottieStyles}
            autoPlay
            colorFilters={'blue'}
            loop
            source={require('../assets/Lottie/loading-blue.json')}
          />
        ) : (
          <Image
            source={
              item?.services_icon != null && item?.services_icon != undefined && item?.services_icon !== ''
                ? {
                    uri: `${imageUrl}/${item?.services_icon}/${item?.services_icon}`,
                  }
                : 
                require('../assets/no-image.png')
            }
            style={styles.imageStyle}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.texticonhandler}>
        <Heading
          passedStyle={styles.text}
          title={
            isLoading
              ? 'loading'
              : item?.services_name
              ? item?.services_name?.length > 12
                ? `${item?.services_name?.substring(0, 12)}...`
                : item?.services_name
              : 'No Name'
          }
          fontType="bold"
        />
        <IconComp
          iconName="arrow-right-bold-circle"
          type="MaterialCommunityIcons"
        />
      </View>
    </TouchableOpacity>
  );
};

export default OptionsMapper;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width * 0.025,
  },
  lottieStyles: {
    height: height * 0.2,
    width: 120,
  },
  text: {
    fontSize: width * 0.04,
    textTransform: 'capitalize',
    color: '#000',
    marginLeft: width * 0.02,
  },
  imageStyle: {
    width: width * 0.35,
    height: height * 0.2,
  },
  texticonhandler: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  heading: {
    marginLeft: width * 0.12,
  },
  boxContainer: {
    borderRadius: width * 0.02,
    height: height * 0.2,
    width: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
    backgroundColor: 'white',
    // paddingHorizontal: width * 0.2,
    // paddingVertical: height * 0.005,
  },
});
