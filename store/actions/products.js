export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
export const SET_FILTER = 'SET_FILTERS'


export const toggleFavorite = id => {
    return { type: TOGGLE_FAVORITE, productId: id }
}

export const setFilters = filterSettings => {
    return { type: SET_FILTER, filters: filterSettings }
}