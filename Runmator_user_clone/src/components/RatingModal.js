import React, { Component, useState } from 'react'
import { Text, View, Modal, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import IconSuccess from "react-native-vector-icons/Entypo"
import { useTheme } from '@react-navigation/native'
import colors from '../assets/colors'
import { Rating } from 'react-native-ratings';
import { connect } from 'react-redux'
import * as actions from "../store/Actions"

const { width, height } = Dimensions.get('window')
function RatingModal({ visible, closeModle, title, UserReducer,submitRating,currentRating }) {
    const [rating,setRating]=useState(3.5)
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            style={{ flex: 1, justifyContent: 'center', elevation: 5 }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: height, backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <View style={{ ...styles.con, backgroundColor: "white" }}>
                    <View style={{ width: '100%', alignItems: 'flex-end', padding: 10 }}>
                        <TouchableOpacity
                            onPress={closeModle}
                        >
                            <IconSuccess name="cross" color="gray" size={35} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center'}}>
                        <Text style={{ color: 'black', marginTop: 10, textAlign: 'center', width: '90%' ,fontSize:15}}>{title.toUpperCase()}</Text>
                    </View>
                    <View style={{ width: '100%' }}>
                        <Rating
                            showRating
                            onFinishRating={rat=>setRating(rat)}
                            style={{ paddingVertical: 10 }}
                        />
                    </View>
                    <TouchableOpacity style={{ ...styles.btn, backgroundColor: colors.themeBlue }} onPress={() => {
                        console.log("rattingObject",{
                            user_id:UserReducer?.userData?.id,
                            rating:rating,
                            provider_id:currentRating?.provider[0]?.id,
                            service_id:currentRating?.service[0]?.id,
                            booking_id:currentRating?.booking[0]?.id
                        })
                        submitRating({
                            user_id:UserReducer?.userData?.id,
                            rating:rating,
                            provider_id:currentRating?.provider[0]?.id,
                            service_id:currentRating?.service[0]?.service_id,
                            booking_id:currentRating?.booking[0]?.id
                        }).then(res=>{
                            console.log(res.data)
                        }).catch(err=>{
                            console.log("aa",err)
                            console.log(err?.response?.data)
                        })
                        closeModle()
                    }}>
                        <Text style={styles.btnText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    con: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width / 1.5,
        height: height / 3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderRadius: 20
    },
    iconCon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        marginTop: 15,
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    btnText: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 17,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 2
    },
    icon: {
        backgroundColor: 'white',
        borderWidth: 4,
        borderColor: '#001441',
        width: '18%',
        height: '18%',
        borderRadius: '18%' / 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

function mapStateToProps({UserReducer}){
    return {UserReducer}
}
export default connect(mapStateToProps,actions)(RatingModal);