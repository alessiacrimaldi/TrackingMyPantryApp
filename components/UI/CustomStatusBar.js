import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'


const CustomStatusBar = () => {
    const currentMode = useSelector(state => state.mode.theme)
    let content
    if (currentMode === 'light') {
        content = <StatusBar style='dark' />
    } else {
        content = <StatusBar style='light' />
    }

    return content
}

export default CustomStatusBar