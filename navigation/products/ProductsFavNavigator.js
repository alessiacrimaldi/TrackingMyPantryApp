/* Favorites: Stack Navigator per la visualizzazione dei prodotti preferiti */

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { defaultLightScreenOption, defaultDarkScreenOption } from '../defaultScreenOptions'
import { useSelector } from 'react-redux'

import FavoritesScreen from '../../screens/products/FavoritesScreen'
import ProductDetailsScreen from '../../screens/products/ProductDetailsScreen'
import MapScreen from '../../screens/products/MapScreen'


const Stack = createStackNavigator()

const ProductsFavNavigator = () => {
    const currentMode = useSelector(state => state.mode.theme)
    let defaultScreenOption
    if (currentMode === 'light') {
        defaultScreenOption = defaultLightScreenOption
    } else {
        defaultScreenOption = defaultDarkScreenOption
    }

    return (
        <Stack.Navigator
            screenOptions={{ ...defaultScreenOption }}
            initialRouteName='Favorites'
        >
            <Stack.Screen
                name="Favorites"
                component={FavoritesScreen}
            />
            <Stack.Screen
                name="Product Details"
                component={ProductDetailsScreen}
                options={({ route }) => {
                    return {
                        title: route.params.productName
                    }
                }}
            />
            <Stack.Screen
                name="Map"
                component={MapScreen}
            />
        </Stack.Navigator>
    )
}

export default ProductsFavNavigator