import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as actions from "../store/Actions/index"
import Header from '../components/Header'
import Loader from '../components/Loader'
const Help = ({ getHelpText, navigation, helpText }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(true)
            getHelpText().then(() => setLoading(false))
        });

        return unsubscribe;
    }, [navigator])

    if (loading) {
        return <Loader />
    }
    return (
        <View>
            <Header
            passedStyle={{backgroundColor:"transparent"}}
                showBack={true}
                navigation={navigation}
                iconName="arrow-back"
            />
            <ScrollView style={{ padding: 20 }}>
                <Text style={{textAlign:'justify'}}>{helpText.description}</Text>
            </ScrollView>
        </View>
    )
}
function mapStateToProps({ helpText }) {
    return { helpText }
}
export default connect(mapStateToProps, actions)(Help)

const styles = StyleSheet.create({})
