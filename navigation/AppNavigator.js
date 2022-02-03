import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'

import ProductsTabNavigator from './products/ProductsTabNavigator'
import AdminNavigator from './products/AdminNavigator'
import FiltersNavigator from './products/FiltersNavigator'
import SettingsNavigator from './user/SettingsNavigator'
import UserProfileNavigator from './user/UserProfileNavigator'


const Drawer = createDrawerNavigator()

const AppNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: Colors.ternary,
                drawerInactiveTintColor: Colors.details,
                drawerStyle: { backgroundColor: Colors.primary },
                drawerLabelStyle: { fontFamily: 'open-sans-bold' }
            }}
        >
            <Drawer.Screen
                name="Products Tabs"
                component={ProductsTabNavigator}
                options={{
                    drawerLabel: "Products",
                    drawerIcon: (drawerConfig) => {
                        return <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'cart-outline'} size={23} color={drawerConfig.color} />
                    }
                }}
            />
            <Drawer.Screen
                name="Admin"
                component={AdminNavigator}
                options={{
                    drawerLabel: "Admin",
                    drawerIcon: (drawerConfig) => {
                        return <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'create-outline'} size={23} color={drawerConfig.color} />
                    }
                }}
            />
            <Drawer.Screen
                name="Filters"
                component={FiltersNavigator}
                options={{
                    drawerLabel: "Filters",
                    drawerIcon: (drawerConfig) => {
                        return <Ionicons name={Platform.OS === 'android' ? 'filter-sharp' : 'filter-outline'} size={23} color={drawerConfig.color} />
                    }
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                    drawerLabel: "Settings",
                    drawerIcon: (drawerConfig) => {
                        return <Ionicons name={Platform.OS === 'android' ? 'settings-sharp' : 'settings-outline'} size={23} color={drawerConfig.color} />
                    }
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={UserProfileNavigator}
                options={{
                    drawerLabel: "Profile",
                    drawerIcon: (drawerConfig) => {
                        return <Ionicons name={Platform.OS === 'android' ? 'person-circle-sharp' : 'person-outline'} size={23} color={drawerConfig.color} />
                    }
                }}
            />
        </Drawer.Navigator>
    )
}

export default AppNavigator