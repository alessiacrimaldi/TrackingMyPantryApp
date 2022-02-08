import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { CustomButton } from '../../components/UI/Buttons'
import { useSelector, useDispatch } from 'react-redux'
import { changeTheme } from '../../store/actions/theme'
import Colors from '../../constants/Colors'
import MainText from '../../components/UI/MainText'
import CustomSwitch from '../../components/UI/Switch'


const modeColor = mode => {
    switch (mode) {
        case 'light':
            return '#efefef'
        case 'dark':
            return Colors.darkMode
    }
}

const SettingsScreen = () => {
    const [isAvailable, setIsAvailable] = useState(false)
    const currentMode = useSelector(state => state.mode.theme)
    const dispatch = useDispatch()

    const switchThemeHandler = () => {
        dispatch(changeTheme())
    }

    return (
        <View style={styles.screen}>
            <View style={{ ...styles.option, borderBottomColor: modeColor(currentMode) }}>
                <MainText>NOTIFICATIONS</MainText>
                <CustomSwitch
                    color={Colors.primary}
                    label='Notify me for the next product which is nearly to expire'
                    state={isAvailable}
                    onChange={newValue => setIsAvailable(newValue)}
                />
            </View>
            <View style={{ ...styles.option, borderBottomColor: modeColor(currentMode) }}>
                <MainText>THEME</MainText>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        color={currentMode === 'light' ? Colors.darkMode : 'white'}
                        style={{ width: 130, alignItems: 'center' }}
                        onPress={switchThemeHandler}
                    >
                        {currentMode === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </CustomButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 15,
        marginHorizontal: 20
    },
    option: {
        marginTop: 15,
        borderBottomWidth: 1
    },
    buttonContainer: {
        alignItems: 'center',
        paddingVertical: 15
    }
})

export default SettingsScreen