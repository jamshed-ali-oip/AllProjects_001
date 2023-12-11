import { StyleSheet, Text, View, PermissionsAndroid, Platform } from 'react-native'
import React from 'react'
import GeoLocation from 'react-native-geolocation-service'

export const locationPermission = () => new Promise(async (resolve, reject) => {
    if (Platform.OS === "ios") {
        try {
            const permissionStatus = await GeoLocation.requestAuthorization("whenInUse");
            if (permissionStatus === 'granted') {
                return resolve("granted");
            }
            reject("location permission denied");
        } catch (error) {
            return reject("error: " + error)
        }
    }
    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve("granted");
        }
        reject("location permission denied");
    }).catch((error) => {
        console.log("ASK Location permission error: " + error)
        return reject("error: " + error)
    })
})
export const CurrentLocation = () => new Promise((resolve, reject) => {
    GeoLocation.getCurrentPosition(
        position => {
            const cords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            resolve(cords)
        },
        error => {
            reject(error.message)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    )
})