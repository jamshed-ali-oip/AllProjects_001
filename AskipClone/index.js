/**
 * @format
 */

import { AppRegistry,Dimensions,Platform,SafeAreaView, StatusBar } from 'react-native';

import MainNavigation from './src/MainNavigation';
import { name as appName } from './app.json';
import { store, persistor } from "./src/redux/store"
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react"
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification'
import Colors from './src/components/Colors';
let {width, height} = Dimensions.get('window');
PushNotification.createChannel(
    {
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);


messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

const RoutreStack = () => {
    return (
        <Provider store={store}>
            <SafeAreaView style={{flex:1,
                marginTop: Platform.OS=="ios" ?-height*0.06:null,
                marginBottom:Platform.OS=="ios" ?-height*0.04:null,
                backgroundColor:"#081a4f"
                }}>
                   <StatusBar  
                        backgroundColor='transparent'  
                        barStyle="dark-content"   
                    />  
                <PersistGate loading={null} persistor={persistor}>
                    <MainNavigation />
                </PersistGate>
            </SafeAreaView>
        </Provider>
    )
}


AppRegistry.registerComponent(appName, () => RoutreStack);
