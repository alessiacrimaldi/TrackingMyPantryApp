/* Settings Screen: Schermata per la visualizzazione e gestione delle impostazioni (Notifiche e Tema 'dark' o 'light') */

import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { CustomButton } from '../../components/UI/Buttons'
import { useSelector, useDispatch } from 'react-redux'
import { changeTheme } from '../../store/actions/theme'
import * as Notifications from 'expo-notifications'
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

// To display the notification even if the app is in the foreground
Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true
        }
    }
})

const SettingsScreen = ({ navigation }) => {
    const [disabled, setDisabled] = useState(false)
    const [isAvailable, setIsAvailable] = useState(false)
    const allProducts = useSelector(state => state.products.userProducts)
    const userName = useSelector(state => state.auth.userName)
    const currentMode = useSelector(state => state.mode.theme)
    const dispatch = useDispatch()

    /* NOTIFICATIONS */
    // To request permissions (for iOS)
    useEffect(() => {
        Notifications.getPermissionsAsync()
            .then(statusObj => {
                if (statusObj.status !== 'granted') {
                    return Notifications.requestPermissionsAsync()
                }
                return statusObj
            })
            .then(statusObj => {
                if (statusObj.status !== 'granted') {
                    setDisabled(true)
                    alert('Failed to get permissions for sending notifications!')
                    return
                } else {
                    setDisabled(false)
                }
            })
    }, [])

    useEffect(() => {
        // Method that allows us to define code that should be executed when the user reacts to an incoming notification and the app is in the background
        const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                navigation.navigate('Product Details', {
                    productId: response.notification.request.content.data.productId,
                    productName: response.notification.request.content.data.productName
                })
            }
        )
        return () => {
            backgroundSubscription.remove()
        }
    }, [])

    // To set up the notification
    const triggerNotificationHandler = (id, name, remainingSeconds) => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Tracking My Pantry Reminder',
                body: `${userName}: ${name} will expire tomorrow!`,
                data: { productId: id, productName: name }
            },
            trigger: {
                seconds: remainingSeconds
            }
        })
    }

    const sendNotification = () => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        const productsOrderedByDate = allProducts.filter(product => product.expiryDate && new Date(product.expiryDate) > tomorrow)
        productsOrderedByDate.sort((a, b) => {
            return a.expiryDate.localeCompare(b.expiryDate)
        })
        console.log(productsOrderedByDate)

        if (productsOrderedByDate.length !== 0 && productsOrderedByDate[0].expiryDate) {
            const nextProductToExpire = productsOrderedByDate[0]
            const expiryDate = new Date(nextProductToExpire.expiryDate)
            expiryDate.setDate(expiryDate.getDate() - 1)
            const expirationRemainingSeconds = (expiryDate.getTime() - new Date().getTime()) / 1000

            triggerNotificationHandler(nextProductToExpire.id, nextProductToExpire.name, expirationRemainingSeconds)
            console.log(`Notification set up for ${nextProductToExpire.name} on ${expiryDate.toDateString()}`)
            Alert.alert('Notification set up!', 'Notification has been set up for the next product to expire')
        } else if (allProducts.length === 0) {
            alert('Sorry! There are no products')
            setIsAvailable(false)
        } else {
            alert('Sorry! No product is nearly to expire')
            setIsAvailable(false)
        }
    }

    /* THEME */
    const switchThemeHandler = () => {
        // change app theme ('dark' or 'light')
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
                    onChange={newValue => {
                        setIsAvailable(newValue)
                        if (newValue) {
                            sendNotification()
                        }
                    }}
                    isDisabled={disabled}
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