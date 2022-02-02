import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { defaultLightScreenOption, defaultDarkScreenOption } from '../defaultScreenOptions'
import { useSelector } from 'react-redux'

import ProductsOverviewScreen from '../../screens/products/ProductsOverviewScreen'
import FiltersScreen from '../../screens/products/FiltersScreen'
import ProductDetailsScreen from '../../screens/products/ProductDetailsScreen'
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
                        ),
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                                <Item
                                    title='Filters'
                                    iconName={Platform.OS === 'android' ? 'filter-sharp' : 'filter-outline'}
                                    onPress={() => {
                                        navigation.navigate('Apply Filters')
                                    }}
                                />
                            </HeaderButtons>
                        )
                    }
                }}
            />
            <Stack.Screen
                name="Apply Filters"
                component={FiltersScreen}
            />
            <Stack.Screen
                name="Product Details"
                component={ProductDetailsScreen}
            />
        </Stack.Navigator>
    )
}

export default ProductsNavigator