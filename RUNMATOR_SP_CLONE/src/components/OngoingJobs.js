import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Heading from './Heading';
import IconComp from './IconComp';
import userimg from '../assets/Images/user_image.png';
import React from 'react';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const OngoingJobs = ({item, index, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.popUpBoxContainer}
      activeOpacity={0.8}
      onPress={() => onPress(item, index)}>
      <View style={styles.rowView}>
        <Image source={userimg} />
        <View>
          <Heading
            passedStyle={styles.popUpText}
            title={item.name}
            fontType="bold"
          />
          <Heading
            passedStyle={styles.textMechanic}
            title={item.type}
            fontType="medium"
          />
        </View>
      </View>

      <IconComp
        iconName="chevron-with-circle-right"
        type={'Entypo'}
        passedStyle={styles.icon_style}
      />
    </TouchableOpacity>
  );
};

export default OngoingJobs;

const styles = StyleSheet.create({
  popUpBoxContainer: {
      marginVertical: height * 0.014,
    flexDirection: 'row',
    paddingHorizontal: width * 0.04,
    justifyContent: 'space-between',
    borderRadius: width * 0.02,
    height: height * 0.13,
    width: width * 0.85,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      height: 9,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: '#fff',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popUpText: {
    fontSize: height * 0.025,
    color: 'black',
    marginLeft: width * 0.03,
  },
  textMechanic: {
    fontSize: height * 0.017,
    color: 'gray',
    marginLeft: width * 0.03,
  },
  icon_style: {
    marginLeft: width * 0.14,
  },
});
