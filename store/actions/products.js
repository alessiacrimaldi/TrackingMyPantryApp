/* Azioni relative ai prodotti:
   - GET PRODUCTS BY BARCODE
   - POST PRODUCT PREFERENCE
   - POST PRODUCT DETAILS
   +
   - Aggiunta di un prodotto in locale
   - Fetch dei prodotti dal database locale
   - Aggiunta o Rimozione dei preferiti
   - Settaggio dei filtri
   - Rimozione di un prodotto in locale
*/

import ENVIRONMENT from '../../env'
import { insertProduct, fetchProducts, fetchFavorites, addFavorite, removeFavorite, removeProduct } from '../../helpers/db'
export const GET_PRODUCT_BY_BARCODE = 'GET_PRODUCT_BY_BARCODE'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'
export const SET_FAVORITES = 'SET_FAVORITES'
export const SET_FILTERS = 'SET_FILTERS'
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'


export const getProductByBarcode = barcode => {
    return async (dispatch, getState) => {
        const accessToken = getState().auth.token
        try {
            /* GET PRODUCTS BY BARCODE */
            const response = await fetch(
                `https://lam21.iot-prism-lab.cs.unibo.it/products?barcode=${barcode}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            )
            const resData = await response.json()
            let newProduct
            let mode
            if (resData.products.length === 0) {
                newProduct = {}
                mode = 'create'
            } else {
                newProduct = resData.products[(resData.products.length) - 1]
                mode = 'update'
            }
            const newToken = resData.token
            dispatch({ type: GET_PRODUCT_BY_BARCODE, product: newProduct, token: newToken })
            return mode
        } catch (err) {
            throw err
        }
    }
}

export const addLocalProduct = product => {
    return async (dispatch, getState) => {
        const accessToken = getState().auth.token
        const sessionToken = getState().products.sessionToken
        let address
        try {
            if (product.location) {
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${product.location.lat},${product.location.lng}&key=${ENVIRONMENT.googleApiKey}`)
                if (!response.ok) {
                    throw new Error('Something went wrong!')
                }
                const resData = await response.json()
                if (!resData.results) {
                    throw new Error('No result!')
                }
                address = resData.results[0].formatted_address
            }
            /* POST PRODUCT PREFERENCE */
            const response = await fetch(
                'https://lam21.iot-prism-lab.cs.unibo.it/votes',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        token: sessionToken,
                        rating: +1,
                        productId: product.id
                    })
                }
            )
            const resData = await response.json()
            if (!response.ok) {
                console.log('YOU HAVE ALREADY POSTED YOUR PREFERENCE FOR THIS PRODUCT!')
                console.log(resData)
            } else {
                console.log('THANKS! YOUR PREFERENCE HAS BEEN POSTED!')
                console.log(resData)
            }

            dispatch(addProduct(
                product.name,
                product.description,
                product.barcode,
                product.quantity,
                product.glutenFree,
                product.lactoseFree,
                product.vegan,
                product.vegetarian,
                product.expiryDate,
                address,
                product.location,
                product.rating
            ))
        } catch (err) {
            throw err
        }
    }
}

export const addRemoteAndLocalProduct = product => {
    return async (dispatch, getState) => {
        const accessToken = getState().auth.token
        const sessionToken = getState().products.sessionToken
        let address
        try {
            if (product.location) {
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${product.location.lat},${product.location.lng}&key=${ENVIRONMENT.googleApiKey}`)
                if (!response.ok) {
                    throw new Error('Something went wrong!')
                }
                const resData = await response.json()
                if (!resData.results) {
                    throw new Error('No result!')
                }
                address = resData.results[0].formatted_address
            }
            /* POST PRODUCT DETAILS */
            const response = await fetch(
                'https://lam21.iot-prism-lab.cs.unibo.it/products',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        token: sessionToken,
                        name: product.name,
                        description: product.description,
                        barcode: product.barcode,
                        test: false
                    })
                }
            )
            const resData = await response.json()
            console.log('THE FOLLOWING PRODUCT HAS BEEN POSTED ON THE REMOTE KNOWLEDGE BASE:')
            console.log(resData)

            dispatch(addProduct(
                product.name,
                product.description,
                product.barcode,
                product.quantity,
                product.glutenFree,
                product.lactoseFree,
                product.vegan,
                product.vegetarian,
                product.expiryDate,
                address,
                product.location,
                product.rating
            ))
        } catch (err) {
            throw err
        }
    }
}

const addProduct = (name, description, barcode, quantity, isGlutenFree, isLactoseFree, isVegan, isVegetarian, expiryDate, address, location, rating) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            const dbResult = await insertProduct(
                name,
                description,
                barcode,
                userId,
                quantity,
                isGlutenFree,
                isLactoseFree,
                isVegan,
                isVegetarian,
                expiryDate,
                address,
                location?.lat,
                location?.lng,
                rating,
                false
            )
            dispatch({
                type: ADD_PRODUCT,
                productData: {
                    id: dbResult.insertId,
                    name: name,
                    description: description,
                    barcode: barcode,
                    userId: userId,
                    quantity: quantity,
                    isGlutenFree: isGlutenFree,
                    isLactoseFree: isLactoseFree,
                    isVegan: isVegan,
                    isVegetarian: isVegetarian,
                    expiryDate: expiryDate,
                    address: address,
                    coords: {
                        lat: location?.lat,
                        lng: location?.lng
                    },
                    rating: rating,
                    favorite: false
                }
            })
        } catch (err) {
            throw err
        }
    }
}

export const loadProducts = userId => {
    return async dispatch => {
        try {
            const dbResult = await fetchProducts(userId)
            const dbResultFavs = await fetchFavorites(userId)
            dispatch({ type: SET_PRODUCTS, products: dbResult.rows._array, favProducts: dbResultFavs.rows._array })
        } catch (err) {
            throw err
        }
    }
}

export const setFilters = filterSettings => {
    return { type: SET_FILTERS, filters: filterSettings }
}

export const loadFilteredProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        const filters = getState().products.filters
        await dispatch(loadProducts(userId))
        await dispatch(setFilters(filters))
    }
}

export const insertFavorite = id => {
    return async dispatch => {
        try {
            await addFavorite(id)
            dispatch({ type: TOGGLE_FAVORITE, productId: id })
        } catch (err) {
            throw err
        }
    }
}

export const deleteFavorite = id => {
    return async dispatch => {
        try {
            await removeFavorite(id)
            dispatch({ type: TOGGLE_FAVORITE, productId: id })
        } catch (err) {
            throw err
        }
    }
}

export const deleteProduct = id => {
    return async dispatch => {
        try {
            await removeProduct(id)
            dispatch({ type: DELETE_PRODUCT, productId: id })
        } catch (err) {
            throw err
        }
    }
}