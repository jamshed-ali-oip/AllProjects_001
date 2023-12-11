import React, { useState } from 'react';
import {
  StatusBar,
  Animated,
  Dimensions,
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDrawerStatus } from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
import IconComp from './components/IconComp';
import colors from './assets/colors';
import Heading from './components/Heading';
import { connect } from 'react-redux';
import * as actions from './store/Actions/index';
import { UserReducer } from './store/Reducers/UserReducer';
import { imageUrl2 } from "./configurations/config"
import messaging from "@react-native-firebase/messaging"
import DeleteModal from './components/DeleteModal';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const { width, height } = Dimensions.get('window');

const CustomButton = ({ onPress, label, style, currentScreenName }) => {
  //   const thisRoute = useRoute();
  return (
    <TouchableOpacity
      key={label.id}
      onPress={() => {
        // if (label.iconName == 'logout') {
        //   return;
        // }
        onPress();
      }}
      style={[
        styles.btnContainer,
        // label?.routeName == currentScreenName && {
        //   backgroundColor: colors.themeLightPurple,
        // },
      ]}>
      <IconComp
        iconName={label.iconName}
        type={label.iconType}
        passedStyle={[
          styles.btnIconStyle,
          // label?.routeName == currentScreenName && {color: colors.themePurple1},
        ]}
      />
      <Text
        style={[
          styles.btnText,
          // label?.routeName == currentScreenName && {color: colors.themePurple1},
        ]}>
        {label.routeName}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawer = ({ navigation, routes, user_logout, UserReducer }) => {
  const isDrawerOpen = useDrawerStatus() === 'open';
  const history = navigation.getState().history;
  const [modal, setModal] = useState(false)
  let name = UserReducer?.userData?.name;
  // let name = 'Christopher Ridiculous';
  const fbLogout = async () => {
    try {
      await LoginManager.logOut();
      console.log('Logout successful');
    } catch (error) {
      console.log('Logout failed with error: ' + error);
    }
  };
  const logoutFromGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log('Chal Raha Ha')
    } catch (error) {
      console.error(error);
    }
  }
  let fname = name?.split(' ')[0];
  let lname = name?.split(' ')[1];
  const currentScreenName = isDrawerOpen
    ? history[history?.length - 2].key.split('-')[0]
    : history[history?.length - 1].key.split('-')[0];

  const Logout = {
    id: 10,
    iconName: 'logout',
    iconType: 'MaterialIcons',
    routeName: 'logout',
  };
  const deleteItem = {
    id: 11,
    iconName: 'delete',
    iconType: 'MaterialIcons',
    routeName: 'Delete Account',
  };
  console.log("UserReducer?.userData?.profile_image", UserReducer?.userData?.profile_image)
  return (
    <View style={{ flex: 1 }}>
      <DeleteModal
        title={"Are You Sure You Want To Delete This Account?"}
        title2={"You won't be able to revert this!"}
        closeModal={() => setModal(false)}
        visible={modal}
        cb={() => {
          messaging()
            .unsubscribeFromTopic(UserReducer?.userData?.id + "c")
          user_logout();
        }}
      />
      <View
        style={[
          styles.rowView,
          {
            marginTop: height * 0.06,
            marginLeft: width * 0.04,
          },
        ]}>

        {UserReducer?.userData?.profile_image ? (
          <Image
            source={{
              uri: `${imageUrl2 + UserReducer?.userData?.profile_image}`,
            }}
            style={styles.userImage}
          />
        ) : (
          <Image
            source={require('./assets/user.png')}
            style={styles.userImage}
          />
        )}
        {/* Username  */}
        <View>
          <View style={{ paddingLeft: width * 0.03 }}>
            {name?.length > 15 ? (
              <View style={{ justifyContent: 'center' }}>
                <Heading title={fname} passedStyle={styles.usernameText} />
                <Heading title={lname} passedStyle={styles.usernameText} />
              </View>
            ) : (
              <Heading title={name} passedStyle={styles.usernameText} />
            )}
          </View>
          <View style={{ paddingLeft: width * 0.03 }}>
            <Text>{UserReducer?.userData?.email}</Text>
          </View>
        </View>

      </View>

      {/* Drawer Link  */}
      <View style={styles.menuContainer}>
        <View style={styles.menu}>
          <View>
            {routes.map((route, index) => {
              return (
                <CustomButton
                  key={index}
                  label={route}
                  onPress={() => {
                    // console.log(route.routeName, currentScreenName);
                    if (currentScreenName === route.routeName) {
                      const resetAction = CommonActions.reset({
                        index: 1,
                        routes: [
                          {
                            name: route.routeName,
                            // params: {YOUR_OPTIONAL_DATA}
                          },
                        ],
                      });
                      navigation.dispatch(resetAction);
                    } else {
                      navigation.navigate(route.routeName);
                    }
                  }}
                  currentScreenName={currentScreenName}
                />
              );
            })}
          </View>

          <View>
            <CustomButton
              label={deleteItem}
              onPress={() => {
                setModal(true)
              }}
              currentScreenName={currentScreenName}
            />
            <CustomButton
              label={Logout}
              onPress={() => {
                messaging()
                  .unsubscribeFromTopic(UserReducer?.userData?.id + "c")
                user_logout();
                logoutFromGoogle();
                fbLogout()
              }}
              currentScreenName={currentScreenName}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

// export default CustomDrawer;
// const mapStateToProps = ({UserReducer}) => {
//   return {UserReducer};
// };

const mapStateToProps = ({ UserReducer }) => {
  return { UserReducer };
};
export default connect(mapStateToProps, actions)(CustomDrawer);

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    paddingTop: height * 0.05,
    // paddingBottom: height * 0.05,
  },
  menu: {
    flex: 1,
    justifyContent: 'space-between',
  },
  usernameText: {
    fontWeight: '700',
    fontSize: width * 0.05,
  },
  userStatus: {
    color: colors.themeGreen,
    fontSize: width * 0.032,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusCircle: {
    color: colors.themeGreen,
    fontSize: width * 0.03,
    paddingRight: width * 0.015,
  },
  userImage: {
    width: width * 0.15,
    height: width * 0.15,
    // backgroundColor:'red'
    borderRadius: width * 0.08,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.022,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 1,
  },
  btnIconStyle: {
    fontSize: width * 0.06,
    color: colors.themeBlue,
    paddingHorizontal: width * 0.06,
  },
  btnText: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: width * 0.045,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
});
