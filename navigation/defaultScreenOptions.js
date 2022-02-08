/* Opzioni stilistiche di default di tutti i navigators (a seconda del tema dark o light) */

import { Platform } from 'react-native'
import Colors from '../constants/Colors'


export const defaultLightScreenOption = {
    presentation: 'transparentModal',
    cardStyle: { backgroundColor: 'white' },
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
    },
    headerTitleAlign: 'center',
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    headerBackTitleStyle: { fontFamily: 'open-sans' },
    headerTitleStyle: {
        fontFamily: 'poppins-semibold',
        fontSize: 21,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
}

export const defaultDarkScreenOption = {
    presentation: 'transparentModal',
    cardStyle: { backgroundColor: 'black' },
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'black',
        shadowColor: 'transparent'
    },
    headerTitleAlign: 'center',
    headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primary,
    headerBackTitleStyle: { fontFamily: 'open-sans' },
    headerTitleStyle: {
        fontFamily: 'poppins-semibold',
        fontSize: 21,
        color: Platform.OS === 'android' ? 'black' : Colors.primary
    }
}