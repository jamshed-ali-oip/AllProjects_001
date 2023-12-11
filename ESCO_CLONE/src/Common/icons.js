import React from 'react';
// import Icon from 'react-native-vector-icons/Ionicons';

const Icons = (props) => {
    return (
        <Icon
            name={props.Iconname}
            size={props.Iconsize}
            color={props.Iconcolor}
            style={props.IconStyle}
        />
    );
};

export default Icons;