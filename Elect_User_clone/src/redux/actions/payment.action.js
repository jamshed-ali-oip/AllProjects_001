import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import { base_URL } from '../../config/config';
// import {LOGIN, REGISTER} from '../const/const';
import * as types from '../const/const';
import instance from '../../config/httpservice';

const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currency: 'usd',
        }),
    });
    const { clientSecret } = await response.json();

    return clientSecret;
};
