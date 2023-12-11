import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const BoxComp = () => {
  return (<View style={styles.boxContainer}></View>)
  ;
};

const styles = StyleSheet.create({
  boxContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BoxComp;
