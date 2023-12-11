import Modal from 'react-native-modal';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import moment from 'moment';
import colors from '../assets/colors';
import Button from '../components/Button';
import Heading from '../components/Heading';
import LottieView from 'lottie-react-native';
import { themePurple } from '../assets/colors/colors';

const {width, height} = Dimensions.get('window');

const DisplayNameChangeModal = ({
  isLoading,
  isModalVisible,
  packageDetails,
  setIsModalVisible,
  onPressCancelSubscription,
}) => {
  //   )}
  return (
    <Modal
      isVisible={isModalVisible}
      swipeDirection={'up'}
      onSwipeMove={p => setIsModalVisible(false)}>
      <View style={styles.container}>
        <Heading
          fontType="semi-bold"
          passedStyle={[styles.label]}
          title="Confirm Subscribe"
        />
        

        <Heading
          title={'Are you sure you want to subscribe this product?'}
          fontType={'regular'}
          passedStyle={{
            fontSize: width * 0.04,
            marginLeft: width * 0.03,
            color: 'grey',
            marginVertical: height * 0.01,
            textTransform: 'capitalize',
          }}
        />
        {/* Buttons Container  */}
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
              source={require('../assets/lottie/purple-loading-2.json')}
            />
          </View>
        ) : (
          <View style={styles.flexRow}>
            <Button
              title="Yes"
              onBtnPress={() => {
                onPressCancelSubscription();
              }}
              isBgColor={false}
              btnStyle={styles.btnStyle}
              btnTextStyle={styles.btnTextStyle}
            />

            <Button
              title="No"
              onBtnPress={() => {
                setIsModalVisible(false);
              }}
              isBgColor={false}
              btnStyle={styles.cancelBtnStyle}
              btnTextStyle={styles.cancelBtnTextStyle}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default DisplayNameChangeModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: width * 0.9,
    borderRadius: width * 0.06,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  label: {
    color: themePurple,
    fontSize: width * 0.05,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: themePurple,
    width: width * 0.8,
    borderColor: 'white',
    fontSize: width * 0.04,
    marginLeft: 0,
    paddingLeft: 0,
    paddingVertical: 6,
    color: 'black',
    borderRadius: 0,
  },
  btnStyle: {
    backgroundColor: themePurple,
    borderRadius: width * 0.025,
    width: width * 0.7,
    margin: 0,
    marginVertical: height * 0.02,
  },
  cancelBtnStyle: {
    borderRadius: width * 0.025,
    width: width * 0.7,
    borderWidth: 1,
    borderColor: themePurple,
    margin: 0,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
  },
  cancelBtnTextStyle: {
    color: themePurple,
    fontSize: width * 0.04,
  },
  flexRow: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // backgroundColor: 'red',
    width: width * 0.75,
  },
  lottieStyles: {
    height: height * 0.13,
    position: 'absolute',
    left: width * 0.11,
    right: 0,
    // top: height * -0.015,
  },
  loadingComponent: {
    borderRadius: width * 0.02,
    position: 'relative',
    borderWidth: 1,
    borderColor: themePurple,
    backgroundColor: themePurple,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: height * 0.08,
    width: width * 0.75,
    marginVertical: height * 0.02,
  },
  savingText: {
    color: 'white',
    position: 'absolute',
    left: width * 0.2,
    top: height * 0.022,
    fontSize: width * 0.045,
  },
});
