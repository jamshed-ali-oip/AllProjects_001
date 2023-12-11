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
const Agenda = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [Code, setCode] = useState(true);
  const RenderSelector = ({item}) => (
    <TouchableOpacity
      activeOpacity={80}
      onPress={() => {
        setModalVisible(true);
      }}
      style={{flexWrap: 'wrap'}}>
      <Image
        style={{
          height: height * 0.2,
          width: width * 0.3,
          margin: width * 0.01,
        }}
        source={require('../images/favitem.png')}
      />
      <View
        style={{
          position: 'absolute',
          marginLeft: width * 0.21,
          marginTop: height * 0.11,
        }}>
        <TouchableOpacity>
          <Image
            style={{resizeMode: 'contain'}}
            source={require('../images/fav.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={{resizeMode: 'contain'}}
            source={require('../images/add.png')}
          />
        </TouchableOpacity>
      </View>
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
        <Text style={styles.heading}>Vos favoris</Text>
      </View>
      <ScrollView>
        {Code == true ? (
          <>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}>
              <View style={styles.centeredView}>
                <TouchableOpacity
                onPress={()=>{setModalVisible(false)}}
                activeOpacity={80}
                  style={{
                    height: height * 0.15,
                    width: width * 0.8,
                    backgroundColor: '#383838',
                    borderRadius: width * 0.03,
                    elevation: 5,
                    flexDirection: 'row',

                  }}>
                  <Image
                    style={{
                      height: height * 0.15,
                      // width: width * 0.3,
                      resizeMode: 'contain',
                      // position: 'absolute',
                      marginLeft: -width * 0.02,
                      // margin: width * 0.01,
                    }}
                    source={require('../images/favitem.png')}
                  />
                  <View
                    style={{
                      // alignItems:"center
                      marginTop: height * 0.02,
                      marginLeft: width * 0.02,
                    }}>
                    <Text
                      style={{
                        fontSize: width * 0.038,
                        fontWeight: '500',
                        color: '#ffffff',
                      }}>
                      Poulet braisé entier
                    </Text>
                    <Text
                      style={{
                        fontSize: width * 0.038,
                        // fontWeight:"bold",
                        fontStyle: 'italic',
                        color: '#747474',
                      }}>
                      info
                    </Text>
                    <Text
                      style={{
                        fontSize: width * 0.038,
                        fontWeight: 'bold',
                        color: '#F7BE00',
                      }}>
                      X €
                    </Text>
                  </View>
                  <View
                  
                  >
                    <Image
                      style={{
                        height: height * 0.03,
                        width: width * 0.05,
                        resizeMode: 'contain',
                        // alignSelf:"flex-end",
                        marginLeft: width * 0.12,
                        marginTop: height * 0.012,
                      }}
                      source={require('../images/rate.png')}
                    />
                    <View style={{
                      flexDirection: 'row',
                      marginTop:height*0.06,
                      marginLeft:-width*0.06,
                      }}>
                      <Image source={require('../images/minus.png')} />
                      <Text
                      style={{
                        width:width*0.1,
                        textAlign:"center",
                        fontSize:width*0.038,
                        fontWeight:"500",
                        color:"#ffffff"
                      }}
                      >
                        0
                      </Text>
                      <Image source={require('../images/plus.png')} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: width * 0.045,
                  fontWeight: 'bold',
                  marginVertical: height * 0.02,
                  color: 'black',
                }}>
                Retrouvez vos articles préférés
              </Text>
              <FlatList
                data={Data}
                renderItem={RenderSelector}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                style={{backgroundColor: 'transparent'}}
                numColumns={3}
              />
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
                source={require('../images/emp.png')}
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
              Vous n’avez pas d’article favori
            </Text>
            <View
              style={{
                marginTop: height * 0.01,
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: width * 0.038,
                  // fontWeight:"800",
                  color: 'black',
                  textAlign: 'center',
                  //   width: width * 0.5,
                  alignSelf: 'center',
                }}>
                Appuyez sur le
              </Text>
              <Image
                style={{
                  resizeMode: 'contain',
                  //   position: 'absolute',
                  marginHorizontal: width * 0.015,
                }}
                source={require('../images/rate.png')}
              />
              <Text
                style={{
                  fontSize: width * 0.038,
                  // fontWeight:"800",
                  color: 'black',
                  textAlign: 'center',
                  //   width: width * 0.5,
                  alignSelf: 'center',
                }}>
                d’un article
              </Text>
            </View>
            <Text
              style={{
                fontSize: width * 0.035,
                // fontWeight:"800",
                color: 'black',
                textAlign: 'center',
                width: width * 0.5,
                alignSelf: 'center',
              }}>
              retrouver ici !
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}
              style={{
                height: height * 0.05,
                width: width * 0.3,
                backgroundColor: '#f5c107',
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

export default Agenda;

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
});
