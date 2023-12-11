import React, { useState } from "react";
import { useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ImageBackground,Dimensions,TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
const { width, height } = Dimensions.get('window');
const Cmodal = (props) => {
  const ok = useSelector(state => state?.auth?.progress)
  const notok=useSelector(state => state?.auth?.Test)
  // console.log("lora merea ",notok)
  const [modalVisible, setModalVisible] = useState(false);
  // console.log('====================================');
  // console.log();
  // console.log('====================================');
  useEffect(()=>{
    if(notok ===true){
      setModalVisible(true)
    }
  },[ok])
  const handleOnpress = () =>{
    props.onPress();
    setModalVisible(false);
    dispatch({
      type:"CLOSE"
    })
    
  }
  const dispatch = useDispatch()
    const handleOnpress2 = () =>{
    props.onPress2();
    setModalVisible(false)
    dispatch({
      type:"CLOSE"
    })
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
         <View style={styles.centeredView}>
            <View style={styles.rawBottomModalView}>
              <ImageBackground
                imageStyle={{ borderRadius: width * 0.08 }}
                style={styles.rawBottomModalImage}
                source={require('../assets/images/backgroundImage.png')}>

                <>
                  <Text style={styles.modalText}>
                    <Text style={{  fontSize: width * 0.048 }}> </Text>
                    Inscris-toi dès maintenant aux évènements ASKIP’
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: width * 0.045,
                    }}>
                    <TouchableOpacity
                       onPress={()=>handleOnpress2()}
                      style={styles.rawBottomButons}>
                      <Text style={styles.btn}>Je fonce </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rawBottomButons}
                      onPress={()=>handleOnpress()}>
                      <Text style={styles.btn}>Plus tard </Text>
                    </TouchableOpacity>
                  </View>
                </>

              </ImageBackground>
            </View>
          </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={props.onPress}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};
export default Cmodal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: width * 0.08,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // marginTop: 22
  }, rawBottomModalView: {
    width: width * 0.8,
    height: height * 0.22,
    borderRadius: width * 0.08,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    // marginTop: height * 0.3,
    alignSelf: 'center',
  },  rawBottomModalImage: {
    width: width * 0.8,
    height: height * 0.22,
    // borderRadius: width * 0.08,
    resizeMode: 'contain',
  },  modalText: {
    textAlign: 'center',
    // fontSize: width * 0.045,
    // fontWeight: '400',
    color: '#081a4f',
    marginTop: height * 0.02,
    width: width * 0.65,
    // paddingHorizontal: width * 0.045,
    alignSelf: 'center',
    textTransform: 'uppercase',
    width: width * 0.7,
    // letterSpacing: -1,
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.045,
  } , rawBottomButons: {
    width: width * 0.22,
    height: height * 0.065,
    backgroundColor: '#081a4f',
    marginTop: height * 0.025,
    marginLeft: width * 0.1,
    borderRadius: width * 0.018,
    alignSelf: 'center',
    justifyContent: 'center',
    // padding:width*0.04
  }, btn: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: width * 0.04,
  },
});