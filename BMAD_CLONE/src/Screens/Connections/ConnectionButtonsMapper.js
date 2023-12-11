import {StyleSheet, TouchableOpacity, Dimensions, View} from 'react-native';
import React from 'react';
import AppText from '../../Components/AppText';
import {themeRed} from '../../Assets/Colors/Colors';
const {width, height} = Dimensions.get('window');

const ConnectionButtonsMapper = ({
  onlyInvitations,
  item,
  index,
  onPress,
  choice,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(item, index)}
      style={[
        styles.buttonContainer,
        choice === index && {
          backgroundColor: themeRed,
          color: 'white',
        },
      ]}>
      <AppText
        nol={1}
        textAlign="left"
        family="Poppins-SemiBold"
        size={height * 0.017}
        color={choice === index ? 'white' : themeRed}
        Label={item?.label}
      />
      {onlyInvitations?.length > 0 && item?.label == 'Invitations' && (
        <View
          style={{
            marginLeft: width * 0.02,
            borderRadius: 25,
            width: width * 0.05,
            height: height * 0.026,
            backgroundColor: choice === index ? 'white' : themeRed,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AppText
            nol={1}
            textAlign="left"
            family="Poppins-SemiBold"
            size={height * 0.017}
            color={choice === index ? themeRed : 'white'}
            Label={onlyInvitations?.length}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ConnectionButtonsMapper;

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: width * 0.01,
    paddingVertical: height * 0.01,
    backgroundColor: 'white',
    width: width * 0.4,
    paddingHorizontal: width * 0.036,
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: width * 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: themeRed,
  },
});
