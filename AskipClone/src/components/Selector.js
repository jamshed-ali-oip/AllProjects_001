import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
const { width, height } = Dimensions.get('window');

const Selector = (props) => {
  const [dropdown, SetDropDown] = useState(false);
  const data = [
    {
      id: 0,
      name: ' ali',
    },
    {
      id: 1,
      name: ' ahmed',
    },
    {
      id: 2,
      name: ' muhammad',
    },
  ];
  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() => {
            SetDropDown(!dropdown);
          }}
          style={[
            styles.selecter,
            { height: props.boxheight, width: props.boxwidth },
          ]}>
          <View style={styles.container}>
            <Text style={styles.txt}>{props.placeholder}</Text>
            <Image
              style={styles.img}
              source={require('../assets/images/dropdownicon.png')}
            />
          </View>
        </TouchableOpacity>
        {dropdown == true ? (
          <View style={[styles.dropdown, { width: props.dropdownwidth }]}>
            {props.data.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => { props.customFunction(item), SetDropDown(!dropdown) }}
                  style={styles.dpitem}>
                  <Text
                    style={{
                      textAlignVertical: "center",
                      fontSize: width * 0.035,
                      marginTop:height*0.007,
                      color:"black",
                      paddingLeft:width*0.02
                    }}
                  >{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Selector;

const styles = StyleSheet.create({
  selecter: {
    // width: width * 0.925,
    // height: height * 0.045,
    // backgroundColor: 'red',
    alignSelf: 'center',
    borderRadius: width * 0.011,
    // alignItems:'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: '#bfc5d2',
  },
  txt: {
    color: 'gray',
    fontSize: width * 0.035,
    marginLeft:width*0.02
  },
  img: {
    width: width * 0.09,
    height: height * 0.01,
    resizeMode: 'contain',
    tintColor: '#818da7',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.01,
  },
  dropdown: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    // borderBottomWidth:1,
    // width: width * 0.92,
    alignSelf: 'center',
    marginTop: -height * 0.003,
    borderColor: '#bfc5d2',
  },
  dpitem: {
    borderBottomWidth: 1,
    borderColor: '#bfc5d2',
    height: height * 0.035,
    paddingLeft: width * 0.02,
    alignItems: "flex-start"
  },
});
