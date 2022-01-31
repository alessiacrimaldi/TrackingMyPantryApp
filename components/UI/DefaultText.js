import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'


const DefaultText = ({ style, children }) => {
    const currentMode = useSelector(state => state.mode.theme)
    if (currentMode === 'light') {
        return <Text style={{ ...styles.modeLightText, ...style }}>{children}</Text>
    } else {
        return <Text style={{ ...styles.modeDarkText, ...style }}>{children}</Text>
    }
}

const styles = StyleSheet.create({
    modeLightText: {
        fontFamily: 'open-sans',
        color: 'black'
    },
    modeDarkText: {
        fontFamily: 'open-sans',
        color: 'white'
    }
})

export default DefaultText