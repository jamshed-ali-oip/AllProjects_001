import {
  StyleSheet,
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {React, useState} from 'react';
import Colors from '../../assets/colors/Colors';
import {Connnection} from '../../components/BTNS';
const {height, width} = Dimensions.get('window');
const Forget = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [M1, setM1] = useState(true);
  const [M2, setM2] = useState(false);
  const [M3, setM3] = useState(false);
  const [Data, setData] = useState(1);

  const data=[
    {
      name:"Par mail",
      id:1
    },
    {
      name:"Par SMS",
      id:2
    }
  ]
  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.modalView}>
            <ImageBackground
              style={{
                tintColor: Colors.theme_color,
                height: height * 0.235,
                alignSelf: 'center',
                width: width * 0.81,
                resizeMode: 'contain',
              }}
              source={require('../../assets/images/wave2.png')}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                  setModalVisible(false);
                  
                }}
                style={{padding: width * 0.02}}>
                <Image source={require('../../assets/images/crs.png')} />
              </TouchableOpacity>
              <Image
                style={{
                  alignSelf: 'center',
                  height: height * 0.06,
                  width: width * 0.1,
                  resizeMode: 'contain',
                  marginBottom: height * 0.01,
                }}
                source={require('../../assets/images/oppsl.png')}
              />
              <Text style={styles.modaltext}>Oops...</Text>
              <Text style={styles.modaltext}>
                tu as oublié ton mot de passe ?
              </Text>
            </ImageBackground>

            {/* material */}
            {M1 == true ? (
              <View>
                <Text
                  style={{
                    width: width * 0.45,
                    // fontSize: width * 0.035,
                    textAlign: 'center',
                    // fontWeight: '600',
                    color: 'black',
                    marginTop: height * 0.03,
                    fontFamily: 'Bebas Neue Pro Bold',
                    fontSize: width * 0.045,
                    marginLeft: width * 0.1, 
                  }}>
                  Comment souhaites-tu recevoir un mot de passe temporaire ?
                </Text>
              {
                data.map((item)=>{
                  return(
                     <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: width * 0.05,
                    marginTop: height * 0.02,
                  }}>
                  <TouchableOpacity
                  onPress={()=>{setData(item.id)}}
                  >
                    <Image source={Data==item.id?require('../../assets/images/selectedcircle.png'):require('../../assets/images/round.png')} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      // fontSize: width * 0.038,
                      marginLeft: width * 0.038,
                      fontFamily: 'Bebas Neue Pro Regular',
                      fontSize: width * 0.05,
                    }}>
                   {item.name}
                  </Text>
                </View> 
                  )
                })
              }
              

                <TouchableOpacity
                  onPress={() => (setM1(false), setM2(true))}
                  style={styles.Connnection}>
                  <Text style={styles.C_btntext}>Envoyer</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {M2 == true ? (
              <View
              style={{alignItems:"center",marginTop:height*0.05}}
              >
                <Text style={styles.disc}>
                  Consulte ta boîte mail ! Un mot de passe
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                  style={styles.text}
                  > temporaire de</Text>
                  <Text
                  style={styles.text2}
                  > 20 minutes</Text>
                  <Text
                  style={styles.text}
                  > t’as été envoyé.</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                  style={styles.text}
                  > N’hésite pas à le</Text>
                  <Text
                  style={styles.text2}
                  > réinitialiser</Text>
                  <Text
                  style={styles.text}
                  > quand tu seras</Text>
                  
                </View>
                <Text
                  style={styles.text}
                  > connecté !</Text>

                <TouchableOpacity
                  // onPress={() => (setM2(false), setM3(true))}
                  style={[styles.Connnection,{backgroundColor:Colors.ButtonBorder}]}>
                  <Text style={styles.C_btntext}>Continuer</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {/* {M3 == true ? (
              <View>
                <Text
                  style={{
                    width: width * 0.55,
                    fontSize: width * 0.035,
                    textAlign: 'center',
                    fontWeight: '600',
                    color: 'black',
                    marginTop: height * 0.03,
                  }}>
                  Comment souhaites-tu recevoir un mot de passe temporaire ?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: width * 0.05,
                    marginTop: height * 0.02,
                  }}>
                  <TouchableOpacity>
                    <Image source={require('../images/round.png')} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: width * 0.038,
                      marginLeft: width * 0.038,
                    }}>
                    Par mail
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: width * 0.05,
                    marginTop: height * 0.02,
                  }}>
                  <TouchableOpacity>
                    <Image source={require('../images/round.png')} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: width * 0.038,
                      marginLeft: width * 0.038,
                    }}>
                    Par SMS
                  </Text>
                </View>

                <TouchableOpacity
                  //  onPress={() =>(setM2(false),setM3(true))}
                  style={styles.Connnection}>
                  <Text style={styles.C_btntext}>33</Text>
                </TouchableOpacity>
              </View>
            ) : null} */}
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Forget;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blurtheme,
    flex: 1,
  },
  disc: {
    width: width * 0.7,
    // fontSize: width * 0.035,a
    textAlign: 'center',
    // fontWeight: '600',
    color: 'black',
    marginTop: height * 0.03,
    marginLeft: width * 0.035,
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.045,
  },
  centeredView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // // marginTop: 22,
    // backgroundColor: 'green',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: width * 0.03,
    alignItems: 'center',
    shadowColor: '#000',
    width: width * 0.8,
    height: height * 0.6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
    marginTop: height * 0.15,
  },
  modaltext: {
    textAlign: 'center',
    // fontSize: width * 0.045,
    // fontWeight: '800',
    // letterSpacing: -0.8,
    color: Colors.whitetext,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.053,

  },
  Connnection: {
    height: height * 0.06,
    width: width * 0.65,
    borderRadius: width * 0.02,
    // alignItems:"center",
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: height * 0.015,
    // borderWidth:1,
    backgroundColor: Colors.grey,
    marginTop: height * 0.04,
    // borderColor:Colors.ButtonBorder
  },
  C_btntext: {
    textAlign: 'center',
    // fontSize: width * 0.045,
    // fontWeight: '800',
    color: Colors.whitetext,
    letterSpacing: 0,
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.053,
  },
  text:{
    // fontSize: width * 0.035,
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.045,
    textAlign: 'center',
    fontWeight: '600',
    color: 'black',
  },
  text2:{
    // fontSize: width * 0.035,
    textAlign: 'center',
    // fontWeight: '600',
    color: Colors.ButtonBorder,
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.045,
  }
});
