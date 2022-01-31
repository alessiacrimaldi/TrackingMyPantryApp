import React from 'react'
import { Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import { useSelector } from 'react-redux'


const CustomHeaderButton = props => {
    const currentMode = useSelector(state => state.mode.theme)
    let color
    if (currentMode === 'light') {
        color = 'white'
    } else {
        color = 'black'
    }

    return <HeaderButton
        {...props}
        IconComponent={Ionicons}
        iconSize={props.iconSize ?? 25}
        color={Platform.OS === 'android' ? color : Colors.primary}
    />
}

export default CustomHeaderButton