import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'


const MainText = ({ style, children }) => {
    const currentMode = useSelector(state => state.mode.theme)
    if (currentMode === 'light') {
        return <Text style={{ ...styles.modeLightText, ...style }}>{children}</Text>
    } else {
        return <Text style={{ ...styles.modeDarkText, ...style }}>{children}</Text>
    }
}

const styles = StyleSheet.create({
    modeLightText: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
        color: 'black'
    },
    modeDarkText: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
        color: 'white'
    }
})

export default MainText