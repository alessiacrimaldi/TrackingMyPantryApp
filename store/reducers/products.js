import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/products'


const initialState = {
    products: [],
    favoriteProducts: [],
    filteredProducts: []
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {

        case TOGGLE_FAVORITE:
            const existingIndex = state.filteredProducts.findIndex(product => product.id === action.productId)
            if (existingIndex >= 0) {
                const updatedFavProducts = [...state.favoriteProducts]
                updatedFavProducts.splice(existingIndex, 1)
                return { ...state, favoriteProducts: updatedFavProducts }
            } else {
                const product = state.products.find(product => product.id === action.productId)
                return { ...state, favoriteProducts: state.favoriteProducts.concat(product) }
            }

        case SET_FILTERS:
            const appliedFilters = action.filters
            const updatedFilteredProducts = state.products
            // if (appliedFilters.sortByQuantity) {
            //     updatedFilteredProducts.sort()
            // }
            // if (appliedFilters.sortByRating) {
            //     updatedFilteredProducts.sort()
            // }
            updatedFilteredProducts.filter(product => {
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
            return { ...state, filteredProducts: updatedFilteredProducts }

        default:
            return state
    }
}

export default productsReducer