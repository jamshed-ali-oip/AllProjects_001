import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Google_API } from '../config/GoogleApi';
import Geocoder from 'react-native-geocoding';


export const locationFinder = (lat, long) => {
    Geocoder.init(Google_API)
    const name = Geocoder.from(lat, long)
        .then(json => {
            var addressComponent = json.results[0];
            console.log("GeoCodeGeoCodeGeoCode", addressComponent);
            return addressComponent

        }).catch(error => console.log("error", error));
    return name;
}



