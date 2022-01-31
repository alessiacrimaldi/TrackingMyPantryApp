import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import MainText from './MainText'
import Colors from '../../constants/Colors'


export const SecondaryButton = ({ children, onPress, isDisabled, style }) => {
    const currentMode = useSelector(state => state.mode.theme)
    let textColor
    if (currentMode === 'light') {
        textColor = 'white'
    } else {
        textColor = 'black'
    }

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} disabled={isDisabled}>
            <View style={{ ...styles.button, ...style, backgroundColor: isDisabled ? '#ccc' : Colors.secondary }}>
                <MainText style={{ ...styles.buttonText, color: isDisabled ? 'black' : textColor }}>
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