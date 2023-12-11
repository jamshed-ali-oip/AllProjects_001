import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, FlatList, Dimensions, Image } from 'react-native';
import { Text, View } from '../components/Themed';
const { height, width } = Dimensions.get('window');

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1fsdfb1-46c2-aed5-3ad53abb28ba',
    title: 'fourth Item',
  },
  {
    id: '3ac68afc-c605-4sadfas8d3-a4f8-fbd91aa97f63',
    title: 'fifth Item',
  },
  {
    id: '58694a0f-3da1-4asdsa71f-bd96-145571e29d72',
    title: 'sixth Item',
  },
];
const Item = ({ title }: any) => (
  <View style={styles.item}>
    <Image
      style={styles.image}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
    />

    <View style={styles.line}>
      <Text style={{ color: "white", fontSize: 15, width: width * .7, letterSpacing: 2 }}>
        You have sent 10 gifts to Angel hopskin   Angel hospkin
      </Text>

      <Text style={{ color: "white", fontSize: 15 }}>
        02/10/2022
      </Text>
    </View>
  </View>


);


export default function Screen() {
  const renderItem = ({ item }: any) => (
    <Item title={item.title} />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        style={{ marginRight: 20, elevation: 20 }}
        renderItem={renderItem}
        keyExtractor={item => item.id}

      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0c0c",
    alignItems: "center"

  },
  item: {
    backgroundColor: 'black',
    height: height * .15,
    width: width * 1,
    flexDirection: "row",




  },
  title: {
    fontSize: 15,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: 5
  },
  image: {
    height: height * 0.12,
    width: width * .2,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    // alignContent:"center",
    alignItems: "center"

  },
  line:{
    borderBottomColor: "#5f5e5e",
    width: width * 1,
    borderBottomWidth: 1,
    padding: 10,
    flexWrap: "wrap"
  }
});
