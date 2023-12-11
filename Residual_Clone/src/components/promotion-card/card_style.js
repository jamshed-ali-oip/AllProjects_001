import { StyleSheet } from 'react-native'
import {Dimensions} from 'react-native';


const { height, width } = Dimensions.get('window');


export default StyleSheet.create({
    promotion_card: {
        width : width * 0.9,
        marginBottom : 25,
        alignSelf:'center'
    },
})