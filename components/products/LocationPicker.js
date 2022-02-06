import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { CustomTextButton } from '../UI/Buttons'
import * as Location from 'expo-location'
import Colors from '../../constants/Colors'
import MapPreview from './MapPreview'


const LocationPicker = ({ navigation, route, onLocationPicked, colors }) => {
    const mapPickedLocation = route.params?.pickedLocation
    const [isFetching, setIsFetching] = useState(false)
    const [status, requestPermission] = Location.useForegroundPermissions()
    const [pickedLocation, setPickedLocation] = useState('')

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation)
            onLocationPicked(mapPickedLocation)
        }
    }, [mapPickedLocation, onLocationPicked])

    const verifyPermissions = async () => {
        let finalStatus
        if (!status?.granted) {
            finalStatus = (await requestPermission()).status
        }
        if (finalStatus && finalStatus !== "granted") {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to get this location',
                [{ text: "Okay" }]
            )
            return false
        }
        return true
    }

    const getLocationHandler = async () => {
        const hasPermissions = await verifyPermissions()
        if (!hasPermissions) {
            return
        }
        try {
            setIsFetching(true)
            const location = await Location.getCurrentPositionAsync({})
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
            onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        } catch (err) {
            Alert.alert(
                'Could not fetch location',
                'Please try again later or pick a location on the map',
                [{ text: "Okay" }]
            )
        }
        setIsFetching(false)
    }

    const pickOnMapHandler = () => {
        navigation.navigate('Map', { barcode: route.params.barcode, saveColor: colors.saveColor })
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview
                style={{ ...styles.mapPreview, borderColor: colors.linesColor }}
                location={pickedLocation}
                onPress={pickOnMapHandler}
            >
                {isFetching
                    ? <ActivityIndicator size="large" color={Colors.detailsColor} />
                    : <Entypo name="location" size={32} color={colors.linesColor} />
                }
            </MapPreview>
            <View style={styles.actions}>
                <CustomTextButton
                    color={Colors.primary}
                    onPress={getLocationHandler}
                >
                    Get my location
                </CustomTextButton>
                <CustomTextButton
                    color={Colors.primary}
                    onPress={pickOnMapHandler}
                >
                    Pick on map
                </CustomTextButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    locationPicker: {
        alignItems: 'center',
        marginBottom: 5
    },
    mapPreview: {
        width: '100%',
        height: 150,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
})

export default LocationPicker