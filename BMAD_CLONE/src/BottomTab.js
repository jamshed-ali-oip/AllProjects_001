import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import {StyleSheet, StatusBar} from 'react-native';
import MyTabs from './MyTabs';
import DrawerView from './src/screens/drawer/DrawerView';
const BottomTab = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <DrawerView style={{flex: 1, backgroundColor:'white'}}>
            <MyTabs />
    </DrawerView>
  );
};
const mapStateToProps = ({userReducer}) => {
  return {userReducer};
};
export default connect(mapStateToProps, null)(BottomTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
})

