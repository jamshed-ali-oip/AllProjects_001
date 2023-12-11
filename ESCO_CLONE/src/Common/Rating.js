import React from "react";
import { View } from "react-native";
import { Rating } from 'react-native-ratings';


const Ratings = (props) => {
    return (
        <View style = {props.ViewStyle}>
            <Rating
                type={props.type}
                ratingCount={props.ratingCount}
                imageSize={props.imageSize}
                //   showRating
                tintColor={props.tintColor}
                ratingBackgroundColor={props.ratingBackgroundColor}
                onFinishRating={props.onFinishRating}
                style={props.style}
                unSelectedColor={props.unSelectedColor}
            />
        </View>
    );
}

export default Ratings;