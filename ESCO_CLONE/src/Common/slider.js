import React from 'react';
import { Dimensions } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
// import { Colors } from '../../theme/Colors';

let { width, height } = Dimensions.get('window');

const Slider = (props) => {
    const images = [
        props.url1,
        props.url2,
        props.url3,
        props.url4,
    ];

    return (
        <SliderBox
            dotStyle={props.dotStyle}
            imageLoadingColor="white"
            circleLoop={true}
            autoplay= {props.autoplay}
            activeOpacity={1}
            images={images}
            parentWidth={width}
            ImageComponentStyle={props.ImageComponentStyle}
        />
    );
};

export default Slider;
