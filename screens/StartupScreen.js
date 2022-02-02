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
            const transformedData = JSON.parse(userData)
            const { token, userId, userName, userEmail, expiryDate } = transformedData
            const expirationDate = new Date(expiryDate)

            /* CASO 1) Non ci sono i dati: l'utente non ha effettuato l'accesso */
            if (!userData) {
                dispatch(authActions.triedLogin())  // cambia lo stato globale (didtTryLogin) e mi fa andare all'Autenticazione (vedi condizionali nel MainNavigator)
                return
            }

            /* CASO 2) Il token non è più valido (expirationDate è passata) o non ci sono i dati (ulteriore controllo) */
            if (expirationDate <= new Date() || !token || !userId || !userName || !userEmail) {
                dispatch(authActions.triedLogin())  // cambia lo stato globale (didtTryLogin) e mi fa andare all'Autenticazione (vedi condizionali nel MainNavigator)
                return
            }

            /* CASO 3) Ci sono i dati: il token è valido e l'utente ha già effettuato l'accesso --> Auto-Login */
            const expirationTime = expirationDate.getTime() - new Date().getTime()  // a positive number in ms (the remaining time)
            dispatch(authActions.authenticate(token, userId, userName, userEmail, expirationTime))
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