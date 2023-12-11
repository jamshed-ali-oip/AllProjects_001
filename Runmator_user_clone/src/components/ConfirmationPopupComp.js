import moment from 'moment';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../assets/colors';
import Button from './Button';
import userimg from '../assets/user_image.png';

const {width, height} = Dimensions.get('window');

const ConfirmationPopupComp = ({showModal, setIsModalVisible}) => {
  setTimeout(() => {
    setIsModalVisible(false);
  }, 4000);

  return (
    <View
      style={{
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
              flexDirection: 'row',
            }}>
            <Image source={userimg} style={{marginLeft: width * 0.04}} />
            <Text style={styles.text}>Michael Reimer</Text>
          </View>
          <View style={{paddingHorizontal: width * 0.05}}>
            <Text
              style={{
                fontSize: width * 0.05,
                marginTop: height * 0.01,
                borderTopWidth: 1,
                borderTopColor: 'grey',
              }}>
              Vehicle No.
            </Text>

            <Text
              style={{
                fontSize: width * 0.05,
                marginTop: height * 0.01,
                marginBottom: height * 0.01,
                borderTopWidth: 1,
                borderTopColor: 'black',
              }}>
              Call Now
            </Text>
          </View>
          <Button
            title={'Start Tracking'}
            onBtnPress={() => setIsModalVisible(false)}
            isBgColor={true}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmationPopupComp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: width * 0.9,
    borderRadius: width * 0.08,
    paddingVertical: height * 0.03,
    marginTop: height * 0.6,
  },
  text: {
    fontSize: height * 0.03,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: width * 0.03,
  },
});
