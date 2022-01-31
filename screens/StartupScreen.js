// import React, { useEffect } from 'react'
// import { StyleSheet, View, ActivityIndicator } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import Colors from '../constants/Colors'
// import { useDispatch } from 'react-redux'
// import * as authActions from '../store/actions/auth'


// const StartupScreen = () => {
//     const dispatch = useDispatch()

//     useEffect(() => {
//         const tryLogin = async () => {
//             const userData = await AsyncStorage.getItem('userData')
//             if (!userData) {  // se non ci sono i dati, ossia l'utente non ha effettuato l'accesso
//                 dispatch(authActions.triedLogin())
//                 return
//             }

//             const transformedData = JSON.parse(userData)  // trasforma i dati (stringa) in formato JSON, un oggetto o un array Javascript
//             const { token, userId, expiryDate } = transformedData
//             const expirationDate = new Date(expiryDate)
//             if (expirationDate <= new Date() || !token || !userId) {
//                 dispatch(authActions.triedLogin())
//                 return
//             }

//             const expirationTime = expirationDate.getTime() - new Date().getTime()
//             dispatch(authActions.authenticate(token, userId, expirationTime))  // Auto Login --> fa il login in automatico con i dati salvati
//         }
//         tryLogin()
//     }, [dispatch])  // dispatch non cambierà mai, quindi non verrà rieseguito: viene eseguito solo la prima volta al caricamento

//     return (
//         <View style={styles.screen}>
//             <ActivityIndicator size='large' color={Colors.primaryColor} />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     screen: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// })

// export default StartupScreen