import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
const {width, height} = Dimensions.get('window');

const Data = [
  {
    id: 1,
    title: 'Je reçois trop de notifications',
  },
  {
    id: 2,
    title: 'Ce projet ne mintéresse plus',
  },
  {
    id: 3,
    title: 'Autre',
  },
];
const CPage11 = ({setPage}) => {
  const [State, setState] = useState({});
  return (
    <>
      <View style={styles.mainView}>
        <Text style={styles.heading}>Supprimer mon compte</Text>

        <Text style={styles.description}>
          Dis nous pourquoi tu nous quittes :
        </Text>
      </View>
      {Data.map(item => {
        return (
          <View style={styles.view}>
            <TouchableOpacity
              onPress={() => {
                setState(item);
              }}>
              <Image 
                style={styles.image}
                source={
                  State.id == item.id
                    ? require('../../assets/images/selectedcircle.png')
                    : require('../../assets/images/circle.png')
                }
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.text,
                {
                  fontFamily:
                    State.id == item.id
                      ? 'Bebas Neue Pro Bold'
                      : 'Bebas Neue Pro Regular',
                },
              ]}>
              {' '}
              {item.title}
            </Text>
          </View>
        );
      })}
       <TouchableOpacity
        onPress={() =>State=={}?alert("PLease Select the feild"):setPage(12)}
        style={styles.Connnection}>
        <Text style={styles.C_btntext}>Suivant</Text>
      </TouchableOpacity>
      <View style={{height: height * 0.108}}></View>
    </>
  );
};

export default CPage11;

const styles = StyleSheet.create({
  text: {
    fontSize: width * 0.044,
    color: '#000000',
    marginLeft: width * 0.02,
    fontFamily: 'Bebas Neue Pro Regular',
    letterSpacing: 0.35,
  },
  image: {
    width: width * 0.05,
    height: height * 0.04,
    resizeMode: 'contain',
  },
  mainView: {
    alignItems: 'center',
  },
  heading: {
    //  fontSize: width * 0.04,
    textAlign: 'center',
    marginTop: height * 0.03,
    marginVertical: height * 0.02,
    // fontWeight: '700',
    color: 'black',
    fontFamily: 'Bebas Neue Pro Bold',
    fontSize: width * 0.055,
    textTransform: 'uppercase',
  },
  description: {
    // fontSize: width * 0.035,
    color: '#000000',
    textAlign: 'center',
    width: width * 0.85,
    marginVertical: height * 0.0125,
    fontFamily: 'Bebas Neue Pro Regular',
    fontSize: width * 0.045,
    letterSpacing: 0.4,
  },
  view: {
    flexDirection: 'row',
    marginTop: height * 0.02,
    alignItems: 'center',
    paddingHorizontal: width * 0.1,
  },Connnection: {
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
});
