/* Componente personalizzato: status bar (per iOS) chiara o scura a seconda del tema dark o light */

import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'


const CustomStatusBar = () => {
    const currentMode = useSelector(state => state.mode.theme)
    if (currentMode === 'light') {
        return <StatusBar style='dark' />
    } else {
        return <StatusBar style='light' />
    }
}

export default CustomStatusBar