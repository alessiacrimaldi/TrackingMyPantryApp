/* Componenti riutilizzabili: pulsanti di default utilizzati nell'applicazione */

import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import MainText from './MainText'


const modeColors = mode => {
    switch (mode) {
        case 'light':
            return { textColor: 'white', disabledColor: '#ccc', disabledTextColor: '#9A9A9C' }
        case 'dark':
            return { textColor: 'black', disabledColor: '#888', disabledTextColor: '#1C1C1E' }
    }
}

export const CustomButton = ({ children, onPress, isDisabled, color, textColor, style }) => {
    const currentMode = useSelector(state => state.mode.theme)
    const text = textColor ? textColor : modeColors(currentMode).textColor

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} disabled={isDisabled}>
            <View style={{ ...styles.button, ...style, backgroundColor: isDisabled ? modeColors(currentMode).disabledColor : color }}>
                <MainText style={{ ...styles.buttonText, ...style, color: isDisabled ? modeColors(currentMode).disabledTextColor : text }}>
                    {children}
                </MainText>
            </View>
        </TouchableOpacity>
    )
}

export const CustomTextButton = ({ children, onPress, isDisabled, color, style }) => {
    const currentMode = useSelector(state => state.mode.theme)
    
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} disabled={isDisabled}>
            <MainText style={{ ...styles.buttonText, ...style, color: isDisabled ? modeColors(currentMode).disabledColor : color }}>
                {children}
            </MainText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 18,
        width: 110
    },
    buttonText: {
        textAlign: 'center'
    }
})