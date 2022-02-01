import React, { useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import * as authActions from '../store/actions/auth'


const StartupScreen = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            // non ci sono i dati: l'utente non ha effettuato l'accesso
            if (!userData) {
                dispatch(authActions.triedLogin())
                return
            }
            // ci sono i dati: l'utente ha già effettuato l'accesso --> Auto-Login
            const transformedData = JSON.parse(userData)
            const { token, userId, userName, userEmail } = transformedData
            dispatch(authActions.authenticate(token, userId, userName, userEmail))
        }
        tryLogin()
    }, [dispatch])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.details} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartupScreen