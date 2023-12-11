import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Heading from '../components/Heading';
import background_img from '../assets/backgroung-image.png';
import colors from '../assets/colors';
import { useState } from 'react';
import Inputbox from '../components/Inputbox';
import Button from '../components/Button';
import DocumentPicker from 'react-native-document-picker';
import IconComp from '../components/IconComp';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const DocumentDetails = ({ navigation }) => {
  const [drivingLicense, setDrivingLicense] = useState(null);
  const [proofOfInsurance, setProofOfInsurance] = useState(null);
  const [dotNum, setDotNum] = useState(null);
  const [taxNum, setTaxNum] = useState(null);

  const _onPressSignUp = () => {
    navigation.navigate('Otp');
  };

  const _onPressUploadLicense = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      console.log(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const _onPressUploadInsurance = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      console.log(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground source={background_img} style={styles.image}>
        <Heading
          title="DOCUMENT DETAIL"
          passedStyle={styles.heading}
          fontType="extra-bold"
        />
        <View style={styles.inputBoxes}>
          <View style={styles.rowView}>
            <Inputbox
              isEditable={false}
              value={drivingLicense}
              setTextValue={setDrivingLicense}
              placeholderTilte="Driving License"
              placeHolderColor="grey"
              viewStyle={{ width: width * 0.52 }}
              textInputStyle={{ width: width * 0.52 }}
            />

            <TouchableOpacity
              style={styles.rowUpperView}
              activeOpacity={0.8}
              onPress={() => _onPressUploadLicense()}>
              <IconComp
                type="Feather"
                iconName="upload"
                passedStyle={styles.iconUploadStyle}
              />
              <Heading
                title="Upload"
                fontType="semi-bold"
                passedStyle={styles.uploadText}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rowView}>
            <Inputbox
              value={proofOfInsurance}
              setTextValue={setProofOfInsurance}
              placeholderTilte="Proof of insurance"
              placeHolderColor="grey"
              viewStyle={{ width: width * 0.52 }}
              textInputStyle={{ width: width * 0.52 }}
            />

            <TouchableOpacity
              style={styles.rowUpperView}
              activeOpacity={0.8}
              onPress={() => _onPressUploadInsurance()}>
              <IconComp
                type="Feather"
                iconName="upload"
                passedStyle={styles.iconUploadStyle}
              />
              <Heading
                title="Upload"
                fontType="semi-bold"
                passedStyle={styles.uploadText}
              />
            </TouchableOpacity>
          </View>

          <Inputbox
            value={dotNum}
            setTextValue={setDotNum}
            placeholderTilte="DOT number"
            keyboardType={'numeric'}
            placeHolderColor="grey"
          />
          <Inputbox
            value={taxNum}
            setTextValue={setTaxNum}
            placeholderTilte="EIN number/Tax number"
            placeHolderColor="grey"
          />
        </View>
        <Button
          title="Sign Up"
          onBtnPress={() => _onPressSignUp()}
          isBgColor={false}
          btnStyle={styles.btnStyle}
          btnTextStyle={styles.btnTextStyle}
        />
      </ImageBackground>
    </ScrollView>
  );
};

export default DocumentDetails;

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: colors.themeBlue,
    borderRadius: width * 0.8,
    width: width * 0.8,
  },
  btnTextStyle: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconUploadStyle: { color: colors.themeBlue, fontSize: width * 0.05 },
  uploadText: {
    fontSize: width * 0.045,
    color: colors.themeBlue,
    marginLeft: width * 0.02,
  },
  rowUpperView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: width * 0.05,
  },
  heading: {
    color: colors.themeBlue,
    fontSize: width * 0.12,
    paddingHorizontal: width * 0.1,
    textAlign: 'center',
    lineHeight: height * 0.07,
  },
  image: {
    // flex: 1,
    // resizeMode: 'stretch',
    justifyContent: 'center',
    width: width,
    height: height,
    // backgroundColor:'red',
    alignSelf: 'center',
    alignItems: 'center',
  },
  scrollview: {
    height: height,
  },
  inputBoxes: {
    marginTop: height * 0.02,
  },
});
