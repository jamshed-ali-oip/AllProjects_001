import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import {themePurple} from '../assets/colors/colors';

import PromotionCard from '../components/promotion-card/card';

const {height, width} = Dimensions.get('window');

const image = require('../assets/images/login_bg.png');
const promotionImg1 = require('../assets/images/promotion_page/card-1.png');
const promotionImg2 = require('../assets/images/promotion_page/card-2.png');
const promotionImg3 = require('../assets/images/promotion_page/card-3.png');
const promotionImg4 = require('../assets/images/promotion_page/card-4.png');

const Promotion = ({navigation}) => {
  const STATUS_BAR_HEIGHT =
    Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{flex: 1, alignItems: 'center'}}>
      <View style={{height: STATUS_BAR_HEIGHT, backgroundColor: themePurple}}>
        <StatusBar
          translucent
          backgroundColor={themePurple}
          barStyle="light-content"
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: height * 0.05,
            // backgroundColor:'red',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <Image
              style={{height: 30, width: 30}}
              source={require('../assets/images/menu.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Image
            style={{height: 50, width: 50}}
            source={require('../assets/images/app-logo.png')}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: 'white',
                  justifyContent: 'center',
                  opacity: 0,
                }}
                source={require('../assets/images/refresh.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={style.main_title}>Promotions</Text>
        <View>
          <PromotionCard
            img={promotionImg1}
            link="https://www.amazon.com/gp/help/customer/display.html?nodeId=202075790"
          />
          <PromotionCard
            img={promotionImg2}
            link="https://vimeo.com/features/video-library"
          />
          <PromotionCard
            img={promotionImg3}
            link="https://www.amazon.com/gp/help/customer/display.html?nodeId=202075790"
          />
          <PromotionCard img={promotionImg4} link="https://www.lipsum.com/" />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  main_title: {
    fontSize: width * 0.06,
    color: 'white',
    marginBottom: 25,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Promotion;
