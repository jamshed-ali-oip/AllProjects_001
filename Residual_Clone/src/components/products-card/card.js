import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import style from './card_style';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

const productCard = props => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // const [count, setCount] = useState(0);

  // const onPress = () => {
  //     setCount(count + 1);
  // };

  return (
    <View style={style.product_card}>
      {/* <Modal
                isVisible={isModalVisible}
                animationType={"fade"}
                transparent={false}

            >
                <View style={style.modal_container} >
                    <View style={[style.modal_content, {alignItems : 'center', justifyContent : 'center', flex : 1}]}>
                        <Text style={style.modal_counter}>0</Text>
                        <Text style={style.modal_title}>Invested</Text>
                        <Text style={style.modal_counter}>0</Text>
                        <Text style={style.modal_title}>Earned</Text>
                    </View>
                    <TouchableOpacity
                        onPress={toggleModal}
                        style={style.modal_btn_close}
                    >
                        <LinearGradient
                            colors={['#7124BC', '#437AD8', '#05F0FF']}
                            style={style.button_cancel_bg}
                            start={{ y: 0.0, x: -0.05 }}
                            angleCenter={{ x: 5, y: 0 }}
                            end={{ y: 0.0, x: 1.2 }}>
                            <Icon
                                name='times'
                                style={style.button_cancel}
                            />
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={toggleModal}
                        style={style.modal_btn_parent}
                    >
                        <LinearGradient
                            colors={['#7124BC', '#437AD8', '#05F0FF']}
                            style={style.button}
                            start={{ y: 0.0, x: -0.05 }}
                            angleCenter={{ x: 5, y: 0 }}
                            end={{ y: 0.0, x: 1.2 }}>
                            <Text style={style.button_text}>PURCHASE NOW</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Modal> */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if (props.type === 'AirBNB' || props.type === 'Trucking') {
            props.onPress(props.type);
          } else {
            props.navigation.navigate('ProductsListings', {type: props.type});
          }
        }}
        title="Show modal">
        <LinearGradient
          colors={['#7124BC', '#437AD8', '#05F0FF']}
          style={style.gradient_card}
          start={{y: 0.0, x: -0.01}}
          angleCenter={{x: 50, y: 0}}
          end={{y: 0, x: 1}}>
          <View style={style.left_details}>
            <Image source={props.img} />
            <Text style={style.image_detail}>{props.msg}</Text>
          </View>
          <View style={style.right_details}>
            <Text style={style.right_title}>{props.title}</Text>
            <Text style={[style.right_number, {marginTop: 10}]}>
              {props.sales}
            </Text>
            <Text style={style.right_number}>{props.number}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default productCard;
