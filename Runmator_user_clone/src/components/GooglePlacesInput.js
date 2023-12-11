import { background } from 'native-base/lib/typescript/theme/styled-system';
import React from 'react';
import { Dimensions,StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const GooglePlacesInput = () => {
  return (
      
<GooglePlacesAutocomplete
  placeholder='Enter Location'
  minLength={2}
  autoFocus={false}
  returnKeyType={'default'}
  fetchDetails={true}
  styles={{
    textInputContainer: {
      width:width*0.9,
      marginTop:height*0.05,
      
    },
    textInput: {
      color: '#5d5d5d',
      fontSize: width*0.05,
      paddingLeft:width*0.1,
    },
    // predefinedPlacesDescription: {
    //   color: '#1faadb',
    // },
  }}
/>
  );
};


export default GooglePlacesInput;

