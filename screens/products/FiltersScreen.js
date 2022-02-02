import React, { useState, useLayoutEffect, useCallback } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setFilters } from '../../store/actions/products'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import CustomSwitch from '../../components/UI/Switch'


const modeColor = mode => {
    switch (mode) {
        case 'light':
            return '#efefef'
        case 'dark':
            return Colors.darkMode
    }
}

const FiltersScreen = ({ navigation }) => {
    const currentMode = useSelector(state => state.mode.theme)
    const dispatch = useDispatch()

    const [isSortedByQuantity, setIsSortedByQuantity] = useState(false)
    const [isSortedByRating, setIsSortedByRating] = useState(false)
    const [isGlutenFree, setIsGlutenFree] = useState(false)
    const [isLactoseFree, setIsLactoseFree] = useState(false)
    const [isVegan, setIsVegan] = useState(false)
    const [isVegetarian, setIsVegetarian] = useState(false)
    const [isExpired, setIsExpired] = useState(false)

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            sortByQuantity: isSortedByQuantity,
            sortByRating: isSortedByRating,
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian,
            expired: isExpired
        }
        dispatch(setFilters(appliedFilters))
    }, [isSortedByQuantity, isSortedByRating, isGlutenFree, isLactoseFree, isVegan, isVegetarian, isExpired, dispatch])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title='Save filters'
                        iconName={Platform.OS === 'android' ? 'bookmark-sharp' : 'bookmark-outline'}
                        onPress={saveFilters}
                    />
                </HeaderButtons>
            )
        })
    }, [navigation, saveFilters])

    return (
        <ScrollView style={styles.screen}>
            <View style={{ ...styles.filterRow, borderBottomColor: modeColor(currentMode) }}>
                <CustomSwitch
                    color={Colors.secondary}
                    label='Sort by quantity'
                    state={isSortedByQuantity}
                    onChange={newValue => {
                        setIsSortedByQuantity(newValue)
                        if (isSortedByRating == true) { setIsSortedByRating(!newValue) }
                    }}
                />
            </View>
            <View style={{ ...styles.filterRow, borderBottomColor: modeColor(currentMode) }}>
                <CustomSwitch
                    color={Colors.secondary}
                    label='Sort by rating'
                    state={isSortedByRating}
                    onChange={newValue => {
                        setIsSortedByRating(newValue)
                        if (isSortedByQuantity == true) { setIsSortedByQuantity(!newValue) }
                    }}
                />
            </View>
            <View style={{ ...styles.filterRow, borderBottomColor: modeColor(currentMode) }}>
                <CustomSwitch
                    color={Colors.secondary}
                    label='Gluten-free'
                    state={isGlutenFree}
                    onChange={newValue => setIsGlutenFree(newValue)}
                />
            </View>
            <View style={{ ...styles.filterRow, borderBottomColor: modeColor(currentMode) }}>
                <CustomSwitch
                    color={Colors.secondary}
                    label='Lactose-free'
                    state={isLactoseFree}
                    onChange={newValue => setIsLactoseFree(newValue)}
                />
            </View>
            <View style={{ ...styles.filterRow, borderBottomColor: modeColor(currentMode) }}>
                <CustomSwitch
                    color={Colors.secondary}
                    label='Vegan'
                    state={isVegan}
                    onChange={newValue => setIsVegan(newValue)}
                />
            </View>
            <View style={{ ...styles.filterRow, borderBottomColor: modeColor(currentMode) }}>
                <CustomSwitch
                    color={Colors.secondary}
                    label='Vegetarian'
                    state={isVegetarian}
                    onChange={newValue => setIsVegetarian(newValue)}
                />
            </View>
            <View style={{ paddingLeft: 20, paddingRight: 10 }}>
                <CustomSwitch
                    color={Colors.secondary}
                    label='Expired'
                    state={isExpired}
                    onChange={newValue => setIsExpired(newValue)}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        marginVertical: 20,
        marginHorizontal: 30
    },
    filterRow: {
        borderBottomWidth: 2,
        paddingLeft: 20,
        paddingRight: 10
    }
})

export default FiltersScreen