/* Reducer per le azioni relative ai prodotti */

import Product from '../../models/product'
import {
    GET_PRODUCT_BY_BARCODE,
    ADD_PRODUCT,
    SET_PRODUCTS,
    SET_FILTERS,
    TOGGLE_FAVORITE,
    DELETE_PRODUCT
} from '../actions/products'


const initialState = {
    pickedProduct: {},
    sessionToken: null,
    userProducts: [],
    filters: {
        sortByQuantity: false,
        sortByRating: false,
        glutenFree: false,
        lactoseFree: false,
        vegan: false,
        vegetarian: false,
        expired: false
    },
    filteredProducts: [],
    userFavoriteProducts: []
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
                action.productData.rating,
                action.productData.favorite
            )
            return {
                ...state,
                userProducts: state.userProducts.concat(product)
            }

        case SET_PRODUCTS:
            return {
                ...state,
                userProducts: action.products.map(
                    product => new Product(
                        product.id.toString(),
                        product.name,
                        product.description,
                        product.barcode,
                        product.userId,
                        product.quantity,
                        setBoolean(product.isGlutenFree),
                        setBoolean(product.isLactoseFree),
                        setBoolean(product.isVegan),
                        setBoolean(product.isVegetarian),
                        product.expiryDate,
                        product.address,
                        product.lat,
                        product.lng,
                        product.rating,
                        setBoolean(product.favorite)
                    )
                ),
                userFavoriteProducts: action.favProducts.map(
                    favProduct => new Product(
                        favProduct.id.toString(),
                        favProduct.name,
                        favProduct.description,
                        favProduct.barcode,
                        favProduct.userId,
                        favProduct.quantity,
                        setBoolean(favProduct.isGlutenFree),
                        setBoolean(favProduct.isLactoseFree),
                        setBoolean(favProduct.isVegan),
                        setBoolean(favProduct.isVegetarian),
                        favProduct.expiryDate,
                        favProduct.address,
                        favProduct.lat,
                        favProduct.lng,
                        favProduct.rating,
                        setBoolean(favProduct.favorite)
                    )
                )
            }

        case SET_FILTERS:
            const appliedFilters = action.filters
            const updatedFilteredProducts = state.userProducts.filter(product => {
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
                if (appliedFilters.expired && ((new Date() < new Date(product.expiryDate)) || !product.expiryDate)) {
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

        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    product => product.id !== action.productId
                ),
                filteredProducts: state.filteredProducts.filter(
                    product => product.id !== action.productId
                ),
                userFavoriteProducts: state.userFavoriteProducts.filter(
                    product => product.id !== action.productId
                )
            }

        default:
            return state
    }
}

export default productsReducer


/* Utils */
const setBoolean = (value) => {
    if (value === 0) {
        return false
    } else {
        return true
    }
}