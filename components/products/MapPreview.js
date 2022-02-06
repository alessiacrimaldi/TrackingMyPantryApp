import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import ENVIRONMENT from '../../env'


const MapPreview = ({ location, style, onPress, children }) => {
    let imagePreviewUrl

    if (location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${ENVIRONMENT.googleApiKey}`
    }

    return (
        <TouchableOpacity onPress={onPress} style={{ ...styles.mapPreview, ...style }}>
            {location
                ? <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
                : children
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
})

export default MapPreview