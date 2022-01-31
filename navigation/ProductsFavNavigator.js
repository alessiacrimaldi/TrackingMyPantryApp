import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { defaultLightScreenOption, defaultDarkScreenOption } from './defaultScreenOptions'
import { useSelector } from 'react-redux'

import FavoritesScreen from '../screens/products/FavoritesScreen'
import ProductDetailsScreen from '../screens/products/ProductDetailsScreen'
import HeaderButton from '../components/UI/HeaderButton'


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
        >
            <Stack.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={({ navigation }) => {
                    return {
                        headerLeft: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                <Item
                                    title='Menu'
                                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu-outline'}
                                    onPress={() => {
                                        navigation.toggleDrawer()
                                    }}
                                />
                            </HeaderButtons>
                        ),
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                <Item
                                    title='Filters'
                                    iconName={Platform.OS === 'android' ? 'filter-sharp' : 'filter-outline'}
                                    onPress={() => {

                                    }}
                                />
                            </HeaderButtons>
                        )
                    }
                }}
            />
            <Stack.Screen
                name="Product Details"
                component={ProductDetailsScreen}
            />
        </Stack.Navigator>
    )
}

export default ProductsFavNavigator