import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { defaultLightScreenOption, defaultDarkScreenOption } from './defaultScreenOptions'
import { useSelector } from 'react-redux'

import AuthScreen from '../screens/user/AuthScreen'


const Stack = createStackNavigator()

const AuthNavigator = () => {
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
                name="Authenticate"
                component={AuthScreen}
                options={{ title: 'Tacking My Pantry' }}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigator