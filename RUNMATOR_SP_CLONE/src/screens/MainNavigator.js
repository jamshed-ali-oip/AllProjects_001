import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import AuthRootStackScreens from './AuthRootStackScreens';
import MainAppScreens from './MainAppScreens';
import * as actions from "../store/Actions"
import Loader from '../components/Loader';
import colors from "../assets/colors"

const MainNavigator = ({user,logOut,setUser}) => {
  const [loading,setLoading]=useState(true)
  
  function showMessage(){
    alert("Session Expire")
  }

  useEffect(()=>{
    setUser(logOut, () => setLoading(false),showMessage)
  },[])

  if (loading) {
    return <Loader color={colors.themeBlue}/>;
  } else {
    return (
      <NavigationContainer>
        {user.status? (
          <MainAppScreens />
        ) : (
          <AuthRootStackScreens />
        )}
      </NavigationContainer>
    );
  }
};

// export default MainNavigator;
const mapStateToProps = ({user}) => {
  return {user};
};

export default connect(mapStateToProps, actions)(MainNavigator);
