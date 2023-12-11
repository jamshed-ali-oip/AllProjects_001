import Modal from 'react-native-modal';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import colors from '../assets/colors';
import Heading from './Heading';
import Inputbox from './Inputbox';
import Button from './Button';
import IconComp from './IconComp';

const { width, height } = Dimensions.get('window');

const ServiceModal = ({
  isUpdating,
  serviceName,
  setServiceName,
  servicePrice,
  setServicePrice,
  isModalVisible,
  setIsModalVisible,
  setShowDropDownModal,
  _onPressAddNewService,
  _onPressUpdateService,
  _onPressDeleteService,
  addLoading,
  delLoading
}) => {
  const [sName, setSName] = useState(serviceName);
  const [sPrice, setSPrice] = useState(servicePrice);

  const _onPressSelectService = () => {
    setIsModalVisible(false);
    setShowDropDownModal(true);
  };

  // const _onPressCancel = () => {
  //   setServicePrice('');
  //   setServiceName('');
  // };
  return (
    <Modal
      isVisible={isModalVisible}
      onModalShow={() => {
        // console.log(serviceName, servicePrice);
      }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.crossStyle}
          activeOpacity={0.8}
          onPress={() => {
            setServiceName('');
            setServicePrice('');
            setIsModalVisible(false);
          }}>
          <IconComp
            type="Entypo"
            iconName="circle-with-cross"
            passedStyle={{ color: 'black', fontSize: width * 0.07 }}
          />
        </TouchableOpacity>
        <Heading
          passedStyle={styles.label}
          title={isUpdating ? 'Update Service' : 'New Service'}
          fontType="extra-bold"
        />

        {/* Service Name  */}
        <TouchableOpacity
          onPress={() => _onPressSelectService()}
          activeOpacity={0.8}>
          <Heading
            title={serviceName.services_name ? serviceName.services_name : 'Service Name'}
            passedStyle={[
              styles.serviceName,
              serviceName ? { color: 'black' } : { color: 'rgba(0,0,0,0.6)' },
            ]}
          // passedStyle={styles.serviceName}
          />
        </TouchableOpacity>

        {/* Service Price  */}
        <Inputbox
          value={servicePrice}
          keyboardType={'decimal-pad'}
          setTextValue={setServicePrice}
          passedStyle={styles.inputStyle}
          placeHolderColor="grey"
          viewStyle={{
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0,0,0,0.08)',
          }}
          placeholderTilte="Service Price"
        />

        {/* Buttons Container  */}
        <View style={styles.flexRow}>
          <Button
            title={isUpdating ? 'UPDATE SERVICE' : 'ADD NEW SERVICES'}
            onBtnPress={() => {
              // isUpdating ? _onPressUpdateService() : _onPressAddNewService();
              _onPressAddNewService()
            }}
            loader={addLoading}
            isBgColor={false}
            btnStyle={styles.btnStyle}
            btnTextStyle={styles.btnTextStyle}
          />
        </View>
        {/* Buttons Container  */}
        {isUpdating && (
          <View style={[styles.flexRow, { marginTop: height * 0.02 }]}>
            <Button
              loader={delLoading}
              title={'DELETE SERVICE'}
              onBtnPress={() => {
                isUpdating && _onPressDeleteService();
              }}
              isBgColor={false}
              btnStyle={styles.btnStyle}
              btnTextStyle={styles.btnTextStyle}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default ServiceModal;

const styles = StyleSheet.create({
  serviceName: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.12)',
    width: width * 0.7,
    alignSelf: 'center',
    fontSize: width * 0.04,
    paddingVertical: height * 0.02,
    borderRadius: 0,
  },
  crossStyle: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  container: {
    backgroundColor: 'white',
    width: width * 0.9,
    borderRadius: width * 0.06,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  label: {
    fontWeight: '700',
    color: colors.themeBlue,
    fontSize: width * 0.1,
    alignSelf: 'center',
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.12)',
    width: width * 0.7,
    alignSelf: 'center',
    fontSize: width * 0.04,
    marginLeft: 0,
    paddingLeft: 0,
    borderRadius: 0,
  },
  btnStyle: {
    backgroundColor: colors.themeBlue,
    borderRadius: width * 0.02,
    width: width * 0.75,
    margin: 0,
  },
  cancelBtnStyle: {
    borderRadius: width * 0.025,
    width: width * 0.35,
    borderWidth: 1,
    borderColor: colors.themeBlue,
    margin: 0,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
  },
  cancelBtnTextStyle: {
    color: colors.themeBlue,
    fontSize: width * 0.04,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // backgroundColor: 'red',
    width: width * 0.75,
  },
});
