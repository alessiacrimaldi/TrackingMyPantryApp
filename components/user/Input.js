import React, { useReducer, useEffect } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import DefaultText from '../UI/DefaultText'
import MainText from '../UI/MainText'


const modeColors = mode => {
    switch (mode) {
        case 'light':
            return {linesColor: '#ccc', textColor: 'black'}
        case 'dark':
            return {linesColor: '#888', textColor: 'white'}
    }
}

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        default:
            return state
    }
}

const Input = props => {
    const currentMode = useSelector(state => state.mode.theme)
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false
    })

    const { onInputChange, id } = props
    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid)
        }
    }, [inputState, onInputChange, id])

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        /* costante che imposta un'espressione regolare e-mail, quindi un'espressione regolare che consente di convalidare gli indirizzi e-mail */
        let isValid = true
        /* is Valid è di default true, ma diventa false non appena una convalida fallisce */
        if (props.required && text.trim().length === 0) {
            isValid = false
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false
        }
        if (props.min != null && +text < props.min) {
            isValid = false
        }
        if (props.max != null && +text > props.max) {
            isValid = false
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false
        }
        dispatch({ type: INPUT_CHANGE, value: text, isValid })
    }

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR })
    }

    return (
        <View style={styles.formControl}>
            <MainText style={styles.label}>{props.label}</MainText>
            <TextInput
                {...props}
                style={{ ...styles.input, borderBottomColor: modeColors(currentMode).linesColor, color: modeColors(currentMode).textColor }}
                value={inputState.value}
                onChangeText={textChangeHandler}  // P.S: il parametro 'text' della funzione textChangeHandler viene in questo modo automaticamente passato come ultimo parametro
                onBlur={lostFocusHandler}
            />
            {!inputState.isValid && inputState.touched && (
                <View style={styles.errorContainer}>
                    <DefaultText style={styles.errorText}>{props.errorText}</DefaultText>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomWidth: 1
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        fontSize: 13,
        color: 'red'
    }
})

export default Input