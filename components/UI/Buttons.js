import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import MainText from './MainText'


export const CustomButton = ({ children, onPress, isDisabled, color, style }) => {
    const currentMode = useSelector(state => state.mode.theme)
    let textColor
    let disabledColor
    let disabledTextColor
    if (currentMode === 'light') {
        textColor = 'white'
        disabledColor = '#ccc'
        disabledTextColor = '#9A9A9C'
    } else {
        textColor = 'black'
        disabledColor = '#888'
        disabledTextColor = '#1C1C1E'
    }

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} disabled={isDisabled}>
            <View style={{ ...styles.button, ...style, backgroundColor: isDisabled ? disabledColor : color }}>
                <MainText style={{ ...styles.buttonText, color: isDisabled ? disabledTextColor : textColor }}>
                    {children}
                </MainText>
            </View>
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