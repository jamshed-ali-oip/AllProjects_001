import React from 'react';
import { StyleSheet, SafeAreaView, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

function Screen({ children, containerStyle, style, ...otherProps }) {
  return (
    <Animatable.View
      animation="fadeIn"
      style={[styles.container, containerStyle]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={style} {...otherProps}>
              {children}
            </View>
          </TouchableWithoutFeedback>


        </SafeAreaView>
      </KeyboardAvoidingView>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Screen;
