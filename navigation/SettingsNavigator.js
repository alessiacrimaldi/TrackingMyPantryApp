import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { defaultLightScreenOption, defaultDarkScreenOption } from './defaultScreenOptions'
import { useSelector } from 'react-redux'

import SettingsScreen from '../screens/user/SettingsScreen'
import CustomHeaderButton from '../components/UI/HeaderButton'


const Stack = createStackNavigator()

const SettingsNavigator = () => {
    const currentMode = useSelector(state => state.mode.theme)
    let defaultScreenOption
    if (currentMode === 'light') {
        defaultScreenOption = defaultLightScreenOption
    } else {
        defaultScreenOption = defaultDarkScreenOption
    }

    return (
        <Stack.Navigator
            screenOptions={{ ...defaultScreenOption }}
        >
            <Stack.Screen
                name="App Settings"
                component={SettingsScreen}
                options={({ navigation }) => {
                    return {
                        title: 'Settings',
                        headerLeft: () => (
                            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                                <Item
                                    title='Menu'
                                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu-outline'}
                                    onPress={() => {
                                        navigation.toggleDrawer()
                                    }}
                                />
                            </HeaderButtons>
                        )
                    }
                }}
            />
        </Stack.Navigator>
    )
}

export default SettingsNavigator