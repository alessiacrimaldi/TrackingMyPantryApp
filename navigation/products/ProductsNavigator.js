/* Products: Stack Navigator per la visualizzazione dei prodotti */

import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { defaultLightScreenOption, defaultDarkScreenOption } from '../defaultScreenOptions'
import { useSelector } from 'react-redux'

import ProductsOverviewScreen from '../../screens/products/ProductsOverviewScreen'
import ProductDetailsScreen from '../../screens/products/ProductDetailsScreen'
import MapScreen from '../../screens/products/MapScreen'
import CustomHeaderButton from '../../components/UI/HeaderButton'


const Stack = createStackNavigator()

const ProductsNavigator = () => {
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
            initialRouteName='Your Products'
        >
            <Stack.Screen
                name="Your Products"
                component={ProductsOverviewScreen}
                options={({ navigation }) => {
                    return {
                        headerLeft: () => (
                            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                                <Item
                                    title='Menu'
                                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu-outline'}
                                    onPress={() => {
                                        navigation.toggleDrawer()
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

export default ProductsNavigator