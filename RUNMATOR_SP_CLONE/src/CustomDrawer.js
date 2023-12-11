import React, { useState } from 'react';
import {
  StatusBar,
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
import { imgUrl2 } from "./config/keys.json"
import messaging from "@react-native-firebase/messaging"
import DeleteModal from './components/DeleteModal';
const { width, height } = Dimensions.get('window');

const CustomButton = ({ onPress, label, style, currentScreenName, user }) => {
  //   const thisRoute = useRoute();
  return (
    <TouchableOpacity
      key={label.id}
      onPress={onPress}
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

const CustomDrawer = ({ navigation, routes, logOut, user }) => {
  console.log("user.data?.profile_image", user.data?.profile_image)
  const isDrawerOpen = useDrawerStatus() === 'open';
  const [modal, setModal] = useState(false)

  const history = navigation.getState().history;
  const currentScreenName = isDrawerOpen
    ? history[history?.length - 2].key.split('-')[0]
    : history[history?.length - 1].key.split('-')[0];
  let name = user.data?.name;
  // let name = 'Christopher Ridiculous';
  let fname = name?.split(' ')[0];
  let lname = name?.split(' ')[1];
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
  return (
    <View style={{ flex: 1 }}>
      <DeleteModal
        title={"Are You Sure You Want To Delete This Account?"}
        title2={"You won't be able to revert this!"}
        closeModal={() => setModal(false)}
        visible={modal}
        cb={() => {
          messaging()
            .unsubscribeFromTopic(user?.data?.id + "p")
          logOut();
        }}
      />
      {/* Image Username & Status  */}
      <View
        style={[
          styles.rowView,
          {
            marginTop: height * 0.06,
            marginLeft: width * 0.04,
          },
        ]}>
        {(user.data?.profile_image) ? (
          <Image
            // resizeMode="contain"
            source={{
              uri: imgUrl2 + user.data?.profile_image,
            }}
            style={styles.userImage}
          />
        ) : (
          <Image
            resizeMode="contain"
            source={require('./assets/user.png')}
            style={styles.userImage}
          />
        )}
        <View style={{ paddingLeft: width * 0.03 }}>
          {/* Username  */}
          <View style={{ paddingLeft: width * 0.03 }}>
            <Heading title={name} passedStyle={styles.usernameText} />
            <Text style={{ fontSize: 12 }}>{user.data?.email}</Text>
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
                  .unsubscribeFromTopic(user?.data?.id + "p")
                logOut();
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

const mapStateToProps = ({ user }) => {
  return { user };
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
    fontSize: width * 0.04,
    textTransform: 'capitalize'
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
    width: 60,
    height: 60,
    borderRadius: 30,
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
