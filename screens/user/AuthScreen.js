import React, { useState, useEffect, useReducer, useCallback } from 'react'
import {
    StyleSheet,
    Platform,
    View,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator,
    Alert
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../../constants/Colors'
import Input from '../../components/user/Input'
import Card from '../../components/UI/Card'
import { CustomButton } from '../../components/UI/Buttons'
import { useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/auth'


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]  // if one input is invalid, the overall form is invalid: F > T
        }
        return {
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        }
    }
    return state
}

const AuthScreen = () => {
    const [isRegisterMode, setIsSignup] = useState(false)  // initially in login mode
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        /* lo stato (formState) cambierà ad ogni digitazione */
        inputValues: {
            username: '',
            email: '',
            password: ''
        },
        inputValidities: {
            username: false,
            email: false,
            password: false
        },
        formIsValid: false
    })

    useEffect(() => {
        if (error) {
            Alert.alert('Something went wrong!', error, [{ text: 'Okay' }])
        }
    }, [error])

    const authHandler = async () => {
        let action
        if (isRegisterMode) {
            action =
                authActions.register(
                    formState.inputValues.username,
                    formState.inputValues.email,
                    formState.inputValues.password
                )
        } else {
            action =
                authActions.login(
                    formState.inputValues.email,
                    formState.inputValues.password
                )
        }
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(action)
        } catch (err) {
            setError(err.message)
            setIsLoading(false)
        }
    }

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE, //La funzione reducer FORM_INPUT_UPDATE verrà eseguita per ogni nuova azione inviata
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' && 'padding'}
            keyboardVerticalOffset={Platform.OS === 'ios' && 50}
        >
            <LinearGradient
                start={{ x: 0.1, y: 0.1 }} end={{ x: 0.5, y: 1.0 }}
                locations={[0.05, 0.5, 1]}
                colors={[Colors.primary, Colors.secondary, Colors.ternary]}
                style={styles.linearGradient}
            >
                <Card style={styles.authContainer}>
                    <ScrollView>
                        {isRegisterMode &&
                            <Input
                                id='username'
                                label='Username'
                                keyboardType='default'
                                require
                                autoCapitalize='none'
                                errorText='Please enter a valid username'
                                onInputChange={inputChangeHandler}
                                initialValue=''
                            />
                        }
                        <Input
                            id='email'
                            label='E-Mail'
                            keyboardType='email-address'
                            require
                            email
                            autoCapitalize='none'
                            errorText='Please enter a valid email address'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            require
                            minLenght={5}
                            autoCapitalize='none'
                            errorText='Please enter a valid password'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            <CustomButton
                                style={{ width: 94, alignItems: 'center' }}
                                color={Colors.secondary}
                                onPress={authHandler}
                            >
                                {isLoading
                                    ? (
                                        <ActivityIndicator size='small' color={Colors.details} />
                                    )
                                    : (
                                        isRegisterMode ? 'Sign Up' : 'Login'
                                    )
                                }
                            </CustomButton>
                        </View>
                        <View style={styles.buttonContainer}>
                            <CustomButton
                                style={{ width: 170 }}
                                color={Colors.ternary}
                                onPress={() => {
                                    setIsSignup(prevState => !prevState)
                                }}
                            >
                                {`Switch to ${isRegisterMode ? 'Login' : 'Sign Up'}`}
                            </CustomButton>
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10
    }
})

export default AuthScreen