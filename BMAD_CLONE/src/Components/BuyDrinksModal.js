import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import AppText from '../Components/AppText';
import LottieView from 'lottie-react-native';
import { themeRed } from '../Assets/Colors/Colors';
import TextFieldCard from '../Components/TextFieldCard';
import { showMessage, hideMessage } from 'react-native-flash-message';


const { width, height } = Dimensions.get('window');

const BuyDrinksModal = ({
  setIsModalVisible,

  drinks,
  setDrinks,
  isModalVisible,
  setIsStripeModalVisible,
}) => {
  const [ss, setss] = useState()
  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.container}>
        <AppText
          nol={2}
          textAlign="center"
          family="Poppins-SemiBold"
          size={height * 0.023}
          color="white"
          Label={'How many drinks you want to buy?'}
        />
        {/* <TextFieldCard
          placeholder="No. of Drinks"
          value={drinks}
          onchange={setDrinks}
          keyboardType="numeric"
          secureTextEntry={false}
          placeholderTextColor="black"
          customStyle={{
            backgroundColor: 'white',
            width: width * 0.6,
            marginVertical: height * 0.02,
            fontFamily: 'Poppins-Bold',
            fontSize: width * 0.045,
          }}
        /> */}
        <TextInput
          keyboardType={'numeric'}
          placeholder={'No. of Drinks'}
          placeholderTextColor={'grey'}
          style={{
            backgroundColor: 'white',
            width: width * 0.55,
            paddingHorizontal: width * 0.03,
            paddingBottom: height * 0.007,
            marginVertical: height * 0.02,
            fontFamily: 'Poppins-Medium',
            borderRadius: width * 0.008,
            fontSize: width * 0.03,
          }}
          onChangeText={e => {
            if (Number(e) <= 5) {
              setDrinks(e);
            }
          }}
          value={drinks}
        />
        <AppText
          nol={2}
          textAlign="center"
          family="Poppins-Medium"
          size={height * 0.02}
          color="white"
          Label={'Maximum drinks: 05'}
        />
        <AppText
          nol={2}
          textAlign="center"
          family="Poppins-Medium"
          size={height * 0.015}
          color="white"
          Label={ss}
        />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => {
            //   if (Number(drinks) > 0) {
            //     setIsModalVisible(false);
            //     setIsStripeModalVisible(true);
            //   }
            // }}
            onPress={() => {
              // Check if the value contains a decimal point using regular expression
              if (!/^\d+$/.test(drinks)) {
                setss("Please enter a valid number of drinks (no decimal allowed)")
                // showMessage({
                //   message: 'Please enter a valid number of drinks (no decimal allowed)',
                //   danger: 'error',
                // });
                return; // Exit the function if the condition is not met
              }

              // Convert the string to an integer
              const intValue = parseInt(drinks);

              // Check if the parsed intValue is not NaN (i.e., it is a valid integer) and if it is greater than 0
              if (!isNaN(intValue) && intValue > 0) {
                setIsModalVisible(false);
                setIsStripeModalVisible(true);
              } else {
                setss("Please select a valid number of drinks")
                // showMessage({
                //   message: 'Please select a valid number of drinks',
                //   danger: 'error',
                // });
              }
            }}
            style={{
              marginTop: height * 0.03,
              backgroundColor: 'white',
              width: width * 0.38,
              paddingVertical: height * 0.015,
              borderRadius: width * 0.1,
            }}>
            <AppText
              nol={2}
              textAlign="center"
              family="Poppins-Bold"
              size={height * 0.02}
              color={themeRed}
              Label={'Proceed'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setDrinks('');
              setIsModalVisible(false);
            }}
            style={{
              marginTop: height * 0.03,
              backgroundColor: 'white',
              width: width * 0.38,
              paddingVertical: height * 0.015,
              borderRadius: width * 0.1,
              marginLeft: 10,
            }}>
            <AppText
              nol={2}
              textAlign="center"
              family="Poppins-Bold"
              size={height * 0.02}
              color={themeRed}
              Label={'Cancel'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeRed,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.06,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
});
export default BuyDrinksModal;
