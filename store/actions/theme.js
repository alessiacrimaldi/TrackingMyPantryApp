/* Azione relativa al cambiamento del tema dell'applicazione: 'dark mode' o 'light mode' */

export const CHANGE_THEME = 'CHANGE_THEME'


export const changeTheme = () => {
    return { type: CHANGE_THEME }
}