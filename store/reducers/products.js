import {
    GET_PRODUCT_BY_BARCODE,
    ADD_PRODUCT,
    SET_PRODUCTS,
    TOGGLE_FAVORITE,
    SET_FILTERS,
    DELETE_PRODUCT
} from '../actions/products'


const initialState = {
    pickedProduct: {},
    sessionToken: null,
    userProducts: [],
    userFavoriteProducts: [],
    filters: {},
    filteredProducts: []
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_PRODUCT_BY_BARCODE:
            const newProduct = action.product
            const newToken = action.token
            return {
                ...state,
                pickedProduct: newProduct,
                sessionToken: newToken
            }

        case TOGGLE_FAVORITE:
            const existingIndex = state.userFavoriteProducts.findIndex(product => product.id === action.productId)
            if (existingIndex >= 0) {
                const updatedFavProducts = [...state.userFavoriteProducts]
                updatedFavProducts.splice(existingIndex, 1)
                return { ...state, userFavoriteProducts: updatedFavProducts }
            } else {
                const product = state.userProducts.find(product => product.id === action.productId)
                return { ...state, userFavoriteProducts: state.userFavoriteProducts.concat(product) }
            }

        case SET_FILTERS:
            const appliedFilters = action.filters
            const updatedFilteredProducts = state.userProducts.filter(product => {
                if (appliedFilters.sortByRating && !product.rating) {
                    return false
                }
                if (appliedFilters.glutenFree && !product.isGlutenFree) {
                    return false
                }
                if (appliedFilters.lactoseFree && !product.isLactoseFree) {
                    return false
                }
                if (appliedFilters.vegan && !product.isVegan) {
                    return false
                }
                if (appliedFilters.vegetarian && !product.isVegetarian) {
                    return false
                }
                if (appliedFilters.expired && (new Date() <= new Date(product.expiryDate))) {
                    return false
                }
                return true
            })
            if (appliedFilters.sortByQuantity) {
                updatedFilteredProducts.sort((a, b) => a.quantity - b.quantity)
            }
            if (appliedFilters.sortByRating) {
                updatedFilteredProducts.sort((a, b) => b.rating - a.rating)
            }
            return {
                ...state,
                filters: appliedFilters,
                filteredProducts: updatedFilteredProducts
            }

        default:
            return state
    }
}

export default productsReducer