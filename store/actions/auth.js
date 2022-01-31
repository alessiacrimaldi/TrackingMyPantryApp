import AsyncStorage from '@react-native-async-storage/async-storage'
export const AUTHENTICATE = 'AUTHENTICATE'
export const TRIED_LOGIN = 'TRIED_LOGIN'
export const LOGOUT = 'LOGOUT'

let timer;


export const authenticate = (token, userId, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({ type: AUTHENTICATE, token: token, userId: userId })
        /* qui spediamo due azioni, ma questo non crea alcun tipo di problema */
    }
}

export const triedLogin = () => {
    return { type: TRIED_LOGIN }
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD0NGXCv2bZbc4VHCZurQmDvollZuPbkY8',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        )
        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Something went wrong!'
            if (errorId === 'EMAIL_EXISTS') {               // found in the Firebase Rest Auth API
                message = 'This email exists already!'
            }
            throw new Error(message)
        }
        const resData = await response.json()   // decomprimerà il corpo della risposta e lo trasformerà automaticamente dal formato JSON in Javascript (quindi in un oggetto o array Javascript)
        dispatch(authenticate(
            resData.idToken,
            resData.localId,
            parseInt(resData.expiresIn) * 1000
        ))                                      // sono valori dell'oggetto response.json() = resData
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        )
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD0NGXCv2bZbc4VHCZurQmDvollZuPbkY8',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        )
        if (!response.ok) {
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Something went wrong!'
            if (errorId === 'EMAIL_NOT_FOUND') {            // found in the Firebase Rest Auth API
                message = 'This email could not be found!'
            } else if (errorId === 'INVALID_PASSWORD') {    // found in the Firebase Rest Auth API
                message = 'This password is not valid!'
            }
            throw new Error(message)
        }
        const resData = await response.json()  // decomprimerà il corpo della risposta e lo trasformerà automaticamente dal formato JSON in Javascript (quindi in un oggetto o array Javascript)
        dispatch(authenticate(
            resData.idToken,
            resData.localId,
            parseInt(resData.expiresIn) * 1000
        ))
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        )
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    }
}

export const logout = () => {
    clearLogoutTimer()
    AsyncStorage.removeItem('userData')  // restituisce una promessa: nel caso fossimo interessati nel risultato di removeItem potremmo aspettare il completamento di questa promessa
    return { type: LOGOUT }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const setLogoutTimer = expirationTime => {  // l'expirationTime che passiamo dev'essere in millisecondi
    return dispatch => {
        timer = setTimeout(() => {  // quando il timer scade (dopo expirationTime ms), possiamo spedire l'azione di logout
            dispatch(logout())
        }, expirationTime)
    }
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate
        })
    )
}