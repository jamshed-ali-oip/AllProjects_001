import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';


const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    product_card: {
        width: width * 0.9,
        marginBottom: 25
    },
    gradient_card: {
        paddingHorizontal: width * 0.05,
        paddingVertical: width * 0.09,
        borderRadius: 25,
        flexDirection: 'row'
    },
    left_details: {
        width: width * 0.40,
    },
    image_detail: {
        fontSize: width * 0.026,
        color: 'white',
        marginTop: 10,
        fontFamily: 'Poppins-Regular',
        lineHeight: width * 0.038
    },
    right_details: {
        width: width * 0.40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    right_title: {
        fontSize: width * 0.065,
        color: 'white',
        fontFamily: 'Poppins-Bold',
        marginBottom: 0,
        lineHeight: width * 0.075,
        textAlign: 'center'
    },
    right_number: {
        color: 'white',
        fontSize: width * 0.045,
        fontFamily: 'Poppins-Medium',
        lineHeight : width * 0.060,
    },
    modal_container: {
        backgroundColor: 'white',
        height: height * 0.38,
        borderRadius: 25,
        // justifyContent : 'space-between'
    },
    modal_btn_parent: {
        position: 'absolute',
        alignItems: 'center',
        bottom: height * -0.03,
        left: width * 0.20
    },
    button: {
        width: width * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: height * 0.070,
        color: 'white'
    },
    button_text: {
        fontSize: width * 0.040,
        fontFamily: 'Poppins-Bold',
        color: '#ffffff',
    },
    modal_btn_close: {
        position: 'absolute',
        top: height * 0.015,
        right: width * 0.03
    },
    button_cancel_bg: {
        borderRadius: 50,
        width: width * 0.08,
        height: width * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_cancel: {
        color: 'white',
        fontSize: width * 0.05,
        fontFamily: 'Poppins-Medium',
    },
    modal_counter: {
        fontSize: width * 0.072,
        color: 'black',
        fontFamily: 'Poppins-Bold',
        marginBottom: 0,
        lineHeight: width * 0.09,
        textAlign: 'center',
    },
    modal_title: {
        fontSize: width * 0.05,
        color: 'black',
        fontFamily: 'Poppins-Bold',
        marginBottom: height * 0.02,
        lineHeight: width * 0.075,
        textAlign: 'center'
    },
})