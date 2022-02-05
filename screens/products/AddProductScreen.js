import React, { useState, useEffect, useReducer, useCallback } from 'react'
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Alert } from 'react-native'
import { Keyboard } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { CustomButton } from '../../components/UI/Buttons'
import * as productsActions from '../../store/actions/products'
import Colors from '../../constants/Colors'
import Card from '../../components/UI/Card'
import Input from '../../components/user/Input'
import MainText from '../../components/UI/MainText'
import CustomSwitch from '../../components/UI/Switch'


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

const AddProductScreen = ({ navigation, route }) => {
    const productMode = route.params.mode
    const productBarcode = route.params.barcode
    const userId = useSelector(state => state.auth.userId)
    const pickedProduct = useSelector(state => state.products.pickedProduct)
    const [isGlutenFree, setIsGlutenFree] = useState(false)
    const [isLactoseFree, setIsLactoseFree] = useState(false)
    const [isVegan, setIsVegan] = useState(false)
    const [isVegetarian, setIsVegetarian] = useState(false)
    const [expiryDate, setExpiryDate] = useState(null)
    const [selectedLocation, setSelectedLocation] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        /* lo stato (formState) cambierà ad ogni digitazione */
        inputValues: {
            name: pickedProduct?.name,
            description: pickedProduct?.description,
            quantity: '',
            rating: ''
        },
        inputValidities: {
            name: pickedProduct.name ? true : false,
            description: pickedProduct.description ? true : false,
            quantity: false,
            rating: false
        },
        formIsValid: false
    })

    useEffect(() => {
        if (error) {
            Alert.alert('Something went wrong!', error, [{ text: 'Okay' }])
        }
    }, [error])

    const saveProductHandler = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try {
            if (productMode === 'update') {
                await dispatch(
                    productsActions.addLocalProduct(
                        pickedProduct.productId,
                        formState.inputValues.name,
                        formState.inputValues.description,
                        productBarcode,
                        userId,
                        formState.inputValues.quantity,
                        isGlutenFree,
                        isLactoseFree,
                        isVegan,
                        isVegetarian,
                        expiryDate,
                        selectedLocation,
                        formState.inputValues.rating
                    )
                )
            } else if (productMode === 'create') {
                await dispatch(
                    productsActions.addRemoteAndLocalProduct(
                        formState.inputValues.name,
                        formState.inputValues.description,
                        productBarcode,
                        userId,
                        formState.inputValues.quantity,
                        isGlutenFree,
                        isLactoseFree,
                        isVegan,
                        isVegetarian,
                        expiryDate,
                        selectedLocation,
                        formState.inputValues.rating
                    )
                )
            }
            navigation.navigate('Manage Products')
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }, [dispatch, formState])  // se formState cambia (ovvero ad ogni digitazione), allora la funzione viene ricostruita

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE, //La funzione reducer FORM_INPUT_UPDATE verrà eseguita per ogni nuova azione inviata
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location)
    }, [])

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.accentColor} />
        </View>
    }

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' && 'padding'}
            keyboardVerticalOffset={Platform.OS === 'ios' && 50}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.form}>
                        <Card style={styles.cardInput}>
                            <Input
                                id='name'
                                label='Name *'
                                errorText='Please enter a valid name'
                                keyboardType='default'
                                autoCapitalize='sentences'
                                autoCorrect
                                onInputChange={inputChangeHandler}
                                initialValue={pickedProduct?.name}
                                initiallyValid={pickedProduct.name}
                                required
                            />
                        </Card>
                        <Card style={styles.cardInput}>
                            <Input
                                id='description'
                                label='Description *'
                                errorText='Please enter a valid description'
                                keyboardType='default'
                                autoCapitalize='sentences'
                                autoCorrect
                                multiline
                                numberOfLines={5}
                                onInputChange={inputChangeHandler}
                                initialValue={pickedProduct?.description}
                                initiallyValid={pickedProduct.description}
                                required
                                minLength={5}
                            />
                        </Card>
                        <Card style={styles.cardInput}>
                            <Input
                                id='quantity'
                                label='Quantity *'
                                errorText='Please enter a valid quantity (min 1)'
                                keyboardType='numeric'
                                onInputChange={inputChangeHandler}
                                required
                                min={1}
                            />
                        </Card>
                        <Card style={styles.cardInput}>

                        </Card>
                        <Card style={styles.cardInput}>
                            <View style={styles.properties}>
                                <CustomSwitch
                                    color={Colors.primary}
                                    label='Gluten-free'
                                    state={isGlutenFree}
                                    onChange={newValue => setIsGlutenFree(newValue)}
                                />
                                <CustomSwitch
                                    color={Colors.primary}
                                    label='Lactose-free'
                                    state={isLactoseFree}
                                    onChange={newValue => setIsLactoseFree(newValue)}
                                />
                                <CustomSwitch
                                    color={Colors.primary}
                                    label='Vegan'
                                    state={isVegan}
                                    onChange={newValue => setIsVegan(newValue)}
                                />
                                <CustomSwitch
                                    color={Colors.primary}
                                    label='Vegetarian'
                                    state={isVegetarian}
                                    onChange={newValue => setIsVegetarian(newValue)}
                                />
                            </View>
                        </Card>
                        <Card style={styles.cardInput}>
                            <MainText style={styles.label}>Location</MainText>
                        </Card>
                        <Card style={styles.cardInput}>
                            <Input
                                id='rating'
                                label='Rating *'
                                errorText='Please enter a valid rating (between 1 and 5)'
                                keyboardType='numeric'
                                onInputChange={inputChangeHandler}
                                required
                                min={1}
                                max={5}
                            />
                        </Card>
                        <View style={styles.buttonContainer}>
                            <CustomButton
                                color={Colors.save}
                                style={{ width: 100, alignItems: 'center' }}
                                onPress={saveProductHandler}
                                isDisabled={!formState.formIsValid ? true : false}
                            >
                                SAVE
                            </CustomButton>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        marginHorizontal: 15
    },
    cardInput: {
        marginTop: 15,
        paddingTop: 5,
        paddingBottom: 17,
        paddingHorizontal: 17
    },
    label: {
        marginVertical: 8
    },
    properties: {
        marginHorizontal: 25
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 45
    }
})

export default AddProductScreen