import React from 'react'
import { Platform, Text, Dimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors'

import ProductsNavigator from './ProductsNavigator'
import ProductsFavNavigator from './ProductsFavNavigator'


const Tab =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator()
        : createBottomTabNavigator()

const modeColors = mode => {
    switch (mode) {
        case 'light':
            return {tabColor: 'white', lineColor: '#efefef'}
        case 'dark':
            return {tabColor: 'black', lineColor: Colors.lines}
    }
}

const ProductsTabNavigator = () => {
    const currentMode = useSelector(state => state.mode.theme)

    return (
        <Tab.Navigator
            initialRouteName='All Products'
            shifting={true}
            activeColor={modeColors(currentMode).tabColor}
            initialLayout={{ width: Dimensions.get('window').width, backgroundColor: '#121212' }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.secondary,
                tabBarStyle: {
                    backgroundColor: modeColors(currentMode).tabColor,
                    borderTopColor: modeColors(currentMode).lineColor
                }
            }}
        >
            <Tab.Screen
                name="All Products"
                component={ProductsNavigator}
                options={{
                    tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Products</Text> : 'Products',
                    tabBarIcon: (tabInfo) => {
                        return <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'cart-outline'} size={25} color={tabInfo.color} />
                    },
                    tabBarColor: Colors.secondary
                }}
            />
            <Tab.Screen
                name="Favorite Products"
                component={ProductsFavNavigator}
                options={{
                    tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text> : 'Favorites',
                    tabBarIcon: (tabInfo) => {
                        return <Ionicons name={Platform.OS === 'android' ? 'ios-star' : 'star-outline'} size={25} color={tabInfo.color} />
                    },
                    tabBarColor: Colors.ternary
                }}
            />
        </Tab.Navigator>
    )
}

export default ProductsTabNavigator