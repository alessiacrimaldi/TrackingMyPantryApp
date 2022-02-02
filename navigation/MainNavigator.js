import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import StartupScreen from '../screens/StartupScreen'
import AuthNavigator from './user/AuthNavigator'
import AppNavigator from './AppNavigator'


const MainNavigator = () => {
    const isAuthenticated = useSelector(state => state.auth.token)
    const didTryLogin = useSelector(state => state.auth.didTryLogin)

    return (
        <NavigationContainer>
            {!isAuthenticated && !didTryLogin && <StartupScreen />}
            {!isAuthenticated && didTryLogin && <AuthNavigator />}
            {isAuthenticated && <AppNavigator />}
        </NavigationContainer>
    )
}

export default MainNavigator