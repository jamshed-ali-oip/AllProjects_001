import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  Dimensions,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import InterestList from './../../Components/InterestList';
import * as actions from '../../Store/Actions';
import {connect} from 'react-redux';
import {themeRed} from '../../Assets/Colors/Colors';
const {width, height} = Dimensions.get('window');
const Data = [
  {
    Name: 'Tech',
    Image: require('./../../Assets/Images/Tech.png'),
    Value: false,
    Id: 1,
  },
  {
    Name: 'Food',
    Image: require('./../../Assets/Images/Food.png'),
    Value: false,
    Id: 2,
  },
  {
    Name: 'Animal',
    Image: require('./../../Assets/Images/Animal.png'),
    Value: false,
    Id: 3,
  },
  {
    Name: 'Art & Design',
    Image: require('./../../Assets/Images/Art.png'),
    Value: false,
    Id: 4,
  },
  {
    Name: 'Book',
    Image: require('./../../Assets/Images/Book.png'),
    Value: false,
    Id: 5,
  },
  {
    Name: 'Movie',
    Image: require('./../../Assets/Images/Movies.png'),
    Value: false,
    Id: 6,
  },
  {
    Name: 'Nature',
    Image: require('./../../Assets/Images/Nature.png'),
    Value: false,
    Id: 7,
  },
  {
    Name: 'Poetry',
    Image: require('./../../Assets/Images/Poetry.png'),
    Value: false,
    Id: 8,
  },
];
const InterestScreen = ({navigation, userInterest, Interest}) => {
  const [items, setItems] = useState([]);
  

  useEffect(() => {
    console.log(userInterest,"userInterest");
  }, [userInterest]);
  return (
    <View style={styles.container}>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}
      <View
        style={{
          // marginTop: '22%',
          alignItems: 'center',
          height: hp('100%'),
          width: '98%',
        }}>
        <FlatList
          contentContainerStyle={{
            // justifyContent:'space-between',
            // flexDirection:'column',
            // alignItems:'center',
            // alignContent:'center',
            alignSelf: 'center',
          }}
          style={{width: '100%'}}
          // contentContainerStyle={{alignSelf: 'flex-start'}}
          numColumns={4 / 2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={null}
          ListHeaderComponent={<View style={{height: 40}}></View>}
          ListFooterComponent={
            <View style={{height: 100}}>
              {/* <TouchableOpacity
              activeOpacity={0.8}
                style={{
                  alignSelf:'center',
                  width: width * 0.35,
                  height: height * 0.06,
                  backgroundColor: themeRed,
                  borderRadius: width * 0.7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Poppins-Medium',
                    fontSize: width * 0.05,
                  }}>
                  I'm Done
                </Text>
              </TouchableOpacity> */}
            </View>
          }
          data={Data}
          keyExtractor={(item, index) => index}
          extraData={items}
          renderItem={({item, index}) => (
            <InterestList
              Name={item.Name}
              Images={item.Image}
              Value={item.Value}
              Id={item.Id}
              Interest={Interest}
            />
          )}
        />
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: hp('110%'),
    backgroundColor: 'white',
  },
  scrollView: {
    marginHorizontal: 20,
  },
});

const mapStateToProps = ({userInterest}) => {
  return {userInterest};
};
export default connect(mapStateToProps, actions)(InterestScreen);
