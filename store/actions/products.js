import ENVIRONMENT from '../../env'
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
export const SET_FILTERS = 'SET_FILTERS'
import { insertProduct, fetchProducts, removeProduct, rateProduct, addFavorite } from '../../helpers/db'
export const GET_PRODUCT_BY_BARCODE = 'GET_PRODUCT_BY_BARCODE'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const VOTE_PRODUCT = 'VOTE_PRODUCT'


export const toggleFavorite = id => {
    return { type: TOGGLE_FAVORITE, productId: id }
}

export const setFilters = filterSettings => {
    return { type: SET_FILTERS, filters: filterSettings }
}

export const getProductByBarcode = (barcode, user) => {
    return async dispatch => {
        try {
            const response = await fetch(
                `https://lam21.iot-prism-lab.cs.unibo.it/products?barcode=${barcode}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user}`
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
            dispatch({ type: GET_PRODUCT_BY_BARCODE, product: newProduct })
            return mode
        } catch (err) {
            throw err
        }
    }
}

export const addLocalProduct = (name, description, barcode, userId, quantity, isGlutenFree, isLactoseFree, isVegan, isVegetarian, expiryDate, location) => {
    return async dispatch => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENVIRONMENT.googleApiKey}`)
        if (!response.ok) {
            throw new Error('Something went wrong!')
        }
        const resData = await response.json()
        if (!resData.results) {
            throw new Error('No result!')
        }
        const address = resData.results[0].formatted_address

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
                location.lat,
                location.lng
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
                    expiryDate: new Date(expiryDate),
                    address: address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            })
        } catch (err) {
            throw err
        }
    }
}






export const loadProducts = (userId) => {
    return async dispatch => {
        try {
            const dbResult = await fetchProducts(userId)
            dispatch({ type: SET_PRODUCTS, userProducts: dbResult.rows._array })
        } catch (err) {
            throw err
        }
    }
}

export const deleteProduct = (id) => {
    return async dispatch => {
        try {
            await removeProduct(id)
            dispatch({ type: DELETE_PRODUCT, productId: id })
        } catch (err) {
            throw err
        }
    }
}

// export const voteProduct = (id, rating) => {
//     return async dispatch => {
//         try {
//             await rateProduct(id, rating)
//             dispatch({ type: VOTE_PRODUCT, productId: id, productRating: rating })
//         } catch (err) {
//             throw err
//         }
//     }
// }