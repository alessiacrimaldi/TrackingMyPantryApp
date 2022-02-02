import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { defaultLightScreenOption, defaultDarkScreenOption } from '../defaultScreenOptions'
import { useSelector } from 'react-redux'

import AdminScreen from '../../screens/products/AdminScreen'
import FiltersScreen from '../../screens/products/FiltersScreen'
import CustomHeaderButton from '../../components/UI/HeaderButton'


const Stack = createStackNavigator()

const AdminNavigator = () => {
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
                name="Manage Products"
                component={AdminScreen}
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
        </Stack.Navigator>
    )
}

export default AdminNavigator