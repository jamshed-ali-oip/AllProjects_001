import React from 'react';
import {View, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from './CarouselCardContent';
import {connect} from 'react-redux';
import * as actions from '../../store/Actions/index';
import {themePurple} from '../../assets/colors/colors';
import Heading from '../Heading';
import ConfirmModal from '../ConfirmModal';
const {width, height} = Dimensions.get('window');

const CarouselCards = ({UserReducer, subscribeProduct}) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const accessToken = UserReducer?.accessToken;
  const [productType, setProductType] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);

  const data = [
    {
      body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
      sideImage: require('../../assets/images/amazon.png'),
      companyLogo: require('../../assets/images/walmart_logo.png'),
      color: '#FF9900',
      type: 'Walmart',
    },
    {
      body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
      sideImage: require('../../assets/images/walmart.png'),
      companyLogo: require('../../assets/images/amazon_logo.png'),
      color: '#007ECA',
      type: 'Amazon',
    },
    {
      body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
      sideImage: require('../../assets/images/amazon.png'),
      companyLogo: require('../../assets/images/prdct_3.png'),
      color: '#FF5A5F',
      type: 'Airbnb',
    },
    {
      body: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
      sideImage: require('../../assets/images/amazon.png'),
      companyLogo: require('../../assets/images/prdct_4.png'),
      color: '#FF9900',
      type: 'Trucking',
    },
  ];

  const onPressProduct = item => {
    setProductType(item.type);
    setShowAlert(true);
  };

  const onPressConfirm = async () => {
    setIsLoading(true);
    const apiData = {
      type: productType,
      email: UserReducer?.userData?.email,
    };
    await subscribeProduct(apiData, accessToken);

    setIsLoading(false);
    setShowAlert(false);
  };
  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        loop={true}
        ref={isCarousel}
        data={data}
        renderItem={({item, index}) => (
          <CarouselCardItem
            item={item}
            index={index}
            onPress={onPressProduct}
          />
        )}
        sliderWidth={width}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={index => setIndex(index)}
      />
      {/* {isLoading && (
        <View
          style={{
            width: width * 0.6,
            borderRadius: width * 0.04,
            backgroundColor: themePurple,
            alignSelf: 'center',
            marginTop: height * 0.02,
            paddingVertical: height * 0.02,
          }}>
          <Heading
            title={`Subscribing ${productType}...`}
            passedStyle={{
              color: 'white',
              fontSize: width * 0.042,
              alignSelf: 'center',
            }}
            fontType="medium"
          />
        </View>
      )} */}
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 7,
          height: 7,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(255, 0, 234, 1)',
        }}
        inactiveDotStyle={{
          backgroundColor: 'rgba(196, 196, 196, 1)',
        }}
        dotContainerStyle={{marginHorizontal: 5}}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
        tappableDots={true}
      />
      {/* {!showAlert && (
        <AlertModal2
          title="Confirm"
          message="Are you sure you want to subscribe this product?"
          isModalVisible={!showAlert}
          setIsModalVisible={setShowAlert}
        />
      )} */}

      {showAlert && (
        <ConfirmModal
          isLoading={isLoading}
          packageDetails={null}
          onPressCancelSubscription={onPressConfirm}
          isModalVisible={showAlert}
          setIsModalVisible={setShowAlert}
        />
      )}
    </View>
  );
};

const mapStateToProps = ({UserReducer}) => {
  return {UserReducer};
};

export default connect(mapStateToProps, actions)(CarouselCards);
