// import React from 'react';
// import {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   TextInput,
//   View,
// } from 'react-native';

// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

// const Inputbox = ({
//   value,
//   setTextValue,
//   placeholderTilte,
//   isSecure,
//   keyboardType,
//   placeholderTextColor,
//   passedStyle,
// }) => {
//   return (
//     <>
//       <TextInput
//         style={[styles.input, passedStyle]}
//         onChangeText={setTextValue}
//         value={value}
//         placeholder={placeholderTilte}
//         placeholderTextColor={placeholderTextColor}
//         secureTextEntry={isSecure || false}
//         keyboardType={keyboardType || 'default'}
//       />
//     </>
//   );
// };
// const styles = StyleSheet.create({
//   input: {
//     backgroundColor: 'white',
//     width: width * 0.8,
//     alignItems: 'center',
//     borderRadius: 50,
//     justifyContent: 'center',
//     paddingVertical: height * 0.018,
//     paddingLeft: 30,
//     margin: 10,
//   },
// });

// export default Inputbox;

import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform
} from 'react-native';
import IconComp from '../components/IconComp';

const dimWidth = Dimensions.get('window').width;
const dimHeight = Dimensions.get('window').height;

// value ----- (Required - state value)
// onChangeValue ----- (Required - set state function)
// label ---- (Required - Placeholder value)
// iconType ----  (Optional - Icon in input box type eg. Fontawesome)
// iconName --- (Optional - Icon name eg. email)
// isPassword --- (Optional - make input box secure)
// placeHolderColor --- (Optional - default white)
// iconColor --- (Optional - default #4F8EF7 )
// Provide custom style in textInputStyle ---- ( Optional )
// keyboardType --- ( Optional )
// isShowRightIcon --- (Optional - default true)
// isShowRightComp --- ( Optional - default false )
// textInputRightComp --- ( Optional - should be component)
import image from '../assets/Images/user_image.png';
const TextInputComp = ({
  isEditable,
  value,
  isSecure,
  setTextValue,
  iconType = 'Entypo',
  iconName = 'eye',
  iconStyle,
  placeHolderColor,
  placeholderTilte,
  keyboardType,
  isShowRightIcon,
  viewStyle,
  textInputStyle,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={[styles.inputContainer, viewStyle && viewStyle,{borderColor:'red',borderWidth:error?1:0}]}>
      <>
        <TextInput
          style={[
            styles.inputBox,
            textInputStyle && textInputStyle,
            {
              paddingRight: (isShowRightIcon || isSecure) && dimWidth * 0.15,
            },
          ]}
          onChangeText={val => setTextValue(val)}
          value={value}
          editable={isEditable=="false"?false:true}
          placeholder={placeholderTilte}
          placeholderTextColor={placeHolderColor ?? '#ffffff'}
          // inlineImageLeft={require('../assets/Images/user_image.png')}
          secureTextEntry={isSecure && !showPassword}
          keyboardType={keyboardType || 'default'}
        />
        {isSecure && (
          <TouchableOpacity
            style={styles.iconLeft}
            activeOpacity={0.8}
            onPress={() => {
              setShowPassword(!showPassword);
            }}>
            <IconComp
              type={'Entypo'}
              iconName={showPassword ? 'eye' : 'eye-with-line'}
              // iconColor={iconColor || 'red'}
              iconSize={20}
              passedStyle={iconStyle}
            />
          </TouchableOpacity>
        )}
        {/* {(isShowRightComp ?? false) && (
          <View
            style={styles.rightCompInTextBox}
            onPress={() => console.log('login')}>
            {textInputRightComp}
            {/* {/ <Text style={{backgroundColor: 'red'}}>Login</Text> /} 
          </View>
        )} */}

        {isShowRightIcon && (
          <TouchableOpacity style={styles.iconLeft} activeOpacity={1}>
            <IconComp
              type={iconType}
              iconName={iconName}
              passedStyle={iconStyle}
            />
          </TouchableOpacity>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    backgroundColor: 'white',
    width: dimWidth * 0.8,
    borderRadius: 50,
    paddingVertical: dimHeight * (Platform.OS=="ios"?0.022:0.008),
    marginBottom: dimWidth * 0.04,
    justifyContent:'center'
  },
  inputBox: {
    color: 'grey',
    fontSize: dimWidth * 0.04,
    paddingHorizontal: dimWidth * 0.05,
  },
  iconLeft: {
    position: 'absolute',
    right: dimWidth * 0.03,
    top: dimHeight * 0.017,
    paddingVertical: dimHeight * 0.012,
    paddingHorizontal: dimWidth * 0.02,
  },
  rightCompInTextBox: {
    position: 'absolute',
    right: 15,
  },
});

export default TextInputComp;
