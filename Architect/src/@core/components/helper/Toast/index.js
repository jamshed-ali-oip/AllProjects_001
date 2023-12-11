import {ToastAndroid} from 'react-native';

const Toast = message => {
  return ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.TOP,
    25,
    50,
  );
};

export default Toast;
