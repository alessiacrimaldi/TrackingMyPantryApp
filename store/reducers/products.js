import Product from '../../models/product'
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

        case ADD_PRODUCT:
            const product = new Product(
                action.productData.id.toString(),
                action.productData.name,
                action.productData.description,
                action.productData.barcode,
                action.productData.userId,
                action.productData.quantity,
                action.productData.isGlutenFree,
                action.productData.isLactoseFree,
                action.productData.isVegan,
                action.productData.isVegetarian,
                action.productData.expiryDate,
                action.productData.address,
                action.productData.coords.lat,
                action.productData.coords.lng,
                action.productData.rating
            )
            return {
                ...state,
                userProducts: state.userProducts.concat(product)
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