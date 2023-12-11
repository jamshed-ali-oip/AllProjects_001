import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TextInput,
  Image,
} from 'react-native';
import React from 'react';
import Header from '../component/Header';
import {ScrollView} from 'react-native-gesture-handler';
let {width, height} = Dimensions.get('window');
const Contactus = () => {
  return (
    <SafeAreaView>
      <Header title="CONTACTEZ-NOUS" />
      <ScrollView>
        <Text style={styles.heading}>NOTRE RESTAURANT</Text>
        <View style={styles.view}>
          <Text style={styles.texthead}>NOS HORAIRES</Text>
          <Text style={styles.text}>Nous ouvrons dans ... minutes !</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width * 0.5,
              marginLeft: width * 0.06,
              marginTop: height * 0.035,
            }}>
            <View>
              <Text style={styles.title}>Lundi</Text>
              <Text>00:00-00:00</Text>
            </View>
            <View>
              <Text style={styles.title}>Mardi</Text>
              <Text>00:00-00:00</Text>
            </View>
          </View>
          <View style={styles.cont}>
            <View>
              <Text style={styles.title}>Mercredi </Text>
              <Text>00:00-00:00</Text>
            </View>
            <View>
              <Text style={styles.title}>Jeudi</Text>
              <Text>00:00-00:00</Text>
            </View>
          </View>
          <View style={styles.cont}>
            <View>
              <Text style={styles.title}>Vendredi</Text>
              <Text>00:00-00:00</Text>
            </View>
            <View>
              <Text style={styles.title}>Samedi </Text>
              <Text>00:00-00:00</Text>
            </View>
          </View>
          <View style={styles.cont}>
            <View>
              <Text style={styles.title}>Dimanche </Text>
              <Text>Fermé</Text>
            </View>
            <View></View>
          </View>
          <Text style={styles.texthead}>ADRESSE</Text>
          <View>
            <Text
              style={[
                styles.title,
                {marginLeft: width * 0.06, marginTop: height * 0.025},
              ]}>
              Los Pollos Hermanos
            </Text>
            <Text style={{marginLeft: width * 0.06}}>XX rue ...</Text>
            <Text style={{marginLeft: width * 0.06}}>69000 LYON</Text>
          </View>
          <Text style={styles.texthead}>TELEPHONE</Text>
          <Text style={{marginLeft: width * 0.06, marginTop: height * 0.015}}>
            XXX.XXXX.XXXXX.XXX
          </Text>
        </View>
        <ImageBackground
          source={require('../images/bg.png')}
          resizeMode="cover"
          style={styles.image}>
          <Text style={styles.head}>ÉCRIVEZ-NOUS</Text>
          <View
            style={{
              marginLeft: width * 0.2,
              width: width * 0.8,
            }}>
            <Text style={styles.texthead}>
              Une question, un commentaire, une suggestion ?
            </Text>
            <Text style={[styles.text, {marginTop: height * 0.02}]}>
              Le cadre ci-dessous est fait pour vous !
            </Text>
          </View>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={number}
            numberOfLines={10}
            placeholder="Écrivez votre message ici ..."
            keyboardType="numeric"
          />
        </ImageBackground>
        <View style={{marginTop: 20, marginBottom: height * 0.15}}>
          <Text
            style={{
              fontSize: width * 0.05,
              color: 'black',
              //   margin: height*0.05,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            SUIVEZ-NOUS
          </Text>
          <View style={{
            flexDirection:"row",
            justifyContent:"space-evenly",
            width:width*0.5,
            alignContent:"center",
            alignSelf:"center",
            marginTop:height*0.02,
        
        }}>
            <View style={{
                backgroundColor:"white",
                padding:width*0.03,
                borderRadius: width * 0.03,
                elevation:5
                }}>
              <Image
                style={{
                  height: height * 0.03,
                  width: width * 0.05,
                  resizeMode: 'contain',
                }}
                source={require('../images/fb.png')}
              />
            </View>
            <View style={{
                backgroundColor:"white",
                padding:width*0.03,
                borderRadius: width * 0.03,
                elevation:5
                }}>
              <Image
                style={{
                  height: height * 0.03,
                  width: width * 0.05,
                  resizeMode: 'contain',
                }}
                source={require('../images/insta.png')}
              />
            </View>
            <View style={{
                backgroundColor:"white",
                padding:width*0.03,
                borderRadius: width * 0.03,
                elevation:5
                }}>
              <Image
                style={{
                  height: height * 0.03,
                  width: width * 0.05,
                  resizeMode: 'contain',
                }}
                source={require('../images/twiter.png')}
              />
            </View>
         
          </View>
          <View style={{flexDirection:"row",alignSelf:"center",alignItems:"center",marginTop:height*0.015}}>
                <Image style={{height:height*0.07,width:width*0.07,resizeMode:"contain"}} source={require("../images/logo.png")} />
                <Text style={{fontWeight:"bold",fontSize:width*0.035,color:"black",marginLeft:width*0.015}}>
                  © 2022
                </Text>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Contactus;

const styles = StyleSheet.create({
  heading: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: height * 0.055,
  },
  texthead: {
    fontSize: width * 0.037,
    marginTop: height * 0.025,

    color: 'black',
    fontWeight: '800',
  },
  view: {
    marginLeft: width * 0.15,
  },
  text: {
    fontSize: width * 0.037,
    color: 'black',
    fontStyle: 'italic',
    marginLeft: width * 0.01,
  },
  title: {
    fontSize: width * 0.037,
    color: 'black',
    fontWeight: '500',
    marginBottom: height * 0.004,
  },
  cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.5,
    marginLeft: width * 0.06,
  },
  image: {
    height: height * 0.5,
    width: width * 1,
    backgroundColor: '#f9af54',
    marginTop: height * 0.03,
    // paddingTop: height * 0.5,
    paddingBottom: height * 0.1,
  },
  head: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    textDecorationColor: 'black',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    marginTop: height * 0.035,
  },
  input: {
    // height: 40/,
    margin: width * 0.05,
    borderWidth: 1,
    padding: width * 0.05,
    backgroundColor: 'white',
    height: height * 0.23,
    marginBottom: height * 0.1,
    borderRadius: width * 0.04,
    textAlignVertical: 'top',
  },
});
