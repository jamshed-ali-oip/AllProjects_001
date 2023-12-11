import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import RNCheckboxCard from 'react-native-checkbox-card';
import AppText from './AppText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const AlertModal = ({modalVisible, closeModal, message}) => {
  const [validation, setValidation] = useState(modalVisible);
  //  const ModalComponent = () =>{
  //     closeModal()
  //  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        if (validation) {
          setValidation(false);
        }
      }}
      statusBarTranslucent
      style={{
        backgroundColor: '#fffff',
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* <View style={{backgroundColor:'#B01125', width:'100%', height: '35%', position:'absolute'}}>
                    
                </View> */}
          <View
            style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <AppText
              nol={3}
              textAlign="center"
              family="Poppins-Regular"
              size={hp('2%')}
              color="grey"
              Label={message}
            />
          </View>
          <View style={{position: 'absolute', bottom: 20}}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => closeModal()}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default AlertModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '80%',
    //   alignContent:'center',
    alignSelf: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width: '80%',
    height: '25%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
  },
  buttonOpen: {
    backgroundColor: '#B01125',
  },
  buttonClose: {
    backgroundColor: '#B01125',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
