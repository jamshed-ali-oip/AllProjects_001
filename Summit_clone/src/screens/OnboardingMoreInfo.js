import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Constants from 'expo-constants';

import colors from '../constants/colors';
import routes from '../routes/routes';
import Screen from '../components/ui/Screen';
import NextButton from '../components/ui/NextButton';
import Arrow from '../components/icons/Arrow';

const OnboardingMoreInfo = ({ navigation }) => {
  return (
    <Screen style={styles.root} containerStyle={styles.wrapper}>
      <View style={styles.firstContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.ONBOARDING_NAME_SCREEN)}
          style={styles.arrowForward}
        >
          <Text
            style={[
              styles.nextText,
              {
                color: colors.white,
              },
            ]}
          >
            NEXT
          </Text>
          <Arrow name="right" color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.secondContainer}>
        <View style={styles.topViewContainer}>
          <Text style={styles.welcomeText}>WECOME TO</Text>
          <Text style={styles.middle_Text}>
            BIG MONEY{'\n'}BUSINESS {'\n'}SUMMIT
          </Text>
          <Text style={styles.SalesText}>SALES EXPLOSION EDITION</Text>
        </View>
        <View style={styles.bottomViewContainer}>
          <View style={{ marginTop: 48 }}>
            <Text style={styles.newUserText}>WE NEED A LITTLE INFORMATION</Text>
            <Text style={styles.newUserText}>TO MAKE SURE YOU GET THE</Text>
            <Text style={styles.newUserText}>MOST OUT OF THE EVENT</Text>
          </View>
          <View style={{ position: 'absolute', bottom: 20, right: '5%' }}>
            <TouchableOpacity style={styles.joinZoomButton}>
              <FontAwesome name="video-camera" size={28} color="white" />
              <Text style={styles.joinZoomText}>JOIN WITH ZOOM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default OnboardingMoreInfo;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  firstContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    marginHorizontal: '4%',
  },
  secondContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  topViewContainer: {
    paddingLeft: '5%',
    flex: 2,
    justifyContent: 'center',
  },
  bottomViewContainer: {
    backgroundColor: colors.darkPrimary,
    width: '100%',
    flex: 1,
    paddingTop: 20,
    alignItems: 'flex-end',
    // justifyContent: 'space-around',
    paddingRight: '5%',
    position: 'relative',
  },
  welcomeText: {
    color: colors.lightGray,
    fontWeight: '600',
    fontSize: RFPercentage(2),
  },
  middle_Text: {
    color: colors.white,
    textAlign: 'left',
    fontSize: RFPercentage(6),
    fontWeight: 'bold',
  },
  SalesText: {
    color: colors.white,
    fontWeight: 'bold',
    marginTop: -8,
    fontSize: RFPercentage(2),
  },
  newUserText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: RFPercentage(2.3),
    marginBottom: 5,
  },

  joinZoomText: {
    fontSize: RFPercentage(2),
    color: colors.white,
    textAlign: 'right',
    marginLeft: 10,
  },
  joinZoomButton: {
    color: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  next: {
    color: 'white',
    fontSize: RFPercentage(2),
    marginTop: 2,
  },
  wrapper: {
    backgroundColor: colors.primary,
  },
  arrowForward: {
    // padding: 13,
    // borderRadius: 40,
    marginTop: 20,
    marginBottom: 10,
    // width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
