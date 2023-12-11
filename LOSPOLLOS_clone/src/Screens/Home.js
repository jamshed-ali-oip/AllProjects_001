import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  Modal,
  Pressable,
  // FlatList
} from 'react-native';
let {width, height} = Dimensions.get('window');
import {AuthContext} from '../component/context';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../component/Header';
import Cmodal from '../component/Cmodal';
const Selector = [
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

const Data = [
  {
    id: 1,
    arr: [
      {
        id: 1,
        title: 'enteries',
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
    ],
  },
  {
    id: 2,
    arr: [
      {
        id: 1,
        title: 'plates',
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
    ],
  },
  {
    id: 3,
    arr: [
      {
        id: 1,
        title: 'pains',
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
    ],
  },
  {
    id: 4,
    arr: [
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
    ],
  },
];
const Home = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [value, setvalue] = React.useState({});
  const [value2, setvalue2] = React.useState({});
  const [Data_n, setData_n] = React.useState(Data);
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    console.log('Selector', Selector);
    setvalue2(Selector);
  }, []);
  console.log('dataqa 1 calue', value);
  console.log('first');
  const flatHandler = item => {
    setvalue(item);

    let data = Data_n;
    data.unshift(Data_n[item.id]);
    data = data.filter((v, i, a) => a.findIndex(v2 => v2.id === v.id) === i);

    console.log('data.....', data);
    setData_n(data);
  };
  const RenderSelector = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        flatHandler(item);
      }}
      style={[
        styles.selector,
        {backgroundColor: item.id == value.id ? '#c0332e' : '#bdbdbd'},
      ]}>
      <Text style={styles.celltxt}>{item.title}</Text>
    </TouchableOpacity>
  );
  const RenderFirst = ({item}) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardimage} />
      <View style={{marginLeft: width * 0.03, width: width * 0.4}}>
        <Text style={styles.tag}>{item.title}</Text>
        <Text style={styles.line}>{item.line}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <View style={{}}>
        <Image
          style={{
            height: height * 0.035,
            width: width * 0.05,
            resizeMode: 'contain',
            alignSelf: 'flex-end',
            marginBottom: height * 0.008,
          }}
          source={require('../images/rate.png')}
        />
        <View style={{flexDirection: 'row'}}>
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
              color: 'white',
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
  const Rendersecond = ({item}) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardimage} />
      <View style={{marginLeft: width * 0.03, width: width * 0.4}}>
        <Text style={styles.tag}>{item.title}</Text>
        <Text style={styles.line}>{item.line}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <View style={{}}>
        <Image
          style={{
            height: height * 0.035,
            width: width * 0.05,
            resizeMode: 'contain',
            alignSelf: 'flex-end',
            marginBottom: height * 0.008,
          }}
          source={require('../images/rate.png')}
        />
        <View style={{flexDirection: 'row'}}>
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
              color: 'white',
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
  const Renderthird = ({item}) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardimage} />
      <View style={{marginLeft: width * 0.03, width: width * 0.4}}>
        <Text style={styles.tag}>{item.title}</Text>
        <Text style={styles.line}>{item.line}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <View style={{}}>
        <Image
          style={{
            height: height * 0.035,
            width: width * 0.05,
            resizeMode: 'contain',
            alignSelf: 'flex-end',
            marginBottom: height * 0.008,
          }}
          source={require('../images/rate.png')}
        />
        <View style={{flexDirection: 'row'}}>
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
              color: 'white',
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
  const RenderFourth = ({item}) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardimage} />
      <View style={{marginLeft: width * 0.03, width: width * 0.4}}>
        <Text style={styles.tag}>{item.title}</Text>
        <Text style={styles.line}>{item.line}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <View style={{}}>
        <Image
          style={{
            height: height * 0.035,
            width: width * 0.05,
            resizeMode: 'contain',
            alignSelf: 'flex-end',
            marginBottom: height * 0.008,
          }}
          source={require('../images/rate.png')}
        />
        <View style={{flexDirection: 'row'}}>
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
              color: 'white',
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

  return (
    <SafeAreaView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          activeOpacity={80}
          onPress={() => {
            setModalVisible(false);
          }}
          style={styles.centeredView}>
          <Image
            style={styles.modalView}
            source={require('../images/modal.png')}
          />
          <View style={{position: 'absolute'}}>
            <Text
              style={{
                fontSize: width * 0.05,
                fontWeight: '800',
                color: 'black',
                textAlign:"center"
              }}>
              Oops ...
            </Text>
            <Text
              style={{
                fontSize: width * 0.05,
                fontWeight: '400',
                color: 'black',
                width: width * 0.5,
                textAlign: 'center',
              }}>
              Cet article n’est plus disponible
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
      <StatusBar backgroundColor={'#363636'} />
      <View style={styles.header}>
        <View></View>
       <TouchableOpacity
       onPress={()=>{signOut();}}
       >
       <Image style={styles.logo} source={require('../images/logo.png')} />
       </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {navigation.navigate("Notification")}}
          style={{
            alignSelf: 'flex-end',
            alignItems: 'center',
            marginBottom: height * 0.05,
            // paddingLeft:width*0.05,
          }}>
          <Image style={styles.icon} source={require('../images/bell.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputbox}>
        <Image
          style={[styles.icon, {tintColor: 'black'}]}
          source={require('../images/search.png')}
        />
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="Plat, ingrédient, boisson ..."
          // keyboardType="numeric"
        />
      </View>
      <View
        style={{
          marginTop: height * 0.03,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: width * 0.05,
          backgroundColor: 'transparent',
        }}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image style={styles.icon} source={require('../images/block.png')} />
        </TouchableOpacity>
        <FlatList
          data={Selector}
          renderItem={RenderSelector}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
      <ScrollView>
        <View style={{marginBottom: height * 0.09}}>
          <Text
            style={{
              fontSize: width * 0.04,
              fontWeight: '500',
              color: 'black',
              marginLeft: width * 0.055,
              marginTop: height * 0,
            }}>
            Entrees
          </Text>
          <FlatList
            data={Data_n[0].arr}
            renderItem={RenderFirst}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            style={{backgroundColor: 'transparent'}}
          />
          <Text
            style={{
              fontSize: width * 0.04,
              fontWeight: '500',
              color: 'black',
              marginLeft: width * 0.055,
              marginTop: height * 0,
            }}>
            Plats
          </Text>
          <FlatList
            data={Data_n[1].arr}
            renderItem={Rendersecond}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
          <Text
            style={{
              fontSize: width * 0.04,
              fontWeight: '500',
              color: 'black',
              marginLeft: width * 0.055,
              marginTop: height * 0,
            }}>
            Pains
          </Text>
          <FlatList
            data={Data_n[2].arr}
            renderItem={Renderthird}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
          <Text
            style={{
              fontSize: width * 0.04,
              fontWeight: '500',
              color: 'black',
              marginLeft: width * 0.055,
              marginTop: height * 0,
            }}>
            Boissons
          </Text>
          <FlatList
            data={Data_n[3].arr}
            renderItem={RenderFourth}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    height: height * 0.14,
    width: width * 1,
    backgroundColor: '#363636',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    height: height * 0.07,
    width: width * 0.2,
    resizeMode: 'contain',
    // alignSelf:"center",
  },
  icon: {
    height: height * 0.035,
    width: width * 0.07,
    resizeMode: 'contain',
    // alignSelf:"flex-end",
    // marginLeft:width*0.5,
  },
  input: {
    paddingLeft: width * 0.07,
  },
  inputbox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    width: width * 0.8,
    alignSelf: 'center',
    borderRadius: width * 0.03,
    backgroundColor: '#ededed',
    paddingLeft: width * 0.03,
    position: 'absolute',
    marginTop: height * 0.1,
    borderColor: '#EDEDED',
    elevation: 3,
  },
  selector: {
    margin: width * 0.01,
    padding: width * 0.015,
    borderRadius: width * 0.05,
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
    elevation: 5,
  },
  celltxt: {
    fontSize: width * 0.035,
    fontWeight: 'bold',
    color: 'white',
  },
  card: {
    height: height * 0.12,
    width: width * 0.9,
    backgroundColor: '#383838',
    alignSelf: 'center',
    margin: height * 0.008,
    borderRadius: width * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardimage: {
    heigh: height * 0.08,
    width: width * 0.15,
    resizeMode: 'contain',
    marginLeft: width * 0.035,
  },
  tag: {
    color: '#ffffff',
    fontSize: width * 0.037,
    fontWeight: '600',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.19)',
  },
  modalView: {
    margin: 25,
    // backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
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
