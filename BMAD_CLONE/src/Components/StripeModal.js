import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import AppText from '../Components/AppText';
import LottieView from 'lottie-react-native';
import {themeRed} from '../Assets/Colors/Colors';

const {width, height} = Dimensions.get('window');

const StripeModal = ({
  onPress,
  isModalVisible,
  setIsModalVisible,
  setId,
  isLoading,
}) => {
  const [isCardComplete, setIsCardComplete] = useState(false);
  const {createPaymentMethod} = useStripe();
  const {createToken} = useStripe();

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.container}>
        <AppText
          nol={2}
          textAlign="center"
          family="Poppins-Bold"
          size={height * 0.028}
          color="white"
          Label={'Card   Credentials'}
        />
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: 'white',
            textColor: themeRed,
            borderWidth: 1,
            borderColor: themeRed,
            borderRadius: 5,
            fontSize: 16,
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={cardDetails => {
            console.log('Card complete: ', cardDetails.complete);
            if (cardDetails.complete) {
              createToken({type: 'Card', ...cardDetails}).then(res => {
                console.log('Stripe Card Response: ', res);
                setIsCardComplete(cardDetails?.complete);
                setId(res?.token?.id);
              });
            }
          }}
          //   onCardChange={cardDetails => {
          //     console.log('Card complete: ', cardDetails.complete);
          //     if (cardDetails.complete) {
          //         createPaymentMethod({ type: 'Card', cardDetails }).then(res => {
          //         console.log('Stripe Card Response: ', res);
          //         setIsCardComplete(cardDetails?.complete);
          //         setId(res?.token?.id);
          //       });
          //     }
          //   }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        />

        {/* Buttons Container  */}
        {isLoading ? (
          
             <LottieView
                style={{
                  position:'absolute',
                  top:height * 0.094,
                  width: width * 0.4,
                  height: height * 0.14,
                }}
                source={require('../Assets/Lottie/red-loader.json')}
                autoPlay
                loop
              />
              
        ) : (
          <View style={styles.flexRow}>
            <TouchableOpacity
              onPress={() => {
                if (!isCardComplete) {
                  return;
                } else {
                  onPress();
                }
              }}
              style={styles.buyButton}>
              <AppText
                nol={2}
                textAlign="center"
                family="Poppins-SemiBold"
                size={height * 0.024}
                color={themeRed}
                Label={'Buy'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.cancelButton}>
              <AppText
                nol={2}
                textAlign="center"
                family="Poppins-SemiBold"
                size={height * 0.024}
                color={themeRed}
                Label={'Cancel'}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default StripeModal;

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
  label: {
    color: 'black',
    fontSize: width * 0.05,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: themeRed,
    width: width * 0.8,
    borderColor: 'white',
    fontSize: width * 0.04,
    marginLeft: 0,
    paddingLeft: 0,
    paddingVertical: 6,
    color: 'black',
    borderRadius: 0,
  },
  btnStyle: {
    backgroundColor: themeRed,
    borderRadius: width * 0.025,
    width: width * 0.35,
    margin: 0,
  },
  buyButton: {
    backgroundColor: 'white',
    width: width * 0.35,
    height: height * 0.07,
    borderRadius: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'white',
    width: width * 0.35,
    height: height * 0.07,
    borderRadius: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themeRed,
  },
  cancelBtnStyle: {
    borderRadius: width * 0.025,
    width: width * 0.35,
    borderWidth: 1,
    borderColor: themeRed,
    margin: 0,
  },
  btnTextStyle: {
    color: 'white',
    fontSize: width * 0.04,
  },
  cancelBtnTextStyle: {
    color: themeRed,
    fontSize: width * 0.04,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    // backgroundColor: 'red',
    width: width * 0.75,
  },
  lottieStyles: {
    height: height * 0.13,
    position: 'absolute',
    left: width * 0.1,
    right: 0,
    // top: height * -0.015,
  },
  loadingComponent: {
    borderRadius: width * 0.02,
    position: 'relative',
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.08,
    width: width * 0.75,
    marginTop: 5,
  },
  savingText: {
    color: 'white',
    position: 'absolute',
    left: width * 0.18,
    top: height * 0.022,
    fontSize: width * 0.045,
  },
});
