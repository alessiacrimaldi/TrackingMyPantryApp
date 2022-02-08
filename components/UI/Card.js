/* Componente riutilizzabile: card di default utilizzata nell'applicazione (a seconda del tema dark o light) */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors'


const Card = ({ children, style }) => {
    const currentMode = useSelector(state => state.mode.theme)
    if (currentMode === 'light') {
        return (
            <View style={{ ...styles.lightModeCard, ...style }}>
                {children}
            </View>
        )
    } else {
        return (
            <View style={{ ...styles.darkModeCard, ...style }}>
                {children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lightModeCard: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 6,
        elevation: 8,
        backgroundColor: 'white',
        borderRadius: 10
    },
    darkModeCard: {
        backgroundColor: Colors.darkMode,
        borderRadius: 10
    }
})

export default Card