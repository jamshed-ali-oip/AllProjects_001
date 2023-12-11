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
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
let {width, height} = Dimensions.get('window');

const Profile = ({navigation}) => {
  const [toggle, settoggle] = useState(false);
  const check = toggle == true;
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
        <Text style={styles.heading}>Suivi de commande</Text>
      </View>

      <View>
        {/* 1 */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Informationscreen');
          }}
          style={styles.touch}>
          <View style={styles.View}>
            <Image
              style={styles.icon}
              source={require('../images/profile.png')}
            />
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>Mes informations</Text>
            <Image style={styles.path} source={require('../images/paa.png')} />
          </View>
        </TouchableOpacity>
        {/* 2 */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Debitinfo');
          }}
          style={styles.touch}>
          <View style={styles.View}>
            <Image
              style={styles.icon}
              source={require('../images/wallet.png')}
            />
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>Mes moyens de paiement</Text>
            <Image style={styles.path} source={require('../images/paa.png')} />
          </View>
        </TouchableOpacity>
        {/* 3 */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Myorders');
          }}
          style={styles.touch}>
          <View style={styles.View}>
            <Image style={styles.icon} source={require('../images/cart.png')} />
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>Mes commandes</Text>
            <Image style={styles.path} source={require('../images/paa.png')} />
          </View>
        </TouchableOpacity>
        {/* 4 */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AboutResturant');
          }}
          style={styles.touch}>
          <View style={styles.View}>
            <Image
              style={styles.icon}
              source={require('../images/knife.png')}
            />
          </View>
          <View style={styles.box}>
            <Text style={styles.text}>Notre restaurant</Text>
            <Image style={styles.path} source={require('../images/paa.png')} />
          </View>
        </TouchableOpacity>
        {/* 5 */}
        <TouchableOpacity
          onPress={() => {
            settoggle(!toggle);
          }}
          style={styles.touch}>
          <View style={styles.View}>
            <Image
              style={styles.icon}
              source={require('../images/scale.png')}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: width * 0.9,
              borderBottomColor: '#929292',
              borderBottomWidth: check ? 0 : 1,
              alignItems: 'center',
              height: height * 0.08,
              paddingBottom: height * 0.02,
            }}>
            <Text style={styles.text}>Nos clauses</Text>
            <Image
              style={{
                height:check? height * 0.042:height * 0.032,
                width: check?width * 0.045:width * 0.032,
                resizeMode: 'contain',
              }}
              source={
                check
                  ? require('../images/paa2.png')
                  : require('../images/paa.png')
              }
            />
          </View>
        </TouchableOpacity>
        {check ? (
          <View
          style={{marginLeft:width*0.28,marginTop:-height*0.04}}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LegalNotice');
              }}
            >
              <Text
              style={{
                fontSize:width*0.035,
                color:"black"
              }}
              >Mentions légales</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Terms');
              }}
            >
              <Text
              style={{
                fontSize:width*0.035,
                marginTop: height * 0.012,
                color:"black"
              }}
              >Conditions générales de vente</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

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
  touch: {
    flexDirection: 'row',
    padding: width * 0.02,
    marginTop: height * 0.02,
  },
  box: {
    flexDirection: 'row',

    // backgroundColor:"red",
    width: width * 0.9,
    borderBottomColor: '#929292',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: height * 0.08,
    paddingBottom: height * 0.02,
  },
  text: {
    fontSize: width * 0.043,
    fontWeight: '500',
    color: '#000000',
    marginLeft: width * 0.05,
    width: width * 0.65,
  },
  path: {
    height: height * 0.032,
    width: width * 0.032,
    resizeMode: 'contain',
    // marginLeft:width*0.35,
    // marginLeft:-width * 0.,
    // position:"absolute",
    // flex
  },
  icon: {
    // elevation: 200,
    height: height * 0.065,
    width: width * 0.2,
    resizeMode: 'contain',
  },
  View: {
    height: height * 0.065,
    width: width * 0.18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
