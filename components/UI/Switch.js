import React from 'react'
import { StyleSheet, View, Switch } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import DefaultText from './DefaultText'


const CustomSwitch = ({ style, label, state, onChange }) => {
    const currentMode = useSelector(state => state.mode.theme)
    let linesColor
    if (currentMode === 'light') {
        linesColor = '#efefef'
    } else {
        linesColor = Colors.darkMode
    }

    return (
        <View style={{ ...styles.switchContainer, ...style }}>
            <DefaultText style={styles.switchText}>{label}</DefaultText>
            <Switch
                trackColor={{ false: Colors.details, true: Colors.primary }}
                thumbColor={Platform.OS === 'android' ? 'white' : ''}
                ios_backgroundColor={linesColor}
                value={state}
                onValueChange={onChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '98%',
        paddingVertical: 15
    },
    switchText: {
        width: '80%'
    }
})

export default CustomSwitch