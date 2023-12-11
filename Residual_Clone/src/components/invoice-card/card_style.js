import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';


const { height, width } = Dimensions.get('window');


export default StyleSheet.create({
    gradient_btn: {
        width: width * 0.9,
        flexDirection: 'row',
        alignItems : 'center',
        marginBottom: width * 0.05,
        borderRadius : 25,
        paddingHorizontal : width * 0.05,
        paddingVertical : width * 0.045,
    },
    icon: {
        width : width * 0.14,
        height : width * 0.14,
        backgroundColor : 'rgba(255, 255, 255, 0.1)',
        textAlign : 'center',
        lineHeight : width * 0.14,
        fontSize : width * 0.13,
        borderRadius : 12
    },
    titles_view :{
        flex : 1,
        paddingLeft : width * 0.03,
    },
    main_title: {
        fontSize : width * 0.040,
        textTransform:'uppercase',
        color : '#fff',
        fontFamily: 'Poppins-Bold',
    },
    sub_title: {
        fontSize : width * 0.035,
        color : '#fff',
        marginTop : width * 0.001,
        fontFamily: 'Poppins-Bold',
    },
})