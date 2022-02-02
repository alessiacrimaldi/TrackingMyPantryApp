import { Platform } from 'react-native'
import Colors from '../constants/Colors'


export const defaultLightScreenOption = {
    presentation: 'modal',
    cardStyle: { backgroundColor: 'white' },
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        shadowColor: 'transparent'
    },
    headerTitleStyle: {
        fontFamily: 'poppins-semibold',
        fontSize: 22,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
        color: Colors.iphone
    }
}

export const defaultDarkScreenOption = {
    presentation: 'modal',
    cardStyle: { backgroundColor: 'black' },
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'black',
        shadowColor: 'transparent'
    },
    headerTitleStyle: {
        fontFamily: 'poppins-semibold',
        fontSize: 22,
        color: Platform.OS === 'android' ? 'black' : Colors.primary
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
        color: Colors.iphone
    }
}