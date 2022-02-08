/* Reducer per l'azione relativa al cambiamento del tema dell'applicazione: 'dark mode' o 'light mode' */

import { CHANGE_THEME } from '../actions/theme'


const initialState = {
    theme: 'light'
}

const themeReducer = (state = initialState, action) => {
    switch (action.type) {

        case CHANGE_THEME:
            let newTheme
            if (state.theme === 'light') {
                newTheme = 'dark'
            } else {
                newTheme = 'light'
            }
            return {
                theme: newTheme
            }
            
        default:
            return state
    }
}

export default themeReducer