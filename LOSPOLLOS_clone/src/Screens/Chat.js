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
    active: 1,
  },
  {
    id: 1,
    title: 'Plats',
    active: 1,
  },
  {
    id: 2,
    title: 'Pains',
    active: 1,
  },
  {
    id: 3,
    title: 'Boissons',
    active: 1,
  },
];
const Chat = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [Code, setCode] = useState(true);
  const RenderSelector = ({item}) => (
    
    <View
      style={{
        // justifyContent: 'center',
        // alignItems: 'center',
        // paddingLeft:-width*0.055,
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        activeOpacity={80}
        onPress={() => {
       
        }}
        style={{alignItems:"center"}}>
        <Image
          style={{
            height: height * 0.08,
            width: width * 0.13,
            resizeMode: 'contain',
          }}
          source={
            item.active == 1
              ? require('../images/statusdne.png')
              : require('../images/statuspend.png')
          }
        />
         <View
        style={{
          borderRightColor: 'black',
          borderRightWidth: 3,
          height: height * 0.1,
        }}></View>
      </TouchableOpacity>
     
      <View style={{flexDirection: 'row',marginTop:height*0.005}}>
        <View>
            {
                item.active==1?<Text
                style={{fontSize:width*0.035}}
                >Heure</Text>:null
            }
          
          <Text
          style={{
            fontSize:width*0.038,
            fontWeight:item.active==1?"800":"500",
            color:item.active==1?"black":"#a9a9a9",
            textAlignVertical:"center"
          }}
          >Etat de la commande</Text>
        </View>
      </View>
    </View>
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
        <Text style={styles.heading}>Suivi de commande</Text>
      </View>
      <ScrollView>
        {Code == true ? (
          <>
           
              <Text
                style={{
                  fontSize: width * 0.045,
                  fontWeight: 'bold',
                  marginVertical: height * 0.02,
                  color: 'black',
                    // textAlign:"center",
                    width: width * 0.7,
                    alignSelf:"center"
           }}>
                
                Suivez l’état de votre commande en temps réel !
              </Text>
             <View style={{
                marginLeft:width * 0.2
             }}>
             <FlatList
                data={Data}
                renderItem={RenderSelector}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                style={{backgroundColor: 'transparent'}}
                //   numColumns={3}
              />
              <View
              style={{
                height:height*0.2,
                width:width*0.1,
                backgroundColor: '#f2f2f2',
                marginTop:-height*0.1}}
              >

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
                source={require('../images/emptytime.png')}
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
           Vous n’avez pas de commande en cours
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
            Passez commande !
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}
              style={{
                height: height * 0.05,
                width: width * 0.3,
                backgroundColor: '#F7BE00',
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

export default Chat;

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
