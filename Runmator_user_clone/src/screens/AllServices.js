import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Heading from '../components/Heading';
import Header from '../components/Header';
import * as actions from '../store/Actions/index';
import OptionsMapper from '../components/OptionsMapper';
import {connect} from 'react-redux';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function AllServices({ServicesReducer, navigation}) {
  const [services, setServices] = useState(ServicesReducer?.services);

  // Options Handler
  const _onPressOptions = (item, index) => {
    navigation.navigate('Map', {item});
  };

  useEffect(() => {
    if (ServicesReducer?.services?.length > 0) {
      setServices(ServicesReducer?.services);
    }
  }, [ServicesReducer?.services]);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header showBack={true} navigation={navigation} iconName="arrow-back" />

        <FlatList
          nestedScrollEnabled={true}
          vertical
          numColumns={2}
          contentContainerStyle={styles.flatListContentContainerStyle}
          data={services}
          keyExtractor={item => item?.id.toString()}
          ListHeaderComponentStyle={styles.flatlistHeaderStyle}
          ListHeaderComponent={() => (
            <Heading
              title="All Services"
              passedStyle={styles.heading}
              fontType="bold"
            />
          )}
          renderItem={({item, index}) => (
            <OptionsMapper
              item={item}
              index={index}
              onPress={_onPressOptions}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  flatlistHeaderStyle: {
    alignSelf: 'flex-start',
    marginHorizontal: width * 0.05,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerView: {
    marginHorizontal: width * 0.05,
  },
  heading: {
    fontSize: width * 0.1,
  },
  boxContainer: {
    borderRadius: width * 0.02,
    height: height * 0.2,
    width: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    // paddingHorizontal: width * 0.2,
    // paddingVertical: height * 0.005,
  },

  text: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: width * 0.02,
  },
  texticonhandler: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  flatListContentContainerStyle: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  icon: {
    // marginRight: width * 0.8,
  },
});

const mapStateToProps = ({ServicesReducer}) => {
  return {ServicesReducer};
};

export default connect(mapStateToProps, actions)(AllServices);
