import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyProfileScreen from './MyProfileScreen';
import PasswordChange from './PasswordChange';
import Icon from 'react-native-vector-icons/Ionicons';
import BMAD from './BMAD';
import EditProfile from './EditProfile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MessageIcon from '../../../Components/MessageIcon';
import MaterialIcons from 'react-native-vector-icons/Feather';
import {themeRed} from '../../../Assets/Colors/Colors';
import Drinks from './Drinks';

function ProfileStack({navigation}) {
  const ProfileStack = createNativeStackNavigator();

  return (
    <ProfileStack.Navigator screenOptions={{
      headerBackVisible: false
    }} initialRouteName="BMAD">
      {/* Drinks */}
      <ProfileStack.Screen
        name="Drinks"
        options={({route}) => ({
          headerStyle: {
            borderBottomColor: 'white',
            // borderBottomWidth: 5,
            // borderBottomWidth: 0.7,
            height: 110,
            backgroundColor: themeRed,
          },
          headerStatusBarHeight: 32,
          headerTitle: props => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: 'white',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Drinks
            </Text>
          ),
          headerTransparent: false,
          headerLeft: () => null,
          headerRight: () => (
            <View style={{right: 0}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="ios-enter-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
        })}
        component={Drinks}
      />

      <ProfileStack.Screen
        name="BMAD"
        options={({route}) => ({
          headerStyle: {
            borderBottomColor: 'grey',
            borderBottomWidth: 0.7,
            height: 110,
            backgroundColor: themeRed,
          },
          headerStatusBarHeight: 32,
          headerTitle: props => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: 'white',
                fontFamily: 'Poppins-SemiBold',
              }}>
              BMAD
            </Text>
          ),
          headerTransparent: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{}}>
              <View style={{padding: 10, top: 0}}>
                <Image
                  resizeMode="contain"
                  style={{height: 25, width: 25}}
                  source={require('./../../../Assets/Images/menu1.png')}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => null
        })}
        component={BMAD}
      />
      <ProfileStack.Screen
        name="MyProfile"
        options={({route, navigation}) => ({
          headerShown: false,

        
          headerStatusBarHeight: 32,
          headerTitle: props => null,
          headerTransparent: true,
          headerLeft: () => (
            <View style={{left: 20}}>
              {/* <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BMAD', {
                    screen: 'BMAD',
                    initial: false,
                  })
                }>
                <Icon name="arrow-back" size={25} color="white" />
              </TouchableOpacity> */}
            </View>
            // <TouchableOpacity
            //   onPress={() => navigation.openDrawer()}
            //   style={{}}>
            //   <View style={{padding: 10, top: 3}}>
            //     <Image
            //       resizeMode="contain"
            //       style={{height: 25, width: 25}}
            //       source={require('./../../../Assets/Images/menu1.png')}
            //     />
            //   </View>
            // </TouchableOpacity>
            // <View style={{left: 20}}>
            //   <TouchableOpacity onPress={() => navigation.goBack()}>
            //     <Icon name="arrow-back" size={25} color="white" />
            //   </TouchableOpacity>
            // </View>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                right: 30,
                alignContent: 'space-around',
              }}>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}>
                <MaterialIcons
                  name="edit-3"
                  color="white"
                  size={25}
                  style={{}}
                />
              </TouchableOpacity> */}
              {/* <View style={{marginLeft: 20}}></View> */}
              {/* <TouchableOpacity onPress={() => navigation.navigate('newpost')}>
                <FontAwesome
                  name="plus-square-o"
                  color="white"
                  size={25}
                  style={{}}
                />
              </TouchableOpacity> */}
            </View>
          ),
        })}
        component={MyProfileScreen}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={({route, navigation}) => ({
          headerShown: true,

          headerStyle: {
            height: 110,
            backgroundColor: 'white',
            borderBottomWidth: 0,
            borderBottomColor: 'white',
          },
          headerStatusBarHeight: 32,
          headerTitle: props => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: 'black',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Edit Profile
            </Text>
          ),
          headerTransparent: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{}}>
              <View style={{padding: 10, top: 0}}>
                <Image
                  resizeMode="contain"
                  style={{height: 25, width: 25}}
                  source={require('./../../../Assets/Images/menu.png')}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{right: 20}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="ios-enter-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
        })}
        component={EditProfile}
      />
      <ProfileStack.Screen
        name="PasswordChange"
        options={({route, navigation}) => ({
          headerShown: true,

          headerStyle: {
            height: 110,
            backgroundColor: themeRed,
            borderBottomWidth: 0,
            borderBottomColor: 'grey',
          },
          headerStatusBarHeight: 32,
          headerTitle: props => (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: 'white',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Change Password
            </Text>
          ),
          headerTransparent: false,
          headerLeft: () => null,
          headerRight: () => (
            <View style={{right: 0}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="ios-enter-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
        })}
        component={PasswordChange}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileStack;
