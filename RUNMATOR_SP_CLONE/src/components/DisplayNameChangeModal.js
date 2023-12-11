import Modal from 'react-native-modal';
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import colors from '../assets/colors';
import Heading from '../components/Heading';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';

const {width, height} = Dimensions.get('window');

const DisplayNameChangeModal = ({
  value,
  setValue,
  isModalVisible,
  setIsModalVisible,
  call
}) => {
  const [text, setText] = useState(value);
  return (
    <Modal
      isVisible={isModalVisible}
      swipeDirection={'up'}
      onSwipeMove={p => setIsModalVisible(false)}
      onBackButtonPress={p => setTimeout}>
      <View style={styles.container}>
        <Heading passedStyle={[styles.label]} title="Change Display Name" />
        <Inputbox
          value={text}
          setTextValue={setText}
          viewStyle={styles.inputStyle}
          placeHolderColor={'rgba(0,0,0,0.3)'}
          placeholderTilte={"Display Name"}
          textInputStyle={{paddingLeft:0, paddingBottom:0,}}
        />

        {/* Buttons Container  */}
        <View style={styles.flexRow}>
          <Button
            title="DONE"
            onBtnPress={() => {
              call(text)
              setValue(text);
              setIsModalVisible(false);
            }}
            isBgColor={false}
            btnStyle={styles.btnStyle}
            btnTextStyle={styles.btnTextStyle}
          />

          <Button
            title="CANCEL"
            onBtnPress={() => {
              setIsModalVisible(false);
            }}
            isBgColor={false}
            btnStyle={styles.cancelBtnStyle}
            btnTextStyle={styles.cancelBtnTextStyle}
          />
        </View>
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
    fontWeight: '700',
    color: 'black',
    fontSize: width * 0.05,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.12)',
    width: width * 0.75,
    alignSelf:'center',
    fontSize:width* 0.04,
    borderRadius: 0,
  },
  btnStyle: {
    backgroundColor: colors.themeBlue,
    borderRadius: width * 0.025,
    width: width * 0.35,
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
    justifyContent:'space-between',
    alignSelf: 'center',
    // backgroundColor: 'red',
    width : width * 0.75,
  },
});
