import AsyncStorage from '@react-native-async-storage/async-storage'
export const AUTHENTICATE = 'AUTHENTICATE'
export const TRIED_LOGIN = 'TRIED_LOGIN'
export const LOGOUT = 'LOGOUT'


export const authenticate = (token, userId, userName, userEmail, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({ type: AUTHENTICATE, token: token, userId: userId, userName: userName, userEmail: userEmail })
    }
}

export const triedLogin = () => {
    return { type: TRIED_LOGIN }
}

export const register = (username, email, password) => {
    return async dispatch => {
        const responseRegister = await fetch(
            'https://lam21.iot-prism-lab.cs.unibo.it/users',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            }
        )
        if (!responseRegister.ok) {
            throw new Error('This email exists already')
        }
        const resRegisterData = await responseRegister.json()

        const responseLogin = await fetch(
            'https://lam21.iot-prism-lab.cs.unibo.it/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        )
        if (!responseLogin.ok) {
            throw new Error('This email exists already')
        }
        const resLoginData = await responseLogin.json()

        dispatch(authenticate(
            resLoginData.accessToken,
            resRegisterData.id,
            resRegisterData.username,
            resRegisterData.email,
            604800000
        ))

        const expirationDate = new Date(new Date().getTime() + 604800000)

        saveDataToStorage(resLoginData.accessToken, resRegisterData.id, resRegisterData.username, resRegisterData.email, expirationDate)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const responseLogin = await fetch(
            'https://lam21.iot-prism-lab.cs.unibo.it/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        )
        if (!responseLogin.ok) {
            throw new Error('Please check your credentials')
        }
        const resLoginData = await responseLogin.json()

        const token = resLoginData.accessToken
        const response = await fetch(
            'https://lam21.iot-prism-lab.cs.unibo.it/users/me',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        if (!response.ok) {
            throw new Error('Please check your credentials')
        }
        const resData = await response.json()

        dispatch(authenticate(
            resLoginData.accessToken,
            resData.id,
            resData.username,
            resData.email,
            604800000
        ))

        const expirationDate = new Date(new Date().getTime() + 604800000)

        saveDataToStorage(resLoginData.accessToken, resData.id, resData.username, resData.email, expirationDate)
    }
}

export const logout = () => {
    clearLogoutTimer()
    AsyncStorage.removeItem('userData')
    return { type: LOGOUT }
}

let timer

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())   // quando il timer scade (dopo 604800000 ms = 7 giorni), possiamo spedire l'azione di Auto-Logout
        }, expirationTime)
    }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const saveDataToStorage = (token, userId, userName, userEmail, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            userName: userName,
            userEmail: userEmail,
            expiryDate: expirationDate
        })
    )
}