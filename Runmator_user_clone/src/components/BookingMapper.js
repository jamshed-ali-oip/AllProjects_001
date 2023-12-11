import {
  Dimensions,
  StyleSheet,
  Text,
  Linking,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Heading from './Heading';
import colors from '../assets/colors';
import IconComp from './IconComp';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';
import {color} from 'react-native-reanimated';
import {connect} from 'react-redux';
moment.suppressDeprecationWarnings = true;

const {width, height} = Dimensions.get('window');

const BookingMapper = ({item, onPress, isLoading, key, UserReducer}) => {
  const route = useRoute();
  const m = Math.random() * 100000000000;
  console.log(item,"--------------");
  return (
    <View key={Math.round(m)} style={styles.container}>
      {/* initiator  */}

      {/* Event Heading  */}
      <View style={styles.headingView}>
        <Heading
          title={"Braking Service"}
          passedStyle={styles.occasionText}
          fontType={'semi-bold'}
        />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.locationView}>
          <IconComp
            type="FontAwesome"
           
            iconName="bullseye"
            passedStyle={styles.locationIcon}
          />
          <Heading title={`Status:`} passedStyle={styles.label} />
          <Heading title={"Pending"} passedStyle={styles.value} />
        </View>

        {/* Native Language  */}
        {/* <View style={styles.locationView}>
          <IconComp
            type="Fontisto"
            iconName="person"
            passedStyle={styles.locationIcon}
          />
          <Heading title={`Native Language:`} passedStyle={styles.label} />

          <Heading
            title={`${item?.primary_language?.language_name}`}
            passedStyle={styles.value}
          />
        </View> */}

        {/* Language View  */}
        {item?.translating_language?.map((ele, index) => (
          <View key={index} style={styles.locationView}>
            <IconComp
              type="FontAwesome"
              iconName="language"
              passedStyle={styles.locationIcon}
            />
            <Heading title={ele?.name} passedStyle={styles.value} />

            <Heading
              title={`(${ele?.qty} Interpreters)`}
              passedStyle={styles.value}
            />
          </View>
        ))}

        {/* Event Duration  */}
        <View style={styles.locationView}>
          <IconComp
            type="MaterialIcons"
            iconName="event-note"
            passedStyle={styles.locationIcon}
          />

          <Heading
            title={`From: ${moment(
              moment(item?.start_date).toISOString(),
            ).format('DD/MMM/yyyy (HH:mm A)')}`}
            passedStyle={styles.value}
          />
        </View>

        {/* Event Duration  */}
        {/* <View style={styles.locationView}>
          <IconComp
            type="MaterialIcons"
            iconName="event-note"
            passedStyle={styles.locationIcon}
          />
          <Heading
            title={`Till: ${moment(moment(item?.end_date).toISOString()).format(
              'DD/MMM/yyyy (HH:mm A)',
            )}`}
            passedStyle={styles.value}
          />
        </View> */}

        {/* Location View  */}
        <View style={styles.locationView}>
          <IconComp
            type="MaterialIcons"
            iconName="location-on"
            passedStyle={styles.locationIcon}
          />
          <Heading
            title={"Xyz Street Country Abc"}
            passedStyle={styles.locationAddress}
          />
        </View>

        {route.name !== 'history' && (
          <>
            {item?.status === 'accept' && (
              <View
                style={[styles.locationView, {justifyContent: 'space-around'}]}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    Linking.openURL(
                      `sms:${item?.interpreter_id?.phone}?body=${'Hi'}`,
                    )
                  }
                  style={styles.messageCallStyle}>
                  <Heading
                    title="Message"
                    passedStyle={styles.messageCallTextStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    Linking.openURL(`tel:${item?.interpreter_id?.phone}`)
                  }
                  style={styles.messageCallStyle}>
                  <Heading
                    title="Call"
                    passedStyle={styles.messageCallTextStyle}
                  />
                </TouchableOpacity>
              </View>
            )}
            {isLoading ? (
              <View style={styles.loadingComponent}>
                <Heading
                  title="Please Wait"
                  passedStyle={styles.savingText}
                  fontType="semi-bold"
                />
                <LottieView
                  speed={1}
                  style={styles.lottieStyles}
                  autoPlay
                  loop
                  source={require('../assets/Lottie/loading-blue.json')}
                />
              </View>
            ) : (
              item?.status === 'accept' && (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    onPress();
                  }}
                  style={styles.completeTaskBtn}>
                  <Heading
                    title="Complete"
                    fontType={'semi-bold'}
                    passedStyle={styles.completeTaskTextStyle}
                  />
                </TouchableOpacity>
              )
            )}
          </>
        )}

        {/* <View>
            <Heading
              title={`Additional Information:`}
              passedStyle={{
                fontSize: width * 0.04,
                color: 'grey',
                marginLeft: width * 0.02,
              }}
            />
            <Heading
              title={item.additionalInformation}
              passedStyle={{
                fontSize: width * 0.04,
                color: 'black',
                marginLeft: width * 0.02,
              }}
            />
          </View> */}
      </View>
    </View>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};
export default connect(mapStateToProps, null)(BookingMapper);

const styles = StyleSheet.create({
  container: {
    marginVertical: height * 0.02,
    backgroundColor: 'white',
    alignSelf: 'center',
    width: width * 0.9,
  },
  cardBody: {
    backgroundColor: 'white',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    borderColor: colors.themeBlue,
    borderWidth: 1,
    borderBottomLeftRadius: width * 0.02,
    borderBottomRightRadius: width * 0.02,
  },
  headingView: {
    paddingHorizontal: width * 0.04,
    backgroundColor: colors.themeBlue,
    paddingVertical: height * 0.01,
    borderTopLeftRadius: width * 0.02,
    borderTopRightRadius: width * 0.02,
  },
  locationView: {
    flexDirection: 'row',
    paddingVertical: height * 0.01,
    flexWrap: 'wrap',
  },
  occasionText: {
    color: 'white',
    fontSize: width * 0.04,
  },
  locationAddress: {
    color: 'black',
    fontSize: width * 0.04,
    marginLeft: width * 0.01,
  },

  locationIcon: {
    color: colors.themeBlue,
    fontSize: width * 0.06,
  },
  messageCallStyle: {
    borderWidth: 1,
    borderColor: colors.themeBlue,
    paddingVertical: height * 0.015,
    width: width * 0.35,
    borderRadius: width * 0.03,
    alignItems: 'center',
    backgroundColor: colors.themeBlue,
    justifyContent: 'center',
  },
  messageCallTextStyle: {
    fontSize: width * 0.04,
    color: 'white',
  },
  completeTaskBtn: {
    borderWidth: 1,
    borderColor: colors.themeBlue,
    paddingVertical: height * 0.015,
    width: width * 0.75,
    alignSelf: 'center',
    borderRadius: width * 0.03,
    marginVertical: height * 0.01,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  completeTaskTextStyle: {
    fontSize: width * 0.04,
    color: colors.themeBlue,
  },
  lottieStyles: {
    height: height * 0.13,
    position: 'absolute',
    left: width * 0.1,
    right: 0,
    top: height * -0.017,
  },
  loadingComponent: {
    borderRadius: width * 0.025,
    borderWidth: 1,
    borderColor: colors.themeBlue,
    margin: 0,
    position: 'relative',
    borderWidth: 1,
    marginVertical: height * 0.01,
    borderColor: colors.themeBlue,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.07,
    alignSelf: 'center',
    width: width * 0.75,
    // marginVertical: height * 0.02,
  },
  savingText: {
    color: colors.themeBlue,
    position: 'absolute',
    left: width * 0.18,
    top: height * 0.017,
    fontSize: width * 0.045,
  },
  value: {
    fontSize: width * 0.04,
    textTransform: 'capitalize',
    color: 'black',
    marginLeft: width * 0.02,
  },
  label: {
    fontSize: width * 0.04,
    color: 'grey',
    marginLeft: width * 0.02,
  },
});
