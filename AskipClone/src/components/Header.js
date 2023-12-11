import {StyleSheet, Text, View, Dimensions,Image} from 'react-native';
import React from 'react';
import {Svg, Path} from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
let {width, height} = Dimensions.get('window');
const Header = (props) => {
  return (
    <View style={styles.mainContainer}>
       <TouchableOpacity>
       <Image
        style={{width:width*0.03,height:height*0.04,resizeMode:"contain"}}
        source={require('../images/Path.png')}
      />
       </TouchableOpacity>
      <Text style={styles.heading}>
        {props.title}
        </Text>
      
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor:"#383838",
    height:height*0.085,
    alignContent:"center",
    alignItems:"center",
    paddingLeft:width*0.04
  },
  heading:{
    fontSize: width*0.045,
    fontWeight:"700",
    color:"#ffffff",
    marginLeft:width*0.05
  }
});
