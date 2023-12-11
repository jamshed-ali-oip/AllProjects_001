import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

var favourites = [];
const {width, height} = Dimensions.get('window');

const FavouriteList = ({Name, Value, Images, Id, Favourite}) => {
  const [items, setItems] = useState([]);
  const [check, setCheck] = useState(false);

  const SelectFavourite = (value, name) => {
    if (check == true) {
      favourites = favourites.filter(function (e) {
        return e !== name;
      });
      setCheck(false);
    } else {
      favourites.push(name);
      setCheck(true);
      // const Array = name
      // let interestName = name
      // console.log('push', name)

      // setItems([...Array, name]);
      // setItems.push(interestName)
      // console.log(name)
      // setItems((pS)=>{
      //     return [
      //         ...pS,
      //         name
      //     ]
      // })
    }
    Favourite(favourites);
    // console.log(interests)
  };
  // console.log(Name.indexOf(' '));
  return (
    <View
      style={{
        margin: 10,
        backgroundColor: 'red',
      }}>
      <TouchableOpacity onPress={() => SelectFavourite(Value, Name)}>
        <ImageBackground
          style={{width: 140, height: 170}}
          resizeMode="stretch"
          source={Images}>
          <View
            style={{
              justifyContent: 'flex-end',
              height: 170,
              alignItems: 'flex-start',
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                padding: 10,
                top: -50,
                height: 50,
              }}>
              {Value != check ? (
                <View
                  style={{
                    backgroundColor: '#B01125',
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    borderColor: 'white',
                    borderWidth: 1,
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('./../Assets/Images/Check.png')}
                    style={{width: 20, height: 20, margin: 4}}
                  />
                </View>
              ) : null}
            </View>
            <View style={{width: 120,}}>
              <Text
                //   numberOfLines={1}
                style={{
                  textAlign: 'left',
                  display: 'flex',
                  textAlignVertical: 'bottom',
                  padding: 5,
                  color: 'white',
                  fontFamily: 'Poppins-Bold',
                  fontSize:
                    (Name.indexOf(' ') == -1) & (Name.length > 9)
                      ? width * 0.03
                      : width * 0.04,
                  left: 10,
                }}>
                {Name}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};
export default FavouriteList;
