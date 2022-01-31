import { AUTHENTICATE, TRIED_LOGIN, LOGOUT } from '../actions/auth'


const initialState = {
    token: null,
    userId: null,
    didTryLogin: false
}

export default (state = initialState, action) => {
    switch (action.type) {

        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId,
                didTryLogin: true
            }

        case TRIED_LOGIN:
            return {
                ...state,
                didTryLogin: true
            }

        case LOGOUT:
            return {
                ...initialState,
                didTryLogin: true
            }

        default:
            return state
    }
}