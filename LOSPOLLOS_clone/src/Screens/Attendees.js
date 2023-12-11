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
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
let {width, height} = Dimensions.get('window');
const Data = [
  {
    id: 0,
    title: 'Entrées',
  },
  {
    id: 1,
    title: 'Plats',
  },
  {
    id: 2,
    title: 'Pains',
  },
  {
    id: 3,
    title: 'Boissons',
  },
];
const list = [
  {
    id: 1,
    title: 'boissons',
    line: 'Nombre au choix',
    price: 'X €',
    image: require('../images/menuitem.png'),
  },
  {
    id: 2,
    title: 'Poulet braisé entier',
    line: 'Nombre au choix',
    price: 'X €',
    image: require('../images/menuitem.png'),
  },
  {
    id: 3,
    title: 'Poulet braisé entier',
    line: 'Nombre au choix',
    price: 'X €',
    image: require('../images/menuitem.png'),
  },
  {
    id: 4,
    title: 'Poulet braisé entier',
    line: 'Nombre au choix',
    price: 'X €',
    image: require('../images/menuitem.png'),
  },
  {
    id: 5,
    title: 'Poulet braisé entier',
    line: 'Nombre au choix',
    price: 'X €',
    image: require('../images/menuitem.png'),
  },
];
const Attendees = ({navigation}) => {
  const [Code, setCode] = useState(true);
  const RenderSelector = ({item}) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardimage} />
      <View style={{marginLeft: width * 0.03, width: width * 0.4}}>
        <Text style={styles.tag}>{item.title}</Text>
        <Text style={styles.line}>{item.line}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <View style={{}}>
        <View style={{flexDirection: 'row', marginTop: height * 0.04}}>
          <Image
            style={{
              height: height * 0.035,
              width: width * 0.07,
              resizeMode: 'contain',
            }}
            source={require('../images/minus.png')}
          />
          <Text
            style={{
              padding: width * 0.008,
              fontSize: width * 0.04,
              textAlign: 'center',
              width: width * 0.1,
              marginTop: -height * 0.001,
              color: '#4d4d4d',
            }}>
            100
          </Text>
          <Image
            style={{
              height: height * 0.035,
              width: width * 0.07,
              resizeMode: 'contain',
            }}
            source={require('../images/plus.png')}
          />
        </View>
      </View>
    </View>
  );
  const lower = ({}) => (
    <TouchableOpacity
      activeOpacity={80}
      onPress={() => {
        setModalVisible(true);
      }}
      style={{flexWrap: 'wrap'}}>
      <Image
        style={{
          height: height * 0.18,
          width: width * 0.25,
          margin: width * 0.01,
          borderRadius: width * 0.05,
        }}
        source={require('../images/favitem.png')}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          marginTop: height * 0.125,
          marginLeft: width * 0.17,
        }}>
        <Image
          style={{resizeMode: 'contain'}}
          source={require('../images/add2.png')}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'#363636'} />

      <View style={styles.mainContainer}>
        <TouchableOpacity>
          <Image
            style={{
              width: width * 0.03,
              height: height * 0.04,
              resizeMode: 'contain',
            }}
            source={require('../images/cross.png')}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Votre panier</Text>
      </View>
      <ScrollView>
        {Code == true ? (
          <>
            <ImageBackground
              style={{
                flexDirection: 'row',
                paddingHorizontal: width * 0.025,
                paddingVertical: width * 0.025,
                marginBottom: height * 0.005,
              }}
              source={require('../images/adbox.png')}>
              <Image source={require('../images/promo.png')} />
              <View
                style={{
                  marginLeft: width * 0.02,
                }}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: width * 0.038,
                    fontWeight: '800',
                  }}>
                  Un code promo vous attends !
                </Text>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: width * 0.038,
                    // fontWeight:"800"
                    width: width * 0.7,
                  }}>
                  Encore 2€ pour bénéficier de -10% sur votre commandef
                </Text>
                <TouchableOpacity
                  style={{
                    height: height * 0.045,
                    width: width * 0.3,
                    backgroundColor: '#ffffff',
                    borderRadius: width * 0.05,
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    marginLeft: width * 0.45,
                    position: 'absolute',
                    marginTop: height * 0.055,
                    // marginBottom:height * 0.055,
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: width * 0.038,
                      fontWeight: 'bold',
                      // textAlign:"center",
                    }}>
                    J’ajoute !
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#ffffff',
                width: width * 0.9,
                borderRadius: width * 0.03,
                alignSelf: 'center',
                padding: width * 0.02,
                elevation: 2,
                marginBottom: height * 0.02,
              }}>
              <FlatList
                data={list}
                renderItem={RenderSelector}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                style={{backgroundColor: 'transparent'}}
                //   numColumns={3}
              />
              <View
                style={{
                  height: height * 0.01,
                  width: width * 0.9,
                  backgroundColor: '#ffffff',
                  marginTop: -height * 0.001,
                  //   position: 'absolute',
                }}></View>
            </View>
            <View
              style={{
                height: height * 0.22,
                width: width * 0.9,
                backgroundColor: '#ffffff',
                alignSelf: 'center',
                marginBottom: width * 0.3,
                padding: width * 0.02,
                borderRadius: width * 0.02,
              }}>
              <FlatList
                data={Data}
                renderItem={lower}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                // scrollEnabled={false}
                horizontal
                style={{backgroundColor: 'transparent'}}
              />
              <View
                style={{
                  width: width * 0.6,
                  height: height * 0.06,
                  position: 'absolute',
                  backgroundColor: '#F7BE00',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius:width* 0.05,
                  marginTop:height* 0.12,
                  alignSelf:"flex-end",
                  elevation:3
                }}>
                <Text
                  style={{
                    width: width * 0.25,
                    textAlign: 'center',
                    fontSize: width * 0.038,
                    fontWeight: '800',
                    color: '#000000',
                  }}>
                 23€
                </Text>
                <TouchableOpacity
                  style={{
                    width: width * 0.3,
                    height: height * 0.045,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius:width* 0.05,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: width * 0.038,
                      fontWeight: '800',
                      color: '#000000',
                    }}>
                    Continuer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={{marginTop: height * 0.15, alignItems: 'center'}}>
              <Image
                style={{
                  height: height * 0.25,
                  width: width * 0.5,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
                source={require('../images/emptycart.png')}
              />
            </View>
            <Text
              style={{
                fontSize: width * 0.04,
                fontWeight: '800',
                color: 'black',
                textAlign: 'center',
                width: width * 0.5,
                alignSelf: 'center',
              }}>
              Il n’y a pas d’article dans votre panier
            </Text>

            <Text
              style={{
                fontSize: width * 0.035,
                // fontWeight:"800",
                color: 'black',
                textAlign: 'center',
                width: width * 0.5,
                alignSelf: 'center',
              }}>
              Parcourez notre menu !
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}
              style={{
                height: height * 0.05,
                width: width * 0.3,
                backgroundColor: '#383838',
                alignItems: 'center',
                borderRadius: width * 0.05,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: height * 0.035,
              }}>
              <Text
                style={{
                  fontSize: width * 0.038,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                J’y vais !
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Attendees;

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.19)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
  icon: {
    height: height * 0.035,
    width: width * 0.07,
    resizeMode: 'contain',
    // alignSelf:"flex-end",
    // marginLeft:width*0.5,
  },
  celltxt: {
    fontSize: width * 0.035,
    fontWeight: 'bold',
    color: 'white',
  },
  card: {
    height: height * 0.12,
    width: width * 0.9,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
  },
  cardimage: {
    heigh: height * 0.08,
    width: width * 0.15,
    resizeMode: 'contain',
    marginLeft: width * 0.035,
  },
  tag: {
    color: '#000000',
    fontSize: width * 0.037,
    fontWeight: 'bold',
  },
  line: {
    color: 'grey',
    fontSize: width * 0.037,
  },
  price: {
    color: '#f5c107',
    fontSize: width * 0.037,
    fontWeight: 'bold',
  },
});
