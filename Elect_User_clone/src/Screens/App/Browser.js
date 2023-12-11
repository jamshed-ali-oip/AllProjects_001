import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { PrimaryButton } from '../../Compoents/Buttons/BTN'
const { height, width } = Dimensions.get("window")
const Browser = ({ navigation, route }) => {
    const data = route?.params
    console.log("DATADTDATDTTDTDATATD", data)
    return (
        <>
            <WebView source={{ uri: data ? data.data : null }}
                style={{ flex: 1 }} />
            <PrimaryButton
                onPress={() => { navigation.goBack() }}
                title="Back to App"
            />
            {/* <TouchableOpacity

                style={{ backgroundColor: "red", height: height * 0.035 }}
            >
                <Text>Back to App</Text>
            </TouchableOpacity> */}
        </>
        // <View>
        //     <Text>Browser</Text>
        // </View>
    )
}

export default Browser

const styles = StyleSheet.create({})