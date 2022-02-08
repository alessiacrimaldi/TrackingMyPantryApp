/* Componente riutilizzabile: icona dell'header standard utilizzata nell'applicazione (a seconda del tema dark o light) */

import React from 'react'
import { Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors'


const modeColor = mode => {
    switch (mode) {
        case 'light':
            return 'white'
        case 'dark':
            return 'black'
    }
}

const CustomHeaderButton = props => {
    const currentMode = useSelector(state => state.mode.theme)

    return <HeaderButton
        {...props}
        IconComponent={Ionicons}
        iconSize={props.iconSize ?? 25}
        color={props.color ? props.color : (Platform.OS === 'android' ? modeColor(currentMode) : Colors.primary)}
    />
}

export default CustomHeaderButton