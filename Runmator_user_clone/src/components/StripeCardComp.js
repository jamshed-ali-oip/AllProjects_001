import React from 'react';
import { connect } from 'react-redux';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import colors from '../assets/colors';

export const StripeCardComp = ({ setId, myRef }) => {
  const { createToken } = useStripe();
  return (
    <>
      <CardField
        autofocus={true}
        postalCodeEnabled={false}
        placeholder={{
          number: '**** **** **** ****',
        }}
        ref={myRef}
        cardStyle={{
          textColor: '#000000',
          fontSize: 14,
          backgroundColor: '#FFFFFF',
          borderRadius: 30
        }}
        style={{
          width: '90%',
          height: 60,
          marginVertical: 30,
        }}

        onCardChange={cardDetails => {
          console.log(cardDetails);
          if (cardDetails?.complete) {
            createToken({ ...cardDetails, type: 'Card' }).then(res => {
              console.log("sdf++++++++++++", res);
              setId(res?.token?.id);
            });
          }
        }}
      />
    </>
  );
};

export default StripeCardComp;
