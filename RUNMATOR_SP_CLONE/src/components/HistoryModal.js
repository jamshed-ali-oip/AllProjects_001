import moment from 'moment';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../assets/colors';
const {width, height} = Dimensions.get('window');
import Button from './Button';
import Heading from './Heading';

const HistoryModal = ({data, showModal, setIsModalVisible}) => {
  // setTimeout(() => {
  //     setIsModalVisible(false)
  //  }, 4000)

  return (
    <View
      style={{
        // height: height,
        flex: 1,
      }}>
      <Modal
        isVisible={showModal}
        swipeDirection={['up']}
        onSwipeMove={p => setIsModalVisible(false)}
        onBackButtonPress={p => setTimeout}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: width * 0.05,
              borderRadius: 20,
            }}>
            <Heading
              passedStyle={styles.heading}
              title="Recipt"
              fontType="bold"
            />
            <Heading
              passedStyle={styles.label}
              title="Location"
              fontType="bold"
            />
            <Heading
              passedStyle={styles.valueWithTopSpace}
              title={`${
                data?.location.length > 80
                  ? `${data?.location.substring(0, 80)}...`
                  : data?.location
              }`}
              fontType="regular"
            />

            <Heading passedStyle={styles.label} title="Date" fontType="bold" />
            <Heading
              passedStyle={styles.valueWithTopSpace}
              title={moment(data?.date).format('hh MMMM yyyy')}
            />

            <View style={[styles.rowView, {marginTop: height * 0.03}]}>
              <Heading
                passedStyle={[styles.label]}
                title="Total Amount"
                fontType="bold"
              />
              <Heading
                passedStyle={styles.value}
                title={`$${(30).toFixed(2)}`}
                fontType="regular"
              />
            </View>

            <View style={styles.rowView}>
              <Heading
                passedStyle={styles.label}
                title="Amount Paid"
                fontType="bold"
              />
              <Heading
                passedStyle={styles.value}
                title={`$${data?.price.toFixed(2)}`}
                fontType="regular"
              />
            </View>

            <View style={styles.rowView}>
              <Heading
                passedStyle={styles.label}
                title="Refunded"
                fontType="bold"
              />
              <Heading
                passedStyle={styles.value}
                title={`$${(20.0).toFixed(2)}`}
                fontType="regular"
              />
            </View>
          </View>
          <Button
            title={'GENERATE PDF'}
            onBtnPress={() => setIsModalVisible(false)}
            isBgColor={false}
            btnStyle={styles.btnStyle}
            btnTextStyle={styles.btnTextStyle}
          />
        </View>
      </Modal>
    </View>
  );
};

export default HistoryModal;

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: 'white',
    width: width * 0.9,
    borderRadius: width * 0.07,
    paddingVertical: height * 0.05,
  },
  heading: {
    color: colors.themeBlue,
    fontSize: width * 0.08,
    alignSelf: 'center',
  },
  value: {
    fontSize: width * 0.045,
    color: 'rgba(0,0,0,0.6)',
  },
  valueWithTopSpace: {
    fontSize: width * 0.045,
    color: 'rgba(0,0,0,0.6)',
    marginTop: height * 0.01,
  },
  label: {
    color: 'black',
    fontSize: width * 0.045,
    marginTop: height * 0.01,
  },
  btnStyle: {
    marginTop: height * 0.05,
    backgroundColor: colors.themeBlue,
    borderRadius: width * 0.04,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.045
  },
});
