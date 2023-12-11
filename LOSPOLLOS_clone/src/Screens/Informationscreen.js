import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
let {width, height} = Dimensions.get('window');
import Forminput from '../component/Forminput';
const Informationscreen = ({navigation}) => {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [phone, setphone] = useState('');
  const [date, setdate] = useState('');

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'#363636'} />

      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Image
            style={{
              width: width * 0.03,
              height: height * 0.04,
              resizeMode: 'contain',
            }}
            source={require('../images/cross.png')}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Mes informations</Text>
      </View>
      <ScrollView>
        <View>
          <Text style={styles.tag}>Mon profil</Text>
          <Forminput
            title={'Prénom'}
            placeholder={'Prénom'}
            setvalue={setfirstname}
            value={firstname}
            type={'name-phone-pad'}
            // type={"numeric"}
          />
          <Forminput
            title={'Nom'}
            placeholder={'Nom'}
            setvalue={setfirstname}
            value={firstname}
            // type={"numeric"}
            type={'name-phone-pad'}
          />
          <Forminput
            title={'Numéro de téléphone'}
            placeholder={'Numéro de téléphone'}
            setvalue={setfirstname}
            value={firstname}
            type={'numeric'}
          />
          <Forminput
            title={'Adresse e-mail'}
            placeholder={'Adresse e-mail'}
            setvalue={setfirstname}
            value={firstname}
            // type={"numeric"}
            type={'email-address'}
          />
          <View style={styles.line}></View>
          <Text style={styles.tag}>Adresses sauvegardées</Text>
          <View style={{marginTop: -height * 0.02}}>
            <Forminput
              // title={'Maison'}
              placeholder={'Maison'}
              setvalue={setfirstname}
              value={firstname}
              type={'name-phone-pad'}
            />
          </View>
          <View style={{marginTop: -height * 0.02}}>
            <Forminput
              // title={'Adresse e-mail'}
              placeholder={'Adresse e-mail'}
              setvalue={setfirstname}
              value={firstname}
              type={'name-phone-pad'}
            />
            {/* <TextInput
            keyboardType='email-address'
            ></TextInput> */}
          </View>
            
            <View
            
            >

            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Informationscreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: '#383838',
    height: height * 0.085,
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: width * 0.04,
  },
  heading: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: width * 0.05,
  },
  line: {
    borderBottomColor: '#929292',
    borderBottomWidth: 1,
    width: width * 0.76,
    alignSelf: 'center',
    marginTop: height * 0.025,
    marginBottom: height * 0.005,
  },
  tag: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: width * 0.13,
    marginTop: height * 0.005,
  },
});
