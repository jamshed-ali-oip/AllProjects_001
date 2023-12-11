/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import MainNav from './src/Navigation';
import { Provider } from 'react-redux';
import { store } from './src/store';


const Myapp = () => {
    return (
        <Provider store={store}>
     
            <MainNav />
     
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Myapp);
