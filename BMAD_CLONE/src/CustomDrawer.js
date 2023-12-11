import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import React, {useReducer, useRef, useState, useEffect} from 'react';
import * as actions from './Store/Actions';
import {useDrawerProgress} from '@react-navigation/drawer';
// import colors from './src/constants/Colors';
import {colors, constant} from './src/screens/drawer/constant';
import Icon, {Icons} from './src/components/Icons';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import DrawerItemList from './src/screens/drawer/drawer2/DrawerItemList';
import {
  responsiveFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const CustomDrawer = (
  props,
  {
    userReducer,
    SignOut,
    navigation,
    userLogin,
    showDrawerConnectionsBadge,
    connectionsReducer,
  },
) => {
  // console.log(props?.SignOut, "SignOut");
  const scrollRef = useRef(null);
  const [hasNewRequests, setHasNewRequests] = useState(false);
  const drawerProgress = useDrawerProgress();

  const viewStyles = useAnimatedStyle(() => {
    const translateX = interpolate(drawerProgress.value, [0, 1], [-200, 0]);
    return {
      transform: [{translateX}],
    };
  });

  useEffect(() => {
    if (connectionsReducer?.showConnectionsBadge) {
      setHasNewRequests(true);
    }
  }, [connectionsReducer?.showConnectionsBadge]);

  const viewStyles2 = type =>
    useAnimatedStyle(() => {
      const val = type === 'top' ? -100 : 140;
      const translateY = interpolate(drawerProgress.value, [0, 1], [val, 0]);
      const opacity = interpolate(drawerProgress.value, [0, 1], [0, 1]);
      return {
        transform: [{translateY}],
        opacity,
      };
    });

  return (
    <View style={styles.container}>
      {/* header */}
      <StatusBar barStyle={'light-content'} backgroundColor={colors.sceneBg} />
      <Animated.View
        style={[styles.row, styles.view, styles.marginTop, viewStyles2('top')]}>
        <View style={styles.iconContainer}>
          <Image
            resizeMode="contain"
            source={require('./Assets/Images/brand.png')}
            style={{
              width: 180,
              height: 200,
            }}
          />
        </View>
      </Animated.View>
      {/* Drawer List Item */}
      <Animated.ScrollView
        ref={scrollRef}
        {...props}
        showsVerticalScrollIndicator={false}
        style={[styles.marginVertical, viewStyles]}>
        <DrawerItemList {...props} styles={styles} />
      </Animated.ScrollView>
      {/* footer */}
      <TouchableOpacity
        onPress={() => props?.SignOut(userReducer?.data?.user_id?.toString())}>
        <Animated.View
          style={[
            styles.row,
            styles.view,
            styles.marginBottom,
            viewStyles2('bottom'),
            {width: responsiveScreenWidth(40), justifyContent: 'space-around'},
          ]}>
          <MaterialIcons name="logout" color="white" size={30} />
          <Text
            style={{
              color: 'white',
              fontSize: responsiveFontSize(3),
              fontWeight: '500',
            }}>
            Logout
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps({userReducer, userLogin, connectionsReducer}) {
  return {userReducer, userLogin, connectionsReducer};
}
export default connect(mapStateToProps, actions)(CustomDrawer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    // backgroundColor: colors.white,
    borderRadius: constant.borderRadius,
    marginHorizontal: constant.SPACING / 2,
    padding: constant.SPACING / 1.5,
  },
  marginTop: {
    marginTop: 50,
  },
  marginBottom: {
    marginBottom: constant.SPACING / 2,
  },
  marginVertical: {
    marginVertical: constant.SPACING / 2,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: constant.SPACING / 2,
    justifyContent: 'space-between',
    borderRadius: constant.borderRadius,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: constant.textFontSize,
    color: colors.white,
    paddingHorizontal: constant.SPACING,
  },
  notificationBadge: {
    paddingVertical: constant.SPACING / 5,
    paddingHorizontal: constant.SPACING / 2,
    borderRadius: constant.borderRadius / 2,
  },
  iconContainer: {
    padding: constant.SPACING / 2.4,
    borderRadius: constant.borderRadius,
    margin: constant.SPACING / 2,
    // backgroundColor: colors.primary,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.darkGray,
    marginVertical: constant.SPACING / 2,
  },
  headerTitle: {
    fontSize: constant.titleFontSize,
    color: colors.white,
  },
  profile: {
    marginVertical: constant.SPACING / 2,
    marginRight: constant.SPACING,
    marginLeft: constant.SPACING / 2,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.light,
  },
  profileText: {
    color: colors.white,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bottomDrawerSection: {
    marginBottom: 30,
  },
});
