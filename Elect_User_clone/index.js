/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import MainNav from './src/Navigation';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthContextProvider } from './src/context/AuthContext';

export const Myapp = () => {
    return (
        <AuthContextProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MainNav />
                </PersistGate>
            </Provider>
        </AuthContextProvider>
    );
};

AppRegistry.registerComponent(appName, () => Myapp);
