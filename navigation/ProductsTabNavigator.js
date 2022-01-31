import React from 'react'
import { Platform, Text, Dimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import Colors from '../constants/Colors'

import ProductsNavigator from './ProductsNavigator'
import ProductsFavNavigator from './ProductsFavNavigator'


const Tab =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator()
        : createBottomTabNavigator()

const ProductsTabNavigator = () => {
    const currentMode = useSelector(state => state.mode.theme)
    let tabColor
    let lineColor
    if (currentMode === 'light') {
        tabColor = 'white'
        lineColor = '#efefef'
    } else {
        tabColor = 'black'
        lineColor = Colors.lines
    }

    return (
        <Tab.Navigator
            initialRouteName='All Products'
            shifting={true}
            activeColor={tabColor}
            initialLayout={{ width: Dimensions.get('window').width, backgroundColor: '#121212' }}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.secondary,
                tabBarStyle: {
                    backgroundColor: tabColor,
                    borderTopColor: lineColor
                }
            }}
        >
            <Tab.Screen
                name="All Products"
                component={ProductsNavigator}
                options={{
                    tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans-bold' }}>Products</Text> : 'Products',
                    tabBarIcon: (tabInfo) => {
                        return <Ionicons name='pricetags-outline' size={25} color={tabInfo.color} />
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
                        return <Ionicons name='star-outline' size={25} color={tabInfo.color} />
                    },
                    tabBarColor: Colors.ternary
                }}
            />
        </Tab.Navigator>
    )
}

export default ProductsTabNavigator