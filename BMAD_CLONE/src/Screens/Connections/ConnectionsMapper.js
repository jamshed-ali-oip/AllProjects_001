import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import AppText from '../../Components/AppText';
import { imageUrl } from '../../Config/Apis.json';
import { themeRed } from '../../Assets/Colors/Colors';
import * as actions from '../../Store/Actions/index';
import { connect } from 'react-redux';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const { width, height } = Dimensions.get('window');

const ConnectionsMapper = ({
  item,
  index,
  navigation,
  unFriendThisPerson,
  _onPressCancelMyRequestSent,
  saveNearmeUserData,
  userReducer,
  _onPressAcceptButton,
  _onPressIgnoreInvite,
}) => {
  const USER_ID = userReducer?.data?.user_id;
  const isIOS = Platform.OS === 'ios';
  // console.log(navigation,"----")
  // const userInfo = {
  //   image: item?.user_image,
  //   name: item?.user_name,
  //   age: item?.user_age,
  //   profession: item?.user_title,
  //   status: item?.user_status,
  //   city: item?.user_lives,
  //   interest: item?.user_interest,
  //   favorite: item?.user_favorite,
  //   distance: item?.distance,
  //   navigation: navigation,
  //   relation: item?.user_relation,
  //   address: item?.user_address,
  //   genderInterest: item?.user_gender_interest,
  //   email: item?.user_email,
  //   connected: item?.connected,
  //   totalLike: item?.like,
  //   like: item?.is_like,
  //   id: item?.user_id,
  //   userId: userReducer?.data?.user_id,
  // };
  // console.log(item.user_id)
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          // saveNearmeUserData(item);
          navigation.navigate('profile', { userData: item });
        }}>
        <Image
          source={
            item.user_image == null || item.user_image == undefined
              ? require('../../Assets/Images/maroon-dp2.jpeg')
              : { uri: `${imageUrl}/${item.user_image}` }
          }
          style={{
            width: responsiveFontSize(8),
            height: responsiveFontSize(8),
            borderRadius: responsiveFontSize(50),
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // saveNearmeUserData(item);
          navigation.navigate('profile', { userData: item });
        }}
        style={styles.textContainer}>
        <AppText
          nol={1}
          textAlign="left"
          family="Poppins-SemiBold"
          size={width * 0.04}
          color={themeRed}
          Label={item?.user_name}
        />
        {/* <AppText
          nol={1}
          textAlign="left"
          family="Poppins-Regular"
          size={height * 0.017}
          color={'grey'}
          Label={'22 years old'}
        /> */}
        <AppText
          nol={1}
          textAlign="left"
          family="Poppins-Regular"
          size={height * 0.018}
          color={'black'}
          Label={item?.user_gender}
        />
      </TouchableOpacity>

      {/* BUTTONS  */}
      {
        <View style={styles.btnContainer}>
          {item?.sendBy !== USER_ID && item?.status !== 'accepted' && (
            <>
              {/* Accept Button  */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.connectBtn}
                onPress={() => _onPressAcceptButton(item, index)}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-SemiBold"
                  size={height * 0.015}
                  color={'white'}
                  Label={'Accept'}
                />
              </TouchableOpacity>

              {/* Ignore Button  */}
              <TouchableOpacity
                style={styles.ignorebtn}
                activeOpacity={0.7}
                onPress={() => _onPressIgnoreInvite(item, index)}>
                <AppText
                  nol={1}
                  textAlign="left"
                  family="Poppins-SemiBold"
                  size={height * 0.015}
                  color={'white'}
                  Label={'Ignore'}
                />
              </TouchableOpacity>
            </>
          )}

          {item?.status === 'accepted' && (
            <TouchableOpacity
              style={styles.ignorebtn}
              activeOpacity={0.7}
              onPress={() => unFriendThisPerson(item)}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-SemiBold"
                size={height * 0.015}
                color={'white'}
                Label={'Unfriend'}
              />
            </TouchableOpacity>
          )}

          {item?.sendBy === USER_ID && (
            <TouchableOpacity
              style={styles.ignorebtn}
              activeOpacity={0.7}
              onPress={() => _onPressCancelMyRequestSent(item)}>
              <AppText
                nol={1}
                textAlign="left"
                family="Poppins-SemiBold"
                size={height * 0.015}
                color={'white'}
                Label={'Cancel'}
              />
            </TouchableOpacity>
          )}
        </View>
      }
    </View>
  );
};

const mapStateToProps = ({ userReducer }) => {
  return { userReducer };
};
export default connect(mapStateToProps, actions)(ConnectionsMapper);

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    backgroundColor: 'white',
    paddingVertical: height * 0.03,
    // paddingHorizontal: width * 0.025,
    marginHorizontal: width * 0.05,
    // marginVertical: height * 0.005,
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  textContainer: {
    width: width * 0.5,
    marginLeft: width * 0.03,
  },
  connectBtn: {
    backgroundColor: themeRed,
    borderRadius: width * 0.015,
    width: width * 0.2,
    paddingVertical: height * 0.005,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ignorebtn: {
    backgroundColor: themeRed,
    borderRadius: width * 0.015,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.008,
    width: width * 0.2,
    paddingVertical: height * 0.005,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
