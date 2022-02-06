import React, { useState, useLayoutEffect, useCallback } from 'react'
import { StyleSheet, TouchableOpacity, Platform, Alert, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MainText from '../../components/UI/MainText'
import Colors from '../../constants/Colors'


const MapScreen = ({ navigation, route }) => {
    const color = route.params.saveColor
    const readonly = route.params?.readonly
    const initialLocation = route.params?.initialLocation
    const [selectedLocation, setSelectedLocation] = useState()
    let markerCoordinates
    const { width, height } = Dimensions.get('window')
    const ASPECT_RATIO = width / height;
    const mapRegion = {
        latitude: initialLocation ? initialLocation.lat : 44.49561,
        longitude: initialLocation ? initialLocation.lng : 11.34293,
        latitudeDelta: 44.52062 - 44.46641,
        longitudeDelta: (44.52062 - 44.46641) * ASPECT_RATIO
    }

    const selectLocationHandler = event => {
        if (readonly) {
            return
        }
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    } else if (initialLocation) {
        markerCoordinates = {
            latitude: initialLocation.lat,
            longitude: initialLocation.lng
        }
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert(
                'Not location picked yet',
                'Please pick a location on the map to continue',
                [{ text: "Okay" }]
            )
            return
        }
        navigation.navigate('Add Product', { barcode: route.params.barcode, pickedLocation: selectedLocation })
    }, [selectedLocation])

    if (!readonly) {
        useLayoutEffect(() => {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity style={styles.headerButton} onPress={savePickedLocationHandler}>
                        <MainText
                            style={{ ...styles.headerButtonText, color: Platform.OS === 'android' ? color : Colors.primary }}
                        >
                            Save
                        </MainText>
                    </TouchableOpacity>
                )
            })
        }, [savePickedLocationHandler])
    }

    return (
        <MapView
            style={styles.map}
            region={mapRegion}
            onPress={selectLocationHandler}

        >
            {markerCoordinates && <Marker title='Picked Location' coordinate={markerCoordinates} />}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16
    }
})

export default MapScreen