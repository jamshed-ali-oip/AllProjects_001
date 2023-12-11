import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
let {width, height} = Dimensions.get('window');

const Inputs = props => {
  return (
    <View style={styles.cont}>
      <View style={[styles.box, {width:props.width, height:props.height}]}>
        <TextInput
          style={[styles.input, {width:props.widths, height:props.heights}]}
          onChangeText={props.setvalue}
          value={props.value}
          placeholder={props.placeholder}
          keyboardType={props.type}
          maxLength={props.maxletter}
          placeholderTextColor="#9e9e9e"
          onFocus={props.onFocus}
          defaultValue={props.defaultValue}
        />
      </View>
    </View>
  );
};

export default Inputs;

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#c0c6d3',

    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: width * 0.01,
  },
  input: {
    paddingLeft: width * 0.02,
    fontSize: width * 0.035,
    color:"black"
  },
  title: {
    marginLeft: width * 0.12,
    paddingBottom: height * 0.01,
    color: 'black',
    fontWeight: '800',
    fontSize: width * 0.039,
    // marginBottom:-height*0.01,
  },
  cont: {
    marginTop: height * 0.005,
    // marginBottom:-height*0.01,
  },
});
