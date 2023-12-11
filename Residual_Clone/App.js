import React from 'react';
import {StyleSheet} from 'react-native';
import MainNavigator from './src/MainNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/index';
import {PersistGate} from 'redux-persist/lib/integration/react';
import FlashMessage from 'react-native-flash-message';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigator />
        <FlashMessage
          position="top"
          statusBarHeight="10"
          style={styles.flashMessage}
        />
      </PersistGate>
    </Provider>
  );
};

export default App;
const styles = StyleSheet.create({
  flashMessage: {
    position: 'absolute',
    zIndex: 9999,
    borderRadius: 12,
    top: 30,
    width: '96%',
    alignSelf: 'center',
    marginTop: 20,
  },
});
