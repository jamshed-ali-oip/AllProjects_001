import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
// import Voice from '@react-native-community/voice';
// import { useTheme } from 'react-native-paper';
// import Voice from '@react-native-voice/voice';
let { width, height } = Dimensions.get('window');

const Header = ({ navigation }) => {

  const [result, setResult] = useState('')
  const [isLoading, setLoading] = useState(false)


  // useEffect(() => {
  //   Voice.onSpeechStart = onSpeechStartHandler;
  //   Voice.onSpeechEnd = onSpeechEndHandler;
  //   Voice.onSpeechResults = onSpeechResultsHandler;

  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   }
  // }, [])
  // console.log("kdhaskhdkhsd",result)
  // const onSpeechStartHandler = (e) => {
  //   console.log("start handler==>>>", e)
  // }
  // const onSpeechEndHandler = (e) => {
  //   setLoading(false)
  //   console.log("stop handler", e)
  // }

  // const onSpeechResultsHandler = (e) => {
  //   let text = e.value[0]
  //   setResult(text)
  //   console.log("speech result handler", e)
  // }

  // const startRecording = async () => {
  //   setLoading(true)
  //   try {
  //     await Voice.start('en-Us')
  //   } catch (error) {
  //     console.log("error raised", error)
  //   }
  // }

  // const stopRecording = async () => {
  //   try {
  //     await Voice.stop()
  //   } catch (error) {
  //     console.log("error raised", error)
  //   }
  // }

  return (

    <SafeAreaView>


      <View style={styles.container}>

        <View style={styles.textInputStyle}>

          <TextInput
            value={result}
            placeholder="your text"
            // style={{ flex: 1 }}
            // onChangeText={text => setResult(text)}
          />
          <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>

          {isLoading ? <ActivityIndicator size="small" color="red" />

            :

            <TouchableOpacity
              // onPress={startRecording}
            >
              <Image
                source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png' }}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>}
            <TouchableOpacity
          style={{
            alignSelf: 'center',
         
            // backgroundColor: 'red',
            padding: 3,
            borderRadius: 100
          }}
          // onPress={stopRecording}
        >
          <Image
                source={{ uri: 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png' }}
                style={{ width: 25, height: 25 }}
              />
        </TouchableOpacity>
        </View>
        </View>
      </View>



    </SafeAreaView>

  );
};

const styles = StyleSheet.create({


  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
    width: width * 0.8,
    marginLeft: 40
  },
  container: {
    marginRight: 15


  }
});

export default Header;