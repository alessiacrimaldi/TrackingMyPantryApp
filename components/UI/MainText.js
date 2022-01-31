import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'


const MainText = ({ style, children }) => {
    const currentMode = useSelector(state => state.mode.theme)
    let content
    if (currentMode === 'light') {
        content = <Text style={{ ...styles.modeLightText, ...style }}>{children}</Text>
    } else {
        content = <Text style={{ ...styles.modeDarkText, ...style }}>{children}</Text>
    }

    return content
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