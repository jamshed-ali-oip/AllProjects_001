import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import colors from '../assets/colors';
import Heading from './Heading';
import IconComp from './IconComp';
import Button from '../components/Button';
import {BlurView} from '@react-native-community/blur';

const {width, height} = Dimensions.get('window');

const BottomSheet = ({sheetRef, onPress, onPressCallNow}) => {
  return (
    <RBSheet
      ref={sheetRef}
      height={height * 0.5}
      openDuration={250}
      customStyles={{
        container: {
          justifyContent: 'center',
          //   alignItems: 'center',
          borderTopLeftRadius: width * 0.06,
          borderTopRightRadius: width * 0.06,
        },
      }}>
      {/* User Info  */}
      <View style={styles.userInfoView}>
        <Image
          source={require('../assets/Images/user.png')}
          style={styles.userImage}
          resizeMode="contain"
        />
        <View style={styles.textView}>
          <Heading
            title={'michael reimer'}
            passedStyle={styles.username}
            fontType="bold"
          />
          <Heading
            title={'mechanic'}
            passedStyle={styles.mechanic}
            fontType="medium"
          />
        </View>
      </View>

      {/* Vehicle Info  */}
      <View style={styles.vehicleInfo}>
        <View style={styles.spaceBetween}>
          {/* Vehicle No  */}
          <View style={styles.rowView}>
            <IconComp
              iconName="car"
              type="FontAwesome"
              passedStyle={styles.vehicleIcon}
            />
            <Heading
              title="vehicle no."
              passedStyle={styles.vehicleLabel}
              fontType="medium"
            />
          </View>
          <Heading
            title="AB-123456"
            passedStyle={styles.vehicleNo}
            fontType="medium"
          />
        </View>
        {/* Call Now  */}
        <TouchableOpacity
          style={styles.spaceBetween}
          activeOpacity={0.7}
          onPress={() => onPressCallNow()}>
          <View style={styles.rowView}>
            <IconComp
              iconName="phone"
              type="FontAwesome"
              passedStyle={styles.vehicleIcon}
            />
            <Heading
              title="call now"
              passedStyle={styles.vehicleLabel}
              fontType="medium"
            />
          </View>
          <Heading
            title="0800 1234 567"
            passedStyle={styles.vehicleNo}
            fontType="medium"
          />
        </TouchableOpacity>
      </View>

      {/* Start Tracking Button  */}
      <Button
        title="START TRACKING"
        onBtnPress={() => onPress()}
        isBgColor={false}
        btnTextStyle={styles.btnTextStyle}
        btnStyle={styles.btnStyle}
      />
    </RBSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  userInfoView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: width * 0.1,
  },
  userImage: {
    width: width * 0.15,
  },
  btnStyle: {
    alignSelf: 'center',
    width: width * 0.9,
    borderRadius: width * 0.02,
    backgroundColor: colors.themeBlue,
    textTransform: 'uppercase',
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
  },
  spaceBetween: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.03,
  },
  vehicleNo: {
    color: 'black',
    fontSize: width * 0.035,
  },
  textView: {
    flexDirection: 'column',
    paddingLeft: width * 0.04,
  },
  username: {
    color: 'black',
    fontSize: width * 0.05,
    textTransform: 'capitalize',
  },
  mechanic: {
    fontSize: width * 0.038,
    color: 'gray',
    textTransform: 'capitalize',
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleIcon: {
    fontSize: width * 0.05,
    color: colors.themeBlue,
    paddingRight: width * 0.03,
  },
  vehicleLabel: {
    color: 'black',
    fontSize: width * 0.035,
    textTransform: 'capitalize',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
